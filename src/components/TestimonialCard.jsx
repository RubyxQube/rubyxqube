import React from "react";

export default function TestimonialCard({ quote, name, role }) {
  return (
    <div className="card">
      <p className="p" style={{ marginBottom: 10 }}>"{quote}"</p>
      <div className="small">
        <strong style={{ color: "var(--text)" }}>{name}</strong>
        {role ? ` • ${role}` : ""}
      </div>
    </div>
  );
}
