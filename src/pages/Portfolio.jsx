import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";

const coFounded = [
  {
    id: "bastion-msp",
    preview: "/portfolio/bastionmsp-preview.webp",
    category: "Cybersecurity · MSSP",
    name: "BastionMSP",
    role: "Co-Founder",
    hook: "Built a managed security service provider from scratch — brand identity, marketing site, and client security portal.",
    tags: ["Brand Identity", "Marketing Site", "Client Portal", "Enterprise Security"],
    tech: "Next.js · TypeScript · Tailwind CSS",
    links: [{ label: "Visit Site", href: "https://www.bastionmsp.com" }],
  },
];

const clientWork = [
  {
    id: "phoenix-stoneworks",
    preview: "/portfolio/psw-preview.webp",
    category: "Stone Fabrication · Treasure Valley",
    name: "Phoenix Stoneworks",
    hook: "Full web platform — far beyond a brochure site.",
    tags: ["AI Photo Estimate", "Quote Calculator", "Wholesale Portal", "Account System", "AI Receptionist"],
    tech: "React · Vite · Claude AI · Supabase · Vercel",
    links: [{ label: "Visit Site", href: "https://pswboise.com/" }],
  },
  {
    id: "sudz-window-gutter",
    preview: "/portfolio/sudz-preview.webp",
    category: "Window & Gutter Cleaning · Treasure Valley",
    name: "Sudz Window and Gutter Cleaning",
    hook: "Full site rebuild replacing a slow Wix template.",
    tags: ["AI Receptionist", "Lead Capture", "SMS Alerts", "5.0-Star Reviews"],
    tech: "React · Vite · Claude AI · Vercel",
    links: [{ label: "Visit Site", href: "https://sudz-boise.vercel.app/" }],
  },
];

function Tag({ label }) {
  return (
    <span style={{
      fontSize: 12, fontWeight: 500,
      padding: "4px 10px", borderRadius: 99,
      background: "var(--accent-dim)",
      border: "1px solid var(--accent-border)",
      color: "var(--muted)",
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

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
            Every project here is live, real, and built from scratch.
          </p>
        </div>
      </section>

      {/* ── Co-Founded ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">Co-Founded</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 36 }}>Companies I helped build</h2>

          {coFounded.map((project) => (
            <div key={project.id} className="card cardHighlight" style={{ padding: 0, overflow: "hidden", marginBottom: 24 }}>
              {project.preview && (
                <a href={project.links[0].href} target="_blank" rel="noreferrer">
                  <img
                    src={project.preview}
                    alt={`${project.name} website screenshot`}
                    width={1280} height={720} loading="lazy"
                    style={{ width: "100%", height: "auto", display: "block", aspectRatio: "16/9" }}
                  />
                </a>
              )}
              <div className="featureRow" style={{ padding: 24, alignItems: "flex-start" }}>
                <div style={{ flex: "1 1 320px" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{project.category}</p>
                  <h2 className="h2" style={{ marginBottom: 8 }}>{project.name}</h2>
                  <p className="p" style={{ marginBottom: 16 }}>{project.hook}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {project.tags.map(t => <Tag key={t} label={t} />)}
                  </div>
                </div>
                <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 6 }}>Role</p>
                    <span className="badge">{project.role}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 6 }}>Built with</p>
                    <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>{project.tech}</p>
                  </div>
                  {project.links.map((link) => (
                    <a key={link.href} className="btn primary" href={link.href} target="_blank" rel="noreferrer" style={{ justifyContent: "center" }}>
                      {link.label} <ExternalLink size={13} style={{ marginLeft: 4, verticalAlign: "middle" }} />
                    </a>
                  ))}
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
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 36 }}>Websites built for local businesses</h2>

          <div className="grid cols-2">
            {clientWork.map((project) => (
              <div key={project.id} className="card" style={{ display: "flex", flexDirection: "column", padding: 0, overflow: "hidden" }}>
                {project.preview && (
                  <a href={project.links[0].href} target="_blank" rel="noreferrer">
                    <img
                      src={project.preview}
                      alt={`${project.name} website screenshot`}
                      width={1280} height={720} loading="lazy"
                      style={{ width: "100%", height: "auto", display: "block", aspectRatio: "16/9" }}
                    />
                  </a>
                )}
                <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{project.category}</p>
                  <h3 className="h3" style={{ marginBottom: 8 }}>{project.name}</h3>
                  <p className="p" style={{ fontSize: 14, marginBottom: 16 }}>{project.hook}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20, flex: 1 }}>
                    {project.tags.map(t => <Tag key={t} label={t} />)}
                  </div>
                  <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}>{project.tech}</p>
                  <div className="btnRow">
                    {project.links.map((link) => (
                      <a key={link.href} className="btn primary" href={link.href} target="_blank" rel="noreferrer">
                        {link.label} <ExternalLink size={13} style={{ marginLeft: 4, verticalAlign: "middle" }} />
                      </a>
                    ))}
                    <Link className="btn" to="/quote">Build Something Similar</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full-width CTA strip */}
          <div className="card" style={{ marginTop: 24, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24, border: "1px dashed rgba(59,130,246,0.25)", background: "rgba(59,130,246,0.04)" }}>
            <div style={{ flex: "1 1 320px" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                Your business · {siteConfig.serviceArea}
              </p>
              <h2 className="h2" style={{ marginBottom: 8 }}>Want a site like this?</h2>
              <p className="p" style={{ marginBottom: 0 }}>
                I'll build you a clean, fast site that actually brings in leads — and an AI receptionist that never goes offline.
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
