import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";

// ─── Design catalogue ────────────────────────────────────────────────────────
const DESIGNS = [
  {
    id: "tradesman",
    name: "The Tradesman",
    tagline: "Bold, high-contrast, built to convert",
    desc: "Dark background, bold typography, phone number front and center. Makes trades businesses look established and trustworthy the moment someone lands on the page.",
    industries: ["Plumbing", "HVAC", "Electrical", "Roofing", "Landscaping", "Concrete"],
    palette: { bg: "#111827", nav: "#0f172a", hero: "#111827", accent: "#f59e0b", text: "#ffffff", muted: "#6b7280", card: "#1f2937" },
  },
  {
    id: "professional",
    name: "The Professional",
    tagline: "Clean, minimal, corporate confidence",
    desc: "White space, navy accents, clean structured layout. Builds immediate trust and credibility for professional service providers who need to look polished.",
    industries: ["Law", "Accounting", "Consulting", "Financial", "Insurance", "Medical"],
    palette: { bg: "#f8fafc", nav: "#1e3a5f", hero: "#ffffff", accent: "#1e3a5f", text: "#1e293b", muted: "#94a3b8", card: "#f1f5f9" },
  },
  {
    id: "local",
    name: "The Local",
    tagline: "Warm, inviting, community-first",
    desc: "Warm tones, story-driven layout, reviews front and center. Makes local businesses feel welcoming and like a trusted part of the neighborhood.",
    industries: ["Restaurant", "Café", "Salon", "Bakery", "Boutique", "Florist"],
    palette: { bg: "#fef9f0", nav: "#2d5016", hero: "#fef9f0", accent: "#2d5016", text: "#1c1917", muted: "#a8a29e", card: "#fef3c7" },
  },
  {
    id: "modern",
    name: "The Modern",
    tagline: "Sleek, minimal, unmistakably premium",
    desc: "Pure black canvas, bold typography, surgical use of accent color. For businesses that want to look like the most premium option in their market.",
    industries: ["Real Estate", "Architecture", "Photography", "Interior Design", "Marketing"],
    palette: { bg: "#0a0a0a", nav: "#0a0a0a", hero: "#0a0a0a", accent: "#e11d48", text: "#ffffff", muted: "#525252", card: "#171717" },
  },
  {
    id: "bold",
    name: "The Bold",
    tagline: "High-energy, action-oriented, call-driving",
    desc: "Strong blue and orange contrast, action-focused CTAs, no wasted space. Built for businesses where every visitor is a potential job — and speed matters.",
    industries: ["Auto Repair", "Towing", "Moving", "Pest Control", "Security", "Gym"],
    palette: { bg: "#ffffff", nav: "#1e40af", hero: "#1e40af", accent: "#f97316", text: "#1e293b", muted: "#94a3b8", card: "#f1f5f9" },
  },
  {
    id: "warm",
    name: "The Warm",
    tagline: "Friendly, approachable, relationship-first",
    desc: "Amber tones, testimonials lead the page, approachable photography. For service businesses built on personal trust where referrals are everything.",
    industries: ["Cleaning", "Childcare", "Pet Services", "Senior Care", "Tutoring", "Therapy"],
    palette: { bg: "#fffbeb", nav: "#92400e", hero: "#fffbeb", accent: "#d97706", text: "#1c1917", muted: "#a8a29e", card: "#fef3c7" },
  },
  {
    id: "outdoors",
    name: "The Outdoors",
    tagline: "Rugged, earthy, built for the field",
    desc: "Deep forest greens, earthy tones, and a grounded layout that signals experience. For businesses that work outside and want a site that feels as solid as their work.",
    industries: ["Tree Service", "Fencing", "Hunting Guide", "Farming", "Outdoor Recreation", "Excavation"],
    palette: { bg: "#f5f0e0", nav: "#1a3a1a", hero: "#f5f0e0", accent: "#2d6a2d", text: "#1c1917", muted: "#78716c", card: "#e8e0cc" },
  },
  {
    id: "wellness",
    name: "The Wellness",
    tagline: "Calm, clean, health-focused",
    desc: "Soft teal accents, open white space, and a layout that feels as calming as the services offered. Builds confidence that clients are in good hands.",
    industries: ["Chiropractic", "Physical Therapy", "Massage", "Yoga", "Nutrition", "Mental Health"],
    palette: { bg: "#f0fdfa", nav: "#0d9488", hero: "#ffffff", accent: "#0d9488", text: "#134e4a", muted: "#94a3b8", card: "#ccfbf1" },
  },
  {
    id: "luxury",
    name: "The Luxury",
    tagline: "Premium, sophisticated, unforgettable",
    desc: "Deep charcoal, gold accents, and refined typography that signals you are the premium option in your market. Clients self-qualify before they even call.",
    industries: ["Wedding Planning", "Luxury Real Estate", "Catering", "Spa", "Jewelry", "Event Design"],
    palette: { bg: "#0f0f0f", nav: "#0f0f0f", hero: "#0f0f0f", accent: "#c9a84c", text: "#fefce8", muted: "#78716c", card: "#1a1a1a" },
  },
  {
    id: "clinical",
    name: "The Clinical",
    tagline: "Clean, precise, patient-ready",
    desc: "Clinical whites, sky blue accents, and structured layout that immediately signals professionalism and care. Patients decide within seconds whether they trust you — this design earns it.",
    industries: ["Dental", "Medical", "Optometry", "Dermatology", "Urgent Care", "Veterinary"],
    palette: { bg: "#f8fafc", nav: "#0369a1", hero: "#ffffff", accent: "#0284c7", text: "#0c1a2e", muted: "#94a3b8", card: "#e0f2fe" },
  },
  {
    id: "builder",
    name: "The Builder",
    tagline: "Solid, structural, project-driven",
    desc: "Industrial textures, project portfolio front and center, built-for-scale layout. For general contractors and developers who win jobs on reputation and need a site that shows serious work.",
    industries: ["General Contractor", "Home Builder", "Developer", "Remodeling", "Commercial Build", "Excavation"],
    palette: { bg: "#1c1c1c", nav: "#111111", hero: "#1c1c1c", accent: "#ea580c", text: "#ffffff", muted: "#6b7280", card: "#2a2a2a" },
  },
  {
    id: "storefront",
    name: "The Storefront",
    tagline: "Product-first, scroll-stopping, shop-ready",
    desc: "Bold product photography, clean shop layout, built to convert browsers into buyers. For product-based businesses — online or brick-and-mortar — where the product does the selling.",
    industries: ["Online Shop", "Boutique", "Handmade Goods", "Specialty Food", "Gift Shop", "Craft Brewery"],
    palette: { bg: "#ffffff", nav: "#18181b", hero: "#f4f4f5", accent: "#7c3aed", text: "#18181b", muted: "#71717a", card: "#fafafa" },
  },
];

