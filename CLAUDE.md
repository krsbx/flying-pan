# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**flying-pan** is a retained-mode GUI toolkit built on Bun's `bun:ffi` API, with two halves:

1. **FFI Codegen** (`src/ffi/`, `src/library/`) — Parses Clang AST JSON and generates type-safe TypeScript bindings for GLFW, miniaudio, stb_truetype, and stb_image.
2. **GUI Toolkit** (`src/flying/`) — Widgets, flexbox layout, GL renderer, interactions, animation.

## Architecture docs

**Read [`docs/agents/`](./docs/agents/) first** — it is the authoritative, current-implementation reference. Each subsystem has its own file; load the relevant subset instead of crawling the codebase.

| Doc | Covers |
|---|---|
| [docs/agents/OVERVIEW.md](./docs/agents/OVERVIEW.md) | Architecture summary, directory map, frame loop, design decisions |
| [docs/agents/APP-LIFECYCLE.md](./docs/agents/APP-LIFECYCLE.md) | App class, run loop, AppManager wiring, window management |
| [docs/agents/WIDGET-SYSTEM.md](./docs/agents/WIDGET-SYSTEM.md) | WidgetDescriptor, factories, ViewStyle, pseudo-states, Palette |
| [docs/agents/LAYOUT.md](./docs/agents/LAYOUT.md) | Flexbox engine, measurement, processor pattern, virtualization, content-fit |
| [docs/agents/RENDERER.md](./docs/agents/RENDERER.md) | GL renderer, paint pipeline, drawing primitives, fonts, textures, color |
| [docs/agents/INTERACTIONS.md](./docs/agents/INTERACTIONS.md) | Input, pointer/focus/scroll dispatchers, momentum physics |
| [docs/agents/RECONCILER-STATE.md](./docs/agents/RECONCILER-STATE.md) | Reconciler, stableId, lifecycle hooks, StateStore, controlled/uncontrolled |
| [docs/agents/ANIMATION.md](./docs/agents/ANIMATION.md) | AnimationManager, transitions, easing, interpolation |
| [docs/agents/FFI-CODEGEN.md](./docs/agents/FFI-CODEGEN.md) | Clang AST parser, code generator, struct utilities, build scripts |
| [docs/agents/CONVENTIONS.md](./docs/agents/CONVENTIONS.md) | Path aliases, Bun conventions, single-object-param, fail-loud, factory pattern |

Additional history/planning docs live in [`docs/`](./docs/) (e.g. `PHASE3.md`, `PHASE4.md`, `VIRTUALIZATION.md`).

## Commands

```bash
bun install                  # Install dependencies
bun run build:glfw           # Regenerate GLFW bindings (bin/glfw.ts)
bun run build:miniaudio      # Regenerate miniaudio bindings
bun run build:truetype       # Regenerate stb_truetype bindings
bun run build:image          # Regenerate stb_image bindings
bun test                     # Run tests
bun run test.ts              # Run example app / dev entry point
```

Linting/formatting runs via husky + lint-staged on commit (ESLint + Prettier).

Generated bindings under `src/library/` are output of the codegen — **do not hand-edit**; regenerate via the build scripts above.
