# Conventions

Project-wide patterns for flying-pan. Read this before editing.

## Path aliases (`tsconfig.json`)

```
@/*         → ./src/*
@cstruct    → ./src/utility/cstruct/index.ts
@cwstring   → ./src/utility/cwstring.ts
@basestruct → ./src/utility/base-struct.ts
@constant   → ./src/utility/constant.ts
@utility/*  → ./src/utility/*
@glfw       → ./src/library/glfw/index.ts
@miniaudio  → ./src/library/miniaudio/index.ts
@truetype   → ./src/library/truetype/index.ts
@image      → ./src/library/image/index.ts
```

Note: the GUI toolkit half uses `src/flying/...` paths directly (no alias). Aliases are primarily for the FFI/utility layers.

## Bun conventions

Default to Bun over Node:
- `bun <file>` instead of `node` / `ts-node`
- `bun test` instead of `jest` / `vitest`
- `bun install` instead of `npm install`
- `bun run <script>` instead of `npm run <script>`
- `bunx` instead of `npx`
- Bun auto-loads `.env` (no dotenv)
- `bun:ffi` for FFI — `dlopen`, `FFIType`, `CString`, `ptr`, `toArrayBuffer`

## Single object param

**All functions use a single options object parameter, never positional args.**

```ts
// YES
function paint(window: Window, options: PaintOptions): void
function layoutFlex(options: LayoutFlexOptions): LayoutNode
glfw.glfwCreateWindow({ width: 800, height: 600, title: 'App' })

// NO
function paint(window, x, y, width, height, ctx)
glfw.glfwCreateWindow(800, 600, 'App')
```

This applies to:
- Widget factories (`View({ children, style, onClick })`)
- Painters (`paintText({ gl, x, y, text, font, style, ctx })`)
- Layout (`layoutFlex({ node, x, y, availableWidth, availableHeight, ctx })`)
- Generated FFI wrappers (codegen emits single-object signatures)
- Event handlers (`onClick(event: ClickEvent)` where `event` carries `{ node, stateStore, ... }`)

## Fail loud

In render/FFI/stateful paths, prefer **crashes over defensive recovery**:
- No silent `try/finally` that swallows errors
- No `if (!x) return` guards that mask bugs
- Let undefined blow up — easier to find the real cause
- Validation belongs at system boundaries (user input, external APIs), not between trusted internal code

## File organization

### Widget factories (`src/flying/widget/`)
- One factory per file (`view.ts`, `label.ts`, `checkbox.ts`, ...)
- Complex widgets get a folder (`text-input/`, `slider/`, `progress/`)
- Each factory returns a `WidgetDescriptor` — pure function, no side effects
- Factories destructure known fields (handlers, style, children), spread `...rest` into `props`
- Re-exported from `src/flying/widget/index.ts`

### Widget-specific code
Layout and paint both use a **processor/painter per widget type**:
- Layout: `src/flying/layout/processor/layout/` — one file per widget needing custom layout (currently `list.ts` for virtualization). Dispatch via `widgetLevelLayoutFlex()` switch.
- Paint: `src/flying/renderer/paint/` — one file per widget type (`paint/checkbox/`, `paint/slider/`, ...). Dispatch via switch in `paint/index.ts`.

Adding a new widget = one factory file + (optionally) one layout processor + one paint file + one case in each dispatch switch.

### Generated bindings
`src/library/glfw/`, `src/library/miniaudio/`, `src/library/truetype/`, `src/library/image/` — **never hand-edit**. Regenerate via `bin/*.ts` scripts.

## Factory pattern

```ts
export function View(props: ViewProps): WidgetDescriptor {
  const { children, onClick, style, ...rest } = props
  return {
    type: WidgetType.View,
    props: rest,
    style,
    children,
    onClick,
    // ...other interaction handlers
  }
}
```

- Destructure known fields (handlers, style, children)
- Spread `...rest` into `props` for widget-specific data
- Seed sensible defaults from `Palette` / `Metrics`
- Interactive widgets seed `_disabled: { opacity: 0.5 }` and `_checked` (for boolean widgets)

## Style system

- `ViewStyle` for containers, `TextStyle extends ViewStyle` for text widgets
- Pseudo-states: `_hover`, `_focus`, `_active`, `_checked`, `_disabled` — restricted to paint-consumed props
- Sub-styles for composite widgets: `tickStyle`, `dotStyle`, `knobStyle`, `trackStyle`, `filledStyle`, `handleStyle`
- Colors: use `Palette.*` constants (`src/flying/widget/styles/palette.ts`), not raw hex

See [WIDGET-SYSTEM.md](./WIDGET-SYSTEM.md).

## Declarative rebuild model

- User rebuilds the widget tree each frame in `app.onFrame(() => { window.widget = build() })`
- Reconciler diffs prev vs next, preserves `stableId` and state
- Static subtrees should return the **same descriptor reference** across frames to hit the identity short-circuit (zero diffing cost)
- Identity keys off `stableId: number`, not object references — LayoutNodes are recreated each frame, stableIds persist

See [RECONCILER-STATE.md](./RECONCILER-STATE.md).

## Controlled vs uncontrolled

Stateful widgets accept both patterns:
- `value` / `checked` / `selected` → controlled (parent owns state)
- `defaultValue` / `defaultChecked` → uncontrolled (StateStore owns state)
- Both still fire `onChange(next)` for external listeners

See [RECONCILER-STATE.md](./RECONCILER-STATE.md).

## Naming

- Files: `kebab-case.ts`
- Types/interfaces: PascalCase
- Functions: camelCase
- Factories: PascalCase matching the widget name (`View`, `Label`, `Checkbox`)
- Enums: PascalCase (`WidgetType`, `FlexDirection`, `Overflow`)
- Enum values: also PascalCase or string-literal form matching the web (`'row'`, `'column'`, `'scroll'`)

## Tests / dev entry

- `test.ts` — example app / dev entry point (run with `bun run test.ts`)
- `bun test` — test runner
- Linting/formatting via husky + lint-staged (ESLint + Prettier) on commit
