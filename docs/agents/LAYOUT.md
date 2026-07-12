# Layout Engine

## Overview

CSS-like flexbox engine. Takes a `WidgetDescriptor` tree → produces a `LayoutNode` tree with `{ x, y, width, height }` per node. Runs once per frame per window.

## LayoutNode (`src/flying/layout/types.ts`)

```ts
interface LayoutNode extends Coordinate2D, Size {
  stableId: number;             // assigned by reconciler, persists across frames
  widget: WidgetDescriptor;     // back-reference to source descriptor
  children: LayoutNode[];       // mutable (virtual list expansion adds/removes)
}
```

## layoutFlex (`src/flying/layout/layout.ts`)

The core recursive function. Called with `{ node, x, y, availableWidth, availableHeight, ctx }`.

### Pipeline

1. **Resolve dimensions** — `resolveSize(style.width, availableWidth)` handles `'100%'`, `'2em'`, numbers. Track `hasExplicitWidth`/`hasExplicitHeight`.
2. **Compute content box** — subtract padding from resolved dimensions.
3. **Create + register LayoutNode** — pre-order registration in `ctx.layoutIndex` (stableId → node). Push to `ctx.focusableNodes` if `focusable: true`.
4. **Widget-level processing** — `widgetLevelLayoutFlex()` dispatches to widget-specific processors (currently: List virtualization). See [Processor pattern](#processor-pattern).
5. **Early return** if no children.
6. **Measure children** — `measureChildsComponent()` measures each child, partitions into `flow[]` (normal) and `absolute[]` (positioned). Also accumulates `maxH/sumH/maxW/sumW` for content-fit.
7. **Content-fit** — if container lacks explicit dimensions, size to content. Cross-axis = max child; main-axis = sum + gaps.
8. **Lay out flow children** — `layoutSingleLine()` or `layoutWrap()` positions children along main axis, aligns on cross axis, distributes flex shrink.
9. **Position absolute children** — `positionAbsolute()` uses `position: 'absolute'` style.

### Size resolution (`resolveSize`)

```
number        → pixels
'100%'        → percentage of available (parent content) size
'2em'/'2rem'  → em * ROOT_FONT_SIZE (16)
undefined     → 0 (falls back to available for content-fit)
```

## Measurement (`src/flying/layout/measurement.ts`)

`measureChildsComponent()` iterates children once and produces:
- `flow: ChildMeasurements[]` — relative-positioned children with `{ width, height, flex, flexShrink, margin }`
- `absolute: ChildMeasurements[]` — absolute-positioned children
- `maxH, sumH, maxW, sumW` — for content-fit (no extra iteration)

Each child's size is resolved via the **layout resolver** (`src/flying/layout/resolver/`) which has per-widget measurement:
- **Label** — measures text via `fontManager.atlas.measureText()`
- **Image** — intrinsic dimensions via `textureManager.info(src)`
- **ProgressBar/CircularProgress** — label measurement + square-fit
- **Default** — from `style.width`/`style.height`

## Flow positioning (`src/flying/layout/flow.ts`)

`positionFlowChildren()` lays out children along the main axis:
- Advances `mainPos` using **actual laid-out child dimensions** (from recursive `layoutFlex` return), not pre-layout measurements
- Applies `justifyContent` (start, center, end, space-between, space-around, space-evenly)
- Applies `alignItems` on cross axis (start, center, end, stretch, baseline)
- Handles `flex` grow and `flexShrink` distribution

## Wrap (`src/flying/layout/wrap.ts`)

`FlexWrap.Wrap` breaks children into multiple lines when they exceed the main axis. Each line is measured and positioned with cross-axis gap.

## Processor pattern (`src/flying/layout/processor/`)

Widget-specific layout logic, decoupled from `layoutFlex`:

```
processor/
  index.ts              → re-exports
  layout/
    index.ts            → widgetLevelLayoutFlex() — switch on node.type
    types.ts            → WidgetLevelLayoutFlexOptions
    list.ts             → listLayoutFlex() — virtual children generation
```

`layoutFlex` calls `widgetLevelLayoutFlex()` after registering the layoutNode, before measuring children. Adding a new widget-specific layout processor = one `case` in the switch + one file.

## Virtualization (List widget)

`listLayoutFlex()` generates only visible children:

1. Read scroll offset from **previous frame**: `ctx.interactionManager.scroll.offset(layoutNode)`
2. Calculate visible range: `firstVisible = floor(scrollPos / itemSize) - overscan`, `lastVisible = ceil((scrollPos + viewport) / itemSize) + overscan`
3. Generate virtual children:
   - Leading spacer (View with height/width = `firstVisible * itemSize`)
   - Visible items via `renderItem(i)`
   - Trailing spacer (View with remaining space)
4. Set `node.children = virtualChildren`
5. Spacers make `measureContent()` report correct total content size for scroll bounds

**Horizontal vs. vertical**: `orientation` prop swaps scroll axis (X/Y), viewport dimension (contentWidth/contentHeight), spacer dimension (width/height), and flexDirection (Row/Column).

**Synthetic stableIds**: Virtual children are generated after reconcile, invisible to the reconciler. Each gets `_virtualStableId = -(listStableId * 100_001 + slot + 1)`. Negative range avoids collision with reconciler IDs. Same item index → same stableId across frames.

See [docs/VIRTUALIZATION.md](../VIRTUALIZATION.md) for full details.

## Content-fit layout

Flex containers without explicit `width`/`height` size to their content (max child for cross-axis, sum+gaps for main-axis). Folded into the existing `measureChildsComponent` loop — zero extra iteration.

`positionFlowChildren` uses actual laid-out child dimensions (from recursive `layoutFlex` return) for advancing `mainPos`, not pre-layout measurements. This ensures siblings after a content-fitted container are spaced correctly.

## Performance characteristics

- **Tree walks per frame**: 3 irreducible (reconcile diffs, layout computes geometry, paint draws). Previously 5; `buildLayoutIndex` and `collectFocusable` were folded into `layoutFlex`.
- **parseColor cache**: 256-entry Map, cleared on overflow
- **measureText cache**: 512-entry LRU keyed by `text|fontSize|letterSpacing|lineHeight`
- **getQuads pooling**: `TextQuad[]` pool, zero allocation after first frame for static labels
- **Reconciler map**: `.clear()` per pass, not `new Map()`
