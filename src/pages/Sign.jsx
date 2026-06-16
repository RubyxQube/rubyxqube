import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, PenLine } from "lucide-react";
import Logo from "../components/Logo.jsx";

// ─── Contract text ─────────────────────────────────────────────────────────────
// Interpolated with contract data from Notion.

function ContractBody({ c }) {
  const today = new Date(c.createdDate).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div style={{ fontSize: 14, lineHeight: 1.85, color: "rgba(0,0,0,0.85)" }}>

      <p style={{ marginBottom: 24 }}>
        This Web Design Services Agreement ("<strong>Agreement</strong>") is entered into as of{" "}
        <strong>{today}</strong> by and between:
      </p>
      <p style={{ marginBottom: 8 }}><strong>Service Provider:</strong> RubyxQube LLC, an Idaho limited liability company ("RubyxQube"), and</p>
      <p style={{ marginBottom: 24 }}><strong>Client:</strong> {c.clientName} ("<strong>Client</strong>").</p>

      <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "28px 0" }} />

      <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, color: "#000" }}>
        1. Services
      </h3>
      <p style={{ marginBottom: 12 }}>
        RubyxQube agrees to design and develop a website for Client under the{" "}
        <strong>{c.package} Package</strong>.
        {c.projectDescription ? ` Scope of work: ${c.projectDescription}.` : ""}
      </p>
      <p style={{ marginBottom: 24 }}>
        Additional work outside the agreed scope requires a written change order and may incur additional fees.
      </p>

      <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, color: "#000" }}>
        2. Payment
      </h3>
      <p style={{ marginBottom: 12 }}>
        Total project fee: <strong>${c.amount.toLocaleString()}</strong>.
      </p>
      <p style={{ marginBottom: 12 }}>
        Payment terms: <strong>{c.paymentTerms || "50% due upon signing; 50% due upon project launch."}</strong>
      </p>
      <p style={{ marginBottom: 24 }}>
        Invoices are due within 7 days of issuance. Late payments are subject to a 1.5% monthly interest charge. RubyxQube reserves the right to suspend work or withhold deliverables until outstanding invoices are paid in full.
      </p>

      <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, color: "#000" }}>
        3. Timeline
      </h3>
      <p style={{ marginBottom: 24 }}>
        RubyxQube will provide an estimated timeline upon project kickoff. Timelines are dependent on timely receipt of Client-provided materials (content, photos, login credentials, feedback). Delays caused by Client will extend the timeline accordingly. RubyxQube is not liable for missed launch dates caused by Client delays.
      </p>

      <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, color: "#000" }}>
        4. Client Responsibilities
      </h3>
      <p style={{ marginBottom: 8 }}>Client agrees to:</p>
      <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
        <li style={{ marginBottom: 6 }}>Provide all necessary content, images, logos, and access credentials within 5 business days of project kickoff.</li>
        <li style={{ marginBottom: 6 }}>Respond to revision requests and design feedback within 5 business days.</li>
        <li style={{ marginBottom: 6 }}>Ensure all content provided is owned by Client or properly licensed.</li>
        <li style={{ marginBottom: 6 }}>Designate a single point of contact for project decisions.</li>
      </ul>

      <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, color: "#000" }}>
        5. Revisions
      </h3>
      <p style={{ marginBottom: 24 }}>
        The project includes up to <strong>two (2) rounds of revisions</strong> per design phase. A revision is defined as a consolidated set of changes submitted in a single communication. Additional revision rounds are billed at $75/hour.
      </p>

      <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, color: "#000" }}>
        6. Intellectual Property &amp; Ownership
      </h3>
      <p style={{ marginBottom: 12 }}>
        Upon receipt of full payment, Client owns all custom design assets and content created specifically for this project. RubyxQube retains ownership of any proprietary tools, frameworks, templates, or code libraries used in development.
      </p>
      <p style={{ marginBottom: 24 }}>
        RubyxQube may display the completed project in its portfolio and marketing materials unless Client requests otherwise in writing.
      </p>

      <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, color: "#000" }}>
        7. Confidentiality
      </h3>
      <p style={{ marginBottom: 24 }}>
        Both parties agree to keep confidential any non-public business information shared during the project. This obligation survives termination of this Agreement.
      </p>

      <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, color: "#000" }}>
        8. Termination
      </h3>
      <p style={{ marginBottom: 12 }}>
        Either party may terminate this Agreement with 14 days' written notice. If Client terminates after work has commenced, Client is responsible for payment for all work completed to date, calculated at $75/hour for time spent, up to the total contract amount.
      </p>
      <p style={{ marginBottom: 24 }}>
        RubyxQube may terminate immediately if Client fails to make payment within 14 days of the due date, or engages in abusive conduct.
      </p>

      <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, color: "#000" }}>
        9. Limitation of Liability
      </h3>
      <p style={{ marginBottom: 24 }}>
        RubyxQube's total liability under this Agreement shall not exceed the total fees paid by Client in the 90 days prior to the claim. RubyxQube is not liable for any indirect, incidental, or consequential damages, including lost revenue or data loss.
      </p>

      <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, color: "#000" }}>
        10. Warranties
      </h3>
      <p style={{ marginBottom: 24 }}>
        RubyxQube warrants that work will be performed in a professional manner. RubyxQube does not guarantee specific search engine rankings, traffic volume, or conversion rates. Client warrants they have the right to use all content provided to RubyxQube.
      </p>

      <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, color: "#000" }}>
        11. Governing Law
      </h3>
      <p style={{ marginBottom: 24 }}>
        This Agreement is governed by the laws of the State of Idaho. Any disputes shall be resolved in Ada County, Idaho.
      </p>

      <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, color: "#000" }}>
        12. Entire Agreement
      </h3>
      <p style={{ marginBottom: 0 }}>
        This Agreement constitutes the entire agreement between the parties and supersedes all prior discussions. Any modifications must be in writing and signed by both parties.
      </p>
    </div>
  );
}

