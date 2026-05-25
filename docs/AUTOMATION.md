# RubyxQube — Automation Playbook

> What should be automated, when it fires, and what tool handles it.  
> Goal: run 10+ clients without 10x the admin work.

---

## Automation Philosophy

Automate anything that:
- Happens the same way every time (provisioning, invoicing, reporting)
- Is easy to forget but high consequence if missed (payment reminders, site monitoring)
- Takes more than 5 minutes and repeats monthly (GA4 reports)

Don't automate:
- First touchpoints with clients (personal > efficient here)
- Audit calls, proposals, strategy (relationship work stays human)

---

## 0. Contract Signing (Send → Sign → Auto-Provision)

**Trigger:** Boyd runs `send-contract.mjs` after verbal agreement  
**Goal:** Client signs from a link, provisioning starts automatically — zero manual steps

### Why not Bonsai / DocuSign / HelloSign?
- Bonsai: no API
- Docracy: defunct
- DocuSign: $25+/envelope
- HelloSign: $75/mo for production API
- PandaDoc: enterprise-only API
- **Verdict: Build it ourselves — typed name is legally binding under E-SIGN + Idaho UETA**

### Script: `scripts/send-contract.mjs`

```
node scripts/send-contract.mjs --slug "phoenix-stoneworks" --package "autopilot" --setup 3000 --monthly 399
```

**What it does:**
1. Generates a unique signing token (UUID)
2. Stores contract details in a simple JSON record (Vercel KV or a flat file)
3. Sends the client an email via Resend with their unique signing link:
   `https://rubyxqube.com/sign/[token]`

### Signing Page: `/sign/[token]`

A page on rubyxqube.com that:
- Renders the full contract HTML with their name, package, price, dates pre-filled
- Has a "Type your full name to sign" input + date field
- Records on submission: name typed, timestamp, IP address, user agent
- Calls Puppeteer via serverless function to generate signed PDF
- Emails signed PDF to client + boyd@rubyxqube.com via Resend
- Triggers `provision-client.mjs` automatically (provisioning starts the moment they sign)

### Audit trail stored per contract:
```json
{
  "clientSlug": "phoenix-stoneworks",
  "signerName": "John Smith",
  "signedAt": "2026-05-25T14:32:00Z",
  "ipAddress": "71.45.xxx.xxx",
  "userAgent": "Mozilla/5.0...",
  "documentVersion": "v1.2",
  "pdfPath": "/contracts/phoenix-stoneworks-2026-05-25.pdf"
}
```

**Legal validity:** Fully binding under US E-SIGN Act and Idaho UETA (Idaho Code § 28-50-107).  
**Cost:** $0/month forever.  
**Status:** 🔲 Not built — highest-value automation to build. See `docs/LEGAL.md` for full analysis.

---

## 1. New Client Provisioning

**Trigger:** Contract signed + deposit received  
**Goal:** Go from "new client" to "ready to build" in under 10 minutes instead of 45

### Script: `scripts/provision-client.mjs`

A CLI script that takes a client slug and name as input and:

```
node scripts/provision-client.mjs --slug "phoenix-stoneworks" --name "Phoenix Stoneworks"
```

**What it does automatically:**
- [ ] Creates a new private GitHub repo from `client-template` using GitHub API
- [ ] Creates a Vercel project linked to that repo using Vercel API
- [ ] Generates a pre-filled `src/siteConfig.js` stub with client name
- [ ] Creates a `chatConfig.js` stub with client name placeholder
- [ ] Outputs a checklist of manual steps remaining (domain DNS, env vars, 1Password)

**Status:** 🔲 Not built yet — Phase 1 priority

**APIs needed:**
- GitHub API: `POST /orgs/{org}/repos` (fork from template)
- Vercel API: `POST /v10/projects` (create project + link repo)

---

## 2. Chatbot Lead → CRM

**Trigger:** Chatbot `capture_lead` tool fires (someone submits name + contact + service)  
**Goal:** Lead automatically appears in Notion CRM, not just in email/SMS

