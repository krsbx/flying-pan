# Renderer

Immediate-mode OpenGL 1.x renderer. Walks the `LayoutNode` tree once per frame, issuing `glBegin/glEnd` draw calls. No VBOs or batching yet — this is the ceiling on throughput.

## Renderer class (`src/flying/renderer/renderer/index.ts`)

Owns GL state for one window. Created per-window.

### Initialization (`init()`)
- `glViewport()` — map framebuffer to screen
- 2D orthographic projection — **web-style coords**: `(0,0)` top-left, y-down, units = pixels
- `glEnable(GL_BLEND)` + `glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)` — standard alpha blend
- Modelview matrix for transforms

### Per-frame methods
- `clear(window, bgColor)` — clear to background color
- `flush(window)` — swap buffers (`glfwSwapBuffers`)
- `resize()` — re-init viewport on window resize

### Stacks
- **Clip stack** (`clipStack: Rect[]`) — `pushClip()` intersects with current scissor and applies `glScissor`; `popClip()` restores (or disables when empty). Coordinates converted screen→GL scissor in `applyScissor()`. **Callers pass screen-space rects** (from `LayoutNode.screenX/screenY`) — `glScissor` is absolute screen-space, not affected by `glTranslatef`, so clip rects must already account for scroll.
- **Translate stack** — `pushTranslate(x,y)` = `glPushMatrix` + `glTranslatef`; `popTranslate()` = `glPopMatrix`. Used for scroll offset. This only affects drawing commands (rects, arcs, text) — not `glScissor`.

### Generic GL matrix methods
Alongside the scroll-specific `pushTranslate`/`popTranslate`, the renderer exposes five thin matrix primitives (used by `CanvasContext` and any painter needing transforms):
- `pushMatrix(window)` / `popMatrix(window)` — `glPushMatrix` / `glPopMatrix` (flushes the batch first when batching is on)
- `translate(window, { x, y })` — `glTranslatef`
- `rotate(window, angleRadians)` — converts to degrees and calls `glRotatef({ angle, x: 0, y: 0, z: 1 })` (Z-axis rotation)
- `scale(window, { x, y })` — `glScalef`

All follow the same `wrap(window, ...)` pattern as the other renderer methods and flush the batch before issuing GL state calls.

## Paint pipeline (`src/flying/renderer/paint/index.ts`)

`paint(window, { renderer, ctx, layout })` walks the tree recursively:

```
for each LayoutNode:
  1. Resolve pseudo-state flags from interactionManager
       hovered = pointer.hoveredStableId === stableId
       focused = focus.focusedStableId === stableId
       pressed = pointer.pressedStableId === stableId
       checked = resolveWidgetCheckedState(...)
       disabled = Boolean(widget.props.disabled)
  2. resolveStyle() — merge base + _hover/_focus/_active/_checked/_disabled
  3. applyOverlay() — if transition: animationManager interpolates
  4. paintShadow(), paintBorder(), paintBackground()
  5. Widget-specific paint (switch on type)
  6. Recurse children (with clip + translate for overflow/scroll)
     - **Clip rect** uses `layout.screenX/screenY` (screen-space) so `glScissor` lands correctly even when nested inside scrollables
     - **Translate** applies `-scrollOffset` to the modelview matrix so child drawing commands shift up by the scroll amount
```

### Widget paint dispatch

| Widget | Painter | File |
|---|---|---|
| View / Flex / Button / List | (children only, no body) | `paint/index.ts` |
| Label | `paintText()` | `paint/text/index.ts` |
| Image | `paintImage()` | `paint/image/index.ts` |
| TextInput | `paintTextInput()` | `paint/text/input.ts` |
| Checkbox | `paintCheckbox()` | `paint/checkbox/index.ts` |
| Radio | `paintRadio()` | `paint/radio/index.ts` |
| Toggle | `paintToggle()` | `paint/toggle/index.ts` |
| SliderBar | `paintSlider()` | `paint/slider/bar.ts` |
| CircularSlider | `paintCircularSlider()` | `paint/slider/circular.ts` |
| RangeSlider | `paintRangeSlider()` | `paint/slider/range.ts` |
| ProgressBar | `paintProgressBar()` | `paint/progress/bar.ts` |
| CircularProgress | `paintCircularProgress()` | `paint/progress/circular.ts` |
| Meter | `paintMeter()` | `paint/meter/index.ts` |
| Custom | `paintCustom()` | `paint/custom.ts` — raw paint callback (user issues renderer calls directly) |
| Canvas | `paintCanvas()` | `paint/canvas.ts` — constructs `CanvasContext`, invokes user `draw(ctx)` |

