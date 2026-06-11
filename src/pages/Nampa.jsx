import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, MessageCircle, BarChart3, Wrench } from "lucide-react";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";

const FAQ = [
  { q: "Do you work with businesses in Nampa?", a: "Yes — Nampa and Canyon County are part of our primary service area. We understand the Nampa market and the types of businesses that do well there." },
  { q: "What does a website typically cost for a Nampa contractor?", a: "Our Autopilot plan is $399/month with no setup fee — that includes a custom site, AI receptionist, analytics, and monthly updates. The Launch package is $1,200 one-time for a basic site without ongoing support." },
  { q: "Do you know the Canyon County / Nampa market?", a: "We do. Home services, construction, agricultural supply, automotive, and cleaning services are the types of businesses we see most in Canyon County — and they're what we build for." },
  { q: "Can the AI receptionist handle Spanish-speaking customers?", a: "Claude (the AI we use) can respond in multiple languages including Spanish. We can configure the system prompt to handle bilingual conversations if that's relevant to your customer base." },
  { q: "How does the site get found in Nampa searches?", a: "We optimize for 'Nampa ID' + your service in meta tags, page content, and local schema. Google Business Profile management (Momentum plan) adds significant local ranking weight on top of the site." },
];

export default function Nampa() {
  const [open, setOpen] = useState(null);

  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Web Design for Nampa, Idaho Businesses | RubyxQube</title>
        <meta name="description" content="Custom websites and AI receptionists for Nampa, Idaho small businesses. Canyon County's growing market needs sites that capture leads 24/7. Starting at $399/mo, no setup fee." />
        <meta property="og:title" content="Web Design for Nampa, Idaho Businesses — RubyxQube" />
        <meta property="og:description" content="Custom websites with AI lead capture for Nampa, ID service businesses. No setup fee, month-to-month." />
        <link rel="canonical" href={`${siteConfig.siteUrl}/web-design-nampa`} />
      </Helmet>

      <section className="surface heroSurface">
        <div className="heroSection">
          <span className="badge" style={{ marginBottom: 20 }}>Serving Nampa, Idaho</span>
          <h1 className="h1 heroTitle">
            Web Design for<br />
            <span className="accentText">Nampa Small Businesses.</span>
          </h1>
          <p className="p" style={{ fontSize: 17, maxWidth: 540, marginBottom: 32 }}>
            Nampa is one of the most underserved markets for quality web design in the Treasure Valley. Most Canyon County businesses are operating on outdated sites or no site at all — which means the bar to stand out is low and the opportunity is real.
          </p>
          <div className="btnRow">
            <Link className="btn primary" to="/contact">Get a Free Audit</Link>
            <Link className="btn" to="/pricing">See Pricing</Link>
          </div>
        </div>
      </section>

      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "center" }}>
            <div>
              <span className="badge">The Nampa opportunity</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>A big market where the digital competition is still catchable.</h2>
              <p className="p">Nampa has been growing steadily — new residents moving in from more expensive markets, established neighborhoods with strong home service demand, and a blue-collar economy that keeps construction and maintenance trades busy year-round.</p>
              <p className="p" style={{ marginBottom: 0 }}>What makes Nampa interesting: many of the businesses here still rely heavily on word-of-mouth and haven't invested in their online presence. For a business that does build a fast, modern site with proper SEO and 24/7 lead capture, the ranking opportunity is real.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Canyon County's largest city and one of Idaho's fastest-growing",
                "Strong home services demand — HVAC, plumbing, fencing, cleaning",
                "Many competitors still on Wix or no site at all",
                "Growing population bringing new customers into the market",
                "Bilingual customer base — we support Spanish-language configurations",
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

      <section className="surface">
        <div className="section">
          <span className="badge">What we build</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 40 }}>A site that captures Nampa leads — day and night.</h2>
          <div className="grid cols-3">
            {[
              { icon: <Wrench size={24} color="var(--accent)" strokeWidth={1.75} />, title: "Local SEO from day one", body: "Optimized for Nampa and Canyon County searches. Local business schema, Search Console setup, and page content that signals relevance to Google Maps and local results." },
              { icon: <MessageCircle size={24} color="var(--accent)" strokeWidth={1.75} />, title: "AI receptionist", body: "Handles customer questions, captures leads, and texts you the moment someone's ready to book — at any hour. Trained on your services and service area." },
              { icon: <BarChart3 size={24} color="var(--accent)" strokeWidth={1.75} />, title: "Monthly reports", body: "Know your traffic, top searches, and leads captured each month — without logging into anything. Arrives in your inbox." },
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

      <section className="surface">
        <div className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className="card cardHighlight" style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: "1 1 280px" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Autopilot — $399/mo, no setup fee</p>
              <h3 className="h3" style={{ marginBottom: 10 }}>Custom site + AI receptionist + monthly reports. No contract.</h3>
              <p className="p" style={{ marginBottom: 0 }}>Get a professional web presence in Nampa without a large upfront investment. Month-to-month, cancel anytime.</p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", flexShrink: 0 }}>
              <Link className="btn primary" to="/contact">Get Started</Link>
              <Link className="btn" to="/pricing">Full Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="surface">
        <div className="section">
          <span className="badge">FAQ</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 32 }}>Questions from Nampa businesses.</h2>
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

      <CTA title="Ready to stand out in Nampa?" subtitle="Start with a free audit. Boyd will review your current online presence and tell you exactly what it's costing you." />
    </div>
  );
}
