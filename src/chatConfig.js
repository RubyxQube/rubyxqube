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

  // ── Chat button icon ───────────────────────────────────────────────────────
  // Path to logo mark (no text) — shown in the floating chat button.
  // For client sites: set to their logo mark PNG (e.g. "/brand/logo-mark.png")
  // Set to null to fall back to the default 💬 emoji.
  buttonIcon: "/brand/logo-mark-192.png",

  // ── Contact info — used in error + lead capture messages ──────────────────
  contactPhone: "(208) 970-8624",
  contactEmail: "boyd@rubyxqube.com",
  contactName:  "Boyd",           // first name shown in lead banner

  // ── Footer disclosure ──────────────────────────────────────────────────────
  poweredBy: "Powered by Claude AI",

  // ── System prompt ─────────────────────────────────────────────────────────
  // null = use server-side default in api/chat.js
  systemPrompt: null,
};
