# AI Receptionist — Build Guide

> How to deploy the Claude-powered chat widget on any site.
> This guide covers the Qube Solutions site first, then the client template process.

---

## How It Works (Overview)

```
Visitor types a message
  → React ChatWidget (browser)
    → POST /api/chat (Vercel serverless function)
      → Anthropic API (Claude Haiku)
        → If lead captured: fire ntfy push + TextBelt SMS + Resend email
      → Returns AI response
    → Displays response in chat window
```

The API key never touches the browser. All AI calls go through the Vercel function server-side.

---

## Step 1 — Get an Anthropic API Key

1. Go to **console.anthropic.com**
2. Sign in (create an account if needed — separate from Claude.ai)
3. Go to **API Keys** → **Create Key**
4. Name it `qube-solutions-prod`
5. Copy the key — you'll only see it once. Save it to **1Password** immediately.

> **Cost:** Pay-as-you-go. Claude Haiku 4.5 is ~$0.80/1M input tokens. A 100-conversation/month site costs pennies. Add a $5 budget limit on the key to be safe while testing.

---

## Step 2 — Add the Key to Vercel

1. Go to **vercel.com/dashboard** → your Qube Solutions project
2. **Settings** → **Environment Variables**
3. Add:

| Variable | Value | Environment |
|----------|-------|-------------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Production, Preview, Development |
| `CLAUDE_MODEL` | `claude-haiku-4-5-20251001` | All (optional — this is the default) |

4. Click **Save**
5. **Redeploy** the project (Vercel → Deployments → Redeploy latest)

> For local dev: create `.env.local` in the project root:
> ```
> ANTHROPIC_API_KEY=sk-ant-...
> ```
> `.env.local` is already in `.gitignore` — never commit API keys.

---

## Step 3 — Verify the API Function Works

After deploying, test the endpoint directly:

```bash
curl -X POST https://your-site.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"What services do you offer?"}]}'
```

Expected response:
```json
{
  "content": "Qube Solutions offers three main packages..."
}
```

If you get `ANTHROPIC_API_KEY is not set` — double-check Vercel env vars and redeploy.

---

## Step 4 — Test the Chat Widget on the Site

1. Open the live site
2. Click the **💬** button in the bottom-right corner
3. The chat opens with the greeting message
4. Ask: *"What's your pricing?"* — should get an accurate answer
5. Ask: *"What does the AI receptionist actually do?"* — should explain clearly
6. Provide a fake name + phone + service need — Claude should call the lead capture tool
7. You should see the green **"✓ Info sent"** banner appear

---

## Step 5 — (Optional) Add Lead Alerts

Three channels, all optional, all free or near-free. Add any combination.

### ntfy.sh — push notification to Boyd's phone (free)
1. Download the **ntfy** app (iOS / Android)
2. Subscribe to a topic — use a random unguessable string, e.g. `rxq-alerts-7k2mxp`
3. Add to Vercel env vars: `NTFY_TOPIC=rxq-alerts-7k2mxp`
4. Test: visit `https://ntfy.sh/rxq-alerts-7k2mxp` → click "Send test notification"

### TextBelt SMS — text to client's phone (~$0.01/text, no A2P required)
1. Go to **textbelt.com** → buy credits (1,000 texts = $10, no subscription)
2. Add to Vercel env vars:

| Variable | Value |
|----------|-------|
| `TEXTBELT_KEY` | your TextBelt API key |
| `ALERT_PHONE_NUMBER` | client's cell, E.164 format: `+12085559999` |

Use key `textbelt` for 1 free test text per day during development.

### Resend email — email alert (free tier)
1. Sign up at **resend.com** → create an API key
2. Add to Vercel env vars:

| Variable | Value |
|----------|-------|
| `RESEND_API_KEY` | `re_...` |
| `ALERT_EMAIL` | where to send lead emails |
| `FROM_EMAIL` | verified sender domain (omit to use `onboarding@resend.dev`) |

### Test
After redeploying, run a lead capture conversation. You should receive:
- A push notification on your phone (ntfy)
- An SMS (TextBelt)
- An email (Resend)

All three fire simultaneously without blocking the chat response.

---

## Step 6 — Customize the Greeting and Model

Edit `src/chatConfig.js`:

```js
export const chatConfig = {
  businessName: "Qube Solutions",
  greeting: "Hey! I'm the Qube Solutions AI assistant...",
  model: "claude-haiku-4-5-20251001",  // or "claude-sonnet-4-6" for premium
  accentColor: "#3b82f6",
  poweredBy: "Powered by Claude AI",
  systemPrompt: null,  // null = use server-side default
};
```

To upgrade a client to Sonnet (more capable, handles complex conversations):
- Change `model` to `"claude-sonnet-4-6"`
- Or set `CLAUDE_MODEL=claude-sonnet-4-6` in Vercel env vars

---

## Step 7 — Update the System Prompt for This Site

The default system prompt lives in `api/chat.js` as `DEFAULT_SYSTEM_PROMPT`.

For the Qube Solutions site: the default is already correct.

