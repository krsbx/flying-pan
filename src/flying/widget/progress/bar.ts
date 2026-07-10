import {
  PointerEvents,
  ProgressBarOrientation,
  ProgressDirection,
  ProgressType,
  WidgetType,
} from '../constant';
import { Palette, type WidgetDescriptor } from '../styles';
import type { ProgressProps } from './types';

export interface ProgressBarProps extends ProgressProps {
  orientation?: ProgressBarOrientation;
  direction?: ProgressDirection;
  /** When > 1, render the bar as N discrete segments instead of a continuous fill. */
  steps?: number;
  /** Pixel gap between segments in stepped mode. Defaults to 2. */
  stepGap?: number;
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
      pointerEvents: PointerEvents.None,
      width: isHorizontal ? 48 : 4,
      height: isHorizontal ? 4 : 48,
      backgroundColor: Palette.surfaceActive,
      ...style,
    },
  };
}
