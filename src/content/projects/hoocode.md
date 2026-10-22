---
title: HooCode
tagline: A terminal coding agent that shows you every change before it makes it.
lang: Rust
repo: https://github.com/kolisachint/hoocode
npm: https://www.npmjs.com/package/@kolisachint/hoocode
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

It is written in Rust. The first version was TypeScript; the Rust build
replaced it in October 2026 and ships as a single binary. The repository is a
workspace of small crates in four groups, versioned together: the unified
provider API, the agent runtime that handles tool calling and state, the coding
agent itself, and a terminal UI with differential rendering, so a long session
does not repaint the world on every token.

One command installs it, with no runtime to set up first. There is no Windows
build of the Rust version yet, so Windows still gets the TypeScript one:

```bash
curl -fsSL https://kolisachint.github.io/hoocode/install.sh | sh      # macOS, Linux
npm install -g @kolisachint/hoocode                                   # or via npm
irm https://kolisachint.github.io/hoocode-ts/install.ps1 | iex        # Windows (TypeScript build)
```

It was originally derived from Mario Zechner's MIT-licensed `pi-mono`, and the
Rust version is a migration of that code. It has grown a long way from it — modes, subagents, skills, plugins, MCP, session
persistence — but a good deal of the foundation is still his. The credit and
the copyright line stay in the repository, where they belong.
