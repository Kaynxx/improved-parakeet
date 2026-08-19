---
kind: current-state
last_verified: 2026-08-19
owner: coordinator
sources:
  - CLAUDE.md
  - package.json
  - src/auth.ts
  - git log -20 --format="%h %ad %s" --date=short
  - git status --short
  - content/akademi/hafta-*/*.md
  - drizzle/
  - node --version && npm --version && git --version
  - SUREC-GUNLUGU.md:32-69
---

# Current Project State

> Snapshot at `2026-08-19`. This is an evidenced handoff point, not a
> live-agent dashboard. Only an evidenced handoff may replace it.

## Memory operation

New sessions discover this memory through `CLAUDE.md` and AGENTS.md-aware
tools through `AGENTS.md`. This directory keeps current state and task
coordination separate from the authoritative decision register:
permanent decisions are appended to `memory-bank/decisionLog.md`.

## Confirmed state

- **Product:** Single-user Turkish financial dashboard: RSS news, market
  indicators, community sentiment, and an eight-week monetary-economics
  academy. Source: `CLAUDE.md:1-8`.
- **Academy corpus:** Eight `content/akademi/hafta-*` directories contain 40
  Markdown lesson files. Source: `content/akademi/hafta-*/*.md` listing,
  observed 2026-08-19.
- **Committed academy delivery:** The current branch is
  `faz2bc-akademi-mufredat`. Its direct history includes community-sentiment
  work (`3f4bfba`), Finnhub-backed market cards (`2d7b753`), and the repaired
  migration chain (`218eaa5`) on 2026-08-11. Source: observed
  `git branch --show-current && git log -20 --format="%h %ad %s" --date=short`
  output.
- **Current implementation summary:** The retained process journal records
  8 weeks, 40 lessons, 120 sources, 120 questions, 70 prerequisite edges,
  Postgres-backed sentiment/video/market services, and a deliberately
  consolidated baseline migration. This session did not rerun those commands;
  treat the journal’s command outcomes as historical evidence. Source:
  `SUREC-GUNLUGU.md:34-67`.
- **Uncommitted-work boundary:** `scripts/seed.ts` has an existing working-tree
  modification. Its owner and relation to the committed Academy work are not
  inferred from status alone. Source: observed `git status --short` output.
- **Authentication:** Auth.js v5 uses a Credentials provider and argon2
  password verification; this is not a pending Google OAuth integration.
  Sources: `package.json:25-45`, `src/auth.ts:9-47`, `CLAUDE.md:32-36`.
- **Toolchain:** Node `v24.18.0`, npm `11.16.0`, Git
  `2.55.0.windows.3`. Source: observed
  `node --version && npm --version && git --version` output on 2026-08-19.
- **Recent history:** The latest observed commits are 2026-08-19 security
  planning documents (`a378e0e`, `34560f3`); the 2026-08-11 UI commits remain
  the latest observed visual implementation work. This history does not reveal
  a current agent’s live state. Source: observed
  `git log -20 --format="%h %ad %s" --date=short` output.

## Decision rule

The `CLAUDE.md:95-178` decision contract governs this memory. A durable choice
is not accepted until `memory-bank/decisionLog.md` records its question,
options, user-owned decision, rationale, assumptions, accepted risks, evidence,
confidence, status, review trigger, and date.

## Legacy retirement

The former full-load Cline bank was reviewed before retirement. Its durable
product, architecture, environment, and current-state notes were consolidated
into this directory. `decisionLog.md` remains intact because it is the
project’s authoritative append-only decision register.
