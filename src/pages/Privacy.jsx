import React from "react";
import { siteConfig } from "../siteConfig.js";

export default function Privacy() {
  return (
    <div className="pageMinHeight">
      <section className="surface section">
        <h1 className="h1">Privacy Policy</h1>
        <p className="p">
          This is a simple starter privacy policy. Customize it to match the tools you use (analytics, forms, etc.).
        </p>

        <div className="card">
          <h2 className="h2">Information we collect</h2>
          <ul className="list">
            <li>Contact information you submit (name, email, message)</li>
            <li>Basic usage data if analytics is enabled</li>
          </ul>

          <div className="hr" />

          <h2 className="h2">How we use it</h2>
          <ul className="list">
            <li>To respond to your inquiry</li>
            <li>To improve the website experience</li>
          </ul>

          <div className="hr" />

          <h2 className="h2">Contact</h2>
          <p className="p" style={{ marginBottom: 0 }}>
            Questions? Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </div>
      </section>
    </div>
  );
}
