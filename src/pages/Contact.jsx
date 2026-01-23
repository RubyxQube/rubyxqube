import React from "react";
import { siteConfig } from "../siteConfig.js";

const PACKAGES = [
  {
    id: "build",
    label: "Website Build - $2,000 (one-time)",
    needValue: "Website Build",
    priceLine: "$2,000 (one-time)",
    includes: "4–6 pages, mobile responsive, lead capture, basic SEO, 2 revision rounds.",
  },
  {
    id: "care",
    label: "Website + Monthly Care - $2,000 + $250/mo",
    needValue: "Website + Monthly Care",
    priceLine: "$2,000 + $250/mo",
    includes: "Everything in Build + up to 60 minutes updates/month, speed & uptime checks, light SEO maintenance.",
  },
  {
    id: "marketing",
    label: "Website + Light Marketing - $2,000 + $500/mo",
    needValue: "Website + Light Marketing",
    priceLine: "$2,000 + $500/mo",
    includes: "Build + GBP optimization + 1–2 posts/month (no ad management) + monthly check-in.",
  },
  {
    id: "unsure",
    label: "Not sure - recommend a package",
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
    serviceSelectionId: "build",
    need: "Website Build",
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
      <section className="surface section">
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
      </section>
    </div>
  );
}
