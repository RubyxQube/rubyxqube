import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, MessageCircle, BarChart3, Wrench } from "lucide-react";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";

const FAQ = [
  { q: "Do you work with businesses in Meridian?", a: "Yes — Meridian is one of our most active service areas. Ada County makes up the majority of our client base and we're familiar with the local market." },
  { q: "What Meridian businesses do you typically work with?", a: "HVAC, landscaping, dental offices, home cleaning, window cleaning, fencing, masonry, and other home service businesses. These are the types of companies that get the most value from 24/7 AI lead capture." },
  { q: "How do you rank a site for Meridian-specific searches?", a: "We set every page up with city-specific meta tags, local business schema, and content targeting 'Meridian ID' + your service. For Momentum clients, we also manage your Google Business Profile — which is often the strongest local ranking signal." },
  { q: "How long until my site shows up in Meridian search results?", a: "Google typically indexes new sites within 1–2 weeks. Ranking competitively for high-intent terms usually takes 2–4 months of consistent SEO performance." },
  { q: "Do you work in-person or remote?", a: "Entirely remote. All projects are managed via video call, text, and email. There's no need to meet in person — and no limitation based on which Treasure Valley city you're in." },
];

export default function Meridian() {
  const [open, setOpen] = useState(null);

  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Web Design for Meridian, Idaho Businesses | RubyxQube</title>
        <meta name="description" content="Custom websites and AI receptionists for Meridian, Idaho small businesses. Idaho's fastest-growing city deserves a site that captures leads 24/7. Starting at $399/mo, no setup fee." />
        <meta property="og:title" content="Web Design for Meridian, Idaho Businesses — RubyxQube" />
        <meta property="og:description" content="Custom websites with AI lead capture for Meridian, ID service businesses. No setup fee, month-to-month." />
        <link rel="canonical" href={`${siteConfig.siteUrl}/web-design-meridian`} />
      </Helmet>

      {/* ── Hero ── */}
      <section className="surface heroSurface">
        <div className="heroSection">
          <span className="badge" style={{ marginBottom: 20 }}>Serving Meridian, Idaho</span>
          <h1 className="h1 heroTitle">
            Web Design for<br />
            <span className="accentText">Meridian Small Businesses.</span>
          </h1>
          <p className="p" style={{ fontSize: 17, maxWidth: 540, marginBottom: 32 }}>
            Idaho's fastest-growing city is one of the most competitive markets for local service businesses. RubyxQube builds custom websites with built-in AI receptionists that capture leads 24/7 — so you stay ahead in a market that never stops growing.
          </p>
          <div className="btnRow">
            <Link className="btn primary" to="/contact">Get a Free Audit</Link>
            <Link className="btn" to="/pricing">See Pricing</Link>
          </div>
        </div>
      </section>

      {/* ── Why Meridian ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "center" }}>
            <div>
              <span className="badge">The Meridian market</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>More businesses. More competition. Higher stakes.</h2>
              <p className="p">Meridian has grown from a small suburb to one of Idaho's largest cities in under a decade. New developments bring new residents — and new residents need every service business there is. HVAC contractors, landscapers, plumbers, cleaners, fencers, dentists: the demand is real.</p>
              <p className="p" style={{ marginBottom: 0 }}>But the competition is real too. Every category is contested. The businesses winning the most jobs aren't necessarily the best — they're the ones with sites that load fast, rank locally, and capture leads the moment someone searches. That's the gap we close.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "One of the fastest-growing cities in the entire US",
                "High homeownership rate — strong demand for home services",
                "Younger demographic that searches on mobile and expects instant responses",
                "New neighborhoods constantly adding potential customers",
                "Local Google search is the primary discovery channel",
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

      {/* ── What we build ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">What we build</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 40 }}>A site that works as hard as you do — in Meridian and everywhere you serve.</h2>
          <div className="grid cols-3">
            {[
              { icon: <Wrench size={24} color="var(--accent)" strokeWidth={1.75} />, title: "Built for local search", body: "Every page is optimized for Meridian, Ada County, and Treasure Valley searches. Fast load times, local schema, and Search Console setup from day one." },
              { icon: <MessageCircle size={24} color="var(--accent)" strokeWidth={1.75} />, title: "AI receptionist, 24/7", body: "Captures leads nights, weekends, and holidays. Trained on your specific services and service area — answers questions, qualifies leads, and texts you instantly." },
              { icon: <BarChart3 size={24} color="var(--accent)" strokeWidth={1.75} />, title: "Monthly performance reports", body: "Traffic, leads captured, top search terms. You'll know exactly what your site is doing — without logging into Google Analytics yourself." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="card">
                <div style={{ marginBottom: 14 }}>{icon}</div>
                <h3 className="h3">{title}</h3>
                <p className="p" style={{ marginBottom: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing callout ── */}
      <section className="surface">
        <div className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className="card cardHighlight" style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: "1 1 280px" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Autopilot — $399/mo, no setup fee</p>
              <h3 className="h3" style={{ marginBottom: 10 }}>Custom site + AI receptionist + monthly reports. No contract.</h3>
              <p className="p" style={{ marginBottom: 0 }}>Everything a Meridian service business needs to compete online — built and managed by a real person who knows the market.</p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", flexShrink: 0 }}>
              <Link className="btn primary" to="/contact">Get Started</Link>
              <Link className="btn" to="/pricing">Full Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">FAQ</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 32 }}>Questions from Meridian businesses.</h2>
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

      <CTA title="Ready to compete in Meridian?" subtitle="Start with a free audit — no commitment. Boyd will tell you exactly what your current site is missing and how to fix it." />
    </div>
  );
}
