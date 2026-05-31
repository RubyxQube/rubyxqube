import React from "react";
import { Link } from "react-router-dom";

const WIX_BULLETS = [
  "$29-36/mo forever - that's $1,000+ over 3 years",
  "You design it yourself, on their schedule",
  "Template everyone else is also using",
  "Slow load times that hurt your Google ranking",
  "No Google Analytics setup - you figure it out yourself",
  "No Search Console - Google may not even find your site",
  "No Google Business Profile help",
  "No AI, no lead capture, no SMS alerts",
  "You own nothing - they can change pricing anytime",
  "Support is a help article, not a person",
];

const RXQ_BULLETS = [
  "$2,500 once - then it's yours, no monthly bill",
  "Built for you, around your business",
  "Custom design no one else has",
  "Fast, optimized, mobile-first",
  "Google Analytics 4 set up and verified on every build",
  "Google Search Console verified + sitemap submitted",
  "Google Business Profile management (Momentum plan)",
  "AI receptionist available as an add-on",
  "You own the site and the domain",
  "Direct line to Boyd - text, call, email",
];

function FullComparison() {
  return (
    <div className="grid cols-2" style={{ gap: 24 }}>
      <div className="card cardHighlight">
        <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          RubyxQube Launch
        </p>
        <ul className="list" style={{ margin: 0 }}>
          {RXQ_BULLETS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
      <div className="card" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          Wix / Squarespace
        </p>
        <ul className="list" style={{ margin: 0 }}>
          {WIX_BULLETS.map((b) => (
            <li key={b} style={{ color: "var(--muted)" }}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CondensedComparison() {
  return (
    <div className="card" style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ flex: "1 1 280px" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
          RubyxQube Launch
        </p>
        <p className="p" style={{ marginBottom: 12 }}>
          <strong style={{ color: "var(--text)" }}>$2,500 once.</strong> Custom design, Google Analytics and Search Console set up on day one, Google Business Profile managed for you, and a direct line to Boyd - not a help article.
        </p>
        <Link to="/pricing" style={{ color: "var(--accent)", fontWeight: 700, fontSize: 14 }}>
          See the full comparison
        </Link>
      </div>
      <div style={{ width: 1, background: "var(--line)", alignSelf: "stretch", flexShrink: 0 }} />
      <div style={{ flex: "1 1 280px" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
          Wix / Squarespace over 3 years
        </p>
        <p className="p" style={{ marginBottom: 0 }}>
          $29-36/mo adds up to <strong style={{ color: "var(--text)" }}>$1,000+</strong> - for a template you built yourself, with no analytics setup, no Search Console, no Google Business Profile help, and no real support.
        </p>
      </div>
    </div>
  );
}

export default function ComparisonSection({ condensed = false }) {
  return (
    <section className="surface">
      <div className="section">
        <span className="badge">Why not just use Wix?</span>
        <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>
          The real cost of DIY website builders
        </h2>
        {!condensed && (
          <p className="p" style={{ maxWidth: 520, marginBottom: 40 }}>
            Wix and Squarespace look cheap upfront. Over time they're not - and they'll never do what a custom site can.
          </p>
        )}
        <div style={{ marginTop: condensed ? 24 : 0 }}>
          {condensed ? <CondensedComparison /> : <FullComparison />}
        </div>
      </div>
    </section>
  );
}
