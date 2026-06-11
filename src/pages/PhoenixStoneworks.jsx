import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Camera, Calculator, Users, User, MessageCircle, CheckCircle2, ArrowLeft, ExternalLink } from "lucide-react";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";

const TECH_STACK = [
  { label: "React + Vite", detail: "Frontend — fast, custom, no WordPress bloat" },
  { label: "Claude API (Anthropic)", detail: "AI photo estimate + AI receptionist" },
  { label: "Supabase", detail: "Database, authentication, wholesale portal" },
  { label: "Vercel", detail: "Hosting + serverless functions" },
];

const FEATURES = [
  {
    icon: <Camera size={26} color="var(--accent)" strokeWidth={1.75} />,
    title: "AI Photo Estimate Tool",
    body: "Customers upload a photo of their space — a patio, fireplace, kitchen counters — and the AI analyzes it and generates a ballpark estimate in seconds. This was the first AI-powered stone estimate tool deployed for a Boise contractor. Customers get an answer at 11pm without waiting for a callback.",
    tag: "First-of-kind in Boise",
  },
  {
    icon: <Calculator size={26} color="var(--accent)" strokeWidth={1.75} />,
    title: "Interactive Quote Calculator",
    body: "A custom calculator that walks customers through their project type (patio, retaining wall, countertop, etc.), dimensions, and material preferences — then returns a real-time material + labor estimate with a CTA to request a formal quote. Dramatically reduces back-and-forth on discovery calls.",
    tag: "Self-serve estimation",
  },
  {
    icon: <Users size={26} color="var(--accent)" strokeWidth={1.75} />,
    title: "Wholesale Contractor Portal",
    body: "A password-protected portal for Phoenix Stoneworks' wholesale and contractor clients. Custom pricing tiers, project history, invoice access, and material ordering — a separate digital experience for their B2B customers without building a separate site.",
    tag: "B2B + B2C in one platform",
  },
  {
    icon: <User size={26} color="var(--accent)" strokeWidth={1.75} />,
    title: "Client Account System",
    body: "End customers can create accounts to track project progress, view estimates and invoices, and communicate with the team. Powered by Supabase auth — no third-party login required, no subscription fees.",
    tag: "Supabase Auth",
  },
  {
    icon: <MessageCircle size={26} color="var(--accent)" strokeWidth={1.75} />,
    title: "AI Receptionist",
    body: "A Claude-powered chatbot trained on Phoenix Stoneworks' full service menu — stone types, project categories, service area, pricing ranges, and FAQs. Captures leads 24/7 and fires an instant SMS to the owner. By the time a customer calls, they've already been qualified.",
    tag: "24/7 lead capture",
  },
];

export default function PhoenixStoneworks() {
  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Phoenix Stoneworks Case Study — RubyxQube | AI Web Platform for Boise Masonry</title>
        <meta name="description" content="How RubyxQube built a full AI-powered web platform for Phoenix Stoneworks in Boise — including an AI photo estimate tool, quote calculator, wholesale portal, and 24/7 AI receptionist." />
        <meta property="og:title" content="Phoenix Stoneworks Case Study — RubyxQube" />
        <meta property="og:description" content="Full AI-powered web platform for a Boise masonry company — AI photo estimate, quote calculator, wholesale portal, AI receptionist." />
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
            <span className="badge">Masonry & Stone</span>
            <span className="badge">Boise, Idaho</span>
          </div>
          <h1 className="h1 heroTitle">Phoenix Stoneworks</h1>
          <p className="p" style={{ fontSize: 18, maxWidth: 600, marginBottom: 32 }}>
            A full AI-powered web platform for a Boise masonry and stone company — including the first AI photo estimate tool deployed for a Treasure Valley contractor.
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
              { label: "Industry", value: "Masonry & Stone" },
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

      {/* ── The challenge ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "flex-start" }}>
            <div>
              <span className="badge">The challenge</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>
                A growing company with no digital presence — and customers who needed answers before calling.
              </h2>
              <p className="p">
                Phoenix Stoneworks was operating entirely through word-of-mouth and referrals. No website, no way for new customers to understand their services, no way to get an estimate without picking up the phone.
              </p>
              <p className="p" style={{ marginBottom: 0 }}>
                What made this project unique: stone and masonry customers almost always want to visualize and estimate before committing. The goal wasn't just a web presence — it was a platform that let customers self-serve through discovery and get into the sales pipeline without waiting for a callback.
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
            Five interconnected tools — one unified platform.
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
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 32 }}>Built for speed and flexibility — no WordPress, no plugins.</h2>
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
              { title: "Self-serve estimation", body: "Customers can get a ballpark estimate at any hour — including nights and weekends when the owner is unavailable." },
              { title: "Qualified leads on autopilot", body: "The AI receptionist captures name, contact, and project details before any human interaction. Every lead comes pre-qualified." },
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

      <CTA
        title="Want something like this for your business?"
        subtitle="Whether you need a simple AI receptionist or a full custom platform — start with a free audit and we'll tell you exactly what's possible."
      />
    </div>
  );
}
