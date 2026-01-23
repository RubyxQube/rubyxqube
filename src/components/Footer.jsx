import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../siteConfig.js";
import logo from "../assets/logo-withwords-bl.png";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footerWrap">
      <div className="footerInner">
        <div className="footerBrand">
          <img className="footerLogo" src={logo} alt={`${siteConfig.brand} logo`} />
          <span>© {year} {siteConfig.brand}. All rights reserved.</span>
        </div>

        <div className="footerLinks">
          <Link to="/privacy">Privacy</Link>
          <Link to="/quote">Get a Quote</Link>
        </div>
      </div>
    </footer>
  );
}
