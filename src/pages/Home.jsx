import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { XCircle, CheckCircle2, ArrowRight, Palette, Star, Layers, Droplets } from "lucide-react";
import CTA from "../components/CTA.jsx";
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
      maxWidth: 360, width: "100%",
      border: "1px solid var(--line)", borderRadius: 20,
      overflow: "hidden", background: "rgba(255,255,255,0.03)",
      boxShadow: "0 8px 40px rgba(0,0,0,0.28)",
    }}>
      {/* Header */}
      <div style={{ background: "var(--accent)", padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
          <img src="/brand/logo-mark-64.png" alt="RubyxQube" style={{ width: 24, height: 24, objectFit: "contain" }} />
        </div>
        <div>
          <p style={{ color: "white", fontWeight: 700, fontSize: 14, margin: 0 }}>RubyxQube</p>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 6px #22c55e" }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.70)" }}>AI receptionist · online</span>
          </div>
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

const WORK = [
  { src: "/portfolio/psw-preview.webp", trade: "Masonry & Stone",      name: "Phoenix Stoneworks", live: true },
  { src: "/designs/clear-air-hvac.png", trade: "HVAC",                 name: "Clear Air HVAC" },
  { src: "/designs/valley-plumbing.png", trade: "Plumbing",            name: "Valley Plumbing Co." },
  { src: "/designs/apex-electric.png",  trade: "Electrical Contractor", name: "Apex Electric" },
];

export default function Home() {
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
          "address": { "@type": "PostalAddress", "addressLocality": "Boise", "addressRegion": "ID", "addressCountry": "US" },
          "openingHours": "Mo-Fr 08:00-18:00",
          "areaServed": siteConfig.serviceArea
        })}</script>
      </Helmet>

      {/* ── Hero — split: copy left, live demo right ── */}
      <section className="surface heroSurface" style={{ minHeight: 740, overflow: "hidden" }}>
        <div className="section" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 56, flexWrap: "wrap" }}>

            {/* Left — copy */}
            <div style={{ flex: "1 1 340px", maxWidth: 520 }}>
              <span className="badge" style={{ marginBottom: 20 }}>
                Web Design + AI Receptionist · {siteConfig.serviceArea}
              </span>
              <h1 className="h1" style={{ marginBottom: 16 }}>
                Stop losing leads<br />
                <span className="accentText">while you're on a job.</span>
              </h1>
              <p className="p" style={{ fontSize: 17, marginBottom: 28 }}>
                RubyxQube builds professional websites with a built-in AI receptionist — so leads get answered at 2am, on weekends, and while you're elbow-deep in a job.
              </p>
              <div className="btnRow">
                <Link className="btn primary" to="/contact">Get a Free Audit</Link>
                <a className="btn" href={`tel:${siteConfig.phoneE164}`}>Call {siteConfig.phoneDisplay}</a>
              </div>
              <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px 16px" }}>
                {[
                  { stat: "24/7",     label: "Lead capture — nights, weekends, holidays" },
                  { stat: "$0 setup", label: "No hidden costs, ever" },
                  { stat: "3–7 days", label: "From signed agreement to live site" },
                ].map(k => (
                  <div key={k.stat}>
                    <p style={{ fontWeight: 800, fontSize: 22, margin: "0 0 2px", color: "var(--accent)" }}>{k.stat}</p>
                    <p style={{ fontSize: 12, color: "var(--muted)", margin: 0, lineHeight: 1.4 }}>{k.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — live demo */}
            <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <span className="badge">Live demo — try it</span>
              <ChatDemo />
            </div>

          </div>
        </div>
      </section>

      {/* ── Client Trust Strip ── */}
      <section className="surface">
        <div className="section" style={{ paddingTop: 36, paddingBottom: 36 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 24, textAlign: "center" }}>
            Trusted by Boise businesses
          </p>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <div className="grid cols-3" style={{ alignItems: "stretch" }}>
              <div className="card" style={{ textAlign: "center", padding: "24px 16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Star size={18} color="var(--accent)" style={{ marginBottom: 12, flexShrink: 0 }} />
                <p className="p" style={{ fontSize: 13, marginTop: 0, marginBottom: 0, fontStyle: "italic" }}>"Boyd has been wonderful to work with. His expertise in his field and ability to bring ideas to life has been a game changer for me and my business. He's quick to reply and incredibly easy to work with."</p>
                <div style={{ marginTop: "auto", paddingTop: 16, width: "100%" }}>
                  <p style={{ fontWeight: 700, fontSize: 13, margin: "0 0 4px" }}>Manny Araujo</p>
                  <p style={{ fontSize: 11, color: "var(--muted)", margin: 0, letterSpacing: "0.04em" }}>Owner, Phoenix Stoneworks</p>
                </div>
              </div>
              <div className="card" style={{ textAlign: "center", padding: "24px 16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Layers size={18} color="var(--accent)" style={{ marginBottom: 12, flexShrink: 0 }} />
                <p className="p" style={{ fontSize: 13, marginTop: 0, marginBottom: 0, fontStyle: "italic" }}>"AI receptionist answers leads 24/7, blog posts go out every month, and the site looks great on every device. Exactly what we needed."</p>
                <div style={{ marginTop: "auto", paddingTop: 16, width: "100%" }}>
                  <p style={{ fontWeight: 700, fontSize: 13, margin: "0 0 4px" }}>Phoenix Stoneworks</p>
                  <p style={{ fontSize: 11, color: "var(--muted)", margin: 0, letterSpacing: "0.04em" }}>Countertops · Momentum Client</p>
                </div>
              </div>
              <div className="card" style={{ textAlign: "center", padding: "24px 16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Droplets size={18} color="var(--accent)" style={{ marginBottom: 12, flexShrink: 0 }} />
                <p className="p" style={{ fontSize: 13, marginTop: 0, marginBottom: 0, fontStyle: "italic" }}>"I absolutely love the website Boyd built for my home service business. Clean, professional, and polished. His delivery was incredibly fast."</p>
                <div style={{ marginTop: "auto", paddingTop: 16, width: "100%" }}>
                  <p style={{ fontWeight: 700, fontSize: 13, margin: "0 0 4px" }}>Chase</p>
                  <p style={{ fontSize: 11, color: "var(--muted)", margin: 0, letterSpacing: "0.04em" }}>Sudz Boise · Window & Gutter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Work gallery ── */}
      <section className="surface">
        <div className="section">
          <span className="badge" style={{ marginBottom: 12 }}>Our work</span>
          <h2 className="h2" style={{ marginBottom: 8 }}>Built for trades. Designed to convert.</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 32 }}>Every site is built from scratch — not a template. No two look the same.</p>
          <div className="grid cols-2" style={{ gap: 16 }}>
            {WORK.map(s => (
              <div key={s.src} className="card" style={{ padding: 0, overflow: "hidden" }}>
                <img
                  src={s.src}
                  alt={`${s.name} — website built by RubyxQube`}
                  loading="lazy"
                  style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover", objectPosition: "top" }}
                />
                <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>{s.trade}</p>
                    <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{s.name}</p>
                  </div>
                  {s.live && <span className="badge" style={{ fontSize: 11 }}>Live Client</span>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Link className="btn" to="/designs" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              Browse design styles <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Problem + before/after ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">The problem</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>
            You're losing jobs to businesses that <span className="accentText">respond faster.</span>
          </h2>
          <p className="p" style={{ maxWidth: 560, marginBottom: 28 }}>
            A customer searches at 9pm, finds your site, fills out a form — and you don't see it until morning. By then they've already called someone else. The businesses winning aren't better at their trade. They're just faster.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 640, marginBottom: 32 }}>
            <div className="card" style={{ padding: "14px 18px", display: "flex", alignItems: "flex-start", gap: 12, borderLeft: "3px solid rgba(239,68,68,0.45)" }}>
              <XCircle size={16} color="#ef4444" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 2px" }}>Without AI</p>
                <p className="p" style={{ margin: 0, fontSize: 13 }}>Customer visits at 10pm. No one responds. They call your competitor. You wake up to nothing.</p>
              </div>
            </div>
            <div className="card" style={{ padding: "14px 18px", display: "flex", alignItems: "flex-start", gap: 12, borderLeft: "3px solid rgba(34,197,94,0.45)" }}>
              <CheckCircle2 size={16} color="rgba(34,197,94,0.85)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 2px" }}>With AI</p>
                <p className="p" style={{ margin: 0, fontSize: 13 }}>AI greets them instantly, captures their info. You get a text: "New lead — Sarah, HVAC repair, Meridian."</p>
              </div>
            </div>
          </div>
          <Link className="btn" to="/ai-receptionist" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            See how the AI works <ArrowRight size={15} />
          </Link>
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
                  "Monthly report lands in your inbox. Plus your own portal to update services, FAQs, and chatbot greeting whenever you want.",
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

      {/* ── Process teaser ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">How it works</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>Live in days. No tech headaches.</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 40 }}>Three steps from first call to leads hitting your phone.</p>

          <div className="grid cols-3" style={{ alignItems: "stretch" }}>
            {[
              { number: "01", title: "Free 15-min audit", desc: "We look at your online presence and tell you exactly what's costing you leads. No pitch, just honest feedback." },
              { number: "02", title: "We build your site", desc: "After a short intake form, your site is live in 3–7 days. You review it, we refine it. Not happy with the first draft? You don't owe us anything." },
              { number: "03", title: "Leads start coming in", desc: "Your AI receptionist goes live — answering questions, capturing leads, and texting you instantly. 24/7." },
            ].map((step) => (
              <div key={step.number} className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--accent-dim)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "var(--accent)", flexShrink: 0 }}>
                  {step.number}
                </div>
                <div>
                  <h3 className="h3" style={{ marginBottom: 6 }}>{step.title}</h3>
                  <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28, textAlign: "center" }}>
            <Link className="btn" to="/how-it-works" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              See the full process <ArrowRight size={15} />
            </Link>
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

      {/* ── Pricing strip ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Pricing</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>Simple, honest pricing.</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 36 }}>No hidden fees. No hourly billing. Every plan starts with a custom-built site.</p>
          <div className="grid cols-3" style={{ gap: 16, alignItems: "stretch" }}>
            {[
              { name: "Launch",    price: "$1,200", billing: "one-time", tagline: "A professional site, built and handed off. No monthly commitment." },
              { name: "Autopilot", price: "$399",   billing: "/mo",      tagline: "Site + AI receptionist + 1 blog post/mo + monthly care. No setup fee.", highlight: true },
              { name: "Momentum",  price: "$999",   billing: "/mo",      tagline: "A developer on your team — 4 blog posts/mo, unlimited edits, custom tools." },
            ].map(p => (
              <div key={p.name} className={`card${p.highlight ? " cardHighlight" : ""}`} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Fixed-height badge row so price aligns across all cards */}
                <div style={{ height: 26, display: "flex", alignItems: "center" }}>
                  {p.highlight && <span className="badge" style={{ fontSize: 11 }}>Most Popular</span>}
                </div>
                <p style={{ fontSize: 11, fontWeight: 700, color: p.highlight ? "#fb7185" : "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>{p.name}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, lineHeight: 1 }}>{p.price}</span>
                  <span style={{ fontSize: 14, color: "var(--muted)" }}>{p.billing}</span>
                </div>
                <p className="p" style={{ fontSize: 14, margin: 0, flex: 1 }}>{p.tagline}</p>
                <Link className="btn" to="/pricing" style={{ textAlign: "center", justifyContent: "center", marginTop: 4 }}>
                  See what's included
                </Link>
              </div>
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
