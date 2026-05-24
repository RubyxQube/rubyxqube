import React from "react";
import { Link } from "react-router-dom";
import CTA from "../components/CTA.jsx";
import PackageCard from "../components/PackageCard.jsx";
import { siteConfig } from "../siteConfig.js";

export default function Home() {
  const packages = [
    {
      name: "One-Time Website Build",
      bestFor: "Businesses that want a solid website and be done.",
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
      bestFor: "Owners who don't want to think about maintenance.",
      price: "$2,000 + $250/mo",
      timeline: "Ongoing",
      bullets: [
        "Everything in Website Build",
        "Monthly content updates (text, photos, services)",
        "Minor layout changes",
        "Speed & uptime monitoring",
        "Up to 60 min of updates/month",
      ],
      highlight: true,
    },
    {
      name: "Website + Light Marketing",
      bestFor: "Local businesses that want more visibility and leads.",
      price: "$2,000 + $500/mo",
      timeline: "Ongoing",
      bullets: [
        "Everything in Monthly Care",
        "Google Business Profile setup/optimization",
        "Basic local SEO structure",
        "1–2 posts/month + GBP updates",
        "Monthly performance check-in",
      ],
    },
  ];

  return (
    <>
      <div className="pageMinHeight">

        {/* ── Hero ── */}
        <section className="surface heroSection">
          <span className="badge">Treasure Valley Web Design</span>
          <h1 className="h1 heroTitle">
            Websites that help local businesses <span className="accentText">get more calls</span>
          </h1>
          <p className="p" style={{ fontSize: 16, maxWidth: 600, marginBottom: 28 }}>
            {siteConfig.brand} builds clean, mobile-friendly websites for service businesses. Lead capture, local SEO, and optional monthly support — launched in 2–3 weeks.
          </p>

          <div className="btnRow">
            <Link className="btn primary" to="/contact">Get a Free Quote</Link>
            <a className="btn" href={`tel:${siteConfig.phoneE164}`}>Call {siteConfig.phoneDisplay}</a>
            <Link className="btn" to="/pricing">View Packages</Link>
          </div>

          <div className="hr" />

          <div className="grid cols-3">
            <div className="kpi">
              <strong>Clean & fast</strong>
              <span>Modern layout that looks great on every device</span>
            </div>
            <div className="kpi">
              <strong>Built to convert</strong>
              <span>Contact forms and click-to-call that make it easy to reach you</span>
            </div>
            <div className="kpi">
              <strong>Found locally</strong>
              <span>Titles, descriptions, and local basics so you show up in search</span>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="surface section">
          <span className="badge">Simple process</span>
          <h2 className="h2" style={{ marginTop: 12 }}>From zero to live in weeks</h2>
          <p className="p">No lengthy intake forms. No confusing back-and-forth. Just three steps.</p>
          <div className="grid cols-3">
            <div className="card">
              <div className="badge" style={{ marginBottom: 14 }}>Step 1</div>
              <h3 className="h3">Quick call</h3>
              <p className="p" style={{ marginBottom: 0 }}>15 minutes to understand your business, goals, and what you want customers to do when they land on your site.</p>
            </div>
            <div className="card">
              <div className="badge" style={{ marginBottom: 14 }}>Step 2</div>
              <h3 className="h3">Build + review</h3>
              <p className="p" style={{ marginBottom: 0 }}>I build the site and share it for your review. Two rounds of revisions to get it exactly right.</p>
            </div>
            <div className="card">
              <div className="badge" style={{ marginBottom: 14 }}>Step 3</div>
              <h3 className="h3">Launch + support</h3>
              <p className="p" style={{ marginBottom: 0 }}>Go live. Optionally add a monthly care or marketing plan so your site stays fresh.</p>
            </div>
          </div>
        </section>

        {/* ── Packages ── */}
        <section className="surface section">
          <span className="badge">Pricing</span>
          <h2 className="h2" style={{ marginTop: 12 }}>Clear packages. No surprises.</h2>
          <p className="p">Pick what fits. Upgrade or downgrade anytime.</p>
          <div className="grid cols-3">
            {packages.map((p) => (
              <PackageCard key={p.name} {...p} />
            ))}
          </div>
        </section>

        <CTA />
      </div>
    </>
  );
}
