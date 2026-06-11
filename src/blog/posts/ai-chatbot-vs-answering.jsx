import React from "react";

export default function AiChatbotVsAnswering() {
  return (
    <>
      <p>If your service business loses leads after 5pm, you've probably heard two common solutions: hire an answering service, or add an AI chatbot. Both promise to capture customers who reach out after hours. But they're very different products at very different prices, and which one makes sense depends on your business.</p>
      <p>Here's a straight comparison — what each actually delivers for Treasure Valley contractors and service businesses.</p>

      <h2>What an answering service gives you</h2>
      <p>A live answering service puts real humans on the phone when you can't answer. They take a message, relay it to you, and in some cases can dispatch or schedule. The experience is consistent and professional — a real voice, familiar cadence, no uncanny valley.</p>
      <p>The cost: $99–$500/month for most small business plans, depending on call volume. Some charge per-minute overages. Emergency dispatch services (common for HVAC and plumbing) can run higher.</p>
      <p>The limitations: answering services take phone calls — they don't capture web visitors. In 2026, most leads start with a Google search and a website visit, not a phone call. If a customer fills out a form at 11pm or opens your chat widget, an answering service does nothing. They're also not trained on your specific services — they take messages, they don't answer pricing questions or qualify leads in real time.</p>

      <h2>What an AI chatbot gives you</h2>
      <p>An AI chatbot (the kind we build — powered by Claude from Anthropic) handles web visitors, not phone calls. It appears on your site, greets visitors, answers questions about your services and pricing, and captures the lead's name and contact info when they're ready to move forward.</p>
      <p>The cost: $30–$200/month for most configurations. Ours is included in the Autopilot plan at $399/month (which also includes your site, analytics, monthly reports, and updates).</p>
      <p>The limitation: it's text-based. If someone calls your phone number directly, the chatbot doesn't help. It also doesn't handle scheduling or dispatch — it captures the lead and you follow up.</p>

      <h2>Head-to-head comparison</h2>
      <div style={{ overflowX: "auto", marginBottom: 24 }}>
        <table>
          <thead>
            <tr>
              <th>Factor</th>
              <th>Answering Service</th>
              <th>AI Chatbot</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Monthly cost", "$99–$500+", "$30–$200"],
              ["Handles phone calls", "Yes", "No"],
              ["Handles web visitors", "No", "Yes"],
              ["Answers service/pricing questions", "Rarely", "Yes (trained on your business)"],
              ["Available 24/7", "Yes", "Yes"],
              ["Lead qualification", "Basic message-taking", "Full capture: name, contact, need"],
              ["Instant alert to owner", "Call/text relay", "SMS + email + push notification"],
              ["Setup complexity", "Low", "Low (we handle it)"],
            ].map(([factor, answering, ai], i) => (
              <tr key={i}>
                <td>{factor}</td>
                <td>{answering}</td>
                <td>{ai}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>When an answering service wins</h2>
      <p>Emergency dispatch trades — especially plumbing and HVAC — often need a real person on the phone to assess urgency. If a customer calls at 2am with a burst pipe, a text-based chatbot doesn't get the job. An answering service that can say "someone will call you back in 15 minutes" handles that situation better.</p>
      <p>If the majority of your after-hours leads come in via phone call (not web form or chat), an answering service fills a gap the chatbot won't.</p>

      <h2>When an AI chatbot wins</h2>
      <p>For most Treasure Valley service businesses — landscaping, window cleaning, stone and masonry, pressure washing, house cleaning, painting — the majority of new leads start on Google, land on your site, and decide whether to reach out within the first 60 seconds. An answering service doesn't touch those visitors.</p>
      <p>An AI chatbot trained on your business can answer "how much does it cost to clean gutters in Meridian?" at 9pm, capture the lead, and text you immediately. That interaction never would have happened with an answering service — because the customer wasn't going to call.</p>

      <h2>The hybrid approach</h2>
      <p>Some businesses use both: an AI chatbot for web visitors, and a basic $99/month answering service for phone calls. Total cost is still under $300/month. For businesses that get meaningful call volume after hours and are in a category where emergency response matters, this combo covers most bases.</p>

      <h2>The bottom line</h2>
      <p>If your leads come from your website (most small service businesses in 2026), start with an AI chatbot. It's cheaper, always available, trained on your specific business, and captures leads at the moment of intent — not after a phone tag delay.</p>
      <p>If you run an emergency service trade and most of your after-hours value comes from phone calls, add an answering service for the calls and a chatbot for the web. They solve different problems.</p>
    </>
  );
}
