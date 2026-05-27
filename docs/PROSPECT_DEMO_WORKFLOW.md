# Prospect Demo Workflow

> How RubyxQube builds personalized demo sites for cold prospects.
> This is the sales pitch. Show don't tell.

---

## The Strategy

Every competitor shows up to a sales call and says "we build great websites."
You show up with *their* website already built.

That's a different conversation. The prospect goes from "convince me" to "how much?"

The chatbot makes it even stronger. You're not just showing them a better site —
you're showing them a working AI receptionist that already knows their business.
That's the Autopilot plan experienced before they buy it.

---

## The Full Flow

```
Boyd: "Target: Mountain West Plumbing, Boise ID"
              ↓
  [prospect-researcher]
  Scrapes: their site, Google Business Profile, Yelp, Facebook
  Produces: full business profile, content, aesthetic recommendation, cold outreach angle
              ↓
  [builder]
  Runs /frontend-design with the recommended aesthetic
  Builds: hero + services + CTA + (optional) working chatbot
  Deploys: Vercel preview URL (free, instant, no custom domain needed)
              ↓
  Boyd reviews the demo (5 min)
              ↓
  Send cold outreach with the link
```

**No approval checkpoints.** Boyd is building for himself — decisions are instant.
Target time: **1.5–2 hours per prospect** from zero to deployed demo link.

---

## Step by Step

### Step 1 — Pick a target

Good targets:
- Local service businesses (plumbing, HVAC, roofing, landscaping, electrical, cleaning)
- Stone/countertop/tile installers (adjacent to Phoenix Stoneworks — you know the industry)
- Any business with 20+ Google reviews but a Wix/Squarespace/no-website presence
- Businesses spending money on Google Ads but sending traffic to a bad landing page

Avoid for now:
- Restaurants (different product, different sales cycle)
- Retail (same)
- Businesses that already have a solid custom site

---

### Step 2 — Run the prospect-researcher agent

```
Target: [Business name], [City, State]
```

The agent returns:
- Business profile (services, hours, contact, tone)
- Existing site assessment (honest score + what's broken)
- Ready-to-use demo content (headline, subheadline, CTA, chatbot greeting)
- Recommended aesthetic direction for `/frontend-design`
- Cold outreach opening line — specific to what it found

---

### Step 3 — Run the builder

Feed it the prospect-researcher's output. The builder:

1. Runs `/frontend-design` with the recommended aesthetic direction
2. Builds a single polished landing page:
   - **Hero** — their headline, subheadline, CTA button
   - **Services** — 3–6 services with short descriptions
   - **Trust signals** — years in business, review count, license (if found)
   - **Contact / CTA** — phone number prominent, simple contact form
   - **Chatbot** (optional but recommended) — pre-configured greeting, basic FAQ answers
3. Deploys to Vercel

**One page. One strong impression.**
Not 3 mediocre pages — one polished landing page that hits every selling point:
- Hero with their headline + primary CTA
- Services section (what they do, clearly explained)
- Trust signals (years in business, reviews, license if found)
- Testimonials (real review quotes from the researcher profile)
- Contact / CTA (phone prominent, simple form)
- Chatbot widget (bottom-right, pre-configured for their business)

**What to include:**
- Their actual business name, phone, location
- Services sourced from the researcher profile
- Real review quotes if found (in a testimonials section)
- Placeholder images that match the aesthetic (placehold.co or Unsplash search)

**What to note vs. fill in:**
- Mark any content gaps clearly as `[PLACEHOLDER — ask client]`
- Don't invent prices or claims you didn't find

---

### Step 4 — Boyd reviews (5 min)

Quick check before sending:
- Does it look significantly better than their current site?
- Is the chatbot responding correctly to basic questions?
- Is the demo URL shareable? (Vercel preview links are public by default)

If the chatbot is included, test it with:
- "What services do you offer?"
- "What are your hours?"
- "How do I get a quote?"

---

### Step 5 — Send the cold outreach

**Email subject options:**
- "I built something for [Business Name]"
- "Your website, rebuilt" 
- "[Business Name] — quick question"

**Email body (use the researcher's cold outreach angle):**

```
Hi [Owner name or "there"],

I noticed [specific pain point the researcher found — e.g., "your Google listing 
has 52 reviews but your website doesn't show a single one"].

I'm Boyd, I run RubyxQube — we build websites for service businesses in the 
Treasure Valley. I spent a couple hours building what I think your site could 
look like:

[demo URL]

No obligation. If you like the direction, I'd love to talk. If not, it's yours 
to keep as inspiration.

— Boyd
boyd@rubyxqube.com
(208) 970-8624
```

**Why this works:**
- You led with something specific (not generic flattery)
- You showed capability without claiming it
- Low pressure — "no obligation" removes the sales threat
- The demo link does the selling for you

---

## The Chatbot Upgrade

If you include a working chatbot on the demo, mention it explicitly:

> "There's also an AI receptionist in the bottom-right corner — it's already 
> trained on your services. That's included in our Autopilot plan."

This turns the demo into a live product experience, not just a mockup.

---

## Economics

| Item | Time | Cost |
|------|------|------|
| prospect-researcher run | ~10 min | $0 |
| builder run + /frontend-design | ~45–90 min | ~$0.10 in API costs |
| Vercel deploy (preview URL) | ~2 min | $0 |
| **Total per prospect** | **~1.5–2 hrs** | **~$0.10** |

At a $1,500 minimum engagement, you need 1 in 15 cold demos to convert to break even on time.
Realistically, a personalized demo with a working chatbot converts much better than that.

---

## Scaling This

Once the workflow is smooth, you can batch prospects:

**Weekly rhythm:**
- Monday: pick 3–5 targets, run prospect-researcher on all of them
- Tuesday–Wednesday: builder builds demos, deploy all
- Thursday: send cold outreach emails
- Friday: follow up on any responses

With the factory running, 3–5 demos per week is achievable.

---

## What to Copy to Client Projects

When a prospect converts to a paying client:
1. The demo becomes the foundation — not thrown away
2. Run the full 5-agent factory for the real build (with approval checkpoints)
3. The prospect-researcher profile becomes the story-writer's input
4. You're not starting from zero — you're refining what they already said yes to

---

## Demo Hosting

- **Demo files:** `prospects/[slug]/demo/` in the rubyxqube repo
- **Deploy:** `vercel deploy --cwd prospects/[slug]/demo/` → free preview URL, no custom domain needed
- **After signing:** Move to their own GitHub repo + Vercel project with custom domain
- **If they don't convert:** Archive the folder. Vercel preview expires automatically. No ongoing cost.

---

## Notion Pipeline Setup (one-time)

The prospect-researcher saves automatically to Notion once this is configured.

**To set up:**
1. In Notion, create a page called **"Sales Pipeline"** in the sidebar
2. Copy the page ID from the URL (last 32 chars after the last `-`)
3. Run:
   ```bash
   node --env-file=.env.local scripts/create-prospects-db.js PAGE_ID_HERE
   ```
4. Add the returned database ID to `.env.local`:
   ```
   NOTION_PROSPECTS_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

After that, every `prospect-researcher` run saves the profile to Notion automatically.