// ─── Color palettes ───────────────────────────────────────────────────────────
const PALETTES = [
  { id: "ruby-red",     name: "Ruby Red",      mood: "Bold & modern",       colors: ["#e11d48","#0a0809","#c0112f","#ffffff","#6b7280"] },
  { id: "ocean-deep",   name: "Ocean Deep",    mood: "Strong & trustworthy", colors: ["#1e40af","#0f172a","#3b82f6","#dbeafe","#ffffff"] },
  { id: "forest-pro",   name: "Forest Pro",    mood: "Grounded & natural",   colors: ["#1a3a1a","#2d6a2d","#f5f0e0","#c4a882","#ffffff"] },
  { id: "sunset-bold",  name: "Sunset Bold",   mood: "Energetic & warm",     colors: ["#ea580c","#1c1917","#fef3c7","#fb923c","#ffffff"] },
  { id: "pure-clean",   name: "Pure Clean",    mood: "Crisp & professional", colors: ["#0f172a","#3b82f6","#f8fafc","#e2e8f0","#93c5fd"] },
  { id: "gold-luxe",    name: "Gold Luxe",     mood: "Premium & refined",    colors: ["#0f0f0f","#c9a84c","#fefce8","#a16207","#1a1a1a"] },
  { id: "teal-fresh",   name: "Teal Fresh",    mood: "Calm & health-forward",colors: ["#0d9488","#f0fdfa","#134e4a","#99f6e4","#ffffff"] },
  { id: "purple-pro",   name: "Purple Pro",    mood: "Creative & confident", colors: ["#7c3aed","#0f0f0f","#f5f3ff","#a78bfa","#ffffff"] },
  { id: "slate-modern", name: "Slate Modern",  mood: "Sleek & understated",  colors: ["#1e293b","#334155","#3b82f6","#f8fafc","#e2e8f0"] },
  { id: "warm-amber",   name: "Warm Amber",    mood: "Friendly & inviting",  colors: ["#d97706","#fffbeb","#1c1917","#fbbf24","#92400e"] },
  { id: "navy-classic", name: "Navy Classic",  mood: "Trusted & established",colors: ["#1e3a5f","#f8fafc","#c4a882","#dbeafe","#0f172a"] },
  { id: "crimson-dark", name: "Crimson Dark",  mood: "Powerful & urgent",    colors: ["#dc2626","#111827","#ffffff","#fca5a5","#374151"] },
];

