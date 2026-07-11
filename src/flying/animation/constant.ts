export const EasingName = {
  Linear: 'linear',
  Ease: 'ease',
  EaseIn: 'ease-in',
  EaseOut: 'ease-out',
  EaseInOut: 'ease-in-out',
} as const;

export type EasingName = (typeof EasingName)[keyof typeof EasingName];

export const AnimatableProperty = {
  BackgroundColor: 'backgroundColor',
  BorderColor: 'borderColor',
  BorderRadius: 'borderRadius',
  BorderWidth: 'borderWidth',
  Opacity: 'opacity',
  Color: 'color',
} as const;

export type AnimatableProperty =
  (typeof AnimatableProperty)[keyof typeof AnimatableProperty];
