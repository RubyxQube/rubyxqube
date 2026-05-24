import React from "react";
import { Link } from "react-router-dom";

export default function PackageCard({ name, tagline, bestFor, price, billing, timeline, bullets, highlight }) {
  const subtitle = tagline || bestFor;
  const priceSuffix = billing || timeline;

  return (
    <div className={`card${highlight ? " cardHighlight" : ""}`} style={{ display: "flex", flexDirection: "column" }}>
      {highlight && (
        <div className="badge" style={{ marginBottom: 14 }}>Most Popular</div>
      )}
      <p style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{name}</p>
      <h3 className="h3" style={{ marginBottom: 6 }}>{subtitle}</h3>
      <div className="hr" />
      <div style={{ marginBottom: 16 }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: "rgba(255,255,255,0.92)" }}>{price}</span>
        {priceSuffix && (
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.50)", marginLeft: 6 }}>{priceSuffix}</span>
        )}
      </div>
      <ul className="list" style={{ flex: 1 }}>
        {bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
      <div style={{ marginTop: 20 }}>
        <Link className="btn primary" to="/quote" style={{ width: "100%", justifyContent: "center" }}>
          Get Started
        </Link>
      </div>
    </div>
  );
}