function coolorsUrl(colors) {
  return "https://coolors.co/" + colors.map(c => c.replace("#", "")).join("-");
}

// ─── Palette picker ───────────────────────────────────────────────────────────
function PalettePicker({ selectedPalette, onSelect }) {
  const picked = PALETTES.find(p => p.id === selectedPalette);

  return (
    <div>
      <div className="grid cols-4" style={{ gap: 12, marginBottom: 24 }}>
        {PALETTES.map(p => (
          <div
            key={p.id}
            onClick={() => onSelect(p.id === selectedPalette ? null : p.id)}
            style={{
              background: "var(--surface)",
              border: selectedPalette === p.id
                ? "2px solid var(--accent)"
                : "2px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              padding: "12px 14px",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
          >
            {/* Swatches */}
            <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
              {p.colors.map((color, i) => (
                <div key={i} style={{
                  flex: 1,
                  height: 28,
                  background: color,
                  borderRadius: 5,
                  border: "1px solid rgba(255,255,255,0.08)",
                }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{p.name}</span>
              {selectedPalette === p.id && (
                <span style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600 }}>✓ Selected</span>
              )}
            </div>
            <span style={{ fontSize: 11, color: "var(--muted)" }}>{p.mood}</span>
          </div>
        ))}
      </div>

      {/* Selected palette CTA */}
      {picked && (
        <div style={{
          background: "var(--surface)",
          border: "1px solid rgba(225,29,72,0.25)",
          borderRadius: 12,
          padding: "20px 24px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 16,
          marginBottom: 16,
        }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontWeight: 700, marginBottom: 4 }}>
              You picked: <span style={{ color: "var(--accent)" }}>{picked.name}</span>
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>
              Mention "{picked.name}" on your audit call — Boyd will build your site around this palette.
            </p>
          </div>
          <a
            href={coolorsUrl(picked.colors)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{ borderColor: "rgba(255,255,255,0.15)", flexShrink: 0 }}
          >
            View on Coolors ↗
          </a>
        </div>
      )}

      {/* Coolors explore link */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>Want to explore more?</span>
        <a
          href="https://coolors.co/generate"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}
        >
          Open Coolors palette generator ↗
        </a>
        <span style={{ fontSize: 12, color: "var(--muted)", opacity: 0.6 }}>— screenshot your favorite and share it on the call</span>
      </div>
    </div>
  );
}

// ─── Mini mockup preview ─────────────────────────────────────────────────────
function MockupPreview({ p }) {
  return (
    <div style={{
      width: "100%",
      aspectRatio: "16/10",
      borderRadius: 8,
      overflow: "hidden",
      background: p.bg,
      border: "1px solid rgba(255,255,255,0.06)",
      flexShrink: 0,
    }}>
      {/* Navbar */}
      <div style={{
        background: p.nav,
        height: 22,
        display: "flex",
        alignItems: "center",
        padding: "0 10px",
        gap: 6,
        borderBottom: `2px solid ${p.accent}`,
      }}>
        <div style={{ width: 14, height: 14, background: p.accent, borderRadius: 3 }} />
        <div style={{ width: 28, height: 5, background: p.text, borderRadius: 2, opacity: 0.8 }} />
        <div style={{ flex: 1 }} />
        {[1,2,3].map(i => (
          <div key={i} style={{ width: 18, height: 4, background: p.text, borderRadius: 2, opacity: 0.3 }} />
        ))}
        <div style={{ width: 22, height: 10, background: p.accent, borderRadius: 3 }} />
      </div>

      {/* Hero */}
      <div style={{
        background: p.hero,
        padding: "14px 12px 12px",
        borderBottom: `1px solid ${p.card}`,
      }}>
        <div style={{ width: "75%", height: 8, background: p.text, borderRadius: 3, opacity: 0.85, marginBottom: 6 }} />
        <div style={{ width: "55%", height: 5, background: p.text, borderRadius: 2, opacity: 0.35, marginBottom: 4 }} />
        <div style={{ width: "40%", height: 5, background: p.text, borderRadius: 2, opacity: 0.35, marginBottom: 10 }} />
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 44, height: 13, background: p.accent, borderRadius: 4 }} />
          <div style={{ width: 36, height: 13, background: "transparent", border: `1.5px solid ${p.accent}`, borderRadius: 4, opacity: 0.5 }} />
        </div>
      </div>

      {/* Cards row */}
      <div style={{ display: "flex", gap: 6, padding: "10px 12px" }}>
        {[1,2,3].map(i => (
          <div key={i} style={{
            flex: 1,
            background: p.card,
            borderRadius: 5,
            padding: "7px 6px",
          }}>
            <div style={{ width: 14, height: 14, background: p.accent, borderRadius: 3, opacity: 0.7, marginBottom: 5 }} />
            <div style={{ width: "80%", height: 4, background: p.text, borderRadius: 2, opacity: 0.5, marginBottom: 3 }} />
            <div style={{ width: "60%", height: 3, background: p.text, borderRadius: 2, opacity: 0.25 }} />
          </div>
        ))}
      </div>

      {/* CTA bar */}
      <div style={{
        background: p.accent,
        margin: "0 12px",
        borderRadius: 5,
        height: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
      }}>
        <div style={{ width: 60, height: 4, background: p.nav === p.hero ? p.bg : p.nav, borderRadius: 2, opacity: 0.7 }} />
        <div style={{ width: 28, height: 10, background: "rgba(255,255,255,0.2)", borderRadius: 3 }} />
      </div>
    </div>
  );
}

// ─── Design card ─────────────────────────────────────────────────────────────
function DesignCard({ design, onSelect, selected }) {
  const { palette: p } = design;
  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        cursor: "pointer",
        outline: selected ? `2px solid var(--accent)` : "2px solid transparent",
        transition: "outline 0.15s",
      }}
      onClick={() => onSelect(design.id)}
    >
      <MockupPreview p={p} />

      {/* Palette swatches */}
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {[p.nav, p.hero === p.nav ? p.card : p.hero, p.accent, p.text === "#ffffff" ? "#ffffff" : p.text].map((color, i) => (
          <div key={i} style={{
            width: 20, height: 20,
            borderRadius: "50%",
            background: color,
            border: "1px solid rgba(255,255,255,0.12)",
            flexShrink: 0,
          }} />
        ))}
        <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: 4 }}>color palette</span>
      </div>

      <div>
        <h3 className="h3" style={{ marginBottom: 4 }}>{design.name}</h3>
        <p style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600, marginBottom: 8 }}>{design.tagline}</p>
        <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>{design.desc}</p>
      </div>

      {/* Industry tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {design.industries.map(tag => (
          <span key={tag} className="badge" style={{ fontSize: 11 }}>{tag}</span>
        ))}
      </div>

      {/* Selected indicator */}
      {selected && (
        <div style={{ fontSize: 12, color: "var(--accent)", fontWeight: 700, letterSpacing: "0.05em" }}>
          ✓ Selected
        </div>
      )}
    </div>
  );
}

