/**
 * api/chat.js — Vercel Serverless Function
 *
 * Proxies chat messages to the Anthropic API.
 * Keeps the API key server-side. Handles lead capture via Claude tool use.
 * Fires three optional alert channels on lead capture — all degrade gracefully
 * if their env vars are not set.
 *
 * ── Required ─────────────────────────────────────────────────────────────────
 *   ANTHROPIC_API_KEY        Anthropic console — one per Vercel project
 *
 * ── Optional: model override ─────────────────────────────────────────────────
 *   CLAUDE_MODEL             defaults to claude-haiku-4-5-20251001
 *
 * ── Optional: ntfy.sh push (Boyd's phone — free) ─────────────────────────────
 *   NTFY_TOPIC               random string, e.g. "rxq-alerts-a7x9k3"
 *                            Subscribe at https://ntfy.sh/<NTFY_TOPIC>
 *
 * ── Optional: SignalWire SMS (client's phone — ~$0.008/text) ────────────────────
 *   SIGNALWIRE_SPACE_URL     e.g. yourspace.signalwire.com
 *   SIGNALWIRE_PROJECT_ID    project UUID from the dashboard
 *   SIGNALWIRE_API_TOKEN     API token from API Credentials
 *   SIGNALWIRE_FROM_NUMBER   purchased number in E.164 format: +1XXXXXXXXXX
 *   ALERT_PHONE_NUMBER       recipient's cell, E.164 format: +1XXXXXXXXXX
 *
 * ── Optional: Resend email (free tier) ────────────────────────────────────────
 *   RESEND_API_KEY           resend.com dashboard
 *   ALERT_EMAIL              where to send lead emails
 *   FROM_EMAIL               verified sender — omit to use onboarding@resend.dev
 *
 */

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── Default system prompt ────────────────────────────────────────────────────
// Override per client by passing systemPrompt in the request body,
// or by setting a SYSTEM_PROMPT environment variable.
const DEFAULT_SYSTEM_PROMPT = `You are the AI receptionist for RubyxQube, a web design and AI agency based in Boise, Idaho.

Owner: Boyd Querubin
Email: boyd@rubyxqube.com
Service area: Treasure Valley — Boise, Meridian, Nampa, Caldwell, Eagle, Kuna (and remote)

Services & pricing:
- Launch: $1,200 one-time — 5–6 page professional website, mobile-first, SEO basics, contact form, 2 revisions. No ongoing commitment.
- Autopilot: $399/mo, no setup fee — custom site built and launched + AI receptionist (24/7 lead capture) + GA4 + Search Console + monthly report + 60 min/mo site updates. No contract.
- Momentum: $999/mo, no setup fee — everything in Autopilot + developer on call (same-day prototypes, 2-day turnaround on bigger builds) + unlimited edits + Google Business Profile management + monthly AI receptionist tuning + weekly check-in call
- AI Chatbot Only (for existing sites): $500 setup + $199/mo
- Add-ons: Domain setup ($75), business email ($100), extra page ($250), copywriting ($500), logo & brand kit ($350), booking integration ($150), site migration ($500)

Common questions:
Q: How long does it take? → Most sites go live within 1–2 weeks of the kickoff call. Simpler builds can launch in as little as 3 days.
Q: Is there a contract? → No contracts. Month-to-month, cancel anytime with 30 days notice.
Q: Do you do e-commerce? → No — we focus on lead generation sites for service businesses.
Q: What does the AI receptionist do? → It's a chatbot (like me!) trained on your specific business. It answers questions, captures leads 24/7, and alerts the business owner the moment someone's interested.
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

IMPORTANT — Lead capture: Once you have collected (1) the visitor's name, (2) their phone number or email, AND (3) what they're looking for, call the capture_lead tool. Do NOT ask for all three at once — collect naturally through conversation. Do NOT capture a lead without all three pieces.

EXISTING CLIENTS — If someone mentions they are already a client or have worked with Boyd before, you can invite them to leave a Google review: https://g.page/r/CUHmU0rIL7VhEBM/review — say something like "If you've had a good experience, a quick Google review helps us a lot: [link]". Only mention this once, naturally, if it fits the conversation.`;

// ─── Lead capture tool ────────────────────────────────────────────────────────
const LEAD_TOOL = {
  name: "capture_lead",
  description:
    "Call this tool once and only once — when you have collected the visitor's name, their contact info (phone or email), AND what service or help they need. This records the lead and alerts the business owner.",
  input_schema: {
    type: "object",
    properties: {
      name:            { type: "string", description: "Visitor's full name" },
      contact:         { type: "string", description: "Phone number or email address" },
      service_needed:  { type: "string", description: "What service or help they are looking for" },
      notes:           { type: "string", description: "Any other relevant context from the conversation (business type, city, timeline, etc.)" },
    },
    required: ["name", "contact", "service_needed"],
  },
};

// ─── ntfy.sh push — Boyd's phone (free) ──────────────────────────────────────
async function sendNtfyAlert(lead, businessName) {
  if (!process.env.NTFY_TOPIC) return;
  try {
    await fetch(`https://ntfy.sh/${process.env.NTFY_TOPIC}`, {
      method: "POST",
      headers: {
        "Title":        `New Lead — ${businessName || "RubyxQube"}`,
        "Priority":     "high",
        "Tags":         "bell,moneybag",
        "Content-Type": "text/plain",
      },
      body:
        `Name: ${lead.name}\n` +
        `Contact: ${lead.contact}\n` +
        `Needs: ${lead.service_needed}` +
        (lead.notes ? `\nNotes: ${lead.notes}` : ""),
    });
    console.log("ntfy sent for lead:", lead.name);
  } catch (err) {
    console.error("ntfy error:", err.message);
  }
}

