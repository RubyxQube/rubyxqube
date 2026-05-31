# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

---

## How We Build — The 5-Agent Factory

Every new feature, page, or client site follows this chain before any code is written:

```
Researcher → Story Writer → [Boyd approves] → Spec Writer → [Boyd approves] → Builder → Validator → [Boyd approves]
```

**3 human checkpoints. Everything else runs on its own.**

- `researcher` — maps existing code and patterns. Always first. Read-only.
- `story-writer` — turns the rough idea into a brief Boyd can approve. Read-only.
- `spec-writer` — turns the approved brief into a technical plan. Read-only.
- `builder` — builds from the approved spec. Uses `/frontend-design` for new site origination.
- `validator` — checks the finished build against the spec. Reports gaps. Never fixes. Read-only.

Full reference: `docs/FEATURE_FACTORY.md`

Skip the chain for: typo fixes, color tweaks, copy updates, minor CSS adjustments.

---

## Cold Prospect Demos — Sales Pipeline

To build a personalized demo site for a cold prospect:

```
[prospect-researcher] → [outreach-drafter] → [builder] → deploy Vercel preview → send cold outreach
```

- `prospect-researcher` — given a business name + city, scrapes Google/Yelp/their site and returns a full business profile, demo content, aesthetic recommendation, and cold outreach angle
- `outreach-drafter` — takes the prospect profile and drafts all 4 outreach messages (email, SMS, DM, GBP) ready to send
- No approval checkpoints — Boyd is building for himself

Full reference: `docs/PROSPECT_DEMO_WORKFLOW.md`

---

## Client Onboarding — When a Prospect Signs

```
[client-scaffolder] → [builder] → deploy to Vercel → test chatbot → go live
```

- `client-scaffolder` — takes the signed client profile and scaffolds the full project: copies template files, creates client-specific stubs, git init. Ready to hand to the builder.
- No approval checkpoints — Boyd runs this himself after signing

Full reference: `docs/SOP.md` §8

---

## Monthly Care — Autopilot and Momentum Clients

```
Pull GA4 + GSC + chatbot data → [report-writer] → send to client
```

For Momentum clients, also run:
```
[content-writer] → GBP posts + review responses → client approves → post
```

- `report-writer` — given raw GA4, GSC, and chatbot data, produces the formatted monthly report saved to `reports/[client-slug]/[YYYY-MM].md`
- `content-writer` — writes GBP posts, review responses, social captions, and site copy updates in the owner's voice

Full reference: `docs/SOP.md` §9

---

## Working on the RubyxQube Site

The main project is a React + Vite marketing website. Rules for tech stack, design tokens, and conventions:

@.claude/rules/project-context.md

---

## AI Chatbot (Claude-Powered Receptionist)

Rules for building, updating, and deploying the AI receptionist for RubyxQube and all client sites:

@.claude/rules/chatbot-rules.md

---

## Client Design Recreation

When Boyd provides a reference screenshot of a client website to recreate:

@.claude/rules/workflow.md
@.claude/rules/technical-defaults.md
@.claude/rules/design-rules.md
