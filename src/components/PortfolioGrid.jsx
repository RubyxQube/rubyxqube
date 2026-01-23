import React from "react";

export default function PortfolioGrid({ items }) {
  return (
    <div className="grid cols-3">
      {items.map((it) => (
        <div className="card" key={it.title}>
          <div className="badge">{it.tag}</div>
          <h3 className="h3" style={{ marginTop: 10 }}>{it.title}</h3>
          <p className="p"><strong>Goal:</strong> {it.goal}</p>
          <p className="p"><strong>What I built:</strong> {it.built}</p>
          <p className="p" style={{ marginBottom: 0 }}><strong>Result:</strong> {it.result}</p>
        </div>
      ))}
    </div>
  );
}
