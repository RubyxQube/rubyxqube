import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../siteConfig.js";

export default function CTA({
  title    = "Ready to get a site that actually brings you customers?",
  subtitle,
  ctaLabel = "Book Free Audit",
  ctaTo    = "/contact",
}) {
  const subtitleText =
    subtitle ||
    `Tell me what you do in the ${siteConfig.serviceArea}. I'll come to the call with a plan already built.`;

  return (
    <section className="surface" id="cta">
      <div className="section">
        <span className="badge">Let's talk</span>
        <h2 className="h2" style={{ marginTop: 16, maxWidth: "22ch" }}>{title}</h2>
        <p className="p" style={{ maxWidth: 520, marginBottom: 28 }}>{subtitleText}</p>
        <div className="btnRow">
          <Link className="btn primary" to={ctaTo}>{ctaLabel}</Link>
          <a className="btn" href={`tel:${siteConfig.phoneE164}`}>Call {siteConfig.phoneDisplay}</a>
        </div>
        <p className="small" style={{ marginTop: 16 }}>
          Serving the {siteConfig.serviceArea} and available remotely.
        </p>
      </div>
    </section>
  );
}
