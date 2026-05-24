import React from "react";
import { Link } from "react-router-dom";
import CTA from "../components/CTA.jsx";
import PackageCard from "../components/PackageCard.jsx";
import { siteConfig } from "../siteConfig.js";

export default function Home() {
  const packages = [
    {
      name: "One-Time Website Build",
      bestFor: "You want a great site and be done with it.",
      price: "$2,000",
      timeline: "2–3 weeks",
      bullets: [
        "4–6 pages (Home, About, Services, Gallery, Quote, Privacy)",
        "Mobile responsive",
        "Contact form + click-to-call buttons",
        "Basic SEO (titles + descriptions)",
        "Google Maps embed",
        "2 revision rounds included",
      ],
    },
    {
      name: "Website + Monthly Care",
      bestFor: "You want the site maintained without thinking about it.",
      price: "$2,000 + $250/mo",
      timeline: "2–3 wks + ongoing",
      bullets: [
        "Everything in Website Build",
        "Monthly content updates (text, photos, services)",
        "Speed & uptime monitoring",
        "Minor layout changes",
        "Up to 60 min of updates/month",
      ],
      highlight: true,
    },
    {
      name: "Website + Light Marketing",
      bestFor: "You want more visibility and a steady flow of leads.",
      price: "$2,000 + $500/mo",
      timeline: "2–3 wks + ongoing",
      bullets: [
        "Everything in Monthly Care",
        "Google Business Profile setup & optimization",
        "Basic local SEO structure",
        "1–2 posts/month + GBP updates",
        "Monthly performance check-in",
      ],
    },
  ];

  return (
    <div className="pageMinHeight">

      {/* ── Hero ── */}
      <section className="surface heroSurface">
        <div className="heroSection">
          <span className="badge">Treasure Valley Web Design</span>
          <h1 className="h1 heroTitle">
            Websites that help local businesses{" "}
            <span className="accentText">get more calls</span>
          </h1>
          <p className="p" style={{ fontSize: 17, maxWidth: 540, marginBottom: 32 }}>
            {siteConfig.brand} builds clean, mobile-friendly websites for service businesses in the {siteConfig.serviceArea}. Lead capture, local SEO, and optional monthly support — live in 2–3 weeks.
          </p>
          <div className="btnRow">
            <Link className="btn primary" to="/contact">Get a Free Quote</Link>
            <a className="btn" href={`tel:${siteConfig.phoneE164}`}>Call {siteConfig.phoneDisplay}</a>
            <Link className="btn" to="/pricing">See Pricing</Link>
          </div>

          <div className="hr" style={{ marginTop: 48 }} />

          <div className="grid cols-3">
            <div className="kpi">
              <strong>Clean & fast</strong>
              <span>Modern layout that looks great on every device, every screen size</span>
            </div>
            <div className="kpi">
              <strong>Built to convert</strong>
              <span>Contact forms and click-to-call buttons that make it easy for customers to reach you</span>
            </div>
            <div className="kpi">
              <strong>Locally found</strong>
              <span>Titles, descriptions, and local basics so you actually show up in search results</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Simple process</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>From zero to live in weeks</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 32 }}>No lengthy forms. No confusing back-and-forth. Three steps and you're live.</p>
          <div className="grid cols-3">
            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Step 01</p>
              <h3 className="h3">Quick call</h3>
              <p className="p" style={{ marginBottom: 0 }}>15 minutes to understand your business, your goals, and what you want customers to do when they find you online.</p>
            </div>
            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Step 02</p>
              <h3 className="h3">Build + review</h3>
              <p className="p" style={{ marginBottom: 0 }}>I build the site and share it for your review. Two rounds of revisions included — we refine until it's right.</p>
            </div>
            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Step 03</p>
              <h3 className="h3">Launch + support</h3>
              <p className="p" style={{ marginBottom: 0 }}>Go live. Optionally add monthly care or light marketing to keep your site fresh and generating leads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Pricing</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>Clear packages. No surprises.</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 32 }}>Every package starts with a solid website build. Add ongoing support if you want it.</p>
          <div className="grid cols-3">
            {packages.map((p) => (
              <PackageCard key={p.name} {...p} />
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
