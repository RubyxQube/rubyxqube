import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Clock, Zap, MessageCircle } from "lucide-react";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";

const FAQ = [
  { q: "Can the AI receptionist handle emergency plumbing inquiries?", a: "Yes. We configure it to handle emergency triage gracefully — 'We're capturing your info now and the owner will call you back as soon as possible.' It gets their name, contact, and situation, and fires you an SMS immediately." },
  { q: "Does plumbing SEO work differently than other trades?", a: "Emergency plumbing searches ('plumber near me', 'burst pipe Boise') have high intent and high urgency — which means response speed is even more critical than in other categories. We build for fast ranking and even faster lead response." },
  { q: "Can you build service-specific pages for drain cleaning, water heaters, etc.?", a: "Yes — dedicated pages for each major service (drain cleaning, water heater replacement, pipe repair, etc.) rank much better than a single 'services' page. We build them as part of the Autopilot plan." },
  { q: "What about a 24/7 emergency line callout on the site?", a: "We build that in — a prominently placed emergency contact section with click-to-call on mobile, visible above the fold on the homepage." },
  { q: "Do you handle Google Business Profile for plumbing companies?", a: "Yes — GBP management is included in Momentum. For emergency service trades, GBP is one of the highest-impact channels because 'plumber near me' searches pull heavily from the local map pack." },
];

