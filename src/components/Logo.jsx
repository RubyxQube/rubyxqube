/**
 * Logo.jsx — RubyxQube brand mark + wordmark
 *
 * Inline SVG — no image files, perfect scaling at any size.
 * Used in Navbar and Footer. Update siteConfig.brand to change the text.
 *
 * Props:
 *   height     — controls overall size (default 48)
 *   markOnly   — render just the cube mark, no wordmark text
 *   light      — force white text (already default on dark bg)
 */
import React from "react";

export default function Logo({ height = 48, markOnly = false, style = {} }) {
  const markH = height;
  const markW = markH * 0.78;           // cube mark proportional width
  const fontSize = height * 0.40;       // wordmark font size

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: height * 0.22,
        lineHeight: 1,
        userSelect: "none",
        ...style,
      }}
    >
      {/* ── Cube mark ── */}
      <svg
        width={markW}
        height={markH}
        viewBox="0 0 36 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Top face — lightest ruby */}
        <path d="M18 2 L34 11 L18 21 L2 11 Z" fill="#f43f5e" />
        {/* Right face — dark ruby */}
        <path d="M34 11 L34 31 L18 41 L18 21 Z" fill="#9f1239" />
        {/* Left face — mid ruby */}
        <path d="M2 11 L18 21 L18 41 L2 31 Z" fill="#be123c" />
        {/* Top face edge highlight */}
        <path
          d="M18 2 L34 11 L18 21 L2 11 Z"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="0.6"
          fill="none"
        />
      </svg>

      {/* ── Wordmark ── */}
      {!markOnly && (
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', ui-sans-serif, sans-serif",
            fontWeight: 800,
            fontSize: fontSize,
            letterSpacing: "-0.03em",
            color: "rgba(255,255,255,0.93)",
            whiteSpace: "nowrap",
          }}
        >
          Ruby
          <span style={{ color: "#e11d48" }}>x</span>
          Qube
        </span>
      )}
    </div>
  );
}
