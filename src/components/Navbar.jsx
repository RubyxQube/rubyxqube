import React from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo.jsx";

const navLinkStyle = ({ isActive }) => ({
  borderColor: isActive ? "rgba(225,29,72,0.28)" : "transparent",
  background: isActive ? "rgba(225,29,72,0.10)" : "transparent",
  color: isActive ? "rgba(255,255,255,0.92)" : undefined,
});

export default function Navbar() {
  return (
    <div className="navWrap">
      <div className="navBar">
        <Link className="brand" to="/" aria-label="RubyxQube home">
          <Logo height={42} />
        </Link>

        <nav className="navLinks" aria-label="Primary">
          <NavLink to="/services" style={navLinkStyle}>Services</NavLink>
          <NavLink to="/pricing" style={navLinkStyle}>Pricing</NavLink>
          <NavLink to="/portfolio" style={navLinkStyle}>Portfolio</NavLink>
          <NavLink to="/about" style={navLinkStyle}>About</NavLink>
          <NavLink className="btn primary" to="/quote">Get a Quote</NavLink>
        </nav>
      </div>
    </div>
  );
}
