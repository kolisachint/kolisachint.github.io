---
title: HooCode
tagline: A terminal coding agent that stays deterministic and asks before it acts.
lang: TypeScript
repo: https://github.com/kolisachint/hoocode
npm: https://www.npmjs.com/package/@kolisachint/hoocode-agent
status: shipped
tags: ["agents", "cli", "tui", "llm"]
featured: true
order: 1
demo:
  src: /hoocode/demo.mp4
  poster: /hoocode/demo-poster.webp
  caption: HooCode in Ask mode, mapping API routes with a subagent. 102 seconds, no audio.
---

Most coding agents ask for trust. HooCode asks for approval. It works in
four scoped modes — Ask, Plan, Build, Debug — across 25+ providers, with
hybrid search and one-click plugins in a single binary. Nothing applies
without your approval.

The repository is a monorepo of four parts that are useful on their own: the
agent CLI, a runtime that handles tool calling and state, a unified API across
twenty-five-odd LLM providers, and a terminal UI library with differential
rendering so a long session does not repaint the world on every token.

It began as a fork of Mario Zechner's MIT-licensed `pi-mono`, and has grown a
long way from it — modes, subagents, skills, plugins, MCP, session persistence.
The upstream credit stays in the README, where it belongs.
