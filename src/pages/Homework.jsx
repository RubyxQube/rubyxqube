import React from "react";
import { Helmet } from "react-helmet-async";
import { ShieldCheck, Camera, Check } from "lucide-react";
import { siteConfig } from "../siteConfig.js";

/**
 * /homework — the Site Build Homework.
 *
 * Unlisted on purpose: not in the nav, noindex. Boyd sends the link after a
 * discovery call. It is not a top-of-funnel page, it is what turns a yes into a
 * build, and it doubles as qualification. Someone who returns it inside a week
 * is a good client; someone who needs three chases will need three chases
 * forever. See docs/MARKETING-PACKAGES.md.
 *
 * No account required, deliberately. Asking a contractor to sign up before they
 * have hired anyone is asking for commitment before it has been earned, and
 * every step of a signup loses people at the exact moment you can least afford
 * it. Answers save to their own browser so it can be done in two sittings, and
 * when they sign, the portal's onboarding is seeded from what they sent here.
 */

const STORAGE_KEY = "rxq-homework-v1";

const SECTIONS = [
  {
    n: "01",
    title: "The basics",
    why: "Exactly as you want it printed on the site, not as it appears on your LLC paperwork. If people call you Dave's, we say Dave's.",
    fields: [
      { k: "biz", q: "Business name, as customers say it", ph: "Dave's Heating & Air", required: true },
      { k: "what", q: "What you do, in one sentence", hint: "How you would say it to someone at a barbecue.", ph: "We fix and install furnaces and AC for homes" },
      { k: "where", q: "Towns you actually serve", hint: "Where you will genuinely drive. This decides which towns you can rank in.", ph: "Boise, Meridian, Eagle, Star. Not Mountain Home" },
      { k: "contact", q: "Phone and email for the site", hint: "The one you want ringing. Include an email and we will send you a copy of all this.", ph: "(208) 555-0100 / dave@..." },
      { k: "hours", q: "Hours", hint: "Say 24/7 emergency if that is true. It matters more than you think.", ph: "Mon to Fri 7 to 5, emergency calls anytime" },
    ],
  },
  {
    n: "02",
    title: "What you want it to do",
    why: "Not what you want it to look like. If we get this right, the look follows.",
    fields: [
      { k: "win", q: "What would make this obviously worth it in six months?", hint: "A number beats a feeling. Two extra jobs a month is a great answer.", ph: "Two more install jobs a month instead of just repairs", big: true },
      { k: "pain", q: "What is going wrong now?", hint: "Missed calls, no shows in search, nobody can find your pricing, the old site is embarrassing.", big: true },
      { k: "bestjob", q: "Which job do you want more of?", hint: "Most trades have one job that pays well and one that is a headache. Tell me which is which and I will point the whole site at the good one.", ph: "More full system replacements. Fewer $89 tune-ups", big: true },
    ],
  },
  {
    n: "03",
    title: "Your work",
    why: "This is the one that decides how fast your site goes live, and the one everybody gets stuck on. So read the box first.",
    callout: true,
    fields: [
      { k: "photos", q: "How are you sending photos?", hint: "Google Photos or iCloud link, Dropbox, texted, or I genuinely have none.", ph: "I'll share a Google Photos album" },
      { k: "proud", q: "Any job you are especially proud of?", hint: "One or two sentences. This becomes the story on your home page.", big: true },
    ],
  },
  {
    n: "04",
    title: "What you sell",
    why: "List them the way you would say them out loud. We handle the wording. If pricing varies too much to publish, say so and we will use ranges or nothing at all.",
    fields: [
      { k: "services", q: "Your services", hint: "One per line. Add a price or a range next to any you are happy to publish.", ph: "Furnace repair\nAC install, $4,500 to $9,000\nDuct cleaning, $399", big: true, tall: true },
      { k: "no", q: "Anything you do NOT want to be called about?", hint: "Just as useful. Saves you the calls you keep turning down.", ph: "No mobile homes, no commercial rooftop units" },
    ],
  },
  {
    n: "05",
    title: "Questions you answer every day",
    why: "The ones you are sick of repeating on the phone. These become your FAQ page and they train the assistant that answers at 8pm, so the more you write here the fewer calls you take after hours.",
    fields: [
      { k: "faq", q: "Five to ten questions, with your real answers", hint: "Type them the way you say them. Rough is fine, that is the point.", ph: "Do you charge for quotes? No, free for replacements, $89 diagnostic on repairs.\n\nHow fast can you come out? Usually same week, next day for no heat.", big: true, tall: true },
    ],
  },
  {
    n: "06",
    title: "Who else is out there",
    why: "We are going to look anyway. Faster if you tell us, and it is useful to know who you would hate to lose a job to.",
    fields: [
      { k: "comp", q: "One or two competitors", hint: "A name is enough. Say if there is anything about their site you like or hate.", big: true },
      { k: "why", q: "Why do customers pick you over them?", hint: "Even if it feels obvious. Especially if it feels obvious.", ph: "We actually answer the phone. And I do the install myself", big: true },
    ],
  },
  {
    n: "07",
    title: "Practical bits",
    why: "Loose ends. Say no or not sure freely, none of these block anything.",
    fields: [
      { k: "domain", q: "Do you own a domain?", hint: "The web address. If you do not, we will sort it.", ph: "davesheating.com, I think through GoDaddy" },
      { k: "logo", q: "Do you have a logo?", hint: "Any file at all, even one off a truck wrap or a business card." },
      { k: "existing", q: "Existing website or Facebook page?", hint: "Even an old one. There is usually copy worth keeping." },
      { k: "who", q: "Who is our main contact, and is anyone else deciding?", hint: "Business partner, spouse, office manager. Better to loop them in now than at the end.", ph: "Me, but my wife does the books and will want a look" },
      { k: "misc", q: "Anything else we should know?", big: true },
    ],
  },
];


