# Architecture Overview

flying-pan is a **retained-mode GUI toolkit** built on Bun's `bun:ffi` API. It generates TypeScript FFI bindings from Clang AST dumps, and uses those bindings to drive GLFW (windowing), OpenGL (rendering), stb_truetype (fonts), stb_image (textures), and miniaudio (audio).

## Two halves

1. **FFI Codegen** (`src/ffi/`, `src/library/`) — Parses Clang AST JSON and generates type-safe TypeScript bindings. See [FFI-CODEGEN.md](./FFI-CODEGEN.md).

2. **GUI Toolkit** (`src/flying/`) — The actual UI framework: widgets, layout, rendering, interactions, animation. This is the larger half. See the subsystem docs below.

## Directory structure

```
src/
  ffi/              # Clang AST parser + code generator
  library/          # Generated bindings (do not hand-edit)
    glfw/           # GLFW bindings (windowing)
    miniaudio/      # miniaudio bindings (audio)
    truetype/       # stb_truetype bindings (fonts)
    image/          # stb_image bindings (textures)
  utility/          # BaseStruct, CStruct, CWideString, helpers
  flying/           # The GUI toolkit
    app/            # App class, run loop, window/input/font/audio managers
    widget/         # Widget factories, style types, constants
    layout/         # Flexbox engine, measurement, processor/ (virtualization)
    renderer/       # GL renderer, paint pipeline, textures, fonts
      painters/     # Low-level draw primitives (drawRect, drawTriangles, ...)
      paint/        # Per-widget paint dispatch (paintText, paintCanvas, ...)
      context/      # CanvasContext — browser Canvas 2D API on top of the GL renderer
    tessellation/   # Path2D, curve flattening, earclip triangulation (shared by Canvas 2D + future SVG)
    interactions/   # Pointer, focus, scroll dispatchers
    reconcile/      # Reconciler (diffs widget trees across frames)
    animation/      # AnimationManager (transitions, easing)
    state/          # StateStore (widget-local state by stableId) + CanvasStateNode
    fonts/          # FontAtlas (stb_truetype baking + measuring)
    types.ts        # Shared types (Coordinate2D, Size, Resolution)
ffi/                # Pre-built .dylib files (gitignored at root)
bin/                # Build scripts (regenerate bindings)
docs/               # Documentation
test.ts             # Example app / dev entry point
```

## Frame loop (60fps)

```
App.run() while loop:
  clear(window, bgColor)
  reconcile(window.widget)           # diff prev vs next, assign stableIds
  animation.tick()                    # advance transition clock
  layoutFlex(widget → LayoutNode)    # geometry + layoutIndex + focusableNodes + screenX/screenY
  interaction.dispatch(layout)        # pointer/focus/scroll routing (uses screenX/screenY)
  paint(layout)                       # GL draw calls
  onFrame callback                    # user rebuilds widget tree
  flush()                             # swap buffers
  input.update()                      # swap double-buffered input state
  glfwPollEvents()
  cleanUp()                           # destroy windows flagged for close
  await yield()                       # setImmediate — unblocks JS event loop
```

## Subsystem docs

| Doc | Covers |
|---|---|
| [APP-LIFECYCLE.md](./APP-LIFECYCLE.md) | App class, run loop, window management, multi-window |
| [WIDGET-SYSTEM.md](./WIDGET-SYSTEM.md) | WidgetDescriptor, factories, style types, pseudo-states |
| [LAYOUT.md](./LAYOUT.md) | Flexbox engine, measurement, content-fit, processor pattern, virtualization |
| [RENDERER.md](./RENDERER.md) | GL renderer, paint pipeline, fonts, textures, color |
| [INTERACTIONS.md](./INTERACTIONS.md) | Input, pointer/focus/scroll dispatchers, event types |
| [RECONCILER-STATE.md](./RECONCILER-STATE.md) | Reconciler, stableId, StateStore, lifecycle hooks |
| [ANIMATION.md](./ANIMATION.md) | AnimationManager, transitions, easing, interpolation |
| [FFI-CODEGEN.md](./FFI-CODEGEN.md) | Clang AST parser, code generator, struct utilities |
| [CONVENTIONS.md](./CONVENTIONS.md) | Path aliases, Bun conventions, patterns |

## Key design decisions

- **Declarative rebuild model** — The user rebuilds the widget tree each frame in `onFrame`. The reconciler diffs prev vs next and preserves stableIds/state. No virtual DOM diffing overhead on static subtrees (descriptor identity short-circuits reconcile).
- **Identity by stableId, not reference** — Hover, focus, scroll, state all key off `stableId: number` assigned by the reconciler. LayoutNodes are recreated each frame; stableIds persist.
- **Immediate-mode OpenGL** — No VBOs or batching (yet). Each rect/arc/text quad is a separate `glBegin/glEnd` call. This is the ceiling on renderer throughput; VBO batching is a known long-term item.
- **Single-object params** — All functions use a single options object parameter, never positional args. **Exception:** web-compatibility adapter layers (e.g. `CanvasContext`) intentionally use positional params to match the browser API exactly — the whole point is familiarity.
- **Tessellation is pure geometry** — `Path2D` → flatten → earclip → `TriangleList` is pure TS with no GL imports. Multiple consumers (Canvas 2D `fill`, future SVG widget) feed the same `TriangleList` into GL via `drawTriangles`.
- **Fail loud** — In render/FFI/stateful paths, prefer crashes over defensive recovery.
