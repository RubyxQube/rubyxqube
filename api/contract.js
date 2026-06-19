/**
 * api/contract.js — Vercel Serverless Function
 *
 * GET  /api/contract?token=xxx  — fetch contract data by token
 * POST /api/contract             — record a signature
 *
 * Environment variables (set in Vercel dashboard):
 *   SUPABASE_URL              required
 *   SUPABASE_SERVICE_KEY      required
 *   NTFY_TOPIC                    optional — push alert to Boyd on signing (free)
 *   TEXTBELT_KEY                  optional — SMS alert to Boyd on signing (~$0.01)
 *   ALERT_PHONE_NUMBER            optional — Boyd's cell, E.164: +1XXXXXXXXXX
 *   RESEND_API_KEY + ALERT_EMAIL  optional — email alert on signing
 */

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

function supabaseHeaders() {
  return {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
  }
}

async function findContractByToken(token) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/contract_proposals?token=eq.${encodeURIComponent(token)}&select=*&limit=1`,
    { headers: supabaseHeaders() }
  )
  const data = await res.json()
  return Array.isArray(data) ? data[0] || null : null
}

async function markSigned(id, signedName) {
  await fetch(
    `${SUPABASE_URL}/rest/v1/contract_proposals?id=eq.${id}`,
    {
      method: 'PATCH',
      headers: { ...supabaseHeaders(), 'Prefer': 'return=minimal' },
      body: JSON.stringify({
        status: 'signed',
        signed_name: signedName,
        signed_at: new Date().toISOString()
      })
    }
  )
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
        <tr><td style="background:#080808;border-radius:12px 12px 0 0;padding:24px 40px;">
          <img src="https://rubyxqube.com/brand/logo-h-white.png" alt="RubyxQube" width="160" style="display:block;width:160px;height:auto;">
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

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return res.status(500).json({ error: 'Server not configured.' })
  }

  // ── GET: fetch contract by token ──────────────────────────────────────────
  if (req.method === "GET") {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: "Missing token." });

    const row = await findContractByToken(token);
    if (!row) return res.status(404).json({ error: 'Contract not found.' })
    if (row.status === 'signed') return res.status(200).json({ ...row, alreadySigned: true })
    if (row.status === 'voided') return res.status(410).json({ error: 'This contract has been voided. Contact boyd@rubyxqube.com.' })
    return res.status(200).json(row)
  }

  // ── POST: record signature ────────────────────────────────────────────────
  if (req.method === "POST") {
    const { token, signedName } = req.body || {};
    if (!token || !signedName?.trim()) {
      return res.status(400).json({ error: "Missing token or signature." });
    }

    const row = await findContractByToken(token);
    if (!row) return res.status(404).json({ error: 'Contract not found.' })
    if (row.status === 'signed') return res.status(409).json({ error: 'Already signed.', alreadySigned: true })
    if (row.status === 'voided') return res.status(410).json({ error: 'Contract has been voided.' })

    await markSigned(row.id, signedName.trim())

    const contract = {
      package: row.package,
      amount: row.amount_cents / 100,
      clientEmail: row.client_email,
      clientPhone: row.client_phone,
    }

    sendSigningAlerts(contract, signedName.trim()).catch(() => {})
    sendClientWelcomeEmail(contract, signedName.trim()).catch(() => {})

    return res.status(200).json({ success: true, signedAt: new Date().toISOString() })
  }

  return res.status(405).json({ error: "Method not allowed." });
}
