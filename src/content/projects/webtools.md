---
title: webtools
tagline: For people building AI agents. It fetches pages and search results compactly, so the agent spends fewer tokens on links and can tell when a page failed.
lang: Rust
repo: https://github.com/kolisachint/webtools
download: https://github.com/kolisachint/webtools/releases
status: shipped
tags: ["agents", "search", "tokens"]
featured: true
order: 3
---

Links are rewritten as `[1]` markers, about one token each, with the real
addresses kept in a block at the end. `--max-tokens` caps the whole output.

A blocked search, a page that needs JavaScript and a genuinely empty page come
back as three different results, so the agent can act on the difference instead
of guessing. One binary, no API keys needed.
