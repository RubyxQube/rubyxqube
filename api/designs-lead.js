/**
 * api/designs-lead.js
 * Called when a visitor completes both steps on /designs and submits their info.
 * Alerts Boyd via ntfy.sh push, TextBelt SMS, and Resend email.
 */

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, style, palette } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: "name and email required" });

  const alertText = [
    `New design lead — rubyxqube.com/designs`,
    ``,
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Style:   ${style   || "not selected"}`,
    `Palette: ${palette || "not selected"}`,
  ].join("\n");

  // ── ntfy.sh push ──────────────────────────────────────────────────────────
  const { NTFY_TOPIC } = process.env;
  if (NTFY_TOPIC) {
    await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method:  "POST",
      headers: {
        "Title":        "New Design Lead — RubyxQube",
        "Priority":     "high",
        "Tags":         "art,bell",
        "Content-Type": "text/plain",
      },
      body: alertText,
    }).catch(err => console.error("ntfy error:", err.message));
  }

  // ── TextBelt SMS ──────────────────────────────────────────────────────────
  const { TEXTBELT_KEY, ALERT_PHONE_NUMBER } = process.env;
  if (TEXTBELT_KEY && ALERT_PHONE_NUMBER) {
    await fetch("https://textbelt.com/text", {
      method:  "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:    new URLSearchParams({ phone: ALERT_PHONE_NUMBER, message: alertText, key: TEXTBELT_KEY }).toString(),
    }).catch(err => console.error("TextBelt error:", err.message));
  }

  // ── Resend email ──────────────────────────────────────────────────────────
  const { RESEND_API_KEY, ALERT_EMAIL, FROM_EMAIL } = process.env;
  if (RESEND_API_KEY && ALERT_EMAIL) {
    await fetch("https://api.resend.com/emails", {
      method:  "POST",
      headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from:    FROM_EMAIL || "onboarding@resend.dev",
        to:      [ALERT_EMAIL],
        subject: `New design lead — ${name}`,
        text:    alertText,
      }),
    }).catch(err => console.error("Resend error:", err.message));
  }

  return res.status(200).json({ ok: true });
}
