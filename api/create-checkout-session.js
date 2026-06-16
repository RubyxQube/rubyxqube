/**
 * api/create-checkout-session.js
 * Creates a Stripe Checkout session for subscription plans.
 *
 * POST body: { plan: "autopilot" | "momentum" }
 * Returns:   { url: "https://checkout.stripe.com/..." }
 *
 * Env vars required:
 *   STRIPE_SECRET_KEY
 *   STRIPE_AUTOPILOT_PRICE_ID — Stripe price ID for the Autopilot plan
 *   STRIPE_MOMENTUM_PRICE_ID  — Stripe price ID for the Momentum plan
 */

import Stripe from "stripe";

const SITE_URL = "https://rubyxqube.com";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { plan } = req.body || {};

  const PRICE_IDS = {
    autopilot: process.env.STRIPE_AUTOPILOT_PRICE_ID,
    momentum:  process.env.STRIPE_MOMENTUM_PRICE_ID,
  };

  const priceId = PRICE_IDS[plan];
  if (!priceId) return res.status(400).json({ error: "Invalid plan" });

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      mode:                       "subscription",
      line_items:                 [{ price: priceId, quantity: 1 }],
      success_url:                `${SITE_URL}/payment-success`,
      cancel_url:                 `${SITE_URL}/pricing`,
      allow_promotion_codes:      true,
      billing_address_collection: "auto",
      customer_creation:          "always",
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err.message);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}
