import React from "react";
import { Link } from "react-router-dom";
import { XCircle, CheckCircle2, MessageCircle, ClipboardCheck, Smartphone, Clock } from "lucide-react";
import CTA from "../components/CTA.jsx";
import PackageCard from "../components/PackageCard.jsx";
import ComparisonSection from "../components/ComparisonSection.jsx";
import { siteConfig } from "../siteConfig.js";

export default function Home() {
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
      note: "Great starting point. Most clients move to Autopilot before launch once they see what's included.",
    },
    {
      name: "Autopilot",
      tagline: "You handle the jobs. We handle everything else.",
      price: "$3,000",
      billing: "+ $399/mo",
      annualPrice: "$3,990",
      annualSaving: "2 months",
      bullets: [
        "Everything in Launch",
        "Custom AI receptionist trained on your business",
        "24/7 lead capture — answers questions, qualifies prospects",
        "Instant SMS alert when a new lead comes in",
        "Monthly GA4-powered report: traffic, chats, leads captured",
        "60 min/month of site updates",
      ],
      highlight: true,
    },
    {
      name: "Momentum",
      tagline: "Actively grow your local presence every month.",
      price: "$3,000",
      billing: "+ $999/mo",
      annualPrice: "$9,990",
      annualSaving: "2 months",
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

  return (
    <div className="pageMinHeight">

      {/* ── Hero ── */}
      <section className="surface heroSurface">
        <div className="heroSection">
          <span className="badge" style={{ textAlign: "center", marginBottom: 20 }}>Web Design + AI Receptionist<br />{siteConfig.serviceArea} & Beyond</span>
          <h1 className="h1 heroTitle">
            Stop losing leads<br />
            <span className="accentText">while you're with a client.</span>
          </h1>
          <p className="p" style={{ fontSize: 17, maxWidth: 540, marginBottom: 32 }}>
            {siteConfig.brand} builds professional websites with a built-in AI receptionist that captures leads 24/7, answers customer questions, and sends you instant alerts — so you never miss a job opportunity.
          </p>
          <div className="btnRow">
            <Link className="btn primary" to="/contact">Get a Free Audit</Link>
            <a className="btn" href={`tel:${siteConfig.phoneE164}`}>Call {siteConfig.phoneDisplay}</a>
            <Link className="btn" to="/pricing">See Pricing</Link>
          </div>

          <div className="hr" style={{ marginTop: 52 }} />

          <div className="grid cols-3">
            <div className="kpi">
              <strong>24/7 Lead Capture</strong>
              <span>Your AI receptionist works nights, weekends, and holidays — no breaks</span>
            </div>
            <div className="kpi">
              <strong>Instant SMS Alerts</strong>
              <span>Get a text the moment a lead comes in, with their name and what they need</span>
            </div>
            <div className="kpi">
              <strong>Live in Days</strong>
              <span>From kickoff call to launched site in as little as 3 days — zero tech headaches</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "center" }}>
            <div>
              <span className="badge">The problem</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>
                You're losing jobs to businesses that respond faster.
              </h2>
              <p className="p">
                Most service businesses miss leads every single day. A customer searches for a plumber at 9pm, finds your site, fills out a form — and you don't see it until tomorrow morning. By then they've already called someone else.
              </p>
              <p className="p" style={{ marginBottom: 0 }}>
                The businesses winning local search aren't necessarily better at their trade. They're just faster to respond. An AI receptionist changes that overnight.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="card" style={{ borderLeft: "3px solid rgba(239,68,68,0.50)" }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}><XCircle size={17} color="#ef4444" strokeWidth={2} />Without AI Receptionist</p>
                <p className="p" style={{ margin: "8px 0 0", fontSize: 14 }}>Customer visits at 10pm. No one responds. They call your competitor. You wake up to nothing.</p>
              </div>
              <div className="card" style={{ borderLeft: "3px solid rgba(59,130,246,0.60)" }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}><CheckCircle2 size={17} color="var(--accent)" strokeWidth={2} />With AI Receptionist</p>
                <p className="p" style={{ margin: "8px 0 0", fontSize: 14 }}>Customer visits at 10pm. AI greets them, answers their questions, captures their info. You get a text: "New lead — Sarah, needs HVAC repair, Meridian."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Receptionist Feature ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">AI Receptionist</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>
            Meet your new <span className="accentText">24/7 employee.</span>
          </h2>
          <p className="p" style={{ maxWidth: 520, marginBottom: 40 }}>
            Built with AI and trained on your specific business — your services, pricing, service area, and FAQs. It handles the front desk so you can focus on the work.
          </p>

          <div className="grid cols-3">
            <div className="card">
              <MessageCircle size={26} color="var(--accent)" strokeWidth={1.75} style={{ display: "block", marginBottom: 14 }} />
              <h3 className="h3">Answers questions instantly</h3>
              <p className="p" style={{ marginBottom: 0 }}>Knows your services, pricing, service area, and hours. Handles the most common questions without you lifting a finger.</p>
            </div>
            <div className="card">
              <ClipboardCheck size={26} color="var(--accent)" strokeWidth={1.75} style={{ display: "block", marginBottom: 14 }} />
              <h3 className="h3">Qualifies and captures leads</h3>
              <p className="p" style={{ marginBottom: 0 }}>Asks the right questions — what do they need, where are they located, when do they need it. Saves it all so you have everything before you call back.</p>
            </div>
            <div className="card">
              <Smartphone size={26} color="var(--accent)" strokeWidth={1.75} style={{ display: "block", marginBottom: 14 }} />
              <h3 className="h3">Alerts you in real time</h3>
              <p className="p" style={{ marginBottom: 0 }}>The moment a lead comes in, you get a text. Name, contact info, what they need, and when. No checking dashboards, no missed emails.</p>
            </div>
            <div className="card">
              <Clock size={26} color="var(--accent)" strokeWidth={1.75} style={{ display: "block", marginBottom: 14 }} />
              <h3 className="h3">Never off the clock</h3>
              <p className="p" style={{ marginBottom: 0 }}>Works nights, weekends, and holidays. No sick days, no vacations, no missed calls when you're on a job.</p>
            </div>
          </div>
        </div>
      </section>


      <ComparisonSection condensed />

      {/* ── After launch ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">After day one</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>
            Launch gets you live.<br />
            <span className="accentText">Autopilot keeps you growing.</span>
          </h2>
          <p className="p" style={{ maxWidth: 520, marginBottom: 40 }}>
            Your business will change. Services, prices, photos, hours. The question is who handles it when it does.
          </p>
          <div className="grid cols-2" style={{ gap: 24 }}>
            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>After Launch</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  ["Site goes live. Boyd's job is done.", false],
                  ["Need to update a service or price? New invoice from someone who doesn't know your setup.", false],
                  ["Site goes down at midnight? You find out when a customer tells you.", false],
                  ["Lead comes in at 9pm. No one answers. They call your competitor.", false],
                  ["Want to know how your site is performing? Log in somewhere and figure it out.", false],
                ].map(([text]) => (
                  <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <XCircle size={16} color="var(--muted)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                    <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card cardHighlight">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>After Autopilot</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Site goes live. Boyd is still on your team.",
                  "Need a change? Text Boyd. Done same day, already included.",
                  "Site goes down? Uptime monitoring catches it before your customers do.",
                  "Lead comes in at 9pm. AI greets them, captures their info, texts you instantly.",
                  "Monthly report lands in your inbox. No logins, no dashboards.",
                ].map((text) => (
                  <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <CheckCircle2 size={16} color="var(--accent)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                    <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Pricing</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>Simple, honest pricing.</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 36 }}>No contracts, no hidden fees. Every package starts with a professional website build.</p>
          <div className="grid cols-3">
            {packages.map((p) => (
              <PackageCard key={p.name} {...p} />
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Start with a free audit — no commitment."
        subtitle="Send me your current site (or tell me you don't have one) and I'll tell you exactly what's costing you leads and how to fix it."
      />
    </div>
  );
}
