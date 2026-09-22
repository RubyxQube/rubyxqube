# Who owns the software: where RubyxQube actually stands

Written 2026-09-22, because Manny is showing the PSW platform to other
contractors, has started saying "our cut", and nothing had been checked.

**Not legal advice.** This is a read of documents already in this repo, plus
what they leave open. An Idaho attorney should see the last section before
anything is signed with a third party.

---

## The finding

There are **two documents in this repo that say opposite things**, and it
matters which one governs.

### 1. `docs/SERVICE_AGREEMENT_TEMPLATE.md`, clause 6

> Upon receipt of **final payment in full**, Client owns all final deliverables
> (design, code, copy produced by RubyxQube).
>
> Prior to final payment, all work remains the property of RubyxQube LLC.

`docs/LEGAL.md` repeats it as the house rule. **If Manny signed a version of
this, Manny owns the code**, and the platform cannot be sold to Nick without
his agreement.

Note the clause is also internally awkward. Clause 9 says that on termination
"RubyxQube will deactivate AI chatbot API keys and **remove proprietary systems
from the site**", which assumes there are systems the client does *not* get.
Clause 6 says the client gets everything. Those cannot both be true, and the
gap between them is precisely what gets argued about later.

Worse for a retainer: "final payment in full" has no meaning in a month-to-month
engagement with no end date. Is every monthly payment a final payment? Is there
never one? Nobody has decided.

### 2. `clients/phoenix-stoneworks/Proposals/PSW-B2B-Agreement-2026-05-28`

> **Platform Ownership.** Developer retains sole ownership of the Platform,
> including all source code, software, designs, algorithms, and documentation.
> This Agreement grants Client a non-exclusive, non-transferable right to use
> the Platform for the purposes described herein. **Client receives no
> ownership interest in the Platform.**
>
> **Client Data.** Client retains ownership of all business data generated
> through the Platform, including customer information, quotes, jobs, and
> partner records.

This is exactly the right answer, and Boyd wrote it himself in May. It is the
shape recommended on 2026-09-21 before anyone had looked: RubyxQube owns the
asset, the client licenses it, the client keeps their own data.

It even contains the revenue share Manny is now reaching for:

| | |
|---|---|
| Platform Fee | **$99 / month** |
| Revenue Share | **10% of Completed Job Value**, within 30 days of each completed job |

---

## Why this is not settled

**The B2B agreement appears never to have been signed.** The effective date is
`[DATE]`, the client name is `[Owner Full Name]`, the signature blocks are
empty, and the header says in as many words:

> This is a working draft prepared by RubyxQube for discussion purposes. It is
> not legal advice. Both parties are encouraged to have this reviewed by a
> licensed attorney before signing.

**Its economics describe a deal that never happened.** $99/month plus 10% of
completed job value is not what Manny pays. He is on Momentum at $999/month
flat. So even if it were signed, it describes a different arrangement from the
live one.

**It only covers the B2B quoting platform.** Since May the work has grown into
the customer portal, the status board, the scheduling system, the job
workflow, the blueprint tools and the 3D walkthrough. A licence scoped to "the
Platform" as defined in May may not reach any of it.

**And something was signed at onboarding.** `.claude/rules/chatbot-rules.md`
cites "the signed RubyxQube service agreement at onboarding" as the A2P 10DLC
consent basis for texting Manny. That document is not in this repo or in
`vault/legal`. **Finding it is the single highest-value thing on this list**,
because if it is the template above, clause 6 governs and the answer flips.

---

## What to do, in order

1. **Find what Manny actually signed.** Email, Drive, DocuSeal, a PDF on the
   laptop. Until that is in hand, everything else is speculation. If it turns
   out nothing was ever signed beyond an invoice, that is also an answer, and a
   better one than the template.
2. **Do not let Manny quote terms to Nick.** He is meeting him, not Boyd, and
   he will be asked what it costs and what Nick gets. Give him one page: what
   the package is, what it includes, what it costs, and that terms come from
   RubyxQube. Otherwise he invents them in good faith and they become the
   starting position.
3. **Reconcile the two documents.** The template's clause 6 is wrong for a
   platform business and should not survive into any new client. "Client owns
   the deliverables" is right for a one-off website and fatal for software
   meant to be sold more than once. Split it explicitly:
   - the **client's site, copy, branding and data**: theirs
   - the **platform, engine, calculators and portal**: RubyxQube's, licensed
4. **Extend the B2B language to cover everything built since May**, and get it
   signed. The wording already exists and is good; it just needs the scope
   widened past the B2B quoting piece and the fee section replaced with the
   real $999 Momentum terms.
5. **Decide what Manny actually gets.** He has earned something: he is the
   design partner, the proof, and the one bringing people. The May draft's 10%
   revenue share is one answer. A referral cut on deals he sources is another
   and is cheaper. Either is fine. Deciding by default, which is what happens
   if nobody raises it, is not.
6. **Then an attorney.** Not before, because paying someone to read an
   unresolved question is how the bill gets big. Take them the signed document,
   the reconciled position, and the question "does this hold in Idaho".

---

## The one-liner for Boyd

**The language needed already exists, in a draft Boyd wrote in May, and it says
RubyxQube owns the platform.** The risk is not that the position is wrong. It
is that a generic template in this same repo says the opposite, nobody knows
which one Manny signed, and he is about to describe the deal to a third party
without either.

---

Related: `docs/LEGAL.md`, `docs/SERVICE_AGREEMENT_TEMPLATE.md`,
`docs/COMPETITIVE-LANDSCAPE.md`,
`clients/phoenix-stoneworks/Proposals/PSW-B2B-Agreement-2026-05-28.pdf`.