// ─── SignalWire SMS — client's phone (~$0.008/text) ───────────────────────────
async function sendSMSAlert(lead, businessName) {
  const { SIGNALWIRE_SPACE_URL, SIGNALWIRE_PROJECT_ID, SIGNALWIRE_API_TOKEN, SIGNALWIRE_FROM_NUMBER, ALERT_PHONE_NUMBER } = process.env;
  if (!SIGNALWIRE_SPACE_URL || !SIGNALWIRE_PROJECT_ID || !SIGNALWIRE_API_TOKEN || !SIGNALWIRE_FROM_NUMBER || !ALERT_PHONE_NUMBER) return;
  try {
    const auth = Buffer.from(`${SIGNALWIRE_PROJECT_ID}:${SIGNALWIRE_API_TOKEN}`).toString("base64");
    const params = new URLSearchParams({
      From: SIGNALWIRE_FROM_NUMBER,
      To:   ALERT_PHONE_NUMBER,
      Body:
        `New lead — ${businessName || "RubyxQube"}\n` +
        `Name: ${lead.name}\n` +
        `Contact: ${lead.contact}\n` +
        `Needs: ${lead.service_needed}` +
        (lead.notes ? `\nNotes: ${lead.notes}` : ""),
    });
    const res = await fetch(
      `https://${SIGNALWIRE_SPACE_URL}/api/laml/2010-04-01/Accounts/${SIGNALWIRE_PROJECT_ID}/Messages`,
      {
        method:  "POST",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type":  "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || JSON.stringify(data));
    console.log("SMS sent via SignalWire for lead:", lead.name, "| SID:", data.sid);
  } catch (err) {
    console.error("SignalWire SMS error:", err.message);
  }
}

// ─── Resend email (free tier) ─────────────────────────────────────────────────
async function sendEmailAlert(lead, businessName) {
  if (!process.env.RESEND_API_KEY || !process.env.ALERT_EMAIL) return;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method:  "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify({
        from:    process.env.FROM_EMAIL || "onboarding@resend.dev",
        to:      process.env.ALERT_EMAIL,
        subject: `New lead — ${businessName || "RubyxQube"}`,
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

// ─── Supabase lead save (optional) ───────────────────────────────────────────
async function saveLeadToSupabase(lead) {
  const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return
  const contact = lead.contact || ''
  const isEmail = contact.includes('@')
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        client_id: null,
        name: lead.name || 'Unknown',
        phone: isEmail ? null : contact || null,
        email: isEmail ? contact : null,
        service_needed: lead.service_needed || null,
        source: 'chatbot',
        status: 'new',
        notes: lead.notes || null
      })
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('[saveLeadToSupabase] HTTP', res.status, text)
    } else {
      console.log('[saveLeadToSupabase] lead saved:', lead.name)
    }
  } catch (err) {
    console.error('[saveLeadToSupabase] error:', err.message)
  }
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin",  "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")    return res.status(405).json({ error: "Method not allowed" });

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({
      error: "ANTHROPIC_API_KEY is not set. Add it to your Vercel environment variables.",
    });
  }

  const { messages, systemPrompt, model, businessName } = req.body;

  const resolvedModel  = model || process.env.CLAUDE_MODEL || "claude-haiku-4-5-20251001";
  const resolvedSystem = systemPrompt || process.env.SYSTEM_PROMPT || DEFAULT_SYSTEM_PROMPT;

  try {
    // ── First Claude call ───────────────────────────────────────────────────
    const response1 = await client.messages.create({
      model:      resolvedModel,
      max_tokens: 512,
      system:     resolvedSystem,
      tools:      [LEAD_TOOL],
      messages,
    });

    // ── Tool use: lead captured ─────────────────────────────────────────────
    if (response1.stop_reason === "tool_use") {
      const toolUse = response1.content.find((b) => b.type === "tool_use");

      // Fire all alert channels without blocking the response
      sendNtfyAlert(toolUse.input, businessName).catch(() => {});
      sendSMSAlert(toolUse.input, businessName).catch(() => {});
      sendEmailAlert(toolUse.input, businessName).catch(() => {});
      saveLeadToSupabase(toolUse.input).catch(() => {});

      // Second call so Claude can respond naturally after tool result
      const response2 = await client.messages.create({
        model:      resolvedModel,
        max_tokens: 256,
        system:     resolvedSystem,
        messages: [
          ...messages,
          { role: "assistant", content: response1.content },
          {
            role: "user",
            content: [{
              type:        "tool_result",
              tool_use_id: toolUse.id,
              content:     "Lead captured. Business owner has been alerted.",
            }],
          },
        ],
      });

      const text =
        response2.content.find((b) => b.type === "text")?.text ||
        "Got it — Boyd will be in touch soon!";

      return res.json({ content: text, leadCaptured: toolUse.input });
    }

    // ── Normal text response ────────────────────────────────────────────────
    const text = response1.content.find((b) => b.type === "text")?.text || "";
    return res.json({ content: text });

  } catch (err) {
    console.error("Anthropic API error:", err);
    return res.status(500).json({
      error:   "AI service error",
      content: "Sorry, I'm having trouble right now. Please call or email Boyd directly.",
    });
  }
}
