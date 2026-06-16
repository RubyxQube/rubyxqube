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

// ─── Welcome email to client ──────────────────────────────────────────────────

async function sendClientWelcomeEmail(contract, signedName) {
  const { RESEND_API_KEY } = process.env;
  if (!RESEND_API_KEY || !contract.clientEmail) return;

  const firstName = signedName.split(" ")[0];

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f0ea;font-family:'Plus Jakarta Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0ea;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:#080808;border-radius:12px 12px 0 0;padding:28px 40px;">
          <span style="font-size:22px;font-weight:800;color:#ffffff;">RubyxQube</span>
          <span style="font-size:11px;font-weight:700;color:#e11d48;letter-spacing:0.12em;text-transform:uppercase;display:block;margin-top:4px;">LLC</span>
        </td></tr>
        <tr><td style="background:#ffffff;padding:36px 40px;">
          <h1 style="font-size:24px;font-weight:800;color:#111827;margin:0 0 16px;">You're in, ${firstName}.</h1>
          <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px;">
            Your <strong>${contract.package} agreement</strong> is signed and on file. I'll be in touch within 24 hours to kick things off.
          </p>
          <p style="font-size:14px;color:#6b7280;line-height:1.7;margin:0 0 24px;">
            In the meantime, it helps to have these ready:
          </p>
          <ul style="padding-left:20px;margin:0 0 24px;">
            <li style="font-size:14px;color:#374151;margin-bottom:8px;">Your logo files (PNG or SVG, any size)</li>
            <li style="font-size:14px;color:#374151;margin-bottom:8px;">5–10 photos of your work or business</li>
            <li style="font-size:14px;color:#374151;margin-bottom:8px;">Your services list with rough pricing</li>
            <li style="font-size:14px;color:#374151;margin-bottom:8px;">The cities or zip codes you serve</li>
            <li style="font-size:14px;color:#374151;margin-bottom:8px;">Your hours of operation</li>
          </ul>
          <p style="font-size:14px;color:#6b7280;line-height:1.7;margin:0;">
            Questions before then? Reply to this email or text me at (208) 970-8624.
          </p>
        </td></tr>
        <tr><td style="background:#080808;border-radius:0 0 12px 12px;padding:20px 40px;">
          <div style="font-size:12px;color:rgba(255,255,255,0.5);">
            Boyd Querubin · RubyxQube LLC · boyd@rubyxqube.com · rubyxqube.com
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Boyd Querubin <boyd@rubyxqube.com>",
      to: [contract.clientEmail],
      reply_to: "boyd@rubyxqube.com",
      subject: `You're signed — ${contract.package} with RubyxQube`,
      html,
    }),
  });
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
    sendClientWelcomeEmail(contract, signedName.trim()).catch(() => {});

    return res.status(200).json({ success: true, signedAt: new Date().toISOString() });
  }

  return res.status(405).json({ error: "Method not allowed." });
}
