import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { posts } from "../blog/posts.js";
import { siteConfig } from "../siteConfig.js";

export default function BlogList() {
  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Blog — Web Design & AI Insights for Boise Businesses | RubyxQube</title>
        <meta name="description" content="Web design advice, AI tools, and lead generation insights for Treasure Valley small businesses. Written by RubyxQube — Boise's AI-first web agency." />
        <meta property="og:title" content="Blog — RubyxQube | Boise Web Design & AI Insights" />
        <meta property="og:description" content="Web design advice, AI tools, and lead generation insights for Treasure Valley small businesses." />
      </Helmet>

      {/* ── Hero ── */}
      <section className="surface heroSurface">
        <div className="heroSection">
          <span className="badge" style={{ marginBottom: 20 }}>From the RubyxQube team</span>
          <h1 className="h1 heroTitle">Web design and AI insights for {siteConfig.serviceArea} businesses.</h1>
          <p className="p" style={{ fontSize: 17, maxWidth: 520 }}>
            Honest advice on websites, lead generation, and AI tools — written for local service businesses, not tech companies.
          </p>
        </div>
      </section>

      {/* ── Posts ── */}
      <section className="surface">
        <div className="section">
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card"
                  style={{ display: "flex", flexDirection: "column", gap: 14, transition: "box-shadow 0.15s" }}
                  onMouseOver={e => e.currentTarget.style.boxShadow = "0 4px 24px rgba(225,29,72,0.12)"}
                  onMouseOut={e => e.currentTarget.style.boxShadow = ""}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                    <span className="badge" style={{ fontSize: 11 }}>{post.category}</span>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>{post.dateDisplay} · {post.readTime}</span>
                  </div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "var(--text)", lineHeight: 1.3 }}>{post.title}</h2>
                  <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{post.description}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent)", fontWeight: 700, fontSize: 14 }}>
                    Read more <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="surface">
        <div className="section" style={{ paddingTop: 20 }}>
          <div className="card cardHighlight" style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: "1 1 240px" }}>
              <h3 className="h3" style={{ marginBottom: 8 }}>Ready to put these ideas to work?</h3>
              <p className="p" style={{ marginBottom: 0 }}>Start with a free website audit. Boyd will tell you what your current site is missing and what it would take to fix it.</p>
            </div>
            <Link className="btn primary" to="/audit" style={{ flexShrink: 0 }}>Get a Free Audit</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
