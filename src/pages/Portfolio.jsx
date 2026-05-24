import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../siteConfig.js";
import CTA from "../components/CTA.jsx";

export default function Portfolio() {
  return (
    <div className="pageMinHeight">

      {/* ── Header ── */}
      <section className="surface heroSurface">
        <div className="section" style={{ paddingTop: 80, paddingBottom: 64 }}>
          <span className="badge">Recent work</span>
          <h1 className="h1" style={{ marginTop: 16, maxWidth: "18ch" }}>
            Sites built for <span className="accentText">real businesses</span>
          </h1>
          <p className="p" style={{ maxWidth: 520, fontSize: 17 }}>
            Every project is built from scratch — clean, fast, and focused on turning visitors into customers.
          </p>
        </div>
      </section>

      {/* ── Work ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-2">

            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Stoneworks · Treasure Valley</p>
              <h2 className="h2">Phoenix Stoneworks</h2>
              <p className="p">
                Website built to help a local stoneworks company look professional online and make it easy for customers to request estimates.
              </p>
              <ul className="list">
                <li>Mobile-friendly layout</li>
                <li>Clear service positioning</li>
                <li>Conversion-focused calls to action</li>
                <li>Quote and estimate flow</li>
              </ul>
              <div className="hr" />
              <div className="btnRow">
                <a className="btn primary" href="https://phoenix-stoneworks.com" target="_blank" rel="noreferrer">
                  Visit Site
                </a>
                <Link className="btn" to="/quote">Build Something Similar</Link>
              </div>
            </div>

            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Your business · {siteConfig.serviceArea}</p>
              <h2 className="h2">Want a site like this?</h2>
              <p className="p">
                If you're a service business in the {siteConfig.serviceArea}, I can build you a clean, fast site that actually brings in leads.
              </p>
              <p className="p">Send me your business name, city, and what you do — I'll reply with a plan and a quote.</p>
              <div className="btnRow">
                <Link className="btn primary" to="/quote">Get a Quote</Link>
                <Link className="btn" to="/pricing">View Pricing</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTA title="Ready to be the next project?" subtitle="Most sites launch in 2–3 weeks. Let's get yours started." />
    </div>
  );
}
