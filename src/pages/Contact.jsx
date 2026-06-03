import React from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { siteConfig } from "../siteConfig.js";
import reviewQR from "../assets/qr/RubyxQubeReviewQR.png";

const PACKAGES = [
  {
    id: "launch",
    label: "Launch — $1,200 (one-time)",
    needValue: "Launch",
    priceLine: "$1,200 (one-time)",
    includes: "5–6 page website, mobile responsive, contact form + click-to-call, basic SEO, Google Maps embed, 2 revision rounds. No ongoing support.",
  },
  {
    id: "autopilot",
    label: "Autopilot — $449/mo",
    needValue: "Autopilot",
    priceLine: "$449/mo",
    includes: "No setup fee. Custom site + AI receptionist, analytics setup, 24/7 lead capture, SMS alerts, monthly report, 60 min/mo site updates.",
  },
  {
    id: "momentum",
    label: "Momentum — $999/mo",
    needValue: "Momentum",
    priceLine: "$999/mo",
    includes: "Everything in Autopilot + Google Business Profile management, local SEO, priority same-day edits, review response management, monthly strategy call.",
  },
  {
    id: "unsure",
    label: "Not sure — recommend a package",
    needValue: "Not sure",
    priceLine: "Not sure",
    includes: "Tell me a bit about your business and I’ll recommend the best option.",
  },
];

function packageFromNeed(need) {
  return (
    PACKAGES.find((p) => p.needValue === need) ||
    PACKAGES.find((p) => p.id === "unsure")
  );
}

