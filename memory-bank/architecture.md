---
kind: canonical-architecture
last_verified: 2026-08-19
owner: coordinator
sources:
  - CLAUDE.md:38-85
  - src/auth.ts:9-47
  - src/auth.config.ts:3-45
  - src/lib/db/schema.ts:30-459
---

# Architecture Context

## Directional application layers

```text
src/app/ → src/server/services/ → src/lib/db/queries/ → Drizzle → Postgres
```

- `src/app/` pages access data only through `src/server/services/`.
- `src/components/` render typed props; they do not fetch data or import
  services, database code, integrations, or mocks.
- `src/server/integrations/` is the external-world boundary.
- `src/server/ai/` contains Anthropic-backed answer evaluation.
- `src/types/` is the cross-layer data contract.

Source: `CLAUDE.md:38-52`.

## Data backbone

- News uses `sources`, `articles`, `ingestion_runs`, `tickers`, and
  `article_tickers`.
- Community data uses `communities`, `community_posts`, and `post_tickers`.
- Market data uses `market_quotes` and `market_daily`.
- Academy data uses `weeks`, `lessons`, `lesson_prerequisites`,
  `lesson_sources`, `lesson_prompts`, `lesson_answers`, `answer_feedback`, and
  `user_progress`.

The schema is the source of truth for these names and relations; add a new
memory note only after its schema change is verified.

Source: `src/lib/db/schema.ts:30-459`.
## Read/write separation


Ingestion stays outside the request path:

```text
scripts/worker.ts or scripts/ingest.ts
  → src/server/integrations/<source>/
  → src/lib/db/
  → Postgres
```

Server Components and services form the read path. An external-source failure
must not make dashboard rendering fail. Network adapters propagate failures,
pure transformers do not perform network/database work, and each ingestion run
must remain observable.

## Academy content contract

Lesson bodies live in the repository, not the database:

```text
content/akademi/hafta-NN/NN-slug.md
```

Filename order is authoritative. Turkish frontmatter validates lesson metadata,
sources, prerequisites, and questions. Open questions require a rubric;
numerical questions require expected value and tolerance. Seed reads weeks from
`WEEK_SEED`, lessons from disk, and updates questions rather than deleting them
because answers cascade from questions.

Source: `CLAUDE.md:54-85`.

## Authentication boundary

`src/auth.ts` is Node-runtime-only because it imports Postgres and native
argon2. It configures Auth.js v5 Credentials authentication, looks up a
normalized email, and verifies the stored password hash with argon2. It returns
the same failure outcome for nonexistent users and wrong passwords.

`src/auth.config.ts` remains Edge-safe: it does not import the database or
argon2, uses JWT sessions, and configures protected route behavior. Do not
move Credentials authorization into it.

Sources: `src/auth.ts:9-47`, `src/auth.config.ts:3-45`.

## UI invariants carried forward

- Server Components are default; client components exist only for interaction.
- Blur occurs on outer glass/chrome surfaces, never on nested inset panels.
- Direction and status always combine color with an icon, text, or signed value.
- CSS, rather than JavaScript, runs continuous ticker animation.

These constraints were reviewed from the retired bank on 2026-08-19 and remain
subject to direct source and UI verification when a related component changes.
