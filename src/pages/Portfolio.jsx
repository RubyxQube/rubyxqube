import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";

// ─── Project data ────────────────────────────────────────────────
// To add a new client: push a new object to clientWork below.
const coFounded = [
  {
    id: "bastion-msp",
    category: "Cybersecurity · MSSP",
    name: "Bastion MSP",
    role: "Co-Founder",
    description:
      "Co-founded and built a managed security service provider from the ground up. Designed the full brand identity and built both the public marketing site and a client-facing security portal — targeting SMBs in regulated industries.",
    tech: "Next.js · TypeScript · Tailwind CSS",
    bullets: [
      "Full brand identity — logo, color system, typography",
      "Marketing site with full copywriting and positioning",
      "Client portal: security dashboards, compliance tracking, incident response",
      "Services: 24/7 MDR, vulnerability management, cloud security (AWS / Azure / GCP)",
      "Targeting finance, healthcare, and logistics verticals",
      "Enterprise-grade security without enterprise overhead",
    ],
    links: [
      { label: "Visit Site", href: "https://www.bastionmsp.com" },
    ],
  },
];

const clientWork = [
  {
    id: "phoenix-stoneworks",
    category: "Stone Fabrication · Treasure Valley",
    name: "Phoenix Stoneworks",
    role: "Web Designer & Developer",
    description:
      "Full Momentum plan client — a complete web platform for a Treasure Valley stone fabrication company. Far beyond a brochure site: material catalogs, online quote calculators, an AI photo estimate tool, a wholesale partner portal, and a customer account system — all built from scratch.",
    tech: "React · Vite · Custom CSS · Claude AI · Supabase · Vercel",
    bullets: [
      "20+ page platform: material catalogs, service sub-pages, gallery, and planning tools",
      "AI Photo Estimate — customers upload a photo and get an instant rough quote",
      "Quote calculators for homeowners + protected wholesale portal for contractor partners",
      "Customer account system with project dashboard; admin pipeline portal for the team",
      "AI receptionist for 24/7 lead capture with instant SMS + email alerts",
    ],
    links: [
      { label: "Visit Site", href: "https://pswboise.com/" },
    ],
  },
  {
    id: "sudz-window-gutter",
    category: "Window & Gutter Cleaning · Treasure Valley",
    name: "Sudz Window and Gutter Cleaning",
    role: "Web Designer & Developer",
    description:
      "Complete site rebuild for a locally trusted window and gutter cleaning company — replacing a slow Wix template with a fast, mobile-first site that surfaces Chase's real reputation and converts visitors into quote requests.",
    tech: "React · Vite · Custom CSS · Claude AI · Vercel",
    bullets: [
      "Custom mobile-first website replacing a generic Wix template",
      "5.0-star Google reviews and Nextdoor trust signals surfaced above the fold",
      "AI receptionist for after-hours lead capture and FAQ answering",
      "Quote request flow with instant SMS + email alert to Chase",
      "Services: window cleaning, gutter cleaning, holiday lighting",
      "Serving Boise, Meridian, Eagle, and Garden City",
    ],
    links: [
      { label: "Visit Site", href: "https://sudz-boise.vercel.app/" },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <div className="pageMinHeight">

      {/* ── Header ── */}
      <section className="surface heroSurface">
        <div className="section" style={{ paddingTop: 80, paddingBottom: 64 }}>
          <span className="badge">Work</span>
          <h1 className="h1" style={{ marginTop: 16, maxWidth: "20ch" }}>
            Projects built with <span className="accentText">real stakes.</span>
          </h1>
          <p className="p" style={{ maxWidth: 540, fontSize: 17 }}>
            From co-founding a cybersecurity company to building websites for local service businesses — every project here is live, real, and built from scratch.
          </p>
        </div>
      </section>

      {/* ── Co-Founded ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Co-Founded</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>Companies I helped build</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 36 }}>
            Not client work — actual co-founded businesses where I handled strategy, brand, and the full web stack.
          </p>

          {coFounded.map((project) => (
            <div key={project.id} className="card cardHighlight" style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-start" }}>

                {/* Left: description + bullets */}
                <div style={{ flex: "1 1 320px" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                    {project.category}
                  </p>
                  <h2 className="h2" style={{ marginBottom: 10 }}>{project.name}</h2>
                  <p className="p" style={{ marginBottom: 20 }}>{project.description}</p>
                  <ul className="list">
                    {project.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>

                {/* Right: role, tech, links */}
                <div style={{ flex: "1 1 240px", display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 6 }}>Role</p>
                    <span className="badge">{project.role}</span>
                  </div>

                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 6 }}>Built with</p>
                    <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>{project.tech}</p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        className="btn primary"
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        style={{ justifyContent: "center", width: "100%" }}
                      >
                        {link.label} <ExternalLink size={13} style={{ marginLeft: 4, verticalAlign: "middle" }} />
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Client Work ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Client work</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>Websites built for local businesses</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 36 }}>
            Every site is built from scratch — clean, fast, mobile-first, and focused on turning visitors into customers.
          </p>

          <div className="grid cols-2">
            {clientWork.map((project) => (
              <div key={project.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                  {project.category}
                </p>
                <h2 className="h2" style={{ marginBottom: 10 }}>{project.name}</h2>
                <p className="p" style={{ marginBottom: 16 }}>{project.description}</p>
                <ul className="list" style={{ flex: 1 }}>
                  {project.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <div className="hr" />
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 12 }}>Built with</div>
                <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>{project.tech}</p>
                <div className="btnRow">
                  {project.links.map((link) => (
                    <a key={link.href} className="btn primary" href={link.href} target="_blank" rel="noreferrer">
                      {link.label} <ExternalLink size={13} style={{ marginLeft: 4, verticalAlign: "middle" }} />
                    </a>
                  ))}
                  <Link className="btn" to="/quote">Build Something Similar</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Full-width prompt — grows as more client cards fill the grid */}
          <div className="card" style={{ marginTop: 24, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24, border: "1px dashed rgba(59,130,246,0.25)", background: "rgba(59,130,246,0.04)" }}>
            <div style={{ flex: "1 1 320px" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                Your business · {siteConfig.serviceArea}
              </p>
              <h2 className="h2" style={{ marginBottom: 8 }}>Want a site like this?</h2>
              <p className="p" style={{ marginBottom: 0 }}>
                If you're a service business in the {siteConfig.serviceArea}, I'll build you a clean, fast site that actually brings in leads — and an AI receptionist that never goes offline.
              </p>
            </div>
            <div className="btnRow" style={{ flexShrink: 0 }}>
              <Link className="btn primary" to="/quote">Get a Quote</Link>
              <Link className="btn" to="/pricing">See Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      <CTA title="Ready to be the next project?" subtitle="Most sites launch in as little as 3 days. Let's get yours started." />
    </div>
  );
}