// ─── Lead capture modal ───────────────────────────────────────────────────────
function LeadModal({ pickedStyle, pickedPalette, onClose }) {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState("idle"); // idle | sending | done | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("/api/designs-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          style:   pickedStyle?.name   || "",
          palette: pickedPalette?.name || "",
        }),
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
    }} onClick={onClose}>
      <div
        style={{
          background: "#1a0f12",
          border: "1px solid rgba(225,29,72,0.30)",
          borderRadius: 16,
          padding: "36px 32px",
          maxWidth: 440,
          width: "100%",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {status === "done" ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
            <h3 className="h3" style={{ marginBottom: 8 }}>You're on the list</h3>
            <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>
              Boyd will reach out within 1 business day to schedule your audit call — already knowing you picked <strong style={{ color: "var(--text)" }}>{pickedStyle?.name}</strong> + <strong style={{ color: "var(--text)" }}>{pickedPalette?.name}</strong>.
            </p>
            <button
              onClick={onClose}
              className="btn primary"
              style={{ marginTop: 24, width: "100%", justifyContent: "center" }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 12, color: "var(--accent)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
              One last step
            </p>
            <h3 className="h3" style={{ marginBottom: 8 }}>Drop your info</h3>
            <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
              Boyd will know you picked <strong style={{ color: "var(--text)" }}>{pickedStyle?.name}</strong> + <strong style={{ color: "var(--text)" }}>{pickedPalette?.name}</strong> before you even say hello.
            </p>

            {/* Selection summary */}
            <div style={{
              background: "rgba(225,29,72,0.06)",
              border: "1px solid rgba(225,29,72,0.15)",
              borderRadius: 10,
              padding: "12px 16px",
              marginBottom: 24,
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }}>Layout</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{pickedStyle?.name}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }}>Colors</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{pickedPalette?.name}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input
                type="text"
                placeholder="Your name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  background: "var(--bg)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: "11px 14px",
                  color: "var(--text)",
                  fontSize: 15,
                  fontFamily: "inherit",
                  outline: "none",
                  width: "100%",
                }}
              />
              <input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  background: "var(--bg)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: "11px 14px",
                  color: "var(--text)",
                  fontSize: 15,
                  fontFamily: "inherit",
                  outline: "none",
                  width: "100%",
                }}
              />
              {status === "error" && (
                <p style={{ fontSize: 13, color: "#f87171" }}>Something went wrong — try again or book directly via Calendly.</p>
              )}
              <button
                type="submit"
                className="btn primary"
                disabled={status === "sending"}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {status === "sending" ? "Saving…" : "Book Free Audit →"}
              </button>
              <button
                type="button"
                onClick={onClose}
                style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 13, cursor: "pointer" }}
              >
                Cancel
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Designs() {
  const [selected, setSelected]           = useState(null);
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [showModal, setShowModal]         = useState(false);

  const step2Ref = useRef(null);
  const ctaRef   = useRef(null);

  const pickedStyle   = DESIGNS.find(d => d.id === selected);
  const pickedPalette = PALETTES.find(p => p.id === selectedPalette);
  const bothPicked    = !!pickedStyle && !!pickedPalette;

  function handleSelectStyle(id) {
    const next = id === selected ? null : id;
    setSelected(next);
    if (next) {
      setTimeout(() => step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    }
  }

  function handleSelectPalette(id) {
    const next = id === selectedPalette ? null : id;
    setSelectedPalette(next);
    if (next && selected) {
      setTimeout(() => ctaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="section heroSection" style={{ textAlign: "center", paddingBottom: 0 }}>
        <span className="badge" style={{ marginBottom: 16 }}>Design Styles</span>
        <h1 className="h1" style={{ marginBottom: 16 }}>Build your vision</h1>
        <p style={{ fontSize: 18, color: "var(--muted)", maxWidth: 560, margin: "0 auto 12px" }}>
          Two steps. Pick a layout style, then pick your colors. Boyd builds the rest.
        </p>
        <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 480, margin: "0 auto 48px", opacity: 0.7 }}>
          Every site is custom-built for your business. These are starting points, not templates.
        </p>
      </section>

      {/* Step 1 — Layout style */}
      <section className="section">
        <div style={{ marginBottom: 24 }}>
          <span className="badge" style={{ marginBottom: 12 }}>
            {selected ? "Step 1 ✓" : "Step 1"}
          </span>
          <h2 className="h2" style={{ marginBottom: 8 }}>Choose a layout style</h2>
          <p style={{ color: "var(--muted)", maxWidth: 520 }}>
            Each style is built for a specific type of business. Click one that fits.
          </p>
        </div>
        <div className="grid cols-3" style={{ gap: 16 }}>
          {DESIGNS.map(d => (
            <DesignCard
              key={d.id}
              design={d}
              selected={selected === d.id}
              onSelect={handleSelectStyle}
            />
          ))}
        </div>

        {/* Style selected nudge */}
        {selected && (
          <div style={{
            marginTop: 20,
            padding: "14px 20px",
            background: "rgba(225,29,72,0.07)",
            border: "1px solid rgba(225,29,72,0.18)",
            borderRadius: 10,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 10,
          }}>
            <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓ {pickedStyle.name}</span>
            <span style={{ color: "var(--muted)", fontSize: 14 }}>
              {bothPicked ? "— and your colors are set. Ready to book below." : "— nice. Now pick your colors below."}
            </span>
          </div>
        )}
      </section>

      {/* Step 2 — Color palette */}
      <section className="section" ref={step2Ref}>
        <div style={{ marginBottom: 24 }}>
          <span className="badge" style={{ marginBottom: 12 }}>
            {selectedPalette ? "Step 2 ✓" : "Step 2"}
          </span>
          <h2 className="h2" style={{ marginBottom: 8 }}>Pick your colors</h2>
          <p style={{ color: "var(--muted)", maxWidth: 520 }}>
            Choose a palette that feels right. You can always tweak shades on the audit call.
          </p>
        </div>
        <PalettePicker selectedPalette={selectedPalette} onSelect={handleSelectPalette} />
      </section>

      {/* Final CTA — only appears when BOTH are selected */}
      {bothPicked && (
        <section className="section" ref={ctaRef}>
          <div style={{
            background: "var(--surface)",
            border: "1px solid rgba(225,29,72,0.30)",
            borderRadius: 16,
            padding: "32px",
          }}>
            <p style={{ fontSize: 13, color: "var(--accent)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
              You're ready to book
            </p>
            <h2 className="h2" style={{ marginBottom: 8 }}>
              {pickedStyle.name} · {pickedPalette.name}
            </h2>
            <p style={{ color: "var(--muted)", marginBottom: 24, maxWidth: 520, lineHeight: 1.6 }}>
              Boyd will know your picks before the call — he'll show you exactly how your business would look with this combination.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                className="btn primary"
                onClick={() => setShowModal(true)}
              >
                Book your free audit →
              </button>
              <button
                className="btn"
                style={{ borderColor: "rgba(255,255,255,0.15)", background: "transparent", cursor: "pointer" }}
                onClick={() => { setSelected(null); setSelectedPalette(null); }}
              >
                Start over
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Custom note */}
      <section className="section">
        <div className="surface" style={{
          textAlign: "center",
          padding: "36px 32px",
          borderRadius: 16,
          maxWidth: 600,
          margin: "0 auto",
        }}>
          <h3 className="h3" style={{ marginBottom: 10 }}>Don't see what you want?</h3>
          <p style={{ color: "var(--muted)", marginBottom: 20, lineHeight: 1.6, fontSize: 14 }}>
            Bring a reference site, a screenshot, or just describe the feeling. Boyd will figure out exactly what fits your business on the call.
          </p>
          <Link
            to="/contact"
            style={{ fontSize: 14, color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}
          >
            Book a free audit anyway →
          </Link>
        </div>
      </section>

      <CTA
        title="Ready to get started?"
        subtitle="Free 15-minute audit call. No commitment — just honest feedback on what your business needs online."
      />

      {/* Lead capture modal */}
      {showModal && (
        <LeadModal
          pickedStyle={pickedStyle}
          pickedPalette={pickedPalette}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
