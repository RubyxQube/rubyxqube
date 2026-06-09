import React from "react";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, XCircle } from "lucide-react";
import CTA from "../components/CTA.jsx";
import PackageCard from "../components/PackageCard.jsx";
import ComparisonSection from "../components/ComparisonSection.jsx";

export default function Pricing() {
  const packages = [
    {
      name: "Launch",
      tagline: "Get your business online professionally.",
      price: "$1,200",
      billing: "one-time",
      bullets: [
        "5–6 page website (Home, About, Services, Gallery, Quote, Privacy)",
        "Mobile responsive — looks great on every device",
        "Contact form + click-to-call buttons",
        "Basic SEO (titles, descriptions, local structure)",
        "Google Maps embed",
        "2 revision rounds included",
      ],
      note: "Site is yours to keep. No monthly commitment, no ongoing support. A great fit if you already have someone to manage it — otherwise Autopilot is the better deal.",
    },
    {
      name: "Autopilot",
      tagline: "You handle the jobs. We handle everything else.",
      price: "$399",
      billing: "/mo",
      annualPrice: "$3,990",
      annualSaving: "2 months free",
      bullets: [
        "No setup fee — 5–10 page custom site, built and launched",
        "Analytics + Search Console setup included",
        "Custom AI receptionist — answers questions, captures leads 24/7",
        "Unlimited conversations, no per-chat fees",
        "Instant SMS alert on every new lead",
        "Monthly report: traffic, chats, leads captured",
        "60 min/month of site updates",
      ],
      highlight: true,
    },
    {
      name: "Momentum",
      tagline: "A developer on your team, without the payroll.",
      price: "$999",
      billing: "/mo",
      annualPrice: "$9,990",
      annualSaving: "2 months free",
      bullets: [
        "Everything in Autopilot",
        "Developer on call, same-day prototypes, 2-day turnaround on bigger builds",
        "Unlimited edits and new pages, no monthly cap",
        "Custom tools: calculators, estimators, intake forms, and more",
        "Google Business Profile management",
        "Monthly AI receptionist tuning",
        "Weekly check-in call (30–60 min)",
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
      desc: "Connect Cal.com or a similar scheduler so customers can book directly from your site.",
    },
    {
      title: "Site Migration",
      price: "$500",
      desc: "Moving from an old host or builder (Wix, Squarespace, etc.)? We handle the migration.",
    },
  ];

  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Pricing — RubyxQube | Treasure Valley Web Design</title>
        <meta name="description" content="Transparent pricing for Treasure Valley small businesses. Launch from $1,200 one-time. Autopilot from $399/mo includes a custom site, AI receptionist, and monthly reports." />
        <meta property="og:title" content="Pricing — RubyxQube | Treasure Valley Web Design" />
        <meta property="og:description" content="Transparent pricing for Treasure Valley small businesses. Launch from $1,200 one-time. Autopilot from $399/mo includes a custom site, AI receptionist, and monthly reports." />
      </Helmet>

      {/* ── Header ── */}
      <section className="surface heroSurface">
        <div className="section" style={{ paddingTop: 80, paddingBottom: 64 }}>
          <span className="badge">Transparent pricing</span>
          <h1 className="h1" style={{ marginTop: 16 }}>
            Simple pricing.<span className="mobileBreak" /> <span className="accentText">No surprises.</span>
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

      <ComparisonSection />

      {/* ── Autopilot math breakdown ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">The math</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>
            What $399/mo actually buys you
          </h2>
          <p className="p" style={{ maxWidth: 540, marginBottom: 40 }}>
            Try piecing together what Autopilot includes on your own. You'll spend more and still not have someone who knows your site.
          </p>
          <div className="grid cols-2" style={{ gap: 24 }}>
            <div className="card cardHighlight">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Autopilot — all of it, included</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                {[
                  "Site updates — text Boyd, done same day",
                  "Custom AI receptionist trained on your business",
                  "Uptime monitoring built in",
                  "Monthly GA4-powered report to your inbox",
                  "One person who knows your entire setup",
                ].map((label) => (
                  <div key={label} style={{ display: "flex", gap: 10, alignItems: "flex-start", borderBottom: "1px solid var(--accent-dim)", paddingBottom: 10 }}>
                    <CheckCircle2 size={14} color="var(--accent)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 14 }}>{label}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>Total</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: "var(--accent)" }}>$399/mo</span>
              </div>
            </div>
            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Building it yourself</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                {[
                  ["Freelancer for site updates (avg 2x/mo)", "$300-600/mo"],
                  ["AI chatbot tool (separate service)", "$199/mo"],
                  ["Uptime monitoring service", "$20/mo"],
                  ["Monthly analytics reporting", "$50-100/mo"],
                  ["Someone who already knows your setup", "Not possible"],
                ].map(([label, cost]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, borderBottom: "1px solid var(--line)", paddingBottom: 10 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <XCircle size={14} color="var(--muted)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 14, color: "var(--muted)" }}>{label}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)", whiteSpace: "nowrap" }}>{cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>Total</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>$569-919/mo</span>
              </div>
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
