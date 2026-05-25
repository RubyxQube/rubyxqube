/**
 * api/chat.js — Vercel Serverless Function
 *
 * Proxies chat messages to the Anthropic API.
 * Keeps the API key server-side. Handles lead capture via Claude tool use.
 * Optionally fires an SMS via Twilio when a lead is captured.
 *
 * Environment variables (set in Vercel dashboard):
 *   ANTHROPIC_API_KEY        required
 *   CLAUDE_MODEL             optional — defaults to claude-haiku-4-5-20251001
 *   TWILIO_ACCOUNT_SID       optional — enables SMS alerts
 *   TWILIO_AUTH_TOKEN        optional
 *   TWILIO_FROM_NUMBER       optional — your Twilio number, e.g. +12085551234
 *   ALERT_PHONE_NUMBER       optional — your cell number to receive SMS alerts
 */

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── Default system prompt (Qube Solutions) ────────────────────────────────
// Override per client by passing systemPrompt in the request body,
// or by setting a SYSTEM_PROMPT environment variable.
const DEFAULT_SYSTEM_PROMPT = `You are the AI receptionist for RubyxQube, a web design and AI agency based in Boise, Idaho.

Owner: Boyd Querubin
Email: boydquerubin@gmail.com
Service area: Treasure Valley — Boise, Meridian, Nampa, Caldwell, Eagle, Kuna (and remote)

Services & pricing:
- Launch: $2,500 one-time — 5–6 page professional website, mobile-first, SEO basics, 2 revisions
- Autopilot: $3,000 + $399/mo — website + AI receptionist + monthly performance reports + 60 min/mo updates
- Momentum: $3,000 + $699/mo — everything in Autopilot + Google Business Profile management, local SEO, 2 social posts/mo, monthly strategy call
- AI Chatbot Only (for existing sites): $500 setup + $199/mo
- Add-ons: Domain setup ($75), business email ($100), extra page ($250), copywriting ($500), logo & brand kit ($350), booking integration ($150)

Common questions:
Q: How long does it take? → 2–3 weeks from kickoff call to live site.
Q: Is there a contract? → No contracts. Month-to-month, cancel anytime with 30 days notice.
Q: Do you do e-commerce? → No — we focus on lead generation sites for service businesses.
Q: What does the AI receptionist do? → It's a chatbot (like me!) trained on your specific business. It answers questions, captures leads 24/7, and sends you an instant SMS when someone's interested.
Q: What AI powers it? → Claude, made by Anthropic — the same AI behind Claude.ai.
Q: Can you add it to my existing site? → Yes — $500 setup + $199/mo.
Q: Do you serve areas outside Treasure Valley? → Yes, we work remotely with businesses anywhere.
Q: What's the free audit? → A 15-minute review of your current online presence. Boyd tells you exactly what's costing you leads. No commitment required.

Tone: friendly, direct, confident. NOT salesy. Answer the question first, then offer help.
Keep responses short — 2–3 sentences unless more detail is genuinely needed.
You are a demo of the exact product we sell. If someone seems impressed, point that out naturally.

FORMATTING RULES — this is a chat widget:
- You can use **bold** for emphasis and *italics* sparingly — they will render correctly.
- For lists, write each item on its own line starting with "- "
- Separate topics with a blank line.
- No hashtag headers (##). No horizontal rules (---). No backticks.
- Keep responses concise — this is a small chat bubble, not a document.

IMPORTANT — Lead capture: Once you have collected (1) the visitor's name, (2) their phone number or email, AND (3) what they're looking for, call the capture_lead tool. Do NOT ask for all three at once — collect naturally through conversation. Do NOT capture a lead without all three pieces.`;

// ─── Lead capture tool ─────────────────────────────────────────────────────
const LEAD_TOOL = {
  name: "capture_lead",
  description:
    "Call this tool once and only once — when you have collected the visitor's name, their contact info (phone or email), AND what service or help they need. This records the lead and sends an SMS alert to the business owner.",
  input_schema: {
    type: "object",
    properties: {
      name: { type: "string", description: "Visitor's full name" },
      contact: { type: "string", description: "Phone number or email address" },
      service_needed: {
        type: "string",
        description: "What service or help they are looking for",
      },
      notes: {
        type: "string",
        description:
          "Any other relevant context from the conversation (business type, city, timeline, etc.)",
      },
    },
    required: ["name", "contact", "service_needed"],
  },
};

