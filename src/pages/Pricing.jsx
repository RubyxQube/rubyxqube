import React from "react";
import CTA from "../components/CTA.jsx";
import PackageCard from "../components/PackageCard.jsx";

export default function Pricing() {
    const packages = [
    {
      name: "🧱 One-Time Website Build",
      bestFor: "You want a solid site and you’re done.",
      price: "$2,000",
      timeline: "2–3 weeks",
      bullets: [
        "4–6 pages (Home, About/Story, Services, Gallery, Get a Quote, Privacy)",
        "Mobile responsive",
        "Contact/quote form + click-to-call buttons",
        "Basic SEO (titles + descriptions)",
        "Google Maps embed (local)",
        "Includes 2 revision rounds",
      ],
    },
    {
      name: "🔁 Website + Monthly Care",
      bestFor: "You want the site maintained for you.",
      price: "$2,000 + $250/mo",
      timeline: "2–3 weeks + ongoing",
      bullets: [
        "Everything in Website Build",
        "Monthly updates (text/photos/services)",
        "Speed & uptime checks",
        "Minor layout tweaks",
        "Light SEO maintenance",
        "Care plan includes up to 60 minutes of updates/month",
      ],
      highlight: true,
    },
    {
      name: "📣 Website + Light Marketing",
      bestFor: "You want more leads and consistent presence.",
      price: "$2,000 + $500/mo",
      timeline: "2–3 weeks + monthly",
      bullets: [
        "Website build included",
        "Google Business Profile setup/optimization",
        "Basic local SEO structure",
        "Marketing plan includes 1–2 posts/month + GBP optimization (no ad management)",
        "Monthly performance check-in",
      ],
    },
  ];

  const addons = [
    { title: "Extra page", price: "$200" },
    { title: "Copywriting help", price: "$400" },
    { title: "Logo cleanup / mini brand kit", price: "$200" },
    { title: "Booking integration", price: "$100" },
    { title: "Site migration", price: "$500" },
  ];

  return (
    <>
      <div className="pageMinHeight">
        <section className="surface section">
          <span className="badge">Clear packages • No confusing fluff</span>
          <h1 className="h1" style={{ marginTop: 12 }}>Pricing</h1>
          <p className="p" style={{ maxWidth: 820 }}>
            You’re buying a professional online presence that brings customers in:
            a clean mobile-friendly site, lead capture, and optional ongoing support.
          </p>

          <div className="grid cols-3">
            {packages.map((p) => <PackageCard key={p.name} {...p} />)}
          </div>

          <div className="hr" />

          <h2 className="h2">Add-ons</h2>
          <p className="p">Keep the build lean, then add what you actually need.</p>
          <div className="grid cols-3">
            {addons.map((a) => (
              <div className="card" key={a.title}>
                <h3 className="h3">{a.title}</h3>
                <p className="p" style={{ marginBottom: 0 }}><strong>{a.price}</strong></p>
              </div>
            ))}
          </div>
        </section>
        <CTA />
      </div>
    </>
  );
}
