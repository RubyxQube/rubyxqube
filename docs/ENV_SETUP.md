# Environment Variables — Setup Handbook

> Quick reference for local dev and Vercel deployment.
> Every time you launch a new site or onboard a client, run through this list.

---

## Local Dev (`.env.local`)

File lives at project root. **Never committed — already in `.gitignore`.**

```bash
# AI Chatbot
ANTHROPIC_API_KEY=sk-ant-...          # Get from console.anthropic.com → API Keys

# Push alerts (Boyd's phone)
NTFY_TOPIC=rubyxqube-leads            # Subscribe to this topic in the ntfy app first

# SMS alerts (client's phone)
TEXTBELT_KEY=...                      # Get from textbelt.com → buy credits
ALERT_PHONE_NUMBER=+12085559999       # E.164 format — client's cell

# Email alerts
RESEND_API_KEY=re_...                 # Get from resend.com → API Keys
ALERT_EMAIL=boyd@rubyxqube.com        # Where lead emails are sent
FROM_EMAIL=                           # Optional — omit to use onboarding@resend.dev

# Notion (RubyxQube internal only — not needed on client sites)
NOTION_TOKEN=ntn_...
NOTION_DATABASE_ID=...
NOTION_CONTRACTS_DATABASE_ID=...
NOTION_PROSPECTS_DATABASE_ID=...
```

To start fresh on a new machine: copy this template, fill in keys from 1Password.

---

## Vercel (Production)

**Path:** vercel.com/dashboard → [project] → Settings → Environment Variables

Set each variable for **Production + Preview + Development** unless noted.

| Variable | Required | Notes |
|----------|----------|-------|
| `ANTHROPIC_API_KEY` | ✅ Yes | One key per client project — never share across sites |
| `NTFY_TOPIC` | Optional | Boyd's push alerts. Must be subscribed in the ntfy app. |
| `TEXTBELT_KEY` | Optional | Buy credits at textbelt.com. Use `textbelt` (free, 1/day) for testing. |
| `ALERT_PHONE_NUMBER` | Optional | Client's cell in E.164 format: `+12085551234` |
| `RESEND_API_KEY` | Optional | Free tier at resend.com — works immediately |
| `ALERT_EMAIL` | Optional | Where lead notification emails go |
| `FROM_EMAIL` | Optional | Must be a verified domain in Resend. Omit to use default. |
| `SYSTEM_PROMPT` | Optional | Overrides the default system prompt in `api/chat.js` |
| `CLAUDE_MODEL` | Optional | Defaults to `claude-haiku-4-5-20251001`. Use `claude-sonnet-4-6` for premium clients. |

**After any change to Vercel env vars → Redeploy.** Changes don't take effect until redeployment.

---

## New Client Site Checklist

When spinning up a new client project:

### 1 — Anthropic API Key
- [ ] Go to console.anthropic.com → API Keys → Create Key
- [ ] Name it `[client-slug]-prod`
- [ ] Save to 1Password immediately
- [ ] Add `ANTHROPIC_API_KEY` to Vercel

### 2 — SMS Alerts (TextBelt)
- [ ] Confirm TextBelt credits are available at textbelt.com
- [ ] Add `TEXTBELT_KEY` to Vercel
- [ ] Add `ALERT_PHONE_NUMBER` = client's cell in E.164 format
- [ ] ⚠️ Tell client before launch: "Your first lead alert comes from a 510 area code — that's TextBelt. Save the number as [Business Name] Leads."
- [ ] Send a test text after launch so they can save the number right away

### 3 — Push Alerts (ntfy)
- [ ] Open ntfy app → subscribe to the topic (e.g. `clientname-leads`)
- [ ] Add `NTFY_TOPIC` to Vercel
- [ ] Test: `curl -d "test" ntfy.sh/[topic]`

### 4 — Email Alerts (Resend)
- [ ] Go to resend.com → API Keys → Create API Key
- [ ] Set permission to **Sending Access only** — never Full Access
- [ ] Add `RESEND_API_KEY` to Vercel (Boyd's key works for all clients — same free account)
- [ ] Add `ALERT_EMAIL` = client's preferred email
- [ ] Optionally add `FROM_EMAIL` if client has a verified domain in Resend

### 5 — Chatbot Config
- [ ] Set `SYSTEM_PROMPT` in Vercel with the client's custom prompt
- [ ] Or update `DEFAULT_SYSTEM_PROMPT` in `api/chat.js` directly
- [ ] Update `chatConfig.js`: `businessName`, `greeting`, `accentColor`

### 6 — Verify Everything
- [ ] Redeploy after all env vars are set
- [ ] Run a test lead capture conversation in the live chat
- [ ] Confirm all three alert channels fire: push (phone) + SMS (phone) + email

---

## Common Gotchas

**TextBelt sends from a shared 510 number.**
Clients will think it's spam if they're not warned. Tell them before launch, send a test text, have them save the number.

**Vercel env vars require a redeploy.**
Saving a variable in the dashboard does nothing until you trigger a new deployment.

**One Anthropic key per client.**
Never reuse Boyd's personal key on a client site. Each client project gets its own key so billing is isolated and you can revoke per-client.

**ntfy topics are public.**
`rubyxqube-leads` is fine for your own site — lead data (name/phone/service) is low-sensitivity. For client sites, use a random slug like `plumbingco-alerts-4k2x` to prevent anyone subscribing.

**TextBelt free key = 1 text/day.**
`TEXTBELT_KEY=textbelt` is fine during dev/testing. Switch to a paid key before launch.

**Resend API key — Sending Access only.**
When creating a key in resend.com → API Keys, set permission to "Sending Access" — not "Full Access." The chatbot only ever sends email; it doesn't need to read, delete, or manage domains. Least-privilege principle.

**Resend FROM_EMAIL needs domain verification.**
If you omit `FROM_EMAIL`, Resend sends from `onboarding@resend.dev` — fine for now. When you want `alerts@rubyxqube.com` as the sender, verify the domain in Resend first.

---

## Where Keys Live

| Key | Where to get it | Stored in |
|-----|----------------|-----------|
| Anthropic | console.anthropic.com | 1Password + Vercel |
| TextBelt | textbelt.com account | 1Password + Vercel |
| Resend | resend.com → API Keys → **Sending Access only** | 1Password + Vercel |
| ntfy topic | You choose the string | `.env.local` + Vercel |
| Notion | notion.so → Integrations | 1Password + `.env.local` only |
