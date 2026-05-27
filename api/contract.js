/**
 * api/contract.js — Vercel Serverless Function
 *
 * GET  /api/contract?token=xxx  — fetch contract data by token
 * POST /api/contract             — record a signature
 *
 * Environment variables (set in Vercel dashboard):
 *   NOTION_TOKEN                  required
 *   NOTION_CONTRACTS_DATABASE_ID  required — separate from CRM database
 *   NTFY_TOPIC                    optional — push alert to Boyd on signing (free)
 *   TEXTBELT_KEY                  optional — SMS alert to Boyd on signing (~$0.01)
 *   ALERT_PHONE_NUMBER            optional — Boyd's cell, E.164: +1XXXXXXXXXX
 *   RESEND_API_KEY + ALERT_EMAIL  optional — email alert on signing
 */

const NOTION_VERSION = "2022-06-28";

// ─── Notion helpers ───────────────────────────────────────────────────────────

async function findContractByToken(token) {
  const res = await fetch(
    `https://api.notion.com/v1/databases/${process.env.NOTION_CONTRACTS_DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization:    `Bearer ${process.env.NOTION_TOKEN}`,
        "Content-Type":   "application/json",
        "Notion-Version": NOTION_VERSION,
      },
      body: JSON.stringify({
        filter: { property: "Token", rich_text: { equals: token } },
      }),
    }
  );
  const data = await res.json();
  return data.results?.[0] || null;
}

function extractText(prop) {
  return prop?.rich_text?.[0]?.plain_text || "";
}

function parseContract(page) {
  const p = page.properties;
  return {
    id:                 page.id,
    clientName:         extractText(p["Client Name"]),
    clientEmail:        p["Client Email"]?.email        || "",
    clientPhone:        p["Phone"]?.phone_number        || "",
    package:            p["Package"]?.select?.name      || "",
    amount:             p["Amount"]?.number             || 0,
    paymentTerms:       extractText(p["Payment Terms"]),
    projectDescription: extractText(p["Project Description"]),
    status:             p["Status"]?.select?.name       || "Pending",
    signedName:         extractText(p["Signed Name"]),
    createdDate:        page.created_time?.split("T")[0] || "",
  };
}

async function markSigned(pageId, signedName) {
  await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH",
    headers: {
      Authorization:    `Bearer ${process.env.NOTION_TOKEN}`,
      "Content-Type":   "application/json",
      "Notion-Version": NOTION_VERSION,
    },
    body: JSON.stringify({
      properties: {
        Status:        { select:    { name: "Signed" } },
        "Signed Name": { rich_text: [{ text: { content: signedName } }] },
        "Signed At":   { date:      { start: new Date().toISOString() } },
      },
    }),
  });
}

// ─── Alert helpers ────────────────────────────────────────────────────────────

async function sendSigningAlerts(contract, signedName) {
  const alertText =
    `Contract signed!\n` +
    `Client:  ${signedName}\n` +
    `Package: ${contract.package} — $${contract.amount}\n` +
    `rubyxqube.com`;

  // ntfy.sh push
  const { NTFY_TOPIC } = process.env;
  if (NTFY_TOPIC) {
    await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method:  "POST",
      headers: {
        "Title":        "Contract Signed!",
        "Priority":     "urgent",
        "Tags":         "writing,moneybag",
        "Content-Type": "text/plain",
      },
      body: alertText,
    }).catch(err => console.error("ntfy error:", err.message));
  }

  // TextBelt SMS
  const { TEXTBELT_KEY, ALERT_PHONE_NUMBER } = process.env;
  if (TEXTBELT_KEY && ALERT_PHONE_NUMBER) {
    await fetch("https://textbelt.com/text", {
      method:  "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:    new URLSearchParams({ phone: ALERT_PHONE_NUMBER, message: alertText, key: TEXTBELT_KEY }).toString(),
    }).catch(err => console.error("TextBelt error:", err.message));
  }

  // Resend email
  const { RESEND_API_KEY, ALERT_EMAIL, FROM_EMAIL } = process.env;
  if (RESEND_API_KEY && ALERT_EMAIL) {
    await fetch("https://api.resend.com/emails", {
      method:  "POST",
      headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from:    FROM_EMAIL || "onboarding@resend.dev",
        to:      [ALERT_EMAIL],
        subject: `Contract signed — ${signedName} (${contract.package})`,
        text:    alertText,
      }),
    }).catch(err => console.error("Resend error:", err.message));
  }
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin",  "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (!process.env.NOTION_TOKEN || !process.env.NOTION_CONTRACTS_DATABASE_ID) {
    return res.status(500).json({ error: "Server not configured." });
  }

  // ── GET: fetch contract by token ──────────────────────────────────────────
  if (req.method === "GET") {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: "Missing token." });

    const page = await findContractByToken(token);
    if (!page) return res.status(404).json({ error: "Contract not found." });

    const contract = parseContract(page);
    if (contract.status === "Signed")  return res.status(200).json({ ...contract, alreadySigned: true });
    if (contract.status === "Voided")  return res.status(410).json({ error: "This contract has been voided. Contact boyd@rubyxqube.com." });

    return res.status(200).json(contract);
  }

  // ── POST: record signature ────────────────────────────────────────────────
  if (req.method === "POST") {
    const { token, signedName } = req.body || {};
    if (!token || !signedName?.trim()) {
      return res.status(400).json({ error: "Missing token or signature." });
    }

    const page = await findContractByToken(token);
    if (!page) return res.status(404).json({ error: "Contract not found." });

    const contract = parseContract(page);
    if (contract.status === "Signed") return res.status(409).json({ error: "Already signed.", alreadySigned: true });
    if (contract.status === "Voided") return res.status(410).json({ error: "Contract has been voided." });

    await markSigned(page.id, signedName.trim());
    sendSigningAlerts(contract, signedName.trim()).catch(() => {});

    return res.status(200).json({ success: true, signedAt: new Date().toISOString() });
  }

  return res.status(405).json({ error: "Method not allowed." });
}
