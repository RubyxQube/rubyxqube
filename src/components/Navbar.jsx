import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import Logo from "./Logo.jsx";

const LINKS = [
  { to: "/services", label: "Services" },
  { to: "/pricing",  label: "Pricing"  },
  { to: "/designs",  label: "Designs"  },
  { to: "/portfolio",label: "Portfolio" },
  { to: "/about",    label: "About"    },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div className="navWrap">
        <div className="navBar">
          {/* Logo */}
          <Link className="brand" to="/" aria-label="RubyxQube home">
            <Logo height={40} />
          </Link>

          {/* Desktop nav */}
          <nav className="navLinks" aria-label="Primary">
            {LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                style={({ isActive }) => ({
                  borderColor: isActive ? "rgba(225,29,72,0.28)" : "transparent",
                  background: isActive ? "rgba(225,29,72,0.10)" : "transparent",
                  color: isActive ? "rgba(255,255,255,0.92)" : undefined,
                })}
              >
                {label}
              </NavLink>
            ))}
            <NavLink className="btn primary navCta" to="/contact">Free Audit</NavLink>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="navHamburger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              // X icon
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              // Hamburger icon
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="mobileMenu" role="dialog" aria-label="Navigation menu">
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className="mobileLink"
                style={({ isActive }) => ({
                  background: isActive ? "rgba(225,29,72,0.10)" : "transparent",
                  color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.70)",
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
        </div>
      )}
    </>
  );
}
