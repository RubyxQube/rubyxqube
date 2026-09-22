# Competitive landscape: QuoteIQ, Jobber, and where the PSW tool actually sits

Researched 2026-09-22, after Manny raised QuoteIQ in the 2026-09-21 meeting and
again by text that evening. Everything here is from public pricing pages and
third-party reviews; nobody has been inside either product. Jacob uses QuoteIQ
and offered Boyd access to his account, which would beat all of this.

This exists to answer one question before a pitch gets designed: **is there a
gap worth selling into, and what can it be priced at.**

---

## The short version

1. **Manny's instinct is right, and not for the reason he gave.** The real gap
   is not AI philosophy. It is that neither product tells a homeowner what
   stage their job is at, and that is the single feature every contractor he
   spoke to described back to him unprompted.
2. **QuoteIQ is not a competitor for PSW-shaped work.** It is built for
   exterior and maintenance trades, and explicitly weak where work is a
   multi-stage project rather than a recurring visit.
3. **The 3D visualiser is not the moat we have been assuming.** Four products
   already ship one. That assumption needs revising before it goes in a pitch.
4. **The price Manny floated is above both incumbents.** That is survivable but
   it has to be argued, not assumed.

---

## What they cost

**QuoteIQ**, five tiers, February 2026 pricing, no per-seat fees:

| Tier | Monthly | Users | AI credits |
|---|---|---|---|
| Essentials | $29.99 | 1 | 500 |
| Beginner | $74.99 | 2 | |
| Pro | $149.99 | 4 | |
| Elite | $299 | 10 | |
| Max | $699 | unlimited | 8,000 |

14-day trial, annual billing saves two months. Note the Max tier went from
$399.99 to $699 in mid-2026, a 75% rise, and Elite from $249.99 to $299. A
price-lock guarantee is part of the sales pitch, which tells you they expect to
be compared on price.

**Jobber**, four tiers:

| Tier | Monthly | Users |
|---|---|---|
| Core | $49 ($29 annual) | 1 |
| Connect | $139 solo / $199 | 5 |
| Grow | $199 solo / $399 | 10 |
| Plus | $699 | 15 |

Plus card processing at roughly 2.9% + $0.30, per-user charges above the seat
count, and paid add-ons. The AI Receptionist is an add-on with reported prices
between $29 and $99 a month, free on Plus. Jobber Copilot, an advisory
assistant rather than an agent, is included everywhere.

**For scale, what Manny already pays.** Moraware is about $100/user/month, and
a twelve-employee shop typically runs $700 to $1,400 a month all in. Manny said
he pays about $60, so he is on a minimal seat count and is not a representative
customer for that number.

---

## What Manny's line gets right

> We are using AI to enhance and showcase our work, they are using it to DO
> the work.

He is describing something real. QuoteIQ ships an **AI Estimate Generator**
that turns a photo and a description into a priced quote, and a **Before/After
AI** that generates preview imagery of work that has not happened. Those are
both the machine producing the deliverable.

It is worth noticing how precisely that matches what this codebase has already
refused to do. The photo estimator was killed for guessing. Blueprint
measurement is offered as a ballpark with on-site templating as the real
answer. Measure came off photos on 2026-09-21. Tripo output is banned from
anything near a cut list. Manny has independently named a principle the
software was already built on, which is the most defensible kind of positioning
there is: it describes something true rather than something aspirational.

**The catch.** It is a principle, not a feature, and a principle does not
survive being contradicted. If Manny repeats Gemini's claim that the site
already reads blueprints accurately, he is claiming the AI does the work, in
the same conversation. He cannot lead with both. This is the strongest
practical reason to correct that claim before he presents to anyone.

---

## Where the actual gap is

The clearest finding in the research, from a review of Jobber's Client Hub:

> Jobber's Client Hub does not advertise stage-by-stage job status tracking. It
> describes appointments, quotes, invoices and payments, so a client can see
> that work is booked for Thursday, but there is no advertised view telling
> them the part arrived Tuesday and the unit is on the bench now.

That is the PSW status board, described as a hole in the market leader.
Pending, Template, Fabrication, Install, green when confirmed, amber when in
flight, and a public lookup that needs no account.

Jobber's Client Hub does quotes, approvals, appointments, invoices and tips.
QuoteIQ shipped a "Client Portal" described as customer-facing project
visibility in May 2026, four months old, and its self-service features are
booking and instant quoting rather than progress.

**So the thing to sell is not "a portal".** Both have a portal. It is *"your
customer can see what stage their job is at without phoning you"*, which is
exactly what Nick and Jacob described back to Manny before he told them about
it. That is a bought signal, not a guess.

---

## The assumption that needs revising

The repositioning has been resting on interactive 3D being something
competitors cannot ship. That is not true any more:

- **Houzz Pro** bundles a CRM with a 3D floor plan builder, a product library
  linked to real materials, phone scans into virtual models, photorealistic
  renders, and on-site AR tours.
- **Hyphen HomeSight** does real-time selection visualisation for homebuilders.
- **Dwellito** sells a 3D configurator on the claim that customers close 34%
  more when they can visualise it.
- **Renoworks** does interior design visualisation for contractors.

None of them is aimed at a two-man countertop shop, and none combines
visualisation with trade-specific quoting, shop workflow and customer status
tracking at a small-contractor price. But "competitors cannot copy this" is no
longer the honest sentence. **"Nobody has put these four things in one product
at this price"** is, and it is still a good sentence.

---

## What this means for price

Manny floated $500 a month for the package. Set against the market:

- QuoteIQ Pro, four users, every AI feature: **$149.99**
- Jobber Grow, ten users: **$399**
- QuoteIQ Max, unlimited users: **$699**

A contractor under $500k a year comparing feature lists will find QuoteIQ
cheaper and broader. That is not fatal, because the offer is not the same
thing: a bespoke site, the visualiser, the quoting tool built for their trade,
and a person who answers. But it does mean **the pitch cannot be
features-per-dollar**, and anyone selling it needs to know that before a
prospect puts the two side by side.

Two shapes worth modelling, and Manny reached for the second himself:

1. **Flat monthly**, in Autopilot and Momentum's existing shape. Simple,
   directly comparable, and comparison is the losing ground.
2. **Build fee plus a management retainer.** The build fee prices the work
   nobody else does, the retainer prices the hosting and the answering, and the
   monthly number stops being the headline. Manny: "you pay whatever it is for
   the development, and then it's a fixed price per month."

---

## What is still unknown

- **Inside QuoteIQ.** Jacob offered access. One hour in his account beats
  everything above, particularly on how good the AI estimate actually is.
- **Whether the status board matters to a customer who is not a contractor.**
  Every enthusiastic reaction so far has come from a contractor imagining their
  own customers. That is not the same as a homeowner asking for it.
- **Whether any of those contractors would pay.** Nick, Jacob and Manny's dad
  have described the need. Nobody has been quoted a number.
- **Who owns the software.** Unresolved, and it gates all of this.
  `docs/SERVICE_AGREEMENT_TEMPLATE.md` in this repo is the first place to look,
  alongside whatever Manny actually signed.

---

Related: `BUSINESS_MODEL.md`, `MARKETING-PACKAGES.md`,
`SERVICE_AGREEMENT_TEMPLATE.md`, and
`clients/phoenix-stoneworks/docs/MEETINGS.md` for the meeting this came from.
