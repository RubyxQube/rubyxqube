/**
 * api/calendly-webhook.js
 * Receives Calendly webhook events and texts Boyd when someone books.
 *
 * Setup in Calendly:
 *   Integrations → Webhooks → New Webhook
 *   URL: https://rubyxqube.com/api/calendly-webhook
 *   Events: invitee.created (booking) + invitee.canceled (cancellation)
 *
 * Env vars needed (already set in Vercel):
 *   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, ALERT_PHONE_NUMBER
 *
 * Optional — set CALENDLY_WEBHOOK_SIGNING_KEY to verify requests are from Calendly:
 *   Found in Calendly → Integrations → Webhooks → your webhook → Signing Key
 */

import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // ── Optional signature verification ─────────────────────────────────────────
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  if (signingKey) {
    const signature = req.headers["calendly-webhook-signature"];
    if (!signature) return res.status(401).json({ error: "Missing signature" });

    // Calendly sends: t=timestamp,v1=hmac
    const parts = Object.fromEntries(signature.split(",").map(p => p.split("=")));
    const timestamp = parts.t;
    const expected  = crypto
      .createHmac("sha256", signingKey)
      .update(`${timestamp}.${JSON.stringify(req.body)}`)
      .digest("hex");

    if (expected !== parts.v1) return res.status(401).json({ error: "Invalid signature" });
  }

  const { event, payload } = req.body || {};

  // ── Parse booking details ────────────────────────────────────────────────────
  const name      = payload?.invitee?.name       || "Unknown";
  const email     = payload?.invitee?.email      || "No email";
  const phone     = payload?.invitee?.text_reminder_number || null;
  const eventName = payload?.event_type?.name    || payload?.event?.name || "Audit Call";
  const startTime = payload?.event?.start_time   || payload?.scheduled_event?.start_time;

  // Format date/time if available
  let when = "time TBD";
  if (startTime) {
    try {
      when = new Date(startTime).toLocaleString("en-US", {
        weekday: "short",
        month:   "short",
        day:     "numeric",
        hour:    "numeric",
        minute:  "2-digit",
        timeZone: "America/Boise",
      });
    } catch {}
  }

  // ── Build SMS body ───────────────────────────────────────────────────────────
  let body;

  if (event === "invitee.created") {
    body = [
      `📅 New booking — ${eventName}`,
      ``,
      `Name:  ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `When:  ${when} (Mountain Time)`,
    ].filter(Boolean).join("\n");
  } else if (event === "invitee.canceled") {
    const reason = payload?.cancellation?.reason || "No reason given";
    body = [
      `❌ Booking canceled — ${eventName}`,
      ``,
      `Name:   ${name}`,
      `Email:  ${email}`,
      `Was:    ${when} (Mountain Time)`,
      `Reason: ${reason}`,
    ].join("\n");
  } else {
    // Unknown event type — log and return OK
    console.log("Unhandled Calendly event:", event);
    return res.status(200).json({ ok: true });
  }

  // ── Send SMS ─────────────────────────────────────────────────────────────────
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, ALERT_PHONE_NUMBER } = process.env;

  if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_FROM_NUMBER && ALERT_PHONE_NUMBER) {
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
