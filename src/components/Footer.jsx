import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../siteConfig.js";
import Logo from "./Logo.jsx";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footerWrap">
      <div className="footerInner">
        <div className="footerBrand">
          <Logo height={36} />
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
