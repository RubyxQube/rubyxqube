import React from "react";
import { Link } from "react-router-dom";

export default function PackageCard({ name, bestFor, price, timeline, bullets, highlight }) {
  return (
    <div className={`card${highlight ? " cardHighlight" : ""}`}>
      {highlight && (
        <div className="badge" style={{ marginBottom: 14 }}>Most Popular</div>
      )}
      <h3 className="h3">{name}</h3>
      <p className="p" style={{ fontSize: 13, marginBottom: 12 }}>{bestFor}</p>
      <div className="hr" />
      <div className="grid cols-2">
        <div className="kpi">
          <strong>{price}</strong>
          <span>Price</span>
        </div>
        <div className="kpi">
          <strong>{timeline}</strong>
          <span>Timeline</span>
        </div>
      </div>
      <ul className="list">
        {bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
      <div style={{ marginTop: "auto", paddingTop: 20 }}>
        <Link className="btn primary" to="/quote" style={{ width: "100%", justifyContent: "center" }}>
          Get Started
        </Link>
      </div>
    </div>
  );
}
