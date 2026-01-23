import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../siteConfig.js";

export default function CTA({
  title = "Ready for a website that brings customers in?",
  subtitle,
}) {
  const subtitleText =
    subtitle ||
    `Tell me what you do in the ${siteConfig.serviceArea}. I’ll reply with a simple plan and a quote.`;

  const emailHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    `Website Quote Request -${siteConfig.serviceArea}`
  )}`;

  return (
    <section className="surface section" id="quote">
      <span className="badge">Fast, clean, mobile-friendly</span>
      <h2 className="h2" style={{ marginTop: 10 }}>{title}</h2>
      <p className="p">{subtitleText}</p>
      <section className="surface section ctaBlock">
        <div className="btnRow">
          <Link className="btn primary" to="/quote">Get a Quote</Link>
          <a className="btn" href={emailHref}>Email Me</a>
          <a className="btn" href={`tel:${siteConfig.phoneE164}`}>Call</a>
        </div>
      </section>
      <p className="small" style={{ marginTop: 10 }}>
        Serving {siteConfig.serviceArea}. Email: {siteConfig.email} • Phone: {siteConfig.phoneDisplay}
      </p>
    </section>
  );
}
