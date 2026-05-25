# RubyxQube — Business Roadmap

> **Owner:** Boyd Querubin  
> **Model:** Solo web design + AI receptionist agency for Treasure Valley service businesses  
> **Goal:** Build a sustainable, recurring-revenue business to $10k MRR within 12 months

---

## Phase 0 — Pre-Launch *(Right now)*

Get the foundation in place before actively selling.

### Business Setup
- [ ] Register LLC (Idaho Secretary of State — $100 online)
- [ ] Open business checking account (separate from personal)
- [ ] Set up invoicing + contracts (Wave for invoicing, free / HoneyBook for contracts)
- [ ] Get a business phone number (Google Voice is free, or OpenPhone $15/mo)
- [ ] Set up Google Workspace for boyd@rubyxqube.com

### Operations
- [ ] Set up Notion workspace — one page per client (template in SOP.md)
- [ ] Set up 1Password for credential management (client logins, API keys, hosting)
- [ ] Create proposal template (Google Docs or Notion)
- [ ] Create contract template (simple service agreement — use DocuSign or HelloSign)
- [ ] Create intake questionnaire (Google Form or Typeform)

### Product
- [x] Update Contact.jsx pricing to match new packages (Launch / Autopilot / Momentum)
- [x] Set up analytics stack — GA4 (G-9X0RYL01J3) live on rubyxqube.com
- [x] Contact form live — Formspree (@formspree/react), tested and working
- [ ] Build AI chatbot MVP using Anthropic Claude API (needed before selling Autopilot — code already exists, needs deployment + testing)
- [ ] Document chatbot onboarding process (what info you need from client)
- [ ] Screenshot Phoenix Stoneworks for portfolio

### Website
- [x] Rebuild site with AI receptionist positioning
- [x] Add Bastion MSP to portfolio
- [x] Connect rubyxqube.com — live on Vercel
- [x] Social meta tags + sitemap.xml + FAQ on contact page
- [ ] Add real screenshot/preview images to portfolio cards
- [ ] Test all forms and CTAs end-to-end on mobile
- [ ] Set up Google Search Console for rubyxqube.com

---

## Phase 1 — First Clients *(Month 1–3)*

**Target:** 3 paying clients. At least 1 on Autopilot or Momentum.

### Revenue Target
| Mix | MRR |
|-----|-----|
| 3× Launch (one-time only) | $0 recurring |
| 2× Launch + 1× Autopilot | $399/mo |
| 1× Launch + 2× Autopilot | $798/mo |
| 2× Autopilot + 1× Momentum | $1,497/mo ← aim for this |

### How to Get First Clients
1. **Warm network first** — friends, family, referrals, local Facebook groups
2. **Cold outreach** — find local service businesses with bad/no websites (search Google, check for "no website" in GBP)
3. **Offer a free audit** — 15-min Loom video of their current site, what it's costing them, what you'd fix
4. **Phoenix Stoneworks case study** — write a short before/after case study, post it

### Milestones
- [ ] First signed contract
- [ ] First Autopilot client (recurring revenue starts)
- [ ] 1 client case study written and published
- [ ] 5-star Google review from a client

---

## Phase 2 — Foundation *(Month 3–6)*

**Target:** $3,000–5,000 MRR. Recurring base is stable. Operations are repeatable.

### Revenue Target
- 5–8 Autopilot/Momentum clients = $2k–$5.5k/mo recurring
- New site builds as one-off revenue on top

### Product
- [ ] AI chatbot is battle-tested across at least 3 client sites
- [ ] Monthly report template is automated (pull GA4 + chatbot data into a Notion/Sheets template)
- [ ] AI chatbot add-on available standalone ($500 + $199/mo) for existing site owners

### Operations
- [ ] Refine onboarding to under 3 hours of client-facing time
- [ ] Build a client handoff checklist (everything they need post-launch)
- [ ] Set up simple CRM (Notion board: Lead → Active → Launched → Monthly Care)

### Marketing
- [ ] 2 LinkedIn posts/month (case studies, tips for service business owners)
- [ ] Create a Google Business Profile for RubyxQube
- [ ] Get listed in Treasure Valley local business directories
- [ ] Start collecting email addresses (Mailchimp free tier, monthly tips email)

---

## Phase 3 — Growth *(Month 6–12)*

**Target:** $8,000–10,000 MRR. First hire or contractor. Systematized.

### Revenue Target
- 15–20 Autopilot/Momentum clients = $6k–$14k MRR
- Add-on revenue (chatbot retrofits, logo work, booking integrations)

### Product
- [ ] Client portal — simple login page where clients see their monthly stats (Next.js + Supabase)
- [ ] Automated monthly report generation (pull GA4 data via API, generate PDF)
- [ ] White-labeled chatbot — resell under client's own brand
- [ ] Consider: small business SEO package as a standalone

### Operations
- [ ] Hire a part-time VA or junior dev for content updates and small changes
- [ ] Create an affiliate/referral program (pay $200–500 for client referrals)
- [ ] Document every process so someone else can run it

### Business
- [ ] Revisit pricing (probably raise Autopilot to $499/mo by Phase 3)
- [ ] Explore Bastion MSP / Qube Solutions cross-sell (cybersecurity + web = strong package for SMBs)
- [ ] Consider productized service: "Website in a Week" fixed scope, fixed price, fast turnaround

---

## Revenue Model Summary

| Revenue Type | Source | Notes |
|---|---|---|
| **Setup fees** | Launch ($2,500) / Autopilot ($3,000) / Momentum ($3,000) | One-time per client |
| **Monthly retainer** | Autopilot ($399/mo) / Momentum ($699/mo) | Recurring, goal = 15+ clients |
| **Add-ons** | Chatbot, branding, booking, SEO | Upsell at launch or anytime |
| **Standalone chatbot** | $500 + $199/mo | For businesses with existing sites |

---

## KPIs to Track Monthly

| Metric | Target (Phase 1) | Target (Phase 3) |
|--------|-----------------|-----------------|
| Active retainer clients | 1 | 15+ |
| MRR | $399 | $8,000+ |
| New site builds/mo | 1–2 | 2–3 |
| Avg. project turnaround | 3 weeks | 2 weeks |
| Client churn | 0 | <5%/mo |
| Net Promoter Score | N/A | Track |
