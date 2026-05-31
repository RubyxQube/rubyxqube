import React from "react";
import { Link } from "react-router-dom";
import CTA from "../components/CTA.jsx";
import { siteConfig } from "../siteConfig.js";

export default function About() {
  return (
    <div className="pageMinHeight">

      {/* ── Header ── */}
      <section className="surface heroSurface">
        <div className="section" style={{ paddingTop: 80, paddingBottom: 64 }}>
          <span className="badge">About Qube Solutions</span>
          <h1 className="h1" style={{ marginTop: 16, maxWidth: "20ch" }}>
            Built by someone who <span className="accentText">gets it done</span>
          </h1>
          <p className="p" style={{ maxWidth: 560, fontSize: 17 }}>
            I'm Boyd — the developer behind {siteConfig.brand}. I build websites for small service businesses that need a professional presence online, without the agency markup or months of back-and-forth.
          </p>
        </div>
      </section>

      {/* ── Background ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "start" }}>

            <div>
              <span className="badge">Background</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>More than a web designer</h2>
              <p className="p">
                Before launching {siteConfig.brand}, I co-founded Bastion MSP — a managed security service provider built from the ground up to bring enterprise-grade cybersecurity to small and mid-sized businesses. I handled the brand identity, full marketing site, and the client-facing security portal.
              </p>
              <p className="p">
                That experience gave me a different perspective on what a business website actually needs to do — not just look good, but generate trust, capture leads, and work without you babysitting it.
              </p>
              <p className="p" style={{ marginBottom: 20 }}>
                Now I apply that same thinking to local service businesses — based in the Treasure Valley, working with clients across the US. Contractors, tradespeople, and service providers who need a professional presence and the tools to compete.
              </p>
              <a className="btn" href="https://www.bastionmsp.com" target="_blank" rel="noreferrer" style={{ display: "inline-flex" }}>
                View Bastion MSP ↗
              </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="card">
                <h3 className="h3">Fast turnaround</h3>
                <p className="p" style={{ marginBottom: 0 }}>Most sites go live in as little as 3 days from the kickoff call. I keep the process tight so you're not waiting around.</p>
              </div>
              <div className="card">
                <h3 className="h3">Direct communication</h3>
                <p className="p" style={{ marginBottom: 0 }}>You work directly with me — not an account manager. Fast replies, clear updates, no runaround.</p>
              </div>
              <div className="card">
                <h3 className="h3">Transparent pricing</h3>
                <p className="p" style={{ marginBottom: 0 }}>Flat rates, no hidden fees. You know exactly what you're getting before any work starts.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Who I work with ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-2" style={{ gap: 48, alignItems: "center" }}>
            <div>
              <span className="badge">Who I work with</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 16 }}>Built for local service businesses</h2>
              <p className="p">
                Most of my clients are contractors, tradespeople, and local service providers — people who are great at what they do but don't have time to manage a website. I'm based in Boise but work with clients across the US.
              </p>
              <p className="p" style={{ marginBottom: 0 }}>
                They need something that looks professional, works on phones, and makes it easy for customers to call or fill out a form. I keep things simple: one person, direct communication, fast turnaround. No project managers, no inflated timelines, no surprise invoices.
              </p>
            </div>
            <div className="card">
              <h3 className="h3" style={{ marginBottom: 16 }}>Industries I work with</h3>
              <ul className="list" style={{ margin: 0 }}>
                <li>Contractors & home services</li>
                <li>HVAC, plumbing, electrical</li>
                <li>Landscaping & lawn care</li>
                <li>Cleaning & janitorial</li>
                <li>Stoneworks, masonry & concrete</li>
                <li>Any local service business that needs leads</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="surface">
        <div className="section">
          <span className="badge">How it works</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 8 }}>Simple from start to finish</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 32 }}>Three steps from first conversation to a live website.</p>
          <div className="grid cols-3">
            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Step 01</p>
              <h3 className="h3">Kickoff call</h3>
              <p className="p" style={{ marginBottom: 0 }}>15 minutes to understand your business, your goals, and what you want customers to do on your site.</p>
            </div>
            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Step 02</p>
              <h3 className="h3">Build + revise</h3>
              <p className="p" style={{ marginBottom: 0 }}>I build the site and share a preview. Two rounds of revisions included — we refine until it's right.</p>
            </div>
            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 700, color: "#fb7185", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Step 03</p>
              <h3 className="h3">Launch + support</h3>
              <p className="p" style={{ marginBottom: 0 }}>Go live. Optionally add a monthly care plan and I'll keep your site updated so you never have to think about it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Location ── */}
      <section className="surface">
        <div className="section">
          <div className="grid cols-2">
            <div>
              <span className="badge" style={{ marginBottom: 16 }}>Location</span>
              <h2 className="h2" style={{ marginTop: 16, marginBottom: 12 }}>Based in Boise. Available everywhere.</h2>
              <p className="p">
                I'm based in the {siteConfig.serviceArea} and do most of my work with local businesses — but I work remotely too. If you're outside the area and want a clean, professional site, reach out.
              </p>
              <div className="btnRow" style={{ marginTop: 24 }}>
                <Link className="btn primary" to="/quote">Start a Project</Link>
                <Link className="btn" to="/pricing">See Pricing</Link>
              </div>
            </div>
            <div className="card">
              <h3 className="h3" style={{ marginBottom: 16 }}>Quick facts</h3>
              <ul className="list">
                <li>Based in Boise, Idaho</li>
                <li>Co-founder of Bastion MSP (cybersecurity)</li>
                <li>Serving the {siteConfig.serviceArea} and beyond</li>
                <li>Websites launch in as little as 3 days</li>
                <li>Flat-rate pricing, no hidden costs</li>
                <li>Direct communication — no middlemen</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTA title="Ready to work together?" subtitle="Tell me what you do and I'll put together a plan. No commitment required." />
    </div>
  );
}
