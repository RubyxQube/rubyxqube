import React from "react";

export default function PackageCard({ name, bestFor, price, timeline, bullets, highlight }) {
  return (
    <div className="card" style={{ borderColor: highlight ? "rgba(255,255,255,0.24)" : "rgba(255,255,255,0.12)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
        <h3 className="h3">{name}</h3>
        {/* {highlight && <span className="badge">Most Popular</span>} */}
      </div>
      <p className="p" style={{ marginBottom: 10 }}><strong>Best for:</strong> {bestFor}</p>
      <div className="hr" />
      <div className="grid cols-2">
        <div className="kpi">
          <strong>{price}</strong>
          <span>Pricing</span>
        </div>
        <div className="kpi">
          <strong>{timeline}</strong>
          <span>Timeline</span>
        </div>
      </div>
      <ul className="list">
        {bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
    </div>
  );
}
