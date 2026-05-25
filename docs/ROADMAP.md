# RubyxQube — Business Roadmap

> **Owner:** Boyd Querubin  
> **Model:** Solo web design + AI receptionist agency for Treasure Valley service businesses  
> **Goal:** $10k MRR within 12 months  
> **Status:** Phase 0 nearly complete — closing in on first clients

---

## Phase 0 — Foundation *(~90% Done)*

### ✅ Completed
- [x] Register LLC — Idaho SOS ✅
- [x] USPTO trademark filed — RubyxQube™ ✅
- [x] Twilio A2P 10DLC registered ✅
- [x] Build and launch rubyxqube.com ✅
- [x] AI chatbot live — Claude Haiku, lead capture, email + SMS alerts ✅
- [x] Brand assets — 16 logo PNGs (no mark / TM / ® / clean variants) + favicon + apple-touch-icon ✅
- [x] Analytics — GA4 (G-9X0RYL01J3) live ✅
- [x] Contact form — Formspree, tested ✅
- [x] sitemap.xml — all routes ✅
- [x] Privacy policy page ✅
- [x] Social meta tags + og:image ✅
- [x] Docs — ROADMAP, SOP, TODO, CLIENT_HOSTING, LEAD_GEN, LEGAL, AUTOMATION, COSTS ✅

### ⬜ Remaining (do this week)
- [ ] EIN — IRS.gov, free, 5 min
- [ ] Business bank account — needs EIN + LLC docs
- [ ] Wave — free invoicing, connect bank, build invoice template
- [ ] Google Workspace — boyd@rubyxqube.com ($6/mo)
- [ ] Service agreement template — download from Bonsai, customize
- [ ] Notion CRM — Lead → Proposal → Active → Launched → Monthly Care → Churned
- [ ] 1Password — credential management, one vault per client
- [ ] Calendly — "Free Website Audit" 15-min event
- [ ] UptimeRobot — monitor rubyxqube.com + each client site
- [ ] Google Business Profile — "Web Designer" category
- [ ] Phoenix Stoneworks — verify hosting model, screenshot, testimonial, case study
- [ ] Google Search Console — submit sitemap.xml

---

## Phase 1 — First 3 Clients *(Month 1–3)*

**Target:** 3 paying clients. At least 1 on Autopilot or Momentum.  
**Unlock:** $399–$1,497 MRR. Proof of concept. First case studies.

### Revenue Target
| Mix | MRR |
|-----|-----|
| 1× Autopilot | $399/mo |
| 2× Autopilot | $798/mo |
| 2× Autopilot + 1× Momentum | $1,497/mo ← aim here |

### How to Get First Clients
1. **Warm network** — friends, family, Bastion MSP contacts. Ask for referrals first.
2. **Founding client offer** — 50% off setup fee for first 3 clients in exchange for testimonial + case study + Google review
3. **Cold outreach** — Google Maps → local service businesses with bad/no websites → personalized Loom audit video (see LEAD_GEN.md)
4. **Facebook groups** — Treasure Valley small business groups. Post value, not ads.
5. **Free audit CTA** — Calendly link in every email, on the site, in outreach

### Build During Phase 1
- [ ] Contract signing page (`/sign/[token]`) — before 2nd client
- [ ] `scripts/provision-client.mjs` — before 3rd client
- [ ] Chatbot lead → Notion CRM — before 2nd client
- [ ] `scripts/offboard-client.mjs` — before first cancellation risk
- [ ] `client-template` repo — fork for each new client
- [ ] `/designs` page on rubyxqube.com — browse-able design gallery
- [ ] Phoenix Stoneworks case study published on site

### Phase 1 Milestones
- [ ] First signed contract + deposit received
- [ ] First site launched for a paying client
- [ ] First Autopilot retainer (recurring revenue starts)
- [ ] First 5-star Google review
- [ ] 1 published case study on rubyxqube.com
- [ ] $399+ MRR

---

## Phase 2 — Foundation *(Month 3–6)*

**Target:** $3,000–5,000 MRR. Recurring base is stable. Operations are repeatable.

### Revenue Target
- 5–8 Autopilot/Momentum clients = $2k–$5.5k/mo recurring
- New site builds as one-off revenue on top