// ─── Optional email via Resend ─────────────────────────────────────────────
async function sendEmailAlert(lead, businessName) {
  if (!process.env.RESEND_API_KEY || !process.env.ALERT_EMAIL) {
    console.log("Email skipped — RESEND_API_KEY or ALERT_EMAIL not set.");
    return;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: process.env.ALERT_EMAIL,
        subject: `🔔 New lead — ${businessName || "RubyxQube"}`,
        text:
          `New lead captured via AI chatbot\n\n` +
          `Name: ${lead.name}\n` +
          `Contact: ${lead.contact}\n` +
          `Needs: ${lead.service_needed}` +
          (lead.notes ? `\nNotes: ${lead.notes}` : ""),
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(data));
    console.log("Email sent for lead:", lead.name);
  } catch (err) {
    console.error("Resend error:", err.message);
  }
}

// ─── Optional SMS via Twilio ────────────────────────────────────────────────
async function sendSMSAlert(lead, businessName) {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.ALERT_PHONE_NUMBER) {
    console.log("SMS skipped — Twilio env vars not set. Lead:", lead);
    return;
  }
  try {
    const twilio = (await import("twilio")).default;
    const tw = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    await tw.messages.create({
      body:
        `🔔 New lead — ${businessName || "RubyxQube"}\n` +
        `Name: ${lead.name}\n` +
        `Contact: ${lead.contact}\n` +
        `Needs: ${lead.service_needed}` +
        (lead.notes ? `\nNotes: ${lead.notes}` : ""),
      from: process.env.TWILIO_FROM_NUMBER,
      to: process.env.ALERT_PHONE_NUMBER,
    });
    console.log("SMS sent for lead:", lead.name);
  } catch (err) {
    console.error("Twilio error:", err.message);
  }
}

// ─── Handler ───────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({
      error: "ANTHROPIC_API_KEY is not set. Add it to your Vercel environment variables.",
    });
  }

  const { messages, systemPrompt, model, businessName } = req.body;

  const resolvedModel =
    model ||
    process.env.CLAUDE_MODEL ||
    "claude-haiku-4-5-20251001";

  const resolvedSystem =
    systemPrompt ||
    process.env.SYSTEM_PROMPT ||
    DEFAULT_SYSTEM_PROMPT;

  try {
    // ── First call ──────────────────────────────────────────────────────
    const response1 = await client.messages.create({
      model: resolvedModel,
      max_tokens: 512,
      system: resolvedSystem,
      tools: [LEAD_TOOL],
      messages,
    });

    // ── Tool use: lead captured ─────────────────────────────────────────
    if (response1.stop_reason === "tool_use") {
      const toolUse = response1.content.find((b) => b.type === "tool_use");

      // Fire SMS + email without blocking the response
      sendSMSAlert(toolUse.input, businessName).catch(() => {});
      sendEmailAlert(toolUse.input, businessName).catch(() => {});

      // Second call: give Claude the tool result so it can respond naturally
      const response2 = await client.messages.create({
        model: resolvedModel,
        max_tokens: 256,
        system: resolvedSystem,
        messages: [
          ...messages,
          { role: "assistant", content: response1.content },
          {
            role: "user",
            content: [
              {
                type: "tool_result",
                tool_use_id: toolUse.id,
                content: "Lead captured. SMS alert sent to business owner.",
              },
            ],
          },
        ],
      });

      const text =
        response2.content.find((b) => b.type === "text")?.text ||
        "Got it — Boyd will be in touch soon!";

      return res.json({ content: text, leadCaptured: toolUse.input });
    }

    // ── Normal text response ────────────────────────────────────────────
    const text = response1.content.find((b) => b.type === "text")?.text || "";
    return res.json({ content: text });
  } catch (err) {
    console.error("Anthropic API error:", err);
    return res.status(500).json({
      error: "AI service error",
      content:
        "Sorry, I'm having trouble right now. Please call or email Boyd directly.",
    });
  }
}
