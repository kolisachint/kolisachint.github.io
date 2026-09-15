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
---

Most coding agents ask for trust. HooCode asks for approval. Every file edit and
every shell command passes through a permission gate, and the agent works inside
an explicit mode — Ask, Plan, Build, Debug — rather than behind one
do-everything prompt that quietly changes behaviour between turns.

The repository is a monorepo of four parts that are useful on their own: the
agent CLI, a runtime that handles tool calling and state, a unified API across
twenty-five-odd LLM providers, and a terminal UI library with differential
rendering so a long session does not repaint the world on every token.

It began as a fork of Mario Zechner's MIT-licensed `pi-mono`, and has grown a
long way from it — modes, subagents, skills, plugins, MCP, session persistence.
The upstream credit stays in the README, where it belongs.
