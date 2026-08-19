---
kind: canonical-environment
last_verified: 2026-08-19
owner: coordinator
sources:
  - package.json:6-58
  - CLAUDE.md:10-36
  - CLAUDE.md:189-202
  - biome.json
  - node --version && npm --version && git --version
---

# Environment Context

## Verified runtime

| Tool | Version | Evidence |
|---|---:|---|
| Node.js | `v24.18.0` | observed 2026-08-19 |
| npm | `11.16.0` | observed 2026-08-19 |
| Git | `2.55.0.windows.3` | observed 2026-08-19 |

## Installed stack

- Next `^15.5.22` with App Router, React `^19.2.8`, TypeScript `^5.9.3`, and
  Tailwind `^4.3.3`.
- Drizzle ORM, `postgres`, `drizzle-kit`, and portable PostgreSQL.
- Auth.js v5 Credentials plus `@node-rs/argon2`.
- Biome for linting/formatting and `@anthropic-ai/sdk` for lesson-answer
  evaluation.
- Content/ingestion dependencies include `gray-matter`, `marked`, `zod`,
  `rss-parser`, `sanitize-html`, and `node-cron`.

Source: `package.json:24-58`.

## Commands

```bash
npm run dev          # start Next development server; run db:up first
npm run typecheck    # required before declaring application work complete
npm run lint         # required before declaring application work complete
npm run format        # format source and script files
npm run build         # Next production build

npm run db:up        # start portable PostgreSQL from .postgres/
npm run db:status    # check database process
npm run db:generate  # create migration after schema changes
npm run db:migrate   # apply migrations
npm run seed         # write reference data and academy lesson content

npm run ingest       # one RSS ingestion run
npm run worker       # scheduled RSS ingestion
npm run user:create  # create or update the single user account
```

Sources: `CLAUDE.md:10-30`, `package.json:6-22`.

## Tooling constraints

- Keep TypeScript at 5.x while the application is on Next 15. A machine-wide
  TypeScript 7 installation previously broke `next.config.ts` and path aliases.
- Node scripts load `.env.local` through `scripts/load-env.ts`; plain
  `dotenv/config` loads only `.env`.
- PostgreSQL is portable under `.postgres/`; it is not a Docker or Windows
  service installation.
- Route renames can leave stale generated `.next/types` entries. Remove the
  stale generated route directory before treating that typecheck error as a
  source defect.
- Do not use `npm audit fix --force`: it forces a Next 16 upgrade outside the
  current compatibility decision.

Source: `CLAUDE.md:189-202`.

## Biome constraints

`biome.json` excludes SVG and `drizzle/**` from its checked files, parses
Tailwind directives, uses 2-space indentation with a 100-character line width,
and applies double quotes, semicolons, trailing commas, and organized imports
for JavaScript/TypeScript. Preserve these settings when changing the formatter
or lint scope.

Source: `biome.json:2-45`.
