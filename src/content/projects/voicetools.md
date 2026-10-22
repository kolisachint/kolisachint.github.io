---
title: voicetools
tagline: For anyone who would rather talk than type in the terminal. It turns your microphone into text on your own machine, with nothing sent to the cloud.
lang: Rust
repo: https://github.com/kolisachint/voicetools
download: https://github.com/kolisachint/voicetools/releases
status: early
tags: ["asr", "onnx", "offline", "cli"]
featured: true
order: 4
---

It notices when you stop talking and prints what you said, in a format simple
enough to use as push-to-talk inside another tool. It works offline, on a train
too.

Recognition is Parakeet-TDT through ONNX Runtime at int8, with whisper.cpp as a
fallback. The models download on first run; no Python needed.
