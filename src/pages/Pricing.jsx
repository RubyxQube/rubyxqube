import React from "react";
import CTA from "../components/CTA.jsx";
import PackageCard from "../components/PackageCard.jsx";

export default function Pricing() {
  const packages = [
    {
      name: "Launch",
      tagline: "Get your business online professionally.",
      price: "$2,500",
      billing: "one-time",
      bullets: [
        "5–6 page website (Home, About, Services, Gallery, Quote, Privacy)",
        "Mobile responsive — looks great on every device",
        "Contact form + click-to-call buttons",
        "Basic SEO (titles, descriptions, local structure)",
        "Google Maps embed",
        "2 revision rounds included",
      ],
    },
    {
      name: "Autopilot",
      tagline: "Capture every lead — even while you're on a job.",
      price: "$3,000",
      billing: "+ $399/mo",
      bullets: [
        "Everything in Launch",
        "Custom AI receptionist trained on your business",
        "24/7 lead capture — answers questions, qualifies prospects",
        "Unlimited conversations — no per-chat fees",
        "Instant SMS alert when a new lead comes in",
        "Monthly report: visits, chats, leads captured",
        "60 min/month of site updates",
      ],
      highlight: true,
    },
    {
      name: "Momentum",
      tagline: "Actively grow your local presence every month.",
      price: "$3,000",
      billing: "+ $699/mo",
      bullets: [
        "Everything in Autopilot",
        "Google Business Profile management",
        "Local SEO monitoring & updates",
        "Priority same-day edits",
        "Review response management",
        "Monthly 20-min strategy call",
      ],
    },
  ];

  const addons = [
    {
      title: "AI Chatbot Only",
      price: "$500 + $199/mo",
      desc: "Already have a site? We retrofit your existing site with a custom-trained AI receptionist.",
    },
    {
      title: "Domain Setup",
      price: "$75",
      desc: "We register your domain, configure DNS, and connect everything — no tech headaches.",
    },
    {
      title: "Business Email",
      price: "$100 setup",
      desc: "Google Workspace setup so you get you@yourbusiness.com instead of a Gmail address. Looks far more professional.",
    },
    {
      title: "Extra Page",
      price: "$250",
      desc: "Need a page beyond the standard build? Priced per page.",
    },
    {
      title: "Copywriting",
      price: "$500",
      desc: "Professional, conversion-focused copy written for every page of your site.",
    },
    {
      title: "Logo & Brand Kit",
      price: "$350",
      desc: "Clean logo design + color palette + font set. Everything you need to look consistent.",
    },
    {
      title: "Booking Integration",
      price: "$150",
      desc: "Connect Calendly or a similar scheduler so customers can book directly from your site.",
    },
    {
      title: "Site Migration",
      price: "$500",
      desc: "Moving from an old host or builder (Wix, Squarespace, etc.)? We handle the migration.",
    },
  ];

  return (
    <div className="pageMinHeight">

      {/* ── Header ── */}
      <section className="surface heroSurface">
        <div className="section" style={{ paddingTop: 80, paddingBottom: 64 }}>
          <span className="badge">Transparent pricing</span>
          <h1 className="h1" style={{ marginTop: 16, maxWidth: "18ch" }}>
            Simple pricing. <span className="accentText">No surprises.</span>
          </h1>
          <p className="p" style={{ maxWidth: 540, fontSize: 17 }}>
            No contracts, no hidden fees, no upsells. Every package starts with a professional website. Add AI and growth services if you want them.
          </p>
        </div>
      </section>

      {/* ── Packages ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-3">
            {packages.map((p) => <PackageCard key={p.name} {...p} />)}
          </div>
          <p className="p" style={{ marginTop: 28, textAlign: "center", marginBottom: 0 }}>
            Need something outside these packages?{" "}
            <a href="/contact" style={{ color: "var(--accent)", fontWeight: 700, whiteSpace: "nowrap" }}>Let's talk.</a>
          </p>
        </div>
      </section>

      {/* ── vs Wix/Squarespace comparison ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Why not just use Wix?</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>The real cost of DIY website builders</h2>
          <p className="p" style={{ maxWidth: 520, marginBottom: 40 }}>
            Wix and Squarespace look cheap upfront. Over time they're not - and they'll never do what a custom site can.
          </p>
          <div className="grid cols-2" style={{ gap: 24 }}>
            <div className="card" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Wix / Squarespace</p>
              <ul className="list" style={{ margin: 0 }}>
                {[
                  "$29-36/mo forever - that's $1,000+ over 3 years",
                  "You design it yourself, on their schedule",
                  "Template everyone else is also using",
                  "Slow load times that hurt your Google ranking",
                  "No AI, no lead capture, no SMS alerts",
                  "You own nothing - they can change pricing anytime",
                  "Support is a help article, not a person",
                ].map((b) => (
                  <li key={b} style={{ color: "var(--muted)" }}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="card cardHighlight">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>RubyxQube Launch</p>
              <ul className="list" style={{ margin: 0 }}>
                {[
                  "$2,500 once - then it's yours, no monthly bill",
                  "Built for you, around your business",
                  "Custom design no one else has",
                  "Fast, optimized, mobile-first",
                  "AI receptionist available as an add-on",
                  "You own the site and the domain",
                  "Direct line to Boyd - text, call, email",
                ].map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── What's included callout ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "start" }}>
            <div>
              <span className="badge">Every package includes</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 20 }}>What you always get</h2>
              <ul className="list" style={{ margin: 0 }}>
                <li>Professional website built from scratch</li>
                <li>Mobile-first design that works on every device</li>
                <li>Lead capture — contact forms and click-to-call</li>
                <li>Basic SEO so you're not invisible in search</li>
                <li>Fast loading — optimized for performance</li>
                <li>2 rounds of revisions before launch</li>
                <li>Hosted on fast, reliable infrastructure</li>
                <li>Direct communication — you work with Boyd, not a team</li>
              </ul>
            </div>
            <div>
              <span className="badge">Autopilot & Momentum also include</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 20 }}>Ongoing support</h2>
              <ul className="list" style={{ margin: 0 }}>
                <li>Custom AI receptionist trained on your business</li>
                <li>24/7 lead capture — never miss an inquiry</li>
                <li>Real-time SMS alerts when a lead comes in</li>
                <li>Monthly performance report (visits, leads, chats)</li>
                <li>60 minutes of site updates per month</li>
                <li>Weekly check-in via text — you're never in the dark</li>
                <li>Priority response within 4 business hours</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Add-ons ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Add-ons</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>Build exactly what you need</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 36 }}>Keep the base package lean, then add what makes sense for your business.</p>
          <div className="grid cols-2">
            {addons.map((a) => (
              <div className="card" key={a.title}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 16 }}>
                  <h3 className="h3" style={{ marginBottom: 0 }}>{a.title}</h3>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#fb7185", whiteSpace: "nowrap" }}>{a.price}</span>
                </div>
                <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Not sure which package is right for you?"
        subtitle="Send me your current site (or tell me you don't have one) and I'll recommend the right fit — no obligation."
      />
    </div>
  );
}
