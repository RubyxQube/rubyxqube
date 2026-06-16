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

// ─── Client-facing emails ─────────────────────────────────────────────────────

async function sendClientPaymentConfirmation(invoice, amountFormatted) {
  const { RESEND_API_KEY } = process.env;
  if (!RESEND_API_KEY) return;
  const period = invoice.lines?.data?.[0]?.description || "this month";
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f0ea;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0ea;padding:40px 20px;">
<tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="background:#080808;border-radius:12px 12px 0 0;padding:24px 40px;">
  <img src="https://rubyxqube.com/brand/logo-horizontal-clean-dark.png" alt="RubyxQube" width="160" style="display:block;width:160px;height:auto;">
</td></tr>
<tr><td style="background:#fff;padding:36px 40px;">
  <h1 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 16px;">Payment received — thank you.</h1>
  <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px;">
    We received your payment of <strong>${amountFormatted}</strong> for <strong>${period}</strong>. Your subscription is active and nothing else is needed from you.
  </p>
  <p style="font-size:14px;color:#6b7280;line-height:1.7;margin:0 0 24px;">
    You'll receive a detailed receipt from Stripe separately. Questions about your invoice? Just reply to this email.
  </p>
  <p style="font-size:14px;color:#6b7280;">Invoice: ${invoice.number || invoice.id}</p>
</td></tr>
<tr><td style="background:#080808;border-radius:0 0 12px 12px;padding:20px 40px;">
  <div style="font-size:12px;color:rgba(255,255,255,0.5);">Boyd Querubin · RubyxQube LLC · boyd@rubyxqube.com · rubyxqube.com</div>
</td></tr>
</table></td></tr></table>
</body></html>`;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Boyd Querubin <boyd@rubyxqube.com>",
      to: [invoice.customer_email],
      reply_to: "boyd@rubyxqube.com",
      subject: `Payment received — ${amountFormatted} — RubyxQube`,
      html,
    }),
  }).catch(err => console.error("Resend client payment email error:", err.message));
}

async function sendClientPaymentFailed(invoice, amountFormatted) {
  const { RESEND_API_KEY } = process.env;
  if (!RESEND_API_KEY) return;
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f0ea;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0ea;padding:40px 20px;">
<tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="background:#080808;border-radius:12px 12px 0 0;padding:24px 40px;">
  <img src="https://rubyxqube.com/brand/logo-horizontal-clean-dark.png" alt="RubyxQube" width="160" style="display:block;width:160px;height:auto;">
</td></tr>
<tr><td style="background:#fff;padding:36px 40px;">
  <h1 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 16px;">Action needed — payment unsuccessful.</h1>
  <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px;">
    We were unable to process your payment of <strong>${amountFormatted}</strong>. This is usually caused by an expired card or insufficient funds.
  </p>
  <p style="font-size:14px;color:#6b7280;line-height:1.7;margin:0 0 24px;">
    Stripe will automatically retry. To update your payment method, reply to this email and Boyd will send you a secure link — it takes less than 2 minutes.
  </p>
  <p style="font-size:14px;color:#6b7280;">
    If you have questions, reply here or call <a href="tel:+12089708624" style="color:#e11d48;">(208) 970-8624</a>.
  </p>
</td></tr>
<tr><td style="background:#080808;border-radius:0 0 12px 12px;padding:20px 40px;">
  <div style="font-size:12px;color:rgba(255,255,255,0.5);">Boyd Querubin · RubyxQube LLC · boyd@rubyxqube.com · rubyxqube.com</div>
</td></tr>
</table></td></tr></table>
</body></html>`;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Boyd Querubin <boyd@rubyxqube.com>",
      to: [invoice.customer_email],
      reply_to: "boyd@rubyxqube.com",
      subject: "Action needed — payment unsuccessful — RubyxQube",
      html,
    }),
  }).catch(err => console.error("Resend payment failed email error:", err.message));
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
      if (data.customer_email) await sendClientPaymentConfirmation(data, amount);
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
      if (data.customer_email) await sendClientPaymentFailed(data, amount);
      break;
    }

    default:
      console.log(`Unhandled Stripe event: ${event.type}`);
  }

  return res.status(200).json({ received: true });
}
