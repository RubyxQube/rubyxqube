/**
 * api/contact.js
 * Handles contact/audit request form submissions.
 * - Sends Boyd an SMS via Twilio with the lead's details
 * - Returns 200 so the frontend can show a success message
 *
 * Env vars (already in Vercel):
 *   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, ALERT_PHONE_NUMBER
 */

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, business, city, package: pkg, timeline, contact_method, contact_value, notes, website } = req.body || {};

  if (!name || !city) return res.status(400).json({ error: "name and city required" });

  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, ALERT_PHONE_NUMBER } = process.env;

  if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_FROM_NUMBER && ALERT_PHONE_NUMBER) {
    const body = [
      `🔔 New audit request — rubyxqube.com`,
      ``,
      `Name:     ${name}`,
      business ? `Business: ${business}` : null,
      `City:     ${city}`,
      `Package:  ${pkg || "Not specified"}`,
      `Timeline: ${timeline || "Not specified"}`,
      `Contact:  ${contact_method} — ${contact_value}`,
      website   ? `Website:  ${website}` : null,
      notes && notes !== "(none)" ? `Notes:    ${notes}` : null,
    ].filter(Boolean).join("\n");

    const params = new URLSearchParams({
      To:   ALERT_PHONE_NUMBER,
      From: TWILIO_FROM_NUMBER,
      Body: body,
    });

    await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    ).catch(err => console.error("Twilio error:", err.message));
  }

  return res.status(200).json({ ok: true });
}
