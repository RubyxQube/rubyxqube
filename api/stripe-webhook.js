/**
 * api/stripe-webhook.js
 * Receives Stripe events and alerts Boyd + logs to Notion.
 *
 * Events handled:
 *   customer.subscription.created  — new client signed up
 *   customer.subscription.deleted  — client cancelled
 *   invoice.paid                   — payment successful
 *   invoice.payment_failed         — payment failed, needs follow-up
 *
 * Env vars required:
 *   STRIPE_SECRET_KEY
 *   STRIPE_WEBHOOK_SECRET
 *   NTFY_TOPIC
 *   TEXTBELT_KEY + ALERT_PHONE_NUMBER
 *   RESEND_API_KEY + ALERT_EMAIL
 */

import Stripe from "stripe";

export const config = { api: { bodyParser: false } };

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.setEncoding("utf8");
    req.on("data", chunk => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

// ─── Alert helpers ────────────────────────────────────────────────────────────

async function notify({ title, body, priority = "default", tags = "bell" }) {
  const { NTFY_TOPIC, TEXTBELT_KEY, ALERT_PHONE_NUMBER, RESEND_API_KEY, ALERT_EMAIL } = process.env;

  await Promise.allSettled([
    NTFY_TOPIC && fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method: "POST",
      headers: { Title: title, Priority: priority, Tags: tags, "Content-Type": "text/plain" },
      body,
    }),
    TEXTBELT_KEY && ALERT_PHONE_NUMBER && fetch("https://textbelt.com/text", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ phone: ALERT_PHONE_NUMBER, message: `${title}\n${body}`, key: TEXTBELT_KEY }).toString(),
    }),
    RESEND_API_KEY && ALERT_EMAIL && fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "RubyxQube <boyd@rubyxqube.com>",
        to: [ALERT_EMAIL],
        subject: title,
        text: body,
      }),
    }),
  ]);
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const rawBody = await getRawBody(req);
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Stripe webhook signature error:", err.message);
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  const data = event.data.object;

  switch (event.type) {

    case "customer.subscription.created": {
      const plan = data.items?.data?.[0]?.price?.nickname || data.items?.data?.[0]?.price?.id || "Unknown plan";
      const amount = ((data.items?.data?.[0]?.price?.unit_amount || 0) / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
      await notify({
        title: "New Subscription — Client Card on File",
        body: `Plan: ${plan}\nAmount: ${amount}/mo\nCustomer: ${data.customer}\nStatus: ${data.status}`,
        priority: "high",
        tags: "moneybag,tada",
      });
      break;
    }

    case "customer.subscription.deleted": {
      const plan = data.items?.data?.[0]?.price?.nickname || "Unknown plan";
      await notify({
        title: "Subscription Cancelled",
        body: `Plan: ${plan}\nCustomer: ${data.customer}\nEnded: ${new Date(data.ended_at * 1000).toLocaleDateString()}`,
        priority: "high",
        tags: "warning,x",
      });
      break;
    }

    case "invoice.paid": {
      const amount = (data.amount_paid / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
      const customerEmail = data.customer_email || "unknown";
      const period = data.lines?.data?.[0]?.description || "";
      await notify({
        title: `Payment Received — ${amount}`,
        body: `Customer: ${customerEmail}\nAmount: ${amount}\nPeriod: ${period}\nInvoice: ${data.number || data.id}`,
        priority: "high",
        tags: "white_check_mark,moneybag",
      });
      break;
    }

    case "invoice.payment_failed": {
      const amount = (data.amount_due / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
      const customerEmail = data.customer_email || "unknown";
      await notify({
        title: "PAYMENT FAILED — Follow Up Now",
        body: `Customer: ${customerEmail}\nAmount due: ${amount}\nAttempt: ${data.attempt_count}\nNext retry: ${data.next_payment_attempt ? new Date(data.next_payment_attempt * 1000).toLocaleDateString() : "none"}`,
        priority: "urgent",
        tags: "rotating_light,x",
      });
      break;
    }

    default:
      console.log(`Unhandled Stripe event: ${event.type}`);
  }

  return res.status(200).json({ received: true });
}
