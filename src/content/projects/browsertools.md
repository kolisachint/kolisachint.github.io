---
title: browsertools
tagline: A deterministic browser engine with no model on the hot path.
lang: Rust
repo: https://github.com/kolisachint/browsertools
status: active
tags: ["browser", "cdp", "determinism", "agents"]
featured: true
order: 7
---

The thesis: once a browser flow has been recorded, replaying it is fully
deterministic and needs no model at all. A language model is useful when
*discovering* a flow or resolving genuine ambiguity, and is pure cost and
variance on every replay after that.

So browsertools drives Chromium over raw CDP and keeps the model out of process.
`run-flow` replays a saved flow once and writes a tamper-evident evidence
bundle, with zero LLM calls. `serve` exposes the browser primitives — navigate,
click, fill, observe — over stdio JSON-RPC to a parent that may or may not be an
agent. A WebSocket screencast lets you watch a live session with the action
events synced alongside it.
