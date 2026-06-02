# AI Chatbot — Rules & Standards

This applies to every chatbot we build — for RubyxQube and for every client site.

---

## The Chatbot Is Our #1 Selling Point

The AI receptionist powered by Claude is the core of the Autopilot and Momentum packages.
Every client chatbot is a live demo of what we sell. It must be flawless.

---

## Formatting Rules (ALWAYS Apply to System Prompts)

The ChatWidget.jsx has a built-in markdown renderer that handles:
- `**bold**` → rendered as bold
- `*italic*` → rendered as italic
- `- item` lines → rendered as a clean bullet list
- Blank lines → spacing between sections
- `---` → ignored/converted to spacing

Always include these rules in every system prompt:

```
FORMATTING RULES — this is a chat widget:
- You can use **bold** for emphasis and *italics* sparingly — they will render correctly.
- For lists, write each item on its own line starting with "- "
- Separate topics with a blank line.
- No hashtag headers (##). No horizontal rules (---). No backticks.
- Keep responses concise — this is a small chat bubble, not a document.
```

---

## Tone Rules (ALWAYS Apply)

- Friendly, direct, confident. Never salesy or pushy.
- Answer the question first, then offer help.
- Keep responses short — 2–3 sentences unless detail is genuinely needed.
- The bot IS a demo of the product. If someone is impressed, acknowledge it naturally.

---

## Lead Capture Rules

- Collect name, phone/email, and what they need — but NEVER ask for all three at once.
- Collect naturally through conversation.
- Only call `capture_lead` tool once all three are collected.
- Never make up prices or details — say "I'll have Boyd confirm that for you."

---

## Tech Stack (Every Client Chatbot)

- Model: Claude Haiku (`claude-haiku-4-5-20251001`) — fast, affordable, capable
- Upgrade: Claude Sonnet 4.6 for complex clients (medical, legal) — charge higher retainer
- API: Anthropic API via Vercel Serverless Function (`/api/chat`)
- API key: One `ANTHROPIC_API_KEY` per client Vercel project (never shared)
- Push alerts (Boyd): ntfy.sh — free, no registration, install the app once (`NTFY_TOPIC`)
- SMS alerts (client): TextBelt — ~$0.01/text, no A2P registration, pay-as-you-go (`TEXTBELT_KEY` + `ALERT_PHONE_NUMBER`)
- Email alerts: Resend — free tier, works immediately (`RESEND_API_KEY` + `ALERT_EMAIL`)

All three alert channels are optional and degrade gracefully — app works with any combination.

---

## Per-Client Customization Checklist

When building a chatbot for a new client, update these in the system prompt:
- [ ] Business name, owner name, phone, email
- [ ] Services list with pricing (or "contact for quote" if variable)
- [ ] Service area (cities/zip codes)
- [ ] Hours of operation
- [ ] 5–10 FAQ pairs from their onboarding questionnaire
- [ ] CTA: what should the bot encourage? (call, fill form, book)
- [ ] `ALERT_PHONE_NUMBER` in Vercel env vars (client's cell for TextBelt SMS)
- [ ] `TEXTBELT_KEY` in Vercel env vars (buy credits at textbelt.com)
- [ ] `RESEND_API_KEY` + `ALERT_EMAIL` in Vercel env vars (email alerts)
- [ ] `NTFY_TOPIC` in Vercel env vars (Boyd's push notification)
- [ ] `businessName` in chatConfig.js
- [ ] `contactPhone` in chatConfig.js — shown in error messages
- [ ] `contactEmail` in chatConfig.js — shown in connection error message
- [ ] `contactName` in chatConfig.js — owner's first name shown in lead banner ("Manny will be in touch soon")

---

## Deploying to a Client Site

1. Copy `api/chat.js`, `src/components/ChatWidget.jsx`, `src/chatConfig.js` to client project
2. Update `chatConfig.js` with client's business name, accent color, greeting, system prompt
3. Update `DEFAULT_SYSTEM_PROMPT` in `api/chat.js` with client's services, FAQs, hours, contact
4. Add `ANTHROPIC_API_KEY` (new key per client) to Vercel env vars
5. Add `TEXTBELT_KEY` + `ALERT_PHONE_NUMBER` for SMS alerts (client's phone)
6. Add `RESEND_API_KEY` + `ALERT_EMAIL` for email alerts
7. Add `NTFY_TOPIC` for Boyd's push notification
8. Test 10 conversations before going live
9. Verify all three alert channels fire on lead capture
