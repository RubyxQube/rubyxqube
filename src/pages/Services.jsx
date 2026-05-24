import React from "react";
import CTA from "../components/CTA.jsx";
import FAQ from "../components/FAQ.jsx";
import { siteConfig } from "../siteConfig.js";

export default function Services() {
  const faqs = [
    {
      q: "What does the AI receptionist actually do?",
      a: "It's a chatbot trained specifically on your business — your services, pricing, service area, and FAQs. It greets visitors, answers their questions, captures their info, and sends you an instant SMS notification when a lead comes in. Available 24/7.",
    },
    {
      q: "How is the AI trained on my business?",
      a: "During onboarding we go through your services, pricing, common questions, and service area together. I configure and train the AI on that information. If anything changes, you let me know and I update it.",
    },
    {
      q: "Do you write the content for my site?",
      a: "You provide notes about your business and I write clean, conversion-focused copy. Full copywriting is available as an add-on ($500).",
    },
    {
      q: "What's in the monthly performance report?",
      a: "Every month you get a report showing: website visitors, chatbot conversations, leads captured, form submissions, and any SEO improvements. You see exactly what your site is doing for your business.",
    },
    {
      q: "Can you set up my business email?",
      a: "Yes. Google Workspace setup ($100) gets you a professional @yourbusiness.com email address instead of Gmail. It makes a big difference in how clients perceive you.",
    },
    {
      q: "How fast can you launch?",
      a: "Most sites go live in 2–3 weeks from the kickoff call. The AI setup runs in parallel so it's ready at launch, not after.",
    },
    {
      q: "What if I already have a website?",
      a: "I can rebuild it from scratch, or add the AI receptionist to your existing site ($500 setup + $199/mo). Site migration from Wix, Squarespace, or similar is available for $500.",
    },
    {
      q: "Is the AI chatbot actually AI, or is it scripted?",
      a: "It's real AI — not a decision tree or a canned-response script. It understands natural language and can handle questions you didn't anticipate, because it's built on the same large language models powering tools like ChatGPT. The difference is it's trained specifically on your business, so it gives accurate answers about your services, pricing, and service area — not generic responses.",
    },
    {
      q: "Is there a limit on how many conversations the AI handles?",
      a: "No per-conversation limits or fees. Your AI receptionist is available 24/7 and handles as many chats as your site gets. It's included in the monthly plan.",
    },
    {
      q: "What data does the AI collect from my customers?",
      a: "Only what's necessary to qualify a lead: name, phone or email, and what service they're looking for. That goes straight to you via SMS alert. Chat conversations aren't stored indefinitely — see our privacy policy for full details.",
    },
    {
      q: "Is there a contract?",
      a: "No contracts. Monthly plans are month-to-month. Cancel anytime with 30 days notice.",
    },
  ];

  return (
    <div className="pageMinHeight">

      {/* ── Header ── */}
      <section className="surface heroSurface">
        <div className="section" style={{ paddingTop: 80, paddingBottom: 64 }}>
          <span className="badge">What we do</span>
          <h1 className="h1" style={{ marginTop: 16, maxWidth: "20ch" }}>
            A website that works.<br />
            <span className="accentText">An AI that never stops.</span>
          </h1>
          <p className="p" style={{ maxWidth: 560, fontSize: 17 }}>
            {siteConfig.brand} builds professional websites for {siteConfig.serviceArea} service businesses — paired with an AI receptionist built on Claude that captures leads around the clock and alerts you instantly.
          </p>
          <p className="small" style={{ marginTop: 12, color: "rgba(255,255,255,0.45)" }}>
            Not sure how the AI works? The chat button in the bottom-right corner is the exact same product — try it.
          </p>
        </div>
      </section>

      {/* ── Core services ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Core services</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 36 }}>Everything you need. Nothing you don't.</h2>

          <div className="grid cols-2">

            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Web Development</p>
              <h2 className="h2">Professional Website</h2>
              <p className="p">A clean, fast, mobile-friendly site built to convert visitors into leads — not just look good.</p>
              <ul className="list">
                <li>5–6 pages built from scratch</li>
                <li>Mobile responsive on all devices</li>
                <li>Contact forms + click-to-call buttons</li>
                <li>Basic SEO (titles, descriptions, local structure)</li>
                <li>Google Maps embed for local visibility</li>
                <li>Fast load times — optimized for performance</li>
              </ul>
            </div>

            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>AI Receptionist</p>
              <h2 className="h2">24/7 Lead Capture</h2>
              <p className="p">A custom AI trained on your business that handles inquiries while you're on the job — and alerts you the moment a lead comes in.</p>
              <ul className="list">
                <li>Built on Claude — the same AI behind Claude.ai</li>
                <li>Trained on your services, pricing, and FAQs</li>
                <li>Answers questions and qualifies leads automatically</li>
                <li>Captures name, phone, and what they need</li>
                <li>Instant SMS notification to you when a lead arrives</li>
                <li>Unlimited conversations — no per-chat fees</li>
                <li>Appointment booking integration available</li>
              </ul>
            </div>

            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Reporting & Updates</p>
              <h2 className="h2">Monthly Reports + Care</h2>
              <p className="p">Stay informed without lifting a finger. Every month you get a clear report and a quick check-in so you always know what your site is doing.</p>
              <ul className="list">
                <li>Monthly report: visits, chats, leads, forms</li>
                <li>Weekly check-in text — no surprises</li>
                <li>60 min/month of content updates</li>
                <li>Speed and uptime monitoring</li>
                <li>SEO maintenance and minor layout tweaks</li>
              </ul>
            </div>

            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Growth & Visibility</p>
              <h2 className="h2">Local SEO & Marketing</h2>
              <p className="p">Optional growth services for businesses that want to actively show up in more searches and grow their local reputation.</p>
              <ul className="list">
                <li>Google Business Profile setup & optimization</li>
                <li>Local SEO structure and monitoring</li>
                <li>2 social posts/month (templates + captions)</li>
                <li>Review response management</li>
                <li>Monthly 20-min strategy call</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── Setup services ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Setup services</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>The full picture, handled.</h2>
          <p className="p" style={{ maxWidth: 520, marginBottom: 36 }}>Most clients need more than just a website. Here's everything else we can take off your plate.</p>
          <div className="grid cols-3">
            <div className="card">
              <h3 className="h3">Domain Registration</h3>
              <p className="p" style={{ marginBottom: 0 }}>We register your domain name, configure DNS, and connect it to your site. No confusing dashboards, no tech setup on your end.</p>
            </div>
            <div className="card">
              <h3 className="h3">Business Email</h3>
              <p className="p" style={{ marginBottom: 0 }}>Google Workspace setup so you get you@yourbusiness.com. Instantly looks more professional than a Gmail or Yahoo address.</p>
            </div>
            <div className="card">
              <h3 className="h3">Hosting & Infrastructure</h3>
              <p className="p" style={{ marginBottom: 0 }}>Your site is deployed on fast, reliable hosting. We handle the technical side — you never have to think about servers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">FAQ</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>Common questions</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 36 }}>Still have questions? Reach out — happy to chat.</p>
          <FAQ items={faqs} />
        </div>
      </section>

      <CTA />
    </div>
  );
}
