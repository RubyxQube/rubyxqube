import React from "react";
import { Link } from "react-router-dom";

// ── Sample data ────────────────────────────────────────────────────────────
const CLIENT = {
  name: "Phoenix Stoneworks",
  package: "Autopilot",
  month: "April 2025",
  generatedOn: "May 1, 2025",
};

const SUMMARY = [
  { label: "Website Visitors", value: "847", delta: "+12%", up: true },
  { label: "Leads Captured", value: "14", delta: "+3 vs last month", up: true },
  { label: "Chatbot Conversations", value: "63", delta: "74% handled without human", up: true },
  { label: "Avg. Response Time", value: "< 2s", delta: "24/7 coverage", up: true },
];

const TRAFFIC = [
  { label: "Week 1", visitors: 178, pct: 63 },
  { label: "Week 2", visitors: 201, pct: 71 },
  { label: "Week 3", visitors: 224, pct: 79 },
  { label: "Week 4", visitors: 244, pct: 86 },
];

const TOP_PAGES = [
  { page: "/", label: "Home", views: 412, pct: 85 },
  { page: "/services", label: "Services", views: 198, pct: 41 },
  { page: "/contact", label: "Contact / Quote", views: 143, pct: 29 },
  { page: "/portfolio", label: "Portfolio", views: 94, pct: 19 },
];

const LEADS = [
  { date: "Apr 3", name: "Mark T.", contact: "markT@email.com", need: "Patio installation, Meridian" },
  { date: "Apr 7", name: "Sandra L.", contact: "(208) 555-0192", need: "Fireplace surround quote" },
  { date: "Apr 11", name: "Dave R.", contact: "d.r@gmail.com", need: "Retaining wall, backyard — Eagle" },
  { date: "Apr 14", name: "Kim W.", contact: "(208) 555-0344", need: "Outdoor kitchen countertops" },
  { date: "Apr 19", name: "James P.", contact: "jpeters@work.com", need: "Commercial project — lobby floors" },
  { date: "Apr 22", name: "Tina C.", contact: "(208) 555-0871", need: "Front walkway + steps, Nampa" },
  { date: "Apr 25", name: "Ryan B.", contact: "rb@outlook.com", need: "Pool coping + deck remodel" },
];

const CHATBOT_TOPICS = [
  { topic: "Pricing & quotes", count: 24, pct: 88 },
  { topic: "Materials & options", count: 18, pct: 66 },
  { topic: "Timeline questions", count: 11, pct: 40 },
  { topic: "Service area check", count: 7, pct: 26 },
  { topic: "After-hours inquiries", count: 3, pct: 11 },
];

const UPDATES = [
  "Updated Services page with new outdoor kitchen photos from the Eagle project",
  "Added Meridian to service area callout on the homepage",
  "Fixed mobile spacing on the Portfolio gallery",
];

// ── Sub-components ─────────────────────────────────────────────────────────
function StatCard({ label, value, delta, up }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 14,
      padding: "22px 24px",
    }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 8px" }}>{label}</p>
      <p style={{ fontSize: 36, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.02em" }}>{value}</p>
      <p style={{ fontSize: 12, margin: 0, color: up ? "rgba(34,197,94,0.85)" : "rgba(255,100,100,0.85)", fontWeight: 600 }}>
        {up ? "↑ " : "↓ "}{delta}
      </p>
    </div>
  );
}

function Bar({ pct, color = "var(--accent)" }) {
  return (
    <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width 0.6s ease" }} />
    </div>
  );
}

