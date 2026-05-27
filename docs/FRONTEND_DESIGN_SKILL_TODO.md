# 🔴 PRIORITY TASK — Frontend Design Skill

> **Do this first thing next session.**

---

## What This Is

Anthropic's official Claude Code skill at:
`github.com/anthropics/claude-code` → `plugins/frontend-design/skills/frontend-design/SKILL.md`

It forces Claude to **commit to a bold aesthetic direction before writing a single line of code.**

Instead of defaulting to Inter + purple gradients + generic startup layout ("AI slop"), you pick
a direction and Claude executes it with full intentionality:

- `brutalist / raw`
- `editorial / magazine`
- `luxury / refined`
- `retro-futurist`
- `maximalist chaos`
- `playful / toy-like`
- `art deco / geometric`
- `industrial / utilitarian`
- `soft / pastel`
- …or any creative direction you describe

### What it specifically enforces
- **Typography**: Distinctive, characterful fonts. NEVER Inter, Roboto, Arial, or Space Grotesk.
- **Color**: Commit to a cohesive palette with dominant colors + sharp accents. No timid evenly-distributed palettes.
- **Motion**: CSS animations, scroll-triggering, staggered reveals. One well-orchestrated entrance > scattered micro-interactions.
- **Composition**: Asymmetry, overlap, diagonal flow, grid-breaking. Unexpected layouts.
- **Backgrounds**: Gradient meshes, noise textures, geometric patterns, layered transparencies, grain overlays.
- **Differentiation**: Ask "What's the ONE thing someone will remember about this?"

---

## Why This Matters for RubyxQube

**This IS the product we sell.**

We charge $1,500–$3,500+ per site build. The reason clients pick a boutique agency over
Wix/Squarespace is **distinctive design quality that looks intentional and human.**

Without this skill, every AI-assisted design risks converging on the same generic defaults.
With it, every new site starts with a locked aesthetic direction that makes it genuinely memorable.

**Immediate applications:**
1. **New client origination** (Phoenix Stoneworks and every future client) — run this as **Step 0**
   before the Puppeteer screenshot/compare loop. Lock the aesthetic, then build.
2. **RubyxQube /designs page** — the current flow shows palettes and styles. Add an aesthetic
   direction step: let the visitor describe a vibe and see a real mockup before submitting their info.
3. **Sales demos** — show prospects 2–3 style directions (e.g., editorial vs. luxury vs. industrial)
   as a differentiator during discovery calls. No other local agency does this.
4. **Content marketing** — build example sites in different aesthetics, post them, show the range.

---

## Install Command

The skill lives at:
```
github.com/anthropics/claude-code → plugins/frontend-design
```

Most likely install command (confirm exact syntax):
```bash
npx @anthropic-ai/claude-code skills add frontend-design
```

Or possibly:
```bash
npx skills add github.com/anthropics/claude-code/plugins/frontend-design
```

**Step 1 tomorrow: run `npx @anthropic-ai/claude-code skills --help` to see the correct `add` syntax,
then install it.**

Once installed, invoke it in any Claude Code session with `/frontend-design`.

---

## Steps to Implement Tomorrow

### Step 1 — Install
```bash
# Check available commands first
npx @anthropic-ai/claude-code skills --help

# Then install
npx @anthropic-ai/claude-code skills add frontend-design
```

### Step 2 — Test on a new Phoenix Stoneworks page
```
/frontend-design
Luxury stone countertop fabrication company landing page. Treasure Valley, ID.
Materials: quartz, granite, quartzite. High-end residential kitchens.
Make it feel like the countertops themselves — cool, heavy, timeless.
```

### Step 3 — Test on a RubyxQube component
```
/frontend-design
Dark tech agency hero section. Ruby red accent. Editorial direction.
The headline: "We build websites that make your phone ring."
One CTA button. Make it feel alive.
```

### Step 4 — Update workflow.md
Add to `.claude/rules/workflow.md` as **Step 0**:

> Before any new site origination, run `/frontend-design` to establish aesthetic direction.
> Lock the style before writing production code. The screenshot/compare loop (Steps 1–6) 
> comes AFTER the direction is committed.

### Step 5 — Evaluate /designs page integration (stretch)
The current `/designs` page flow: Style → Palette → Submit info
Proposed upgrade: Style → Palette → **Aesthetic direction prompt** → AI preview → Submit info
The AI preview could use this skill to generate a real mockup on the fly.

---

## Checklist

- [x] Find exact install command — `claude plugins install frontend-design`
- [x] Install the skill — installed user-scope, all sessions
- [x] Update `.claude/rules/workflow.md` — added as Step 0
- [ ] Test with Phoenix Stoneworks
- [ ] Test with RubyxQube component
- [ ] Evaluate `/designs` page integration
- [ ] Use on next client proposal as a sales differentiator demo
