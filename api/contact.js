/**
 * api/contact.js
 * Handles contact/audit request form submissions from rubyxqube.com.
 * Fires three optional alert channels — all degrade gracefully if env vars not set.
 *
 * ── ntfy.sh push (Boyd's phone — free) ────────────────────────────────────────
 *   NTFY_TOPIC               subscribe at https://ntfy.sh/<NTFY_TOPIC>
 *
 * ── TextBelt SMS (~$0.01/text, no A2P required) ───────────────────────────────
 *   TEXTBELT_KEY             buy credits at textbelt.com
 *   ALERT_PHONE_NUMBER       E.164 format: +1XXXXXXXXXX
 *
 * ── Resend email (free tier) ──────────────────────────────────────────────────
 *   RESEND_API_KEY           resend.com
 *   ALERT_EMAIL              Boyd's notification email
 *   FROM_EMAIL               verified sender (omit → onboarding@resend.dev)
 */

const SUPABASE_URL         = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

async function saveLeadToSupabase({ name, phone, email, service_needed, notes }) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return;
  await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method:  "POST",
    headers: {
      "Content-Type":  "application/json",
      "apikey":        SUPABASE_SERVICE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
      "Prefer":        "return=minimal",
    },
    body: JSON.stringify({ name, phone, email, service_needed, notes, source: "contact_form" }),
  }).catch(err => console.error("Supabase lead error:", err.message));
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, business, city, package: pkg, timeline, contact_method, contact_value, notes, website, _hp } = req.body || {};

  // Honeypot: bots fill hidden fields; real users never touch them
  if (_hp) return res.status(200).json({ ok: true });

  if (!name || !city) return res.status(400).json({ error: "name and city required" });

  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/Boise",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const alertText = [
    `New audit request — rubyxqube.com`,
    ``,
    `Name:     ${name}`,
    business  ? `Business: ${business}` : null,
    `City:     ${city}`,
    `Package:  ${pkg || "Not specified"}`,
    `Timeline: ${timeline || "Not specified"}`,
    `Contact:  ${contact_method} — ${contact_value}`,
    website   ? `Website:  ${website}` : null,
    notes && notes !== "(none)" ? `Notes: ${notes}` : null,
    ``,
    `Received: ${timestamp} MT`,
  ].filter(Boolean).join("\n");

  // ── ntfy.sh push ──────────────────────────────────────────────────────────
  const { NTFY_TOPIC } = process.env;
  if (NTFY_TOPIC) {
    await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method:  "POST",
      headers: {
        "Title":        "New Audit Request — RubyxQube",
        "Priority":     "high",
        "Tags":         "bell,moneybag",
        "Content-Type": "text/plain",
      },
      body: alertText,
    }).catch(err => console.error("ntfy error:", err.message));
  }

  // ── TextBelt SMS ──────────────────────────────────────────────────────────
  const { TEXTBELT_KEY, ALERT_PHONE_NUMBER } = process.env;
  if (TEXTBELT_KEY && ALERT_PHONE_NUMBER) {
    const params = new URLSearchParams({
      phone:   ALERT_PHONE_NUMBER,
      message: alertText,
      key:     TEXTBELT_KEY,
    });
    await fetch("https://textbelt.com/text", {
      method:  "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:    params.toString(),
    }).catch(err => console.error("TextBelt error:", err.message));
  }

  // ── Resend email ──────────────────────────────────────────────────────────
  const { RESEND_API_KEY, ALERT_EMAIL, FROM_EMAIL } = process.env;
  if (RESEND_API_KEY && ALERT_EMAIL) {
    await fetch("https://api.resend.com/emails", {
      method:  "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify({
        // FROM_EMAIL must be a Resend-verified domain address (e.g. alerts@rubyxqube.com).
        // If unset, falls back to Resend's shared sender — set this in Vercel env vars.
        from:     FROM_EMAIL || "onboarding@resend.dev",
        to:       [ALERT_EMAIL],
        subject:  `New audit request — ${name}`,
        text:     alertText,
        ...(contact_method === "Email" && contact_value ? { reply_to: contact_value } : {}),
      }),
    }).catch(err => console.error("Resend error:", err.message));
  }

  // ── Supabase lead ─────────────────────────────────────────────────────────
  const leadNotes = [
    business  ? `Business: ${business}`          : null,
    `City: ${city}`,
    pkg       ? `Package interest: ${pkg}`        : null,
    timeline  ? `Timeline: ${timeline}`           : null,
    website   ? `Website: ${website}`             : null,
    notes && notes !== "(none)" ? `Notes: ${notes}` : null,
  ].filter(Boolean).join("\n");

  saveLeadToSupabase({
    name,
    phone: contact_method === "Phone" ? contact_value : null,
    email: contact_method === "Email" ? contact_value : null,
    service_needed: pkg || null,
    notes: leadNotes || null,
  });

  return res.status(200).json({ ok: true });
}
