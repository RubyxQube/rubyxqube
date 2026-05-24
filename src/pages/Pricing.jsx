import React from "react";
import CTA from "../components/CTA.jsx";
import PackageCard from "../components/PackageCard.jsx";

export default function Pricing() {
  const packages = [
    {
      name: "One-Time Website Build",
      bestFor: "You want a solid site and be done with it.",
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

  const addons = [
    { title: "Extra page", price: "$200", desc: "Beyond the standard 4–6 page build" },
    { title: "Copywriting", price: "$400", desc: "I write clean, conversion-focused copy for your site" },
    { title: "Logo cleanup", price: "$200", desc: "Tidy up your existing logo or create a simple brand kit" },
    { title: "Booking integration", price: "$100", desc: "Add a scheduling tool (Calendly, etc.) to your site" },
    { title: "Site migration", price: "$500", desc: "Move your existing site content to the new build" },
  ];

  return (
    <div className="pageMinHeight">

      {/* ── Header ── */}
      <section className="surface heroSurface">
        <div className="section" style={{ paddingTop: 80, paddingBottom: 64 }}>
          <span className="badge">Transparent pricing</span>
          <h1 className="h1" style={{ marginTop: 16, maxWidth: "18ch" }}>
            Clear packages. <span className="accentText">No surprises.</span>
          </h1>
          <p className="p" style={{ maxWidth: 520, fontSize: 17 }}>
            Every package starts with a solid website build. Add ongoing care or marketing if you want it — no pressure, no upsells.
          </p>
        </div>
      </section>

      {/* ── Packages ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-3">
            {packages.map((p) => <PackageCard key={p.name} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── Add-ons ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Add-ons</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>Build exactly what you need</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 32 }}>Keep the base package lean, then add what makes sense for your business.</p>
          <div className="grid cols-3">
            {addons.map((a) => (
              <div className="card" key={a.title}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 12 }}>
                  <h3 className="h3" style={{ marginBottom: 0 }}>{a.title}</h3>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#60a5fa", whiteSpace: "nowrap" }}>{a.price}</span>
                </div>
                <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
