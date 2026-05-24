# Qube Solutions

Marketing website for **Qube Solutions** — a web design service for small businesses in the Treasure Valley area.

Built with React + Vite. Custom CSS design system (no Tailwind in production).

---

## Getting Started

```bash
npm install
npm run dev       # dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

---

## Project Structure

```
src/
  ├── main.jsx            Entry point (React StrictMode + BrowserRouter)
  ├── App.jsx             Route definitions
  ├── siteConfig.js       Brand info, contact details — edit here, not inline
  ├── styles.css          Design system (CSS variables + component classes)
  ├── components/
  │   ├── Layout.jsx      Navbar + Footer wrapper (wraps every page)
  │   ├── Navbar.jsx
  │   ├── Footer.jsx
  │   ├── CTA.jsx
  │   ├── FAQ.jsx
  │   ├── PackageCard.jsx
  │   ├── PortfolioGrid.jsx
  │   └── ScrollToTop.jsx
  └── pages/
      ├── Home.jsx        Hero, package overview, process steps
      ├── Services.jsx    Full service details + FAQ
      ├── Pricing.jsx     Package cards + add-ons table
      ├── Portfolio.jsx   Work showcase
      ├── Contact.jsx     Get-a-quote form (also at /quote)
      ├── About.jsx
      ├── Privacy.jsx
      └── NotFound.jsx
```

---

## Pages & Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Landing page |
| `/services` | Services | Service details + FAQ |
| `/pricing` | Pricing | Packages + add-ons |
| `/portfolio` | Portfolio | Work showcase |
| `/contact` or `/quote` | Contact | Get-a-quote form |
| `/privacy` | Privacy | Privacy policy |

---

## Styling

All styles live in `src/styles.css`. Uses CSS custom properties and semantic class names — **not Tailwind**.

**Key class names:**

| Class | Usage |
|-------|-------|
| `.surface` | Glassmorphism card base |
| `.card` | Elevated card with shadow |
| `.btn`, `.btn.primary` | Buttons |
| `.grid .cols-2`, `.grid .cols-3` | Responsive layout grid |
| `.h1`–`.h3`, `.p` | Typography |
| `.badge` | Pill label |

**CSS variables:** `--bg`, `--surface`, `--text`, `--muted`, `--line`, `--shadow-*`, `--accent-*`

**Breakpoints:** `720px` (tablet), `860px` (desktop)

---

## Site Config

Edit `src/siteConfig.js` to update brand name, contact details, or service area.

```js
export const siteConfig = {
  brand: "Qube Solutions",
  serviceArea: "Treasure Valley",
  email: "boydquerubin@gmail.com",
  phoneDisplay: "(208) 970-8624",
  phoneE164: "+12089708624",
};
```

---

## Packages & Pricing

| Package | Price |
|---------|-------|
| Website Build | $2,000 one-time |
| Website + Monthly Care | $2,000 + $250/mo |
| Website + Light Marketing | $2,000 + $500/mo |

**Add-ons:** Extra page ($200) · Copywriting ($400) · Logo cleanup ($200) · Booking integration ($100) · Site migration ($500)
