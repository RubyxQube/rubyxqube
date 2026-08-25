import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Camera, Calculator, Users, User, MessageCircle, CheckCircle2, ArrowLeft, ExternalLink } from "lucide-react";
import CTA from "../components/CTA.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import { siteConfig } from "../siteConfig.js";

const TECH_STACK = [
  { label: "React + Vite", detail: "Frontend: fast, custom, no WordPress bloat" },
  { label: "Claude API (Anthropic)", detail: "Digital receptionist, trained on their business" },
  { label: "Supabase", detail: "Database, authentication, wholesale portal" },
  { label: "Vercel", detail: "Hosting + serverless functions" },
];

const FEATURES = [
  {
    icon: <Camera size={26} color="var(--accent)" strokeWidth={1.75} />,
    title: "Square Foot Estimator",
    body: "Most people asking for a countertop quote do not know their square footage, and that one unknown stops the whole conversation. They photograph their counter with a sheet of paper on it for scale, and get a square footage range back in seconds. It feeds straight into the quote calculator.",
    tag: "Removes the blocker on every quote",
  },
  {
    icon: <Calculator size={26} color="var(--accent)" strokeWidth={1.75} />,
    title: "Interactive Quote Calculator",
    body: "Room by room, kitchen, bathroom or outdoor kitchen, they pick a stone from the real Cosentino catalogue, enter square footage, and add sinks, faucets and backsplash. It prices tear-out, fabrication, edge profiles and cutouts and shows a running total. They arrive at the call already knowing the number.",
    tag: "Self-serve estimation",
  },
  {
    icon: <Users size={26} color="var(--accent)" strokeWidth={1.75} />,
    title: "Wholesale Partner Tools",
    body: "Approved contractors and builders sign in to the same site and see cost pricing instead of retail, plus a labour calculator for tear-out, fabrication and install. Manny grants and removes that access himself from his own dashboard. B2B and B2C in one site rather than two.",
    tag: "B2B and B2C in one platform",
  },
  {
    icon: <User size={26} color="var(--accent)" strokeWidth={1.75} />,
    title: "Client Account System",
    body: "Customers create an account to save quotes and materials, upload sketches and floor plans of their space, and follow their job through template, fabrication and install. Powered by Supabase auth: no third-party login, no per-seat fees.",
    tag: "Supabase Auth",
  },
  {
    icon: <MessageCircle size={26} color="var(--accent)" strokeWidth={1.75} />,
    title: "Digital Receptionist",
    body: "Trained on Phoenix Stoneworks' own materials, service area, hours and FAQs, and updated from their dashboard without a redeploy. It answers questions around the clock, and the moment it has a name, a contact and what they need, it texts Manny. By the time he calls back, the lead is already qualified.",
    tag: "24/7 lead capture",
  },
];

