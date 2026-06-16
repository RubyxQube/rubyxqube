#!/usr/bin/env node
/**
 * scripts/create-subscription.mjs
 *
 * Creates a Stripe customer + subscription and returns a checkout URL
 * to send to the client so they can enter their card.
 *
 * Run after a contract is signed (card-paying clients only).
 *
 * Usage (interactive):
 *   node scripts/create-subscription.mjs
 *
 * Usage (flags):
 *   node scripts/create-subscription.mjs --name "Manny Dela Cruz" --email "manny@phoenixstoneworks.com" --plan momentum
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import * as readline from "readline";
import Stripe from "stripe";

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

// ─── Prompt ───────────────────────────────────────────────────────────────────
function prompt(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function interactiveMode() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  RubyxQube — Set Up Client Subscription");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  const name  = (await prompt(rl, "  Client name:              ")).trim();
  const email = (await prompt(rl, "  Client email:             ")).trim();

  console.log("\n  Plans: 1) Autopilot ($399/mo)  2) Momentum ($999/mo)");
  const planInput = (await prompt(rl, "  Plan (1 or 2):             ")).trim();
  const plan = planInput === "2" ? "momentum" : "autopilot";

  rl.close();
  return { name, email, plan };
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  loadEnv();

  const { STRIPE_SECRET_KEY, STRIPE_AUTOPILOT_PRICE_ID, STRIPE_MOMENTUM_PRICE_ID } = process.env;

  if (!STRIPE_SECRET_KEY) {
    console.error("\n❌  STRIPE_SECRET_KEY not set in .env.local\n");
    process.exit(1);
  }

  const args = parseArgs();
  let name, email, plan;

  if (args.name && args.email && args.plan) {
    ({ name, email, plan } = args);
  } else {
    ({ name, email, plan } = await interactiveMode());
  }

  const priceId = plan.toLowerCase() === "momentum"
    ? STRIPE_MOMENTUM_PRICE_ID
    : STRIPE_AUTOPILOT_PRICE_ID;

  if (!priceId) {
    console.error(`\n❌  Price ID not set for plan: ${plan}\n`);
    process.exit(1);
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY);

  console.log("\n  ⏳  Creating Stripe customer and checkout session…\n");

  // Create or retrieve customer
  const existing = await stripe.customers.list({ email, limit: 1 });
  const customer = existing.data[0]
    ? existing.data[0]
    : await stripe.customers.create({ name, email });

  // Create checkout session (client enters card here)
  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: "https://rubyxqube.com/payment-success",
    cancel_url: "https://rubyxqube.com/pricing",
    subscription_data: {
      description: `RubyxQube ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan — ${name}`,
    },
  });

  const planLabel  = plan.toLowerCase() === "momentum" ? "Momentum ($999/mo)" : "Autopilot ($399/mo)";
  const firstName  = name.split(" ")[0];

  console.log("  ✅  Done!\n");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  PAYMENT LINK — send this to the client");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log(`  ${session.url}\n`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  EMAIL TEMPLATE — copy & paste");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log(`Subject: Set up your RubyxQube subscription — ${planLabel}\n`);
  console.log(`Hi ${firstName},\n`);
  console.log(`Here's the link to set up your monthly subscription for the ${planLabel}.\n`);
  console.log(`${session.url}\n`);
  console.log(`It takes about 60 seconds — just enter your card and you're set. Stripe will charge you automatically on the same date each month.\n`);
  console.log(`Any questions, just reply here.\n`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main().catch(err => {
  console.error("\n❌  Error:", err.message, "\n");
  process.exit(1);
});
