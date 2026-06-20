import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Camera, MessageCircle, BarChart3 } from "lucide-react";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";

const FAQ = [
  { q: "Can you show before/after photos on a landscaping site?", a: "Yes — portfolio galleries with before/after photos are a standard feature we build into landscaping sites. We optimize the images for fast loading (WebP format) while keeping the quality high." },
  { q: "Can the AI receptionist handle seasonal service questions?", a: "Absolutely. We train it with your seasonal services — spring cleanup, irrigation startup, summer maintenance, fall leaf removal, winter snow removal — and update it as your offerings change." },
  { q: "My busiest time is spring. Can you get a site live before then?", a: "Yes. Most Autopilot sites go live within 1–2 weeks of the kickoff call. Tell us your deadline and we'll build around it." },
  { q: "Can you build service area maps into the site?", a: "Yes — we can embed a Google Maps service area visualization and make the site's service area language specific to your coverage zones (cities, zip codes, or radius)." },
  { q: "Do landscaping sites need different SEO than other service businesses?", a: "Partly. Seasonal keywords matter a lot — searches like 'spring cleanup Meridian' spike in March/April. We structure the site to rank for both year-round and seasonal terms." },
];

export default function LandscapingWebDesign() {
  const [open, setOpen] = useState(null);

  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Landscaping Web Design — Boise, Idaho | RubyxQube</title>
        <meta name="description" content="Custom websites for landscaping companies in Boise and the Treasure Valley. Portfolio galleries, AI lead capture, seasonal SEO. Starting at $399/mo, no setup fee." />
        <meta property="og:title" content="Landscaping Web Design Boise Idaho — RubyxQube" />
        <meta property="og:description" content="Custom websites with portfolio galleries and AI lead capture for Treasure Valley landscaping companies." />
        <meta property="og:image" content="https://rubyxqube.com/og-default.png" />
        <meta property="og:url" content="https://rubyxqube.com/web-design-landscaping" />
        <link rel="canonical" href={`${siteConfig.siteUrl}/web-design-landscaping`} />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", "name": siteConfig.brand, "url": `${siteConfig.siteUrl}/web-design-landscaping`, "telephone": siteConfig.phoneDisplay, "email": siteConfig.email, "address": { "@type": "PostalAddress", "addressLocality": "Boise", "addressRegion": "ID", "addressCountry": "US" }, "areaServed": siteConfig.serviceArea, "serviceType": "Landscaping Web Design" })}</script>
      </Helmet>

      <section className="surface heroSurface">
        <div className="heroSection">
          <span className="badge" style={{ marginBottom: 20 }}>Landscaping Web Design — Treasure Valley</span>
          <h1 className="h1 heroTitle">
            Landscaping websites that show your work<br />
            <span className="accentText">and capture the next job.</span>
          </h1>
          <p className="p" style={{ fontSize: 17, maxWidth: 560, marginBottom: 32 }}>
            A great landscaping company earns trust with photos. We build custom portfolio-forward sites with built-in AI lead capture — so your best work is selling for you around the clock.
          </p>
          <div className="btnRow">
            <Link className="btn primary" to="/contact">Get a Free Audit</Link>
            <Link className="btn" to="/pricing">See Pricing</Link>
          </div>
          <div className="hr" style={{ marginTop: 44 }} />
          <div className="grid cols-4">
            <div className="kpi"><strong>1–2 week launch</strong><span>From kickoff call to live site</span></div>
            <div className="kpi"><strong>No setup fee</strong><span>Month-to-month, cancel anytime</span></div>
            <div className="kpi"><strong>24/7 AI coverage</strong><span>Leads captured nights and weekends</span></div>
            <div className="kpi"><strong>Seasonal SEO</strong><span>Seasonal keywords built into every page</span></div>
          </div>
        </div>
      </section>

      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "center" }}>
            <div>
              <span className="badge">What landscaping clients need</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>Homeowners hire based on what they see — your site is your portfolio.</h2>
              <p className="p">Landscaping is visual. Before a homeowner calls, they want to see your work — not read a list of services. A site with strong before/after photos and a clean gallery converts at dramatically higher rates than a text-heavy template site.</p>
              <p className="p" style={{ marginBottom: 0 }}>And with spring cleanup and lawn care searches spiking seasonally, having a site that ranks for Boise-area landscaping terms — and captures visitors when you're out on a job — is the difference between a full calendar and an empty one.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Customers decide based on photos — not service descriptions",
                "Seasonal demand spikes mean fast ranking = more calls",
                "Most landscaping competitors are on outdated or template sites",
                "After-hours visitors need to be captured before they call someone else",
                "Portfolio galleries increase time-on-site and conversion rates",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <CheckCircle2 size={15} color="rgba(34,197,94,0.85)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                  <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="surface" style={{ background: "transparent" }}>
        <div className="section">
          <span className="badge">What we build for landscaping</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 40 }}>Portfolio-forward design with the lead capture to back it up.</h2>
          <div className="grid cols-2" style={{ gap: 24 }}>
            {[
              { num: "01", icon: <Camera size={22} color="var(--accent)" strokeWidth={1.75} />, title: "Before/after portfolio galleries", body: "Image-optimized, fast-loading galleries that showcase your best work. Organized by project type — lawn care, hardscaping, irrigation, seasonal cleanup — so visitors find what they're looking for." },
              { num: "02", icon: <MessageCircle size={22} color="var(--accent)" strokeWidth={1.75} />, title: "AI receptionist trained on your services", body: "Handles 'do you do spring cleanup?' at 9pm on a Sunday. Captures leads with name, contact info, and what they need — and texts you immediately." },
              { num: "03", icon: <BarChart3 size={22} color="var(--accent)" strokeWidth={1.75} />, title: "Seasonal SEO", body: "Pages optimized for both year-round terms ('landscaping Boise') and seasonal high-intent searches ('spring yard cleanup Meridian', 'fall leaf removal Nampa'). Search Console setup from day one." },
              { num: "04", icon: <CheckCircle2 size={22} color="var(--accent)" strokeWidth={1.75} />, title: "Service packages and pricing pages", body: "Clear service tiers — weekly maintenance, monthly care, seasonal packages — that help customers self-select and reduce back-and-forth before the first call." },
            ].map(({ num, icon, title, body }) => (
              <div key={title} className="card" style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, paddingTop: 2 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.06em", opacity: 0.75 }}>{num}</span>
                  {icon}
                </div>
                <div>
                  <h3 className="h3" style={{ marginBottom: 8 }}>{title}</h3>
                  <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface">
        <div className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className="card cardHighlight" style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: "1 1 280px" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Autopilot — $399/mo, no setup fee</p>
              <h3 className="h3" style={{ marginBottom: 10 }}>Custom landscaping site + AI receptionist + monthly reports. No contract.</h3>
              <p className="p" style={{ marginBottom: 0 }}>Built for your business, launched fast, and managed month-to-month. Cancel anytime.</p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", flexShrink: 0 }}>
              <Link className="btn primary" to="/contact">Get Started</Link>
              <Link className="btn" to="/pricing">Full Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="surface" style={{ background: "transparent" }}>
        <div className="section">
          <span className="badge">FAQ</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 32 }}>Landscaping web design questions.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQ.map((item, i) => (
              <div key={i} className="card" style={{ padding: 0, overflow: "hidden" }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left" }}>
                  <span style={{ fontWeight: 600, fontSize: 15, color: "var(--text)" }}>{item.q}</span>
                  <span style={{ color: "var(--accent)", fontSize: 20, flexShrink: 0, transition: "transform 0.15s", transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                </button>
                {open === i && <div style={{ padding: "0 20px 18px" }}><p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{item.a}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA title="Let your best work sell your next job." subtitle="Start with a free audit — we'll show you what your current site is missing and what a portfolio-forward redesign would look like." />
    </div>
  );
}

