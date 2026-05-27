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
[prospect-researcher] → [builder] → deploy Vercel preview → send cold outreach
```

- `prospect-researcher` — given a business name + city, scrapes Google/Yelp/their site and returns a full business profile, demo content, aesthetic recommendation, and cold outreach angle
- No approval checkpoints — Boyd is building for himself

Full reference: `docs/PROSPECT_DEMO_WORKFLOW.md`

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
