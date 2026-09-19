---
title: HooCode
tagline: A terminal coding agent that shows you every change before it makes it.
lang: TypeScript
repo: https://github.com/kolisachint/hoocode
npm: https://www.npmjs.com/package/@kolisachint/hoocode-agent
status: shipped
tags: ["agents", "cli", "tui", "llm"]
featured: true
order: 1
---

HooCode reads your code, runs your tests and edits your files — but it shows
you each edit and each command first, and waits. That gate is the whole design.
An agent you still have to supervise is genuinely useful; one you cannot
supervise at all is a liability with a nice interface.

It runs in four scoped modes — Ask, Plan, Build, Debug — so it never has more
reach than the job needs, and it talks to whichever model you already pay for,
across twenty-five-odd providers.

The repository is a monorepo of four parts, each useful on its own: the agent
CLI, a runtime that handles tool calling and state, the unified provider API,
and a terminal UI library with differential rendering, so a long session does
not repaint the world on every token.

One command installs it, on any of the three platforms, with no runtime to set
up first:

```bash
curl -fsSL https://kolisachint.github.io/hoocode/install.sh | sh   # macOS, Linux
irm https://kolisachint.github.io/hoocode/install.ps1 | iex        # Windows
```

It was originally derived from Mario Zechner's MIT-licensed `pi-mono` and has
grown a long way from it — modes, subagents, skills, plugins, MCP, session
persistence — but a good deal of the foundation is still his. The credit and
the copyright line stay in the repository, where they belong.
