import React from "react";
import { Link } from "react-router-dom";
import CTA from "../components/CTA.jsx";
import PackageCard from "../components/PackageCard.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import { siteConfig } from "../siteConfig.js";

export default function Home() {
    const packages = [
    {
      name: "🧱 One-Time Website Build",
      bestFor: "Businesses that want a solid website and be done.",
      price: "$2000",
      timeline: "2–3 weeks",
      bullets: [
        "4–6 pages (Home, About/Story, Services, Gallery, Get a Quote, Privacy)",
        "Mobile responsive",
        "Contact/quote form + click-to-call buttons",
        "Basic SEO (titles + descriptions)",
        "Google Maps embed (local)",
        "Includes 2 revision rounds",
      ],
    },
    {
      name: "🔁 Website + Monthly Care",
      bestFor: "Owners who don’t want to maintain anything.",
      price: "$2000 + $250/month",
      timeline: "Monthly",
      bullets: [
        "Monthly updates (text/photos/services)",
        "Minor layout changes",
        "Speed & uptime checks",
        "Light SEO maintenance",
        "Care plan includes up to 60 minutes of updates/month",
      ],
      highlight: true,
    },
    {
      name: "📣 Website + Light Marketing",
      bestFor: "Local businesses that want more leads and visibility.",
      price: "$2000 + $500/month",
      timeline: "Monthly",
      bullets: [
        "Google Business Profile setup/optimization",
        "Basic local SEO structure",
        "Marketing plan includes 1–2 posts/month + GBP optimization (no ad management)",
        "Monthly performance check-in",
        "Sweet spot to start: $450 – $600/mo",
      ],
    },
  ];

  const testimonials = [
    { quote: "Professional site, simple process, and it works great on mobile.", name: "Client Name", role: "Treasure Valley Business" },
    { quote: "Clear pricing and fast turnaround. Exactly what we needed.", name: "Client Name", role: "Home Services" },
    { quote: "We finally look legit online and people actually reach out.", name: "Client Name", role: "Small Business Owner" },
  ];

  return (
    <>
      <div className="pageMinHeight">
        <section className="surface section">
          <span className="badge">Built for growth</span>
          <h1 className="h1 heroTitle">
            Websites that help {/* {siteConfig.serviceArea} */} businesses get more calls
          </h1>
          <p className="p" style={{ fontSize: 16, maxWidth: 760 }}>
            {siteConfig.brand} builds clean websites that help service businesses get more calls and leads. Based in the Treasure Valley and available remotely, with lead capture, basic SEO, and optional monthly support.
          </p>

          <div className="btnRow">
            <Link className="btn primary" to="/contact">Get a Free Quote</Link>
            <a className="btn" href={`tel:${siteConfig.phoneE164}`}>Call</a>
            <Link className="btn" to="/pricing">View Packages</Link>
          </div>

          <div className="hr" />

          <div className="grid cols-3">
            <div className="kpi"><strong>Clean & fast</strong><span>Modern layout that works on mobile</span></div>
            <div className="kpi"><strong>Lead capture</strong><span>Buttons + form that makes it easy to contact you</span></div>
            <div className="kpi"><strong>Simple SEO</strong><span>Titles/descriptions + local basics so you’re not invisible</span></div>
          </div>
        </section>

        <section className="surface section">
          <h2 className="h2">How it works</h2>
          <p className="p">A simple process that doesn’t waste your time.</p>
          <div className="grid cols-3">
            <div className="card">
              <div className="badge">Step 1</div>
              <h3 className="h3" style={{ marginTop: 10 }}>Quick call</h3>
              <p className="p" style={{ marginBottom: 0 }}>10–15 minutes to understand your business and goals.</p>
            </div>
            <div className="card">
              <div className="badge">Step 2</div>
              <h3 className="h3" style={{ marginTop: 10 }}>Build + review</h3>
              <p className="p" style={{ marginBottom: 0 }}>You approve the layout and content. We refine quickly.</p>
            </div>
            <div className="card">
              <div className="badge">Step 3</div>
              <h3 className="h3" style={{ marginTop: 10 }}>Launch + support</h3>
              <p className="p" style={{ marginBottom: 0 }}>Go live and optionally stay updated with a monthly plan.</p>
            </div>
          </div>
        </section>

        <section className="surface section">
          <h2 className="h2">Packages</h2>
          <p className="p">Clear options depending on how hands-on you want to be.</p>
          <div className="grid cols-3">
            {packages.map((p) => (
              <PackageCard key={p.name} {...p} />
            ))}
          </div>
        </section>

        {/* <section className="surface section">
          <h2 className="h2">Testimonials</h2>
          <p className="p">Optional for launch - you can replace these with real quotes later.</p>
          <div className="grid cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.quote} {...t} />
            ))}
          </div>
        </section> */}
        <CTA />
      </div>
    </>
  );
}
