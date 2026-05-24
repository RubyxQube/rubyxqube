import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../siteConfig.js";

export default function CTA({
  title = "Ready to get a site that actually brings you customers?",
  subtitle,
}) {
  const subtitleText =
    subtitle ||
    `Tell me what you do in the ${siteConfig.serviceArea}. I'll reply within a business day with a plan and a quote.`;

  const emailHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    `Website Quote Request — ${siteConfig.serviceArea}`
  )}`;

  return (
    <section className="surface" id="quote">
      <div className="section">
        <span className="badge">Let's talk</span>
        <h2 className="h2" style={{ marginTop: 16, maxWidth: "22ch" }}>{title}</h2>
        <p className="p" style={{ maxWidth: 520, marginBottom: 28 }}>{subtitleText}</p>
        <div className="btnRow">
          <Link className="btn primary" to="/quote">Get a Free Quote</Link>
          <a className="btn" href={emailHref}>Send an Email</a>
          <a className="btn" href={`tel:${siteConfig.phoneE164}`}>Call {siteConfig.phoneDisplay}</a>
        </div>
        <p className="small" style={{ marginTop: 16 }}>
          Serving the {siteConfig.serviceArea} and available remotely.
        </p>
      </div>
    </section>
  );
}
