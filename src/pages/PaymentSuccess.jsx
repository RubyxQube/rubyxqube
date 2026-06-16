import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "../siteConfig.js";

export default function PaymentSuccess() {
  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Payment Confirmed — RubyxQube</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="surface heroSurface">
        <div className="heroSection" style={{ textAlign: "left", alignItems: "flex-start" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.30)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
            <CheckCircle2 size={26} color="rgba(34,197,94,0.85)" strokeWidth={2} />
          </div>
          <span className="badge" style={{ marginBottom: 16 }}>Subscription Active</span>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 18px" }}>
            You're all set.
          </h1>
          <p style={{ fontSize: 18, color: "var(--muted)", lineHeight: 1.65, maxWidth: 520, margin: "0 0 12px" }}>
            Your subscription is active and your card is on file. Boyd will be in touch within 24 hours to kick things off.
          </p>
          <p style={{ fontSize: 14, color: "var(--muted)", margin: "0 0 36px" }}>
            A confirmation receipt has been sent to your email by Stripe.
          </p>
          <div className="btnRow">
            <a className="btn primary" href={`mailto:${siteConfig.email}`}>Email Boyd directly</a>
            <Link className="btn" to="/">Back to site</Link>
          </div>
        </div>
      </section>

      <section className="surface" style={{ background: "transparent" }}>
        <div className="section">
          <div style={{ maxWidth: 640 }}>
            <span className="badge" style={{ marginBottom: 20 }}>What happens next</span>
            <h2 className="h2" style={{ marginTop: 0, marginBottom: 32 }}>To get started fast, have these ready.</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { num: "01", title: "Logo files", body: "PNG or SVG in any size. If you only have a JPG that's fine too — we'll work with it." },
                { num: "02", title: "5–10 photos", body: "Photos of your work, your team, or your location. Phone photos are fine." },
                { num: "03", title: "Services and pricing", body: "A list of what you offer and rough pricing. 'Contact for quote' is fine if rates vary." },
                { num: "04", title: "Service area", body: "The cities or zip codes you serve. Be as specific as you want." },
                { num: "05", title: "Hours of operation", body: "Your regular business hours, including whether you offer after-hours or emergency service." },
              ].map(({ num, title, body }) => (
                <div key={num} className="card" style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--accent-dim)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: "var(--accent)", flexShrink: 0 }}>{num}</div>
                  <div>
                    <h3 className="h3" style={{ marginBottom: 6 }}>{title}</h3>
                    <p className="p" style={{ marginBottom: 0, fontSize: 14 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 32 }}>
              Questions before Boyd reaches out? Email <a href={`mailto:${siteConfig.email}`} style={{ color: "var(--accent)" }}>{siteConfig.email}</a> or call <a href={`tel:${siteConfig.phone}`} style={{ color: "var(--accent)" }}>{siteConfig.phone}</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
