import React from "react";
import { siteConfig } from "../siteConfig.js";

export default function Privacy() {
  return (
    <div className="pageMinHeight">
      <section className="surface heroSurface">
        <div className="section" style={{ paddingTop: 80, paddingBottom: 48 }}>
          <span className="badge">Legal</span>
          <h1 className="h1" style={{ marginTop: 16 }}>Privacy Policy</h1>
          <p className="p" style={{ maxWidth: 560 }}>
            Effective date: May 2026 · {siteConfig.brand} · {siteConfig.email}
          </p>
        </div>
      </section>

      <section className="surface">
        <div className="section" style={{ maxWidth: 760 }}>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 12 }}>Overview</h2>
            <p className="p" style={{ marginBottom: 0 }}>
              {siteConfig.brand} ("we", "us", "our") operates this website and provides web design and AI receptionist
              services to small businesses. This policy explains what information we collect, how we use it, and your rights.
              We keep it plain — no legal jargon.
            </p>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>1. Information We Collect</h2>

            <h3 className="h3" style={{ marginBottom: 8 }}>Contact forms</h3>
            <p className="p">When you submit a quote request or contact form, we collect your name, business name,
            city, phone number or email, and any notes you provide. This goes directly to Boyd Querubin to follow up.</p>

            <h3 className="h3" style={{ marginBottom: 8 }}>AI chat conversations</h3>
            <p className="p">This website uses an AI-powered chat assistant. If you interact with it, we collect
            the messages you send, any contact information you voluntarily provide (name, phone, email), and what
            service or help you're looking for. This information is used to respond to your inquiry and qualify
            your request.</p>
            <p className="p">AI chat conversations are processed by third-party AI providers to generate responses.
            These providers process your message content to produce a reply — they do not store or train on your
            conversations for their own purposes under standard API terms.</p>

            <h3 className="h3" style={{ marginBottom: 8 }}>Analytics</h3>
            <p className="p" style={{ marginBottom: 0 }}>We use Google Analytics 4 to understand how visitors use
            this site (pages visited, time on site, general location, device type). This data is anonymous and
            aggregated — we cannot identify you personally from it. You can opt out via Google's opt-out browser
            add-on or by using a content blocker.</p>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>2. How We Use Your Information</h2>
            <ul className="list" style={{ margin: 0 }}>
              <li>To respond to your inquiry or quote request</li>
              <li>To follow up about services you expressed interest in</li>
              <li>To qualify whether we're a good fit before a call</li>
              <li>To improve the website and AI assistant over time</li>
              <li>We do not sell, rent, or share your information with third parties for marketing purposes</li>
            </ul>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>3. The AI Assistant — What You Should Know</h2>
            <p className="p">
              The chat assistant on this site is powered by AI and trained specifically on {siteConfig.brand}'s services,
              pricing, and service area. It is not a human. It is designed to answer common questions, help you figure
              out which service fits your business, and connect you with Boyd for follow-up.
            </p>
            <p className="p">
              <strong style={{ color: "var(--text)" }}>What the AI can do:</strong> Answer questions about
              our services and pricing, explain how the process works, and collect your contact info if you want us to
              follow up.
            </p>
            <p className="p" style={{ marginBottom: 0 }}>
              <strong style={{ color: "var(--text)" }}>What the AI cannot do:</strong> Make binding commitments,
              access your personal account data, or take any action outside the chat window. Any quote or agreement
              requires human confirmation from Boyd.
            </p>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>4. Data Retention</h2>
            <p className="p">
              Contact form submissions and AI chat leads are retained for up to 24 months, or until you request deletion.
              Analytics data follows Google's standard retention settings (14 months by default).
            </p>
            <p className="p" style={{ marginBottom: 0 }}>
              If you want your information removed, email us at{" "}
              <a href={`mailto:${siteConfig.email}`} style={{ color: "#fb7185" }}>{siteConfig.email}</a> and
              we'll delete it within 7 business days.
            </p>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>5. Cookies</h2>
            <p className="p" style={{ marginBottom: 0 }}>
              We use cookies only for analytics (Google Analytics 4). We do not use tracking cookies for advertising.
              Most browsers let you block or delete cookies in settings. Blocking analytics cookies does not affect
              your ability to use this site.
            </p>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>6. Third-Party Services</h2>
            <ul className="list" style={{ margin: 0 }}>
              <li><strong style={{ color: "var(--text)" }}>Google Analytics 4</strong> — anonymous site usage data</li>
              <li><strong style={{ color: "var(--text)" }}>AI providers</strong> — chat message processing to generate responses (no persistent storage of your data)</li>
              <li><strong style={{ color: "var(--text)" }}>Vercel</strong> — website hosting (US-based)</li>
            </ul>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2 className="h2" style={{ marginBottom: 16 }}>7. Client Sites We Build</h2>
            <p className="p" style={{ marginBottom: 0 }}>
              If {siteConfig.brand} builds and manages a website for your business, that site will have its own
              privacy policy. If your package includes the AI receptionist, that policy will cover how your customers'
              chat interactions are collected and used. We provide a policy template and help you customize it during
              onboarding.
            </p>
          </div>

          <div className="card">
            <h2 className="h2" style={{ marginBottom: 12 }}>8. Contact & Questions</h2>
            <p className="p" style={{ marginBottom: 0 }}>
              Questions about this policy or your data? Reach out directly:<br />
              <a href={`mailto:${siteConfig.email}`} style={{ color: "#fb7185" }}>{siteConfig.email}</a>
              {" · "}{siteConfig.phoneDisplay}
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
