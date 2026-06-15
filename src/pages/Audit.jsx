import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, MapPin, ClipboardList, Bot } from "lucide-react";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";


const WHAT_YOU_GET = [
  {
    icon: Search,
    title: "Website review",
    desc: "Speed, mobile experience, contact clarity, and whether your site is actually converting visitors into calls.",
  },
  {
    icon: MapPin,
    title: "Local SEO check",
    desc: "Are you showing up when someone in Boise searches for what you do? We'll find the gaps.",
  },
  {
    icon: ClipboardList,
    title: "Google Business Profile",
    desc: "Missing info, no reviews, wrong hours — these cost you jobs. We'll flag everything.",
  },
  {
    icon: Bot,
    title: "Lead capture gaps",
    desc: "How many leads are leaving your site without contacting you? We'll show you where they drop off.",
  },
];

const WHO_ITS_FOR = [
  "You don't have a website yet — or yours looks outdated",
  "You're getting traffic but not enough calls or form fills",
  "You're not showing up on Google for your services",
  "You want an honest outside opinion before investing in marketing",
];

export default function Audit() {
  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Free Website Audit — RubyxQube | Treasure Valley</title>
        <meta name="description" content="Get a free website audit for your Treasure Valley business. We'll show you exactly what's holding your site back and how to fix it — no strings attached." />
        <meta property="og:title" content="Free Website Audit — RubyxQube | Treasure Valley" />
        <meta property="og:description" content="Get a free website audit for your Treasure Valley business. We'll show you exactly what's holding your site back and how to fix it — no strings attached." />
        <meta property="og:image" content="https://rubyxqube.com/og-default.png" />
        <meta property="og:url" content="https://rubyxqube.com/audit" />
        <link rel="canonical" href="https://rubyxqube.com/audit" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="surface heroSurface">
        <div className="heroSection">
          <span className="badge">Free · No Commitment · 15 Minutes</span>
          <h1 className="h1 heroTitle" style={{ maxWidth: "22ch", marginTop: 16 }}>
            Find out exactly what's<br />
            <span className="accentText">costing you leads online.</span>
          </h1>
          <p className="p" style={{ fontSize: 17, maxWidth: 520, marginBottom: 32 }}>
            Boyd reviews your current online presence and tells you exactly what's working, what isn't, and what to fix first. 15 minutes. No pitch. No commitment.
          </p>
          <div className="btnRow">
            <Link className="btn primary" to="/contact">Book Your Free Audit</Link>
            <a className="btn" href={`tel:${siteConfig.phoneE164}`}>Call {siteConfig.phoneDisplay}</a>
          </div>

          <div className="hr" style={{ marginTop: 52 }} />

          <div className="grid cols-3">
            <div className="kpi">
              <strong>15 Minutes</strong>
              <span>Focused review — no fluff, no sales pitch</span>
            </div>
            <div className="kpi">
              <strong>100% Free</strong>
              <span>No credit card, no hidden fees, no obligation</span>
            </div>
            <div className="kpi">
              <strong>Real Answers</strong>
              <span>You'll know exactly what to fix when we're done</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">What's included</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>What Boyd reviews in your audit</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 40 }}>
            Four areas that most local businesses get wrong — and fixing them is usually the difference between getting calls and getting skipped.
          </p>
          <div className="grid cols-2" style={{ gap: 20 }}>
            {WHAT_YOU_GET.map((item) => (
              <div key={item.title} className="card" style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                <item.icon size={24} color="var(--accent)" strokeWidth={1.75} style={{ display: "block", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h3 className="h3" style={{ marginBottom: 6 }}>{item.title}</h3>
                  <p className="p" style={{ marginBottom: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who it's for ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "center" }}>
            <div>
              <span className="badge">Who it's for</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>This audit is for you if…</h2>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                {WHO_ITS_FOR.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span className="p" style={{ marginBottom: 0 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card" style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-border)" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
                What happens after
              </p>
              <h3 className="h3" style={{ marginBottom: 12 }}>You get a clear picture — then you decide.</h3>
              <p className="p">
                After the audit, Boyd will tell you what he found and what he'd recommend. If it makes sense to work together, great. If not, you still walk away with a real roadmap you can act on yourself.
              </p>
              <p className="p" style={{ marginBottom: 20 }}>
                No pressure. No follow-up emails every week. Just honest advice.
              </p>
              <Link className="btn primary" to="/contact" style={{ display: "inline-flex" }}>
                Book Your Free Audit →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <CTA
        title="Ready to find out where you stand?"
        subtitle="Free. 15 minutes. No commitment. Fill out the short form and Boyd will review your online presence before the call."
        ctaTo="/contact"
      />

    </div>
  );
}

