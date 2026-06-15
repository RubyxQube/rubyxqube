import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { XCircle, CheckCircle2, MessageCircle, ClipboardCheck, Smartphone, Clock, Palette, ArrowRight } from "lucide-react";
import CTA from "../components/CTA.jsx";
import PackageCard from "../components/PackageCard.jsx";
import ComparisonSection from "../components/ComparisonSection.jsx";
import { siteConfig } from "../siteConfig.js";

/* ── Inline bold renderer for chat demo ── */
function renderBold(text) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

/* ── Animated chatbot demo ── */
const DEMO = [
  { from: "bot",  text: "Hey! I'm the AI receptionist for RubyxQube. How can I help you today?",                                                            delay: 600  },
  { from: "user", text: "Do you guys have pricing info?",                                                                                                    delay: 2800 },
  { from: "bot",  text: "Yes! **Autopilot** starts at $399/mo — no setup fee. Includes your custom site, AI receptionist, monthly reports, and updates.",   delay: 4100 },
  { from: "user", text: "Nice. I run an HVAC company in Meridian.",                                                                                          delay: 6900 },
  { from: "bot",  text: "Perfect fit — we build a lot of HVAC sites. Can I grab your name and a good number? I'll have Boyd reach out today.",               delay: 8400 },
  { from: "user", text: "Mike Tanner, (208) 555-0194",                                                                                                       delay: 11000 },
  { from: "lead", text: "Lead captured — Boyd notified by SMS",                                                                                              delay: 12500 },
];