export default function PlumbingWebDesign() {
  const [open, setOpen] = useState(null);

  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Plumbing Web Design — Boise, Idaho | RubyxQube</title>
        <meta name="description" content="Custom websites for plumbing companies in Boise and the Treasure Valley. Emergency lead capture, 24/7 AI receptionist, local SEO. Starting at $399/mo, no setup fee." />
        <meta property="og:title" content="Plumbing Web Design Boise Idaho — RubyxQube" />
        <meta property="og:description" content="Custom websites with 24/7 AI lead capture for Treasure Valley plumbing companies. No setup fee, no contract." />
        <meta property="og:image" content="https://rubyxqube.com/og-default.png" />
        <meta property="og:url" content="https://rubyxqube.com/web-design-plumbing" />
        <link rel="canonical" href={`${siteConfig.siteUrl}/web-design-plumbing`} />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", "name": siteConfig.brand, "url": `${siteConfig.siteUrl}/web-design-plumbing`, "telephone": siteConfig.phoneDisplay, "email": siteConfig.email, "address": { "@type": "PostalAddress", "addressLocality": "Boise", "addressRegion": "ID", "addressCountry": "US" }, "areaServed": siteConfig.serviceArea, "serviceType": "Plumbing Web Design" })}</script>
      </Helmet>

      <section className="surface heroSurface">
        <div className="heroSection">
          <span className="badge" style={{ marginBottom: 20 }}>Plumbing Web Design — Treasure Valley</span>
          <h1 className="h1 heroTitle">
            Plumbing websites built for<br />
            <span className="accentText">emergencies that don't wait.</span>
          </h1>
          <p className="p" style={{ fontSize: 17, maxWidth: 560, marginBottom: 32 }}>
            A burst pipe at midnight is your highest-margin job — if you capture it. We build custom plumbing websites with 24/7 AI lead capture that grabs emergency searches before your competitors do.
          </p>
          <div className="btnRow">
            <Link className="btn primary" to="/contact">Get a Free Audit</Link>
            <Link className="btn" to="/pricing">See Pricing</Link>
          </div>
          <div className="hr" style={{ marginTop: 44 }} />
          <div className="grid cols-4">
            <div className="kpi"><strong>1–2 week launch</strong><span>From kickoff call to live site</span></div>
            <div className="kpi"><strong>No setup fee</strong><span>Month-to-month, cancel anytime</span></div>
            <div className="kpi"><strong>24/7 AI coverage</strong><span>Leads captured nights and weekends</span></div>
            <div className="kpi"><strong>Emergency-ready</strong><span>Click-to-call CTA above the fold</span></div>
          </div>
        </div>
      </section>

      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "center" }}>
            <div>
              <span className="badge">The plumbing lead problem</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>Emergency plumbing searches happen at the worst possible times — for you.</h2>
              <p className="p">A homeowner with a burst pipe or a backed-up drain isn't waiting until Monday. They search immediately, open the first few Google results, and contact whoever seems responsive. If your site loads slowly, doesn't have a clear emergency CTA, or can't capture them after hours — they're calling someone else.</p>
              <p className="p" style={{ marginBottom: 0 }}>Emergency service calls are your highest-margin work. They're also the most time-sensitive leads. An AI receptionist that captures the visitor, gets their details, and texts you within seconds is the difference between landing the job and losing it.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Emergency plumbing is highest-urgency, highest-margin category",
                "Customers search and contact within minutes — response speed matters most",
                "After-hours and weekend searches represent a large share of emergency leads",
                "Local map pack dominates 'plumber near me' searches",
                "Service-specific pages (drain cleaning, water heaters) rank better than generic pages",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <CheckCircle2 size={15} color="rgba(34,197,94,0.85)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                  <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="surface" style={{ background: "transparent" }}>
        <div className="section">
          <span className="badge">What we build for plumbing</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 40 }}>Fast sites, prominent CTAs, and 24/7 coverage for every lead.</h2>
          <div className="grid cols-2" style={{ gap: 24 }}>
            {[
              { num: "01", icon: <Clock size={22} color="var(--accent)" strokeWidth={1.75} />, title: "24/7 emergency lead capture", body: "AI receptionist captures leads at any hour. Gets their name, contact, and the nature of the emergency — then texts you immediately. No lead falls through the cracks because you were asleep." },
              { num: "02", icon: <Zap size={22} color="var(--accent)" strokeWidth={1.75} />, title: "Emergency CTA above the fold", body: "Click-to-call phone number prominently placed on every page, especially on mobile. Emergency service contact is the first thing a panicking homeowner sees." },
              { num: "03", icon: <MessageCircle size={22} color="var(--accent)" strokeWidth={1.75} />, title: "Service-specific pages", body: "Dedicated pages for drain cleaning, water heater replacement, pipe repair, leak detection, and more. Each page targets specific search terms and converts better than a catch-all services page." },
              { num: "04", icon: <CheckCircle2 size={22} color="var(--accent)" strokeWidth={1.75} />, title: "Local search optimization", body: "Optimized for 'plumber Boise', 'emergency plumber Meridian', 'drain cleaning Nampa' and similar high-intent Treasure Valley searches. Search Console setup from day one." },
            ].map(({ num, icon, title, body }) => (
              <div key={title} className="card" style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, paddingTop: 2 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.06em", opacity: 0.75 }}>{num}</span>
                  {icon}
                </div>
                <div>
                  <h3 className="h3" style={{ marginBottom: 8 }}>{title}</h3>
                  <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface">
        <div className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className="card cardHighlight" style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: "1 1 280px" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Autopilot — $399/mo, no setup fee</p>
              <h3 className="h3" style={{ marginBottom: 10 }}>Custom plumbing site + AI receptionist + monthly reports. No contract.</h3>
              <p className="p" style={{ marginBottom: 0 }}>Built for your business, ready for emergencies, managed month-to-month.</p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", flexShrink: 0 }}>
              <Link className="btn primary" to="/contact">Get Started</Link>
              <Link className="btn" to="/pricing">Full Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="surface" style={{ background: "transparent" }}>
        <div className="section">
          <span className="badge">FAQ</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 32 }}>Plumbing web design questions.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQ.map((item, i) => (
              <div key={i} className="card" style={{ padding: 0, overflow: "hidden" }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left" }}>
                  <span style={{ fontWeight: 600, fontSize: 15, color: "var(--text)" }}>{item.q}</span>
                  <span style={{ color: "var(--accent)", fontSize: 20, flexShrink: 0, transition: "transform 0.15s", transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                </button>
                {open === i && <div style={{ padding: "0 20px 18px" }}><p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{item.a}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA title="Stop missing emergency plumbing leads after hours." subtitle="Start with a free audit — we'll show you exactly what your current site is failing to capture." />
    </div>
  );
}

