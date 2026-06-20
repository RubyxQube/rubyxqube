# UX Principles — Phoenix Stoneworks (and RubyxQube Client Sites)

> **Who this is for:** Boyd (developer) and any agent building pages, features, or tools for
> Phoenix Stoneworks or future RubyxQube clients. These rules override "standard" UX conventions
> when there is a conflict.

---

## The Core Rule

**Design for a 5th-grade reading level. One button at a time. Always forward.**

Our visitors are homeowners with a kitchen project in mind — not designers, not tech users.
They are on a phone, probably distracted, and have ten tabs open.
If they have to think, they leave.

---

## The "Doomscroll" Standard

Every page and every tool should feel like a feed — the user scrolls down and the next thing
they need is already there. No menus to hunt, no tabs to switch, no forms to fill before they
see value.

**Rules:**
- One primary action visible at a time — one button, one input, one next step
- The next step appears *after* the current step completes — not before
- Progress is always visible (step indicators, loading states, results that appear inline)
- Never send the user to a new page mid-flow — keep everything on one screen/scroll
- Mobile thumb reach is the design constraint — primary buttons live at the bottom of the viewport

---

## Writing Level

All public-facing copy (buttons, labels, instructions, chatbot responses, results) must pass
this test: **would a 10-year-old understand this without asking for help?**

| Instead of... | Write... |
|---------------|----------|
| "Upload an image of your countertop surface area" | "Take a photo of your kitchen" |
| "Submit for AI-powered estimation" | "Get my estimate" |
| "Your project parameters have been recorded" | "Got it! Here's your quote." |
| "Proceed to the next configuration step" | "Next →" |
| "Generate AI visualization" | "Show me what it could look like" |

---

## One-Button Flow Design

Every tool (calculator, estimator, photo upload) must be reducible to a single primary CTA
at each step. Secondary options are allowed but must be visually subordinate.

**Step structure for any multi-step tool:**
1. Show ONE question or ONE input
2. Show ONE button to continue
3. Reveal the next step inline (scroll down, don't navigate away)
4. Repeat until result
5. Result is the hero — big, visual, shareable

**What "one button" means in practice:**
- The calculator wizard: one question per screen, big tap targets, no visible step count until they're in it
- The photo estimator: "Take a photo → Get analysis → See the transformation" — three taps total
- The chatbot: never ask for name + phone + project type in one message

---

## Mobile-First Is Not Negotiable

- Design starts at 390px width (iPhone 14 size)
- Buttons minimum 48px tall, full-width on mobile preferred for primary CTAs
- No horizontal scrolling — ever
- Image uploads use the native camera roll / camera app (no drag-and-drop on mobile)
- Results display as a vertical stack, not a side-by-side grid, on mobile

---

## AI Features — "Magic Button" Standard

AI-powered features (photo estimate, image generation, chatbot) must feel like magic, not
like a technical tool.

- The button copy should describe the outcome, not the technology:
  - "Show me what it could look like" (not "Generate AI visualization")
  - "Get my estimate" (not "Submit photo for AI analysis")
- Loading states must be encouraging: "Analyzing your kitchen…", "Creating your preview…"
- Results are shown inline, immediately below the button — no page reload, no new tab
- Always include a soft disclaimer below AI-generated images:
  *"AI preview — actual results may vary. Contact us for an exact quote."*
- Offer a clear next CTA right after the result: "Get a real quote →" or "Call Manny →"

---

## Applying These Rules

When building any new page, section, or feature, ask:

1. **Can a 10-year-old read every label and button without help?**
2. **Is there more than one primary button visible at once?** (If yes, simplify.)
3. **Does the user have to navigate away mid-flow?** (If yes, restructure.)
4. **Does it work thumb-first on a 390px phone?** (If no, fix it.)
5. **Does every AI feature have a magic-sounding button and an inline result?**

If any answer is "no" or "maybe," fix it before shipping.
