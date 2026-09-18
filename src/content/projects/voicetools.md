---
title: voicetools
tagline: Offline voice-to-text for the terminal. Microphone to stdout, no cloud.
lang: Rust
repo: https://github.com/kolisachint/voicetools
status: early
tags: ["asr", "onnx", "offline", "cli"]
featured: true
order: 4
---

A small Rust binary that opens the microphone, notices when you have stopped
talking, and streams recognised text on stdout in a line protocol simple enough
to drop into a TUI as push-to-talk. Nothing leaves the machine — which is the
reason it exists, and also why it works on a train.

Recognition is Parakeet-TDT through ONNX Runtime at int8, with whisper.cpp
available as a fallback backend. Models are pre-exported and fetched on first
run, so there is no Python and no NeMo in the install path.

One finding worth writing down: the ONNX sessions run single-threaded on
purpose. Multi-threaded int8 inference is non-deterministic, and the greedy
decode responds by dropping or garbling words. Correctness first, then speed.
