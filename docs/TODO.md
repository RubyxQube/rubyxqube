# RubyxQube — TODO

> Last updated: May 2026. No clients yet — focused on closing first 3.  
> Work top to bottom. Don't skip ahead.

---

## 🔴 This Week — Unblock Everything

These are the last things standing between you and taking real client money.

- [x] **Get EIN** — received ✅
- [ ] **Open business bank account (ICCU)** — blocked on SOSbiz certificate (Idaho SOS, pending). Bring LLC docs + EIN + SOSbiz cert when it arrives.
- [ ] **Set up Wave** — wave.com, free. Connect bank account. Create invoice template (Launch $2,500 / Autopilot $399/mo / Momentum $699/mo).
- [ ] **Get boyd@rubyxqube.com** — Google Workspace $6/mo. Use this for ALL client communication from now on.
- [ ] **Download service agreement template** — bonsai.io/templates (free, no account needed). Customize for RubyxQube. This is your contract until the signing page is built.

---

## 🟡 Before First Client Onboards

### Ops Setup
- [ ] **Set up Notion** — CRM board (Lead → Proposal → Active Build → Launched → Monthly Care → Churned) + client page template (SOP.md §4)
- [ ] **Set up 1Password** — one vault per client for credentials + API keys
- [ ] **Set up Calendly** — free tier, one event: "Free Website Audit" (15 min). Connect to your calendar. This is your lead conversion tool.
- [ ] **Set up Loom** — free tier. Use for recording personalized audit videos to send cold prospects.
- [ ] **Set up UptimeRobot** — uptimerobot.com, free. Add rubyxqube.com now. Add each client site at launch.
- [ ] **Set up Wave recurring invoices** — configure auto-send + payment reminders for each retainer client at onboarding.
- [ ] **Create onboarding questionnaire** — Google Form using questions in SOP.md §5. Send to every new client before kickoff call.

### Lead Gen (Start Now)
- [ ] **Create Google Business Profile** for RubyxQube — "Web Designer" + "Marketing Agency" category
- [ ] **Join 3 Treasure Valley Facebook business groups** — introduce yourself, provide value, don't pitch
- [ ] **Build multi-industry prospect hit list** — 5 targets per industry (trades, medical, legal, auto, fitness, real estate, etc.). Run prospect-researcher on each. Goal: understand which industries respond and convert best. See OUTREACH_TEMPLATES.md.
- [ ] **Identify 20 cold prospects** — Google Maps, find local service businesses with bad/no websites
- [ ] **Send first 10 cold outreach emails** — template in OUTREACH_TEMPLATES.md. Goal: book audit calls.
- [ ] **Reach out to warm network** — friends, family, Bastion MSP contacts. Ask for referrals, not business directly.

### Phoenix Stoneworks (Reference Client — Do This Right)
- [ ] Confirm code is in its own GitHub repo (`phoenix-stoneworks-site`, private)
- [ ] Confirm it's on its own Vercel project with separate `ANTHROPIC_API_KEY`
- [ ] Confirm client owns their domain and DNS points to Vercel
- [ ] Create GA4 property for Phoenix, share read access with client
- [ ] Create Notion client page + 1Password vault for their credentials
- [ ] Screenshot the site → add to portfolio card on rubyxqube.com
- [ ] Ask for a written testimonial + Google review
- [ ] Write 1-page case study (challenge → what you built → result)
- [ ] Confirm: are they on a monthly retainer? If yes, invoice via Wave.

### Website
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Test contact form + chatbot end-to-end on a real mobile device
- [ ] Add Google Maps embed demo/sample to services page

---

## 🤖 Automation Build Queue

### Do Now (no code, free)
- [ ] UptimeRobot — rubyxqube.com + each client at launch
- [ ] Wave auto-invoicing — set up per retainer client at onboarding

