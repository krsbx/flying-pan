# Animation

Style transitions for pseudo-state changes. When a widget starts or stops being hovered/focused/pressed, the `AnimationManager` interpolates the animated properties over `duration` with an easing curve.

## AnimationManager (`src/flying/animation/manager/index.ts`)

Per-app singleton. Owned by `AppManager`, threaded through paint via `PaintContext.animationManager`.

### State
```ts
active: Map<key, Map<property, ActiveTransition>>  // in-flight transitions
lastValue: Map<key, Map<property, string|number>>  // last displayed value
_time: number                                       // current clock (ms)
```

**Composite key**: `key = subKey ? \`${stableId}:${subKey}\` : \`${stableId}\``. This lets sub-styles animate independently — e.g. `"42"` for a Checkbox's base style and `"42:tick"` for its tick sub-style, without collision.

### `tick()`
```ts
this._time = performance.now();
this.cull();  // drop completed transitions
```
Called once per frame, before paint. The clock is `performance.now()` for precision.

## Transitions

### Configuration (`animation/types.ts`)
```ts
interface TransitionConfig {
  property?: AnimatableProperty | 'all';  // default 'all'
  duration: number;                        // ms
  easing?: EasingName;                     // default 'ease'
}
type Transition = TransitionConfig | TransitionConfig[];
```

### Animatable properties (`animation/constant.ts`)
`backgroundColor`, `borderColor`, `borderRadius`, `borderWidth`, `opacity`, `color`

These are the paint-consumed properties that can be interpolated. Structural/layout props are not animatable.

## `applyOverlay(stableId, resolved, transition, subKey?)`

Called from `paint/index.ts` after `resolveStyle()`:

```ts
const style = baseStyle.transition
  ? ctx.animationManager.applyOverlay(stableId, resolved, baseStyle.transition)
  : resolved;
```

Returns a new `ViewStyle` with animated property values for the current frame.

### Lifecycle per property

1. **First time seeing property** → snap to target (no animation). Record in `lastValue`.
2. **Value unchanged** → transition (if any) has completed; clean up.
3. **Value changed** → start new transition from current displayed value → new target.
4. **Advancing** → sample at `(now - startTime) / duration`, apply easing, interpolate, store as `lastValue`. Remove from `active` when progress ≥ 1.

## Easing (`animation/easing.ts`)

```ts
linear:       t => t
ease:         t => 1 - (1 - t)³      // cubic ease-out (default)
'ease-in':    t => t³                // cubic ease-in
'ease-out':   t => 1 - (1 - t)²      // quad ease-out
'ease-in-out': t < 0.5 ? 2t² : 1 - (-2t+2)²/2  // quad ease-in-out
```

## Interpolation (`animation/interpolate.ts`)

### Numbers
```ts
from + (to - from) * t
```

### Colors
```ts
lerpRgba(parseColor(from), parseColor(to), t)
// → 'rgba(r,g,b,a)'
```
Each RGBA channel (normalized 0–1) is linearly interpolated. Output is an `rgba()` string with integer RGB and float alpha. `parseColor` is cached (see [RENDERER.md](./RENDERER.md)).

## Triggering

Transitions are triggered by pseudo-state changes:

1. User hovers widget → `pointer.hoveredStableId === stableId`
2. `resolveStyle()` merges in `_hover` style → target values change
3. `applyOverlay()` detects the value change vs `lastValue`
4. Starts transition from current displayed value → new target
5. Subsequent frames: `tick()` advances clock, `applyOverlay()` samples and writes interpolated value
6. User moves cursor off → `resolveStyle()` returns base → reverse transition starts

No explicit `animate()` call — transitions emerge from style + interaction state.

## Sub-style animations

Composite keys (`stableId:subKey`) keep sub-style animations isolated:

| Sub-style | subKey | Example |
|---|---|---|
| Checkbox tick | `'tick'` | tick fades in/out on check |
| Radio dot | `'dot'` | dot color transition |
| Toggle knob | `'knob'` | knob slides (positional, not interpolated) |
| Slider track/filled/handle | `'track'` / `'filled'` / `'handle'` | color transitions on hover |

Each sub-style goes through `resolveStyle()` independently with the same pseudo-state flags, then through `applyOverlay()` with its own `subKey`.

## Cleanup

`destroy(stableId)` removes all entries for a stableId (both base `"42"` and any `"42:..."` sub-keys). Called by the reconciler on unmount to prevent leaks.

## Integration summary

```
paint(layoutNode):
  resolved = resolveStyle(base, hovered, focused, pressed, checked, disabled)
  if base.transition:
    style = animationManager.applyOverlay(stableId, resolved, base.transition)
  else:
    style = resolved
  // draw with `style`
```

- `tick()` happens once at the start of the frame (before paint walks the tree)
- `applyOverlay()` is called per-widget during paint, reads `_time` set by `tick()`
- First-time properties snap; subsequent changes animate
- Completion is implicit (progress ≥ 1 → entry culled)