## Drawing primitives (`src/flying/renderer/painters/`)

### Shapes (`painters/shape/`)
- `drawRect({ x, y, w, h, color, radius })` — dispatches to `drawRectGL` or `drawRoundedRectGL`
- `drawRoundedRectGL()` — rounded corners via arc fan
- `drawArc()` — pie slice from center
- `drawRing()` — arc band between inner/outer radii (used by CircularProgress, CircularSlider)
- `drawGradientRect()` — linear gradient via per-vertex color in `emitRectVertices()`
- `drawShadow()` — layered shadow (1–12 layers by blur radius); alpha = `baseAlpha * (1 - t)²`

### Low-level (`painters/shape/gl.ts`, `painters/drawer.ts`)
- `drawQuads()` — wraps `glBegin(GL_QUADS)` ... `glEnd()`
- `drawTriangles()` — wraps `glBegin(GL_TRIANGLES)` ... `glEnd()`
- Arc segmentation: `segments = max(16, ceil(radius * 1.5))`

### Text (`painters/text.ts`)
- `drawText()` — `GL_QUADS` with `glTexCoord2f` for UV + `glVertex2f` for position, one quad per glyph

### Texture (`painters/texture.ts`)
- `drawTexture()` — `glEnable(GL_TEXTURE_2D)` + bind + quad with UV `(0,0)→(1,1)`

### Tessellated geometry (`painters/shape/triangles.ts`)
- `drawTriangles({ triangles, color, opacity })` — `glBegin(GL_TRIANGLES)` walk over `TriangleList.positions` (flat `[x,y, x,y, ...]`). Used by `CanvasContext.fill`/`stroke` and the `Custom` widget for tessellated shapes. Works with both immediate-mode and batched `GLLike`.

## Color (`src/flying/renderer/color.ts`)

### `parseColor(str)`
- **Cache**: `Map<string, RGBA>`, 256 entries, clears on overflow
- **Formats**: `#RGB`, `#RRGGBB`, `#RRGGBBAA`, `rgb()`, `rgba()`, named colors
- Returns `{ red, green, blue, alpha }` normalized 0–1

### Color lerp (`src/flying/animation/interpolate.ts`)
`lerpRgba(from, to, t)` linearly interpolates each RGBA channel. Used by the animation system to interpolate `backgroundColor`/`borderColor`/`color` transitions.

## Font system (`src/flying/fonts/`)

### FontAtlas (`fonts/font-atlas.ts`, `fonts/base-font-atlas.ts`)
- **Bake** (`bakeFontBitmap()`) — load TTF via stb_truetype, bake ASCII 32–126 (95 glyphs) at given font size into a 512×512 RGBA atlas
- **Atlas upload** — `GL_RGBA` / `GL_UNSIGNED_BYTE`, `GL_LINEAR` filtering
- **Glyph metrics** — `stbtt_bakedchar` (x0/y0/x1/y1 atlas coords + xOff/yOff/xAdvance)

### measureText (`fonts/font-atlas.ts`)
- **Cache**: LRU, 512 entries, keyed by `text|fontSize|letterSpacing|lineHeight`
- Returns `{ width, height }` for multi-line text

### getQuads (`fonts/font-atlas.ts`)
- Calls `stbtt_GetBakedQuad()` per character
- Returns pooled `TextQuad[]` (screen coords + UV coords)
- **Pool** (`_quadPool: TextQuad[]`) reused across calls — zero allocation after first frame for static labels

## TextureManager (`src/flying/renderer/texture/manager/index.ts`)

- `load(src)` — `stbi_load()` decodes PNG/JPEG/etc to RGBA, `glTexImage2D()` uploads
- `info(src)` — `stbi_info()` for intrinsic dimensions (used by Image widget auto-sizing)
- **Caches**: `textures: Map<string, Texture>`, `infos: Map<string, ImageInfo>` — never evicted
- `get(src)` — cached or load

## PaintContext (`src/flying/renderer/paint/types.ts`)

Threaded through `paint()` and all painters:

```ts
interface PaintContext {
  fontManager: FontManager;
  interactionManager: InteractionManager;
  animationManager: AnimationManager;
  textureManager: TextureManager | null;
  getStableId: (widget) => number;
  stateStore: StateStore;
  layoutIndex: Map<number, LayoutNode>;
  focusableNodes: LayoutNode[];
}
```

