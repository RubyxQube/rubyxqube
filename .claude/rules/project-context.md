# Project Context — Qube Solutions Site

## What This Is
A React + Vite marketing website for Qube Solutions — Boyd's web design service for small businesses in the Treasure Valley (Boise, ID area). The site showcases services, pricing, and portfolio while proving design quality.

## Tech Stack
- **Framework:** React 18 + React Router v6
- **Build tool:** Vite 5
- **Styling:** Custom CSS in `src/styles.css` — **no Tailwind** in this project
- **Font:** Plus Jakarta Sans (Google Fonts, loaded in `index.html`)
- **Assets:** Logos in `src/assets/`, favicon in `public/`

## Dev Commands
```bash
npm run dev      # Start dev server → http://localhost:5173
npm run build    # Build to dist/
npm run preview  # Preview production build
```

## Design Direction
**Warm & local** — earthy, professional, approachable for small business owners.

| Token | Value |
|-------|-------|
| `--bg` | `#faf7f4` (warm cream) |
| `--text` | `rgba(26,17,6,0.90)` (warm dark brown) |
| `--muted` | `rgba(26,17,6,0.58)` |
| `--amber` | `#d97706` (primary CTA color) |
| Radial glows | Amber, terracotta, sage — **not** blue/green/pink |
| Font | Plus Jakarta Sans, weights 400–800 |

## Key Files
| File | Purpose |
|------|---------|
| `src/siteConfig.js` | Brand name, email, phone, service area — single source of truth |
| `src/styles.css` | Entire design system; all shared styles live here |
| `src/App.jsx` | Route definitions |
| `src/components/Layout.jsx` | Wraps every page with Navbar + Footer |

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
