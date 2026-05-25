import React, { useState, useRef, useEffect } from "react";
import { chatConfig } from "../chatConfig.js";

// ─── Styles (self-contained — safe to copy to any client site) ───────────
const S = {
  // Floating toggle button
  toggleBtn: (open, accent, accentHover) => ({
    position: "fixed",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: open ? accentHover : accent,
    border: "none",
    cursor: "pointer",
    boxShadow: `0 4px 24px ${accent}60`,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s, transform 0.2s",
    transform: open ? "rotate(90deg)" : "rotate(0deg)",
  }),

  // Chat window container
  window: {
    position: "fixed",
    bottom: 92,
    right: 24,
    width: 368,
    maxWidth: "calc(100vw - 48px)",
    height: 520,
    maxHeight: "calc(100vh - 120px)",
    background: "#0d1017",
    border: "1px solid rgba(59,130,246,0.22)",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 24px 64px rgba(0,0,0,0.70), 0 0 0 1px rgba(255,255,255,0.04)",
    zIndex: 9999,
    overflow: "hidden",
    animation: "chatSlideIn 0.18s ease",
  },

  header: {
    padding: "14px 18px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "rgba(59,130,246,0.07)",
    flexShrink: 0,
  },

  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(255,255,255,0.1) transparent",
  },

  inputRow: {
    padding: "10px 14px",
    borderTop: "1px solid rgba(255,255,255,0.07)",
    display: "flex",
    gap: 8,
    alignItems: "flex-end",
    flexShrink: 0,
  },

  footer: {
    padding: "5px 14px 10px",
    textAlign: "center",
    fontSize: 10,
    color: "rgba(255,255,255,0.25)",
    letterSpacing: "0.04em",
    flexShrink: 0,
  },
};

// ─── Inline markdown renderer (bold, italic, plain) ──────────────────────
function renderInline(text) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*"))
      return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

function renderContent(text) {
  const lines = text.split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.match(/^[-•]\s/)) {
      // Collect consecutive bullet lines into a list
      const items = [];
      while (i < lines.length && lines[i].match(/^[-•]\s/)) {
        items.push(<li key={i} style={{ marginBottom: 2 }}>{renderInline(lines[i].replace(/^[-•]\s/, ""))}</li>);
        i++;
      }
      out.push(<ul key={`ul-${i}`} style={{ margin: "4px 0", paddingLeft: 16 }}>{items}</ul>);
    } else if (line.trim() === "" || line.trim() === "---") {
      out.push(<br key={i} />);
      i++;
    } else {
      out.push(<span key={i} style={{ display: "block" }}>{renderInline(line)}</span>);
      i++;
    }
  }
  return out;
}

// ─── Bubble ───────────────────────────────────────────────────────────────
function Bubble({ msg, accent }) {
  const isUser = msg.role === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
      <div
        style={{
          maxWidth: "82%",
          padding: "9px 13px",
          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          background: isUser ? accent : "rgba(255,255,255,0.07)",
          color: "rgba(255,255,255,0.90)",
          fontSize: 14,
          lineHeight: 1.55,
          wordBreak: "break-word",
        }}
      >
        {isUser ? msg.content : renderContent(msg.content)}
      </div>
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────
function Typing() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <div
        style={{
          padding: "10px 14px",
          borderRadius: "16px 16px 16px 4px",
          background: "rgba(255,255,255,0.07)",
          color: "rgba(255,255,255,0.45)",
          fontSize: 18,
          letterSpacing: 2,
          lineHeight: 1,
        }}
      >
        ···
      </div>
    </div>
  );
}

// ─── Lead captured banner ─────────────────────────────────────────────────
function LeadBanner() {
  return (
    <div
      style={{
        margin: "4px 0",
        padding: "8px 12px",
        borderRadius: 8,
        background: "rgba(34,197,94,0.10)",
        border: "1px solid rgba(34,197,94,0.25)",
        fontSize: 12,
        color: "rgba(34,197,94,0.85)",
        textAlign: "center",
      }}
    >
      ✓ Info sent — Boyd will be in touch soon
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────
export default function ChatWidget() {
  const cfg = chatConfig;
  const accent = cfg.accentColor || "#3b82f6";
  const accentHover = cfg.accentHover || "#2563eb";

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: cfg.greeting, id: "init" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text, id: Date.now() };
    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          model: cfg.model || undefined,
          systemPrompt: cfg.systemPrompt || undefined,
          businessName: cfg.businessName,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.content ||
            "Sorry, I had trouble with that. Please try again or contact us directly.",
          id: Date.now() + 1,
        },
      ]);

      if (data.leadCaptured && !leadCaptured) {
        setLeadCaptured(true);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having connection trouble. Please reach out directly — boyd@rubyxqube.com or call (208) 970-8624.",
          id: Date.now() + 1,
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* ── Keyframe animation ── */}
      <style>{`
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* ── Chat window ── */}
      {open && (
        <div style={S.window} role="dialog" aria-label="Chat with Qube Solutions AI">
          {/* Header */}
          <div style={S.header}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "rgba(255,255,255,0.92)" }}>
                {cfg.businessName}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                    boxShadow: "0 0 6px #22c55e",
                  }}
                />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
                  {cfg.tagline}
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.40)",
                cursor: "pointer",
                padding: "4px 6px",
                fontSize: 16,
                lineHeight: 1,
                borderRadius: 6,
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={S.messages}>
            {messages.map((msg) => (
              <Bubble key={msg.id} msg={msg} accent={accent} />
            ))}
            {leadCaptured && <LeadBanner />}
            {loading && <Typing />}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={S.inputRow}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Type a message…"
              rows={1}
              disabled={loading}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.11)",
                borderRadius: 10,
                color: "rgba(255,255,255,0.90)",
                fontSize: 14,
                padding: "8px 12px",
                resize: "none",
                fontFamily: "inherit",
                outline: "none",
                lineHeight: 1.45,
                minHeight: 36,
                maxHeight: 96,
                transition: "border-color 0.15s",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(59,130,246,0.45)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.11)")
              }
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              style={{
                background:
                  input.trim() && !loading ? accent : "rgba(59,130,246,0.22)",
                border: "none",
                borderRadius: 10,
                color: "white",
                width: 36,
                height: 36,
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.15s",
              }}
            >
              ↑
            </button>
          </div>

          {/* Footer */}
          <div style={S.footer}>
            {cfg.poweredBy} ·{" "}
            <a href="/privacy" style={{ color: "inherit", textDecoration: "underline" }}>
              Privacy
            </a>
          </div>
        </div>
      )}

      {/* ── Toggle button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={S.toggleBtn(open, accent, accentHover)}
        aria-label={open ? "Close chat" : "Chat with us"}
        title={open ? "Close" : "Chat with us"}
      >
        <span style={{ fontSize: 22, display: "block", lineHeight: 1 }}>
          {open ? "✕" : "💬"}
        </span>
      </button>
    </>
  );
}