Same context type is threaded through layout — populated during layout, consumed during paint.

## Style resolution (`src/flying/renderer/paint/utility.ts`)

`resolveStyle()` merges pseudo-states in order (later wins):

```
base → _hover → _focus → _active → _checked → _disabled
```

### Cache
- `WeakMap<ViewStyle, Map<mask, ViewStyle>>` — keyed by style ref + pseudo-state bitmask
- Mask: hover=1, focus=2, pressed=4, checked=8, disabled=16
- Allows GC when descriptors are rebuilt (declarative rebuild model)

`PseudoStateStyle` is restricted to **paint-consumed props only** (backgroundColor, borderColor, borderWidth, borderRadius, opacity, boxShadow, background). Layout/structural props excluded.

## Performance characteristics

- **parseColor cache** — 256-entry Map, clears on overflow
- **measureText cache** — 512-entry LRU
- **getQuads pool** — `TextQuad[]` reused, zero alloc after first frame
- **resolveStyle cache** — WeakMap keyed by descriptor ref, allows GC between frames
- **Reconciler map** — `.clear()` per pass, not `new Map()`
- **Immediate-mode ceiling** — each rect/arc/text quad = separate `glBegin/glEnd`. VBO batching is the known long-term optimization.
- **Shadow cost** — 1–12 draw calls per shadow (blur-radius layers)

## Canvas 2D widget (`src/flying/renderer/context/canvas/`)

Browser-compatible Canvas 2D API layered on top of the GL renderer + tessellation pipeline. The `Canvas` widget factory (`src/flying/widget/canvas.ts`) takes a `draw(ctx)` callback; `paintCanvas` (`paint/canvas.ts`) wires it up each frame.

### Lifecycle per frame
1. `pushClip(widget bounds)` — canvas can't draw outside itself
2. `pushTranslate(layout.x, layout.y)` — ctx coords start at `(0,0)` = widget top-left
3. Construct a fresh `CanvasContext`
4. Invoke `props.draw({ ctx })` — user issues browser Canvas 2D calls
5. `popTranslate` + `popClip`

### `CanvasContext` class (`context/canvas/index.ts`)
Implements the familiar Canvas 2D surface. **Positional params are intentional** — the whole point is browser-API parity; changing signatures would defeat the goal. This is the documented exception to flying-pan's single-object-param convention.

**Style state (settable properties):** `fillStyle`, `strokeStyle`, `lineWidth`, `globalAlpha`, `font`, `fontSize`.

**Path building** — delegates to an internal `Path2D` instance, translating positional params to Path2D's single-object params:
- `beginPath`, `moveTo`, `lineTo`, `arc`, `arcTo`, `rect`, `quadraticCurveTo`, `bezierCurveTo`, `closePath`

**Fill:**
- `fill()` — `tessellatePath(path)` → `TriangleList` → `drawTriangles({ color: fillStyle })`
- `fillRect(x, y, w, h)` — `drawRect` shortcut (no path needed)
- `fillText(text, x, y)` — `drawText` with font atlas resolved from `fontManager`

**Stroke:**
- `strokeRect(x, y, w, h)` — four thin `drawRect` calls (top/bottom/left/right)
- `stroke()` — `flattenPath(path)` → polylines with open/closed state → miter-join offset geometry → 2 triangles per segment. Miter joins at interior vertices, butt caps on open-path endpoints, anti-parallel foldback fallback (bevel).

**Transforms** — multiply the current modelview matrix (no implicit push):
- `translate(x, y)`, `rotate(angleRadians)`, `scale(x, y)`

**State stack** — `save()` / `restore()`:
- `pushMatrix` / `popMatrix` for the GL transform
- Snapshot of all style properties (`CanvasStateNode` from `@flying/state/canvas`)

### Deferred (not yet implemented)
- `clip()` — currently only `glScissor` rect clipping is available via `pushClip`
- `clearRect()` — needs transparent-clear semantics
- `drawImage()` — needs texture-on-canvas API
- `createLinearGradient` / `createRadialGradient` — needs per-vertex color arrays on `TriangleList`
- `globalCompositeOperation` — needs GL blend mode switching
- `measureText()` — text measurement without rendering
- `setTransform` / `transform` / `resetTransform` — can be added via `glMultMatrixf`