// ─── States ───────────────────────────────────────────────────────────────────

function LoadingState() {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px", color: "#6b7280" }}>
      <div style={{ fontSize: 14 }}>Loading your contract…</div>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <p style={{ color: "#dc2626", marginBottom: 12, fontWeight: 600 }}>Unable to load contract</p>
      <p style={{ color: "#6b7280", fontSize: 14 }}>{message}</p>
      <p style={{ color: "#6b7280", fontSize: 14, marginTop: 12 }}>
        Contact <a href="mailto:boyd@rubyxqube.com" style={{ color: "#e11d48" }}>boyd@rubyxqube.com</a>
      </p>
    </div>
  );
}

function AlreadySignedState({ contract }) {
  return (
    <div style={{ textAlign: "center", padding: "64px 24px" }}>
      <div style={{ marginBottom: 16 }}><CheckCircle2 size={40} color="var(--accent)" strokeWidth={1.75} /></div>
      <h2 style={{ fontWeight: 700, marginBottom: 8 }}>Already signed</h2>
      <p style={{ color: "#6b7280", fontSize: 14 }}>
        This contract was signed by <strong>{contract.signedName || "the client"}</strong>.
        Questions? <a href="mailto:boyd@rubyxqube.com" style={{ color: "#e11d48" }}>boyd@rubyxqube.com</a>
      </p>
    </div>
  );
}

