import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Clock, MessageCircle, Smartphone } from "lucide-react";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";

const FAQ = [
  { q: "Can the AI receptionist handle emergency after-hours calls?", a: "It handles web visitors — not phone calls. But it can greet website visitors at any hour, capture their info and urgency, and text you immediately. For true phone emergency dispatch, you'd pair it with an answering service for calls." },
  { q: "Does the AI know HVAC terminology?", a: "We train it specifically on your services — heat pump vs. furnace vs. AC, your service area, your pricing structure, and your seasonal offers. It knows what you do before the first customer visits." },
  { q: "What HVAC-specific features can you build?", a: "Seasonal promotion banners that change automatically, service request forms with equipment fields, maintenance plan landing pages, and emergency contact CTAs. We can also build financing calculator pages if you offer payment plans." },
  { q: "How fast can you get an HVAC site live?", a: "Most Autopilot sites go live within 1–2 weeks of the kickoff call. If your peak season is approaching, say so — we'll prioritize the build." },
  { q: "Do you handle Google Business Profile for HVAC?", a: "Yes — that's included in the Momentum plan. GBP is one of the most impactful channels for 'HVAC near me' searches and emergency service queries. We manage it monthly." },
];

export default function HvacWebDesign() {
  const [open, setOpen] = useState(null);

  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>HVAC Web Design — Boise, Idaho | RubyxQube</title>
        <meta name="description" content="Custom websites for HVAC companies in Boise and the Treasure Valley. AI lead capture, 24/7 after-hours coverage, local SEO. Starting at $399/mo, no setup fee." />
        <meta property="og:title" content="HVAC Web Design Boise Idaho — RubyxQube" />
        <meta property="og:description" content="Custom websites with AI lead capture for HVAC companies in the Treasure Valley. No setup fee, no contract." />
        <link rel="canonical" href={`${siteConfig.siteUrl}/web-design-hvac`} />
      </Helmet>

      <section className="surface heroSurface">
        <div className="heroSection">
          <span className="badge" style={{ marginBottom: 20 }}>HVAC Web Design — Treasure Valley</span>
          <h1 className="h1 heroTitle">
            HVAC websites that capture leads<br />
            <span className="accentText">when your office is closed.</span>
          </h1>
          <p className="p" style={{ fontSize: 17, maxWidth: 560, marginBottom: 32 }}>
            Heat waves and furnace failures don't happen at 10am. Most HVAC leads in Boise search after hours — and most HVAC companies have no way to capture them. We fix that with a custom site and 24/7 AI receptionist.
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
            <div className="kpi"><strong>Emergency-ready</strong><span>After-hours lead capture built in</span></div>
          </div>
        </div>
      </section>

      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "center" }}>
            <div>
              <span className="badge">The HVAC lead problem</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>The busiest search moments for HVAC happen exactly when you can't answer.</h2>
              <p className="p">Boise summers hit 105+. Winters drop below 15. When a home's AC or furnace fails, the owner searches immediately — not the next morning. They open the first few Google results, and they call or message whoever responds first.</p>
              <p className="p" style={{ marginBottom: 0 }}>If your site doesn't have 24/7 lead capture, those searches are silently going to competitors. An AI receptionist changes that — it greets every visitor, captures their info, and texts you the moment they're ready to book.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Most HVAC searches happen evenings and weekends during peak demand",
                "Customers rarely wait — they call the first company that responds",
                "After-hours lead capture converts at higher rates than morning callbacks",
                "Emergency service calls are your highest-margin jobs",
                "Local SEO for 'HVAC near me' is winnable with the right setup",
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
          <span className="badge">What we build for HVAC</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 40 }}>Everything your site needs to capture and convert Boise HVAC leads.</h2>
          <div className="grid cols-2" style={{ gap: 24 }}>
            {[
              { num: "01", icon: <Clock size={22} color="var(--accent)" strokeWidth={1.75} />, title: "After-hours AI receptionist", body: "Trained on your services, service area, and pricing. Captures leads 24/7, fires an SMS to you the moment someone's ready to book. Handles emergency triage naturally — 'We can't get to you tonight, but you're first on the list for tomorrow morning.'" },
              { num: "02", icon: <MessageCircle size={22} color="var(--accent)" strokeWidth={1.75} />, title: "HVAC-specific FAQ training", body: "Your AI knows the difference between a heat pump and a furnace, your seasonal service specials, financing options, and which zip codes you service. No generic answers." },
              { num: "03", icon: <Smartphone size={22} color="var(--accent)" strokeWidth={1.75} />, title: "Mobile-first design", body: "Most HVAC emergency searches happen on a phone at an uncomfortable temperature. Your site loads fast and the contact CTA is visible within seconds — not buried under three scrolls." },
              { num: "04", icon: <CheckCircle2 size={22} color="var(--accent)" strokeWidth={1.75} />, title: "Local SEO for Treasure Valley", body: "Optimized for 'HVAC Boise', 'air conditioning repair Meridian', 'furnace replacement Nampa' and similar high-intent searches. Search Console setup included from day one." },
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
              <h3 className="h3" style={{ marginBottom: 10 }}>Custom HVAC site + AI receptionist + monthly reports. No contract.</h3>
              <p className="p" style={{ marginBottom: 0 }}>Everything your HVAC company needs to compete online — built and maintained for you, month-to-month.</p>
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
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 32 }}>HVAC web design questions.</h2>
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

      <CTA title="Stop losing HVAC leads after hours." subtitle="Start with a free audit — we'll show you exactly what your site is missing and how much it might be costing you." />
    </div>
  );
}
