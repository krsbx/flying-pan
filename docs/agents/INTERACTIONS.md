# Interactions

Input → dispatch → pseudo-state flags. The interaction system routes GLFW input events to widgets keyed by `stableId`, and tracks hover/focus/press/scroll state.

## Frame integration

```
layout → dispatch(layout, layoutIndex, focusableNodes) → paint → input.update()
```

Dispatch runs **after** layout (so it has the LayoutNode tree + layoutIndex) and **before** paint (so pseudo-states are current). `input.update()` swaps the double-buffered input state at end of frame.

## InputManager (`src/flying/app/input/`)

Bridge between GLFW callbacks and the interaction dispatchers. **Double-buffered** — current frame vs previous frame — so edge detection (just-pressed / just-released) works.

### InputState (`app/input/state.ts`)
```ts
{
  keys: Set<number>;            // currently held keys
  chars: number[];              // text input codepoints for this frame
  repeatedKeys: Set<number>;    // auto-repeat keys
  mouseButtons: Set<number>;    // held mouse buttons
  mousePosition: Coordinate2D;
  scrollDelta: Coordinate2D;    // accumulated for this frame
  modifiers: number;            // GLFW modifier bitmask (Shift/Ctrl/Alt)
}
```

### Double-buffering
- `_current` / `_previous`
- `update()` swaps them at end of frame (after dispatch has consumed current)

### Event sources
- `InputEvent.Key` → keyboard press/release/repeat
- `InputEvent.MousePress` → button events
- `InputEvent.CursorPosition` → mouse move
- `InputEvent.MouseScroll` → wheel delta
- `InputEvent.Char` → text input

### Query methods
- `isKeyDown(key)` / `isKeyPressed(key)` / `isKeyReleased(key)` / `isKeyRepeated(key)`
- `isMouseDown(button)` / `isButtonPressed(button)` / `isButtonReleased(button)`
- Pressed/Released = edge detection between current and previous buffers

## InteractionManager (`src/flying/interactions/dispatcher/manager.ts`)

Aggregator owning three dispatchers:

```ts
class InteractionManager {
  pointer: PointerDispatcher;
  focus: FocusDispatcher;
  scroll: ScrollDispatcher;

  dispatch(options) {
    this.pointer.dispatch(options);
    this.focus.dispatch(options);
    this.scroll.dispatch(options);
  }
}
```

### DispatchOptions
```ts
{
  window, layout, layoutIndex, focusableNodes,
  stateStore, treeChanged, time
}
```

## PointerDispatcher (`src/flying/interactions/dispatcher/pointer/`)

Routes pointer events and tracks hover/press state.

### State
- `_hoveredStableId` — widget under cursor
- `_pressedStableId` — widget that received `onPointerDown`
- `_pressedButton` — button that initiated the press
- `_capturedStableId` / `_capturedButton` — pointer capture target
- `lastClick` — for double-click detection

### Dispatch flow
1. **Hit test** — recursive Z-order search (children first, reverse order), respecting `pointerEvents: 'none'`. Returns deepest node under cursor. (`interactions/utility/hit-test.ts`)
2. **Hover enter/leave** — if `hitId !== _hoveredStableId`: fire `onPointerLeave` on old, `onPointerEnter` on new. Also cancels press when dragging off widget.
3. **Pointer move** — route to captured widget if any, else hit target. Only fires if position changed.
4. **Button events** — on press: fire `onPointerDown`, set `_pressedStableId`. On release: fire `onPointerUp`, then click detection (same widget + same button for down+up → `onClick`).

### Pointer capture
- Widget calls `capturePointer()` from within `onPointerDown`
- Subsequent move/up events route to captured widget, ignoring hit test
- Implicitly released on button-up
- Used by sliders/drag gestures

## FocusDispatcher (`src/flying/interactions/dispatcher/focus/`)

Tab navigation + keyboard event routing.

### Focusable widget types
Button, Checkbox, Radio, Toggle (also any widget with `focusable: true` in style). Collected into `focusableNodes[]` during layout.

### State
- `_focusedStableId` — currently focused widget
- `_pendingFocusWidget` / `_pendingBlur` — deferred focus/blur requests (applied next dispatch)
- `focusableNodes: LayoutNode[]` — tab order

### Dispatch flow
1. **Validate current focus** — blur if widget unmounted or no longer focusable
2. **Apply pending** — execute deferred `focus(widget)` / `blur()` calls
3. **Tab cycling** — Tab = next (wraps to start), Shift+Tab = previous (wraps to end). Tab is never forwarded to widgets.
4. **Click-to-focus** — hit test under cursor, find nearest focusable ancestor, move focus. Clicking non-focusable space blurs.
5. **Key routing** — `onKeyDown` / `onKeyUp` / `onChar` routed to focused widget. Enter/Space activate Buttons.

### Focus movement
- Blur old: fire `onBlur` with `{ relatedTarget }`
- Focus new: fire `onFocus` with `{ relatedTarget }`

## ScrollDispatcher (`src/flying/interactions/dispatcher/scroll/`)

Scroll offset storage + momentum physics.

### Storage
- `offsets: Map<stableId, Coordinate2D>` — scroll offset per scrollable widget
- `velocities: Map<stableId, Coordinate2D>` — for momentum
- `offset(layoutNode)` — returns stored offset, or `{x:0, y:0}` if none

### Physics constants
- `VELOCITY_ALPHA = 0.35` — EMA coefficient for velocity tracking
- `FRICTION = 0.97` — per-frame velocity decay
- `VELOCITY_THRESHOLD = 0.3` — stop threshold
- `FRAME_MS = 1000/60` — framerate normalization baseline

### Dispatch flow
1. **Framerate normalization** — `dtNorm = clamp((time - lastTime) / FRAME_MS, 0, 4)`
2. **Cleanup orphan offsets** — if tree changed, drop offsets for unmounted widgets
3. **Active scroll or coast** — if scroll delta input: `handleActiveScroll`; else `coast`

### Active scroll
```
target = nearestScrollableAncestor(layout, hit)
{ contentWidth, contentHeight } = measureContent(target)
maxScrollX = max(0, contentWidth - target.width)
maxScrollY = max(0, contentHeight - target.height)
offset += scrollDelta, clamped to [0, max]
update velocity via EMA; zero on clamped axis
```

### Coasting (momentum)
```
friction = FRICTION ** dtNorm
vel *= friction
stop when |vel| < VELOCITY_THRESHOLD
```

### measureContent(node)
Walks descendants of `node`, finds bounding box of all laid-out children → `{ contentWidth, contentHeight }`. This is what makes virtualized Lists work: the trailing spacer's edge sits at `itemCount * itemSize`, so the total content extent is correct.

### Scrollable detection
`overflow === 'scroll' || overflow === 'auto'`

## Pseudo-state flags → paint

Dispatch updates `pointer.hoveredStableId`, `focus.focusedStableId`, `pointer.pressedStableId` on the interaction manager. Paint reads these to resolve pseudo-states:

```ts
hovered = ctx.interactionManager.pointer.hoveredStableId === stableId
focused = ctx.interactionManager.focus.focusedStableId === stableId
pressed = ctx.interactionManager.pointer.pressedStableId === stableId
```

`checked` comes from widget state (controlled prop or StateStore). `disabled` from `widget.props.disabled`. See [RENDERER.md](./RENDERER.md) for resolution order.
