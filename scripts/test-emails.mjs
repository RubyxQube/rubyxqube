#!/usr/bin/env node
/**
 * scripts/test-emails.mjs
 * Sends all four branded HTML emails to boyd@rubyxqube.com for visual review.
 *
 * Usage:
 *   node scripts/test-emails.mjs
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// ─── Load .env.local ──────────────────────────────────────────────────────────
function loadEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const [key, ...rest] = t.split("=");
      if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
    }
  } catch {}
}

// ─── Resend helper ────────────────────────────────────────────────────────────
async function send({ to, subject, html }) {
  const { RESEND_API_KEY } = process.env;
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not set in .env.local");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Boyd Querubin <boyd@rubyxqube.com>",
      to: [to],
      reply_to: "boyd@rubyxqube.com",
      subject,
      html,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || JSON.stringify(data));
  return data.id;
}

// ─── Shared shell ─────────────────────────────────────────────────────────────
const LOGO = `<img src="https://rubyxqube.com/brand/logo-h-white.png" alt="RubyxQube" width="160" style="display:block;width:160px;height:auto;">`;

function shell(bodyContent) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0ea;font-family:'Plus Jakarta Sans',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0ea;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="background:#080808;border-radius:12px 12px 0 0;padding:24px 40px;">${LOGO}</td></tr>
${bodyContent}
<tr><td style="background:#080808;border-radius:0 0 12px 12px;padding:20px 40px;">
  <div style="font-size:12px;color:rgba(255,255,255,0.5);">Boyd Querubin · RubyxQube LLC · boyd@rubyxqube.com · rubyxqube.com</div>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

// ─── 1. Welcome email (on contract signing) ───────────────────────────────────
function buildWelcomeEmail() {
  const firstName = "Manny";
  const pkg = "Momentum";
  return shell(`
<tr><td style="background:#ffffff;padding:36px 40px;">
  <h1 style="font-size:24px;font-weight:800;color:#111827;margin:0 0 16px;">You're in, ${firstName}.</h1>
  <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px;">
    Your <strong>${pkg} agreement</strong> is signed and on file. I'll be in touch within 24 hours to kick things off.
  </p>
  <p style="font-size:14px;color:#6b7280;line-height:1.7;margin:0 0 24px;">
    In the meantime, it helps to have these ready:
  </p>
  <ul style="padding-left:20px;margin:0 0 24px;">
    <li style="font-size:14px;color:#374151;margin-bottom:8px;">Your logo files (PNG or SVG, any size)</li>
    <li style="font-size:14px;color:#374151;margin-bottom:8px;">5–10 photos of your work or business</li>
    <li style="font-size:14px;color:#374151;margin-bottom:8px;">Your services list with rough pricing</li>
    <li style="font-size:14px;color:#374151;margin-bottom:8px;">The cities or zip codes you serve</li>
    <li style="font-size:14px;color:#374151;margin-bottom:8px;">Your hours of operation</li>
  </ul>
  <p style="font-size:14px;color:#6b7280;line-height:1.7;margin:0;">
    Questions before then? Reply to this email or text me at (208) 970-8624.
  </p>
</td></tr>`);
}

// ─── 2. Payment confirmation (invoice.paid) ────────────────────────────────────
function buildPaymentConfirmationEmail() {
  const amount = "$999.00";
  const period = "Momentum — July 2026";
  const invoiceNumber = "INV-202607-447";
  return shell(`
<tr><td style="background:#ffffff;padding:36px 40px;">
  <h1 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 16px;">Payment received — thank you.</h1>
  <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px;">
    We received your payment of <strong>${amount}</strong> for <strong>${period}</strong>. Your subscription is active and nothing else is needed from you.
  </p>
  <p style="font-size:14px;color:#6b7280;line-height:1.7;margin:0 0 24px;">
    You'll receive a detailed receipt from Stripe separately. Questions about your invoice? Just reply to this email.
  </p>
  <p style="font-size:14px;color:#6b7280;">Invoice: ${invoiceNumber}</p>
</td></tr>`);
}

// ─── 3. Payment failed (invoice.payment_failed) ────────────────────────────────
function buildPaymentFailedEmail() {
  const amount = "$999.00";
  return shell(`
<tr><td style="background:#ffffff;padding:36px 40px;">
  <h1 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 16px;">Action needed — payment unsuccessful.</h1>
  <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px;">
    We were unable to process your payment of <strong>${amount}</strong>. This is usually caused by an expired card or insufficient funds.
  </p>
  <p style="font-size:14px;color:#6b7280;line-height:1.7;margin:0 0 24px;">
    Stripe will automatically retry. To update your payment method, reply to this email and Boyd will send you a secure link — it takes less than 2 minutes.
  </p>
  <p style="font-size:14px;color:#6b7280;">
    If you have questions, reply here or call <a href="tel:+12089708624" style="color:#e11d48;">(208) 970-8624</a>.
  </p>
</td></tr>`);
}

// ─── 4. Invoice (check-paying client) ─────────────────────────────────────────
function buildInvoiceEmail() {
  const invoiceNumber = "INV-202607-382";
  const clientName = "Manny Dela Cruz";
  const plan = "Momentum";
  const amount = "$999.00";
  const displayMonth = "July 2026";
  const invoiceDate = "June 15, 2026";
  const dueDate = "June 25, 2026";

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0ea;font-family:'Plus Jakarta Sans',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0ea;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<tr><td style="background:#080808;border-radius:12px 12px 0 0;padding:24px 40px;text-align:left;">
  ${LOGO}
</td></tr>

<tr><td style="background:#ffffff;padding:36px 40px 0;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="vertical-align:top;">
        <div style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Invoice</div>
        <div style="font-size:28px;font-weight:800;color:#111827;">${amount}</div>
        <div style="font-size:13px;color:#6b7280;margin-top:4px;">${displayMonth} — ${plan}</div>
      </td>
      <td style="vertical-align:top;text-align:right;">
        <div style="font-size:11px;color:#9ca3af;margin-bottom:4px;">${invoiceNumber}</div>
        <div style="font-size:12px;color:#6b7280;">Invoice date: ${invoiceDate}</div>
        <div style="font-size:12px;color:#6b7280;">Due: ${dueDate}</div>
      </td>
    </tr>
  </table>
</td></tr>

<tr><td style="background:#ffffff;padding:24px 40px 0;">
  <div style="height:1px;background:#f3f4f6;"></div>
</td></tr>

<tr><td style="background:#ffffff;padding:24px 40px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;padding-bottom:10px;">Description</td>
      <td style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;padding-bottom:10px;text-align:right;">Amount</td>
    </tr>
    <tr>
      <td style="padding:14px 0;font-size:14px;color:#111827;font-weight:600;">${plan} — ${displayMonth}</td>
      <td style="padding:14px 0;font-size:14px;color:#111827;font-weight:600;text-align:right;">${amount}</td>
    </tr>
    <tr>
      <td style="padding-top:14px;border-top:1px solid #f3f4f6;font-size:14px;font-weight:700;color:#111827;">Total due</td>
      <td style="padding-top:14px;border-top:1px solid #f3f4f6;font-size:16px;font-weight:800;color:#e11d48;text-align:right;">${amount}</td>
    </tr>
  </table>
</td></tr>

<tr><td style="background:#ffffff;padding:0 40px 36px;">
  <table width="100%" style="background:#fafafa;border:1px solid #f3f4f6;border-radius:8px;" cellpadding="0" cellspacing="0">
    <tr><td style="padding:20px 24px;">
      <div style="font-size:12px;font-weight:700;color:#374151;margin-bottom:8px;">Pay by check</div>
      <div style="font-size:13px;color:#6b7280;line-height:1.6;">
        Make checks payable to <strong style="color:#111827;">RubyxQube LLC</strong><br>
        Questions? Reply to this email or call (208) 970-8624
      </div>
    </td></tr>
  </table>
</td></tr>

<tr><td style="background:#080808;border-radius:0 0 12px 12px;padding:24px 40px;">
  <div style="font-size:12px;color:rgba(255,255,255,0.5);line-height:1.6;">
    RubyxQube LLC · Boise, Idaho · rubyxqube.com<br>
    EIN: 42-2759140
  </div>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  loadEnv();
  const TO = process.env.ALERT_EMAIL || "boyd@rubyxqube.com";

  const emails = [
    {
      label: "1. Welcome (contract signed)",
      subject: "[TEST] You're signed — Momentum with RubyxQube",
      html: buildWelcomeEmail(),
    },
    {
      label: "2. Payment confirmation (invoice.paid)",
      subject: "[TEST] Payment received — $999.00 — RubyxQube",
      html: buildPaymentConfirmationEmail(),
    },
    {
      label: "3. Payment failed (invoice.payment_failed)",
      subject: "[TEST] Action needed — payment unsuccessful — RubyxQube",
      html: buildPaymentFailedEmail(),
    },
    {
      label: "4. Invoice (check client)",
      subject: "[TEST] Invoice INV-202607-382 from RubyxQube",
      html: buildInvoiceEmail(),
    },
  ];

  console.log(`\nSending ${emails.length} test emails to ${TO}...\n`);

  for (const email of emails) {
    try {
      const id = await send({ to: TO, subject: email.subject, html: email.html });
      console.log(`  ✓  ${email.label}  (id: ${id})`);
    } catch (err) {
      console.error(`  ✗  ${email.label}  — ${err.message}`);
    }
  }

  console.log("\nDone. Check your inbox.\n");
}

main();
