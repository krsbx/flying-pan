# Widget System

## WidgetDescriptor (`src/flying/widget/styles/types.ts`)

The core data structure. Every widget is a plain object — no classes, no instances.

```ts
interface WidgetDescriptor extends InteractionProps {
  type: WidgetType;           // string enum — drives paint + layout dispatch
  props: WidgetProps;         // Record<string, unknown> — widget-specific data
  style?: ViewStyle;          // box model, flexbox, visual, interaction properties
  children?: WidgetDescriptor[];
  key?: string | number;      // for reconciler key-based matching across frames
  _virtualStableId?: number;  // synthetic stableId for virtual list items (layout-assigned)
}
```

`InteractionProps` adds: `onPointerDown`, `onPointerUp`, `onPointerMove`, `onClick`, `onPointerEnter`, `onPointerLeave`, `onKeyDown`, `onKeyUp`, `onFocus`, `onBlur`, `onMount`, `onUnmount`, `onUpdate`.

## WidgetType enum (`src/flying/widget/constant.ts`)

```
View, Flex, Label, Button, Image, TextInput,
Checkbox, Radio, Toggle,
ProgressBar, CircularProgress,
SliderBar, CircularSlider, RangeSlider,
Meter, List
```

## Factory pattern

All widgets are created via factory functions that return `WidgetDescriptor`. Pure functions, no side effects.

```ts
function View(props: ViewProps): WidgetDescriptor {
  const { children, onClick, style, ...rest } = props;
  return {
    type: WidgetType.View,
    props: rest,
    style,
    children,
    onClick,
    // ... all interaction handlers
  };
}
```

**Convention**: Destructure known fields (handlers, style, children), spread `...rest` into `props` for widget-specific data. All factories follow this shape.

### Factories (`src/flying/widget/`)

| Factory | File | Notes |
|---|---|---|
| `View` | `view.ts` | Plain container, no visual defaults |
| `Flex` | `flex.ts` | Container with `direction`, `gap`, `wrap` |
| `Label` | `label.ts` | Text display, `font`, `text` |
| `Button` | `button.ts` | Wraps children, `onClick`, `focusable: true` default |
| `Image` | `image.ts` | `src` path, auto-sizes from intrinsic dimensions |
| `TextInput` | `text-input/index.ts` | Full browser-parity: typing, caret, selection, clipboard |
| `Checkbox` | `checkbox.ts` | Boolean state, `tickStyle`/`tickSize` sub-styles |
| `Radio` | `radio.ts` | Group via `RadioGroup`, `dotStyle`/`dotSize` sub-styles |
| `RadioGroup` | `radio-group.ts` | Controlled/uncontrolled via name-keyed state |
| `Toggle` | `toggle.ts` | Pill + knob, `knobStyle` sub-style |
| `ProgressBar` | `progress/bar.ts` | Linear, `orientation`, `colorStops`, `buffer`, indeterminate |
| `CircularProgress` | `progress/circular.ts` | Pie (`thickness >= 1`) or ring (`thickness < 1`) |
| `SliderBar` | `slider/bar.ts` | Linear slider, `colorStops`, `marks`, handle-vs-track press |
| `CircularSlider` | `slider/circular.ts` | Rotary knob/dial |
| `RangeSlider` | `slider/range.ts` | Dual-handle `[start, end]` range |
| `Meter` | `meter.ts` | Read-only gauge with `low`/`high`/`optimum` zones |
| `List` | `list.ts` | Virtualized list — `itemCount`, `itemSize`, `renderItem` |

## Style system (`src/flying/widget/styles/`)

### ViewStyle (`styles/types.ts`)

```ts
interface ViewStyle {
  // Box model
  width?, height?: SizeInput;       // number (px) or string ('100%', '2em')
  padding?, margin?: SpacingInput;  // number | { top, right, bottom, left }
  minWidth?, maxWidth?, minHeight?, maxHeight?;

  // Flexbox
  flexDirection?: FlexDirection;     // 'row' | 'column'
  flexWrap?: FlexWrap;              // 'nowrap' | 'wrap'
  gap?: SizeInput;
  flex?, flexShrink?;
  alignItems?: FlexAlign;           // 'flex-start' | 'center' | 'stretch' | ...
  justifyContent?: FlexJustify;     // 'flex-start' | 'space-between' | ...
  position?: Position;              // 'relative' | 'absolute'

  // Visual
  backgroundColor?: ValidColor;
  background?: LinearGradient;
  borderColor?: ValidColor;
  borderWidth?: number;
  borderRadius?: number;
  opacity?: number;
  boxShadow?: BoxShadow | BoxShadow[];
  overflow?: Overflow;              // 'visible' | 'hidden' | 'scroll' | 'auto'

  // Interaction
  focusable?: boolean;
  pointerEvents?: PointerEvents;    // 'auto' | 'none'

  // Pseudo-state overrides
  _hover?: PseudoStateStyle;
  _focus?: PseudoStateStyle;
  _active?: PseudoStateStyle;
  _checked?: PseudoStateStyle;
  _disabled?: PseudoStateStyle;

  // Animation
  transition?: Transition;          // { property, duration, easing }
}
```

### Pseudo-state precedence

`resolveStyle()` merges in this order (later wins):
```
base → _hover → _focus → _active → _checked → _disabled
```

`PseudoStateStyle` is restricted to paint-consumed props only: `backgroundColor`, `borderColor`, `borderWidth`, `borderRadius`, `opacity`, `boxShadow`, `background`. Layout/structural props are excluded.

### TextStyle extends ViewStyle

Adds: `color`, `fontSize`, `fontFamily`, `letterSpacing`, `lineHeight`, `textAlign`. `TextPseudoStateStyle` extends `PseudoStateStyle` adding `color`, `letterSpacing`, `lineHeight`.

### Palette + Metrics (`src/flying/widget/styles/palette.ts`)

Centralized Tailwind-flavored defaults. Factories seed sensible defaults:
- `Palette.accent`, `Palette.surface`, `Palette.textOnAccent`, `Palette.success/warning/error`
- `Metrics` for spacing/sizing constants

Every interactive widget seeds `_disabled: { opacity: 0.5 }` and `_checked` (for boolean widgets).

## Controlled vs. uncontrolled

Stateful widgets accept either:
- `value` / `checked` / `selected` (controlled) — parent manages state, widget fires `onChange`
- `defaultValue` / `defaultChecked` (uncontrolled) — widget manages state via `StateStore`

Mirrors React's contract exactly. See [RECONCILER-STATE.md](./RECONCILER-STATE.md).

## Sub-style objects

Complex widgets expose typed sub-styles for their parts:
- Checkbox: `tickStyle?: ViewStyle`, `tickSize?: number`
- Radio: `dotStyle?: ViewStyle`, `dotSize?: number`
- Toggle: `knobStyle?: ViewStyle`
- Slider: `trackStyle`, `filledStyle`, `handleStyle`

Sub-styles go through `resolveStyle()` independently with the same pseudo-state flags. Composite animation keys (`"42:tick"` vs `"42"`) prevent collision.
