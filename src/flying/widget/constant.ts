export const FlexJustify = {
  Start: 'flex-start',
  End: 'flex-end',
  Center: 'center',
  SpaceBetween: 'space-between',
  SpaceAround: 'space-around',
  SpaceEvenly: 'space-evenly',
} as const;

export type FlexJustify = (typeof FlexJustify)[keyof typeof FlexJustify];

export const FlexAlign = {
  Start: 'flex-start',
  End: 'flex-end',
  Center: 'center',
  Stretch: 'stretch',
  Baseline: 'baseline',
} as const;

export type FlexAlign = (typeof FlexAlign)[keyof typeof FlexAlign];

export const TextAlign = {
  Left: 'left',
  Center: 'center',
  Right: 'right',
} as const;

export type TextAlign = (typeof TextAlign)[keyof typeof TextAlign];

export const Position = {
  Relative: 'relative',
  Absolute: 'absolute',
} as const;

export type Position = (typeof Position)[keyof typeof Position];

export const FlexDirection = {
  Row: 'row',
  Column: 'column',
} as const;

export type FlexDirection = (typeof FlexDirection)[keyof typeof FlexDirection];

export const FlexWrap = {
  NoWrap: 'nowrap',
  Wrap: 'wrap',
} as const;

export type FlexWrap = (typeof FlexWrap)[keyof typeof FlexWrap];

export const WidgetType = {
  View: 'View',
  Flex: 'Flex',
  Label: 'Label',
  Button: 'Button',
  Image: 'Image',
  TextInput: 'TextInput',
  Checkbox: 'Checkbox',
  Radio: 'Radio',
  Toggle: 'Toggle',
} as const;

export type WidgetType = (typeof WidgetType)[keyof typeof WidgetType];

export const SizeUnit = {
  Pixel: 'px',
  EM: 'em',
  REM: 'rem',
  Percentage: '%',
} as const;

export type SizeUnit = (typeof SizeUnit)[keyof typeof SizeUnit];

export const SpacingType = {
  Padding: 'padding',
  Margin: 'margin',
} as const;

export type SpacingType = (typeof SpacingType)[keyof typeof SpacingType];

export const PointerEvents = {
  Auto: 'auto',
  None: 'none',
} as const;

export type PointerEvents = (typeof PointerEvents)[keyof typeof PointerEvents];

export const ROOT_FONT_SIZE = 16;

export const Overflow = {
  Auto: 'auto',
  Scroll: 'scroll',
  Visible: 'visible',
  Hidden: 'hidden',
} as const;

export type Overflow = (typeof Overflow)[keyof typeof Overflow];