function SectionHead({ label, title }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
      <h2 style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "6px 0 0" }}>{title}</h2>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Report() {
  return (
    <div className="pageMinHeight" style={{ background: "var(--bg)" }}>

      {/* ── Demo banner ── */}
      <div style={{
        background: "rgba(225,29,72,0.10)",
        borderBottom: "1px solid rgba(225,29,72,0.22)",
        padding: "10px 24px",
        textAlign: "center",
        fontSize: 13,
        color: "rgba(255,255,255,0.70)",
      }}>
        📊 This is a <strong style={{ color: "rgba(255,255,255,0.90)" }}>sample monthly report</strong> — Autopilot and Momentum clients receive one of these every month. &nbsp;
        <Link to="/pricing" style={{ color: "var(--accent)", textDecoration: "underline" }}>See plans →</Link>
      </div>

      {/* ── Report header ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 32px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>
              Monthly Performance Report
            </p>
            <h1 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 6px" }}>
              {CLIENT.name}
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", margin: 0 }}>
              {CLIENT.month} · {CLIENT.package} Package · Generated {CLIENT.generatedOn}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.20)", borderRadius: 10, padding: "8px 16px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "rgba(34,197,94,0.90)", fontWeight: 600 }}>Site live & healthy</span>
          </div>
        </div>

        {/* ── KPI cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 48 }}>
          {SUMMARY.map((s) => <StatCard key={s.label} {...s} />)}
        </div>

        {/* ── Traffic ── */}
        <div style={{ marginBottom: 48 }}>
          <SectionHead label="Traffic" title="Website visitors this month" />
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
            {TRAFFIC.map((w) => (
              <div key={w.label} style={{ display: "grid", gridTemplateColumns: "72px 1fr 56px", gap: 16, alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.50)" }}>{w.label}</span>
                <Bar pct={w.pct} />
                <span style={{ fontSize: 14, fontWeight: 600, textAlign: "right" }}>{w.visitors}</span>
              </div>
            ))}
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.30)", margin: "4px 0 0", textAlign: "right" }}>
              Source: Google Analytics 4
            </p>
          </div>
        </div>

        {/* ── Top pages ── */}
        <div style={{ marginBottom: 48 }}>
          <SectionHead label="Pages" title="Most visited pages" />
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
            {TOP_PAGES.map((p, i) => (
              <div key={p.page} style={{
                display: "grid",
                gridTemplateColumns: "1fr 80px 120px",
                gap: 16,
                alignItems: "center",
                padding: "14px 24px",
                borderBottom: i < TOP_PAGES.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{p.label}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.30)", marginLeft: 8 }}>{p.page}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, textAlign: "right" }}>{p.views}</span>
                <Bar pct={p.pct} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Leads ── */}
        <div style={{ marginBottom: 48 }}>
          <SectionHead label="Leads" title={`${LEADS.length} leads captured this month`} />
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
            {LEADS.map((l, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "60px 120px 1fr",
                gap: 16,
                alignItems: "center",
                padding: "14px 24px",
                borderBottom: i < LEADS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{l.date}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{l.name}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.60)" }}>{l.need}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.30)", marginTop: 10 }}>
            Contact details redacted in this demo. Real reports include full name, email/phone, and AI conversation summary.
          </p>
        </div>

        {/* ── Chatbot breakdown ── */}
        <div style={{ marginBottom: 48 }}>
          <SectionHead label="AI Receptionist" title="Chatbot conversation topics" />
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
            {CHATBOT_TOPICS.map((t) => (
              <div key={t.topic} style={{ display: "grid", gridTemplateColumns: "1fr 48px 120px", gap: 16, alignItems: "center" }}>
                <span style={{ fontSize: 14 }}>{t.topic}</span>
                <span style={{ fontSize: 14, fontWeight: 600, textAlign: "right" }}>{t.count}</span>
                <Bar pct={t.pct} color="rgba(225,29,72,0.70)" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Site updates ── */}
        <div style={{ marginBottom: 48 }}>
          <SectionHead label="Site Updates" title="Changes made this month" />
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
            {UPDATES.map((u, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>{u}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer note ── */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "32px 0 64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}>
          <div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.40)", margin: "0 0 4px" }}>
              Prepared by Boyd Querubin · RubyxQube
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", margin: 0 }}>
              Questions? boyd@rubyxqube.com · (208) 970-8624
            </p>
          </div>
          <Link to="/pricing" className="btn primary" style={{ display: "inline-flex" }}>
            Get this for your business →
          </Link>
        </div>

      </div>
    </div>
  );
}
