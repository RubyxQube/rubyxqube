# AI Phone Answering Add-On — Research & Recommendation

Researched June 2026. Intended as a Momentum plan add-on.

---

## The Opportunity

The AI chat receptionist (Claude Haiku) handles web visitors. AI phone answering handles inbound calls.
Same pitch — 24/7 coverage, FAQ handling, message capture, instant SMS alert to owner — but for the phone line.

Target market: HVAC, plumbing, landscaping, dental, any Momentum client who misses calls when on the job or after hours.

---

## Platform Comparison

### Retell AI — **Recommended**

- **What it does:** Inbound + outbound AI voice calls. Natural conversation, sub-500ms latency.
- **Pricing:** Pay-as-you-go. ~$0.07–$0.15/min. ~$50–75/mo for a small business (200 calls, 3–4 min avg).
- **Setup:** ~30–60 min. Visual conversation builder + REST API.
- **A2P / phone numbers:** Managed on your behalf. $2/regular number, $5/toll-free. 3–5 business day registration. **No Twilio account needed.**
- **Integrations:** Webhooks, HubSpot, n8n/Zapier (Notion via Zapier).
- **Reliability:** 99.95% uptime, 30M+ calls/mo processed. Responsive support.
- **Cost for 200 calls/mo:** ~$50–75

### Synthflow — Budget Alternative

- **What it does:** Inbound + outbound, no-code setup.
- **Pricing:** $29/mo (50 min included), $99/mo (200 min), $0.12/min overage.
- **Setup:** 15–30 min. Drag-and-drop, no code needed.
- **A2P:** Managed (proprietary carrier). 1–2 business days.
- **Reliability:** Good, but **weak customer support** — if something breaks you're on your own more than with Retell.
- **Cost for 200 calls/mo:** ~$29–50
- **HIPAA-ready:** Yes (relevant for dental clients)

### Avoid: Vapi

Vapi requires you to bring your own Twilio account — meaning you'd be back in A2P registration hell. Skip.

### Avoid: Bland.ai (for this use case)

Stronger for outbound calling campaigns. Plans start at $299/mo. Overkill and overpriced for inbound SMB use.

---

## Recommended Approach

**Platform:** Retell AI (retellai.com)
**Start with:** Pay-as-you-go, no monthly minimum. Pilot with 1–2 Momentum clients before rolling out.

### Add-On Pricing to Charge Clients

| Tier | Calls/Mo | Your Cost | Charge Client | Margin |
|------|----------|-----------|---------------|--------|
| Lite | ~200 | $50–75 | $99/mo | ~40–50% |
| Pro | ~500 | $100–130 | $199/mo | ~35–50% |
| Enterprise | 2000+ | Custom | $499/mo | Custom |

Bundle into Momentum upsell pitch: "Add AI phone answering for $99/mo — your business answers calls 24/7, even when you're on a job."

---

## What the AI Phone Bot Does

1. Answers inbound calls with custom greeting ("Thanks for calling [Business Name]...")
2. Handles FAQs (service area, pricing, hours, emergency procedures)
3. Captures caller name, number, and reason for calling
4. Sends SMS alert to owner instantly
5. Optionally routes to owner's cell if they want to take the call live

---

## Implementation Steps (When Ready to Build)

1. Create Retell AI account at retellai.com
2. Add client's phone number ($2/mo) or forward their existing number to the Retell number
3. Build conversation flow: greeting → FAQ tree → message capture → end call
4. Connect webhook → fire SMS to client via TextBelt (same system as chat lead alerts)
5. Test 10 calls before going live
6. Add $2/mo Retell phone number cost to client env vars / billing notes

**Time to set up per client:** ~1–2 hours first time, ~30 min for subsequent clients once you have a template flow.

---

## Notes

- Do not mention Twilio anywhere in client sales calls — it's tainted from the A2P experience.
- Retell handles STIR-SHAKEN attestation and carrier registration — this is the key difference from DIY.
- Synthflow is HIPAA-ready if you land dental/medical clients who ask about it.
- Cal.com integration is possible via webhook for appointment booking during the call.
