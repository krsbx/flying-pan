import type { ValidColor } from '@flying/types';
import {
  ProgressBarOrientation,
  ProgressDirection,
  ProgressType,
  ProgressValueType,
  WidgetType,
} from '../constant';
import {
  Palette,
  type TextStyle,
  type ViewStyle,
  type WidgetDescriptor,
} from '../styles';

export interface ColorStop {
  /** Position along the track in [0, 1] (post-clamp ratio). */
  at: number;
  color: ValidColor;
}

export interface ProgressBarProps {
  value?: number;
  /**
   * Optional secondary "buffer" fill rendered behind the main fill
   * (YouTube/Netflix seek bar pattern). Same units/scale as `value` —
   * normalized via `min`/`max`. Drawn at lower opacity unless
   * `bufferStyle.opacity` is set.
   */
  buffer?: number;
  /** Style override for the buffer fill. Defaults to `fillStyle` at 0.35 opacity. */
  bufferStyle?: ViewStyle;
  min?: number;
  max?: number;
  orientation?: ProgressBarOrientation;
  direction?: ProgressDirection;
  style?: ViewStyle;
  fillStyle?: ViewStyle;
  type?: ProgressType;
  /** When > 1, render the bar as N discrete segments instead of a continuous fill. */
  steps?: number;
  /** Pixel gap between segments in stepped mode. Defaults to 2. */
  stepGap?: number;
  /**
   * Value-driven fill color. The stop with the highest `at` where
   * `ratio >= at` wins (i.e. each stop colors everything below it).
   * Stops should be sorted ascending by `at`; we sort defensively.
   */
  colorStops?: ColorStop[];
  /** Optional text rendered centered on the bar. */
  label?: string;
  /** Required if `label` is being set */
  font?: string;
  labelStyle?: TextStyle;
  /**
   * Auto-compute the label from the value. Ignored if `label` is also set
   * (explicit label wins).
   * - `'percent'` → `"65%"` (ratio × 100, rounded)
   * - `'fraction'` → `"5/10"` (raw value / max)
   */
  showValue?: ProgressValueType;
}

const DEFAULT_STEP_GAP = 2;

export function ProgressBar(props: ProgressBarProps): WidgetDescriptor {
  const { value, style, fillStyle, steps, stepGap, ...rest } = props;

  const orientation = props.orientation || ProgressBarOrientation.Horizontal;
  const direction = props.direction || ProgressDirection.Forward;
  const type =
    value !== undefined
      ? ProgressType.Determinate
      : props.type || ProgressType.Indeterminate;
  // NOTE: indeterminate type is flagged here but not yet rendered in paint.
  // Needs Track 5 (Animation) — a moving pulse/loop can't be expressed
  // without a per-frame clock + easing. Determinate path works today.
  const isHorizontal = orientation === ProgressBarOrientation.Horizontal;

  return {
    type: WidgetType.ProgressBar,
    props: {
      value,
      fillStyle: {
        backgroundColor: Palette.accent,
        ...fillStyle,
      },
      steps,
      stepGap: stepGap ?? DEFAULT_STEP_GAP,
      ...rest,
      type,
      orientation,
      direction,
    },
    style: {
      width: isHorizontal ? 48 : 4,
      height: isHorizontal ? 4 : 48,
      backgroundColor: Palette.surfaceActive,
      ...style,
    },
  };
}
