import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo-withwords-wh.png";

const navLinkStyle = ({ isActive }) => ({
  borderColor: isActive ? "rgba(59,130,246,0.28)" : "transparent",
  background: isActive ? "rgba(59,130,246,0.12)" : "transparent",
  color: isActive ? "rgba(255,255,255,0.92)" : undefined,
});

export default function Navbar() {
  return (
    <div className="navWrap">
      <div className="navBar">
        <Link className="brand" to="/">
          <img src={logo} alt="Qube Solutions logo" className="logo" />
        </Link>

        <nav className="navLinks" aria-label="Primary">
          <NavLink to="/services" style={navLinkStyle}>Services</NavLink>
          <NavLink to="/pricing" style={navLinkStyle}>Pricing</NavLink>
          <NavLink to="/portfolio" style={navLinkStyle}>Portfolio</NavLink>
          <NavLink to="/about" style={navLinkStyle}>About</NavLink>

          <NavLink className="btn primary" to="/quote">
            Get a Quote
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
