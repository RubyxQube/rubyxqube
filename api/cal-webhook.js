/**
 * api/cal-webhook.js
 * Receives Cal.com webhook events and alerts Boyd when someone books or cancels.
 *
 * Setup in Cal.com:
 *   Settings → Developer → Webhooks → New Webhook
 *   URL: https://rubyxqube.com/api/cal-webhook
 *   Booking link: https://cal.com/boyd-querubin-rubyxqube/free-website-audit
 *   Triggers: BOOKING_CREATED, BOOKING_CANCELLED
 *
 * Env vars:
 *   NTFY_TOPIC                    push notification to Boyd's phone (free)
 *   TEXTBELT_KEY                  SMS to Boyd's phone (~$0.01/text)
 *   ALERT_PHONE_NUMBER            Boyd's cell, E.164: +1XXXXXXXXXX
 *   RESEND_API_KEY + ALERT_EMAIL  email alert (free)
 *   CAL_WEBHOOK_SECRET            optional — verify requests are from Cal.com
 */

import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // ── Optional signature verification ──────────────────────────────────────
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (secret) {
    const signature = req.headers["x-cal-signature-256"];
    if (!signature) return res.status(401).json({ error: "Missing signature" });

    const expected = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (expected !== signature) return res.status(401).json({ error: "Invalid signature" });
  }

  const { triggerEvent, payload } = req.body || {};

  // ── Parse booking details ─────────────────────────────────────────────────
  const attendee  = payload?.attendees?.[0] || {};
  const name      = attendee.name           || "Unknown";
  const email     = attendee.email          || "No email";
  const eventName = payload?.type           || "Audit Call";
  const startTime = payload?.startTime;

  let when = "time TBD";
  if (startTime) {
    try {
      when = new Date(startTime).toLocaleString("en-US", {
        weekday: "short", month: "short", day: "numeric",
        hour: "numeric", minute: "2-digit", timeZone: "America/Boise",
      });
    } catch {}
  }

  // ── Build alert text ──────────────────────────────────────────────────────
  let alertText;

  if (triggerEvent === "BOOKING_CREATED") {
    alertText = [
      `New booking — ${eventName}`,
      ``,
      `Name:  ${name}`,
      `Email: ${email}`,
      `When:  ${when} (Mountain Time)`,
    ].join("\n");
  } else if (triggerEvent === "BOOKING_CANCELLED") {
    const reason = payload?.cancellationReason || "No reason given";
    alertText = [
      `Booking canceled — ${eventName}`,
      ``,
      `Name:   ${name}`,
      `Email:  ${email}`,
      `Was:    ${when} (Mountain Time)`,
      `Reason: ${reason}`,
    ].join("\n");
  } else {
    console.log("Unhandled Cal.com event:", triggerEvent);
    return res.status(200).json({ ok: true });
  }

  const isBooking  = triggerEvent === "BOOKING_CREATED";
  const titleEmoji = isBooking ? "📅" : "❌";

  // ── ntfy.sh push ──────────────────────────────────────────────────────────
  const { NTFY_TOPIC } = process.env;
  if (NTFY_TOPIC) {
    await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method:  "POST",
      headers: {
        "Title":        `${titleEmoji} ${isBooking ? "New Booking" : "Canceled"} — ${eventName}`,
        "Priority":     isBooking ? "high" : "default",
        "Tags":         isBooking ? "calendar,bell" : "x,calendar",
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
        subject: `${isBooking ? "New booking" : "Canceled"} — ${name} (${eventName})`,
        text:    alertText,
      }),
    }).catch(err => console.error("Resend error:", err.message));
  }

  return res.status(200).json({ ok: true });
}
