---
title: embeddingsearchtools
tagline: Search that matches on meaning as well as on words. Rust, and no service to call.
lang: Rust
repo: https://github.com/kolisachint/embeddingsearchtools
status: active
tags: ["search", "embeddings", "onnx", "hnsw"]
featured: true
order: 2
---

Keyword search misses the document that says the same thing in different words.
Vector search misses the one where the exact word mattered. This does both and
fuses the results, which in practice is what you wanted from either.

Three decoupled layers sit behind one small API: an embedder that turns text
into vectors, an index that returns the top *k*, and an optional BM25 lexical
index that makes retrieval hybrid. Each is a trait, so an exact index can be
swapped for an approximate one per store without touching a caller.

The HNSW implementation is written from scratch rather than pulled in, which was
the point of the exercise — I wanted to understand the structure, not call it. Persistence is a raw `f32` matrix plus a JSON
manifest, written atomically and mapped rather than read, so a cold start is a
`mmap` and not a parse. Embeddings come from MiniLM through ONNX Runtime at
int8; the default build ships a deterministic mock embedder so the tests need no
model at all.

It runs as a library, a CLI, or a long-lived stdio daemon designed to be driven
from a TypeScript `spawn` — which is how the agent tooling actually uses it.