To update it (e.g., new pricing, new services):
- Edit the `DEFAULT_SYSTEM_PROMPT` in `api/chat.js` and redeploy
- OR set `SYSTEM_PROMPT` as a Vercel env variable (stays out of the codebase)

---

## Building for a New Client

When you onboard a client, here's the deployment process:

### Option A — Separate Vercel project (recommended)
1. Each client gets their own GitHub repo + Vercel project
2. Copy `api/chat.js` and `src/components/ChatWidget.jsx` into their project
3. Copy `src/chatConfig.js`, update `businessName`, `greeting`, `accentColor`
4. In Vercel, set `SYSTEM_PROMPT` to their custom system prompt (from onboarding questionnaire)
5. Set `ALERT_PHONE_NUMBER` to the client's phone number
6. Deploy → done

### Option B — Monorepo with per-client config
For advanced setup: one repo, multiple Vercel deployments, each with different env vars.

### The client system prompt template

Copy this into `SYSTEM_PROMPT` in their Vercel env vars and fill it in:

```
You are the AI receptionist for [BUSINESS NAME], a [TYPE OF BUSINESS] based in [CITY], [STATE].

Owner: [OWNER NAME]
Phone: [PHONE]
Email: [EMAIL]
Service area: [CITIES/REGIONS]
Hours: [HOURS]

Services:
- [SERVICE 1]: [DESCRIPTION + PRICE RANGE]
- [SERVICE 2]: [DESCRIPTION + PRICE RANGE]
- [SERVICE 3]: [DESCRIPTION + PRICE RANGE]

Common questions:
Q: [QUESTION 1] → A: [ANSWER 1]
Q: [QUESTION 2] → A: [ANSWER 2]
Q: Do you offer free estimates? → A: [YES/NO + DETAILS]

Tone: [friendly/professional/casual]. Keep responses short — 2–3 sentences.
Answer the question first, then offer to help further.

When you have collected the visitor's name, contact info (phone or email), and what they need,
call the capture_lead tool. Collect these naturally through conversation — don't ask for all at once.
```

### Checklist for each client chatbot

- [ ] Onboarding questionnaire completed (see SOP.md)
- [ ] System prompt written and reviewed
- [ ] `SYSTEM_PROMPT` set in Vercel env vars
- [ ] `ALERT_PHONE_NUMBER` set to client's phone
- [ ] Widget `accentColor` matches client site color
- [ ] Widget `businessName` and `greeting` updated
- [ ] 10 test conversations run (common questions, edge cases, lead capture)
- [ ] Lead capture verified (SMS fires correctly to client)
- [ ] Client walked through what an SMS alert looks like

---

## Model Selection Guide

| Business type | Recommended model | Why |
|---------------|------------------|-----|
| Standard service business (HVAC, landscaping, cleaning) | `claude-haiku-4-5-20251001` | Fast, cheap, handles FAQ + lead capture perfectly |
| Professional services (law, medical, finance) | `claude-sonnet-4-6` | More nuanced, better at complex policy questions |
| High-volume site (1,000+ visitors/day) | `claude-haiku-4-5-20251001` | Cost-efficient at scale |
| Premium client willing to pay more | `claude-sonnet-4-6` | Justify a higher retainer tier |

---

## Pricing the AI Receptionist to Clients

| Model | Cost per 100 conversations | Monthly (500 conversations) |
|-------|---------------------------|------------------------------|
| Claude Haiku 4.5 | ~$0.05–0.15 | ~$0.25–0.75 |
| Claude Sonnet 4.6 | ~$0.75–2.00 | ~$3.75–10.00 |

Charge clients $399/mo (Autopilot). Your infrastructure cost per client: under $5/mo.
Infrastructure margin: 98%+. The cost is your time, not the AI.

---

## Giving Clients a Choice of AI

If a client specifically asks for OpenAI instead of Claude:
1. Install `openai` package: `npm install openai`
2. Add `OPENAI_API_KEY` to Vercel env vars
3. Create `api/chat-openai.js` (same structure, different client)
4. Point ChatWidget to `/api/chat-openai` via a config prop
5. Use `gpt-4o-mini` for equivalent cost/quality to Claude Haiku

Default is always Claude. Only switch if the client has a specific reason.

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---------|-------------|-----|
| Chat window opens but no response | `ANTHROPIC_API_KEY` not set or wrong | Check Vercel env vars, redeploy |
| "I'm having connection trouble" message | API function error | Check Vercel function logs |
| Lead captured banner never shows | Claude not calling the tool | Review system prompt — ensure lead capture instruction is clear |
| ntfy not firing | `NTFY_TOPIC` not set in Vercel, or not subscribed in app | Check env var, test at `ntfy.sh/<topic>` |
| SMS not firing | `TEXTBELT_KEY` or `ALERT_PHONE_NUMBER` not set | Numbers must be E.164 format: `+12085551234`. Check quota at textbelt.com |
| Email not firing | `RESEND_API_KEY` or `ALERT_EMAIL` not set | Check Resend dashboard for send logs |
| Widget covers content on mobile | z-index or positioning conflict | Adjust `bottom` value in `ChatWidget.jsx` `S.toggleBtn` |