function ChatDemo() {
  const [shown, setShown]   = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const handles = [];

    function run() {
      setShown(0);
      setTyping(false);

      DEMO.forEach((msg, i) => {
        if (msg.from === "bot") {
          handles.push(setTimeout(() => setTyping(true), msg.delay - 700));
        }
        handles.push(setTimeout(() => {
          setTyping(false);
          setShown(i + 1);
        }, msg.delay));
      });

      handles.push(setTimeout(run, DEMO[DEMO.length - 1].delay + 3200));
    }

    run();
    return () => handles.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      maxWidth: 360, margin: "0 auto",
      border: "1px solid var(--line)", borderRadius: 20,
      overflow: "hidden", background: "rgba(255,255,255,0.03)",
      boxShadow: "0 8px 40px rgba(0,0,0,0.28)",
    }}>
      {/* Header */}
      <div style={{ background: "var(--accent)", padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <MessageCircle size={18} color="white" strokeWidth={1.75} />
        </div>
        <div>
          <p style={{ color: "white", fontWeight: 700, fontSize: 14, margin: 0 }}>RubyxQube AI</p>
          <p style={{ color: "rgba(255,255,255,0.80)", fontSize: 12, margin: 0 }}>Online Â· replies instantly</p>
        </div>
      </div>

      {/* Messages */}
      <div style={{ padding: "16px 14px", minHeight: 300, display: "flex", flexDirection: "column", gap: 10 }}>
        {DEMO.slice(0, shown).map((msg, i) => {
          if (msg.from === "lead") {
            return (
              <div key={i} style={{ background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.22)", borderRadius: 10, padding: "10px 14px", textAlign: "center", fontSize: 13, color: "rgba(34,197,94,0.90)", fontWeight: 600 }}>
                ✓ {msg.text}
              </div>
            );
          }
          const isUser = msg.from === "user";
          return (
            <div key={i} style={{
              maxWidth: "82%", alignSelf: isUser ? "flex-end" : "flex-start",
              background: isUser ? "var(--accent)" : "rgba(255,255,255,0.08)",
              color: "var(--text)",
              borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              padding: "9px 13px", fontSize: 13, lineHeight: 1.45,
            }}>
              {msg.from === "bot" ? renderBold(msg.text) : msg.text}
            </div>
          );
        })}

        {typing && (
          <div style={{ alignSelf: "flex-start", background: "rgba(255,255,255,0.08)", borderRadius: "16px 16px 16px 4px", padding: "11px 14px" }}>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              {[0, 1, 2].map((j) => (
                <span key={j} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--muted)", display: "inline-block", animation: `typingDot 1.2s ease-in-out ${j * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const packages = [
    {
      name: "Launch",
      tagline: "Get your business online professionally.",
      price: "$1,200",
      billing: "one-time",
      bullets: [
        "5–6 page website (Home, About, Services, Gallery, Quote, Privacy)",
        "Mobile responsive — looks great on every device",
        "Contact form + click-to-call buttons",
        "Basic SEO (titles, descriptions, local structure)",
        "Google Maps embed",
        "2 revision rounds included",
      ],
      note: "Site is yours to keep. No monthly commitment, no ongoing support. A great fit if you already have someone to manage it — otherwise Autopilot is the better deal.",
    },
    {
      name: "Autopilot",
      tagline: "You handle the jobs. We handle everything else.",
      price: "$399",
      billing: "/mo",
      annualPrice: "$3,990",
      annualSaving: "2 months free",
      bullets: [
        "No setup fee — 5–10 page custom site, built and launched",
        "Analytics + Search Console setup included",
        "Custom AI receptionist — answers questions, captures leads 24/7",
        "Instant SMS alert on every new lead",
        "Monthly report: traffic, chats, leads captured",
        "60 min/month of site updates",
      ],
      highlight: true,
    },
    {
      name: "Momentum",
      tagline: "A developer on your team, without the payroll.",
      price: "$999",
      billing: "/mo",
      annualPrice: "$9,990",
      annualSaving: "2 months free",
      bullets: [
        "Everything in Autopilot",
        "Developer on call, same-day prototypes, 2-day turnaround on bigger builds",
        "Unlimited edits and new pages, no monthly cap",
        "Custom tools: calculators, estimators, intake forms, and more",
        "Google Business Profile management",
        "4 blog posts/month — written, approved, and published for you",
        "Weekly check-in call (30–60 min)",
      ],
    },
  ];

  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>RubyxQube — Web Design & AI Receptionists for Treasure Valley Businesses</title>
        <meta name="description" content="Professional websites + AI chatbot receptionists for local service businesses in Boise, Nampa, Meridian, and the Treasure Valley. Starting at $399/mo." />
        <meta property="og:title" content="RubyxQube — Web Design & AI Receptionists for Treasure Valley Businesses" />
        <meta property="og:description" content="Professional websites + AI chatbot receptionists for local service businesses in Boise, Nampa, Meridian, and the Treasure Valley. Starting at $399/mo." />
        <meta property="og:image" content="https://rubyxqube.com/og-default.png" />
        <meta property="og:url" content="https://rubyxqube.com/" />
        <link rel="canonical" href="https://rubyxqube.com/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": siteConfig.brand,
          "url": siteConfig.siteUrl,
          "telephone": siteConfig.phoneDisplay,
          "email": siteConfig.email,
          "address": { "@type": "PostalAddress", "addressLocality": "Nampa", "addressRegion": "ID", "addressCountry": "US" },
          "openingHours": "Mo-Fr 08:00-18:00",
          "areaServed": siteConfig.serviceArea
        })}</script>
      </Helmet>

      {/* ── Hero ── */}
      <section className="surface heroSurface">
        <div className="heroSection">
          <span className="badge" style={{ textAlign: "center", marginBottom: 20 }}>Web Design + AI Receptionist<br />{siteConfig.serviceArea} & Beyond</span>
          <h1 className="h1 heroTitle">
            Stop losing leads<br />
            <span className="accentText">while you're with a client.</span>
          </h1>
          <p className="p" style={{ fontSize: 17, maxWidth: 540, marginBottom: 32 }}>
            {siteConfig.brand} builds professional websites with a built-in AI receptionist that captures leads 24/7, answers customer questions, and sends you instant alerts — so you never miss a job opportunity.
          </p>
          <div className="btnRow">
            <Link className="btn primary" to="/contact">Get a Free Audit</Link>
            <a className="btn" href={`tel:${siteConfig.phoneE164}`}>Call {siteConfig.phoneDisplay}</a>
            <Link className="btn" to="/pricing">See Pricing</Link>
          </div>

          <div className="hr" style={{ marginTop: 52 }} />

          <div className="grid cols-3">
            <div className="kpi">
              <strong>24/7 Lead Capture</strong>
              <span>Your AI receptionist works nights, weekends, and holidays — no breaks</span>
            </div>
            <div className="kpi">
              <strong>Instant SMS Alerts</strong>
              <span>Get a text the moment a lead comes in, with their name and what they need</span>
            </div>
            <div className="kpi">
              <strong>Live in Days</strong>
              <span>From kickoff call to launched site in as little as 3 days — zero tech headaches</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Client Trust Strip ── */}
      <section className="surface">
        <div className="section" style={{ paddingTop: 36, paddingBottom: 36 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20, textAlign: "center" }}>
            Trusted by Boise businesses
          </p>
          <div className="grid cols-3">
            <div className="card" style={{ textAlign: "center", padding: "20px 16px" }}>
              <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 6px" }}>BastionMSP</p>
              <span className="badge" style={{ fontSize: 11 }}>Cybersecurity</span>
              <p className="p" style={{ fontSize: 13, marginTop: 10, marginBottom: 0 }}>Brand identity, marketing site, and client portal</p>
            </div>
            <div className="card" style={{ textAlign: "center", padding: "20px 16px" }}>
              <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 6px" }}>Phoenix Stoneworks</p>
              <span className="badge" style={{ fontSize: 11 }}>Masonry & Stone</span>
              <p className="p" style={{ fontSize: 13, marginTop: 10, marginBottom: 0 }}>AI photo estimate, quote calculator, AI receptionist</p>
            </div>
            <div className="card" style={{ textAlign: "center", padding: "20px 16px" }}>
              <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 6px" }}>Sudz Window & Gutter</p>
              <span className="badge" style={{ fontSize: 11 }}>Home Services</span>
              <p className="p" style={{ fontSize: 13, marginTop: 10, marginBottom: 0 }}>Full rebuild from Wix, AI receptionist added</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "center" }}>
            <div>
              <span className="badge">The problem</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>
                You're losing jobs to businesses that respond faster.
              </h2>
              <p className="p">
                Most service businesses miss leads every single day. A customer searches for a plumber at 9pm, finds your site, fills out a form — and you don't see it until tomorrow morning. By then they've already called someone else.
              </p>
              <p className="p" style={{ marginBottom: 0 }}>
                The businesses winning local search aren't necessarily better at their trade. They're just faster to respond. An AI receptionist changes that overnight.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="card" style={{ borderLeft: "3px solid rgba(239,68,68,0.50)" }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}><XCircle size={17} color="#ef4444" strokeWidth={2} />Without AI Receptionist</p>
                <p className="p" style={{ margin: "8px 0 0", fontSize: 14 }}>Customer visits at 10pm. No one responds. They call your competitor. You wake up to nothing.</p>
              </div>
              <div className="card" style={{ borderLeft: "3px solid rgba(59,130,246,0.60)" }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}><CheckCircle2 size={17} color="var(--accent)" strokeWidth={2} />With AI Receptionist</p>
                <p className="p" style={{ margin: "8px 0 0", fontSize: 14 }}>Customer visits at 10pm. AI greets them, answers their questions, captures their info. You get a text: "New lead — Sarah, needs HVAC repair, Meridian."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Receptionist Feature ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">AI Receptionist</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>
            Meet your new <span className="accentText">24/7 employee.</span>
          </h2>
          <p className="p" style={{ maxWidth: 520, marginBottom: 40 }}>
            Built with AI and trained on your specific business — your services, pricing, service area, and FAQs. It handles the front desk so you can focus on the work.
          </p>

          <div className="grid cols-3">
            <div className="card">
              <MessageCircle size={26} color="var(--accent)" strokeWidth={1.75} style={{ display: "block", marginBottom: 14 }} />
              <h3 className="h3">Answers questions instantly</h3>
              <p className="p" style={{ marginBottom: 0 }}>Knows your services, pricing, service area, and hours. Handles the most common questions without you lifting a finger.</p>
            </div>
            <div className="card">
              <ClipboardCheck size={26} color="var(--accent)" strokeWidth={1.75} style={{ display: "block", marginBottom: 14 }} />
              <h3 className="h3">Qualifies and captures leads</h3>
              <p className="p" style={{ marginBottom: 0 }}>Asks the right questions — what do they need, where are they located, when do they need it. Saves it all so you have everything before you call back.</p>
            </div>
            <div className="card">
              <Smartphone size={26} color="var(--accent)" strokeWidth={1.75} style={{ display: "block", marginBottom: 14 }} />
              <h3 className="h3">Alerts you in real time</h3>
              <p className="p" style={{ marginBottom: 0 }}>The moment a lead comes in, you get a text. Name, contact info, what they need, and when. No checking dashboards, no missed emails.</p>
            </div>
            <div className="card">
              <Clock size={26} color="var(--accent)" strokeWidth={1.75} style={{ display: "block", marginBottom: 14 }} />
              <h3 className="h3">Never off the clock</h3>
              <p className="p" style={{ marginBottom: 0 }}>Works nights, weekends, and holidays. No sick days, no vacations, no missed calls when you're on a job.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Demo ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 56, alignItems: "center" }}>
            <div>
              <span className="badge">See it in action</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>
                This is a real AI conversation — happening on your site, right now.
              </h2>
              <p className="p">
                Every {siteConfig.brand} site ships with an AI receptionist trained on your business. It answers questions, qualifies leads, and sends you a text the moment someone's ready to book.
              </p>
              <p className="p" style={{ marginBottom: 24 }}>
                The bot you're talking to on this page? That's the exact product. Same tech, same lead alerts, same setup — just trained on your business instead of ours.
              </p>
              <div className="btnRow" style={{ justifyContent: "flex-start" }}>
                <Link className="btn primary" to="/ai-receptionist">Learn how it works</Link>
                <Link className="btn" to="/pricing">See pricing</Link>
              </div>
            </div>
            <ChatDemo />
          </div>
        </div>
      </section>

      <ComparisonSection condensed />

      {/* ── After launch ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">After day one</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>
            Launch gets you live.<br />
            <span className="accentText">Autopilot keeps you growing.</span>
          </h2>
          <p className="p" style={{ maxWidth: 520, marginBottom: 40 }}>
            Your business will change. Services, prices, photos, hours. The question is who handles it when it does.
          </p>
          <div className="grid cols-2" style={{ gap: 24 }}>
            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>After Launch</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Site goes live. Boyd's job is done.",
                  "Need to update a service or price? New invoice from someone who doesn't know your setup.",
                  "Site goes down at midnight? You find out when a customer tells you.",
                  "Lead comes in at 9pm. No one answers. They call your competitor.",
                  "Want to know how your site is performing? Log in somewhere and figure it out.",
                ].map((text) => (
                  <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <XCircle size={16} color="var(--muted)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                    <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card cardHighlight">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>After Autopilot</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Site goes live. Boyd is still on your team.",
                  "Need a change? Text Boyd. Done same day, already included.",
                  "Site goes down? Uptime monitoring catches it before your customers do.",
                  "Lead comes in at 9pm. AI greets them, captures their info, texts you instantly.",
                  "Monthly report lands in your inbox. No logins, no dashboards.",
                ].map((text) => (
                  <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <CheckCircle2 size={16} color="var(--accent)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                    <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Designs Callout ── */}
      <section className="surface">
        <div className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className="card cardHighlight" style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: "1 1 240px" }}>
              <span className="badge" style={{ marginBottom: 14 }}>Not sure what you want?</span>
              <h3 className="h3" style={{ marginBottom: 10 }}>Pick your style — see it before you commit.</h3>
              <p className="p" style={{ marginBottom: 0 }}>Browse 12 design directions and 12 color palettes. Lock in your aesthetic and we'll send you a free preview mockup — no obligation.</p>
            </div>
            <Link className="btn primary" to="/designs" style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
              <Palette size={16} />
              Explore Design Styles
            </Link>
          </div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Pricing</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>Simple, honest pricing.</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 36 }}>No contracts, no hidden fees. Every package starts with a professional website build.</p>
          <div className="grid cols-3">
            {packages.map((p) => (
              <PackageCard key={p.name} {...p} />
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Start with a free audit — no commitment."
        subtitle="Send me your current site (or tell me you don't have one) and I'll tell you exactly what's costing you leads and how to fix it."
      />
    </div>
  );
}

