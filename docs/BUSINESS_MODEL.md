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
| Autopilot | $499/mo | Custom site, no page limit, virtual assistant, 24/7 lead capture, unlimited edit requests (one at a time), 4 blog posts/mo, Google Business Profile, monthly report, client portal |
| Momentum | $999/mo | Everything in Autopilot + developer on call, custom software (calculators, estimators, booking, interactive 3D), weekly strategy call, direct line, front of queue |

> Setup fees ($3,000) were removed June 2026, absorbed into monthly. No setup fees on any plan.
> **Autopilot carries a 6-month minimum**, and that minimum is what pays for the
> build. It is the whole reason there is no setup fee, so it is a feature to
> state plainly rather than a term to bury.
>
> **Launch ($1,200 one-time) was retired 2026-08-22.** Autopilot went $399 to
> $499 and absorbed most of what it used to share with Momentum, which became
> purely the developer-for-hire tier. Do not quote Launch, and do not describe
> anything as a one-time build.

### 2. One-Time Projects

### 3. Add-Ons
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
| **Revenue** | $499/mo | Monthly retainer |
| AI API costs | ~$0.50–1/mo | Claude Haiku (Anthropic API), ~100 conversations at 1,500 tokens avg |
| SMS alerts (SignalWire) | ~$1–2/mo | ~100 SMS/month at ~$0.008 each |
| Hosting (Vercel) | ~$0–2/mo | Free tier covers most clients; Pro plan $20/mo shared across all |
| Time (care + report) | ~1.5 hrs/mo | At your effective rate of $100/hr = $150/mo cost |
| **Gross margin** | **~$340/mo** | ~68% after time cost |
| **Gross margin (no time cost)** | **~$492/mo** | ~98% pure infrastructure margin |

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

### The build, and what actually pays for it

There is no setup fee, so the build is financed by the 6-month minimum. This is
the single most important number in the business and it is worth staring at:

| Item | Value |
|------|-------|
| Time to build site + assistant | ~18–20 hrs |
| Cost at $100/hr effective rate | ~$1,800–2,000 |
| Revenue over the 6-month minimum | $2,994 |
| Ongoing care over those 6 months | ~9 hrs (~$900) |
| **Contribution across the minimum term** | **~$100–300** |

**Month 7 is where an Autopilot client becomes profitable.** Before that you are
roughly breaking even, and if the build overruns you are underwater. Two
consequences follow, and they should drive delivery decisions more than
anything else in this document:

1. **Build hours are the whole margin.** Every hour saved on a build is worth
   more than an hour saved anywhere else. This is the case for templates, for
   the scaffolder, and for refusing bespoke design on Autopilot.
2. **Churn at month 7 is the thing that kills the model**, not churn at month 2.
   Retention past the minimum is where all the profit lives.

A client who stalls the build for three months waiting to send photos does not
delay the revenue, but they do consume the term. See MARKETING-PACKAGES.md on
why the photo bottleneck is a margin problem and not just an annoyance.

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
