import React from "react";

export default function MobileFirstWebsiteNampa() {
  return (
    <>
      <p>Mobile-first is a phrase that gets used often in web design, but it has a specific technical meaning that matters for every service business in Nampa and the Treasure Valley. Here is what it actually means, why Google cares about it, and what it looks like in practice for a local service business website.</p>

      <h2>What mobile-first actually means</h2>
      <p>Mobile-first means the website is designed and built with the phone experience as the primary consideration, and then adapted for desktop, not the other way around. The traditional approach was to design for desktop and then try to make it work on a phone. That approach produces sites that technically display on mobile but are awkward to use: tiny text, hard-to-tap buttons, and layouts that require horizontal scrolling.</p>
      <p>A mobile-first site is built from the ground up for a 390px screen. Everything is readable without zooming, every button is large enough to tap with a thumb, and the most important information (phone number, service list, contact option) is visible without scrolling.</p>

      <h2>Why Google cares</h2>
      <p>Google uses mobile-first indexing, which means it evaluates your mobile site when deciding how to rank you in search results, even for desktop searches. If your mobile site is slow, hard to navigate, or has different content than your desktop site, your rankings suffer. PageSpeed on mobile is a direct ranking factor.</p>
      <p>For Nampa service businesses, this is directly relevant. If you are competing for "plumber Nampa" or "HVAC repair Nampa" and your mobile site scores poorly on PageSpeed Insights while a competitor's scores 90+, they have a structural advantage in search rankings regardless of other factors.</p>

      <h2>What it looks like for a service business</h2>
      <ul>
        <li>Phone number is visible immediately, as a tap-to-call link, not an image</li>
        <li>Text is at least 16px, readable without pinching</li>
        <li>Buttons are large enough to tap without precision</li>
        <li>The page loads in under three seconds on a mobile connection</li>
        <li>No horizontal scrolling on any page</li>
        <li>Contact form fields are easy to fill out on a touchscreen</li>
      </ul>

      <h2>How to check your own site</h2>
      <p>Go to pagespeed.web.dev and run your URL on the mobile setting. A score below 70 indicates real problems. Google also has a mobile usability report in Search Console that flags specific issues on your pages.</p>
      <p>If your site was built more than three years ago or was built on an older WordPress theme, it may pass basic display tests while still having significant performance and usability problems on mobile. Those problems quietly reduce your search visibility and your conversion rate every day. A site audit will tell you exactly where you stand.</p>
    </>
  );
}
