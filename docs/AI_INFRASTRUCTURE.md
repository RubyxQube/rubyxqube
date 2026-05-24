# Qube Solutions — AI Infrastructure & Management

> Internal reference for how the AI receptionist is built, managed, and billed.  
> Answers: Do clients get their own API plan, or do we use ours?

---

## The Short Answer

**We use our own API account. Costs are built into the retainer. Clients never touch an API.**

This is the right model for our market. A plumber or landscaper doesn't know what an API is and shouldn't have to. Our job is to make it invisible. We pay the infrastructure costs, charge a retainer that covers them many times over, and they never think about it.

---

## Why Not Give Clients Their Own API Account?

| Option | What it means | Why it doesn't work for us |
|--------|--------------|---------------------------|
| **Client owns their own OpenAI account** | Client signs up, gives us API key, pays OpenAI directly | Massive friction. They'll forget to pay, hit limits, break things. Non-technical clients can't manage this. |
| **Client uses Claude Pro / ChatGPT Plus** | Consumer subscription, not for API use | These are chat interfaces, not APIs. Can't embed in a website. |
| **We use our API, charge client for "AI costs" as a line item** | Transparent pass-through billing | Creates confusion, looks nickel-and-dime. Not worth it at current token prices. |
| **We use our API, costs baked into retainer** ✓ | We absorb costs, price retainer to cover them | Clean, simple, professional. This is what we do. |

---

## Actual AI Costs Per Client (The Math)

**Assumptions for a typical local service business site:**
- 100 chatbot conversations/month (conservative — most will be 30–80)
- Average conversation: 1,500 tokens (input + output combined)
- Monthly token usage: 150,000 tokens

**Cost at different models:**

| Model | Input | Output | Est. monthly cost |
|-------|-------|--------|-------------------|
| GPT-4o-mini | $0.15/1M | $0.60/1M | **~$0.05–0.15** |
| GPT-4o | $5.00/1M | $15.00/1M | **~$0.75–2.00** |
| Claude Haiku 4.5 | $0.80/1M | $4.00/1M | **~$0.25–0.50** |
| Claude Sonnet 4.6 | $3.00/1M | $15.00/1M | **~$0.75–2.00** |

**We use GPT-4o-mini for client chatbots. At $399/mo retainer, the AI cost is effectively zero.**

Add Twilio SMS alerts:
- ~100 SMS/month × $0.0079/SMS = **$0.79/month**

**Total AI infrastructure cost per Autopilot client: ~$1–3/month.**  
**Retainer: $399/month.**  
**Infrastructure margin: 99%.**

---

## At Scale

| Clients | Monthly conversations | Token usage | GPT-4o-mini cost | Twilio SMS | Total infra |
|---------|----------------------|-------------|------------------|-----------|-------------|
| 5 | 500 | 750K | $0.75 | $4 | **~$5/mo** |
| 15 | 1,500 | 2.25M | $2.25 | $12 | **~$14/mo** |
| 30 | 3,000 | 4.5M | $4.50 | $24 | **~$29/mo** |
| 50 | 5,000 | 7.5M | $7.50 | $40 | **~$48/mo** |

At 50 clients generating $19,950/mo MRR, AI infrastructure is $48/month — less than 0.25% of revenue.

**When to revisit this model:** If average conversations exceed 500/month per client (high-traffic business), consider a small AI usage surcharge or bump the retainer. At 500 conversations/month, GPT-4o-mini still costs less than $1.

---

## Tech Stack Decision: Which AI?

### For client chatbots (the AI receptionist)
**→ OpenAI GPT-4o-mini**  
- Cheapest capable model on the market
- Fast response times (important for chat UX)
- More than good enough for FAQ + lead capture tasks
- Well-documented, widely supported

**→ Upgrade path:** If a client's chatbot needs to handle complex conversations (e.g., a medical spa or law firm), use GPT-4o or Claude Sonnet 4.6 — charge a higher tier retainer.

### For internal tooling (reports, content generation)
**→ Claude Sonnet 4.6 via Anthropic API**  
- Better writing quality for case studies, social posts, email drafts
- Used internally, not client-facing

### For the Qube Solutions website itself
**→ Claude Haiku 4.5 or GPT-4o-mini**  
- Our own chatbot should use our best thinking at low cost
- Doubles as a live demo for every visitor

---

## Infrastructure Architecture

### One centralized API account
```
Boyd's OpenAI Account (org-level)
├── Project: qube-solutions-site       ← our own chatbot
├── Project: client-phoenix-stoneworks  ← per-client projects
├── Project: client-[name]
└── ...
```

Using OpenAI's **Projects** feature lets you:
- Set separate API keys per client (so compromised key = isolated blast radius)
- Set spending limits per project
- Track usage and cost per client separately
- Rotate keys without affecting other clients

### Vercel Serverless Functions (API proxy)
Client chatbots never expose the API key in the browser. All calls go through a Vercel Edge Function:

```
Browser (user types message)
  → POST /api/chat (Vercel Edge Function)
    → Reads OPENAI_API_KEY from Vercel env vars
    → Forwards to OpenAI with client-specific system prompt
    → Returns AI response
  → Browser displays response
```

For each client site, the system prompt is stored in a Vercel environment variable or a config file.

### SMS Alerts (Twilio)
When the chatbot captures a lead, the Edge Function also:
1. Saves lead to a simple store (Vercel KV or a Google Sheet via API)
2. Fires an SMS to the client's phone via Twilio

