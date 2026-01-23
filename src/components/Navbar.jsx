import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo-withwords-bl.png";

const navLinkStyle = ({ isActive }) => ({
  borderColor: isActive ? "rgba(255,255,255,0.22)" : "transparent",
  background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
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

          <NavLink className="btn primary" to="/quote">
            Get a Quote
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