### Current state
Lead fires → Resend email → boyd@rubyxqube.com + Twilio SMS  
Boyd manually adds to Notion CRM (this is the gap)

### Automation
**Option A — n8n / Make (no-code):**
- Webhook fires from `api/chat.js` when lead is captured
- n8n receives webhook → creates Notion database entry with lead details
- Stage automatically set to "Lead"

**Option B — Direct Notion API call from `api/chat.js`:**
- Add Notion SDK to the chatbot serverless function
- On lead capture: `notion.pages.create(...)` with lead data
- No external tool needed, fully in-code

Option B is cleaner since we already have the serverless function.

**Status:** 🔲 Not built — add `NOTION_API_KEY` + `NOTION_DATABASE_ID` to Vercel env vars, update `api/chat.js`

---

## 3. Site Uptime Monitoring

**Trigger:** Any client site goes offline  
**Goal:** Boyd knows before the client does

### Tool: UptimeRobot (free tier)
- Monitors up to 50 sites, checks every 5 minutes
- Sends SMS + email alert on downtime
- Set up one monitor per client site + rubyxqube.com itself
- Dashboard shows all sites' status at a glance

**Setup:** uptimerobot.com → Add Monitor → HTTP(s) → paste client URL → add Boyd's phone + email

**Status:** 🔲 Set up as each client goes live. Free forever.

---

## 4. Recurring Invoicing

**Trigger:** 1st of each month  
**Goal:** Invoice sends automatically, no manual action

### Tool: Wave (free)
- Set up a recurring invoice per Autopilot/Momentum client
- Auto-sends on the 1st of each month
- Auto-reminder at 7 days overdue, 14 days overdue
- Boyd gets notified when paid

**Status:** 🔲 Set up per client when they go live on retainer

---

## 5. Non-Payment Escalation

**Trigger:** Invoice overdue  
**Goal:** Graduated automated pressure, so nothing falls through the cracks

### Timeline
| Day | Automation | Tool |
|-----|-----------|------|
| Day 1 | Invoice sent | Wave (auto) |
| Day 7 | First reminder | Wave (auto) |
| Day 14 | Second reminder | Wave (auto) |
| Day 30 | **Boyd gets SMS alert** "Client X is 30 days overdue — take action" | Twilio / Wave webhook |
| Day 45 | Warning email to client: "Service will be paused in 15 days" | Automated email (Resend) |
| Day 60 | **Vercel deployment paused** (site goes offline) | Vercel API script |
| Day 60 | Offboarding package generated | Script (see Section 7) |

### Script: `scripts/pause-client.mjs`
```
node scripts/pause-client.mjs --slug "phoenix-stoneworks"
```
- Calls Vercel API to pause/disable the deployment
- Logs the action with timestamp in client's Notion page
- Sends offboarding email to client automatically

**Status:** 🔲 Not built — Vercel API: `PATCH /v9/projects/{id}` to disable

---

## 6. Monthly Reporting

**Trigger:** 1st of each month (or manually triggered)  
**Goal:** Monthly report generated and emailed to client automatically

### Phase 1 (manual, structured)
- Boyd pulls GA4 data manually
- Fills in a Google Sheets template (one tab per client)
- Exports as PDF
- Sends via email

**Template to build:** `templates/monthly-report.sheets` — pre-built with formulas, client just needs data pasted in

### Phase 2 — Semi-automated (build this)
**Script: `scripts/generate-report.mjs --slug "phoenix-stoneworks"`**
- Calls GA4 Data API: sessions, top pages, bounce rate, conversions
- Calls chatbot logs (if we store them): leads captured this month
- Populates a Markdown or HTML report template
- Exports to PDF (using puppeteer — already installed)
- Emails to client via Resend

**GA4 API needed:** `@google-analytics/data` npm package  
**Status:** 🔲 Phase 2 build — high value once you have 5+ clients

### Phase 3 — Fully automated
- Cron job (Vercel cron or GitHub Actions) fires on 1st of each month
- Runs `generate-report.mjs` for ALL active clients
- Sends all reports automatically

---

## 7. Offboarding Package Generator

