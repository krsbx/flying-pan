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

export const FontWeight = {
  Normal: 'normal',
  Bold: 'bold',
} as const;

export type FontWeight = (typeof FontWeight)[keyof typeof FontWeight];

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
} as const;

export type WidgetType = (typeof WidgetType)[keyof typeof WidgetType];
