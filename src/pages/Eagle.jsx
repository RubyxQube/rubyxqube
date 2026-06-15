import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2 } from "lucide-react";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";

const FAQ = [
  { q: "Do you work with businesses in Eagle?", a: "Yes — Eagle is a strong market for the type of sites we build. Higher household income means clients invest more in their service providers, and a well-designed site with AI lead capture makes a bigger impression." },
  { q: "Do you build dental or medical websites in Eagle?", a: "Yes. Professional service businesses — dental practices, medical offices, financial advisors, law firms — often need appointment booking integrations, FAQ content, and a polished design that builds trust. We've built for that category." },
  { q: "What industries do you serve in Eagle?", a: "High-end home services (landscaping, fencing, custom construction), dental and medical practices, professional services, real estate-adjacent businesses, and premium home goods and services." },
  { q: "Does Eagle have good SEO opportunity?", a: "Yes. Eagle-specific searches like 'landscaping Eagle Idaho' or 'dentist in Eagle ID' have real search volume with manageable competition. A properly built and maintained site can rank well relatively quickly." },
  { q: "Do premium clients in Eagle expect a higher-quality design?", a: "They do. We don't use templates — every site is custom-built. For Eagle clients especially, we default to a cleaner, more refined aesthetic that matches the premium positioning of their business." },
];

export default function Eagle() {
  const [open, setOpen] = useState(null);

  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Web Design for Eagle, Idaho Businesses | RubyxQube</title>
        <meta name="description" content="Custom websites and AI receptionists for Eagle, Idaho businesses. Premium web design for the Treasure Valley's most affluent suburb. Starting at $399/mo, no setup fee." />
        <meta property="og:title" content="Web Design for Eagle, Idaho Businesses — RubyxQube" />
        <meta property="og:description" content="Custom websites with AI lead capture for Eagle, ID businesses. Premium design, no setup fee, month-to-month." />
        <meta property="og:image" content="https://rubyxqube.com/og-default.png" />
        <meta property="og:url" content="https://rubyxqube.com/web-design-eagle" />
        <link rel="canonical" href={`${siteConfig.siteUrl}/web-design-eagle`} />
      </Helmet>

      <section className="surface heroSurface">
        <div className="heroSection">
          <span className="badge" style={{ marginBottom: 20 }}>Serving Eagle, Idaho</span>
          <h1 className="h1 heroTitle">
            Web Design for<br />
            <span className="accentText">Eagle Small Businesses.</span>
          </h1>
          <p className="p" style={{ fontSize: 17, maxWidth: 540, marginBottom: 32 }}>
            Eagle's clients expect more — and your website should deliver it. We build custom, high-quality sites for Eagle service businesses and professional practices that want to convert high-intent searches into booked jobs.
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
            <div className="kpi"><strong>Premium design</strong><span>Custom-built — never templated</span></div>
          </div>
        </div>
      </section>

      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "center" }}>
            <div>
              <span className="badge">The Eagle market</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>A higher-income market where design quality and trust signals matter more.</h2>
              <p className="p">Eagle consistently ranks as one of Idaho's most affluent communities. Homeowners there are investing in premium landscaping, custom construction, dental care, and professional services — and they're doing their research before choosing a provider.</p>
              <p className="p" style={{ marginBottom: 0 }}>A poorly designed website — slow, templated, or outdated — doesn't just lose to competitors in Eagle. It actively signals that you're not the caliber of provider they're looking for. A polished, fast, AI-equipped site says the opposite.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "One of Idaho's highest household income communities",
                "Strong demand for premium home services, dental, and professional services",
                "Clients research providers online before making contact",
                "Custom design signals credibility — templates don't",
                "Manageable local SEO competition for Eagle-specific searches",
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
          <span className="badge">What we build</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 40 }}>Sites that convert Eagle's high-intent searchers into booked clients.</h2>
          <div className="grid cols-3">
            {[
              { num: "01", title: "Premium custom design", body: "No templates. Every site is designed specifically for your business and positioned for the Eagle market — clean, fast, and credible." },
              { num: "02", title: "AI receptionist, 24/7", body: "Captures leads at any hour. Eagle clients search and research at all hours — the AI handles questions, qualifies intent, and texts you instantly on every lead." },
              { num: "03", title: "Local SEO + reporting", body: "Optimized for Eagle and Ada County searches. Monthly performance report tells you exactly what's working without requiring you to log into anything." },
            ].map(({ num, title, body }) => (
              <div key={title} className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--accent-dim)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "var(--accent)", flexShrink: 0 }}>
                  {num}
                </div>
                <h3 className="h3">{title}</h3>
                <p className="p" style={{ marginBottom: 0 }}>{body}</p>
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
              <h3 className="h3" style={{ marginBottom: 10 }}>Custom site + AI receptionist + monthly reports. No contract.</h3>
              <p className="p" style={{ marginBottom: 0 }}>Start without a large upfront commitment. Cancel anytime with 30 days notice.</p>
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
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 32 }}>Questions from Eagle businesses.</h2>
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

      <CTA title="Ready to impress Eagle's clients online?" subtitle="Start with a free audit. We'll tell you what your current site is doing — and what it should be doing." />
    </div>
  );
}

