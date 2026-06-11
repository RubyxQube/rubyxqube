import React from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { posts } from "../blog/posts.js";
import { siteConfig } from "../siteConfig.js";
import CTA from "../components/CTA.jsx";

export default function BlogPost() {
  const { slug } = useParams();
  const idx  = posts.findIndex((p) => p.slug === slug);
  const post = posts[idx];

  if (!post) {
    return (
      <div className="pageMinHeight">
        <section className="surface heroSurface">
          <div className="heroSection">
            <h1 className="h1 heroTitle">Post not found.</h1>
            <p className="p" style={{ marginBottom: 24 }}>That article doesn't exist or may have moved.</p>
            <Link className="btn primary" to="/blog">Back to Blog</Link>
          </div>
        </section>
      </div>
    );
  }

  const { Component, title, description, dateDisplay, readTime, category } = post;
  const prev = posts[idx + 1];
  const next = posts[idx - 1];

  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>{title} — RubyxQube Blog</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} — RubyxQube`} />
        <meta property="og:description" content={description} />
        <link rel="canonical" href={`${siteConfig.siteUrl}/blog/${slug}`} />
      </Helmet>

      {/* ── Back link ── */}
      <section className="surface" style={{ paddingBottom: 0 }}>
        <div className="section" style={{ paddingBottom: 0 }}>
          <Link
            to="/blog"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}
            onMouseOver={e => e.currentTarget.style.color = "var(--text)"}
            onMouseOut={e => e.currentTarget.style.color = "var(--muted)"}
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* ── Header ── */}
      <section className="surface heroSurface">
        <div className="heroSection">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 20 }}>
            <span className="badge">{category}</span>
            <span style={{ fontSize: 12, color: "var(--muted)", alignSelf: "center" }}>{dateDisplay} · {readTime}</span>
          </div>
          <h1 className="h1 heroTitle" style={{ fontSize: "clamp(26px, 4vw, 42px)" }}>{title}</h1>
          <p className="p" style={{ fontSize: 17, maxWidth: 600 }}>{description}</p>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>By Boyd Querubin · {siteConfig.brand}</p>
        </div>
      </section>

      {/* ── Article body ── */}
      <section className="surface">
        <div className="section">
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <Component />
          </div>
        </div>
      </section>

      {/* ── Post navigation ── */}
      {(prev || next) && (
        <section className="surface">
          <div className="section" style={{ paddingTop: 20 }}>
            <div className="hr" style={{ marginBottom: 32 }} />
            <div className="grid cols-2" style={{ gap: 20 }}>
              {next ? (
                <Link to={`/blog/${next.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ height: "100%" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Newer</p>
                    <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 6px", color: "var(--text)" }}>{next.title}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent)", fontWeight: 700, fontSize: 13, marginTop: 8 }}>
                      Read <ArrowRight size={13} />
                    </div>
                  </div>
                </Link>
              ) : <div />}
              {prev ? (
                <Link to={`/blog/${prev.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ height: "100%", textAlign: "right" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Older</p>
                    <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 6px", color: "var(--text)" }}>{prev.title}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent)", fontWeight: 700, fontSize: 13, marginTop: 8, justifyContent: "flex-end" }}>
                      Read <ArrowRight size={13} />
                    </div>
                  </div>
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>
      )}

      <CTA
        title="Want this for your Boise business?"
        subtitle="Start with a free audit. No commitment — just an honest look at what your site is doing (and not doing) for you."
      />
    </div>
  );
}
