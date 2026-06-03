import React from "react";
import { Link } from "react-router-dom";
import { Zap, MessageSquare, DollarSign, ExternalLink } from "lucide-react";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";
import boydPhoto from "../assets/boyd.webp";

const VALUES = [
  {
    icon: Zap,
    title: "Fast turnaround",
    desc: "Most sites go live in 3–7 days from the kickoff call.",
  },
  {
    icon: MessageSquare,
    title: "Direct communication",
    desc: "You work with me directly — not an account manager.",
  },
  {
    icon: DollarSign,
    title: "Transparent pricing",
    desc: "Flat rates, no hidden fees. You know the number before work starts.",
  },
];

const INDUSTRIES = [
  "Contractors & home services",
  "HVAC, plumbing & electrical",
  "Landscaping & lawn care",
  "Cleaning & janitorial",
  "Stone, masonry & concrete",
  "Window & gutter cleaning",
  "Any local service business",
];

export default function About() {
  return (
    <div className="pageMinHeight">

      {/* ── Hero ── */}
      <section className="surface heroSurface">
        <div className="section" style={{ paddingTop: 80, paddingBottom: 64 }}>
          <span className="badge">About Boyd</span>
          <h1 className="h1" style={{ marginTop: 16, maxWidth: "22ch" }}>
            Built by someone who <span className="accentText">gets it done.</span>
          </h1>
          <p className="p" style={{ maxWidth: 520, fontSize: 17 }}>
            I build websites and AI receptionists for {siteConfig.serviceArea} service businesses — without the agency markup or the months of back-and-forth.
          </p>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="surface">
        <div className="section">
          <div className="featureRow" style={{ gap: 56 }}>

            <div className="photoWrap">
              <img
                src={boydPhoto}
                alt="Boyd Querubin — founder of RubyxQube"
                width={280}
                height={280}
                loading="eager"
                fetchpriority="high"
                style={{ width: 220, height: 220, borderRadius: "50%", display: "block", objectFit: "cover", objectPosition: "center top" }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", maxWidth: 220 }}>
                {[
                  "8 years in marketing",
                  "BA Communications — BYU-Idaho",
                  "Web Dev Certificate — DevMountain",
                ].map(c => (
                  <div key={c} style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", lineHeight: 1.4 }}>{c}</div>
                ))}
              </div>
            </div>

            <div style={{ flex: "1 1 300px" }}>
              <span className="badge" style={{ marginBottom: 16, display: "inline-block" }}>Background</span>
              <h2 className="h2" style={{ marginBottom: 16 }}>More than a web designer.</h2>
              <p className="p">
                With 8 years in marketing and a web development background, I built {siteConfig.brand} around one idea: a website should bring in customers, not just exist. Before this, I co-founded BastionMSP — a managed security provider where I handled the full brand, marketing site, and client portal from scratch.
              </p>
              <p className="p" style={{ marginBottom: 24 }}>
                That experience shaped how I think about every site I build — the copy, the layout, the lead capture flow. Not just "does it look good" but "does it actually convert." Now I apply that to local service businesses across the Treasure Valley and beyond.
              </p>
              <a
                className="btn"
                href="https://www.bastionmsp.com"
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                View BastionMSP <ExternalLink size={13} style={{ marginLeft: 6, verticalAlign: "middle" }} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── Value props ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-3">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <Icon size={20} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h3 className="h3" style={{ marginBottom: 6 }}>{title}</h3>
                  <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who I work with ── */}
      <section className="surface">
        <div className="section">
          <div className="featureRow" style={{ alignItems: "flex-start" }}>

            <div style={{ flex: "1 1 300px" }}>
              <span className="badge" style={{ marginBottom: 16, display: "inline-block" }}>Who I work with</span>
              <h2 className="h2" style={{ marginBottom: 16 }}>Local service businesses that need leads — not just a website.</h2>
              <p className="p" style={{ marginBottom: 24 }}>
                My clients are contractors, tradespeople, and service providers who are great at what they do but don't have time to manage a website. One person, direct communication, fast turnaround.
              </p>
              <Link className="btn primary" to="/contact">Start a Project</Link>
            </div>

            <div style={{ flex: "1 1 260px" }}>
              <div className="pillList">
                {INDUSTRIES.map(ind => (
                  <span key={ind} style={{
                    fontSize: 13, fontWeight: 500,
                    padding: "6px 14px", borderRadius: 99,
                    background: "var(--accent-dim)",
                    border: "1px solid var(--accent-border)",
                    color: "var(--text)",
                  }}>
                    {ind}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTA title="Ready to work together?" subtitle="Tell me what you do and I'll put together a plan. No commitment required." />
    </div>
  );
}
