// node --test api/contract.test.mjs
//
// contract.js used to swallow every Supabase failure. A lookup error became
// "Contract not found", and the signing write was never checked, so a failed
// write still told the client "signed" and still sent Boyd a "Contract
// signed!" alert. These tests stand Supabase up as a fake and make it fail.

import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";

process.env.SUPABASE_URL = "https://supabase.test";
process.env.SUPABASE_SERVICE_KEY = "sb_secret_test";
for (const k of ["NTFY_TOPIC", "RESEND_API_KEY", "ALERT_EMAIL", "SIGNALWIRE_PROJECT_ID"]) delete process.env[k];

const { default: handler } = await import("./contract.js");

const ROW = { id: 7, token: "tok", status: "sent", package: "Autopilot", amount_cents: 49900, client_email: null };

let calls, supabase;
beforeEach(() => {
  calls = [];
  supabase = { lookup: () => json(200, [ROW]), patch: () => json(200, [{ ...ROW, status: "signed" }]) };
  globalThis.fetch = async (url, opts = {}) => {
    calls.push({ url: String(url), method: opts.method || "GET" });
    if (!String(url).startsWith("https://supabase.test")) return json(200, {});
    return opts.method === "PATCH" ? supabase.patch() : supabase.lookup();
  };
});

const json = (status, body) => new Response(JSON.stringify(body), { status });

async function call(method, { query = {}, body } = {}) {
  const res = { code: 0, body: null, headers: {},
    setHeader(k, v) { this.headers[k] = v; },
    status(c) { this.code = c; return this; },
    json(b) { this.body = b; return this; },
    end() { return this; } };
  await handler({ method, query, body }, res);
  return res;
}

test("GET: an outage is a 503, not 'Contract not found'", async () => {
  supabase.lookup = () => json(500, { message: "boom" });
  const r = await call("GET", { query: { token: "tok" } });
  assert.equal(r.code, 503);
});

test("GET: a bad key (401) is also a 503, not a 404", async () => {
  supabase.lookup = () => json(401, { message: "Invalid API key" });
  const r = await call("GET", { query: { token: "tok" } });
  assert.equal(r.code, 503);
});

test("GET: a token that genuinely matches nothing is still a 404", async () => {
  supabase.lookup = () => json(200, []);
  const r = await call("GET", { query: { token: "nope" } });
  assert.equal(r.code, 404);
});

test("POST: a failed write is NOT reported as signed, and no alert goes out", async () => {
  supabase.patch = () => json(500, { message: "write failed" });
  process.env.NTFY_TOPIC = "t";
  try {
    const r = await call("POST", { body: { token: "tok", signedName: "Jane Doe" } });
    assert.equal(r.code, 503);
    assert.notEqual(r.body.success, true);
    assert.equal(calls.filter((c) => c.url.includes("ntfy.sh")).length, 0, "Boyd was told it was signed");
  } finally { delete process.env.NTFY_TOPIC; }
});

test("POST: losing the race to a second submission is 'Already signed', not a second signature", async () => {
  supabase.patch = () => json(200, []);        // the status filter matched nothing
  const r = await call("POST", { body: { token: "tok", signedName: "Jane Doe" } });
  assert.equal(r.code, 409);
  assert.equal(r.body.alreadySigned, true);
});

test("POST: the write only targets a contract that is still signable", async () => {
  await call("POST", { body: { token: "tok", signedName: "Jane Doe" } });
  const patch = calls.find((c) => c.method === "PATCH");
  assert.match(decodeURIComponent(patch.url), /status\.not\.in\.\(signed,voided\)/);
});

test("POST: success returns the same timestamp that was stored, and alerts are awaited", async () => {
  process.env.NTFY_TOPIC = "t";
  try {
    const r = await call("POST", { body: { token: "tok", signedName: "Jane Doe" } });
    assert.equal(r.code, 200);
    assert.equal(r.body.success, true);
    // The alert must have gone out before the handler returned.
    assert.equal(calls.filter((c) => c.url.includes("ntfy.sh")).length, 1);
  } finally { delete process.env.NTFY_TOPIC; }
});
