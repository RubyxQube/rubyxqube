import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MessageCircle, Smartphone, Bell, Wrench, CheckCircle2, Zap, ShieldCheck, BarChart3 } from "lucide-react";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";

const FAQ_ITEMS = [
  {
    q: "What if a visitor asks something the AI doesn't know?",
    a: "It handles it gracefully — says it will have Boyd confirm and captures the visitor's contact info. It never makes up answers for things like pricing specifics or availability. We also tune the system prompt monthly (on Momentum) to fill any gaps we see in real conversations.",
  },
  {
    q: "Can it book appointments directly?",
    a: "Not yet — it captures the lead and you follow up to book. A booking integration (Cal.com) is available as an add-on that lets the bot direct people to a scheduling link.",
  },
  {
    q: "What does the alert look like?",
    a: "An SMS to your cell phone that reads something like: \"New lead — Mike Tanner. Contact: (208) 555-0194. Needs: HVAC repair in Meridian.\" You get everything before you call back.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Conversations are processed through the Anthropic API (Claude) and are not used to train their models. Lead data is stored securely and never shared with third parties. You own your leads — we just make sure they land somewhere useful.",
  },
  {
    q: "What AI powers it?",
    a: "Claude, made by Anthropic — the same AI behind Claude.ai. Specifically Claude Haiku for speed and affordability. Momentum clients with complex needs can be upgraded to Claude Sonnet.",
  },
  {
    q: "Can I customize what it says?",
    a: "Yes. You control the greeting and tone directly from your client portal at any time. The core training (services, pricing, hours, service area, FAQs) is set during onboarding. Momentum clients also get monthly tuning from Boyd based on real conversation logs.",
  },
];

