# RubyxQube — Cost Breakdown

> Last updated: May 2026. No clients onboarded yet.  
> Strategy: stay on free tiers until revenue justifies upgrades.

---

## One-Time Costs (Already Paid)

| Item | Cost | Notes |
|------|------|-------|
| Idaho LLC registration | ~$100 | Idaho SOS — paid |
| USPTO trademark application — RubyxQube | $350 | Trademark (not copyright — USPTO handles trademarks; Copyright Office handles copyrights). Protects the brand name/logo in commerce. Pending approval. |
| Twilio A2P brand registration | $4 | One-time — paid |
| Twilio A2P campaign registration | ~$15 | One-time — paid |
| Domain — rubyxqube.com | ~$12–15 | Annual, via Vercel |
| **Total paid to date** | **~$481–484** | |

> **Trademark vs. Copyright:** USPTO = trademarks (brand names, logos). US Copyright Office = copyrights (creative works like writing, music, art). You filed a trademark — the right move for protecting a business name.  
> Monitor application status at [USPTO TSDR](https://tsdr.uspto.gov). Typical approval timeline: 8–12 months. Watch for Office Actions requiring a response.

---

## Current Monthly Burn (No Clients — May 2026)

| Service | Plan | Monthly Cost | Notes |
|---------|------|-------------|-------|
| Twilio phone number | Pay-as-you-go | ~$1.15/mo | Required for SMS alerts |
| Twilio A2P campaign fee | Standard | ~$10/mo | Required to send business SMS in US |
| Anthropic API | Pay-per-use | ~$0–1/mo | Chatbot on rubyxqube.com — minimal traffic |
| Vercel | Hobby (free) | $0 | Hosts rubyxqube.com |
| GitHub | Free | $0 | Code storage |
| Resend | Free tier | $0 | 3,000 emails/mo, 100/day |
| Formspree | Free tier | $0 | 50 submissions/mo |
| Google Analytics | Free | $0 | |
| Google Fonts | Free | $0 | |
| **Total monthly burn** | | **~$11–12/mo** | |

**Annualized current burn: ~$132–144/year**  
Very lean. Essentially just the Twilio A2P campaign fee keeping the SMS infrastructure alive.

---

## Costs Not Yet Paying (Recommended Soon)

| Service | Plan | Monthly Cost | Priority | Notes |
|---------|------|-------------|----------|-------|
| Google Workspace | Starter | $6/mo | 🔴 High | Gets boyd@rubyxqube.com — do this before first client |
| Notion | Free | $0 | Now | Free tier is enough for Phase 1 |
| Calendly | Free | $0 | Now | Free tier = 1 event type (enough for audit calls) |
| UptimeRobot | Free | $0 | At launch | Free = 50 monitors, 5-min checks |
| Loom | Free | $0 | Now | Free = 25 videos (enough for audit recordings) |
| Wave | Free | $0 | Now | Free invoicing + bookkeeping forever |
| 1Password | Individual | ~$3/mo | Soon | Start here, upgrade to Teams when hiring |

**Extra monthly if you add all of these: ~$9/mo** (just Google Workspace + 1Password)  
**New total monthly burn: ~$20–21/mo**

---

## Per-Client Costs (When You Onboard)

For each **Autopilot ($399/mo)** or **Momentum ($699/mo)** client:

| Item | Monthly Cost | Notes |
|------|-------------|-------|
| Anthropic API (Claude Haiku) | ~$2–5/mo | Depends on chatbot volume. Haiku = $0.80/1M input tokens |
| Twilio SMS alerts | ~$1–2/mo | ~100–200 SMS/mo per active client |
| Resend (email alerts) | $0 | Still within free tier for many clients |
| Vercel (hosting) | $0 | Each client = one Vercel project, free Hobby tier |
| Formspree | $0 | Free tier = 50 submissions/mo per form |
| GitHub (private repo) | $0 | Free for private repos |
| UptimeRobot (monitor) | $0 | Free tier covers 50 monitors |
| **COGS per Autopilot client** | **~$3–7/mo** | |
| **Gross margin on $399/mo** | **~98%** | Exceptional for a service business |

### Margin by package

| Package | Revenue | COGS | Gross Profit | Margin |
|---------|---------|------|-------------|--------|
| Launch (one-time) | $2,500 | ~$0–10 (build time tools) | ~$2,490 | ~99% |
| Autopilot | $399/mo | ~$3–7/mo | ~$392–396/mo | ~98% |
| Momentum | $699/mo | ~$3–7/mo | ~$692–696/mo | ~99% |

> These margins assume your time has no cost yet (solo). Factor in your hourly rate for a truer picture.

---

## Phase 2 Cost Upgrades (When to Upgrade and Why)

Trigger each upgrade only when the revenue justifies it.

| Service | Upgrade | Monthly Cost | Trigger |
|---------|---------|-------------|---------|
| Vercel Pro | Team features, faster builds | $20/mo | 6–10 client projects |
| 1Password Teams | Share vaults with contractors | $19/mo | First hire / VA |
| Formspree Starter | 1,000 submissions/mo, unlimited forms | $8/mo | 10+ active forms |
| Calendly Standard | Multiple event types, workflows | $10/mo | 10+ calls/month |
| Notion Plus | Unlimited blocks, version history | $8/mo | When free tier feels limiting |
| DocuSeal Cloud | Contract signing API | $20/mo + $0.20/doc | Until custom signing page is built |
| Google Workspace (extra seats) | For contractors | +$6/user/mo | First hire |

**Phase 2 total (if all triggered): ~$85–100/mo** — easily covered by 1 Autopilot client.

---

## Revenue vs. Cost Scenarios

### Scenario A: 1 Autopilot client
| | Amount |
|-|--------|
| Revenue | $399/mo |
| COGS (API, SMS) | ~$5/mo |
| Fixed costs (current) | ~$21/mo |
| **Net before your time** | **~$373/mo** |

### Scenario B: 3 Autopilot clients
| | Amount |
|-|--------|
| Revenue | $1,197/mo |
| COGS (3 clients) | ~$15/mo |
| Fixed costs | ~$21/mo |
| **Net before your time** | **~$1,161/mo** |

### Scenario C: 5 clients (mix)
| | Amount |
|-|--------|
| Revenue | 3× Autopilot + 2× Momentum = $2,595/mo |
| COGS | ~$25–35/mo |
| Fixed costs (Phase 2 tools) | ~$85/mo |
| **Net before your time** | **~$2,475–2,485/mo** |

### Scenario D: 10 clients (Phase 2)
| | Amount |
|-|--------|
| Revenue | 6× Autopilot + 4× Momentum = $5,190/mo |
| COGS | ~$50–70/mo |
| Fixed costs | ~$100/mo |
| **Net before your time** | **~$5,020–5,040/mo** |

---

## Future Business Idea: Sell the Contract Signing System

The custom `/sign/[token]` contract page we're building for RubyxQube could be packaged and sold:

- **Who needs it:** Freelancers, small agencies, consultants — anyone sending contracts manually
- **What they're currently paying:** $75/mo (Dropbox Sign API), $20/mo (DocuSeal), or manually emailing PDFs
- **What we could offer:** White-labeled, hosted contract signing page — legally valid, no per-doc fees
- **Potential pricing:** $19–39/mo per agency (SaaS)
- **Cost to us:** Hosting on Vercel (~$0 per tenant on free tier initially)

**Note for Phase 3:** Once the signing page is built and battle-tested on RubyxQube contracts, evaluate productizing it as a standalone micro-SaaS. Low build cost (already being built), clear market need, recurring revenue.

---

## Free Tier Limits to Watch

Know when you'll hit a wall:

| Service | Free Limit | Hit at... |
|---------|-----------|----------|
| Formspree | 50 submissions/mo per form | ~2–3 active contact forms |
| Resend | 3,000 emails/mo, 100/day | ~10+ clients with active chatbots |
| Vercel Hobby | 100GB bandwidth/mo | Unlikely to hit for static sites |
| GitHub Free | Unlimited private repos | Never an issue |
| UptimeRobot Free | 50 monitors | 50 client sites (far away) |
| Calendly Free | 1 event type | Fine until you need booking workflows |
| Notion Free | Limited block storage | Fine for Phase 1 |

---

## Cost Principles

1. **Never pay for something a free tier covers** — audit tools every 6 months
2. **Pay per use > monthly subscriptions** — Anthropic, Twilio, Resend charge only for what you use
3. **Build vs. buy** — if we can build it in a day and avoid $20–75/mo forever, build it (contract signing page, report generator)
4. **Upgrade on revenue, not optimism** — only upgrade a tool when the revenue it enables or the time it saves is clearly worth it
5. **Every client's COGS should stay under $10/mo** — our margin is our moat
