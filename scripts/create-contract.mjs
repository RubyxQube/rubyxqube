#!/usr/bin/env node
/**
 * scripts/create-contract.mjs
 *
 * Generate a contract token and create the entry in Notion.
 * Outputs the signing URL to share with the client.
 *
 * Run with no args for interactive mode (recommended):
 *   node scripts/create-contract.mjs
 *
 * Or pass args directly:
 *   node scripts/create-contract.mjs --client "Jane Smith" --email "jane@example.com" --phone "(208) 555-1234" --package "Momentum" --amount 2400 --desc "5-page site with AI chat"
 *
 * Packages: Launch | Momentum | Autopilot | Custom
 */

import { randomBytes } from "crypto";
import { readFileSync } from "fs";
import { resolve } from "path";
import * as readline from "readline";

// ─── Load env ────────────────────────────────────────────────────────────────
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

// ─── Parse args ───────────────────────────────────────────────────────────────
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

// ─── Interactive prompt ───────────────────────────────────────────────────────
function prompt(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function interactiveMode() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  RubyxQube — New Client Contract");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  const clientName  = (await prompt(rl, "  Client name:          ")).trim();
  const clientEmail = (await prompt(rl, "  Client email:         ")).trim();
  const clientPhone = (await prompt(rl, "  Client phone:         ")).trim();

  console.log("\n  Packages: 1) Launch  2) Autopilot  3) Momentum  4) Custom");
  const pkgInput    = (await prompt(rl, "  Package (1-4):        ")).trim();
  const pkgMap      = { "1": "Launch", "2": "Autopilot", "3": "Momentum", "4": "Custom" };
  const pkg         = pkgMap[pkgInput] || pkgInput;

  const amountRaw   = (await prompt(rl, "  Total amount ($):     ")).trim();
  const termsInput  = (await prompt(rl, "  Payment terms (e.g. '50% upfront, 50% on launch')\n  Hit Enter to use default: ")).trim();
  const terms       = termsInput || "50% upfront, 50% on launch";
  const desc        = (await prompt(rl, "  Project description:  ")).trim();

  rl.close();

  // Confirm
  console.log("\n  ┌─────────────────────────────────┐");
  console.log(`  │  Client:   ${clientName}`);
  console.log(`  │  Package:  ${pkg}`);
  console.log(`  │  Amount:   $${parseFloat(amountRaw).toLocaleString()}`);
  console.log(`  │  Terms:    ${terms}`);
  console.log("  └─────────────────────────────────┘\n");

  return { clientName, clientEmail, clientPhone, pkg, amount: amountRaw, terms, desc };
}

// ─── Notion ───────────────────────────────────────────────────────────────────
async function createNotionContract({ token, clientName, clientEmail, clientPhone, pkg, amount, paymentTerms, projectDescription }) {
  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: process.env.NOTION_CONTRACTS_DATABASE_ID },
      properties: {
        Name:                  { title: [{ text: { content: `Contract — ${clientName}` } }] },
        Token:                 { rich_text: [{ text: { content: token } }] },
        "Client Name":         { rich_text: [{ text: { content: clientName } }] },
        "Client Email":        { email: clientEmail || null },
        Phone:                 { phone_number: clientPhone || null },
        Package:               { select: { name: pkg } },
        Amount:                { number: parseFloat(amount) },
        "Payment Terms":       { rich_text: [{ text: { content: paymentTerms || "50% upfront, 50% on launch" } }] },
        "Project Description": { rich_text: [{ text: { content: projectDescription || "" } }] },
        Status:                { select: { name: "Pending" } },
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Notion API error");
  return data;
}

// ─── Email template ───────────────────────────────────────────────────────────
function printEmailTemplate(clientName, pkg, amount, url) {
  const first = clientName.split(" ")[0];
  console.log("  ┌─── CLOSING EMAIL — copy & paste ────────────────────────────┐\n");
  console.log(`  Subject: Your RubyxQube Agreement — ${pkg} Package\n`);
  console.log(`  Hi ${first},\n`);
  console.log(`  Excited to get started on your site. Here's the agreement for`);
  console.log(`  your ${pkg} package ($${parseFloat(amount).toLocaleString()}) — just read through`);
  console.log(`  and type your name at the bottom to sign electronically:\n`);
  console.log(`  👉 ${url}\n`);
  console.log(`  Once signed, I'll send over the first invoice and we'll kick`);
  console.log(`  things off from there. Any questions, just reply here.\n`);
  console.log(`  — Boyd`);
  console.log(`  RubyxQube | boyd@rubyxqube.com | (208) 970-8624\n`);
  console.log("  └─────────────────────────────────────────────────────────────┘\n");
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  loadEnv();

  if (!process.env.NOTION_TOKEN || !process.env.NOTION_CONTRACTS_DATABASE_ID) {
    console.error("\n❌  NOTION_TOKEN or NOTION_CONTRACTS_DATABASE_ID not set in .env.local\n");
    process.exit(1);
  }

  const args = parseArgs();
  const hasArgs = args.client && args.package && args.amount;

  let clientName, clientEmail, clientPhone, pkg, amount, terms, desc;

  if (hasArgs) {
    // Flag mode
    clientName  = args.client;
    clientEmail = args.email  || "";
    clientPhone = args.phone  || "";
    pkg         = args.package;
    amount      = args.amount;
    terms       = args.terms || "50% upfront, 50% on launch";
    desc        = args.desc  || "";
  } else {
    // Interactive mode
    ({ clientName, clientEmail, clientPhone, pkg, amount, terms, desc } = await interactiveMode());
  }

  const token = randomBytes(6).toString("hex");

  console.log("\n  ⏳  Creating contract in Notion…\n");

  await createNotionContract({
    token,
    clientName,
    clientEmail,
    clientPhone,
    pkg,
    amount,
    paymentTerms:       terms,
    projectDescription: desc,
  });

  const url = `https://rubyxqube.com/sign/${token}`;

  console.log(`  ✅  Contract created!`);
  console.log(`      Token: ${token}`);
  console.log(`      URL:   ${url}\n`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  printEmailTemplate(clientName, pkg, amount, url);
}

main().catch(err => {
  console.error("\n❌  Error:", err.message, "\n");
  process.exit(1);
});