**Trigger:** Client cancels OR non-payment hits day 60  
**Goal:** Professional, complete handoff without manual scrambling

### Script: `scripts/offboard-client.mjs --slug "phoenix-stoneworks"`

**What it does:**
- [ ] Creates a zip of the client's GitHub repo (git archive)
- [ ] Exports a `HANDOFF.md` with:
  - All credentials (pulls from 1Password CLI — `op` CLI)
  - Domain registrar info
  - GA4 property ID
  - Vercel project URL
  - Anthropic API key location (remind them to revoke it)
  - Google Search Console access instructions
- [ ] Sends offboarding email via Resend with the zip + HANDOFF.md attached
- [ ] Pauses Vercel deployment (calls `pause-client.mjs`)
- [ ] Logs offboarding date in Notion client page

**Status:** 🔲 Not built — Phase 1/2 — worth building before first cancellation

---

## 8. Deployment Notifications

**Trigger:** Every Vercel deployment (code push → auto-deploy)  
**Goal:** Know when a client site deploys successfully (or fails)

### Vercel already does this
- Vercel sends email on deploy success/fail by default
- For a better experience: set up a Slack or Discord webhook in Vercel project settings

**Status:** ✅ Built-in — just configure notification preferences in Vercel dashboard

---

## 9. Google Search Console Alerts

**Trigger:** Site coverage errors, manual penalty, significant traffic drop  
**Goal:** Catch SEO issues before client notices

### Tool: Google Search Console (free)
- Add Boyd's email as owner on every client property
- Enable email notifications for: coverage errors, security issues
- Monthly: check each client's GSC dashboard (add to monthly care routine)

**Status:** 🔲 Set up per client at launch — manual but 2 min per client

---

## 10. Client Satisfaction Check-in

**Trigger:** 30 days after launch, then quarterly  
**Goal:** Catch unhappy clients before they churn silently

### Automation: Simple email via Resend
```
Subject: How's everything going with your site, [Name]?

Hey [Name], it's been [30 days / 3 months] since we launched your site.
How's it feeling? Any questions, changes you'd like, or anything you'd like 
us to focus on this month?

— Boyd
```

**Script: `scripts/checkin-email.mjs --slug "phoenix-stoneworks" --type "30day"`**

Alternatively: set up a recurring Notion reminder + send manually (good enough for Phase 1)

**Status:** 🔲 Manual for now, script it in Phase 2

---

## Automation Stack Summary

| Tool | What it automates | Cost |
|------|------------------|------|
| Wave | Recurring invoices, payment reminders | Free |
| UptimeRobot | Site uptime monitoring, downtime alerts | Free |
| Vercel (built-in) | Deploy notifications | Free |
| Notion API | Lead → CRM auto-entry from chatbot | Free API |
| GA4 Data API | Monthly report data pull | Free |
| Resend | Automated client emails (reminders, reports, offboarding) | Free tier |
| Twilio | Overdue payment SMS alert to Boyd | ~$0.01/SMS |
| GitHub API | Provision new client repos from template | Free |
| Vercel API | Pause/unpause client deployments | Free |
| Puppeteer (installed) | Report PDF generation | Free |
| n8n (self-hosted) | Workflow glue if needed | Free self-hosted |

---

## Build Priority

| Priority | Script / Feature | When |
|----------|-----------------|------|
| 🔴 Now | UptimeRobot — set up for rubyxqube.com + each client at launch | Immediate |
| 🔴 Now | Wave recurring invoices — set up per retainer client | At client launch |
| 🟡 Soon | `provision-client.mjs` — GitHub + Vercel via API | Before 3rd client |
| 🟡 Soon | Chatbot lead → Notion CRM (Notion API in `api/chat.js`) | Next sprint |
| 🟡 Soon | `offboard-client.mjs` — before first cancellation | Phase 1 |
| 🟢 Phase 2 | `generate-report.mjs` — GA4 pull + PDF + email | 5+ clients |
| 🟢 Phase 2 | Non-payment escalation scripts (day 30/45/60) | 5+ clients |
| 🔵 Phase 3 | Full cron-based monthly reporting for all clients | 10+ clients |
