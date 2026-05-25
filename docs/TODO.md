# RubyxQube — TODO

> Ordered by priority. Work top to bottom.  
> Move completed items to `## Done` at the bottom.

---

## 🔴 Critical (Do Next)

- [ ] **Get an EIN** — IRS.gov, free, 5 minutes. Needed for business bank account, Wave, contractors.
- [ ] **Open a business bank account** — bring LLC docs + EIN. Keep revenue separate from personal.
- [ ] **Set up Wave** — free invoicing at wave.com. Connect bank account. Create first invoice template.
- [ ] **Get boyd@rubyxqube.com** — Google Workspace ~$6/mo. Use this for ALL client communication.

---

## 🟡 High Priority (This Month)

### Legal & Contracts
- [ ] Get a service agreement template (Bonsai or Docracy) — customize for RubyxQube
- [ ] Set up DocuSign or HelloSign for e-signatures
- [ ] Write a basic contractor agreement (for when you hire a VA or freelancer)
- [ ] See `docs/LEGAL.md` for full checklist

### Lead Generation
- [ ] Set up Calendly — "Free Audit Call" (15 min), connect to your calendar
- [ ] Set up Loom (free) — for recording free audit videos to send cold prospects
- [ ] Create Google Business Profile for RubyxQube
- [ ] Join 3 Treasure Valley Facebook business groups and introduce yourself
- [ ] Identify 20 cold prospects (Google Maps → local service businesses with bad/no sites)
- [ ] Send first 10 cold outreach emails (template in `docs/LEAD_GEN.md`)
- [ ] See `docs/LEAD_GEN.md` for full playbook

### Website — Services & Samples
- [ ] Add Google Maps embed demo/sample to the site (show the feature, not just describe it)
- [ ] Add **"Browse Designs"** page (`/designs`) — independent previews of site styles clients can choose from
- [ ] Add AI chatbot live demo callout — make it more visible as a core offering
- [ ] Screenshot Phoenix Stoneworks for portfolio card
- [ ] Submit `/sitemap.xml` to Google Search Console

### Phoenix Stoneworks (First Client — Reference Model)
- [ ] Confirm code lives in dedicated GitHub repo (`phoenix-stoneworks-site`) — see `docs/CLIENT_HOSTING.md`
- [ ] Confirm site is on its own Vercel project with separate `ANTHROPIC_API_KEY`
- [ ] Confirm client's domain DNS is pointing to Vercel (not RubyxQube's account)
- [ ] Set up GA4 property for Phoenix Stoneworks, share read access with client
- [ ] Create Notion client page for Phoenix Stoneworks
- [ ] Create 1Password vault for Phoenix Stoneworks credentials
- [ ] Get written testimonial + Google review from Phoenix Stoneworks
- [ ] Write 1-page case study (challenge → what you built → result)
- [ ] Check: are they on a monthly retainer? If yes, invoice via Wave.

### Operations
- [ ] Set up Notion workspace — CRM board + client page template (see SOP.md Section 4)
- [ ] Set up 1Password — one vault per client
- [ ] Create onboarding questionnaire (Google Form — questions in SOP.md Section 5)
- [ ] Get a business phone number (Google Voice is free)

---

## 🔵 Product / Site Features (Build Queue)

- [ ] **`/designs` page** — "Browse website designs you might like" — self-contained, built from scratch with Puppeteer-rendered previews. Huge lead gen tool.
- [ ] **Client template repo** — fork `client-template` for every new client (see `docs/CLIENT_HOSTING.md`)
- [ ] Consider adding a blog (1 post/month — "web design Boise Idaho" and similar local terms)

---

## 🟣 Bastion MSP

- [ ] Pull latest changes from dev workstation (git pull / merge)
- [ ] Sync screenshots for the RubyxQube portfolio card
- [ ] Clarify: is portal.bastionmsp.com publicly linkable, or client-only?
- [ ] Cross-sell: pitch Bastion MSP clients a website through RubyxQube

---

## 🔲 Future / Backlog

- [ ] Client portal (login, stats) — Supabase + Next.js, Phase 3
- [ ] Automated monthly report generation (pull GA4 via API)
- [ ] Referral / affiliate program ($200–500 per referred client)
- [ ] Raise Autopilot pricing to $499/mo once you have 5+ clients
- [ ] "Website in a Week" productized offer — fixed scope, $1,500, 5-day turnaround
- [ ] LinkedIn presence — 2 posts/month, case studies
- [ ] Explore RubyxQube + Bastion MSP bundle (web + cybersecurity for SMBs)

---

## ✅ Done

### Brand & Design (May 2026)
- [x] **Full site overhaul** — new layout, content, and structure ✅
- [x] **Official logo PNGs exported** — horizontal, stacked, clean variants + mark at 512/192/64px
- [x] **favicon.ico** — 16/32/48px ruby cube, live on rubyxqube.com
- [x] **apple-touch-icon.png** — 180px, ruby red background
- [x] **Logo redesign** — ruby red cube with faint X across side faces (0.07 opacity)
- [x] **Rebrand: Qube Solutions → RubyxQube** — ruby red accent (#e11d48), dark sleek design

### Chatbot & Backend
- [x] **AI chatbot MVP** — LIVE on rubyxqube.com
  - Anthropic API (Claude Haiku) via Vercel serverless ✅
  - Lead capture (name, contact, service) ✅
  - Email alerts via Resend → boydquerubin@gmail.com ✅
  - SMS alerts via Twilio — A2P 10DLC registered ✅

### Legal & Business
- [x] **Register the LLC** — Idaho SOS ✅

### Site & Infrastructure
- [x] **Social sharing meta tags** — og:image updated to logo-horizontal.png
- [x] **Add `/sitemap.xml`** — all routes, ready to submit to Search Console
- [x] **Google Analytics 4** — G-9X0RYL01J3 live
- [x] **Formspree contact form** — tested, submissions → Gmail
- [x] **Connect rubyxqube.com** — domain live on Vercel
- [x] **Fix Vercel 404 routing** — SPA rewrite rule
- [x] **MeshGradient animated background** — full site ambient
- [x] **Fix Contact.jsx pricing** — Launch / Autopilot / Momentum with correct prices
- [x] **Add FAQ section to Contact page**
- [x] New package structure: Launch / Autopilot / Momentum
- [x] Add About page + Bastion co-founder background
- [x] Add Bastion MSP to portfolio
- [x] Deploy to Vercel via GitHub
- [x] Create ROADMAP.md, SOP.md, TODO.md