export default function Contact() {
  const [status, setStatus] = React.useState("idle"); // idle | sending | sent | error

  const [form, setForm] = React.useState({
    name: "",
    business: "",
    city: "",
    website: "",
    serviceSelectionId: "launch",
    need: "Launch",
    timeline: "This month",
    contactMethod: "Call",
    contactValue: "",
    notes: "",
  });

  React.useEffect(() => {
    setForm((s) => ({ ...s, contactValue: "" }));
  }, [form.contactMethod]);

  const selectedPackage =
    PACKAGES.find((p) => p.id === form.serviceSelectionId) ||
    PACKAGES[0];

  function onChange(e) {
    const { name, value } = e.target;

    if (name === "serviceSelectionId") {
      const p = PACKAGES.find((x) => x.id === value) || PACKAGES[0];
      setForm((s) => ({
        ...s,
        serviceSelectionId: value,
        need: p.needValue === "Not sure" ? "Not sure" : p.needValue,
      }));
      return;
    }

    if (name === "need") {
      const p = packageFromNeed(value);
      setForm((s) => ({
        ...s,
        need: value,
        serviceSelectionId: value === "Not sure" ? "unsure" : (p?.id || "launch"),
      }));
      return;
    }

    setForm((s) => ({ ...s, [name]: value }));
  }

  const canSend =
    form.name.trim().length > 1 &&
    form.city.trim().length > 1 &&
    form.contactValue.trim().length > 3;

  async function handleSubmit() {
    if (!canSend || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:           form.name,
          business:       form.business || "",
          city:           form.city,
          website:        form.website  || "",
          package:        selectedPackage.label,
          timeline:       form.timeline,
          contact_method: form.contactMethod,
          contact_value:  form.contactValue,
          notes:          form.notes || "",
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="pageMinHeight">
      <section className="surface heroSurface">
      <div className="section" style={{ paddingTop: 80, paddingBottom: 80 }}>

        <span className="badge">Free • No commitment • 15 minutes</span>
        <h1 className="h1" style={{ marginTop: 12 }}>Book Your Free Audit</h1>
        <p className="p" style={{ maxWidth: 820 }}>
          Tell me about your business and what you’re looking for. I’ll come to the call with a plan already built.
        </p>

        <div className="grid cols-2">
          <div className="card">
            <h2 className="h2">Direct contact</h2>
            <div className="btnRow">
              <a className="btn primary" href={`tel:${siteConfig.phoneE164}`}>Call</a>
              <a className="btn" href={`mailto:${siteConfig.email}`}>Email</a>
            </div>
            <a
              className="btn"
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noreferrer"
              style={{ display: "block", textAlign: "center", marginTop: 8 }}
            >
              Schedule a Call Directly <ExternalLink size={13} style={{ marginLeft: 4, verticalAlign: "middle" }} />
            </a>
            <div className="hr" />
            <p className="small" style={{ marginBottom: 0 }}>
              {siteConfig.brand} • {siteConfig.serviceArea}<br />
              {siteConfig.email} • {siteConfig.phoneDisplay}
            </p>

            <div className="hr" />

            <h3 className="h3">Service Selection</h3>
            <p className="p" style={{ marginBottom: 10 }}>
              Pick the option you’re interested in. You can change it later.
            </p>

            <div className="card selectedCard" style={{ padding: 14 }}>
              <div className="small" style={{ marginBottom: 8 }}>
                Selected:
              </div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>
                {selectedPackage.label}
              </div>
              <div className="small">{selectedPackage.includes}</div>
            </div>
          </div>

          <div className="card">
            <h2 className="h2">Audit Request</h2>

            <div className="grid cols-2">
              <div>
                <label>Your name *</label>
                <input
                  className="input"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label>Business name</label>
                <input
                  className="input"
                  name="business"
                  value={form.business}
                  onChange={onChange}
                  placeholder="Business name (optional)"
                />
              </div>
            </div>

            <div className="grid cols-2">
              <div>
                <label>City you serve *</label>
                <input
                  className="input"
                  name="city"
                  value={form.city}
                  onChange={onChange}
                  placeholder={`e.g., Boise, Meridian, Nampa`}
                />
              </div>

              <div>
                <label>Current website (optional)</label>
                <input
                  className="input"
                  name="website"
                  value={form.website}
                  onChange={onChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="grid cols-2">
              <div>
                <label>Service Selection</label>
                <select
                  name="serviceSelectionId"
                  value={form.serviceSelectionId}
                  onChange={onChange}
                >
                  {PACKAGES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Timeline</label>
                <select name="timeline" value={form.timeline} onChange={onChange}>
                  <option>ASAP</option>
                  <option>This month</option>
                  <option>Next 1–2 months</option>
                  <option>Just researching</option>
                </select>
              </div>
            </div>

            <div className="grid cols-2">
              <div>
                <label>Best way to contact *</label>
                <select
                  name="contactMethod"
                  value={form.contactMethod}
                  onChange={onChange}
                >
                  {/* <option>Text</option> */}
                  <option>Call</option>
                  <option>Email</option>
                </select>
              </div>

              <div>
                <label>
                  {form.contactMethod === "Email" ? "Email address *" : "Phone number *"}
                </label>
                <input
                  className="input"
                  name="contactValue"
                  value={form.contactValue}
                  onChange={onChange}
                  placeholder={
                    form.contactMethod === "Email"
                      ? "you@example.com"
                      : "(208) 555-1234"
                  }
                />
              </div>
            </div>

            <label>Notes</label>
            <textarea
              className="textarea"
              name="notes"
              value={form.notes}
              onChange={onChange}
              placeholder={`What services do you offer? Any pages you want (gallery, FAQ, reviews)? Any examples you like?`}
            />

            {status === "sent" ? (
              <div className="card" style={{ marginTop: 8, background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}>
                <p className="p" style={{ marginBottom: 0, fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#22c55e" strokeWidth={2} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />Request sent! I'll be in touch within 1 business day.
                </p>
              </div>
            ) : (
              <>
                <div className="btnRow">
                  <button
                    className="btn primary"
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canSend || status === "sending"}
                    style={(!canSend || status === "sending") ? { opacity: 0.85, cursor: "not-allowed" } : undefined}
                  >
                    {status === "sending" ? "Sending…" : "Book Free Audit"}
                  </button>
                </div>

                {!canSend && (
                  <p className="small" style={{ marginTop: 8, marginBottom: 0 }}>
                    Please add your name, city, and a way to contact you.
                  </p>
                )}

                {status === "error" && (
                  <p className="small" style={{ marginTop: 8, color: "#fb7185" }}>
                    Something went wrong — please call or email directly.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="surface">
        <div className="section" style={{ paddingTop: 64, paddingBottom: 80 }}>
          <span className="badge">Common questions</span>
          <h2 className="h2" style={{ marginTop: 16, marginBottom: 40 }}>Before you reach out</h2>
          <div className="grid cols-2" style={{ gap: 24 }}>
            {[
              {
                q: "How long does a website build take?",
                a: "As little as 3 days from when I receive your completed questionnaire and any content. Most sites are live within a week.",
              },
              {
                q: "Do I need to provide my own content?",
                a: "I'll guide you through it with a simple questionnaire. If you want professionally written copy, add copywriting for $500 — I handle everything.",
              },
              {
                q: "I already have a domain. Can you use it?",
                a: "Yes, absolutely. I'll connect your existing domain at no extra charge. If you don't have one yet, domain setup is a $75 add-on.",
              },
              {
                q: "Do you offer payment plans?",
                a: "Yes. I typically split it 50% upfront and 50% at launch. If you need a different arrangement, just ask — I'm flexible for the right fit.",
              },
              {
                q: "What if I'm not happy with the design?",
                a: "Every package includes 2 rounds of revisions before launch. I work closely with you throughout so surprises are rare.",
              },
              {
                q: "What happens if I cancel my monthly plan?",
                a: "Your site stays live — you own it. You just won't have the monthly updates, AI receptionist, or ongoing support anymore.",
              },
            ].map(({ q, a }) => (
              <div className="card" key={q}>
                <h3 className="h3" style={{ marginBottom: 10 }}>{q}</h3>
                <p className="p" style={{ marginBottom: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leave a Review ── */}
      <section className="surface">
        <div className="section" style={{ paddingTop: 64, paddingBottom: 80 }}>
          <span className="badge" style={{ marginBottom: 16 }}>Already a client?</span>
          <h2 className="h2" style={{ marginBottom: 8 }}>Leave us a Google review</h2>
          <p className="p" style={{ maxWidth: 480, marginBottom: 28 }}>
            A quick review helps other local businesses find us. Takes about 30 seconds.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24 }}>
            <a
              className="btn primary"
              href={siteConfig.googleReviewUrl}
              target="_blank"
              rel="noreferrer"
            >
              Leave a Review <ExternalLink size={14} style={{ marginLeft: 6, verticalAlign: "middle" }} />
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 1, height: 40, background: "var(--line)" }} />
              <img
                src={reviewQR}
                alt="Scan to leave a Google review for RubyxQube"
                style={{ width: 80, height: 80, borderRadius: 8, display: "block" }}
              />
              <p style={{ fontSize: 12, color: "var(--muted)", margin: 0, lineHeight: 1.4 }}>
                Or scan<br />with your phone
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
