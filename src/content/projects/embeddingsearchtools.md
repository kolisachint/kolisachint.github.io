---
title: embeddingsearchtools
tagline: For developers adding search to their own tool. It finds text by meaning and by exact words, on your machine, with no search service to run.
lang: Rust
repo: https://github.com/kolisachint/embeddingsearchtools
download: https://github.com/kolisachint/embeddingsearchtools/releases
status: active
tags: ["search", "embeddings", "onnx", "hnsw"]
featured: true
order: 2
---

Keyword search misses the document that says the same thing in other words;
vector search misses the one where the exact word mattered. This does both and
fuses the results.

The HNSW index is written from scratch, because I wanted to understand it
rather than call it. Embeddings come from MiniLM through ONNX Runtime at int8.
Use it as a Rust library, a CLI, or a stdio daemon.
