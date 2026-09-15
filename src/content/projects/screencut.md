---
title: screencut
tagline: Turns a raw screen recording into a publishable video. AI-edited, not AI-generated.
lang: Python
repo: https://github.com/kolisachint/screencut
status: active
tags: ["video", "pipeline", "editing"]
featured: true
order: 9
---

A pipeline that takes a raw screen recording and produces something publishable:
narrated, captioned, auto-zoomed, reframed for several aspect ratios, with a
review loop that captures corrections as structured diffs rather than as notes
someone has to re-apply by hand.

The constraint is the design. Every frame is captured from the real recording.
The model's job is an editor's job — decide what to cut, where to look, what to
emphasise, what to call the thing. There is no image model, no video model and
no B-roll generator anywhere in it, and adding one would replace the design
rather than extend it.
