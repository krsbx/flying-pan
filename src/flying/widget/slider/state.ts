import type { SliderProps } from './types';

export function makeSliderState(props: SliderProps): number {
  const min = props.min ?? 0;
  const value = props.value ?? props.defaultValue ?? 0;

  return value ?? min;
}
