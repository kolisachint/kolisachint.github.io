---
title: HooCode
tagline: For developers who want an AI coding assistant in the terminal that shows every edit and command first, and waits for a yes.
lang: Rust
repo: https://github.com/kolisachint/hoocode
npm: https://www.npmjs.com/package/@kolisachint/hoocode
docs: /hoocode
install: "curl -fsSL {origin}/hoocode/install.sh | sh"
status: shipped
tags: ["agents", "cli", "tui", "llm"]
featured: true
order: 1
---

It reads your code, runs your tests and edits your files, but nothing happens
until you approve it. That gate is the whole design. Four modes (Ask, Plan,
Build, Debug) keep its reach to what the job needs, and it works with whichever
model provider you already pay for.

Written in Rust since October 2026; Windows still gets the earlier TypeScript
build. It was originally derived from Mario Zechner's MIT-licensed `pi-mono`,
and his credit stays in the repository.
