import React from "react";
import { Link } from "react-router-dom";
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
      { label: "Marketing Site", href: "https://www.bastionmsp.com" },
      { label: "Client Portal", href: "https://portal.bastionmsp.com" },
    ],
  },
];

const clientWork = [
  {
    id: "phoenix-stoneworks",
    category: "Stoneworks · Treasure Valley",
    name: "Phoenix Stoneworks",
    role: "Web Designer & Developer",
    description:
      "Website built to help a local stoneworks company look professional online and make it easy for customers to request estimates.",
    tech: "React · Vite · Custom CSS",
    bullets: [
      "Mobile-first responsive layout",
      "Clear service positioning and calls to action",
      "Quote and estimate request flow",
      "Google Maps embed for local visibility",
    ],
    links: [
      { label: "Visit Site", href: "https://phoenix-stoneworks.com" },
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
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                    {project.category}
                  </p>
                  <h2 className="h2" style={{ marginBottom: 10 }}>{project.name}</h2>
                  <p className="p" style={{ marginBottom: 20 }}>{project.description}</p>
                  <ul className="list">
                    {project.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>

                {/* Right: role, tech, links */}
                <div style={{ flex: "0 1 240px", display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.40)", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 6 }}>Role</p>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 700,
                      background: "rgba(59,130,246,0.15)",
                      border: "1px solid rgba(59,130,246,0.30)",
                      color: "#93c5fd",
                    }}>
                      {project.role}
                    </span>
                  </div>

                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.40)", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 6 }}>Built with</p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.60)", margin: 0 }}>{project.tech}</p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        className="btn primary"
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        style={{ justifyContent: "center" }}
                      >
                        {link.label} ↗
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
                <p style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                  {project.category}
                </p>
                <h2 className="h2" style={{ marginBottom: 10 }}>{project.name}</h2>
                <p className="p" style={{ marginBottom: 16 }}>{project.description}</p>
                <ul className="list" style={{ flex: 1 }}>
                  {project.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <div className="hr" />
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.40)", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 12 }}>Built with</div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.60)", marginBottom: 20 }}>{project.tech}</p>
                <div className="btnRow">
                  {project.links.map((link) => (
                    <a key={link.href} className="btn primary" href={link.href} target="_blank" rel="noreferrer">
                      {link.label} ↗
                    </a>
                  ))}
                  <Link className="btn" to="/quote">Build Something Similar</Link>
                </div>
              </div>
            ))}

            {/* Placeholder — grows as clients are added */}
            <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", border: "1px dashed rgba(59,130,246,0.25)", background: "rgba(59,130,246,0.04)" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                Your business · {siteConfig.serviceArea}
              </p>
              <h2 className="h2" style={{ marginBottom: 10 }}>Want a site like this?</h2>
              <p className="p" style={{ marginBottom: 24 }}>
                If you're a service business in the {siteConfig.serviceArea}, I'll build you a clean, fast site that actually brings in leads — and an AI receptionist that never goes offline.
              </p>
              <div className="btnRow">
                <Link className="btn primary" to="/quote">Get a Quote</Link>
                <Link className="btn" to="/pricing">See Pricing</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTA title="Ready to be the next project?" subtitle="Most sites launch in 2–3 weeks. Let's get yours started." />
    </div>
  );
}