function SuccessState({ signedName, signedAt }) {
  const dateStr = new Date(signedAt).toLocaleString("en-US", {
    dateStyle: "long", timeStyle: "short",
  });
  return (
    <div style={{ textAlign: "center", padding: "64px 24px" }}>
      <div style={{ marginBottom: 20 }}><PenLine size={40} color="var(--accent)" strokeWidth={1.75} /></div>
      <h2 style={{ fontWeight: 800, fontSize: 24, marginBottom: 8 }}>You're all set.</h2>
      <p style={{ color: "#374151", marginBottom: 6 }}>
        Signed by <strong>{signedName}</strong>
      </p>
      <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 32 }}>{dateStr}</p>
      <p style={{ color: "#6b7280", fontSize: 14, maxWidth: 400, margin: "0 auto" }}>
        Boyd will be in touch shortly to kick things off. Keep this page for your records — a confirmation email has been sent to your inbox.
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Sign() {
  const { token } = useParams();

  const [contract, setContract]       = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [signedName, setSignedName]   = useState("");
  const [agreed, setAgreed]           = useState(false);
  const [signing, setSigning]         = useState(false);
  const [signed, setSigned]           = useState(false);
  const [signedAt, setSignedAt]       = useState(null);

  useEffect(() => {
    if (!token) { setError("Invalid link."); setLoading(false); return; }
    fetch(`/api/contract?token=${token}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setContract(data);
      })
      .catch(() => setError("Could not load contract. Please contact boyd@rubyxqube.com"))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleSign() {
    if (!signedName.trim() || !agreed || signing) return;
    setSigning(true);
    try {
      const res = await fetch("/api/contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, signedName: signedName.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setSigned(true);
        setSignedAt(data.signedAt);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setSigning(false);
  }

  const canSign = signedName.trim().length >= 2 && agreed && !signing;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f9fafb",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      color: "#111827",
    }}>
      <Helmet>
        <title>Sign Agreement — RubyxQube</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* Header */}
      <div style={{
        background: "#ffffff",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Logo height={32} dark />
        <span style={{ fontSize: 12, color: "#6b7280" }}>
          Secure · Electronic Signature
        </span>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>

        {loading && <LoadingState />}
        {!loading && error && <ErrorState message={error} />}
        {!loading && !error && contract?.alreadySigned && <AlreadySignedState contract={contract} />}
        {!loading && !error && !contract?.alreadySigned && signed && (
          <SuccessState signedName={signedName} signedAt={signedAt} />
        )}

        {!loading && !error && contract && !contract.alreadySigned && !signed && (
          <>
            {/* Contract header */}
            <div style={{ marginBottom: 32, textAlign: "center" }}>
              <p style={{ fontSize: 12, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                Web Design Services Agreement
              </p>
              <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>
                {contract.package} Package
              </h1>
              <p style={{ fontSize: 16, color: "#374151" }}>
                RubyxQube × {contract.clientName}
              </p>
              <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
                Total: <strong style={{ color: "#111827" }}>${contract.amount.toLocaleString()}</strong>
                {" · "}
                {contract.paymentTerms || "50% upfront, 50% on launch"}
              </p>
            </div>

            {/* Contract body */}
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 12,
              padding: "40px 48px",
              marginBottom: 32,
            }}>
              <ContractBody c={contract} />
            </div>

            {/* Signature section */}
            <div style={{
              background: "#ffffff",
              border: "2px solid #e11d48",
              borderRadius: 12,
              padding: "32px 40px",
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
                Sign this agreement
              </h2>
              <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 24 }}>
                By typing your full legal name below, you are signing this agreement electronically. Your electronic signature is legally binding under the E-SIGN Act and Idaho UETA.
              </p>

              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#374151" }}>
                Full legal name *
              </label>
              <input
                type="text"
                value={signedName}
                onChange={e => setSignedName(e.target.value)}
                placeholder="Type your full name to sign"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1.5px solid rgba(0,0,0,0.15)",
                  borderRadius: 8,
                  fontSize: 16,
                  fontFamily: "Georgia, serif",
                  color: "#111827",
                  marginBottom: 20,
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />

              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 28 }}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  style={{ marginTop: 2, flexShrink: 0, width: 16, height: 16 }}
                />
                <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>
                  I have read and agree to the terms of this Web Design Services Agreement. I understand this is a legally binding contract.
                </span>
              </label>

              {error && (
                <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 16 }}>{error}</p>
              )}

              <button
                onClick={handleSign}
                disabled={!canSign}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: canSign ? "#e11d48" : "#e5e7eb",
                  color: canSign ? "#ffffff" : "#9ca3af",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: canSign ? "pointer" : "not-allowed",
                  transition: "background 0.15s",
                  fontFamily: "inherit",
                }}
              >
                {signing ? "Signing…" : "Sign Agreement →"}
              </button>

              <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", marginTop: 12 }}>
                Signed agreements are recorded with timestamp and IP address.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
