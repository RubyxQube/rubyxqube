import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Zap, BarChart2, MessageSquare, Clock, RefreshCw, Shield, HelpCircle } from "lucide-react";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";

const STEPS = [
  {
    number: "01",
    title: "Free 15-minute audit call",
    desc: "We look at your current online presence — website, Google Business Profile, local search rankings — and tell you exactly what's costing you leads. No pitch. Honest feedback only.",
  },
  {
    number: "02",
    title: "We build your site",
    desc: "After a short intake questionnaire, we design and build your site from scratch. Most sites launch within 3–7 business days. You review it, we refine it, then we go live.",
  },
  {
    number: "03",
    title: "Your AI receptionist goes live",
    desc: "A chatbot trained on your services, pricing, hours, and FAQs is installed on your site. It answers questions and captures leads 24/7 — even when you're on a job.",
  },
  {
    number: "04",
    title: "You get instant lead alerts",
    desc: "Every time someone submits their name and number through the chatbot or contact form, you get an instant text and email. No leads fall through the cracks.",
  },
  {
    number: "05",
    title: "Monthly report + ongoing updates",
    desc: "On the 1st of each month you get a plain-English report: how many people visited, where they came from, how many leads came in. We also make up to 60 minutes of site updates per month.",
  },
];

const INCLUDED = [
  {
    icon: Zap,
    title: "Custom website",
    items: [
      "5–10 pages, built from scratch — not a template",
      "Mobile-first design, loads fast on any device",
      "Contact form + click-to-call button",
      "Google Maps embed",
      "Basic on-page SEO (title tags, meta descriptions, schema)",
      "Google Analytics + Search Console connected",
    ],
  },
  {
    icon: MessageSquare,
    title: "AI receptionist",
    items: [
      "Trained on your services, pricing, hours, and FAQs",
      "Answers questions and captures leads 24/7",
      "Collects name, phone/email, and what they need",
      "Instant SMS alert to your phone on every new lead",
      "Instant email alert as backup",
      "Unlimited conversations — no per-chat fees",
    ],
  },
  {
    icon: BarChart2,
    title: "Monthly reporting",
    items: [
      "Plain-English summary — no dashboards to learn",
      "Total site visits, traffic sources, top pages",
      "Leads captured by the chatbot",
      "Google Search impressions and clicks",
      "Delivered by the 5th of every month",
    ],
  },
  {
    icon: RefreshCw,
    title: "Ongoing site updates",
    items: [
      "60 minutes of changes per month included",
      "Update prices, swap photos, add a service, fix typos",
      "Turnaround within 1 business day",
      "Additional time available at $150/hr",
    ],
  },
];

const MOMENTUM_EXTRAS = [
  "Developer on call, same-day prototypes, 2-day turnaround on bigger builds",
  "Unlimited edits and new pages, no monthly cap",
  "Custom tools: calculators, estimators, intake forms, and more",
  "Google Business Profile management",
  "Monthly AI receptionist tuning",
  "Weekly check-in call (30–60 min)",
];

const FAQS = [
  {
    q: "How long does it take to build my site?",
    a: "Most sites launch within 3–7 business days after you complete the intake questionnaire. Complex builds with custom features (calculators, portals, catalogs) take 2–4 weeks.",
  },
  {
    q: "Do I own my website?",
    a: "Yes. After the 6-month minimum commitment, the source files are yours on request. Your domain is always yours regardless. If you ever need to leave early, a $800 site buyout gets you the files immediately.",
  },
  {
    q: "What does '60 minutes of updates' actually mean?",
    a: "Each month you have 60 minutes banked for changes — update a price, swap a photo, add a new service, fix a typo. Just text or email the request and we handle it within 1 business day. Anything beyond 60 minutes is quoted as a project.",
  },
  {
    q: "What if I already have a website?",
    a: "We can rebuild it from scratch on one of our plans, or add just the AI receptionist to your existing site ($500 setup + $199/mo).",
  },
  {
    q: "How does the AI receptionist know about my business?",
    a: "We train it on your specific services, pricing, hours, service area, and common FAQs during onboarding. It's not a generic chatbot — it knows your business. We update it any time your info changes.",
  },
  {
    q: "What happens to my site if I cancel?",
    a: "After the 6-month minimum: give 30 days written notice, pay any outstanding balance, done. On Autopilot/Momentum, you can take the site files for $800 or simply let it go offline. Your domain is always released back to you within 5 business days.",
  },
  {
    q: "Is there a long-term contract?",
    a: "There's a 6-month minimum on Autopilot and Momentum (because the site build is included at no setup fee). After that it's month-to-month with 30-day notice. Launch is a one-time project with no ongoing commitment.",
  },
  {
    q: "How do I request a site change?",
    a: `Email or text ${siteConfig.phoneDisplay} with what you need. We'll confirm receipt within 4 business hours and have it done within 1 business day.`,
  },
  {
    q: "What is the AI receptionist built on?",
    a: "It's powered by Claude, made by Anthropic — one of the leading AI companies. It's the same technology used by major enterprises, running on your site as a private, business-specific assistant.",
  },
  {
    q: "Can I upgrade from Autopilot to Momentum?",
    a: "Yes, at any time. Just let us know and we'll start the additional Momentum services (developer on call, custom tools, GBP management, weekly calls) at your next billing date.",
  },
];

