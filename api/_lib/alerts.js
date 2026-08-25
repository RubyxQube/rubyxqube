/**
 * api/_lib/alerts.js - shared SMS alerting for rubyxqube.com.
 *
 * Underscore-prefixed, so Vercel does not route it as a function.
 *
 * WHY THIS EXISTS
 * Five endpoints sent Boyd an SMS through TextBelt, gated behind
 * `if (TEXTBELT_KEY && ALERT_PHONE_NUMBER)`. TEXTBELT_KEY has never been set on
 * this Vercel project. The account is provisioned for SignalWire, which only
 * api/chat.js ever used. So contact.js, cal-webhook.js, contract.js,
 * designs-lead.js and stripe-webhook.js have never sent a single text, and
 * nothing surfaced it: a missing key looked exactly like a working one, the
 * request succeeded, and the email and ntfy alerts arrived as normal.
 *
 * stripe-webhook.js is the one that stings. Its urgent "PAYMENT FAILED, follow
 * up now" alert is the single message most worth having arrive as a text, and
 * it never did.
 *
 * Identical bug to the one found in clients/phoenix-stoneworks/api/contact.js,
 * where the dead provider was Twilio. Worth remembering as a shape: an alert
 * channel behind a truthiness check on a variable nobody set is indistinguish-
 * able from a working one until someone goes looking.
 *
 * ── Env ──────────────────────────────────────────────────────────────────────
 *   SIGNALWIRE_SPACE_URL      e.g. rubyxqube.signalwire.com
 *   SIGNALWIRE_PROJECT_ID     project UUID
 *   SIGNALWIRE_API_TOKEN      API token
 *   SIGNALWIRE_FROM_NUMBER    sending number, E.164
 *   ALERT_PHONE_NUMBER        Boyd's cell, E.164. Comma-separated list allowed.
 *
 * A2P 10DLC note: every message this sends goes to RubyxQube's own phone about
 * RubyxQube's own website. That is an internal notification, not a message to
 * an end customer, and is well within the shared "RubyxQube Lead Alerts"
 * campaign. Do not reuse this to text a client's customer on their behalf;
 * that needs its own Brand and Campaign. See .claude/rules/chatbot-rules.md.
 */

export const parseList = (v) =>
  (v || "").split(",").map((s) => s.trim()).filter(Boolean);

/**
 * Text every recipient. Never throws: a failed alert must not fail the
 * visitor's submission or the webhook Stripe is waiting on.
 *
 * SignalWire's LaML endpoint takes one `To` per request, so this is a fan-out
 * rather than one call with a list.
 */
export async function sendSMSAlerts(body, env = process.env) {
  const {
    SIGNALWIRE_SPACE_URL,
    SIGNALWIRE_PROJECT_ID,
    SIGNALWIRE_API_TOKEN,
    SIGNALWIRE_FROM_NUMBER,
  } = env;

  const to = parseList(env.ALERT_PHONE_NUMBER);
  const missing = [
    !SIGNALWIRE_SPACE_URL && "SIGNALWIRE_SPACE_URL",
    !SIGNALWIRE_PROJECT_ID && "SIGNALWIRE_PROJECT_ID",
    !SIGNALWIRE_API_TOKEN && "SIGNALWIRE_API_TOKEN",
    !SIGNALWIRE_FROM_NUMBER && "SIGNALWIRE_FROM_NUMBER",
    !to.length && "ALERT_PHONE_NUMBER",
  ].filter(Boolean);

  if (missing.length) {
    // Loud on purpose. Silence is what let the TextBelt version go unnoticed
    // for three months.
    console.error("SMS alert SKIPPED - SignalWire is not fully configured. Missing: " + missing.join(", "));
    return [];
  }

  // 1600 keeps a long message inside the carrier's segmented-SMS ceiling.
  const smsBody = body.length > 1600 ? body.slice(0, 1597) + "..." : body;
  const auth = Buffer.from(`${SIGNALWIRE_PROJECT_ID}:${SIGNALWIRE_API_TOKEN}`).toString("base64");
  const url = `https://${SIGNALWIRE_SPACE_URL}/api/laml/2010-04-01/Accounts/${SIGNALWIRE_PROJECT_ID}/Messages`;

  return Promise.all(
    to.map(async (number) => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ From: SIGNALWIRE_FROM_NUMBER, To: number, Body: smsBody }).toString(),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          console.error(`SignalWire SMS failed | to: ${number} | ${data.message || res.status}`);
          return { to: number, ok: false };
        }
        console.log(`SignalWire SMS sent | to: ${number} | sid: ${data.sid}`);
        return { to: number, ok: true, sid: data.sid };
      } catch (err) {
        console.error(`SignalWire SMS network error | to: ${number} | ${err.message}`);
        return { to: number, ok: false };
      }
    })
  );
}
