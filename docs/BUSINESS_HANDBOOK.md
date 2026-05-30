# RubyxQube Business Handbook

Dos and Don'ts for running the business well. This covers clients, pricing, scope, and operations.

---

## Pricing

**Do:**
- Quote the right package for the client's actual situation, not the most expensive one
- Be direct with pricing on the call - don't bury the number
- Offer Launch if Autopilot is genuinely too much for them
- Charge the $75 domain setup fee - it's real work, don't give it away
- Split payment 50% upfront, 50% at launch on every project

**Don't:**
- Discount packages to close a deal - offer a lower package instead
- Quote Custom projects without a scoping conversation first
- Start work before the deposit clears
- Take on rush jobs without a rush fee

---

## Scope

**Do:**
- Define what's included in writing before starting - a simple bullet list in an email is enough
- Treat anything outside the original scope as a billable change request
- Cap revision rounds at 2 for Launch (it's in the package)
- Get content from the client before starting - photos, copy, services list

**Don't:**
- Let "one small change" requests pile up without tracking them
- Add features mid-project without adjusting the price
- Start building without a signed agreement and deposit
- Promise a timeline you can't hit

---

## Client Communication

**Do:**
- Respond within 4 business hours during the project
- Send a weekly update while a project is active - even if it's just "on track, launching Friday"
- Be honest when something is delayed - early bad news beats late bad news
- Keep a record of every major decision made via email or text

**Don't:**
- Disappear mid-project - nothing kills trust faster
- Let a client ghost you without a follow-up after 3 days
- Make verbal promises you haven't confirmed in writing
- Take on more clients than you can communicate with properly

---

## Red Flag Clients - Walk Away

- "I need it done in 3 days" with no rush fee discussion
- "Can you match this price?" (comparing to a $500 overseas quote)
- "I'll know what I want when I see it" with no existing brand/content
- Changes the brief after work has started - repeatedly
- Wants to pay the full balance after launch only
- Asks to own all source code and design files before paying

---

## Domains and Hosting

**Do:**
- Have clients buy their own domain through Cloudflare Registrar (~$10/yr for .com)
- Walk them through it if needed - charge the $75 setup fee for DNS/connection work
- Host all client sites on Vercel - free tier handles everything at this scale
- Use a new Anthropic API key per client chatbot so you can revoke individually

**Don't:**
- Buy domains on behalf of clients and hold them - creates dependency and conflict
- Host multiple clients under one Vercel account personal project (use separate projects)
- Share your own ANTHROPIC_API_KEY with client sites

---

## What to Take On

**Good fits:**
- Local service businesses with outdated or no website
- Business owners who understand they're leaving money on the table
- Anyone who asks about the AI chatbot unprompted - they already get the value
- Referrals from existing clients - close rate is much higher

**Proceed carefully:**
- Clients who want heavy custom features in the first project - scope it tightly
- Multi-location businesses - more complex, price accordingly
- Anyone who wants e-commerce - different product, different expertise needed
- Clients with no content ready and no willingness to provide it

**Avoid for now:**
- Restaurants and retail (different sales cycle, different product)
- Clients who need ongoing ad management (Google Ads, Meta) - not in scope yet
- Anyone asking for a membership site or gated content

---

## Custom Projects

**Do:**
- Treat every Custom inquiry as a scoping conversation first
- Ask: what does it need to do, who uses it, what's the timeline, what's the budget
- Quote a flat project fee, not hourly - easier for client, better for you
- Build a simple spec doc before quoting so both sides agree on what's being built

**Don't:**
- Quote a number on the first call without understanding the full ask
- Start Custom work without a more detailed agreement than the standard packages
- Underestimate timeline on features you haven't built before - add 50%

---

## Sales

**Do:**
- Lead with one package recommendation, not all three
- Use the demo as the opener - it does more than any pitch can
- Follow up once after no response, then move on
- Ask for referrals after a successful launch

**Don't:**
- Send more than 2 cold outreach touchpoints to the same prospect
- Use em-dashes in outreach emails or templates - it reads as AI-generated
- Negotiate on price without adjusting scope
- Promise features you haven't built before without a buffer in the timeline

---

## After Launch

**Do:**
- Send a "you're live" message with the URL and a summary of what was built
- Check in at 30 days to see how the site is performing
- Ask for a Google review after the 30-day check-in if things are going well
- Offer Autopilot/Momentum to Launch clients at the 30-day check-in if they aren't on it yet

**Don't:**
- Disappear after launch - the relationship is the product
- Wait for the client to ask about performance - send the monthly report proactively
- Let Momentum clients go more than 5 days without a response on an edit request

---

## Operations

**Do:**
- Keep all project files in a consistent folder structure
- Archive prospect demos in `prospects/[slug]/` win or lose
- Log client projects in a simple spreadsheet - name, package, launch date, monthly status
- Test every chatbot with 10 conversations before handing it to a client

**Don't:**
- Mix client API keys or environment variables
- Deploy changes to a live client site without testing locally first
- Use the same Vercel project for multiple clients