export default function HowItWorks() {
  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>How It Works — RubyxQube | Simple Web Design Process</title>
        <meta name="description" content="See exactly how RubyxQube builds and manages your website - from first call to launch and beyond. Transparent process, no surprises." />
        <meta property="og:title" content="How It Works — RubyxQube | Simple Web Design Process" />
        <meta property="og:description" content="See exactly how RubyxQube builds and manages your website - from first call to launch and beyond. Transparent process, no surprises." />
      </Helmet>

      {/* ── Hero ── */}
      <section className="surface heroSurface">
        <div className="section" style={{ paddingTop: 80, paddingBottom: 64 }}>
          <span className="badge">For clients and prospects</span>
          <h1 className="h1" style={{ marginTop: 16, maxWidth: "22ch" }}>
            What you get — and <span className="accentText">exactly how it works.</span>
          </h1>
          <p className="p" style={{ maxWidth: 560, fontSize: 17 }}>
            No vague "web presence solutions." Here's precisely what's included, how the process works, and what happens month to month.
          </p>
          <div className="btnRow" style={{ marginTop: 28 }}>
            <Link className="btn primary" to="/contact">Book a Free Audit</Link>
            <Link className="btn" to="/pricing">See Pricing</Link>
          </div>
        </div>
      </section>

      {/* ── Process steps ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">The process</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>From first call to live site in days.</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 40 }}>Five steps. No guesswork.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {STEPS.map((step, i) => (
              <div key={step.number} className="card" style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ flexShrink: 0, width: 48, height: 48, borderRadius: "50%", background: "var(--accent-dim)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "var(--accent)" }}>
                  {step.number}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="h3" style={{ marginBottom: 6 }}>{step.title}</h3>
                  <p className="p" style={{ marginBottom: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Autopilot &amp; Momentum</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>What's included in every plan.</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 40 }}>
            Autopilot ($399/mo) and Momentum ($999/mo) both include everything below. No nickel-and-diming.
          </p>

          <div className="grid cols-2">
            {INCLUDED.map(({ icon: Icon, title, items }) => (
              <div key={title} className="card">
                <Icon size={24} color="var(--accent)" style={{ marginBottom: 14 }} />
                <h3 className="h3" style={{ marginBottom: 16 }}>{title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {items.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                      <CheckCircle2 size={14} color="rgba(34,197,94,0.85)" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Momentum extras ── */}
      <section className="surface">
        <div className="section">
          <div className="card cardHighlight" style={{ maxWidth: 720, margin: "0 auto" }}>
            <span className="badge" style={{ marginBottom: 12, display: "inline-block" }}>Momentum only — $999/mo</span>
            <h2 className="h2" style={{ marginBottom: 8 }}>Everything in Autopilot, plus a developer on your team.</h2>
            <p className="p" style={{ marginBottom: 20 }}>
              Momentum is for business owners who have ideas they never have time to act on. Same-day turnaround, custom tools, and a direct line to Boyd every week.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {MOMENTUM_EXTRAS.map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                  <CheckCircle2 size={14} color="rgba(34,197,94,0.85)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
            <div className="btnRow" style={{ marginTop: 24 }}>
              <Link className="btn primary" to="/contact">Get Started</Link>
              <Link className="btn" to="/pricing">Compare Plans</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">FAQ</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 40 }}>Common questions.</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 760, margin: "0 auto" }}>
            {FAQS.map(({ q, a }) => (
              <div key={q} className="card">
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <HelpCircle size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <p style={{ fontWeight: 700, marginBottom: 6 }}>{q}</p>
                    <p className="p" style={{ marginBottom: 0, color: "var(--muted)" }}>{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Ready to see it in action?"
        subtitle="Book a free 15-minute audit. We'll look at your current online presence and tell you exactly what to fix — whether you hire us or not."
      />
    </div>
  );
}
