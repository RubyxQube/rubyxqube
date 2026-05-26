#!/usr/bin/env node
/**
 * scripts/create-contract.mjs
 *
 * Generate a contract token and create the entry in Notion.
 * Outputs the signing URL to share with the client.
 *
 * Usage:
 *   node scripts/create-contract.mjs \
 *     --client "Jane Smith" \
 *     --email "jane@example.com" \
 *     --phone "(208) 555-1234" \
 *     --package "Momentum" \
 *     --amount 2400 \
 *     --terms "50% upfront, 50% on launch" \
 *     --desc "5-page website with AI chat receptionist"
 *
 * Packages: Launch | Momentum | Autopilot | Custom
 */

import { randomBytes } from "crypto";
import { readFileSync } from "fs";
import { resolve } from "path";

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
        Name:                 { title: [{ text: { content: `Contract — ${clientName}` } }] },
        Token:                { rich_text: [{ text: { content: token } }] },
        "Client Name":        { rich_text: [{ text: { content: clientName } }] },
        "Client Email":       { email: clientEmail || null },
        Phone:                { phone_number: clientPhone || null },
        Package:              { select: { name: pkg } },
        Amount:               { number: parseFloat(amount) },
        "Payment Terms":      { rich_text: [{ text: { content: paymentTerms || "50% upfront, 50% on launch" } }] },
        "Project Description":{ rich_text: [{ text: { content: projectDescription || "" } }] },
        Status:               { select: { name: "Pending" } },
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Notion API error");
  return data;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  loadEnv();

  const args = parseArgs();
  const required = ["client", "package", "amount"];
  const missing = required.filter(k => !args[k]);

  if (missing.length) {
    console.error(`\n❌  Missing required args: ${missing.map(k => `--${k}`).join(", ")}\n`);
    console.error("Usage:");
    console.error('  node scripts/create-contract.mjs \\');
    console.error('    --client "Jane Smith" \\');
    console.error('    --email "jane@example.com" \\');
    console.error('    --package "Momentum" \\');
    console.error('    --amount 2400 \\');
    console.error('    --terms "50% upfront, 50% on launch" \\');
    console.error('    --desc "5-page site with AI chat"\n');
    process.exit(1);
  }

  if (!process.env.NOTION_TOKEN || !process.env.NOTION_CONTRACTS_DATABASE_ID) {
    console.error("\n❌  NOTION_TOKEN or NOTION_CONTRACTS_DATABASE_ID not set in .env.local\n");
    process.exit(1);
  }

  const token = randomBytes(6).toString("hex"); // 12-char hex token

  console.log("\n⏳  Creating contract in Notion…");

  await createNotionContract({
    token,
    clientName:         args.client,
    clientEmail:        args.email || "",
    clientPhone:        args.phone || "",
    pkg:                args.package,
    amount:             args.amount,
    paymentTerms:       args.terms || "50% upfront, 50% on launch",
    projectDescription: args.desc  || "",
  });

  const url = `https://rubyxqube.com/sign/${token}`;

  console.log("\n✅  Contract created!\n");
  console.log(`   Client:   ${args.client}`);
  console.log(`   Package:  ${args.package}`);
  console.log(`   Amount:   $${parseFloat(args.amount).toLocaleString()}`);
  console.log(`   Token:    ${token}`);
  console.log(`\n   Signing URL (send this to the client):`);
  console.log(`   ${url}\n`);
}

main().catch(err => {
  console.error("\n❌  Error:", err.message, "\n");
  process.exit(1);
});
