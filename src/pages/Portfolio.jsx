import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../siteConfig.js";

export default function Portfolio() {
  return (
    <div className="pageMinHeight">
      <section className="surface section">
        <span className="badge">Recent work</span>
        <h1 className="h1" style={{ marginTop: 12 }}>Portfolio</h1>
        <p className="p" style={{ maxWidth: 820 }}>
          A few examples of real work. More projects will be added as they launch.
        </p>

        <div className="grid cols-2">
          <div className="card">
            <h2 className="h2" style={{ marginBottom: 6 }}>Phoenix Stoneworks</h2>
            <p className="p" style={{ marginBottom: 10 }}>
              Website + quote calculator experience designed to help customers request estimates faster.
            </p>

            <div className="btnRow">
              <a className="btn primary" href="https://phoenix-stoneworks.com" target="_blank" rel="noreferrer">
                Visit Website
              </a>
              <Link className="btn" to="/quote">Request Something Similar</Link>
            </div>

            <div className="hr" />

            <ul className="list">
              <li>Mobile-friendly layout</li>
              <li>Clear service positioning</li>
              <li>Conversion-focused calls to action</li>
              <li>Quote/estimate flow emphasis</li>
            </ul>
          </div>

          <div className="card">
            <h2 className="h2">What I can build for you</h2>
            <p className="p">
              If you’re in the {siteConfig.serviceArea}, I can build a clean, fast website that converts visitors into leads.
            </p>

            <ul className="list">
              <li>Website Build: $2,000 one-time</li>
              <li>Monthly Care: + $250/mo</li>
              <li>Light Marketing: + $500/mo</li>
            </ul>

            <div className="btnRow">
              <Link className="btn primary" to="/quote">Get a Quote</Link>
            </div>

            <p className="small" style={{ marginTop: 10, marginBottom: 0 }}>
              Want your site to feel like this example? Send your business name + city and I’ll reply with a plan.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
