# Website Design — Workflow

---

## Step 0 — Establish Aesthetic Direction (new site origination only)

Before writing any production code for a **new site or major component**, run:

```
/frontend-design
[Describe the business, audience, and any constraints]
```

Claude will commit to a bold aesthetic direction — typography, color, motion, composition —
before touching a single line of code. This kills "AI slop" defaults (Inter font, purple gradients,
generic startup layouts) and produces something genuinely memorable.

**When to use Step 0:**
- Originating a new client site from scratch
- Building a new hero, landing section, or major page for the first time
- Creating a proposal mockup to show a prospect 2–3 style directions

**When to skip Step 0:**
- Recreating a reference screenshot exactly (go straight to Step 1 — match the reference, don't improve it)
- Editing or iterating on an existing component
- Bug fixes or content updates

---

## Steps 1–6 — Screenshot → Compare → Pixel-Perfect Loop (recreation workflow)

When Boyd provides a reference image (screenshot) and optionally some CSS classes or style notes:

1. **Generate** a single `index.html` file using Tailwind CSS (via CDN). Include all content inline — no external files unless requested.
2. **Screenshot** the rendered page using Puppeteer (`npx puppeteer screenshot index.html --fullpage` or equivalent). If the page has distinct sections, capture those individually too.
3. **Compare** your screenshot against the reference image. Check for mismatches in:
   - Spacing and padding (measure in px)
   - Font sizes, weights, and line heights
   - Colors (exact hex values)
   - Alignment and positioning
   - Border radii, shadows, and effects
   - Responsive behavior
   - Image/icon sizing and placement
4. **Fix** every mismatch found. Edit the HTML/Tailwind code.
5. **Re-screenshot** and compare again.
6. **Repeat** steps 3–5 until the result is within ~2–3px of the reference everywhere.

Do NOT stop after one pass. Always do at least 2 comparison rounds. Only stop when Boyd says so or when no visible differences remain.
