/**
 * api/contract.js — Vercel Serverless Function
 *
 * GET  /api/contract?token=xxx  — fetch contract data by token
 * POST /api/contract             — record a signature
 *
 * Environment variables (set in Vercel dashboard):
 *   NOTION_TOKEN                  required
 *   NOTION_CONTRACTS_DATABASE_ID  required — separate from CRM database
 *   TWILIO_ACCOUNT_SID            optional — SMS alert on signing
 *   TWILIO_AUTH_TOKEN             optional
 *   TWILIO_FROM_NUMBER            optional
 *   ALERT_PHONE_NUMBER            optional
 */

const NOTION_VERSION = "2022-06-28";

// ─── Notion helpers ───────────────────────────────────────────────────────────

async function findContractByToken(token) {
  const res = await fetch(
    `https://api.notion.com/v1/databases/${process.env.NOTION_CONTRACTS_DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        "Content-Type": "application/json",
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
    clientEmail:        p["Client Email"]?.email || "",
    clientPhone:        p["Phone"]?.phone_number || "",
    package:            p["Package"]?.select?.name || "",
    amount:             p["Amount"]?.number || 0,
    paymentTerms:       extractText(p["Payment Terms"]),
    projectDescription: extractText(p["Project Description"]),
    status:             p["Status"]?.status?.name || "Pending",
    signedName:         extractText(p["Signed Name"]),
    createdDate:        page.created_time?.split("T")[0] || "",
  };
}

async function markSigned(pageId, signedName, ip) {
  await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Content-Type": "application/json",
      "Notion-Version": NOTION_VERSION,
    },
    body: JSON.stringify({
      properties: {
        Status:       { status: { name: "Signed" } },
        "Signed Name": { rich_text: [{ text: { content: signedName } }] },
        "Signed At":  { date: { start: new Date().toISOString() } },
      },
    }),
  });
}

// ─── SMS alert ────────────────────────────────────────────────────────────────

async function sendSmsAlert(contract, signedName) {
  const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_FROM_NUMBER,
    ALERT_PHONE_NUMBER,
  } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER || !ALERT_PHONE_NUMBER) return;

  const body =
    `✍️ Contract signed!\n` +
    `Client: ${signedName}\n` +
    `Package: ${contract.package} — $${contract.amount}\n` +
    `rubyxqube.com`;

  const params = new URLSearchParams({
    To: ALERT_PHONE_NUMBER,
    From: TWILIO_FROM_NUMBER,
    Body: body,
  });

  await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }
  );
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
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

    if (contract.status === "Signed") {
      return res.status(200).json({ ...contract, alreadySigned: true });
    }

    if (contract.status === "Voided") {
      return res.status(410).json({ error: "This contract has been voided. Contact boyd@rubyxqube.com." });
    }

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
    if (contract.status === "Signed") {
      return res.status(409).json({ error: "Already signed.", alreadySigned: true });
    }
    if (contract.status === "Voided") {
      return res.status(410).json({ error: "Contract has been voided." });
    }

    const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "";
    await markSigned(page.id, signedName.trim(), ip);
    sendSmsAlert(contract, signedName.trim()).catch(() => {});

    return res.status(200).json({ success: true, signedAt: new Date().toISOString() });
  }

  return res.status(405).json({ error: "Method not allowed." });
}
