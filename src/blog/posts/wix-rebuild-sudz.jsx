import React from "react";

export default function WixRebuildSudz() {
  return (
    <>
      <p className="p">Sudz Window & Gutter had a Wix site. It was functional — they'd built it themselves, added their services, put up a contact form. It worked well enough to get them started. But as the business grew, the site started holding them back in ways that weren't always obvious.</p>
      <p className="p">Here's what we found, what we rebuilt, and what changed.</p>

      <h2 className="h3" style={{ marginTop: 36, marginBottom: 12 }}>Why Wix made sense at the start</h2>
      <p className="p">When you're a new service business, a Wix site is a completely reasonable call. You get online quickly, you don't need to hire anyone, and the cost is low. For validating that your business can get customers, it works.</p>
      <p className="p">Sudz was in that position. They used Wix to establish a presence, get their first customers, and start building reviews. For an early-stage business, that's the right move.</p>

      <h2 className="h3" style={{ marginTop: 36, marginBottom: 12 }}>What started limiting them</h2>
      <p className="p">As Sudz grew, a few things became problems:</p>
      <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
        <li className="p" style={{ marginBottom: 6 }}><strong>Page speed:</strong> Their Wix site loaded slowly — particularly on mobile. In a market like window and gutter cleaning where customers search on their phone during a Saturday morning walkthrough of their house, a slow site means a quick back button.</li>
        <li className="p" style={{ marginBottom: 6 }}><strong>Design ceiling:</strong> Wix templates give you limited control over design. The site looked like a Wix site — not a bad one, but not distinctive. In a local market with several competitors, that matters.</li>
        <li className="p" style={{ marginBottom: 6 }}><strong>No analytics:</strong> Without Google Analytics or Search Console set up properly, they had no idea where their traffic was coming from, which pages were getting visits, or whether their site was appearing in local search results.</li>
        <li className="p" style={{ marginBottom: 6 }}><strong>After-hours leads disappearing:</strong> Customers searching on evenings and weekends were filling out the contact form and getting nothing back until the next business day. By then, some had already called someone else.</li>
      </ul>

      <h2 className="h3" style={{ marginTop: 36, marginBottom: 12 }}>What we rebuilt</h2>
      <p className="p">We moved them off Wix entirely onto a custom React + Vite stack deployed on Vercel. Here's what that actually means for them:</p>
      <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
        <li className="p" style={{ marginBottom: 6 }}><strong>Custom design:</strong> Not a template — a design built around their brand, their service area, and the visual expectations of a professional home services company in the Treasure Valley.</li>
        <li className="p" style={{ marginBottom: 6 }}><strong>Performance:</strong> The new site loads significantly faster, particularly on mobile. No plugin overhead, no page builder bloat. The Lighthouse performance score went from the mid-60s (typical Wix) to 90+.</li>
        <li className="p" style={{ marginBottom: 6 }}><strong>Analytics and Search Console:</strong> Set up from day one. They can now see which pages drive traffic, where visitors come from, and how they're performing in Google search results.</li>
      </ul>

      <h2 className="h3" style={{ marginTop: 36, marginBottom: 12 }}>Adding the AI receptionist</h2>
      <p className="p">On top of the site rebuild, we added a Claude-powered AI receptionist trained on Sudz's services, service area, and pricing structure. It handles the scenarios that were falling through the cracks:</p>
      <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
        <li className="p" style={{ marginBottom: 6 }}>A homeowner checking their gutters on a Sunday afternoon asks "how much for a 2-story house in Nampa?" — the bot gives them a range, captures their info, and the owner gets an SMS.</li>
        <li className="p" style={{ marginBottom: 6 }}>Someone wants to know if they serve Eagle — yes, confirmed immediately, no wait.</li>
        <li className="p" style={{ marginBottom: 6 }}>A potential commercial account asks about recurring service contracts — the bot captures the lead and flags it as a commercial inquiry.</li>
      </ul>
      <p className="p">The bot doesn't make up quotes or book jobs autonomously. But it engages visitors, answers the questions it knows, and hands off to the owner with all the context they need before making the callback.</p>

      <h2 className="h3" style={{ marginTop: 36, marginBottom: 12 }}>What this means for other Boise service businesses</h2>
      <p className="p">Sudz's situation isn't unique. A lot of Treasure Valley service businesses started on Wix or Squarespace, did well enough to grow, and are now at a point where the DIY site is a ceiling rather than a floor.</p>
      <p className="p">The cost of staying on Wix is often invisible — slower search rankings, missed after-hours leads, no data to work from. The switch doesn't have to be expensive or complicated. Autopilot starts at $399/month with no setup fee and includes the site build, analytics, and AI receptionist.</p>
      <p className="p" style={{ marginBottom: 0 }}>If you're on Wix and wondering whether it's time to move on, a free audit is the clearest way to find out. No obligation — just an honest look at what your current site is doing (and not doing) for your business.</p>
    </>
  );
}
