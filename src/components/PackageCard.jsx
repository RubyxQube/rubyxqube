import React from "react";
import { Link } from "react-router-dom";

export default function PackageCard({ name, tagline, bestFor, price, billing, timeline, bullets, highlight, ctaTo = "/contact", ctaLabel = "Get Started" }) {
  const subtitle = tagline || bestFor;
  const priceSuffix = billing || timeline;

  return (
    <div className={`card${highlight ? " cardHighlight" : ""}`} style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ minHeight: 36, marginBottom: 2 }}>
        {highlight && <div className="badge">Most Popular</div>}
      </div>
      <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{name}</p>
      <h3 className="h3" style={{ marginBottom: 6 }}>{subtitle}</h3>
      <div className="hr" />
      <div style={{ marginBottom: 16 }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: "var(--text)" }}>{price}</span>
        {priceSuffix && (
          <span style={{ fontSize: 14, color: "var(--muted)", marginLeft: 6 }}>{priceSuffix}</span>
        )}
      </div>
      <ul className="list" style={{ flex: 1 }}>
        {bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
      <div style={{ marginTop: 20 }}>
        <Link className="btn primary" to={ctaTo} style={{ width: "100%", justifyContent: "center" }}>
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
