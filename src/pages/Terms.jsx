import React from "react";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "../siteConfig.js";

export default function Terms() {
  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Terms of Service — RubyxQube | Web Design & AI Services</title>
        <meta name="description" content="RubyxQube's terms of service. Covers service agreements, payment terms, SMS notifications, and client responsibilities for web design and AI receptionist services." />
        <meta property="og:title" content="Terms of Service — RubyxQube" />
        <meta property="og:description" content="RubyxQube's terms of service for web design and AI receptionist services in the Treasure Valley." />
        <meta property="og:image" content="https://rubyxqube.com/og-default.png" />
        <meta property="og:url" content="https://rubyxqube.com/terms" />
        <link rel="canonical" href="https://rubyxqube.com/terms" />
      </Helmet>

      <section className="surface heroSurface">
        <div className="section" style={{ paddingTop: 80, paddingBottom: 48 }}>
          <span className="badge">Legal</span>
          <h1 className="h1" style={{ marginTop: 16 }}>Terms of Service</h1>
          <p className="p" style={{ maxWidth: 560 }}>
            Effective date: June 2026 · {siteConfig.brand} · {siteConfig.email}
          </p>
        </div>
      </section>

      <section className="surface">
        <div className="section" style={{ maxWidth: 760 }}>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 12 }}>Overview</h2>
            <p className="p" style={{ marginBottom: 0 }}>
              These Terms of Service govern the relationship between {siteConfig.brand} LLC ("we", "us", "our") and
              businesses that engage us for web design, AI receptionist, and related digital services ("you", "client").
              By signing a service agreement or making payment, you agree to these terms. We keep them plain — no legal jargon.
            </p>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>1. Services</h2>
            <p className="p">We offer three service tiers for small businesses in the Treasure Valley and surrounding areas:</p>
            <ul className="list">
              <li><strong style={{ color: "var(--text)" }}>Launch ($1,200 one-time)</strong> — Custom website design and development, delivered within 7 business days of signed agreement and deposit receipt.</li>
              <li><strong style={{ color: "var(--text)" }}>Autopilot ($399/mo)</strong> — Website hosting and maintenance, AI-powered chat receptionist, lead capture and SMS alert notifications, and ongoing site updates.</li>
              <li><strong style={{ color: "var(--text)" }}>Momentum ($999/mo)</strong> — Everything in Autopilot, plus four SEO blog posts per month drafted with AI and approved by you, Google Business Profile management, and developer-on-call priority support.</li>
            </ul>
            <p className="p" style={{ marginBottom: 0 }}>
              Specific deliverables, timelines, and any custom scope are documented in your individual service agreement.
              These Terms apply alongside that agreement — in the event of a conflict, the signed agreement controls.
            </p>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>2. Payment</h2>
            <ul className="list" style={{ marginBottom: 0 }}>
              <li>Monthly retainer plans (Autopilot, Momentum) are billed on the 25th of each month via Stripe. The first payment is due before work begins.</li>
              <li>One-time Launch projects require a 50% deposit before work begins, with the remainder due on delivery.</li>
              <li>Invoices unpaid after 30 days may result in service suspension. Accounts suspended for non-payment after 60 days may be offboarded.</li>
              <li>We do not offer refunds on completed work or months already in progress.</li>
              <li>Prices may change with 30 days written notice. Existing clients are grandfathered at their current rate for 6 months following any price increase.</li>
            </ul>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>3. SMS Notifications</h2>

            <h3 className="h3" style={{ marginBottom: 8 }}>Lead alert notifications (to you, the client)</h3>
            <p className="p">
              Autopilot and Momentum clients receive SMS notifications when their AI chatbot captures a new lead — specifically
              when a website visitor provides their name, phone number or email, and what they need. By signing up for
              Autopilot or Momentum and providing your phone number during onboarding, you consent to receive these
              lead alert SMS messages from {siteConfig.brand} via our SMS provider (SignalWire). You may opt out at any
              time by contacting us at{" "}
              <a href={`mailto:${siteConfig.email}`} style={{ color: "#fb7185" }}>{siteConfig.email}</a>.
            </p>
            <p className="p">
              Message frequency varies based on chatbot activity on your site. Standard message and data rates from your
              carrier may apply.
            </p>

            <h3 className="h3" style={{ marginBottom: 8 }}>Review request messages (to your customers)</h3>
            <p className="p" style={{ marginBottom: 0 }}>
              Momentum clients may use our review request tool to send a one-time SMS to a customer asking them to leave
              a Google review. This message is sent only when you manually initiate it from your dashboard for a specific
              customer. The customer's phone number must have been provided voluntarily by the customer — typically during
              a chatbot conversation on your website where they asked about your services. The SMS message identifies your
              business by name and contains only your Google review link. {siteConfig.brand} sends this message on your
              behalf using our shared SMS number. You are responsible for ensuring you have a legitimate business
              relationship with any customer you contact via this tool.
            </p>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>4. Your Responsibilities</h2>
            <ul className="list" style={{ marginBottom: 0 }}>
              <li>Provide accurate business information during onboarding (hours, services, contact info, pricing).</li>
              <li>Review and approve content — blog posts, GBP updates — before publication on Momentum.</li>
              <li>Keep your login credentials to the client portal secure. Do not share your password.</li>
              <li>Only use the review request tool to contact customers with whom you have a legitimate business relationship.</li>
              <li>Notify us promptly of any changes to your business that affect your website or chatbot (new services, changed hours, new phone number).</li>
            </ul>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>5. Intellectual Property</h2>
            <p className="p">
              Upon receipt of final payment, you own the content and copy on your website — your business name, photos,
              service descriptions, and any copy you provided or approved.
            </p>
            <p className="p" style={{ marginBottom: 0 }}>
              {siteConfig.brand} retains ownership of the underlying code, templates, tooling, and platform
              infrastructure used to build and run your site. If you cancel services, we will provide a static export
              of your website files within 14 business days. The AI chatbot, CMS portal access, and hosting are
              services — they do not transfer on cancellation.
            </p>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>6. AI Chatbot</h2>
            <p className="p">
              The AI receptionist is powered by third-party AI providers (Anthropic) and is trained on information you
              provide during setup. It is designed to answer questions about your business and capture leads — it is
              not a human and cannot make binding commitments on your behalf.
            </p>
            <p className="p" style={{ marginBottom: 0 }}>
              We are not responsible for AI responses that are inaccurate due to outdated or incomplete information
              in your chatbot configuration. Keeping your business information current in the client portal is your
              responsibility.
            </p>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>7. Cancellation</h2>
            <p className="p">
              Either party may cancel monthly services with 30 days written notice sent to{" "}
              <a href={`mailto:${siteConfig.email}`} style={{ color: "#fb7185" }}>{siteConfig.email}</a>.
              You will not be charged after the notice period ends.
            </p>
            <p className="p" style={{ marginBottom: 0 }}>
              We reserve the right to terminate service immediately for non-payment, misuse of the SMS tools,
              or conduct that violates these terms.
            </p>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>8. Limitation of Liability</h2>
            <p className="p" style={{ marginBottom: 0 }}>
              {siteConfig.brand} is not liable for lost revenue, missed leads, or business losses resulting from
              website downtime, AI chatbot errors, delayed SMS delivery, or service interruptions outside our
              reasonable control (including hosting outages, carrier filtering, or third-party API failures).
              Our total liability in any claim is limited to the fees paid in the 30 days prior to the claim.
            </p>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>9. Changes to These Terms</h2>
            <p className="p" style={{ marginBottom: 0 }}>
              We may update these terms from time to time. If changes are material, we will notify active clients
              by email at least 14 days before the new terms take effect. Continued use of our services after that
              date constitutes acceptance of the updated terms.
            </p>
          </div>

          <div className="card">
            <h2 className="h2" style={{ marginBottom: 12 }}>10. Contact</h2>
            <p className="p" style={{ marginBottom: 0 }}>
              Questions about these terms? Reach out directly:<br />
              Boyd Querubin · {siteConfig.brand}<br />
              <a href={`mailto:${siteConfig.email}`} style={{ color: "#fb7185" }}>{siteConfig.email}</a>
              {" · "}{siteConfig.phoneDisplay}
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
