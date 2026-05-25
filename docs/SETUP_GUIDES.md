# RubyxQube — Tool Setup Guides

> Step-by-step for every tool that needs configuring before first client.

---

## 1. Google Workspace — boyd@rubyxqube.com

**Time:** ~10 min | **Cost:** $6/mo

1. Go to [workspace.google.com](https://workspace.google.com) → **Get started**
2. Enter business name: `RubyxQube LLC`
3. Number of employees: **Just me**
4. Country: **United States**
5. Your current email (for recovery): `boydquerubin@gmail.com`
6. Domain: **Use a domain I already own** → enter `rubyxqube.com`
7. Create your Google Workspace email: `boyd@rubyxqube.com`
8. Choose plan: **Business Starter** ($6/mo)
9. Add payment method
10. Verify domain ownership — Google will give you a TXT record to add in your domain DNS settings (Vercel dashboard → rubyxqube.com → DNS Records → add the TXT record Google provides)
11. DNS propagates in 5–30 min, then Google activates the email

**After setup:**
- Sign into Gmail with boyd@rubyxqube.com
- Set up email signature: Boyd Querubin | RubyxQube™ | rubyxqube.com | (208) [your number]
- Forward from `boydquerubin@gmail.com` temporarily if you want one inbox (optional — boyd@rubyxqube.com is now primary)

---

## 2. Wave — Invoicing + Bookkeeping

**Time:** ~20 min | **Cost:** Free

1. Go to [waveapps.com](https://www.waveapps.com) → **Sign up free**
2. Use `boyd@rubyxqube.com` (set this up first)
3. Business name: `RubyxQube LLC`
4. Business type: **Freelance / Self-employed**
5. Connect bank account (for bookkeeping — optional but recommended)

**Invoice template setup:**
- Go to **Sales → Invoice Settings**
- Logo: upload `public/brand/logo-horizontal-clean.png`
- Business info: RubyxQube LLC, Boise, Idaho, boyd@rubyxqube.com
- Payment terms: **Due on receipt** (or Net 7)
- Late fee: enable 1.5%/month after 30 days
- Thank you note: *"Thank you for choosing RubyxQube. We're excited to build something great for your business."*

**Create your 3 invoice templates:**

| Template | Amount | Type |
|----------|--------|------|
| Launch Deposit | $1,250 | 50% of $2,500 |
| Launch Final | $1,250 | 50% of $2,500 |
| Autopilot Monthly | $399 | Recurring |
| Momentum Monthly | $699 | Recurring |

**Recurring invoice setup (do for each retainer client at launch):**
- Sales → Recurring Invoices → Create
- Set to: monthly, 1st of month, auto-send ON
- Add payment reminders: 7 days after due, 14 days after due

---

## 3. Notion — CRM + Client Pages

**Time:** ~30 min | **Cost:** Free

1. Go to [notion.so](https://www.notion.so) → **Sign up** with `boyd@rubyxqube.com`
2. Create a new workspace: `RubyxQube`

### Build the CRM Board
- New page → **Board** database
- Name it: `Client Pipeline`
- Columns (drag to reorder):
  1. 🔍 **Prospect** — identified, not yet contacted
  2. 📧 **Contacted** — outreach sent
  3. 📅 **Audit Scheduled** — call booked
  4. 📄 **Proposal Sent** — waiting on decision
  5. 🤝 **Active Build** — contract signed, building
  6. 🚀 **Launched** — live, on retainer
  7. 🔄 **Monthly Care** — active retainer client
  8. ✅ **Closed/Won** — one-time project done, no retainer
  9. ❌ **Lost** — went elsewhere or unresponsive

### CRM Card Properties (add these to every card)
- **Name** (title) — Business name
- **Owner** (text) — Client's name
- **Email** (email)
- **Phone** (phone)
- **Package** (select) — Launch / Autopilot / Momentum
- **Setup Fee** (number)
- **MRR** (number) — monthly recurring
- **Source** (select) — Warm Network / Cold Outreach / Referral / Inbound / Facebook / Other
- **Domain** (URL)
- **GitHub Repo** (URL)
- **Vercel Project** (URL)
- **GA4 Property ID** (text)
- **Next Action** (text)
- **Next Action Date** (date)
- **Notes** (text)

### Client Page Template
Create a template page inside the CRM database:

```
# [Business Name]

**Owner:** [Name] | [Phone] | [Email]
**Package:** [Launch / Autopilot / Momentum]
**Setup Fee:** $[amount] | **MRR:** $[amount]/mo
**Status:** [stage]

---

## Links
- Domain: [URL]
- GitHub: [URL]
- Vercel: [URL]
- GA4: [property ID]
- 1Password: [vault name]
- Google Drive: [folder link]

---

## Timeline
- Contract signed: [date]
- Kickoff call: [date]
- Build start: [date]
- Preview shared: [date]
- Launch: [date]

---

## Notes
[Kickoff call notes, client preferences, anything important]

---

## Monthly Reports
| Month | Sessions | Leads | Notes |
|-------|----------|-------|-------|
| | | | |

---

## Change Log
| Date | Change | Time Spent |
|------|--------|------------|
| | | |
```

---

## 4. Calendly — Free Audit Call Booking

**Time:** ~10 min | **Cost:** Free

1. Go to [calendly.com](https://calendly.com) → **Sign up** with `boyd@rubyxqube.com`
2. Connect your Google Calendar (availability syncs automatically)
3. Create event: **Free Website Audit**
   - Duration: **15 minutes**
   - Description: *"I'll take a look at your current website (or online presence) and share 3–5 specific things I'd improve — no pitch, just honest feedback."*
   - Location: **Google Meet** (auto-generated link)
   - Availability: set your preferred hours (e.g., Mon–Fri, 9am–5pm)
   - Buffer time: 10 min after each event (prevents back-to-back)
4. Copy your booking link: `calendly.com/boyd-rubyxqube/audit`
5. Add this link everywhere:
   - rubyxqube.com `/audit` page CTA button
   - Email signature
   - Cold outreach emails
   - Facebook group bio

---

## 5. 1Password — Credential Management

**Time:** ~10 min | **Cost:** ~$3/mo (Individual plan)**

1. Go to [1password.com](https://1password.com) → **Try free** (14-day trial, then $3/mo)
2. Create account with `boyd@rubyxqube.com`
3. Download the desktop app + browser extension

### Vault Structure
Create one vault per client + one for RubyxQube itself:

```
📁 RubyxQube (Personal)
   - Vercel account
   - GitHub account
   - Anthropic API keys (master list)
   - Twilio account
   - Resend account
   - Google Workspace
   - Wave account
   - Domain registrar (Vercel)

📁 Phoenix Stoneworks
   - Vercel project API keys
   - ANTHROPIC_API_KEY (their key)
   - Domain registrar login (if we manage)
   - GA4 property access
   - Any client logins

📁 [Next Client]
   - Same structure
```

### What to store immediately
- Every API key the moment you create it
- Every client login you're given access to
- All env var values for every Vercel project

**Never store credentials in:** Notion, Google Docs, Slack, email, or your browser's built-in password manager.

---

## 6. UptimeRobot — Site Monitoring

**Time:** ~5 min | **Cost:** Free

1. Go to [uptimerobot.com](https://uptimerobot.com) → **Sign up free**
2. Use `boyd@rubyxqube.com`
3. Add monitor:
   - Type: **HTTP(s)**
   - Friendly name: `RubyxQube`
   - URL: `https://rubyxqube.com`
   - Monitoring interval: **5 minutes**
4. Add alert contacts: your phone number + `boyd@rubyxqube.com`
5. Add a new monitor for every client site at launch (same process)

Free tier: 50 monitors, 5-min checks, SMS + email alerts. More than enough for Phase 1.

---

## Setup Order (Recommended)

Do these in order — each one unlocks the next:

1. ✅ **Google Workspace** — get `boyd@rubyxqube.com` first. Use it for everything else.
2. ✅ **Wave** — needs your business email. Set up invoice templates.
3. ✅ **1Password** — store every credential as you create it going forward.
4. ✅ **Notion** — build CRM board. Add Phoenix Stoneworks as first card.
5. ✅ **Calendly** — add link to site and outreach emails.
6. ✅ **UptimeRobot** — add rubyxqube.com monitor.
