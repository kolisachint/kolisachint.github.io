---
title: filetools
tagline: Reversible, token-efficient file serialisation for models. Lossless both ways.
lang: Rust
repo: https://github.com/kolisachint/filetools
status: active
tags: ["tokens", "serialisation", "agents"]
featured: true
order: 8
---

Letting a model edit a file usually means a round trip through a lossy parse:
formatting, comments and byte-level detail quietly change even where nothing was
touched. filetools avoids that by treating the JSON it hands the model as a
*projection* of the file rather than a re-encoding.

A sidecar id-map records the byte span each node occupies. When the model
returns a patch, reconstruction splices the edits into those spans and copies
everything else through verbatim — so every byte the model did not touch is
reproduced exactly.
