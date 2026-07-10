import { RangeHandle } from '../constant';
import type { RangeSliderProps, RangeSliderState, SliderProps } from './types';

export function makeSliderState(props: SliderProps): number {
  const min = props.min ?? 0;
  const value = props.value ?? props.defaultValue ?? 0;

  return value ?? min;
}

export function makeRangeSliderState(
  props: RangeSliderProps
): RangeSliderState {
  const min = props.min ?? 0;
  const max = props.max ?? 100;
  const value = props.value ?? props.defaultValue ?? [min, max];
  const start = value[0] ?? min;
  const end = value[1] ?? max;

  return {
    start: Math.min(start, end),
    end: Math.max(start, end),
    activeHandle: RangeHandle.End,
  };
}
