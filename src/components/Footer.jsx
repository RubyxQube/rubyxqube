import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { siteConfig } from "../siteConfig.js";

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const NextdoorIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2L2 9.5V22h7v-6h6v6h7V9.5L12 2zm0 2.8l7 5.25V20h-3v-6H8v6H5V10.05L12 4.8z"/>
  </svg>
);

const socialLinks = [
  { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: siteConfig.social.nextdoor, label: "Nextdoor", Icon: NextdoorIcon },
];

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
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                style={{ color: "rgba(255,255,255,0.45)", transition: "color .15s" }}
                onMouseOver={e => e.currentTarget.style.color = "rgba(255,255,255,0.90)"}
                onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Services col */}
        <div className="footerCol">
          <h4>Services</h4>
          <nav className="footerLinks">
            <Link to="/services">What We Build</Link>
            <Link to="/ai-receptionist">AI Receptionist</Link>
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
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Get a Quote</Link>
            <Link to="/report">Sample Report</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
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