### Build During Phase 2
- [ ] `scripts/generate-report.mjs` — GA4 API + Puppeteer PDF + Resend, fires on 1st of month
- [ ] Non-payment escalation (day 30/45/60 automated actions) — see AUTOMATION.md §5
- [ ] Monthly report template — Google Sheets, one tab per client, export to PDF
- [ ] Upgrade to Vercel Pro ($20/mo) when at 6–10 client projects
- [ ] Evaluate DocuSeal or keep custom signing page
- [ ] AI chatbot battle-tested across 3+ client sites
- [ ] Evaluate: standalone chatbot add-on for businesses with existing sites ($500 + $199/mo)

### Operations
- [ ] Refine onboarding to under 3 hours client-facing time
- [ ] Build client handoff checklist (post-launch)
- [ ] Track time per client in Notion — establish actual hourly cost

### Marketing
- [ ] 2 LinkedIn posts/month — case studies, tips for service business owners
- [ ] Start collecting emails (Mailchimp free, monthly tips)
- [ ] Get listed in Treasure Valley local business directories

### Phase 2 Milestones
- [ ] $3,000 MRR
- [ ] 3+ published case studies
- [ ] Monthly care routine running smoothly for all retainer clients
- [ ] Monthly reports automated (or semi-automated)
- [ ] Contract signing page live and used for all new clients

---

## Phase 3 — Growth *(Month 6–12)*

**Target:** $8,000–10,000 MRR. First hire or contractor. Fully systematized.

### Revenue Target
- 15–20 Autopilot/Momentum clients = $6k–$14k MRR
- Add-on revenue (chatbot retrofits, branding, booking integrations)

### Build During Phase 3
- [ ] Client portal — simple login, monthly stats (Next.js + Supabase)
- [ ] Automated monthly reporting — cron job, all clients, zero manual effort
- [ ] White-labeled chatbot — resell under client's own brand
- [ ] Referral/affiliate program — $200–500 per closed referral
- [ ] Evaluate: contract signing page as standalone micro-SaaS product (COSTS.md)

### Operations
- [ ] Hire part-time VA or junior dev for content updates + report formatting
- [ ] Document every process so someone else can run it
- [ ] First contractor agreement signed (see LEGAL.md)

### Business
- [ ] Raise Autopilot to $499/mo (validate demand first)
- [ ] Explore RubyxQube + Bastion MSP bundle (web + cybersecurity)
- [ ] "Website in a Week" productized offer — $1,500 fixed scope, 5-day turnaround

### Phase 3 Milestones
- [ ] $8,000 MRR
- [ ] 15+ active retainer clients
- [ ] First contractor or VA hired
- [ ] Client portal live
- [ ] Business runs without Boyd touching every single thing

---

## Revenue Model

| Revenue Type | Source | Notes |
|---|---|---|
| Setup fees | Launch ($2,500) / Autopilot ($3,000) / Momentum ($3,000) | One-time per client |
| Monthly retainer | Autopilot ($399/mo) / Momentum ($699/mo) | Recurring — goal = 15+ clients |
| Add-ons | Chatbot, branding, booking, SEO | Upsell at launch or anytime |
| Standalone chatbot | $500 + $199/mo | For businesses with existing sites |

---

## KPIs to Track Monthly

| Metric | Phase 1 Target | Phase 3 Target |
|--------|---------------|----------------|
| Active retainer clients | 1–3 | 15+ |
| MRR | $399–$1,497 | $8,000+ |
| New site builds/mo | 1 | 2–3 |
| Avg project turnaround | 3 weeks | 2 weeks |
| Cold outreach sent/mo | 20 | Mostly inbound |
| Audit calls booked/mo | 2–4 | 8–10 |
| Close rate (audit → client) | 40%+ | 50%+ |
| Client churn | 0 | <5%/mo |

---

## Cost Checkpoints (see COSTS.md for full breakdown)

| Phase | Monthly Burn | Covered by |
|-------|-------------|------------|
| Now (no clients) | ~$11–12/mo | Personal |
| + Google Workspace + 1Password | ~$20–21/mo | Personal |
| Phase 1 (1 client) | ~$25–30/mo | 1 Autopilot client ($399) covers everything |
| Phase 2 (5 clients) | ~$60–80/mo | 1 client's retainer covers all tools |
| Phase 3 (15 clients) | ~$150–200/mo | Tiny % of $8k+ MRR |