export default function Homework() {
  const [answers, setAnswers] = React.useState({});
  const [status, setStatus] = React.useState("idle"); // idle | sending | sent | error
  const [error, setError] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);
  const startedAt = React.useRef(Date.now());

  // Restore on mount. Wrapped because a private window or blocked site data
  // makes localStorage throw rather than return null.
  React.useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (saved && typeof saved === "object") setAnswers(saved);
    } catch { /* fine, start empty */ }
  }, []);

  function update(k, v) {
    setAnswers((prev) => {
      const next = { ...prev, [k]: v };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* not fatal */ }
      return next;
    });
  }

  const startedCount = SECTIONS.filter((s) => s.fields.some((f) => (answers[f.k] || "").trim())).length;
  const pct = Math.round((startedCount / SECTIONS.length) * 100);

  async function submit(e) {
    e.preventDefault();
    if (!(answers.biz || "").trim()) {
      setError("Please add your business name, then send.");
      setStatus("error");
      document.querySelector('[name="biz"]')?.focus();
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/homework", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, _hp: "", _t: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setConfirmed(!!data.confirmationSent);
      setStatus("sent");
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* fine */ }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again, or email boyd@rubyxqube.com.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="pageMinHeight">
        <Helmet>
          <title>Thanks | RubyxQube</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <section className="surface heroSurface">
          <div className="section" style={{ paddingTop: 96, paddingBottom: 96, maxWidth: 620 }}>
            <span className="badge">Received</span>
            <h1 className="h1" style={{ marginTop: 16 }}>Got it. Thank you.</h1>
            <p className="p" style={{ fontSize: 17 }}>
              Boyd reads through it and comes back to you within one working day.
              {confirmed
                ? " A copy of everything you wrote is on its way to your inbox."
                : " If you would like a copy of your answers, email boyd@rubyxqube.com and we will send it over."}
            </p>
            <p className="p">
              Photos can follow whenever they are ready. They are the one thing that
              decides how fast your site goes live, so the sooner the better, but
              nothing is waiting on them today.
            </p>
            <div className="btnRow" style={{ marginTop: 28 }}>
              <a className="btn primary" href={`tel:${siteConfig.phoneE164}`}>Call Boyd</a>
              <a className="btn" href="/">Back to the site</a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Site Build Homework | RubyxQube</title>
        {/* Unlisted: this is sent to a specific person, not found in search. */}
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Everything RubyxQube needs to build your site, in one place. About twenty minutes, and it saves as you type." />
      </Helmet>

      <section className="surface heroSurface">
        <div className="section" style={{ paddingTop: 80, paddingBottom: 48 }}>
          <span className="badge">About 20 minutes</span>
          <h1 className="h1" style={{ marginTop: 16 }}>Site Build Homework</h1>
          <p className="p" style={{ maxWidth: 620, fontSize: 17 }}>
            Everything we need to build your site, in one place. You do not have to
            finish it in one sitting: it saves in your browser as you type, so you
            can put it down on a job and pick it back up.
          </p>
          <p className="p" style={{ maxWidth: 620 }}>
            Stuck on something? Skip it. Partial is genuinely fine, and there is no
            account to create.
          </p>
        </div>
      </section>

      <form onSubmit={submit}>
        {/* Honeypot. Off-screen rather than display:none, which some bots check
            for. Never announced to screen readers or reachable by keyboard. */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
          <label htmlFor="rxq-website">Website</label>
          <input id="rxq-website" name="_hp" type="text" tabIndex={-1} autoComplete="off" onChange={() => {}} />
        </div>

        <section className="surface">
          <div className="section" style={{ paddingTop: 40, paddingBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", maxWidth: 720 }}>
              <span style={{ fontSize: 13, color: "var(--muted)", whiteSpace: "nowrap" }}>
                {startedCount} of {SECTIONS.length} sections started
              </span>
              <span style={{ flex: "1 1 120px", height: 3, background: "var(--line)", borderRadius: 2, minWidth: 90 }}>
                <span style={{ display: "block", height: "100%", width: `${pct}%`, background: "var(--accent)", borderRadius: 2, transition: "width .28s ease" }} />
              </span>
            </div>
          </div>
        </section>

        {SECTIONS.map((s) => (
          <section className="surface" key={s.n}>
            <div className="section" style={{ paddingTop: 32, paddingBottom: 32, maxWidth: 720 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>{s.n}</span>
                <h2 className="h2" style={{ margin: 0 }}>{s.title}</h2>
              </div>
              <p className="p" style={{ marginTop: 8, marginBottom: 24, fontSize: 15 }}>{s.why}</p>

              {s.callout && (
                <div className="card cardHighlight" style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <Camera size={20} color="var(--accent)" strokeWidth={1.75} />
                    <h3 className="h3" style={{ margin: 0, fontSize: 17 }}>Do not go and take new photos</h3>
                  </div>
                  <p className="p" style={{ fontSize: 15 }}>
                    You already have what we need. Every trade has hundreds of job
                    photos on their phone, taken for insurance or to show a customer.
                    They are sideways, badly lit and full of duplicates, and you think
                    they are unusable.
                  </p>
                  <p className="p" style={{ fontSize: 15 }}>
                    Most of them are. Forty of them are not, and forty is a whole
                    website. We straighten, crop, colour-correct and caption them.
                    That is our job, not yours.
                  </p>
                  <ul className="p" style={{ fontSize: 14.5, paddingLeft: 20, marginBottom: 0 }}>
                    <li>Finished work, wide enough to see the whole thing</li>
                    <li>Before and after pairs. The most valuable photos you own</li>
                    <li>Your truck, your crew, your shop. People hire people</li>
                    <li>Anything with you in it. Owner photos beat stock every time</li>
                  </ul>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {s.fields.map((f) => (
                  <div key={f.k}>
                    {/* The site-wide label style is uppercase, 12px, letter-spaced. That
                        suits a one-word field name and is unreadable on a full-sentence
                        question, so these opt out rather than shouting twenty questions
                        at somebody. */}
                    <label
                      htmlFor={`hw-${f.k}`}
                      style={{ display: "block", fontWeight: 700, fontSize: 15, marginBottom: 4,
                               textTransform: "none", letterSpacing: "normal", color: "var(--text)", margin: "0 0 4px" }}
                    >
                      {f.q}{f.required && <span style={{ color: "var(--accent)" }}> *</span>}
                    </label>
                    {f.hint && (
                      <span style={{ display: "block", fontSize: 13.5, color: "var(--muted)", marginBottom: 6 }}>{f.hint}</span>
                    )}
                    {f.big ? (
                      <textarea
                        id={`hw-${f.k}`}
                        name={f.k}
                        className="textarea"
                        value={answers[f.k] || ""}
                        placeholder={f.ph || ""}
                        onChange={(e) => update(f.k, e.target.value)}
                        style={f.tall ? { minHeight: 170 } : undefined}
                      />
                    ) : (
                      <input
                        id={`hw-${f.k}`}
                        name={f.k}
                        type="text"
                        className="input"
                        value={answers[f.k] || ""}
                        placeholder={f.ph || ""}
                        onChange={(e) => update(f.k, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* ── Privacy, stated where they can see it rather than in a policy
            nobody opens. Every line here is one RubyxQube can actually honor,
            which is why it names Boyd and the database rather than claiming
            nobody else ever touches it. */}
        <section className="surface">
          <div className="section" style={{ paddingTop: 24, paddingBottom: 24, maxWidth: 720 }}>
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <ShieldCheck size={20} color="rgba(34,197,94,0.9)" strokeWidth={1.75} />
                <h3 className="h3" style={{ margin: 0, fontSize: 17 }}>What happens to what you write here</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {[
                  "We never sell, rent or trade your information. Not to anyone, not ever.",
                  "It is used for one thing: building and running your website.",
                  "It is emailed to Boyd and stored in RubyxQube's database. Nowhere else.",
                  "Ask any time and we will send you everything we hold, or delete it.",
                  "No account, no password, no tracking pixels on this page.",
                ].map((line) => (
                  <div key={line} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <Check size={15} color="var(--accent)" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: 14.5, lineHeight: 1.55 }}>{line}</span>
                  </div>
                ))}
              </div>
              <p className="p" style={{ fontSize: 13, marginTop: 14, marginBottom: 0 }}>
                We do not ask for anything sensitive here on purpose: no bank details,
                no social security number, nothing we would have to guard. Full detail
                in our <a href="/privacy" style={{ color: "var(--accent)" }}>privacy policy</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="surface">
          <div className="section" style={{ paddingTop: 8, paddingBottom: 80, maxWidth: 720 }}>
            {status === "error" && (
              <p className="p" style={{ color: "var(--accent)", fontWeight: 600, marginBottom: 14 }}>{error}</p>
            )}
            <button type="submit" className="btn primary" disabled={status === "sending"} style={{ padding: "14px 30px", fontSize: 16 }}>
              {status === "sending" ? "Sending..." : "Send it to Boyd"}
            </button>
            <p className="p" style={{ fontSize: 13.5, marginTop: 14, marginBottom: 0 }}>
              Include an email address above and you will get a copy of everything you
              wrote. Prefer to talk it through instead?{" "}
              <a href={`tel:${siteConfig.phoneE164}`} style={{ color: "var(--accent)" }}>{siteConfig.phoneDisplay}</a>
            </p>
          </div>
        </section>
      </form>
    </div>
  );
}
