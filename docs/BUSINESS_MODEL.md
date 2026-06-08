# RubyxQube — Business Model

> Internal document. Updated as the business evolves.  
> Last reviewed: May 2026

---

## What We Are

**RubyxQube** is a productized web design + AI services agency for small service businesses in the Treasure Valley (and beyond). We don't sell hours — we sell outcomes: a live website with a Claude-powered AI receptionist that captures leads while the client is on the job.

The model is designed to be high-margin, recurring, and solo-operable up to ~$15k MRR before needing help.

---

## Core Value Proposition

Most local service businesses (plumbers, HVAC, landscapers, contractors) have one of three problems:

1. **No website** — invisible to customers who search online
2. **Dead website** — looks unprofessional, no lead capture, never updated
3. **Missed leads** — website exists but no one responds quickly enough

We solve all three with a single product: a professional website + AI receptionist that works 24/7.

**Why AI changes the economics:**  
A traditional receptionist costs $2,500–4,000/month. A part-time answering service costs $200–500/month. Our AI receptionist: included in a $399/mo retainer. The math sells itself.

---

## Revenue Streams

### 1. Monthly Retainers (Recurring — no setup fees)
| Plan | Monthly | What's Included |
|------|---------|-----------------|
| Autopilot | $399/mo | Custom site, AI chatbot, 24/7 lead capture, monthly report, 60 min/mo updates |
| Momentum | $999/mo | Everything in Autopilot + developer on call, unlimited edits, custom tools, GBP management, monthly AI tuning, weekly check-in call |

> Setup fees ($3,000) were removed June 2026 — absorbed into monthly. No setup fees on any plan.

### 2. One-Time Projects

### 3. Launch (One-Time)
| Add-On | Price |
|--------|-------|
| AI Chatbot Only (existing site retrofit) | $500 + $199/mo |
| Domain Registration & Setup | $75 |
| Business Email (Google Workspace) | $100 setup |
| Extra Page | $250 |
| Copywriting | $500 |
| Logo & Brand Kit | $350 |
| Booking Integration | $150 |
| Site Migration | $500 |

### 4. Future Revenue (Phase 2+)
- White-labeled AI chatbot for other agencies
- Referral commissions (partner with bookkeepers, insurance agents who serve same SMB market)
- Qube Solutions × Bastion MSP bundle (web + cybersecurity for regulated SMBs)

---

## Unit Economics

### Per-Client Margin (Autopilot, steady state)

| Item | Cost | Notes |
|------|------|-------|
| **Revenue** | $399/mo | Monthly retainer |
| AI API costs | ~$0.50–1/mo | Claude Haiku (Anthropic API), ~100 conversations at 1,500 tokens avg |
| SMS alerts (Twilio) | ~$1–2/mo | ~100 SMS/month at $0.0075 each |
| Hosting (Vercel) | ~$0–2/mo | Free tier covers most clients; Pro plan $20/mo shared across all |
| Time (care + report) | ~1.5 hrs/mo | At your effective rate of $100/hr = $150/mo cost |
| **Gross margin** | **~$240/mo** | ~60% after time cost |
| **Gross margin (no time cost)** | **~$392/mo** | ~98% pure infrastructure margin |

> At $100/hr effective rate, the monthly care time is the real cost — not the AI infrastructure.  
> Goal: automate report generation and reduce care time to under 45 min/client → margin improves to ~75%.

### Per-Client Margin (Momentum)

| Item | Cost |
|------|------|
| Revenue | $999/mo |
| AI + SMS + hosting | ~$5–10/mo |
| Time (care + report + dev work + weekly calls) | ~3 hrs/mo (~$300) |
| **Gross margin** | **~$389/mo** (~56%) |

> Momentum clients are more time-intensive but the weekly check-in and dev work builds a sticky relationship.
> Churn rate should be significantly lower — they depend on you for active development work.

### Setup Fee Margin

| Item | Cost |
|------|------|
| Setup fee (Autopilot) | $3,000 |
| Time to build site + chatbot | ~20 hrs |
| At $100/hr effective rate | $2,000 cost |
| **Gross margin per new client** | **~$1,000 one-time** |

