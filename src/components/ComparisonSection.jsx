import React from "react";
import { Link } from "react-router-dom";

const WIX_BULLETS = [
  "$29–36/mo forever — that's $1,000+ over 3 years for a template",
  "Lighthouse performance scores of 50–70 — slow pages that hurt Google rankings",
  "No analytics setup, no Search Console — you're invisible to Google",
  "No AI, no lead capture, no SMS alerts",
  "Support is a help article, not a person",
];

const RXQ_BULLETS = [
  "$499/mo with no setup fee, and the whole build is included",
  "Custom React build: 95+ Lighthouse score, loads fast on mobile and ranks higher",
  "Analytics, Search Console, and a 24/7 AI receptionist, all included",
  "4 blog posts a month, written and published for you",
  "Direct line to Boyd. Text, call, or email, not a help article",
];

function FullComparison() {
  return (
    <div className="grid cols-2" style={{ gap: 24 }}>
      <div className="card cardHighlight">
        <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          RubyxQube Autopilot
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
          RubyxQube Autopilot
        </p>
        <p className="p" style={{ marginBottom: 12 }}>
          <strong style={{ color: "var(--text)" }}>$499/mo, everything included.</strong> Custom design built around your business, an AI receptionist answering at 2am, 4 blog posts a month, and a direct line to Boyd. For most trades, one job you'd otherwise have missed pays for months of it.
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
          $29-36/mo adds up to <strong style={{ color: "var(--text)" }}>$1,000+</strong> for a template you built yourself, that answers nobody after hours, publishes nothing, and hands you a help article when it breaks.
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
