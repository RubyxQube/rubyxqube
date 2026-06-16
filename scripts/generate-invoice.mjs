#!/usr/bin/env node
/**
 * scripts/generate-invoice.mjs
 *
 * Generates a branded invoice and emails it to a check-paying client.
 * Saves a JSON record locally under invoices/[client-slug]/[YYYY-MM].json
 *
 * Usage (interactive):
 *   node scripts/generate-invoice.mjs
 *
 * Usage (flags):
 *   node scripts/generate-invoice.mjs --name "Manny Dela Cruz" --email "manny@phoenixstoneworks.com" --plan "Momentum" --amount 999 --month "2026-07"
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";
import * as readline from "readline";

// ─── Load env ─────────────────────────────────────────────────────────────────
function loadEnv() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...rest] = trimmed.split("=");
      if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
    }
  } catch {}
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]?.replace(/^--/, "");
    const val = args[i + 1];
    if (key && val) result[key] = val;
  }
  return result;
}

function prompt(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function generateInvoiceNumber(month) {
  const seq = String(Math.floor(Math.random() * 900) + 100);
  return `INV-${month.replace("-", "")}-${seq}`;
}

// ─── Invoice HTML email ───────────────────────────────────────────────────────
function buildInvoiceEmail({ invoiceNumber, clientName, plan, amount, month, dueDate, invoiceDate }) {
  const displayMonth = new Date(`${month}-01`).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const amountFormatted = `$${parseFloat(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0ea;font-family:'Plus Jakarta Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0ea;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#080808;border-radius:12px 12px 0 0;padding:28px 40px;text-align:left;">
          <span style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">RubyxQube</span>
          <span style="font-size:11px;font-weight:700;color:#e11d48;letter-spacing:0.12em;text-transform:uppercase;display:block;margin-top:4px;">LLC</span>
        </td></tr>

        <!-- Invoice meta -->
        <tr><td style="background:#ffffff;padding:36px 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:top;">
                <div style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Invoice</div>
                <div style="font-size:28px;font-weight:800;color:#111827;">${amountFormatted}</div>
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

        <!-- Divider -->
        <tr><td style="background:#ffffff;padding:24px 40px 0;">
          <div style="height:1px;background:#f3f4f6;"></div>
        </td></tr>

        <!-- Line item -->
        <tr><td style="background:#ffffff;padding:24px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr style="border-bottom:1px solid #f3f4f6;">
              <td style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;padding-bottom:10px;">Description</td>
              <td style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;padding-bottom:10px;text-align:right;">Amount</td>
            </tr>
            <tr>
              <td style="padding:14px 0;font-size:14px;color:#111827;font-weight:600;">${plan} — ${displayMonth}</td>
              <td style="padding:14px 0;font-size:14px;color:#111827;font-weight:600;text-align:right;">${amountFormatted}</td>
            </tr>
            <tr>
              <td style="padding-top:14px;border-top:1px solid #f3f4f6;font-size:14px;font-weight:700;color:#111827;">Total due</td>
              <td style="padding-top:14px;border-top:1px solid #f3f4f6;font-size:16px;font-weight:800;color:#e11d48;text-align:right;">${amountFormatted}</td>
            </tr>
          </table>
        </td></tr>

        <!-- Payment instructions -->
        <tr><td style="background:#fafafa;border:1px solid #f3f4f6;border-radius:8px;margin:0 40px;padding:20px 24px;">
        </td></tr>
        <tr><td style="background:#ffffff;padding:0 40px 8px;">
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

        <!-- Footer -->
        <tr><td style="background:#080808;border-radius:0 0 12px 12px;padding:24px 40px;margin-top:0;">
          <div style="font-size:12px;color:rgba(255,255,255,0.5);line-height:1.6;">
            RubyxQube LLC · Boise, Idaho · rubyxqube.com<br>
            EIN: 42-2759140
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Send via Resend ──────────────────────────────────────────────────────────
async function sendInvoiceEmail({ to, clientName, invoiceNumber, htmlBody }) {
  const { RESEND_API_KEY } = process.env;
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not set");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Boyd Querubin <boyd@rubyxqube.com>",
      to: [to],
      reply_to: "boyd@rubyxqube.com",
      subject: `Invoice ${invoiceNumber} from RubyxQube`,
      html: htmlBody,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Resend error");
  return data;
}

// ─── Save record locally ──────────────────────────────────────────────────────
function saveRecord(slug, month, record) {
  const dir = resolve(process.cwd(), "invoices", slug);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, `${month}.json`), JSON.stringify(record, null, 2));
}

// ─── Interactive mode ─────────────────────────────────────────────────────────
async function interactiveMode() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  RubyxQube — Generate Client Invoice");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  const name   = (await prompt(rl, "  Client name:          ")).trim();
  const email  = (await prompt(rl, "  Client email:         ")).trim();
  const plan   = (await prompt(rl, "  Plan (e.g. Momentum): ")).trim();
  const amount = (await prompt(rl, "  Amount ($):           ")).trim();
  const month  = (await prompt(rl, "  Month (YYYY-MM):      ")).trim();

  rl.close();
  return { name, email, plan, amount, month };
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  loadEnv();

  const args = parseArgs();
  let name, email, plan, amount, month;

  if (args.name && args.email && args.plan && args.amount && args.month) {
    ({ name, email, plan, amount, month } = args);
  } else {
    ({ name, email, plan, amount, month } = await interactiveMode());
  }

  const today      = new Date();
  const invoiceDate = today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const due         = new Date(today); due.setDate(due.getDate() + 5);
  const dueDate     = due.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const invoiceNumber = generateInvoiceNumber(month);
  const slug          = slugify(name);

  console.log(`\n  ⏳  Generating invoice ${invoiceNumber}…\n`);

  const html = buildInvoiceEmail({ invoiceNumber, clientName: name, plan, amount, month, dueDate, invoiceDate });

  await sendInvoiceEmail({ to: email, clientName: name, invoiceNumber, htmlBody: html });

  const record = { invoiceNumber, client: name, email, plan, amount: parseFloat(amount), month, invoiceDate, dueDate, status: "sent" };
  saveRecord(slug, month, record);

  console.log(`  ✅  Invoice sent to ${email}`);
  console.log(`  📁  Saved to invoices/${slug}/${month}.json\n`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`  Invoice #: ${invoiceNumber}`);
  console.log(`  Amount:    $${parseFloat(amount).toLocaleString()}`);
  console.log(`  Due:       ${dueDate}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main().catch(err => {
  console.error("\n❌  Error:", err.message, "\n");
  process.exit(1);
});
