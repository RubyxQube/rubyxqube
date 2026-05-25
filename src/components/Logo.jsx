/**
 * Logo.jsx — RubyxQube brand mark + wordmark
 *
 * Inline SVG — no image files, perfect scaling at any size.
 * Used in Navbar, Footer, and exported to PNG via scripts/export-logos.mjs
 *
 * Props:
 *   height   — controls overall size (default 48)
 *   markOnly — render just the cube mark, no wordmark text
 *   layout   — "horizontal" (default) | "stacked"
 *   tagline  — optional tagline string, e.g. "Website • AI"
 */
import React from "react";

export default function Logo({
  height = 48,
  markOnly = false,
  layout = "horizontal",
  tagline = null,
  style = {},
}) {
  const markH = height;
  const markW = markH * 0.78;
  const fontSize = height * 0.40;
  const stackedFontSize = height * 0.21;   // smaller ratio for stacked layout
  const tagSize  = height * 0.165;
  const stackedTagSize  = height * 0.10;   // smaller tagline for stacked

  // Unique IDs so multiple Logo instances on the same page don't conflict
  const uid = React.useId().replace(/:/g, "");

  /* ── Cube mark SVG ── */
  const cubeMark = (
    <svg
      width={markW}
      height={markH}
      viewBox="0 0 36 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Top face — bright apex → ruby */}
        <linearGradient id={`${uid}-top`} x1="18" y1="2" x2="18" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#ff5c7a" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>

        {/* Right face — mid-ruby → deep shadow */}
        <linearGradient id={`${uid}-right`} x1="34" y1="11" x2="18" y2="41" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#c0112f" />
          <stop offset="100%" stopColor="#5e0b1c" />
        </linearGradient>

        {/* Left face — ruby → dark */}
        <linearGradient id={`${uid}-left`} x1="2" y1="11" x2="18" y2="41" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#e11d48" />
          <stop offset="100%" stopColor="#800e25" />
        </linearGradient>

        {/* Ambient glow */}
        <filter id={`${uid}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feColorMatrix in="blur" type="matrix"
            values="1 0 0 0 0.88
                    0 0 0 0 0.11
                    0 0 0 0 0.28
                    0 0 0 0.55 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip to both side faces for the X lines */}
        <clipPath id={`${uid}-clipSides`}>
          <path d="M2 11 L18 21 L34 11 L34 31 L18 41 L2 31 Z" />
        </clipPath>
      </defs>

      <g filter={`url(#${uid}-glow)`}>
        {/* Three faces */}
        <path d="M18 2 L34 11 L18 21 L2 11 Z"  fill={`url(#${uid}-top)`}   />
        <path d="M34 11 L34 31 L18 41 L18 21 Z" fill={`url(#${uid}-right)`} />
        <path d="M2 11 L18 21 L18 41 L2 31 Z"   fill={`url(#${uid}-left)`}  />

        {/* Faint X across side faces */}
        <g clipPath={`url(#${uid}-clipSides)`}>
          <line x1="2"  y1="11" x2="34" y2="31" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" />
          <line x1="34" y1="11" x2="2"  y2="31" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" />
        </g>

        {/* Edge highlights */}
        <path d="M18 2 L2 11"   stroke="rgba(255,255,255,0.40)" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M18 2 L34 11"  stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" strokeLinecap="round" />
        <path d="M18 21 L18 41" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6" strokeLinecap="round" />
        <path d="M2 31 L18 41"  stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" strokeLinecap="round" />

        {/* Apex shine */}
        <path d="M18 2 L24 5.5 L18 9 L12 5.5 Z" fill="rgba(255,255,255,0.13)" />

        {/* Top face rim */}
        <path d="M18 2 L34 11 L18 21 L2 11 Z" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" fill="none" />
      </g>
    </svg>
  );

  /* ── Wordmark ── */
  const wordmarkEl = !markOnly && (
    <span
      style={{
        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, sans-serif",
        fontWeight: 800,
        fontSize,
        letterSpacing: "-0.03em",
        color: "rgba(255,255,255,0.93)",
        whiteSpace: "nowrap",
        lineHeight: 1,
      }}
    >
      Ruby<span style={{ color: "#e11d48" }}>x</span>Qube<sup style={{ fontSize: "0.42em", fontWeight: 700, letterSpacing: 0, color: "rgba(255,255,255,0.45)", verticalAlign: "super", lineHeight: 0 }}>™</sup>
    </span>
  );

  /* ── Tagline ── */
  const taglineEl = tagline && (
    <span
      style={{
        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, sans-serif",
        fontWeight: 400,
        fontSize: tagSize,
        letterSpacing: "0.18em",
        color: "rgba(255,255,255,0.28)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        lineHeight: 1,
      }}
    >
      {tagline}
    </span>
  );

  /* ── Stacked layout ── */
  if (layout === "stacked") {
    return (
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: height * 0.05,
          lineHeight: 1,
          userSelect: "none",
          ...style,
        }}
      >
        {cubeMark}
        {!markOnly && (
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', ui-sans-serif, sans-serif",
              fontWeight: 800,
              fontSize: stackedFontSize,
              letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.93)",
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}
          >
            Ruby<span style={{ color: "#e11d48" }}>x</span>Qube<sup style={{ fontSize: "0.42em", fontWeight: 700, letterSpacing: 0, color: "rgba(255,255,255,0.45)", verticalAlign: "super", lineHeight: 0 }}>™</sup>
          </span>
        )}
        {tagline && (
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', ui-sans-serif, sans-serif",
              fontWeight: 400,
              fontSize: stackedTagSize,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.28)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              lineHeight: 1,
              marginTop: height * 0.02,
            }}
          >
            {tagline}
          </span>
        )}
      </div>
    );
  }

  /* ── Horizontal layout (default) ── */
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
      {cubeMark}
      {!markOnly && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: height * 0.07 }}>
          {wordmarkEl}
          {taglineEl}
        </div>
      )}
    </div>
  );
}
