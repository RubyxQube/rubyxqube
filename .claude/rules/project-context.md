# Project Context — RubyxQube Site

## What This Is
A React + Vite marketing website for RubyxQube — Boyd's web design and AI agency for small businesses in the Treasure Valley (Boise, ID area). The site showcases services, pricing, and portfolio while proving design quality.

## Mobile-First Is Non-Negotiable

**Every page, every component, every change must be mobile responsive.**

RubyxQube sells mobile-first websites as its core product. The site IS the demo. If it looks broken on mobile, the pitch is dead.

Rules:
- Design for mobile screen first, then expand to tablet (720px) and desktop (860px)
- Use `.grid.cols-2` and `.grid.cols-3` — these are already responsive via the CSS breakpoints
- Never use fixed pixel widths on containers — use `max-width` + `width: 100%`
- `padding` on `.section` and `.heroSection` already collapses on mobile — use those classes
- Test mentally: "Does this stack vertically on a 390px screen?"
- Inline grid styles must include `repeat(auto-fit, minmax(...))` or responsive column counts
- `flexWrap: "wrap"` on any `display: flex` row that contains multiple elements

## Tech Stack
- **Framework:** React 18 + React Router v6
- **Build tool:** Vite 5
- **Styling:** Custom CSS in `src/styles.css` — **no Tailwind** in this project
- **Icons:** Lucide React — standard on all projects. No emojis as UI icons. Use `color="var(--accent)"` for feature icons, `color="var(--muted)"` for utility icons (close, arrows). Size 24–26px for cards, 16px inline.
- **Font:** Plus Jakarta Sans (Google Fonts, loaded in `index.html`)
- **Assets:** Logos in `src/assets/`, favicon in `public/`

## Dev Commands
```bash
npm run dev      # Start dev server → http://localhost:5173
npm run build    # Build to dist/
npm run preview  # Preview production build
```

## Design Direction
**Dark, sleek, ruby red** — professional, modern, high-contrast for tech-forward service businesses.

### Dark theme (default — `:root`)

| Token | Value |
|-------|-------|
| `--bg` | `#080808` (near black) |
| `--text` | `rgba(255,255,255,0.90)` |
| `--muted` | `rgba(255,255,255,0.48)` |
| `--accent` | `#e11d48` (ruby red — primary CTA, badges, highlights) |
| `--accent-hover` | `#c0112f` |
| `--accent-dim` | `rgba(225,29,72,0.10)` |
| Font | Plus Jakarta Sans, weights 400–800 |

### Light theme (`[data-theme="light"]`)

| Token | Value |
|-------|-------|
| `--bg` | `#F5F0EA` (warm cream) |
| `--text` | `rgba(20,12,15,0.90)` — ~13:1 contrast ✓ |
| `--muted` | `rgba(20,12,15,0.65)` — ~5.2:1 contrast, WCAG AA ✓ |
| `--line` | `rgba(20,12,15,0.10)` |
| Accent | Same ruby red — works on both themes |

**Default theme is light.** Users who prefer dark can toggle; their choice persists in localStorage.

**Navbar and Footer stay dark in both themes.** Their backgrounds are hardcoded dark rgba — no overrides needed. This means the logo never needs a dark/light variant in the nav.

## Light/Dark Mode Architecture

Every site we build gets this by default.

### Hook
`src/hooks/useTheme.js` — copy verbatim to every client project.
- Reads/writes `localStorage['color-scheme']`
- Falls back to `prefers-color-scheme`
- Sets `data-theme` attribute on `<html>`

### Anti-flash script
Must be the **first thing in `<head>`**, before any stylesheet:
```html
<script>
  (function(){
    try{
      var s=localStorage.getItem('color-scheme');
      if(s==='light'||s==='dark'){document.documentElement.setAttribute('data-theme',s);return;}
    }catch(e){}
    document.documentElement.setAttribute('data-theme',
      window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
  })();
</script>
```

### Layout wiring
```jsx
// Layout.jsx
const { theme, toggle } = useTheme();
// MeshGradient only in dark mode:
{theme === "dark" && <MeshGradient ... />}
// Pass to Navbar:
<Navbar theme={theme} onToggle={toggle} />
```

### Navbar toggle
- Desktop: icon button at end of `.navLinks` row
- Mobile: labeled row at bottom of `.mobileMenu` drawer
- Always dark context — no theme-adaptive styles needed on the button

### CSS pattern
Two blocks in `src/styles.css`:
1. `:root` — dark defaults (current)
2. `[data-theme="light"]` — warm cream overrides

Components use CSS variables; the only hardcoded overrides needed are:
- `.card` background (rgba white vs white/80)
- `.surface` background (near-invisible white vs near-invisible dark)
- `.input / select / textarea` backgrounds and text colors
- `::placeholder` and `label` colors

## Contrast Requirements (WCAG AA minimum)

**Never ship text that fails 4.5:1 contrast on its background.**

| Context | Minimum ratio | Notes |
|---------|--------------|-------|
| Body text (`--text`) | 7:1+ | Always high contrast |
| Secondary text (`--muted`) | 4.5:1 | WCAG AA for normal text |
| Placeholder text | 3:1 | WCAG AA for UI components |
| Accent on dark bg | ✓ | `#e11d48` on `#080808` = 4.6:1 |
| Accent on cream bg | ✓ | `#e11d48` on `#F5F0EA` = 4.8:1 |

**In light mode, do not use `rgba(white)` for text** — it will fail. Use `rgba(20,12,15, X)` scaled by opacity.

## Key Files
| File | Purpose |
|------|---------|
| `src/siteConfig.js` | Brand name, email, phone, service area — single source of truth |
| `src/styles.css` | Entire design system; all shared styles live here |
| `src/App.jsx` | Route definitions |
| `src/components/Layout.jsx` | Wraps every page with Navbar + Footer |
| `vercel.json` | Rewrites for SPA routing + toolbar disabled (see below) |

## vercel.json Standard

Every project ships with this exact `vercel.json` — no exceptions:

```json
{
  "rewrites": [
    { "source": "/((?!.*\\.).*)", "destination": "/index.html" }
  ],
  "toolbar": { "enabled": false }
}
```

`toolbar: false` hides the Vercel feedback toolbar from preview deployments. Never ship without it — clients will see it and think it's part of the site.

## Style Conventions
- All styles go in `src/styles.css` — avoid `<style>` blocks or inline styles
- Use existing CSS variables — don't hardcode colors
- Use existing semantic class names (`.card`, `.surface`, `.btn`, `.grid`, `.badge`) — don't invent new ones unless necessary
- Breakpoints: `@media (min-width: 720px)` (tablet), `@media (min-width: 860px)` (desktop)
- Amber accent for interactive states (active nav, focus ring, primary button, selected card)

## Component Conventions
- Pages → `src/pages/`, shared UI → `src/components/`
- Use `siteConfig` for any brand/contact info — **never** hardcode phone or email in components
- React Router `<Link>` for internal nav; plain `<a>` for external links, `tel:`, and `mailto:`

## What NOT to Change Without Asking
- Pricing amounts (Pricing.jsx, Home.jsx)
- Route paths in App.jsx (renaming breaks inbound links)
- Brand name or contact info — update `siteConfig.js` instead
