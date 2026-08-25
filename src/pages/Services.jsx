import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, ArrowRight } from "lucide-react";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";

const MONTHLY = [
  "Plain-English monthly report: traffic, leads, chatbot activity",
  "Unlimited edit requests, one active at a time",
  "Google Analytics + Search Console monitored",
  "digital receptionist stays trained as your business changes",
];

const PLANS = [
  {
    name: "Autopilot",
    price: "$499",
    billing: "/mo",
    desc: "Unlimited pages, digital receptionist, 4 blog posts a month, and monthly care. No setup fee.",
    highlight: true,
  },
  {
    name: "Momentum",
    price: "$999",
    billing: "/mo",
    desc: "A developer on your team: custom tools, same-day prototypes, and a weekly strategy call.",
  },
];

export default function Services() {
  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Web Design Services. RubyxQube | Treasure Valley</title>
        <meta name="description" content="Custom websites, digital receptionist chatbots, Google Business Profile management, and local SEO for Treasure Valley small businesses." />
        <meta property="og:title" content="Web Design Services. RubyxQube | Treasure Valley" />
        <meta property="og:description" content="Custom websites, digital receptionist chatbots, Google Business Profile management, and local SEO for Treasure Valley small businesses." />
        <meta property="og:image" content="https://rubyxqube.com/og-default.png" />
        <meta property="og:url" content="https://rubyxqube.com/services" />
        <link rel="canonical" href="https://rubyxqube.com/services" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="surface heroSurface">
        <div className="section" style={{ paddingTop: 80, paddingBottom: 64 }}>
          <span className="badge">What we do</span>
          <h1 className="h1" style={{ marginTop: 16, maxWidth: "20ch" }}>
            A website that works.<br />
            <span className="accentText">A receptionist that never sleeps.</span>
          </h1>
          <p className="p" style={{ maxWidth: 520, fontSize: 17, marginBottom: 8 }}>
            Custom websites and digital receptionists for {siteConfig.serviceArea} service businesses. Built to get you calls, not just look good.
          </p>
          <p className="small" style={{ marginTop: 12 }}>
            The chat button in the bottom-right corner is the exact product. Try it.
          </p>
          <div className="btnRow" style={{ marginTop: 28 }}>
            <Link className="btn primary" to="/contact">Get a Free Audit</Link>
            <Link className="btn" to="/how-it-works">See How It Works</Link>
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">What you get</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 40 }}>Three things that work together.</h2>

          {/* Website */}
          <div className="card featureRow" style={{ marginBottom: 24 }}>
            <div style={{ flex: "1 1 300px" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Custom Website</p>
              <h3 className="h3" style={{ marginBottom: 12 }}>Built from scratch. Fast, mobile-first, built to convert.</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "As many pages as your business needs, built from scratch, not a template",
                  "Mobile-first design that loads fast on any device",
                  "Contact form, click-to-call, Google Maps embed",
                  "Basic on-page SEO, Analytics, and Search Console included",
                ].map(item => (
                  <li key={item} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                    <CheckCircle2 size={14} color="rgba(34,197,94,0.85)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/portfolio" style={{ fontSize: 14, color: "var(--accent)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5 }}>
                See live examples <ArrowRight size={13} />
              </Link>
            </div>
            <div style={{ flex: "1 1 340px" }}>
              <a href="https://pswboise.com" target="_blank" rel="noreferrer">
                <img
                  src="/portfolio/psw-preview.webp"
                  alt="Phoenix Stoneworks website, built by RubyxQube"
                  width={1280}
                  height={720}
                  loading="lazy"
                  style={{ width: "100%", height: "auto", borderRadius: 10, display: "block", aspectRatio: "16/9" }}
                />
              </a>
            </div>
          </div>

          {/* Digital Receptionist */}
          <div className="card featureRow featureRowReverse" style={{ flexDirection: "row-reverse" }}>
            <div style={{ flex: "1 1 300px" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Digital Receptionist</p>
              <h3 className="h3" style={{ marginBottom: 12 }}>Trained on your business. Answering leads while you sleep.</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Trained on your services, pricing, hours, and FAQs",
                  "Captures name, phone, and what they need, 24/7",
                  "Instant SMS + email alert the moment a lead comes in",
                  "Unlimited conversations, no per-chat fees",
                ].map(item => (
                  <li key={item} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                    <CheckCircle2 size={14} color="rgba(34,197,94,0.85)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/how-it-works" style={{ fontSize: 14, color: "var(--accent)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5 }}>
                How it works <ArrowRight size={13} />
              </Link>
            </div>
            <div style={{ flex: "1 1 260px", display: "flex", justifyContent: "center" }}>
              <img
                src="/portfolio/chatbot-preview.webp"
                alt="RubyxQube digital receptionist chatbot widget"
                width={380}
                height={800}
                loading="lazy"
                style={{ width: "100%", maxWidth: 280, height: "auto", borderRadius: 10, display: "block" }}
              />
            </div>
          </div>

          {/* Client Portal */}
          <div className="card featureRow" style={{ marginTop: 24 }}>
            <div style={{ flex: "1 1 300px" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Client Portal</p>
              <h3 className="h3" style={{ marginBottom: 12 }}>Your own login at {siteConfig.appUrl.replace("https://", "")}.</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Update your hours, services, FAQs, and chatbot greeting yourself",
                  "AI-assisted blog editor, built into your dashboard: draft a post, review it, we publish it",
                  "No waiting on us for basic content changes",
                  "Included free with every Autopilot and Momentum plan",
                ].map(item => (
                  <li key={item} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                    <CheckCircle2 size={14} color="rgba(34,197,94,0.85)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ flex: "1 1 260px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src="/portfolio/dashboard-preview.png"
                alt="RubyxQube client portal, business info dashboard"
                style={{ width: "100%", maxWidth: 420, height: "auto", borderRadius: 10, boxShadow: "0 4px 24px rgba(0,0,0,0.12)", display: "block" }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── Monthly care ── */}
      <section className="surface">
        <div className="section">
          <div className="featureRow">
            <div style={{ flex: "1 1 300px" }}>
              <span className="badge">Every month</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>Not a build-and-disappear agency.</h2>
              <p className="p" style={{ marginBottom: 24 }}>
                On Autopilot and Momentum plans, we're in your corner every month: watching the numbers, making updates, and keeping the AI sharp.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                {MONTHLY.map(item => (
                  <li key={item} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                    <CheckCircle2 size={14} color="rgba(34,197,94,0.85)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: 15, lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/how-it-works" style={{ fontSize: 14, color: "var(--accent)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5 }}>
                Full breakdown of what's included <ArrowRight size={13} />
              </Link>
            </div>
            <div style={{ flex: "1 1 300px" }}>
              <img
                src="/portfolio/sudz-preview.webp"
                alt="Client website maintained by RubyxQube"
                width={1280}
                height={720}
                loading="lazy"
                style={{ width: "100%", height: "auto", borderRadius: 10, display: "block", aspectRatio: "16/9" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Pricing</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>Simple, honest pricing.</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 36 }}>No hidden fees. No hourly billing. Pick the level of support that fits where you are.</p>

          <div className="grid cols-2" style={{ maxWidth: 720, margin: "0 auto" }}>
            {PLANS.map(plan => (
              <div key={plan.name} className={`card${plan.highlight ? " cardHighlight" : ""}`} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ minHeight: 32, marginBottom: 8 }}>
                  {plan.highlight && <div className="badge" style={{ alignSelf: "flex-start" }}>Most Popular</div>}
                </div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{plan.name}</p>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 28, fontWeight: 800 }}>{plan.price}</span>
                  <span style={{ fontSize: 14, color: "var(--muted)", marginLeft: 4 }}>{plan.billing}</span>
                </div>
                <p className="p" style={{ flex: 1, marginBottom: 20 }}>{plan.desc}</p>
                <Link className="btn primary" to="/pricing" style={{ textAlign: "center", justifyContent: "center" }}>See Full Details</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}