```
Lead captured
  → Edge Function triggers Twilio SMS
  → Boyd's client receives: "New lead — [Name], needs [service], [city]. Call: [phone]"
```

---

## Scaling the Infrastructure

### Phase 1 (1–5 clients)
- Single OpenAI org account
- Vercel Hobby plan (free) — serverless functions included
- Twilio trial → pay-as-you-go
- System prompts stored in Vercel env vars per client project
- Manual lead logging (SMS only, no database yet)
- Estimated monthly infra cost: **$5–15**

### Phase 2 (5–20 clients)
- Upgrade to Vercel Pro ($20/mo) for better function limits and analytics
- OpenAI org: set per-project spend limits ($10–20/mo per client max)
- Twilio verified number ($1/mo)
- Add a simple leads database: Supabase free tier (store all leads from all clients)
- Monthly usage dashboard: pull OpenAI usage API → know exactly what each client costs
- Estimated monthly infra cost: **$30–80**

### Phase 3 (20–50 clients)
- Build a simple admin dashboard: view all client chatbot stats, lead counts, API costs
- Consider moving system prompts to a database (Supabase) instead of env vars
- Automated monthly report generation (pull GA4 + chatbot stats → generate PDF)
- Evaluate white-label chatbot as a product (resell to other agencies)
- Estimated monthly infra cost: **$50–150**

---

## Security & Access Control

### API Key Management
- **Never store API keys in code** — always in Vercel environment variables or 1Password
- One API key per client project in OpenAI — isolates exposure
- If a client churns: disable their project key immediately
- 1Password vault has one entry per client with all credentials

### Client Data
- Lead capture data (names, phone numbers) is sensitive — treat as PII
- Store in Supabase with row-level security from day one
- In the US: no HIPAA or strict data regulations for this use case, but good practice
- Privacy Policy on every client site should mention the AI chatbot data collection

### Backups
- All site code lives in GitHub (one repo per client, or a monorepo with per-client configs)
- Lead data backed up weekly from Supabase

---

## The Qube Solutions Chatbot (Our Own Site)

**This is non-negotiable — we must run the AI receptionist on our own site.**

Why: Every visitor to qube-solutions.com is a potential client. If our chatbot is good, they experience the product firsthand. If we don't run it ourselves, we have no credibility selling it.

### What our chatbot should do:
1. **Greet visitors** — "Hey, I'm the Qube Solutions AI assistant. Looking to get a website built or have questions about our services?"
2. **Answer questions** about services, pricing, timeline, AI receptionist
3. **Qualify leads** — what type of business, current website situation, service area
4. **Capture info** — name, phone or email, what they're looking for
5. **Alert Boyd via SMS** — same system we sell to clients, dogfooded first

### System prompt for Qube Solutions chatbot:
```
You are the AI receptionist for Qube Solutions, a web design and AI services 
agency based in Boise, Idaho serving the Treasure Valley area.

Owner: Boyd Querubin
Services:
- Launch Package: $2,500 one-time — professional 5–6 page website
- Autopilot: $3,000 + $399/mo — website + AI receptionist + monthly care
- Momentum: $3,000 + $699/mo — Autopilot + local SEO + social + strategy

Common questions:
Q: How long does it take? → 2–3 weeks from kickoff call to live site.
Q: Do you do e-commerce? → No, we focus on lead generation sites for service businesses.
Q: What's the AI receptionist? → A chatbot trained on the client's specific business — 
   answers questions, captures leads, sends SMS alerts 24/7.
Q: Is there a contract? → No contracts. Month-to-month. Cancel anytime with 30 days notice.
Q: What areas do you serve? → Primarily the Treasure Valley (Boise, Meridian, Nampa, 
   Caldwell, Eagle, Kuna) but we work remotely with businesses anywhere.
Q: Do you offer a free audit? → Yes — 15 minutes to review their current presence 
   and tell them what's costing them leads. No commitment.

When someone wants to move forward or get a quote, ask for:
1. Their name
2. Their business type and city
3. Their phone number or email

After capturing, tell them Boyd will follow up within a few hours.
Keep responses short and conversational. Don't be salesy.
```

### Implementation Plan (see TODO.md for task breakdown):
1. Build chatbot UI component (floating button → chat window)
2. Create Vercel Edge Function `/api/chat`
3. Add OpenAI API key to Vercel env vars
4. Add Twilio SMS notification
5. Add lead storage to Supabase
6. Deploy and test

---

## Pricing Rationale for AI Services

### Why $399/mo for Autopilot?
- A part-time receptionist (20 hrs/week): $2,000–4,000/month
- An answering service: $200–500/month
- Our AI: $399/month, works 24/7, never sick, trained specifically on their business
- We're priced below answering services but deliver more value
- **Room to raise:** Once we have case studies showing ROI, $499–549/mo is defensible

### Why $199/mo for standalone chatbot add-on?
- Client already has a site — they just want the AI
- Lower setup cost ($500 vs $3,000)
- Pure recurring revenue with almost zero ongoing time (chatbot runs itself)
- Great upsell path to Autopilot if they later want a new site

### Future pricing evolution
- Phase 2: Raise Autopilot to $449/mo (after 5+ clients validated)
- Phase 3: Raise Autopilot to $499/mo, add a $249/mo "Essentials" tier (AI only, no updates)
- Premium: Custom AI with advanced features (appointment booking, CRM integration) at $799–999/mo
