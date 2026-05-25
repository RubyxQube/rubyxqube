# RubyxQube — Client Hosting & Operations

> The nitty gritty: how every client site is built, hosted, organized, and scaled.  
> Phoenix Stoneworks is the template. Every future client follows this same model.

---

## The Stack (Every Client)

| Layer | Tool | Who Owns It | Cost |
|-------|------|-------------|------|
| Code | GitHub repo (RubyxQube org) | RubyxQube | Free |
| Hosting | Vercel (one project per client) | RubyxQube | Free (Hobby tier) |
| Domain | Namecheap / GoDaddy | **Client owns** | ~$12–15/yr |
| AI Chatbot | Anthropic API (Claude Haiku) | RubyxQube (key per client) | ~$1–3/mo usage |
| Forms | Formspree (one form per client) | RubyxQube | Free (50/mo) |
| SMS Alerts | Twilio (RubyxQube account) | RubyxQube | ~$1–2/mo |
| Email Alerts | Resend (RubyxQube account) | RubyxQube | Free tier |
| Analytics | GA4 (one property per client) | Client owns, we manage | Free |
| Search Console | Google (per site) | Client owns, we manage | Free |
| Credentials | 1Password (vault per client) | RubyxQube | Shared plan |

---

## GitHub Organization

**Org:** `rubyxqube` (or dedicated `rubyxqube-sites`)  
**Naming convention:** `[clientslug]-site`  
**Examples:**
- `phoenix-stoneworks-site`
- `boise-plumbing-site`
- `treasure-valley-hvac-site`

All repos are **private**. Boyd owns them. Clients do not need GitHub access — they access results via monthly reports and direct SMS/email lead alerts.

### Template Repo: `client-template`
Every new client site is forked from this master template. It includes:
- React + Vite + React Router (same stack as rubyxqube.com)
- `ChatWidget.jsx` + `api/chat.js` + `chatConfig.js` (plug in client data)
- Formspree contact form
- GA4 script placeholder
- `sitemap.xml` generator
- Privacy policy page
- `vercel.json` SPA rewrite rule
- `src/siteConfig.js` — single source of truth for client's brand/contact info

---

## Vercel Setup Per Client

1. Create new Vercel project → import from GitHub repo `[client]-site`
2. Add custom domain (client's domain, DNS pointed to Vercel)
3. Add environment variables:
   ```
   ANTHROPIC_API_KEY=sk-ant-...       ← new key per client
   ALERT_PHONE_NUMBER=+12085551234    ← client's SMS number
   TWILIO_ACCOUNT_SID=...             ← RubyxQube Twilio account
   TWILIO_AUTH_TOKEN=...              ← RubyxQube Twilio account
   TWILIO_FROM_NUMBER=...             ← RubyxQube Twilio number
   RESEND_API_KEY=...                 ← RubyxQube Resend account
   ALERT_EMAIL=owner@clientbusiness.com
   ```
4. All credentials stored in 1Password under `[Client Name]` vault

---

## Domain: Who Buys, Who Manages

**Client always owns their domain.** This is non-negotiable — it's their business identity.

Options:
- **They already have a domain:** Get their registrar login, point DNS nameservers to Vercel nameservers. Done.
- **They need a new domain:** Help them register at Namecheap (recommended) or GoDaddy. They use their own account, their card. We guide them through it.
- **We register it for them:** Only if they explicitly ask. Charge them the cost + $25 setup fee. Transfer it to their name immediately.

DNS propagation takes 0–24 hours. Vercel issues SSL automatically once DNS resolves.

---

## Does Anyone Need a Database?

**Almost never, for the sites we build.**

What we build is effectively static + serverless:
- Content is in the code (React components)
- Forms → Formspree → email (no DB)
- Chatbot → Anthropic API → ephemeral (no DB)
- Analytics → GA4 (their DB)
- Lead capture → SMS/email alert (no DB needed)

**Future exceptions** (Phase 3+):
- Client portal / login → Supabase (Postgres + auth)
- Booking system → Calendly embed or Cal.com (their DB)
- Blog with CMS → Contentful or Sanity headless CMS

---

## Phoenix Stoneworks — The First Client Model

Phoenix Stoneworks is our reference client. All future clients should be set up identically.

### Checklist for Phoenix
- [ ] Code lives in a GitHub repo: `phoenix-stoneworks-site` (private)
- [ ] Deployed on Vercel: `phoenix-stoneworks` project
- [ ] Custom domain: client's domain, DNS → Vercel, SSL active
- [ ] `ANTHROPIC_API_KEY` in Vercel env vars (separate key from rubyxqube.com)
- [ ] SMS alert number configured and tested
- [ ] GA4 property created: `Phoenix Stoneworks` — share Read access with client
- [ ] Google Search Console verified for their domain
- [ ] All credentials in 1Password under `Phoenix Stoneworks` vault
- [ ] Client page in Notion CRM with all details
- [ ] Monthly retainer invoiced via Wave (if on Autopilot/Momentum)

---

## Scaling: 1 Client → 20+ Clients

### What stays the same
- Every client = same template, same stack, same process
- Every client = their own Vercel project, their own API key, their own Notion page
- Monthly care routine is the same for all Autopilot clients (just run it for each one)

### What changes as you grow
| Stage | Change |
|-------|--------|
| 1–5 clients | Vercel Hobby (free), manage everything manually |
| 6–10 clients | Upgrade to Vercel Pro ($20/mo) for team features + faster builds |
| 10+ clients | Hire a VA for content updates + report formatting (2–4 hrs/mo per client) |
| 15+ clients | Consider a white-label CMS (Webflow, Framer) for non-React clients |

### Keeping track
- **GitHub:** All repos in one place, clearly named
- **Vercel:** All projects in one dashboard, one-click deployment status
- **Notion:** One page per client with links to everything
- **1Password:** One vault per client, always up to date
- **Wave:** One client per contact, invoices auto-recurring

---

## Client Access & Editing

**Clients do not touch the code.** That's what they're paying you for.

What they do get:
- Monthly PDF report (you send it)
- GA4 read-only access (optional — add their Google account as Viewer)
- SMS/email lead alerts (they get these in real time)
- A way to request changes: text/email you, turnaround within 48 hrs

**Change requests:**
- Autopilot: up to 60 min/mo included. Anything beyond → $75/hr.
- Momentum: up to 90 min/mo included. Anything beyond → $75/hr.
- Track time spent per client in Notion.

---

## When a Client Cancels (Offboarding)

1. Final 30-day notice period — billed in full
2. Hand over:
   - Domain: already theirs, nothing to transfer
   - Site code: zip export of the repo (or transfer GitHub repo to their account)
   - GA4: transfer property ownership to their Google account
   - All assets in Google Drive `/Clients/[Name]/`
3. Remove their API keys from Vercel (deactivate the Anthropic key)
4. Archive their Notion page + Google Drive folder
5. Send offboarding email (professional, leave door open)

**Non-payment policy:**  
After 30 days of missed payment: send warning. After 45 days: pause Vercel deployment (site goes offline). After 60 days: release domain + send final files. This is in the service agreement.
