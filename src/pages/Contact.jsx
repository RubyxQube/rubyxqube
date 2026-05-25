import React from "react";
import { siteConfig } from "../siteConfig.js";

const PACKAGES = [
  {
    id: "launch",
    label: "Launch — $2,500 (one-time)",
    needValue: "Launch",
    priceLine: "$2,500 (one-time)",
    includes: "5–6 page website, mobile responsive, contact form + click-to-call, basic SEO, Google Maps embed, 2 revision rounds.",
  },
  {
    id: "autopilot",
    label: "Autopilot — $3,000 + $399/mo",
    needValue: "Autopilot",
    priceLine: "$3,000 + $399/mo",
    includes: "Everything in Launch + custom AI receptionist, 24/7 lead capture, SMS alerts on new leads, monthly performance report, 60 min/mo site updates.",
  },
  {
    id: "momentum",
    label: "Momentum — $3,000 + $699/mo",
    needValue: "Momentum",
    priceLine: "$3,000 + $699/mo",
    includes: "Everything in Autopilot + Google Business Profile management, local SEO, 2 social posts/mo, review response management, monthly strategy call.",
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
  const [form, setForm] = React.useState({
    name: "",
    business: "",
    city: "",
    website: "",
    serviceSelectionId: "launch",
    need: "Launch",
    timeline: "This month",
    contactMethod: "Text",
    contactValue: "",
    notes: "",
  });

React.useEffect(() => {
    setForm((s) => {
      return { ...s, contactValue: "" };
    });
  }, [form.contactMethod]);


  const selectedPackage =
    PACKAGES.find((p) => p.id === form.serviceSelectionId) ||
    PACKAGES[0];

  function onChange(e) {
    const { name, value } = e.target;

    // Keep Need and Service Selection in sync (so user isn't picking twice)
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
        serviceSelectionId:
          value === "Not sure" ? "unsure" : (p?.id || "build"),
      }));
      return;
    }

    setForm((s) => ({ ...s, [name]: value }));
  }

  const canSend =
    form.name.trim().length > 1 &&
    form.city.trim().length > 1 &&
    form.contactValue.trim().length > 3;

  // Static hosting-safe: uses mailto. Swap to Formspree/Basin/Getform later.
  const mailto = () => {
    if (!canSend) return;

    const subject = encodeURIComponent(
      `Quote Request - ${siteConfig.brand} (${siteConfig.serviceArea})`
    );

    const body = encodeURIComponent(
      `Name: ${form.name}
Business: ${form.business || "(not provided)"}
City: ${form.city}
Website: ${form.website || "(not provided)"}

Service Selection: ${selectedPackage.label}
Need: ${form.need}
Timeline: ${form.timeline}

Preferred Contact: ${form.contactMethod}
Contact Details: ${form.contactValue}

Notes:
${form.notes || "(none)"}`
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pageMinHeight">
      <section className="surface heroSurface">
      <div className="section" style={{ paddingTop: 80, paddingBottom: 80 }}>

        <span className="badge">Fast replies • Simple process</span>
        <h1 className="h1" style={{ marginTop: 12 }}>Get a Quote</h1>
        <p className="p" style={{ maxWidth: 820 }}>
          Tell me what you do and what city you serve in the {siteConfig.serviceArea}.
          I’ll reply with a simple plan and a quote.
        </p>

        <div className="grid cols-2">
          <div className="card">
            <h2 className="h2">Direct contact</h2>
            <div className="btnRow">
              <a className="btn primary" href={`tel:${siteConfig.phoneE164}`}>Call</a>
              <a className="btn" href={`mailto:${siteConfig.email}`}>Email</a>
            </div>
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
              <div className="small" style={{ marginBottom: 8, color: "rgba(255,255,255,0.72)" }}>
                Selected:
              </div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>
                {selectedPackage.label}
              </div>
              <div className="small">{selectedPackage.includes}</div>
            </div>
          </div>

          <div className="card">
            <h2 className="h2">Quote form</h2>

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

            <div className="btnRow">
              <button
                className="btn primary"
                type="button"
                onClick={mailto}
                disabled={!canSend}
                style={!canSend ? { opacity: 0.85, cursor: "not-allowed" } : undefined}
              >
                Send Request
              </button>
            </div>

            {!canSend && (
              <p className="small" style={{ marginTop: 8, marginBottom: 0 }}>
                Please add your name, city, and a way to contact you.
              </p>
            )}

            <p className="small" style={{ marginTop: 10, marginBottom: 0 }}>
              This form uses your email app (mailto) so it works on Vercel/GitHub Pages without a backend.
              If you want real submissions, connect Formspree/Basin/Getform later.
            </p>
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
                a: "Typically 2–3 weeks from when I receive your completed questionnaire and any content. Rush timelines are available for an added fee.",
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
    </div>
  );
}