function FAQAccordion() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {FAQ_ITEMS.map((item, i) => (
        <div key={i} className="card" style={{ padding: 0, overflow: "hidden" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left" }}
          >
            <span style={{ fontWeight: 600, fontSize: 15, color: "var(--text)" }}>{item.q}</span>
            <span style={{ color: "var(--accent)", fontSize: 20, flexShrink: 0, transition: "transform 0.15s", transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
          </button>
          {open === i && (
            <div style={{ padding: "0 20px 18px" }}>
              <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function renderBold(text) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

const DEMO = [
  { from: "bot",  text: "Hey! I'm the AI receptionist for Phoenix Stoneworks. What can I help you with?",                                                    delay: 600   },
  { from: "user", text: "We're doing a kitchen remodel — looking for quartz countertops",                                                                     delay: 2800  },
  { from: "bot",  text: "Great timing! We fabricate and install quartz in-house — most kitchens are done in a single day. Do you have an existing countertop to tear out, or is this a new build?", delay: 4000  },
  { from: "user", text: "Existing granite, needs to come out",                                                                                                delay: 7000  },
  { from: "bot",  text: "No problem — tear-out and removal is included. To get you a quote, can I grab your name and a number Manny can reach you at?",       delay: 8400  },
  { from: "user", text: "Sarah Dillon, (208) 555-0312",                                                                                                       delay: 11200 },
  { from: "lead", text: "Lead captured — Manny notified by SMS",                                                                                             delay: 12600 },
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
        if (msg.from === "bot") handles.push(setTimeout(() => setTyping(true), msg.delay - 700));
        handles.push(setTimeout(() => { setTyping(false); setShown(i + 1); }, msg.delay));
      });
      handles.push(setTimeout(run, DEMO[DEMO.length - 1].delay + 3200));
    }
    run();
    return () => handles.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ maxWidth: 380, margin: "0 auto", border: "1px solid var(--line)", borderRadius: 20, overflow: "hidden", background: "rgba(255,255,255,0.03)", boxShadow: "0 8px 40px rgba(0,0,0,0.28)" }}>
      <div style={{ background: "var(--accent)", padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <MessageCircle size={18} color="white" strokeWidth={1.75} />
        </div>
        <div>
          <p style={{ color: "white", fontWeight: 700, fontSize: 14, margin: 0 }}>Phoenix Stoneworks AI</p>
          <p style={{ color: "rgba(255,255,255,0.80)", fontSize: 12, margin: 0 }}>Powered by RubyxQube · replies instantly</p>
        </div>
      </div>
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
            <div key={i} style={{ maxWidth: "82%", alignSelf: isUser ? "flex-end" : "flex-start", background: isUser ? "var(--accent)" : "rgba(255,255,255,0.08)", color: "var(--text)", borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "9px 13px", fontSize: 13, lineHeight: 1.45 }}>
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

export default function AiReceptionist() {
  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>AI Receptionist for Small Businesses — RubyxQube | Boise, ID</title>
        <meta name="description" content="24/7 AI receptionist for Treasure Valley businesses. Captures leads, answers questions, and sends instant alerts. Powered by Claude. Included in Autopilot from $399/mo." />
        <meta property="og:title" content="AI Receptionist for Small Businesses — RubyxQube" />
        <meta property="og:description" content="24/7 AI receptionist that captures leads, answers questions, and sends instant SMS alerts. Included in every Autopilot & Momentum plan." />
        <meta property="og:image" content="https://rubyxqube.com/og-default.png" />
        <meta property="og:url" content="https://rubyxqube.com/ai-receptionist" />
        <link rel="canonical" href="https://rubyxqube.com/ai-receptionist" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ_ITEMS.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
          }))
        })}</script>
      </Helmet>

      {/* ── Hero ── */}
      <section className="surface heroSurface">
        <div className="heroSection">
          <span className="badge" style={{ textAlign: "center", marginBottom: 20 }}>Included in Autopilot & Momentum</span>
          <h1 className="h1 heroTitle">
            The AI that works your <span className="accentText">front desk while you're in the field.</span>
          </h1>
          <p className="p" style={{ fontSize: 17, maxWidth: 560, marginBottom: 32 }}>
            A custom-trained AI receptionist built into your site from day one. It answers questions, qualifies leads, and texts you the moment someone's ready to book — 24/7, with no monthly fees beyond your plan.
          </p>
          <div className="btnRow">
            <Link className="btn primary" to="/contact">Get Started — $399/mo</Link>
            <Link className="btn" to="/pricing">See All Pricing</Link>
          </div>

          <div className="hr" style={{ marginTop: 52 }} />

          <div className="grid cols-3">
            <div className="kpi">
              <strong>Responds in &lt;2 seconds</strong>
              <span>Instant reply every time — no hold music, no voicemail</span>
            </div>
            <div className="kpi">
              <strong>Triple-alert system</strong>
              <span>SMS, email, and push notification the moment a lead comes in</span>
            </div>
            <div className="kpi">
              <strong>Trained on your business</strong>
              <span>Your services, prices, hours, and FAQs — not generic answers</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">How it works</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 40 }}>From visitor to lead in minutes — without you doing a thing.</h2>
          <div className="grid cols-3">
            {[
              { num: "01", title: "Visitor lands on your site", body: "At any hour, on any device. The chat widget appears automatically after a few seconds — or when they click the button." },
              { num: "02", title: "AI greets and qualifies them", body: "It introduces itself, answers their questions using your business info, and naturally guides the conversation toward a quote or booking." },
              { num: "03", title: "Lead captured, you're notified", body: "Once it has their name, contact info, and what they need — it saves the lead and fires an SMS to your phone with everything you need before you call back." },
            ].map(({ num, title, body }) => (
              <div key={num} className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--accent-dim)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "var(--accent)" }}>
                  {num}
                </div>
                <h3 className="h3">{title}</h3>
                <p className="p" style={{ marginBottom: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">What's included</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 40 }}>Everything your front desk should do — none of what it shouldn't.</h2>
          <div className="grid cols-2" style={{ gap: 24 }}>
            {[
              {
                icon: <Wrench size={24} color="var(--accent)" strokeWidth={1.75} />,
                title: "Trained on your specific business",
                body: "We write a custom system prompt covering your services, pricing tiers, service area, hours, and top FAQs — sourced from your onboarding questionnaire. The AI knows your business, not just web design generalities.",
              },
              {
                icon: <Bell size={24} color="var(--accent)" strokeWidth={1.75} />,
                title: "Triple-channel lead alerts",
                body: "When a lead is captured, we fire three simultaneous alerts: an SMS to your cell, an email to your inbox, and a push notification to our monitoring system. You'll know within seconds.",
              },
              {
                icon: <ShieldCheck size={24} color="var(--accent)" strokeWidth={1.75} />,
                title: "Lead data, automatically saved",
                body: "Every lead is saved with their name, contact info, and what they need. Your pipeline stays populated without any manual entry.",
              },
              {
                icon: <BarChart3 size={24} color="var(--accent)" strokeWidth={1.75} />,
                title: "Monthly conversation tuning",
                body: "Momentum clients get monthly AI tuning — we review real conversations, identify missed leads or awkward responses, and update the system prompt to fix them. The bot gets smarter over time.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="card" style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, marginTop: 2 }}>{icon}</div>
                <div>
                  <h3 className="h3" style={{ marginBottom: 8 }}>{title}</h3>
                  <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 56, alignItems: "center" }}>
            <div>
              <span className="badge">Live demo</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>
                This is what your customers experience — on a real client site.
              </h2>
              <p className="p">
                This is a simulated version of the same AI receptionist running live for Phoenix Stoneworks in Boise. Real AI, real conversation flow, real lead capture at the end. Try the real thing at pswboise.com — Phoenix Stoneworks is a live Momentum client.
              </p>
              <p className="p" style={{ marginBottom: 24 }}>
                When you sign up, we build one of these for your specific business — trained on your services, priced for your market, tuned to your tone.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "No scripted decision trees — it handles unexpected questions",
                  "Knows when to answer vs. when to pass to you",
                  "Lead data is saved automatically — no manual entry",
                  "SMS hits your phone within seconds of capture",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <CheckCircle2 size={15} color="rgba(34,197,94,0.85)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                    <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <ChatDemo />
          </div>
        </div>
      </section>

      {/* ── The tech ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "center" }}>
            <div>
              <span className="badge">Powered by Claude</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>
                Real AI — not a chatbot script with buttons.
              </h2>
              <p className="p">
                Your receptionist runs on Claude, made by Anthropic — the same AI powering Claude.ai and used by millions of professionals. It reasons, adapts, and handles unexpected inputs naturally.
              </p>
              <p className="p" style={{ marginBottom: 0 }}>
                Most chatbots are decision trees dressed up with a text box. Ours actually understands context — so when a customer asks something off-script, it doesn't dead-end them. It figures it out.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: <Zap size={18} color="var(--accent)" />, label: "Claude Haiku", detail: "Fast, affordable, capable — handles 99% of small business conversations effortlessly" },
                { icon: <ShieldCheck size={18} color="var(--accent)" />, label: "Privacy-first", detail: "API calls go server-side — your visitors' data never touches the browser directly" },
                { icon: <Wrench size={18} color="var(--accent)" />, label: "Fully customizable", detail: "System prompt is written per client — not a shared generic bot" },
              ].map(({ icon, label, detail }) => (
                <div key={label} className="card" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>{icon}</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>{label}</p>
                    <p className="p" style={{ marginBottom: 0, fontSize: 13 }}>{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Pricing</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>Included — not an add-on.</h2>
          <p className="p" style={{ maxWidth: 500, marginBottom: 36 }}>
            The AI receptionist is built into every Autopilot and Momentum plan. You don't pay extra for it — it comes with the site.
          </p>
          <div className="grid cols-3">
            {[
              {
                plan: "Autopilot",
                price: "$399/mo",
                detail: "No setup fee",
                bullets: ["AI receptionist included", "5–10 page custom site", "GA4 + Search Console", "Monthly report", "60 min/mo updates", "1 blog post/mo"],
                highlight: true,
                cta: "/contact",
              },
              {
                plan: "Momentum",
                price: "$999/mo",
                detail: "No setup fee",
                bullets: ["Everything in Autopilot", "4 blog posts/mo", "Developer on call", "Unlimited edits", "Monthly AI tuning", "GBP management"],
                highlight: false,
                cta: "/contact",
              },
              {
                plan: "Standalone",
                price: "$500 + $199/mo",
                detail: "For existing sites",
                bullets: ["Add AI to any site", "Full custom training", "Same lead alerts", "Lead data saved automatically", "Monthly support"],
                highlight: false,
                cta: "/contact",
              },
            ].map(({ plan, price, detail, bullets, highlight, cta }) => (
              <div key={plan} className={`card${highlight ? " cardHighlight" : ""}`} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 17, margin: "0 0 4px" }}>{plan}</p>
                  <p style={{ fontSize: 22, fontWeight: 800, margin: "0 0 2px", color: "var(--text)" }}>{price}</p>
                  <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>{detail}</p>
                </div>
                <ul className="list" style={{ margin: 0, flex: 1 }}>
                  {bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <Link className={`btn${highlight ? " primary" : ""}`} to={cta} style={{ textAlign: "center" }}>Get Started</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">FAQ</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 32 }}>Common questions about the AI receptionist.</h2>
          <FAQAccordion />
        </div>
      </section>

      <CTA
        title="Ready to stop missing leads after hours?"
        subtitle="Start with a free audit. Boyd will tell you exactly what you're missing and how the AI receptionist would fit your business."
      />
    </div>
  );
}