export default function PhoenixStoneworks() {
  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Phoenix Stoneworks Case Study. RubyxQube | Custom Web Platform for a Boise Countertop Fabricator</title>
        <meta name="description" content="How RubyxQube built a custom web platform for Phoenix Stoneworks, a Boise stone countertop fabricator: instant quote calculator, wholesale partner tools, 3D walkthrough, and a digital receptionist that captures leads around the clock." />
        <meta property="og:title" content="Phoenix Stoneworks Case Study. RubyxQube" />
        <meta property="og:description" content="Custom web platform for a Boise stone countertop fabricator: quote calculator, wholesale partner tools, 3D walkthrough, digital receptionist." />
        <meta property="og:image" content="https://rubyxqube.com/portfolio/psw-preview.webp" />
        <meta property="og:url" content="https://rubyxqube.com/work/phoenix-stoneworks" />
        <link rel="canonical" href="https://rubyxqube.com/work/phoenix-stoneworks" />
      </Helmet>

      {/* ── Back link ── */}
      <section className="surface" style={{ paddingBottom: 0 }}>
        <div className="section" style={{ paddingBottom: 0 }}>
          <Link to="/portfolio" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}
            onMouseOver={e => e.currentTarget.style.color = "var(--text)"}
            onMouseOut={e => e.currentTarget.style.color = "var(--muted)"}
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>
        </div>
      </section>

      {/* ── Header ── */}
      <section className="surface heroSurface">
        <div className="heroSection">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 20 }}>
            <span className="badge">Case Study</span>
            <span className="badge">Stone Countertops</span>
            <span className="badge">Boise, Idaho</span>
          </div>
          <h1 className="h1 heroTitle">Phoenix Stoneworks</h1>
          <p className="p" style={{ fontSize: 18, maxWidth: 600, marginBottom: 32 }}>
            A custom web platform for a Boise stone countertop fabricator: instant quoting, a 3D kitchen walkthrough, wholesale partner tools, and a receptionist that answers at 2am.
          </p>
          <div className="btnRow">
            <a className="btn primary" href="https://pswboise.com" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              Visit pswboise.com <ExternalLink size={14} />
            </a>
            <Link className="btn" to="/contact">Build something like this</Link>
          </div>
        </div>
      </section>

      {/* ── Project snapshot ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-4" style={{ gap: 16 }}>
            {[
              { label: "Client", value: "Phoenix Stoneworks" },
              { label: "Industry", value: "Stone Countertops" },
              { label: "Location", value: "Boise, Idaho" },
              { label: "Plan", value: "Momentum" },
            ].map(({ label, value }) => (
              <div key={label} className="card" style={{ textAlign: "center", padding: "18px 14px" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px" }}>{label}</p>
                <p style={{ fontWeight: 700, fontSize: 15, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Measured results ────────────────────────────────────────────────
          Every number here was measured, not estimated. The load times come
          from three runs per page against the live site throttled to Slow 4G
          with a 4x CPU slowdown, which is the Lighthouse mobile profile: an
          unthrottled headless browser reported 0.25s and that would have been
          a flattering lie about what a customer in a driveway experiences.

          The lead numbers are NOT here yet on purpose. They live in Supabase
          and need a secret key to read: run `npm run case-study` and paste the
          output back. Do not fill this section with plausible-sounding figures
          in the meantime; an invented metric on a client case study is the one
          mistake there is no coming back from. */}
      <section className="surface">
        <div className="section">
          <span className="badge">Measured, not estimated</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>How it performs</h2>
          <p className="p" style={{ maxWidth: 620, marginBottom: 32 }}>
            Tested on the live site at mobile speeds, throttled to a slow 4G connection
            on a mid-range phone. Google treats anything under 2.5 seconds as good.
          </p>
          <div className="grid cols-3" style={{ gap: 16 }}>
            {[
              { v: "0.9s", l: "Quote calculator loads", s: "The page that makes them money" },
              { v: "1.2s", l: "Home page loads", s: "Under half of Google's 2.5s threshold" },
              { v: "1.0s", l: "Gallery loads", s: "234 stone options, still fast" },
            ].map(({ v, l, s }) => (
              <div key={l} className="card" style={{ padding: "22px 18px" }}>
                <p style={{ fontSize: 34, fontWeight: 800, margin: "0 0 4px", color: "var(--accent)", letterSpacing: "-0.02em" }}>{v}</p>
                <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 4px" }}>{l}</p>
                <p className="p" style={{ fontSize: 13.5, margin: 0 }}>{s}</p>
              </div>
            ))}
          </div>
          <p className="p" style={{ fontSize: 13, marginTop: 18, marginBottom: 0 }}>
            Measured {new Date("2026-08-25").toLocaleDateString("en-US", { month: "long", year: "numeric" })} against pswboise.com,
            median of three runs per page at 1.6 Mbps with a 4x CPU slowdown.
          </p>
        </div>
      </section>

      {/* ── The challenge ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "flex-start" }}>
            <div>
              <span className="badge">The challenge</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>
                A growing company with no digital presence, and customers who needed answers before calling.
              </h2>
              <p className="p">
                Phoenix Stoneworks was operating entirely through word-of-mouth and referrals. No website, no way for new customers to understand their services, no way to get an estimate without picking up the phone.
              </p>
              <p className="p" style={{ marginBottom: 0 }}>
                What made this project unique: countertop customers almost always want to see it and price it before committing. The goal wasn't just a web presence, it was a platform that let customers self-serve through discovery and get into the sales pipeline without waiting for a callback.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "No existing website or digital presence",
                "Customers needed pricing direction before calling",
                "Wholesale contractors needed a separate experience",
                "Owner was fielding every inquiry manually",
                "Competitors were faster to respond to late-night searches",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <CheckCircle2 size={16} color="var(--accent)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                  <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What we built ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">What we built</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>
            Five interconnected tools, one unified platform.
          </h2>
          <p className="p" style={{ maxWidth: 560, marginBottom: 40 }}>
            This wasn't a brochure site with a contact form. It was a complete digital platform designed to handle every customer interaction from discovery to estimate to account management.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {FEATURES.map(({ icon, title, body, tag }) => (
              <div key={title} className="card" style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flex: "1 1 400px" }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>{icon}</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
                      <h3 className="h3" style={{ margin: 0 }}>{title}</h3>
                      <span className="badge" style={{ fontSize: 11 }}>{tag}</span>
                    </div>
                    <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech stack ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Tech stack</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 32 }}>Built for speed and flexibility, no WordPress, no plugins.</h2>
          <div className="grid cols-2" style={{ gap: 16 }}>
            {TECH_STACK.map(({ label, detail }) => (
              <div key={label} className="card" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", flexShrink: 0, marginTop: 6 }} />
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>{label}</p>
                  <p className="p" style={{ marginBottom: 0, fontSize: 13 }}>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What it unlocked ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">The outcome</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 32 }}>
            From zero online presence to a platform that works around the clock.
          </h2>
          <div className="grid cols-3">
            {[
              { title: "Self-serve estimation", body: "Customers can get a ballpark estimate at any hour, including nights and weekends when the owner is unavailable." },
              { title: "Qualified leads on autopilot", body: "The digital receptionist captures name, contact, and project details before any human interaction. Every lead comes pre-qualified." },
              { title: "B2B + B2C under one roof", body: "Wholesale contractors have their own portal with custom pricing. Retail customers have the public-facing site. One codebase, two experiences." },
            ].map(({ title, body }) => (
              <div key={title} className="card">
                <h3 className="h3" style={{ marginBottom: 10 }}>{title}</h3>
                <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client testimonial */}
      <section className="surface">
        <div className="section">
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>
            From the client
          </p>
          <div style={{ maxWidth: 600 }}>
            <TestimonialCard
              quote="Boyd has been wonderful to work with. His expertise in his field, and ability to bring ideas to life has been a game changer for me and my business! He's quick to reply, and incredibly easy to work with. He approaches things with a problem solving perspective."
              name="Manny Araujo"
              role="Owner, Phoenix Stoneworks"
            />
          </div>
        </div>
      </section>

      <CTA
        title="Want something like this for your business?"
        subtitle="Whether you need a simple digital receptionist or a full custom platform, start with a free audit and we'll tell you exactly what's possible."
      />
    </div>
  );
}
