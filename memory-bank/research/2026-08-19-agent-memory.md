---
kind: research
researched_on: 2026-08-19
status: complete
project_decision: Use portable Markdown memory; defer a semantic store.
---

# Current Agent-Memory Research

> Research is not a system of record. Project implications become canonical
> only through an accepted decision and verified implementation.

## 1. Functional memory layers

**Source:** [A Survey of Agent Memory in the Second Half](https://arxiv.org/abs/2602.06052)  
**Accessed:** 2026-08-19  
**Observed:** The survey distinguishes working, episodic, semantic, and
procedural memory; it also treats lifecycle management and multi-agent
organization as first-class agent-memory concerns.  
**Project implication:** This memory separates bounded current state (`now.md`),
durable product/architecture/environment facts, append-only decisions and
research, plus owner-scoped workstreams/handoffs. It does not collapse every
history record into one active prompt file.

## 2. Always-visible versus on-demand memory

**Source:** [Letta archival memory](https://docs.letta.com/v1-sdk/memory/archival-memory)  
**Accessed:** 2026-08-19  
**Observed:** Letta distinguishes always-available memory blocks from
semantically searchable archival memory that is queried on demand.  
**Project implication:** `CLAUDE.md` and bounded `now.md` are the small
always-read layer. Architecture, research, decisions, handoffs, and history are
selected only when relevant; they must not be loaded by default.

## 3. Namespaced cross-thread memory

**Source:** [LangGraph stores](https://docs.langchain.com/oss/python/langgraph/stores)  
**Accessed:** 2026-08-19  
**Observed:** LangGraph separates thread-scoped state from cross-thread stores,
uses namespaces to isolate stored records, and makes semantic search optional.
**Project implication:** Unique workstream and handoff paths provide a portable
namespace before adding a storage service. If path-based selective reading
becomes insufficient, a namespaced store can be considered by a new decision
with access control and retention requirements.

## 4. Portable agent entry point

**Source:** [AGENTS.md](https://agents.md/)  
**Accessed:** 2026-08-19  
**Observed:** `AGENTS.md` is an open Markdown convention for agent-focused
project context and works across a growing set of coding-agent tools.  
**Project implication:** Root `AGENTS.md` and the active `CLAUDE.md` entry
both direct agents to this index without duplicating permanent rules.

## Not adopted now

- **Letta:** Its memory blocks and archival search are useful patterns, but no
  Letta runtime is configured in this repository. Memory is active through
  repository Markdown, not a Letta service.
- **LangGraph/LangMem:** Its namespace/store model informed work ownership, but
  this Next.js repository has no LangGraph runtime or production store
  requirement.
- **Mem0:** No Mem0 integration is installed or configured, so it would add a
  new extraction, storage, provider, and access-control surface rather than
  make the active Markdown state more available.

Portable Markdown remains the smallest system current coding agents can read
from Git without a service dependency. A semantic store is deferred until
selective file reads fail an observed retrieval, scale, or access-control need.
