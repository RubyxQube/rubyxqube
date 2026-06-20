import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2 } from "lucide-react";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";

const FAQ = [
  { q: "Do you work with businesses in Caldwell?", a: "Yes — Caldwell is in our service area. We work with businesses throughout Canyon County, including Caldwell." },
  { q: "Is there a higher cost for Caldwell vs. Boise?", a: "No. Pricing is the same regardless of city. All projects are managed remotely, so location doesn't affect cost." },
  { q: "What types of businesses do you serve in Caldwell?", a: "Home services, construction, cleaning, agricultural supply, food businesses, automotive, and professional services. If you're a local business that needs to capture leads online, we can build for you." },
  { q: "Do you help with Google Business Profile for Caldwell businesses?", a: "Yes — Google Business Profile management is included in the Momentum plan. It's one of the strongest local ranking signals for 'near me' searches in smaller markets like Caldwell." },
  { q: "My business is small. Is a custom site worth it in Caldwell?", a: "Often yes — especially if your competitors are still on Wix or have no web presence. In smaller markets, the bar to rank locally is lower. A fast, well-built site with proper SEO can move to the top of local results faster than in Boise or Meridian." },
];

export default function Caldwell() {
  const [open, setOpen] = useState(null);

  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Web Design for Caldwell, Idaho Businesses | RubyxQube</title>
        <meta name="description" content="Custom websites and AI receptionists for Caldwell, Idaho small businesses. Canyon County web design with 24/7 AI lead capture. Starting at $399/mo, no setup fee." />
        <meta property="og:title" content="Web Design for Caldwell, Idaho Businesses — RubyxQube" />
        <meta property="og:description" content="Custom websites with AI lead capture for Caldwell, ID businesses. No setup fee, month-to-month." />
        <meta property="og:image" content="https://rubyxqube.com/og-default.png" />
        <meta property="og:url" content="https://rubyxqube.com/web-design-caldwell" />
        <link rel="canonical" href={`${siteConfig.siteUrl}/web-design-caldwell`} />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", "name": siteConfig.brand, "url": `${siteConfig.siteUrl}/web-design-caldwell`, "telephone": siteConfig.phoneDisplay, "email": siteConfig.email, "address": { "@type": "PostalAddress", "addressLocality": "Boise", "addressRegion": "ID", "addressCountry": "US" }, "areaServed": "Caldwell, Idaho", "serviceType": "Web Design" })}</script>
      </Helmet>

      <section className="surface heroSurface">
        <div className="heroSection">
          <span className="badge" style={{ marginBottom: 20 }}>Serving Caldwell, Idaho</span>
          <h1 className="h1 heroTitle">
            Web Design for<br />
            <span className="accentText">Caldwell Small Businesses.</span>
          </h1>
          <p className="p" style={{ fontSize: 17, maxWidth: 540, marginBottom: 32 }}>
            Caldwell is a growing market with less digital competition than Boise or Meridian — which means a well-built site with proper local SEO can make a real impact faster. We build custom websites with AI lead capture for Canyon County businesses that want to stand out.
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
            <div className="kpi"><strong>Ranks faster here</strong><span>Lower competition than Boise or Meridian</span></div>
          </div>
        </div>
      </section>

      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "center" }}>
            <div>
              <span className="badge">The Caldwell opportunity</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>Less competition online means bigger wins for early movers.</h2>
              <p className="p">Caldwell has a strong base of established businesses and a growing population. The city is home to College of Idaho, a diverse economy, and a community that still relies heavily on local service providers for home maintenance, construction, and professional services.</p>
              <p className="p" style={{ marginBottom: 0 }}>What sets Caldwell apart from Boise or Meridian: the digital competition is lighter. Many Caldwell businesses don't have professional websites at all. If you build one that loads fast, ranks for local searches, and captures leads around the clock — you're ahead of most of your competitors by default.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Growing population with strong demand for home and professional services",
                "Fewer digitally-competitive local businesses than Boise or Meridian",
                "Diverse economy: construction, agriculture, food, professional services",
                "Strong 'near me' search behavior — local SEO has high impact",
                "Same pricing as Boise — no location premium",
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
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 40 }}>Everything a Caldwell business needs to win local searches.</h2>
          <div className="grid cols-3">
            {[
              { num: "01", title: "Local search optimization", body: "Pages optimized for Caldwell, Canyon County, and surrounding areas. Fast load times, proper schema, and Google Search Console setup from day one." },
              { num: "02", title: "AI receptionist", body: "Handles questions and captures leads at any hour. Trained on your services, pricing, and service area — no missed opportunities, even on weekends." },
              { num: "03", title: "Monthly reporting", body: "Clear performance data every month — traffic, leads, top search terms. No dashboards to log into, no data to interpret yourself." },
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
              <p className="p" style={{ marginBottom: 0 }}>Same pricing whether you're in Caldwell or Boise. No commitments — month-to-month from day one.</p>
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
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 32 }}>Questions from Caldwell businesses.</h2>
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

      <CTA title="Ready to grow your Caldwell business online?" subtitle="Start with a free audit — no commitment. We'll show you exactly what your current presence is missing." />
    </div>
  );
}

