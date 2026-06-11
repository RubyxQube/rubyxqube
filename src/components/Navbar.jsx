import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Logo from "./Logo.jsx";

const LINKS = [
  { to: "/services", label: "Services" },
  { to: "/pricing",  label: "Pricing"  },
  {
    label: "Work",
    children: [
      { to: "/portfolio",       label: "Portfolio"         },
      { to: "/ai-receptionist", label: "AI Receptionist"   },
      { to: "/designs",         label: "Pick Your Style"   },
    ],
  },
  {
    label: "Company",
    children: [
      { to: "/about",        label: "About Boyd"   },
      { to: "/how-it-works", label: "How It Works" },
      { to: "/blog",         label: "Blog"         },
      { to: "/audit",        label: "Free Audit"   },
    ],
  },
];

/* ── Icons ── */
const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="2"  x2="12" y2="4"/>
    <line x1="12" y1="20" x2="12" y2="22"/>
    <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="2"  y1="12" x2="4"  y2="12"/>
    <line x1="20" y1="12" x2="22" y2="12"/>
    <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
    <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

/* ── Dropdown item ── */
function DropdownMenu({ label, children, pathname }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isActive = children.some(c => pathname.startsWith(c.to));

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="navDropdown">
      <button
        className="navDropdownTrigger"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          borderColor: isActive ? "rgba(225,29,72,0.28)" : "transparent",
          background:  isActive ? "rgba(225,29,72,0.10)" : "transparent",
          color:       isActive ? "rgba(255,255,255,0.92)" : undefined,
        }}
      >
        {label}
        <ChevronDown size={13} style={{ marginLeft: 4, transition: "transform 0.15s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>

      {open && (
        <div className="navDropdownMenu">
          {children.map(({ to, label: childLabel }) => (
            <NavLink
              key={to}
              to={to}
              className="navDropdownItem"
              onClick={() => setOpen(false)}
              style={({ isActive: a }) => ({
                color: a ? "var(--accent)" : undefined,
                background: a ? "var(--accent-dim)" : undefined,
              })}
            >
              {childLabel}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Navbar ── */
export default function Navbar({ theme = "dark", onToggle }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const toggleLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  const ToggleIcon  = theme === "dark" ? SunIcon : MoonIcon;

  // Flat list for mobile drawer
  const allLinks = LINKS.flatMap(l => l.children || [l]);

  return (
    <>
      <div className="navWrap">
        <div className="navBar">
          <Link className="brand" to="/" aria-label="RubyxQube home">
            <Logo height={40} />
          </Link>

          {/* Desktop nav */}
          <nav className="navLinks" aria-label="Primary">
            {LINKS.map((link) =>
              link.children ? (
                <DropdownMenu key={link.label} label={link.label} children={link.children} pathname={pathname} />
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  style={({ isActive }) => ({
                    borderColor: isActive ? "rgba(225,29,72,0.28)" : "transparent",
                    background:  isActive ? "rgba(225,29,72,0.10)" : "transparent",
                    color:       isActive ? "rgba(255,255,255,0.92)" : undefined,
                  })}
                >
                  {link.label}
                </NavLink>
              )
            )}
            <button className="themeToggle" onClick={onToggle} aria-label={toggleLabel}>
              <ToggleIcon />
            </button>
            <NavLink className="btn primary navCta" to="/contact">Free Audit</NavLink>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="navHamburger"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer — all links flat */}
      {open && (
        <div className="mobileMenu" role="dialog" aria-label="Navigation menu">
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {allLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className="mobileLink"
                style={({ isActive }) => ({
                  background: isActive ? "rgba(225,29,72,0.10)" : "transparent",
                  color:      isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.70)",
                  borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                })}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div style={{ paddingTop: 12 }}>
            <Link
              to="/contact"
              className="btn primary"
              style={{ display: "flex", justifyContent: "center", width: "100%", padding: "14px" }}
            >
              Free Audit
            </Link>
          </div>

          <button className="mobileThemeToggle" onClick={onToggle} aria-label={toggleLabel}>
            <ToggleIcon />
            <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
          </button>
        </div>
      )}
    </>
  );
}
