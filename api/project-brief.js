/**
 * api/project-brief.js
 *
 * Receives the Project Brief from /project-brief.
 *
 * Does five things, in this order, and none of them blocks the visitor's
 * confirmation if a downstream service is having a bad day:
 *   1. saves the submission to Supabase `leads` (source: "project_brief")
 *   2. emails Boyd, with reply-to set to the sender
 *   3. emails the sender a copy of everything they wrote
 *   4. pushes an ntfy alert
 *   5. texts Boyd via SignalWire
 *
 * ── Spam handling ────────────────────────────────────────────────────────────
 * Three cheap layers, no CAPTCHA. The audience is a contractor on a phone,
 * possibly wearing gloves; a CAPTCHA costs completions from exactly the people
 * this form exists to reach.
 *   - honeypot field bots fill and humans never see
 *   - a time trap: a 20-minute form returned in under 8 seconds is not a human
 *   - a per-IP rate limit, since the endpoint sends mail on every accepted post
 *
 * ── Env ──────────────────────────────────────────────────────────────────────
 *   RESEND_API_KEY, ALERT_EMAIL, FROM_EMAIL
 *   SUPABASE_URL, SUPABASE_SERVICE_KEY
 *   SIGNALWIRE_* and ALERT_PHONE_NUMBER   see api/_lib/alerts.js
 *   NTFY_TOPIC (optional)
 */

import { sendSMSAlerts } from "./_lib/alerts.js";

// Field key -> the question as the visitor read it. Kept server-side so the
// email reads like the form rather than like a database row, and so a client
// cannot relabel its own answers on the way through.
const QUESTIONS = {
  biz:       "Business name",
  what:      "What you do",
  where:     "Towns served",
  contact:   "Phone and email for the site",
  hours:     "Hours",
  win:       "What would make this worth it",
  pain:      "What is going wrong now",
  bestjob:   "The job they want more of",
  photos:    "How photos are coming",
  proud:     "A job they are proud of",
  services:  "Services",
  no:        "What they do NOT want calls about",
  faq:       "Questions they answer every day",
  comp:      "Competitors",
  why:       "Why customers pick them",
  domain:    "Domain",
  logo:      "Logo",
  existing:  "Existing site or Facebook",
  who:       "Main contact and decision makers",
  misc:      "Anything else",
};

// A 20-minute form cannot honestly be completed in under 8 seconds.
const MIN_SECONDS = 8;

// Per-IP limit. In-memory, so it resets when the function cold-starts, which
// is fine: this raises the cost of casual abuse, it is not a security control.
// Anything determined gets through, and the honeypot plus the time trap are
// what actually catch bots.
const RATE = new Map();
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 5;

