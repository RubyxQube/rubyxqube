import React from "react";
import CTA from "../components/CTA.jsx";
import FAQ from "../components/FAQ.jsx";
import { siteConfig } from "../siteConfig.js";

export default function Services() {
  const faqs = [
    {
      q: "What am I actually buying?",
      a: "A professional online presence that brings customers in: a clean mobile site, lead capture, and optional ongoing support."
    },
    {
      q: "Do you write the content?",
      a: "You can provide notes and photos, and I’ll organize them into clean website copy. Full copywriting is available as an add-on."
    },
    {
      q: "Can you do SEO?",
      a: "I do strong basics: titles/descriptions, local structure, and on-page cleanup. Full SEO campaigns are separate from these packages."
    },
    {
      q: "Can I edit the site myself?",
      a: "Yes. I can build it so updating text/photos is straightforward, or you can keep me on a monthly care plan."
    },
  ];

  return (
    <>
      <div className="pageMinHeight">
        <section className="surface section">
          <span className="badge">Simple, high-impact services</span>
          <h1 className="h1" style={{ marginTop: 12 }}>Services</h1>
          <p className="p" style={{ maxWidth: 820 }}>
            {siteConfig.brand} helps {siteConfig.serviceArea} businesses look professional online and convert visitors into leads.
            The focus is simple: clean mobile-friendly design, clear messaging, and easy contact options.
          </p>

          <div className="grid cols-2">
            <div className="card">
              <h2 className="h2">Website Build</h2>
              <p className="p">A clean 4–6 page site with lead capture, basic SEO, and a modern layout.</p>
              <ul className="list">
                <li>Home, About-style section, Services, Gallery, Contact/Quote, Privacy</li>
                <li>Mobile responsive</li>
                <li>Contact form + click-to-call buttons</li>
                <li>Basic SEO setup</li>
                <li>Google Maps embed (local)</li>
              </ul>
            </div>

            <div className="card">
              <h2 className="h2">Monthly Care (optional)</h2>
              <p className="p">Ongoing support so you don’t have to think about updates or small fixes.</p>
              <ul className="list">
                <li>Monthly updates (text/photos/services)</li>
                <li>Speed & uptime checks</li>
                <li>Minor layout changes</li>
                <li>Light SEO maintenance</li>
              </ul>
            </div>

            <div className="card">
              <h2 className="h2">Light Marketing (optional)</h2>
              <p className="p">A simple monthly system to help you show up locally and stay active online.</p>
              <ul className="list">
                <li>Google Business Profile setup/optimization</li>
                <li>Basic local SEO structure</li>
                <li>1–2 social posts/month (templates + captions)</li>
                <li>Monthly check-in</li>
              </ul>
            </div>

            <div className="card">
              <h2 className="h2">About {siteConfig.brand}</h2>
              <p className="p">
                I build clean websites for small businesses that need a professional online presence.
                My goal is fast turnaround, a simple process, and a site that actually drives inquiries.
              </p>
              <ul className="list">
                <li>Quick kickoff call to align on goals</li>
                <li>Build + review with fast revisions</li>
                <li>Launch, then optional monthly care</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="surface section">
          <h2 className="h2">FAQ</h2>
          <FAQ items={faqs} />
        </section>
        <CTA />
      </div>
    </>
  );
}