---

## Revenue Targets

### Solo Operator Ceiling
At 1.5 hrs/month per Autopilot client, Boyd can manage ~30 clients solo (45 hrs/month).  
At 30 Autopilot clients + 5 Momentum: **$14,470/mo MRR** — this is the solo ceiling.

### Phase Targets
| Phase | Timeline | MRR Target | Client Count |
|-------|----------|------------|--------------|
| Phase 0 | Now | $0 | 0 |
| Phase 1 | Month 1–3 | $400–1,500 | 1–4 |
| Phase 2 | Month 3–6 | $3,000–5,000 | 8–12 |
| Phase 3 | Month 6–12 | $8,000–12,000 | 20–30 |
| Scale | Year 2 | $15,000+ | 30+ (hire help) |

---

## Service Delivery Model

### Who does the work?
- **Phase 0–2:** Boyd does everything. Efficient because of SOP and templates.
- **Phase 2–3:** Hire a part-time VA ($15–20/hr) for: content updates, report compilation, client check-ins, GBP management.
- **Phase 3+:** Hire a junior dev ($25–35/hr) for: new site builds, chatbot setup, technical work. Boyd moves to sales + strategy.

### Time per new client (Autopilot build)
| Task | Hours |
|------|-------|
| Sales call + proposal | 1 hr |
| Onboarding call | 0.75 hr |
| Site build | 12–15 hrs |
| Chatbot setup + testing | 2–3 hrs |
| Launch + handoff | 1 hr |
| **Total** | **~18–20 hrs** |

### Ongoing time per client per month
| Task | Autopilot | Momentum |
|------|-----------|----------|
| Monthly report | 30 min | 30 min |
| Site updates | 30 min | 30 min |
| GBP management | — | 20 min |
| AI receptionist tuning | — | 30 min |
| Weekly check-in calls | — | varies |
| Weekly check-ins (text) | 5 min | 5 min |
| **Total** | **~1.25 hrs** | **~2.5 hrs** |

---

## Competitive Positioning

### vs. Freelancers
- Freelancers build and disappear — no ongoing support, no AI
- We're a managed service — build + maintain + grow

### vs. Wix/Squarespace DIY
- DIY takes 20–40 hours and the result looks DIY
- No AI receptionist, no SEO setup, no monthly care

### vs. Full-Service Agencies
- Agencies charge $5,000–15,000 for a site + $1,500–5,000/mo management
- We charge a fraction, deliver faster, and have AI built in

### vs. Other AI Chatbot Tools (Drift, Intercom, etc.)
- Those tools are generic — not trained on the specific business
- They charge $400–1,500/mo just for the chatbot
- We include it in the retainer and customize it to the business

---

## Key Business Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Client churn (cancel retainer) | Medium | Weekly check-ins + monthly strategy calls build stickiness; 30-day cancellation notice gives recovery time |
| AI API pricing changes | Low | Claude Haiku pricing is stable; even a 10× increase = ~$54/mo at 50 clients |
| Time crunch (too many clients, too little time) | High (Phase 2) | SOPs must be tight; hire VA before hitting capacity wall |
| Client doesn't see ROI | Medium | Monthly reports show concrete lead numbers; onboard with realistic expectations |
| Larger competitor enters market | Medium | Local relationships + responsiveness is the moat; not replicable by remote agencies |

---

## Growth Levers

1. **Referral program** — pay $250–500 per referred signed client. Service businesses talk to each other.
2. **Case studies** — one published case study with before/after lead numbers is worth 10 cold calls.
3. **Google Business Profile** — optimize Qube Solutions' own GBP for "web design Boise" searches.
4. **The RubyxQube site itself** — it runs the Claude AI receptionist. Any visitor who asks gets a live demo of exactly what we sell.
5. **Bastion MSP cross-sell** — cybersecurity + web + AI = a compelling bundle for regulated SMBs.
6. **Expand service area** — once SOPs are tight, work is remote. No reason to stay Treasure Valley only.
