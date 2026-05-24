/**
 * chatConfig.js — Qube Solutions AI Receptionist Configuration
 *
 * This is the single file to customize per client deployment.
 * For a new client, copy this file, update every field, and point
 * the ChatWidget to it.
 *
 * The systemPrompt here is passed to the API as a fallback.
 * For production, store the system prompt in a Vercel env var
 * (SYSTEM_PROMPT) so it stays server-side.
 */

export const chatConfig = {
  // ── Displayed in the chat widget header ───────────────────────────────────
  businessName: "Qube Solutions",
  tagline: "AI receptionist · online",

  // ── Opening message the AI sends automatically ────────────────────────────
  greeting:
    "Hey! I'm the Qube Solutions AI assistant — built on Claude. I can answer questions about our services and pricing, or help you figure out what your business actually needs. What's up?",

  // ── Which Claude model to use ─────────────────────────────────────────────
  // Options:
  //   "claude-haiku-4-5-20251001"  — fast, cheap, great for FAQ + lead capture (default)
  //   "claude-sonnet-4-6"          — more nuanced, better for complex businesses
  model: "claude-haiku-4-5-20251001",

  // ── Theme (matches site accent color) ────────────────────────────────────
  accentColor: "#3b82f6",
  accentHover: "#2563eb",

  // ── Footer disclosure label ───────────────────────────────────────────────
  poweredBy: "Powered by Claude AI",

  // ── System prompt ────────────────────────────────────────────────────────
  // Tip: For production, move this to Vercel env var SYSTEM_PROMPT.
  // Keeping it here is fine for development and low-sensitivity sites.
  systemPrompt: null, // null = use the server-side default in api/chat.js
};
