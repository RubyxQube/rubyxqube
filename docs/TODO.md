# RubyxQube — TODO

> Ordered by priority. Work top to bottom.  
> Move completed items to `## Done` at the bottom.

---

## 🔴 Critical (Do This Week)

- [ ] **Register the LLC** — Idaho SOS online filing, ~$100. Don't take money without this.
- [ ] **Open a business bank account** — keep revenue separate from personal from day one
- [ ] **Set up Wave** (wave.com) — free invoicing + bookkeeping. Create your first invoice template.

---

## 🟡 High Priority (This Month)

### Business Setup
- [ ] Get a business phone number (Google Voice is free — forward to your cell)
- [ ] Set up Google Workspace — boyd@rubyxqube.com once LLC is confirmed
- [ ] Create a simple service agreement / contract (1 page, use a free template from Bonsai or Docracy)
- [ ] Create a proposal template in Google Docs or Notion

### Website
- [ ] Screenshot Phoenix Stoneworks site for the portfolio card (add a real preview image)
- [ ] Test the contact form end-to-end on mobile
- [ ] Set up Google Search Console for rubyxqube.com — submit `/sitemap.xml`
- [ ] Add a "Free Audit" landing page — one focused page for cold outreach links

### Operations
- [ ] Set up Notion workspace:
  - Create a CRM board: Lead → Proposal → Active Build → Launched → Monthly Care → Churned
  - Create a client page template (see SOP.md Section 4)
- [ ] Set up 1Password — start storing all credentials here, never in a doc or browser autofill
- [ ] Set up Calendly — connect to your calendar, create a "Free Audit Call" event (15 min)

---

## 🟢 Before First Client

- [ ] **Build the AI chatbot MVP** — core feature of the Autopilot package, can't sell it without it
  - Anthropic API key (already have — add ANTHROPIC_API_KEY to Vercel env vars)
  - System prompt template ready (see SOP.md Section 7)
  - Lead capture working (name, phone, what they need)
  - SMS alert to your phone via Twilio
  - Test on a demo page before deploying to a client
- [ ] Create an onboarding questionnaire (Google Form — use the questions in SOP.md Section 5)
- [ ] Write up Phoenix Stoneworks as a case study (1 page: challenge, what you built, result)
- [ ] Get a testimonial / Google review from Phoenix Stoneworks
- [ ] Create a Google Business Profile for RubyxQube

---

## 🔵 Product / Site Improvements

- [ ] Add real preview images to portfolio cards (screenshot tools: Screely, BrowserFrame)
- [ ] Consider adding a blog (1 post/month targeting local SEO terms like "web design Boise Idaho")

---

## 🟣 Bastion MSP

- [ ] Pull latest changes from dev workstation (git pull / merge)
- [ ] Sync screenshots for the RubyxQube portfolio card
- [ ] Clarify: is the portal.bastionmsp.com publicly linkable, or is it client-only?
- [ ] Cross-sell opportunity: could Bastion MSP clients be pitched a website refresh through RubyxQube?

---

## 🔲 Future / Backlog

- [ ] Client portal (login page where clients see their stats) — Supabase + Next.js, Phase 3
- [ ] Automated monthly report generation (pull GA4 via API)
- [ ] Referral / affiliate program ($200–500 per referred client)
- [ ] Raise Autopilot pricing to $499/mo once you have 5+ clients (validate before raising)
- [ ] "Website in a Week" productized offer — fixed scope, fixed $1,500, 5-day turnaround
- [ ] LinkedIn presence — 2 posts/month, case studies, tips for service business owners
- [ ] Local Facebook Groups — join Boise/Treasure Valley small business groups, provide value
- [ ] Explore RubyxQube + Bastion MSP bundle (web + cybersecurity for SMBs)

---

## ✅ Done

- [x] **Fix Contact.jsx pricing** — updated to Launch / Autopilot / Momentum with correct prices
- [x] **Add FAQ section to Contact page** — 6 common questions to reduce friction
- [x] **Add social sharing meta tags** — og:title, og:description, og:image, Twitter card
- [x] **Add `/sitemap.xml`** — all 7 routes, ready to submit to Search Console
- [x] **Google Analytics 4** — G-9X0RYL01J3 live on site
- [x] **Formspree contact form** — @formspree/react, tested and working (submissions → Gmail)
- [x] **Connect rubyxqube.com** — domain live on Vercel, DNS via Vercel nameservers
- [x] **Rebrand to RubyxQube** — page title, meta description, TODO.md, ROADMAP.md
- [x] Rebuild site with AI receptionist positioning (Home, Services, Pricing)
- [x] New package structure: Launch / Autopilot / Momentum
- [x] Add About page to nav
- [x] Add Bastion MSP to portfolio
- [x] Update About page with Bastion co-founder background
- [x] Fix PackageCard schema mismatch (tagline + billing props)
- [x] Fix Vercel 404 routing (SPA rewrite rule)
- [x] Switch to dark sleek design with electric blue accent
- [x] Full-width section architecture (surface + section)
- [x] Set up MeshGradient animated background
- [x] Deploy to Vercel via GitHub
- [x] Create ROADMAP.md
- [x] Create SOP.md
- [x] Create TODO.md
