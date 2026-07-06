import type { ValidColor } from '@flying/types';
import {
  ProgressBarOrientation,
  ProgressDirection,
  ProgressType,
  WidgetType,
} from '../constant';
import { Palette, type ViewStyle, type WidgetDescriptor } from '../styles';

export interface ProgressBarProps {
  value?: number;
  buffer?: number;
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
  /** Optional text rendered centered on the bar. */
  label?: string;
  /** Required if `label` is being set */
  font?: string;
  /** Label color. */
  labelColor?: ValidColor;
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