function rateLimited(ip) {
  const now = Date.now();
  const hits = (RATE.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  RATE.set(ip, hits);
  // Keep the map from growing without bound on a long-lived instance.
  if (RATE.size > 500) {
    for (const [k, v] of RATE) if (!v.some((t) => now - t < RATE_WINDOW_MS)) RATE.delete(k);
  }
  return hits.length > RATE_MAX;
}

const clean = (v) => (typeof v === "string" ? v.trim() : "");

function asText(answers) {
  const lines = [];
  for (const [key, label] of Object.entries(QUESTIONS)) {
    const v = clean(answers[key]);
    if (!v) continue;
    lines.push(`${label}:`);
    lines.push(v.split("\n").map((l) => "  " + l).join("\n"));
    lines.push("");
  }
  return lines.join("\n").trim();
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function asHtml(answers) {
  const rows = [];
  for (const [key, label] of Object.entries(QUESTIONS)) {
    const v = clean(answers[key]);
    if (!v) continue;
    rows.push(
      `<tr>
         <td style="padding:10px 14px 10px 0;vertical-align:top;color:#6b6560;font-size:13px;white-space:nowrap">${escapeHtml(label)}</td>
         <td style="padding:10px 0;vertical-align:top;color:#1a1512;font-size:14px;line-height:1.55">${escapeHtml(v).replace(/\n/g, "<br>")}</td>
       </tr>`
    );
  }
  return `<table style="border-collapse:collapse;width:100%;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">${rows.join("")}</table>`;
}

async function sendMail({ to, replyTo, subject, text, html }) {
  const { RESEND_API_KEY, FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !to) return { ok: false, skipped: true };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM_EMAIL || "onboarding@resend.dev",
        to: [to],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        text,
        ...(html ? { html } : {}),
      }),
    });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      console.error(`Resend rejected (${res.status}) to ${to}:`, d.message || "");
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error("Resend network error:", err.message);
    return { ok: false };
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = req.body || {};
  const { _hp, _t, ...answers } = body;

  // Honeypot. Return 200 rather than an error: telling a bot it failed just
  // teaches whoever wrote it to try again without the field.
  if (clean(_hp)) return res.status(200).json({ ok: true });

  // Time trap, same reasoning on the response.
  const elapsed = Number(_t) ? (Date.now() - Number(_t)) / 1000 : null;
  if (elapsed !== null && elapsed < MIN_SECONDS) {
    console.warn(`[project-brief] rejected: submitted in ${elapsed.toFixed(1)}s`);
    return res.status(200).json({ ok: true });
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (rateLimited(ip)) {
    return res.status(429).json({ error: "Too many submissions. Please try again later, or email boyd@rubyxqube.com." });
  }

  const biz = clean(answers.biz);
  const contact = clean(answers.contact);
  if (!biz) return res.status(400).json({ error: "Please tell us your business name." });

  // The contact field is free text on purpose: people type "call me on 208 555
  // 0100" and forcing a rigid format loses more than it gains. Pull an address
  // out if there is one so the reply-to and their copy can be addressed.
  const email = (contact.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/) || [])[0] || null;

  const text = asText(answers);
  const stamp = new Date().toLocaleString("en-US", { timeZone: "America/Boise", dateStyle: "medium", timeStyle: "short" });

  // ── Save first, notify second. An email that fails is recoverable from the
  //    row; a row that was never written is gone.
  const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;
  if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: clean(answers.who) || biz,
          email,
          phone: null,
          service_needed: clean(answers.what) || null,
          // The whole submission goes in notes rather than its own columns.
          // Deliberately: it needs no migration and shows up in the Leads tab
          // today. A dedicated intake table with typed columns would be better
          // once this has proven it gets used.
          notes: `PROJECT BRIEF\nSubmitted ${stamp} MT\nContact given: ${contact || "none"}\n\n${text}`,
          source: "project_brief",
        }),
      });
      if (!r.ok) console.error("Supabase lead insert failed:", r.status, await r.text());
    } catch (err) {
      console.error("Supabase lead error:", err.message);
    }
  } else {
    console.error("[project-brief] SUPABASE not configured, submission saved nowhere but email.");
  }

  // ── Boyd's copy
  const { ALERT_EMAIL, NTFY_TOPIC } = process.env;
  await sendMail({
    to: ALERT_EMAIL,
    replyTo: email || undefined,
    subject: `Brief returned: ${biz}`,
    text: `${biz} returned the Project Brief.\nContact: ${contact || "not given"}\nReceived ${stamp} MT\n\n${text}`,
    html: `<div style="max-width:640px;margin:0 auto">
             <p style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:15px;color:#1a1512">
               <strong>${escapeHtml(biz)}</strong> returned the Project Brief.<br>
               <span style="color:#6b6560;font-size:13px">Contact: ${escapeHtml(contact || "not given")} &middot; ${escapeHtml(stamp)} MT</span>
             </p>
             ${asHtml(answers)}
           </div>`,
  });

  // ── Their copy. A receipt that contains their answers is useful to them and
  //    is the strongest trust signal on the whole page: it shows exactly what
  //    was sent and to whom.
  let confirmationSent = false;
  if (email) {
    const r = await sendMail({
      to: email,
      replyTo: ALERT_EMAIL || undefined,
      subject: "Your answers, and what happens next",
      text:
        `Thanks for sending these over. Here is exactly what you submitted, so you have a copy.\n\n` +
        `${text}\n\n` +
        `WHAT HAPPENS NEXT\n` +
        `Boyd reads through it and comes back to you within one working day. If anything above needs changing, just reply to this email.\n\n` +
        `Photos can follow whenever they are ready. They are the one thing that decides how fast your site goes live.\n\n` +
        `YOUR INFORMATION\n` +
        `We never sell or rent it. It is used only to build and run your website. It was emailed to Boyd and stored in RubyxQube's database, and nowhere else. Ask any time and we will send you everything we hold or delete it.\n\n` +
        `Boyd Querubin, RubyxQube\nboyd@rubyxqube.com  (208) 970-8624`,
      html: `<div style="max-width:640px;margin:0 auto;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">
               <p style="font-size:15px;color:#1a1512">Thanks for sending these over. Here is exactly what you submitted, so you have a copy.</p>
               ${asHtml(answers)}
               <h3 style="font-size:14px;color:#1a1512;margin-top:28px">What happens next</h3>
               <p style="font-size:14px;color:#3d3833;line-height:1.6">Boyd reads through it and comes back to you within one working day. If anything above needs changing, just reply to this email. Photos can follow whenever they are ready; they are the one thing that decides how fast your site goes live.</p>
               <h3 style="font-size:14px;color:#1a1512;margin-top:24px">Your information</h3>
               <p style="font-size:13px;color:#6b6560;line-height:1.6">We never sell or rent it. It is used only to build and run your website. It was emailed to Boyd and stored in RubyxQube's database, and nowhere else. Ask any time and we will send you everything we hold, or delete it.</p>
               <p style="font-size:13px;color:#6b6560;margin-top:24px">Boyd Querubin, RubyxQube<br>boyd@rubyxqube.com &middot; (208) 970-8624</p>
             </div>`,
    });
    confirmationSent = r.ok;
  }

  if (NTFY_TOPIC) {
    await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method: "POST",
      headers: { Title: `Brief returned: ${biz}`, Priority: "high", Tags: "memo,white_check_mark", "Content-Type": "text/plain" },
      body: `${biz}\nContact: ${contact || "not given"}`,
    }).catch((err) => console.error("ntfy error:", err.message));
  }

  // ── SMS ────────────────────────────────────────────────────────────────────
  // Short on purpose. A returned brief is worth knowing about immediately, but
  // the detail is already in the email and in the Leads tab; a text that
  // repeats twenty answers is a text nobody finishes reading.
  await sendSMSAlerts(
    `Project brief returned\n${biz}\n${contact || "no contact given"}\nFull answers in your email.`
  );

  return res.status(200).json({ ok: true, confirmationSent });
}
