/**
 * api/designs-lead.js
 * Called when a visitor completes both steps on /designs and submits their info.
 * Sends Boyd an SMS with their name, email, chosen style, and chosen palette.
 */

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, style, palette } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: "name and email required" });

  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, ALERT_PHONE_NUMBER } = process.env;

  if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_FROM_NUMBER && ALERT_PHONE_NUMBER) {
    const body = [
      `🎨 New design lead from rubyxqube.com/designs`,
      ``,
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Style:   ${style || "not selected"}`,
      `Palette: ${palette || "not selected"}`,
    ].join("\n");

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
