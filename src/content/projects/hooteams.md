---
title: HooTeams
tagline: Multi-agent orchestration with a live event stream.
lang: TypeScript
repo: https://github.com/kolisachint/hooteams
status: active
tags: ["agents", "orchestration", "sse"]
featured: true
order: 3
---

A team of agents is a scheduling problem wearing a trench coat. HooTeams builds
on HooCode agents with a dependency-free task DAG — topological order, a clear
split between ready and blocked, immutable snapshots — and an orchestrator that
walks it.

Everything the team does is published on a tagged event channel and fanned out
over SSE, so the CLI, the bundled mission-control web UI and anything else that
speaks the wire format all watch the same run happen.