### Build Soon (before 3rd client)
- [ ] **Contract signing page** (`/sign/[token]`) — biggest win. Typed name = legally binding (E-SIGN + Idaho UETA). Puppeteer PDF + Resend email + auto-triggers provisioning. See AUTOMATION.md §0.
- [ ] **`scripts/send-contract.mjs`** — generates unique link, emails client
- [ ] **`scripts/provision-client.mjs`** — GitHub API + Vercel API → new client repo + project in one command. See AUTOMATION.md §1.
- [ ] **Chatbot lead → Notion CRM** — Notion API call in `api/chat.js`. Leads auto-appear in CRM. See AUTOMATION.md §2.
- [ ] **`scripts/offboard-client.mjs`** — zip repo + HANDOFF.md + pause Vercel + email. Build before first cancellation. See AUTOMATION.md §7.
- [ ] **Create `client-template` repo** — fork for every new client. See CLIENT_HOSTING.md.

### Build Phase 2 (5+ clients)
- [ ] **`scripts/generate-report.mjs`** — GA4 API → PDF via Puppeteer → email via Resend on 1st of month
- [ ] **Non-payment escalation** — day 30 SMS to Boyd, day 45 warning email to client, day 60 Vercel pause. See AUTOMATION.md §5.

---

## 🔵 Product / Site (Build Queue)

- [ ] **`/designs` page** — "Browse website designs you might like." Independent previews clients can pick from. Major lead gen tool.
- [ ] Blog — 1 post/month targeting local SEO ("web design Boise Idaho")

---

## 🟣 Bastion MSP

- [ ] Pull latest changes from dev workstation (git pull)
- [ ] Sync screenshots for RubyxQube portfolio card
- [ ] Clarify: is portal.bastionmsp.com publicly linkable?
- [ ] Cross-sell: pitch Bastion MSP clients a website through RubyxQube

---

## 🔲 Future / Backlog

- [ ] Client portal (login, stats) — Supabase + Next.js, Phase 3
- [ ] Automated monthly reporting (GA4 API + Puppeteer + Resend cron)
- [ ] Referral/affiliate program ($200–500 per referred client)
- [ ] Raise Autopilot to $499/mo at 5+ clients
- [ ] "Website in a Week" productized offer — $1,500, 5-day turnaround
- [ ] LinkedIn — 2 posts/month, case studies
- [ ] Contract signing page → evaluate as standalone micro-SaaS product (COSTS.md)
- [ ] Explore RubyxQube + Bastion MSP bundle

---

## ✅ Done

### Brand & Legal
- [x] RubyxQube LLC registered — Idaho SOS ✅
- [x] USPTO trademark application filed and paid — RubyxQube™, awaiting full confirmation ✅
- [x] Twilio A2P 10DLC registered — SMS alerts fully operational ✅
- [x] Full site overhaul — new layout, content, structure ✅
- [x] Logo redesign — ruby cube with faint X across side faces (0.07 opacity) ✅
- [x] All brand PNGs exported — 16 logo variants (no mark / TM / ® / clean) + mark at 512/192/64px ✅
- [x] favicon.ico (16/32/48px) + apple-touch-icon.png (180px ruby red bg) ✅
- [x] TM added to footer legal line: "RubyxQube™ is a trademark of RubyxQube LLC" ✅

### Docs Created
- [x] ROADMAP.md, SOP.md, TODO.md ✅
- [x] CLIENT_HOSTING.md — per-client stack, GitHub org, Vercel, domain policy, scaling ✅
- [x] LEAD_GEN.md — warm/cold/community/partnership/paid playbook ✅
- [x] LEGAL.md — contracts, e-sig research, Idaho notes, EIN, privacy ✅
- [x] AUTOMATION.md — full lifecycle automation plan (contract → provision → report → offboard) ✅
- [x] COSTS.md — all costs, margins, revenue scenarios, free tier limits ✅

### Site & Infrastructure
- [x] AI chatbot live on rubyxqube.com (Claude Haiku, lead capture, email + SMS alerts) ✅
- [x] Social sharing meta tags + og:image → logo-horizontal.png ✅
- [x] sitemap.xml — all routes ✅
- [x] Google Analytics 4 — G-9X0RYL01J3 ✅
- [x] Formspree contact form — tested ✅
- [x] rubyxqube.com — live on Vercel, custom domain ✅
- [x] Vercel 404 SPA rewrite rule ✅
- [x] MeshGradient animated background ✅
- [x] Launch / Autopilot / Momentum package structure ✅
- [x] About page + Bastion MSP portfolio ✅
