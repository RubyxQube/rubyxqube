#!/usr/bin/env node
/**
 * scripts/set-client-status.mjs
 *
 * Corrects a client's subscription_status in the portal.
 *
 *   SUPABASE_SERVICE_KEY=<secret key> node scripts/set-client-status.mjs phoenix-stoneworks active
 *   SUPABASE_SERVICE_KEY=<secret key> node scripts/set-client-status.mjs            # list them
 *
 * WHY THIS EXISTS
 * api/admin/clients.js is GET only, so the admin Clients table can display a
 * status but never fix one. Normally that is right, because the status is
 * owned by Stripe: api/stripe-webhook.js writes it on subscription.created,
 * subscription.deleted, invoice.paid and invoice.payment_failed.
 *
 * But it drifted. Until 2026-08-25, invoice.payment_failed set "paused" and
 * invoice.paid set nothing, so a single failed charge marked a client paused
 * with no path back. Phoenix Stoneworks read PAUSED from 2026-08-11 while
 * paying $999/mo the whole time. The webhook now sets "active" on every paid
 * invoice, which fixes it going forward; this script repairs the rows that
 * are already wrong.
 *
 * The key is read from the environment and never printed.
 */

const SUPABASE_URL = "https://isuuemmobbprirfeteav.supabase.co";
const KEY = process.env.SUPABASE_SERVICE_KEY;

// Matches what the webhook writes plus "trial", which api/signup.js sets.
const VALID = ["active", "paused", "cancelled", "trial"];

function classifyKey(k) {
  if (k.startsWith("sb_secret_")) return "secret";
  if (k.startsWith("sb_publishable_")) return "publishable";
  if (k.startsWith("eyJ")) {
    try {
      const p = JSON.parse(Buffer.from(k.split(".")[1], "base64").toString("utf8"));
      return p.role === "service_role" ? "secret" : p.role === "anon" ? "publishable" : `role "${p.role}"`;
    } catch { return "unreadable JWT"; }
  }
  return "unrecognised";
}

const [, , slug, status] = process.argv;

if (!KEY) {
  console.error("Set SUPABASE_SERVICE_KEY.");
  console.error("Supabase > Project Settings > API Keys > Secret key (sb_secret_...).");
  process.exit(1);
}
const kind = classifyKey(KEY);
if (kind !== "secret") {
  console.error(
    kind === "publishable"
      ? "That is the PUBLISHABLE key (formerly 'anon'). It cannot write to clients."
      : `Could not confirm a secret key (looks like: ${kind}).`
  );
  process.exit(1);
}

const h = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  "Content-Type": "application/json",
};

const list = await (
  await fetch(`${SUPABASE_URL}/rest/v1/clients?select=slug,business_name,plan,subscription_status,stripe_customer_id&order=business_name`, { headers: h })
).json();

if (!Array.isArray(list)) {
  console.error("Could not read clients:", JSON.stringify(list));
  process.exit(1);
}

if (!slug) {
  console.log("Current clients:\n");
  list.forEach((c) => {
    console.log(`  ${String(c.slug).padEnd(24)} ${String(c.plan || "-").padEnd(12)} ${String(c.subscription_status || "-").padEnd(11)} stripe:${c.stripe_customer_id ? "linked" : "NOT LINKED"}`);
  });
  console.log(`\nTo change one:  node scripts/set-client-status.mjs <slug> <${VALID.join("|")}>`);
  process.exit(0);
}

if (!VALID.includes(status)) {
  console.error(`Status must be one of: ${VALID.join(", ")}`);
  process.exit(1);
}

const client = list.find((c) => c.slug === slug);
if (!client) {
  console.error(`No client with slug "${slug}". Known: ${list.map((c) => c.slug).join(", ")}`);
  process.exit(1);
}

console.log(`${client.business_name} (${client.plan})`);
console.log(`  ${client.subscription_status || "none"}  ->  ${status}`);

if (client.subscription_status === status) {
  console.log("\nAlready set. Nothing to do.");
  process.exit(0);
}

const res = await fetch(`${SUPABASE_URL}/rest/v1/clients?slug=eq.${encodeURIComponent(slug)}`, {
  method: "PATCH",
  headers: { ...h, Prefer: "return=representation" },
  body: JSON.stringify({ subscription_status: status }),
});

if (!res.ok) {
  console.error(`\nFailed: ${res.status} ${await res.text()}`);
  process.exit(1);
}

const [updated] = await res.json();
console.log(`\nDone. Now reads "${updated.subscription_status}" in the admin Clients table.`);
if (!client.stripe_customer_id) {
  console.log("\nNote: this client has no stripe_customer_id, so the webhook cannot");
  console.log("keep its status in sync and it will only ever change by hand.");
}
