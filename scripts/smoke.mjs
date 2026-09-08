#!/usr/bin/env node
/**
 * scripts/smoke.mjs — is the live site still doing its job?
 *
 *   npm run smoke                      # against production
 *   npm run smoke -- http://localhost:4173
 *
 * Written for the unlisted pages. Everything in the nav gets clicked by
 * accident sooner or later; a page nothing links to only gets exercised when
 * somebody remembers it exists, which is exactly the failure this guards
 * against. See docs/UNLISTED-PAGES.md.
 *
 * Read-only. It never submits the form: that would email Boyd and write a
 * lead row on every run. It checks the page loads and that the endpoint is
 * reachable and rejecting bad input, which is what actually breaks.
 */

const BASE = (process.argv[2] || "https://rubyxqube.com").replace(/\/$/, "");
const results = [];

function record(name, ok, detail) {
  results.push({ name, ok, detail });
  console.log(`  ${ok ? "ok  " : "FAIL"} ${name.padEnd(46)} ${detail}`);
}

async function get(path) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  const body = res.status < 300 ? await res.text() : "";
  return { status: res.status, location: res.headers.get("location"), body };
}

console.log(`Smoke test against ${BASE}\n`);

// ── The unlisted pages must still be served ────────────────────────────────
//
// This is a single-page app, so every route returns the same index.html and
// the page title and content only exist after React runs. A fetch can prove
// the route is served and not 404ing at the edge; it cannot prove the page
// renders. Checking for the page name in the HTML was the first version of
// this and it failed against a perfectly healthy site.
//
// The API checks below are the ones with teeth. Verifying the rendered page
// needs a browser, which is what scripts in the scratchpad do during a build.
for (const path of ["/project-brief", "/report", "/designs", "/audit"]) {
  try {
    const r = await get(path);
    const served = r.status === 200 && r.body.includes(`<div id="root">`);
    record(`GET ${path} is served`, served, `${r.status}`);
  } catch (e) {
    record(`GET ${path} is served`, false, e.message);
  }
}

// ── The old URL must keep redirecting ──────────────────────────────────────
try {
  const r = await get("/homework");
  const ok = [301, 308].includes(r.status) && (r.location || "").includes("/project-brief");
  record("GET /homework redirects", ok, `${r.status} -> ${r.location || "none"}`);
} catch (e) {
  record("GET /homework redirects", false, e.message);
}

// ── The sitemap must not advertise pages that answer "noindex" ─────────────
//
// On 2026-09-06 Search Console emailed about "Excluded by 'noindex' tag": the
// static sitemap listed all 34 blog posts, 19 of them future-dated and still
// serving BlogPost.jsx's noindex branch. /sitemap.xml is generated per request
// now, and this is the check that it is still generated and still correct in
// production. Nothing on the site links to it, which is the whole reason it
// belongs in this file.
try {
  const { postMeta, isPublished } = await import("../src/blog/postMeta.js");
  const r = await get("/sitemap.xml");
  const served = r.status === 200 && r.body.includes("<urlset");
  record("GET /sitemap.xml is generated", served, `${r.status}`);

  if (served) {
    const scheduled = postMeta.filter((p) => !isPublished(p));
    const leaked = scheduled.filter((p) => r.body.includes(`/blog/${p.slug}<`));
    record(
      "sitemap lists no unpublished post",
      leaked.length === 0,
      leaked.length ? leaked.map((p) => p.slug).join(", ") : `${scheduled.length} scheduled, none listed`,
    );

    const live = postMeta.filter((p) => isPublished(p));
    const missing = live.filter((p) => !r.body.includes(`/blog/${p.slug}<`));
    record(
      "sitemap lists every published post",
      missing.length === 0,
      missing.length ? missing.map((p) => p.slug).join(", ") : `${live.length} live`,
    );
  }
} catch (e) {
  record("GET /sitemap.xml is generated", false, e.message);
}

// ── One site, one hostname ─────────────────────────────────────────────────
//
// The site was being served in full on three hostnames at once: the apex,
// www, and the project's .vercel.app domain. Nothing was broken, the
// canonicals absorbed it, but Google was crawling all three and filed
// www.rubyxqube.com/project-brief under "Excluded by 'noindex' tag" on
// 2026-08-26, which is what started this whole thread.
//
// The www redirect lives in the Vercel dashboard, not in this repo, so
// nothing in a diff would ever reveal it being switched off. That is exactly
// why it is checked here.
if (BASE.includes("rubyxqube.com")) {
  try {
    const res = await fetch("https://www.rubyxqube.com/pricing", { redirect: "manual" });
    const to = res.headers.get("location") || "";
    const ok = [301, 308].includes(res.status) && to === "https://rubyxqube.com/pricing";
    record("www redirects to the apex domain", ok, `${res.status} -> ${to || "none"}`);
  } catch (e) {
    record("www redirects to the apex domain", false, e.message);
  }

  try {
    const res = await fetch("https://qube-solutions.vercel.app/", { redirect: "manual" });
    const tag = res.headers.get("x-robots-tag") || "";
    record("the .vercel.app copy is noindex", tag.includes("noindex"), tag || "no X-Robots-Tag");
  } catch (e) {
    record("the .vercel.app copy is noindex", false, e.message);
  }
}

// ── The endpoint must exist and must refuse junk ───────────────────────────
// Deliberately NOT a valid submission: a smoke test that emails somebody and
// writes a lead row every time it runs will be turned off within a week.
try {
  const res = await fetch(`${BASE}/api/project-brief`, { method: "GET" });
  record("GET /api/project-brief is refused", res.status === 405, `${res.status}`);
} catch (e) {
  record("GET /api/project-brief is refused", false, e.message);
}

try {
  const res = await fetch(`${BASE}/api/project-brief`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ what: "no business name", _t: Date.now() - 60000 }),
  });
  record("POST without a business name is refused", res.status === 400, `${res.status}`);
} catch (e) {
  record("POST without a business name is refused", false, e.message);
}

try {
  // Honeypot filled: must be silently accepted (200) and never reach the inbox.
  const res = await fetch(`${BASE}/api/project-brief`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ biz: "smoke test bot", _hp: "http://spam.example", _t: Date.now() - 60000 }),
  });
  record("POST with the honeypot filled is swallowed", res.status === 200, `${res.status}`);
} catch (e) {
  record("POST with the honeypot filled is swallowed", false, e.message);
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed.`);
if (failed.length) {
  console.log("\nFailures:");
  failed.forEach((f) => console.log(`  ${f.name}  (${f.detail})`));
  process.exit(1);
}
