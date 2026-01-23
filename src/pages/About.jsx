import React from "react";
import CTA from "../components/CTA.jsx";

export default function About() {
  return (
    <>
      <section className="surface section">
        <span className="badge">Short, credible, and client-focused</span>
        <h1 className="h1" style={{ marginTop: 12 }}>About</h1>
        <p className="p" style={{ maxWidth: 860 }}>
          I build clean websites for small businesses that need a professional online presence.
          My focus is simple: mobile-friendly design, clear messaging, and lead capture that turns visitors into customers.
        </p>

        <div className="grid cols-2">
          <div className="card">
            <h2 className="h2">What you get</h2>
            <ul className="list">
              <li>A clean site that looks modern</li>
              <li>Contact form + click-to-call buttons</li>
              <li>Basic SEO setup so you’re not invisible</li>
              <li>A simple process with fast turnaround</li>
            </ul>
          </div>

          <div className="card">
            <h2 className="h2">How I work</h2>
            <ul className="list">
              <li>Quick kickoff call to align on goals</li>
              <li>Build + review with fast revisions</li>
              <li>Launch, then optional monthly care</li>
            </ul>
          </div>
        </div>
        <CTA />
      </section>
    </>
  );
}
