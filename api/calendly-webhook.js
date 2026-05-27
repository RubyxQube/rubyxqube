/**
 * api/calendly-webhook.js
 * Receives Calendly webhook events and alerts Boyd when someone books or cancels.
 *
 * Setup in Calendly:
 *   Integrations → Webhooks → New Webhook
 *   URL: https://rubyxqube.com/api/calendly-webhook
 *   Events: invitee.created (booking) + invitee.canceled (cancellation)
 *
 * Env vars:
 *   NTFY_TOPIC                    push notification to Boyd's phone (free)
 *   TEXTBELT_KEY                  SMS to Boyd's phone (~$0.01/text)
 *   ALERT_PHONE_NUMBER            Boyd's cell, E.164: +1XXXXXXXXXX
 *   RESEND_API_KEY + ALERT_EMAIL  email alert (free)
 *   CALENDLY_WEBHOOK_SIGNING_KEY  optional — verify requests are from Calendly
 */

import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // ── Optional signature verification ──────────────────────────────────────
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  if (signingKey) {
    const signature = req.headers["calendly-webhook-signature"];
    if (!signature) return res.status(401).json({ error: "Missing signature" });

    const parts     = Object.fromEntries(signature.split(",").map(p => p.split("=")));
    const timestamp = parts.t;
    const expected  = crypto
      .createHmac("sha256", signingKey)
      .update(`${timestamp}.${JSON.stringify(req.body)}`)
      .digest("hex");

    if (expected !== parts.v1) return res.status(401).json({ error: "Invalid signature" });
  }

  const { event, payload } = req.body || {};

  // ── Parse booking details ─────────────────────────────────────────────────
  const name      = payload?.invitee?.name                    || "Unknown";
  const email     = payload?.invitee?.email                   || "No email";
  const phone     = payload?.invitee?.text_reminder_number    || null;
  const eventName = payload?.event_type?.name || payload?.event?.name || "Audit Call";
  const startTime = payload?.event?.start_time || payload?.scheduled_event?.start_time;

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

  if (event === "invitee.created") {
    alertText = [
      `New booking — ${eventName}`,
      ``,
      `Name:  ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `When:  ${when} (Mountain Time)`,
    ].filter(Boolean).join("\n");
  } else if (event === "invitee.canceled") {
    const reason = payload?.cancellation?.reason || "No reason given";
    alertText = [
      `Booking canceled — ${eventName}`,
      ``,
      `Name:   ${name}`,
      `Email:  ${email}`,
      `Was:    ${when} (Mountain Time)`,
      `Reason: ${reason}`,
    ].join("\n");
  } else {
    console.log("Unhandled Calendly event:", event);
    return res.status(200).json({ ok: true });
  }

  const isBooking  = event === "invitee.created";
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
