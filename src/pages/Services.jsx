import React from "react";
import CTA from "../components/CTA.jsx";
import FAQ from "../components/FAQ.jsx";
import { siteConfig } from "../siteConfig.js";

export default function Services() {
  const faqs = [
    {
      q: "What am I actually buying?",
      a: "A professional online presence that brings customers in: a clean mobile site, lead capture, and optional ongoing support.",
    },
    {
      q: "Do you write the content?",
      a: "You can provide notes and photos, and I'll organize them into clean website copy. Full copywriting is available as an add-on.",
    },
    {
      q: "Can you do SEO?",
      a: "I do strong basics: titles, descriptions, local structure, and on-page cleanup. Full SEO campaigns are outside these packages.",
    },
    {
      q: "Can I edit the site myself?",
      a: "Yes. I build it so updating text and photos is straightforward — or stay on a monthly care plan and I handle it for you.",
    },
    {
      q: "How fast can you launch?",
      a: "Most sites launch in 2–3 weeks from the kickoff call. Timeline depends on how quickly you can review and provide feedback.",
    },
    {
      q: "What if I already have a website?",
      a: "I can migrate your existing content, redesign it, or build fresh from scratch. Site migration is available as an add-on.",
    },
  ];

  return (
    <div className="pageMinHeight">

      {/* ── Header ── */}
      <section className="surface heroSurface">
        <div className="section" style={{ paddingTop: 80, paddingBottom: 64 }}>
          <span className="badge">Simple, high-impact services</span>
          <h1 className="h1" style={{ marginTop: 16, maxWidth: "18ch" }}>
            Everything you need. <span className="accentText">Nothing you don't.</span>
          </h1>
          <p className="p" style={{ maxWidth: 540, fontSize: 17 }}>
            {siteConfig.brand} focuses on what actually moves the needle for small service businesses: clean design, clear messaging, and easy ways for customers to contact you.
          </p>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-2">
            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Core service</p>
              <h2 className="h2">Website Build</h2>
              <p className="p">A clean 4–6 page site built to bring in leads — mobile-friendly, fast, and professional.</p>
              <ul className="list">
                <li>Home, About, Services, Gallery, Quote, Privacy pages</li>
                <li>Mobile responsive on all devices</li>
                <li>Contact form + click-to-call buttons</li>
                <li>Basic SEO (titles, descriptions, local structure)</li>
                <li>Google Maps embed for local visibility</li>
                <li>2 rounds of revisions included</li>
              </ul>
            </div>

            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Optional add-on</p>
              <h2 className="h2">Monthly Care</h2>
              <p className="p">Ongoing support so you never have to think about your website again.</p>
              <ul className="list">
                <li>Monthly content updates (text, photos, services)</li>
                <li>Speed & uptime monitoring</li>
                <li>Minor layout and copy changes</li>
                <li>Light SEO maintenance</li>
                <li>Up to 60 minutes of updates per month</li>
              </ul>
            </div>

            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Optional add-on</p>
              <h2 className="h2">Light Marketing</h2>
              <p className="p">A simple monthly system to help you show up locally and stay active online.</p>
              <ul className="list">
                <li>Google Business Profile setup & optimization</li>
                <li>Basic local SEO structure</li>
                <li>1–2 social posts/month (templates + captions)</li>
                <li>Monthly performance check-in</li>
              </ul>
            </div>

            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Available add-ons</p>
              <h2 className="h2">A La Carte</h2>
              <p className="p">Keep the base package lean, then add what you actually need.</p>
              <ul className="list">
                <li>Extra page — $200</li>
                <li>Copywriting help — $400</li>
                <li>Logo cleanup / mini brand kit — $200</li>
                <li>Booking integration — $100</li>
                <li>Site migration from existing host — $500</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">FAQ</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>Common questions</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 32 }}>If you have a question not answered here, just reach out.</p>
          <FAQ items={faqs} />
        </div>
      </section>

      <CTA />
    </div>
  );
}
