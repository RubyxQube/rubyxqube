/**
 * chatConfig.js — RubyxQube AI Receptionist Configuration
 *
 * This is the single file to customize per client deployment.
 * For a new client, copy this file, update every field, and point
 * the ChatWidget to it.
 */

export const chatConfig = {
  // ── Displayed in the chat widget header ───────────────────────────────────
  businessName: "RubyxQube",
  tagline: "AI receptionist · online",

  // ── Opening message ────────────────────────────────────────────────────────
  greeting:
    "Hey! I'm the RubyxQube AI assistant — built on Claude. I can answer questions about our services and pricing, or help you figure out what your business actually needs. What's up?",

  // ── Model ─────────────────────────────────────────────────────────────────
  // "claude-haiku-4-5-20251001"  — fast, cheap, great for FAQ + lead capture
  // "claude-sonnet-4-6"          — more capable, for complex businesses
  model: "claude-haiku-4-5-20251001",

  // ── Theme ─────────────────────────────────────────────────────────────────
  accentColor: "#e11d48",
  accentHover: "#c0112f",

  // ── Footer disclosure ──────────────────────────────────────────────────────
  poweredBy: "Powered by Claude AI",

  // ── System prompt ─────────────────────────────────────────────────────────
  // null = use server-side default in api/chat.js
  systemPrompt: null,
};
