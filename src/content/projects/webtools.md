---
title: webtools
tagline: Token-efficient web fetch and search for agents, with reference-style URLs.
lang: Rust
repo: https://github.com/kolisachint/webtools
status: shipped
tags: ["agents", "search", "tokens"]
featured: true
order: 5
---

A web page pasted into a context window is mostly URLs, and URLs are expensive.
webtools rewrites links as inline `[1]` markers — roughly one token each — and
collects the real addresses into a reference block at the end, so the model sees
a cheap marker but can still recover the exact URL when it needs it.
`--max-tokens` caps the whole output, references included.

The other half is honesty about failure. A search that was blocked, a page that
needs JavaScript, and a page that is genuinely empty are three different
outcomes. Most tools return the same silent nothing for all three; an agent then
hallucinates over the gap. Here they are distinct, and the agent can act on the
difference.

One binary, no API keys, no backend — and it takes keys when you want better
search results.
