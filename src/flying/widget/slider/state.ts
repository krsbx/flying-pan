import type { SliderBarProps } from '.';

export function makeSliderState(props: SliderBarProps): number {
  const min = props.min ?? 0;
  const value = props.value ?? props.defaultValue ?? 0;

  return value ?? min;
}
