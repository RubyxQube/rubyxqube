/**
 * Logo.jsx — RubyxQube brand mark + wordmark
 *
 * Inline SVG — no image files, perfect scaling at any size.
 * Used in Navbar and Footer.
 *
 * Props:
 *   height     — controls overall size (default 48)
 *   markOnly   — render just the cube mark, no wordmark text
 */
import React from "react";

export default function Logo({ height = 48, markOnly = false, style = {} }) {
  const markH = height;
  const markW = markH * 0.78;
  const fontSize = height * 0.40;

  // Unique IDs so multiple instances on the same page don't conflict
  const uid = React.useId().replace(/:/g, "");

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
        <defs>
          {/* Top face — bright apex fading to ruby */}
          <linearGradient id={`${uid}-top`} x1="18" y1="2" x2="18" y2="21" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#ff5c7a" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>

          {/* Right face — mid-ruby to deep shadow */}
          <linearGradient id={`${uid}-right`} x1="34" y1="11" x2="18" y2="41" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#c0112f" />
            <stop offset="100%" stopColor="#5e0b1c" />
          </linearGradient>

          {/* Left face — ruby to dark */}
          <linearGradient id={`${uid}-left`} x1="2" y1="11" x2="18" y2="41" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#e11d48" />
            <stop offset="100%" stopColor="#800e25" />
          </linearGradient>

          {/* Ambient glow behind the whole cube */}
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
        </defs>

        <g filter={`url(#${uid}-glow)`}>
          {/* ── Three faces ── */}
          {/* Top face */}
          <path d="M18 2 L34 11 L18 21 L2 11 Z" fill={`url(#${uid}-top)`} />
          {/* Right face */}
          <path d="M34 11 L34 31 L18 41 L18 21 Z" fill={`url(#${uid}-right)`} />
          {/* Left face */}
          <path d="M2 11 L18 21 L18 41 L2 31 Z"  fill={`url(#${uid}-left)`} />

          {/* ── Edge highlights ── */}
          {/* Top-left edge — brightest catch-light */}
          <path d="M18 2 L2 11" stroke="rgba(255,255,255,0.40)" strokeWidth="0.9" strokeLinecap="round" />
          {/* Top-right edge — subtler */}
          <path d="M18 2 L34 11" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" strokeLinecap="round" />
          {/* Center vertical spine */}
          <path d="M18 21 L18 41" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6" strokeLinecap="round" />
          {/* Bottom-left base edge */}
          <path d="M2 31 L18 41" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" strokeLinecap="round" />

          {/* ── Apex shine — small bright diamond at the top ── */}
          <path d="M18 2 L24 5.5 L18 9 L12 5.5 Z" fill="rgba(255,255,255,0.13)" />

          {/* ── Top face inner rim (very subtle) ── */}
          <path
            d="M18 2 L34 11 L18 21 L2 11 Z"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="0.5"
            fill="none"
          />
        </g>
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
