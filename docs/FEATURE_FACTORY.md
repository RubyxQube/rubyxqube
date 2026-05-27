# The RubyxQube Feature Factory

> How we build every new site, feature, and chatbot — without vibe coding.

---

## The Problem This Solves

The loop that feels productive but isn't:
> Ask Claude to build something → it generates code → something's wrong → paste it back → it patches → something else is wrong → repeat.

Day 1: feels like magic.  
Day 30: you're spending more time supervising AI than you would have spent building it yourself.

The real problem is structural. When you type "build this" into a single Claude session, you're asking one AI to be the analyst, architect, designer, builder, and reviewer — all at once, in the same messy conversation. Wrong assumptions in the brief become wrong components. Wrong components become wrong client deliverables.

This factory splits the work so each role gets a clean context and a clear job.

---

## Why We Use 5 Agents, Not 7

The full 7-agent system from the tweet is designed for SaaS products with databases, background jobs, and separate frontend/backend codebases. That's not us.

We're a web design + AI agency building:
- Client marketing sites (React/Vite or static HTML)
- AI chatbots (Vercel serverless functions)
- Our own rubyxqube.com

So we run 5 agents adapted to our scale:

| Agent | Job | Tools |
|-------|-----|-------|
| `researcher` | Maps the codebase before anything is built | Read, Grep, Glob |
| `story-writer` | Turns rough idea into an approved client brief | Read |
| `spec-writer` | Turns approved brief into a technical plan | Read, Grep, Glob |
| `builder` | Builds from the approved spec | Read, Edit, Write, Bash |
| `validator` | Checks the build against the spec, reports gaps | Read, Grep, Glob |

**3 human checkpoints:**
1. Boyd approves the brief (before any technical decisions)
2. Boyd approves the spec (before any files are touched)
3. Boyd approves the final result (before committing and deploying)

---

## The Full Flow

```
Boyd: "Build a site for Phoenix Stoneworks — stone countertops, Treasure Valley"
                            ↓
              [researcher] — maps relevant files, existing patterns, risks
                            ↓
          [story-writer] — produces client brief: pages, content, chatbot?, tone
                            ↓
                    ⏸ BOYD APPROVES BRIEF
                            ↓
          [spec-writer] — technical plan: files to create, siteConfig values,
                          system prompt draft, Vercel env vars, design direction
                            ↓
                    ⏸ BOYD APPROVES SPEC
                            ↓
        [builder] — runs /frontend-design to lock aesthetic, then builds
                    every file in the spec. Returns summary of what was built.
                            ↓
       [validator] — checks implementation against spec. Reports gaps by severity.
                            ↓
                    ⏸ BOYD REVIEWS + DEPLOYS
```

---

## The 3 Human Checkpoints

### Checkpoint 1 — Approve the Brief
Read the story-writer's output. Ask:
- Does this match what the client actually needs?
- Are the pages right? Is anything missing?
- Is the chatbot scope correct?
- Are there open questions that need answers before we spec this out?

**If something's wrong here, it takes 5 minutes to fix. After the spec, it takes 5 hours.**

### Checkpoint 2 — Approve the Spec
Read the spec-writer's output. Ask:
- Do the files to create/edit look right?
- Does the system prompt draft cover the client's business accurately?
- Are the Vercel env vars all accounted for?
- Is there anything the spec assumes that we haven't confirmed?

**This is where you catch architectural mistakes. Not after 10 files have been written.**

### Checkpoint 3 — Approve the Build
Review the validator's report. Then:
- Open the dev server and click through the site
- Check mobile on a real phone or devtools at 390px
- Confirm the chatbot responds correctly
- Check that alerts fire (ntfy push on test lead capture)

**If the validator reports Critical issues, send back to builder. Don't ship criticals.**

---

## When to Run the Full Chain

**Always run for:**
- New client site (any size)
- New page on rubyxqube.com
- New feature with more than 2 files changing
- New chatbot setup for a client
- Significant redesign of an existing section

**Skip for:**
- Typo or copy fix
- Color or spacing tweak
- Single-file CSS adjustment
- Updating an env var or config value

---

## Phase 0 of Every Client Project

When a new client signs the Momentum plan:

1. **Run the researcher** — map the template (rubyxqube project structure), understand what to copy
2. **Run the story-writer** — produce the client brief from the onboarding questionnaire
3. **Boyd approves the brief**
4. **Run the spec-writer** — produce the technical plan (system prompt, siteConfig, pages, env vars)
5. **Boyd approves the spec**
6. **Run the builder** — scaffold the project, run `/frontend-design` to lock aesthetic, build
7. **Run the validator** — check before first commit

This is the SOP for every new client. Every time.

---

## Context Drift — The Silent Killer

Most Claude sessions don't fail dramatically. They drift.

A wrong assumption enters the context. The model keeps building on top of it.

**Rule:**
- Small mistake (typo, wrong variable name)? Correct inline.
- Wrong assumption about how something should work? Start a fresh session with the right assumption in the first prompt.

A clean session with the right mental model beats a patched session every time.

---

## CLAUDE.md — The Memory That Survives Every Session

Claude Code starts with zero memory every session. `CLAUDE.md` fixes this.

Every time an AI session makes a mistake that surprises you, ask:
> Would a rule in CLAUDE.md have prevented this?

If yes, add the rule. In a few weeks, your CLAUDE.md becomes a record of every assumption Claude got wrong — and sessions get noticeably better.

Keep it under 300 lines. Dense but scannable.
