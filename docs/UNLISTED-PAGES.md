# Unlisted pages

Pages that exist on rubyxqube.com but are not in the navigation. They are real,
they are live, and nothing on the site links to them.

**Why this file exists.** Boyd's question, 2026-08-25: *"what if I forget that
this page ever existed."* That is the actual risk with an unlisted page, and it
has two halves:

1. **You forget it exists** and stop using a thing you paid for in build time.
2. **The code forgets it exists.** Nothing links to it, so nothing exercises it.
   A refactor breaks it and no one finds out, because the only person who would
   have noticed is a prospect who quietly gave up.

The first is solved by putting the link in the document you open when you are
doing the job, not in a list like this one. The second is solved by a test.
Both are done, and are listed against each page below.

---

## /project-brief

**What it is.** The intake form you send a prospect after a discovery call.
Twenty minutes, saves to their browser as they type, and on submit it emails
you (reply-to set to them), emails them a copy of their own answers, and writes
a row to `leads` with source `project_brief`.

**Send it before the agreement, not after.** It qualifies as much as it
collects: someone who returns it inside a week is a good client. See
`MARKETING-PACKAGES.md`.

| | |
|---|---|
| Page | `src/pages/ProjectBrief.jsx` |
| Endpoint | `api/project-brief.js` |
| Old URL | `/homework`, 308 redirect in `vercel.json` |
| Linked from | `SOP.md` section 5, `DISCOVERY_CALL_GUIDE.md` next-step and follow-up email |
| Covered by | `npm run smoke` |

**Needs on Vercel:** `RESEND_API_KEY`, `ALERT_EMAIL`, `FROM_EMAIL`,
`SUPABASE_URL`, `SUPABASE_SERVICE_KEY`. `NTFY_TOPIC` optional. A submission
where email fails still writes the Supabase row, so a lead is not lost by a
mail problem alone.

---

## Others worth knowing about

These are not in the nav either. Listed so the inventory is complete rather
than because each needs action.

| Route | What it is |
|---|---|
| `/report` | Sample monthly report, shown to prospects to demo the deliverable |
| `/designs` | Two-step style picker, submits to `api/designs-lead.js` |
| `/audit` | Free website audit request |
| `/sign/:token` | Contract signing, tokenised per client |
| `/payment-success` | Stripe return URL, only reached after checkout |
| `/work/phoenix-stoneworks` | Case study. In the portfolio, not the nav |

---

## Before adding another unlisted page

Answer these two, or it will be forgotten the same way:

1. **Which document do you open when you would send this?** Put the URL in that
   document. Not in a bookmarks folder, not in this file, in the doc that
   describes doing the job.
2. **What breaks silently if it stops working?** If the answer is "a lead", it
   belongs in `npm run smoke`.
