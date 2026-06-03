import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { siteConfig } from "../siteConfig.js";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footerWrap">
      <div className="footerInner">

        {/* Brand col */}
        <div className="footerBrand">
          <Logo height={36} />
          <p>
            AI-powered websites for local service businesses in the Treasure Valley — and beyond.
          </p>
          <a
            href={`tel:${siteConfig.phoneE164}`}
            style={{ fontSize: 13, color: "rgba(255,255,255,0.50)", transition: "color .1s" }}
            onMouseOver={e => e.target.style.color = "rgba(255,255,255,0.90)"}
            onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.50)"}
          >
            {siteConfig.phoneDisplay}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            style={{ fontSize: 13, color: "rgba(255,255,255,0.50)", transition: "color .1s" }}
            onMouseOver={e => e.target.style.color = "rgba(255,255,255,0.90)"}
            onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.50)"}
          >
            {siteConfig.email}
          </a>
        </div>

        {/* Services col */}
        <div className="footerCol">
          <h4>Services</h4>
          <nav className="footerLinks">
            <Link to="/services">What We Build</Link>
            <Link to="/pricing">Packages & Pricing</Link>
            <Link to="/audit">Free Website Audit</Link>
            <Link to="/portfolio">Portfolio</Link>
          </nav>
        </div>

        {/* Company col */}
        <div className="footerCol">
          <h4>Company</h4>
          <nav className="footerLinks">
            <Link to="/about">About Boyd</Link>
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/contact">Get a Quote</Link>
            <Link to="/report">Sample Report</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <a href={siteConfig.googleReviewUrl} target="_blank" rel="noreferrer">Leave a Review</a>
          </nav>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footerBottom">
        <span>© {year} RubyxQube LLC. All rights reserved. RubyxQube™ is a trademark of RubyxQube LLC.</span>
        <span>Boise, Idaho · Serving the {siteConfig.serviceArea} & beyond</span>
      </div>
    </footer>
  );
}
