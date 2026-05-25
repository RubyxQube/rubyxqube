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
- SMS alerts: Twilio (optional — set up TWILIO env vars to enable)

---

## Per-Client Customization Checklist

When building a chatbot for a new client, update these in the system prompt:
- [ ] Business name, owner name, phone, email
- [ ] Services list with pricing (or "contact for quote" if variable)
- [ ] Service area (cities/zip codes)
- [ ] Hours of operation
- [ ] 5–10 FAQ pairs from their onboarding questionnaire
- [ ] CTA: what should the bot encourage? (call, fill form, book)
- [ ] SMS alert number (`ALERT_PHONE_NUMBER` in Vercel env vars)
- [ ] `businessName` in chatConfig.js

---

## Deploying to a Client Site

1. Copy `api/chat.js`, `src/components/ChatWidget.jsx`, `src/chatConfig.js` to client project
2. Update `chatConfig.js` with client's business name, accent color, greeting, system prompt
3. Add `ANTHROPIC_API_KEY` (new key per client) to Vercel env vars
4. Add Twilio env vars if SMS alerts are needed
5. Test 10 conversations before going live
6. Verify SMS alert fires on lead capture
