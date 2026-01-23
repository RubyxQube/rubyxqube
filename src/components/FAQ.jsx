import React from "react";

export default function FAQ({ items }) {
  return (
    <div className="grid cols-2">
      {items.map((it) => (
        <div className="card" key={it.q}>
          <h3 className="h3">{it.q}</h3>
          <p className="p" style={{ marginBottom: 0 }}>{it.a}</p>
        </div>
      ))}
    </div>
  );
}
