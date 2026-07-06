import type { CircularProgressProps, ProgressBarProps } from '@/flying/widget';
import { clamp } from '@/utility/common';

export function calculateProgressRatio(
  props: ProgressBarProps | CircularProgressProps
) {
  const min = props.min ?? 0;
  const max = props.max ?? 1;
  const span = max - min;
  const value = props.value ?? 0;
  const ratio =
    span === 0
      ? 0
      : clamp({
          value: (value - min) / span,
          min: 0,
          max: 1,
        });

  return ratio;
}
