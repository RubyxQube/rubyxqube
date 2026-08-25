#!/usr/bin/env node
/**
 * scripts/case-study-numbers.mjs
 *
 * Pulls the real numbers for the Phoenix Stoneworks case study out of the
 * leads Boyd's own systems have been recording since launch.
 *
 *   SUPABASE_SERVICE_KEY=<secret key> node scripts/case-study-numbers.mjs
 *   SUPABASE_SERVICE_KEY=<secret key> node scripts/case-study-numbers.mjs --client <uuid>
 *
 * READ-ONLY. It never writes anything.
 *
 * WHY THIS EXISTS
 * The PSW portfolio page currently claims "built for speed and flexibility, no
 * WordPress, no plugins", which is a feature claim. A prospect cannot tell
 * whether any of it worked. The one number that would tell them is the share of
 * captured leads that arrived outside business hours, because the entire
 * Autopilot pitch is "nobody who calls at 8pm goes to a competitor" and no
 * competitor in this market can produce that figure. It is sitting in Supabase
 * because RubyxQube built the thing that logs it.
 *
 * Print it, look at it honestly, and only then decide what the page says. If
 * the after-hours share turns out to be 8%, that is worth knowing too, and the
 * page should lead with something else.
 */

const SUPABASE_URL = "https://isuuemmobbprirfeteav.supabase.co";
const PSW_CLIENT_ID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";

// Phoenix Stoneworks' published hours. Anything outside these is a lead that
// arrived when nobody was there to answer the phone.
const OPEN_HOUR = 8;
const CLOSE_HOUR = 17;
const TZ = "America/Boise";

const args = process.argv.slice(2);
const clientId = args.includes("--client") ? args[args.indexOf("--client") + 1] : PSW_CLIENT_ID;
const KEY = process.env.SUPABASE_SERVICE_KEY;

function classifyKey(k) {
  if (!k) return "missing";
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

const kind = classifyKey(KEY);
if (kind !== "secret") {
  console.error(
    kind === "missing" ? "Set SUPABASE_SERVICE_KEY (Project Settings > API Keys > Secret key)."
    : kind === "publishable" ? "That is the PUBLISHABLE key. It cannot read the leads table."
    : `Could not confirm a secret key (looks like: ${kind}).`
  );
  process.exit(1);
}

const h = { apikey: KEY, Authorization: `Bearer ${KEY}` };

async function q(path) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: h });
  if (!res.ok) throw new Error(`${path} -> ${res.status} ${await res.text()}`);
  return res.json();
}

// Local hour and weekday, in the client's timezone rather than the server's.
function localParts(iso) {
  const d = new Date(iso);
  const f = new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", hour12: false, weekday: "short" });
  const parts = Object.fromEntries(f.formatToParts(d).map((p) => [p.type, p.value]));
  return { hour: parseInt(parts.hour, 10) % 24, weekday: parts.weekday };
}
const isAfterHours = (iso) => {
  const { hour, weekday } = localParts(iso);
  if (weekday === "Sat" || weekday === "Sun") return true;
  return hour < OPEN_HOUR || hour >= CLOSE_HOUR;
};

const main = async () => {
  const leads = await q(`leads?client_id=eq.${clientId}&select=*&order=created_at.asc`);

  if (!Array.isArray(leads) || !leads.length) {
    console.log("No leads recorded for this client yet. Nothing to write a case study from.");
    return;
  }

  const first = leads[0].created_at;
  const last = leads[leads.length - 1].created_at;
  const days = Math.max(1, Math.round((new Date(last) - new Date(first)) / 86400000));
  const months = (days / 30.44).toFixed(1);

  const bySource = {};
  for (const l of leads) bySource[l.source || "unknown"] = (bySource[l.source || "unknown"] || 0) + 1;

  const withTime = leads.filter((l) => l.created_at);
  const after = withTime.filter((l) => isAfterHours(l.created_at));
  const afterPct = Math.round((after.length / withTime.length) * 100);

  const chatbot = leads.filter((l) => l.source === "chatbot");
  const chatAfter = chatbot.filter((l) => l.created_at && isAfterHours(l.created_at));

  const byHour = {};
  for (const l of withTime) { const { hour } = localParts(l.created_at); byHour[hour] = (byHour[hour] || 0) + 1; }

  const needs = {};
  for (const l of leads) if (l.service_needed) {
    const k = l.service_needed.toLowerCase().slice(0, 40);
    needs[k] = (needs[k] || 0) + 1;
  }

  const line = (s) => console.log(s);
  line("");
  line("PHOENIX STONEWORKS, CAPTURED LEADS");
  line("=".repeat(52));
  line(`  Period        ${new Date(first).toLocaleDateString("en-US")} to ${new Date(last).toLocaleDateString("en-US")}  (${days} days, ~${months} months)`);
  line(`  Total leads   ${leads.length}`);
  line(`  Per month     ${(leads.length / Math.max(1, months)).toFixed(1)}`);
  line("");
  line("  By source");
  Object.entries(bySource).sort((a, b) => b[1] - a[1])
    .forEach(([s, n]) => line(`    ${String(s).padEnd(16)} ${String(n).padStart(4)}   ${Math.round((n / leads.length) * 100)}%`));
  line("");
  line(`  AFTER HOURS (outside Mon-Fri ${OPEN_HOUR}:00-${CLOSE_HOUR}:00 ${TZ})`);
  line(`    All leads       ${after.length} of ${withTime.length}   ${afterPct}%`);
  if (chatbot.length) {
    line(`    Chatbot only    ${chatAfter.length} of ${chatbot.length}   ${Math.round((chatAfter.length / chatbot.length) * 100)}%`);
  }
  line("");
  line("  When they arrive (local hour)");
  for (let hh = 0; hh < 24; hh++) {
    const n = byHour[hh] || 0;
    if (!n) continue;
    const open = hh >= OPEN_HOUR && hh < CLOSE_HOUR;
    line(`    ${String(hh).padStart(2, "0")}:00  ${"#".repeat(Math.min(40, n))} ${n}${open ? "" : "   <- closed"}`);
  }
  if (Object.keys(needs).length) {
    line("");
    line("  What they asked about");
    Object.entries(needs).sort((a, b) => b[1] - a[1]).slice(0, 8)
      .forEach(([k, n]) => line(`    ${String(n).padStart(3)}  ${k}`));
  }
  line("");
  line("=".repeat(52));
  line("Paste this back and I will build the case study page around whatever");
  line("it actually says. If the after-hours share is low, we lead with");
  line("something else rather than dressing it up.");
};

main().catch((e) => { console.error(e.message); process.exit(1); });
