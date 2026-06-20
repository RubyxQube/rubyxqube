import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, MessageCircle, Calendar, ShieldCheck } from "lucide-react";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";

const FAQ = [
  { q: "Can the AI receptionist answer insurance questions?", a: "Yes — we train it with your accepted insurance plans, how to verify coverage, and what the typical patient experience looks like. It can answer 'Do you take Delta Dental?' or 'Are you in-network with Blue Cross?' based on what you tell us during onboarding." },
  { q: "Can it handle new patient intake questions?", a: "Yes. It can explain what new patients need to bring, how to fill out paperwork, what to expect at a first visit, and how to schedule. This significantly reduces front-desk call volume for routine questions." },
  { q: "Can patients book appointments through the site?", a: "We integrate with Cal.com or your existing scheduling system. The AI can direct patients to the booking link and answer pre-appointment questions. Full custom booking systems are available under the Momentum plan." },
  { q: "How do you handle HIPAA considerations?", a: "The AI receptionist handles general questions and appointment scheduling direction — not protected health information. We do not collect medical history, treatment details, or insurance ID numbers through the chat. The system is designed to stay on the right side of that line." },
  { q: "What makes a dental website different from other service businesses?", a: "Trust signals matter more. Patients need to see credentials, before/after photos (if applicable), insurance acceptance, reviews, and clear new patient onboarding information before they'll book. We design for that specific conversion path." },
];

export default function DentalWebDesign() {
  const [open, setOpen] = useState(null);

  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Dental Web Design — Boise, Idaho | RubyxQube</title>
        <meta name="description" content="Custom websites for dental practices in Boise and the Treasure Valley. New patient conversion, AI receptionist, insurance FAQ, appointment booking. Starting at $399/mo." />
        <meta property="og:title" content="Dental Web Design Boise Idaho — RubyxQube" />
        <meta property="og:description" content="Custom dental websites with AI lead capture, insurance FAQ, and new patient conversion. Treasure Valley dental practices." />
        <meta property="og:image" content="https://rubyxqube.com/og-default.png" />
        <meta property="og:url" content="https://rubyxqube.com/web-design-dental" />
        <link rel="canonical" href={`${siteConfig.siteUrl}/web-design-dental`} />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", "name": siteConfig.brand, "url": `${siteConfig.siteUrl}/web-design-dental`, "telephone": siteConfig.phoneDisplay, "email": siteConfig.email, "address": { "@type": "PostalAddress", "addressLocality": "Boise", "addressRegion": "ID", "addressCountry": "US" }, "areaServed": siteConfig.serviceArea, "serviceType": "Dental Web Design" })}</script>
      </Helmet>

      <section className="surface heroSurface">
        <div className="heroSection">
          <span className="badge" style={{ marginBottom: 20 }}>Dental Web Design — Treasure Valley</span>
          <h1 className="h1 heroTitle">
            Dental websites that convert<br />
            <span className="accentText">new patient searches into booked appointments.</span>
          </h1>
          <p className="p" style={{ fontSize: 17, maxWidth: 560, marginBottom: 32 }}>
            New dental patients do their research before calling. We build custom dental websites designed to answer their questions, build trust, and get them booked — with an AI receptionist that handles the first conversation at any hour.
          </p>
          <div className="btnRow">
            <Link className="btn primary" to="/contact">Get a Free Audit</Link>
            <Link className="btn" to="/pricing">See Pricing</Link>
          </div>
          <div className="hr" style={{ marginTop: 44 }} />
          <div className="grid cols-4">
            <div className="kpi"><strong>1–2 week launch</strong><span>From kickoff call to live site</span></div>
            <div className="kpi"><strong>No setup fee</strong><span>Month-to-month, cancel anytime</span></div>
            <div className="kpi"><strong>24/7 AI coverage</strong><span>Insurance questions answered after hours</span></div>
            <div className="kpi"><strong>HIPAA-aware</strong><span>Designed to stay on the right side</span></div>
          </div>
        </div>
      </section>

      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "center" }}>
            <div>
              <span className="badge">What dental patients need</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>New patients research before they call. Your site is the first impression.</h2>
              <p className="p">When someone moves to Meridian and needs a new dentist, they don't ask a friend first — they Google. They check three or four sites, look for accepted insurance, read reviews, and evaluate whether the practice looks professional and welcoming. The site that answers those questions fastest wins the appointment.</p>
              <p className="p" style={{ marginBottom: 0 }}>Most dental sites in the Treasure Valley are outdated, slow, or don't answer basic questions about insurance and new patient intake. A well-built site with an AI that handles "do you take my insurance?" at 9pm is a genuine competitive advantage.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "New patients research practices online before calling",
                "Insurance acceptance is the #1 qualifying question before booking",
                "After-hours insurance and scheduling questions go unanswered at most practices",
                "Trust signals (reviews, credentials, photos) heavily influence conversion",
                "New patient intake questions are a high-volume, repetitive front-desk task the AI can handle",
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
          <span className="badge">What we build for dental practices</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 40 }}>Everything a new patient needs to see — and the AI to answer what they ask after hours.</h2>
          <div className="grid cols-2" style={{ gap: 24 }}>
            {[
              { num: "01", icon: <MessageCircle size={22} color="var(--accent)" strokeWidth={1.75} />, title: "AI receptionist for new patient questions", body: "Handles insurance questions, new patient intake, what to expect at a first visit, and how to schedule — at any hour. Captures lead info and texts you immediately when someone's ready to book." },
              { num: "02", icon: <Calendar size={22} color="var(--accent)" strokeWidth={1.75} />, title: "Appointment booking integration", body: "Direct patients to your booking system from the site and the AI. We integrate with Cal.com or your existing scheduling tool. Custom booking systems are available under Momentum." },
              { num: "03", icon: <ShieldCheck size={22} color="var(--accent)" strokeWidth={1.75} />, title: "Insurance and trust content", body: "A clear insurance acceptance page, provider credentials, patient reviews, and new patient onboarding information — the trust signals new patients look for before choosing a practice." },
              { num: "04", icon: <CheckCircle2 size={22} color="var(--accent)" strokeWidth={1.75} />, title: "Local SEO for Treasure Valley dental searches", body: "Optimized for 'dentist Boise', 'family dentist Meridian', 'dental office accepting new patients Eagle' and similar searches. Search Console setup and monthly reporting included." },
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
              <h3 className="h3" style={{ marginBottom: 10 }}>Custom dental site + AI receptionist + monthly reports. No contract.</h3>
              <p className="p" style={{ marginBottom: 0 }}>Built to convert new patient searches. Managed month-to-month — no annual commitment required.</p>
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
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 32 }}>Dental web design questions.</h2>
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

      <CTA title="Ready to convert more new patient searches?" subtitle="Start with a free audit — we'll show you what your current site is missing and how to fix the new patient conversion gap." />
    </div>
  );
}

