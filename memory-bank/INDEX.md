# Agent Memory Index

## Read order

1. `AGENTS.md`
2. `CLAUDE.md`
3. This file and `now.md`
4. Exactly one of `product.md`, `architecture.md`, or `environment.md` when the task requires it
5. `memory-bank/decisionLog.md`, research, handoff, and historical records only when directly relevant

## Project-wide source precedence

`CLAUDE.md:104-115` is binding:

1. Verifiable Git history and working-tree state
2. `CLAUDE.md`
3. Accepted records in `memory-bank/decisionLog.md`
4. Design documents in `docs/superpowers/specs/`
5. `SUREC-GUNLUGU.md` and other memory-bank context
6. Older plan/status summaries and examples

The canonical files here are source-labeled convenience summaries. They never
override a higher-precedence source; contradictions are recorded with their
source and date.

## Ownership

- Coordinator only: `INDEX.md`, `now.md`, `product.md`, `architecture.md`, and `environment.md`.
- Agent owner only: its unique `workstreams/<agent-id>.md`, `handoffs/<timestamp>-<agent-id>.md`, and research note.
- Accepted durable decisions are appended to `memory-bank/decisionLog.md` with the fields mandated by `CLAUDE.md`; this directory has no second decision log.
- No agent writes another agent’s workstream. A handoff is immutable after its coordinator has consumed it.

## Lifecycle

- Start: create a unique workstream before editing code.
- During work: update only the owner workstream.
- Finish: create a handoff with paths, verification evidence, retained facts, and unresolved risks.
- For a durable decision, append the question, options, owner, rationale, assumptions, accepted risks, evidence, confidence, status, review trigger, and date to `memory-bank/decisionLog.md`.
- Consolidate: the coordinator updates canonical memory only from evidenced handoffs.
- `now.md` stays at or below 180 lines. Completed details move to handoffs; decisions remain in `decisionLog.md`.

## Historical records

The pre-unification bank was reviewed on 2026-08-19. Its durable current facts
were consolidated here; obsolete status and duplicate context files were
retired. `decisionLog.md` remains because it is the project’s authoritative,
append-only decision register.
