import {
  ProgressBarOrientation,
  ProgressDirection,
  ProgressType,
  WidgetType,
} from '../constant';
import { Palette, type ViewStyle, type WidgetDescriptor } from '../styles';

export interface ProgressBarProps {
  value?: number;
  min?: number;
  max?: number;
  orientation?: ProgressBarOrientation;
  direction?: ProgressDirection;
  style?: ViewStyle;
  fillStyle?: ViewStyle;
  type?: ProgressType;
}

export function ProgressBar(props: ProgressBarProps): WidgetDescriptor {
  const { value, min, max, style, fillStyle, ...rest } = props;

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
      min,
      max,
      orientation,
      direction,
      fillStyle: {
        backgroundColor: Palette.accent,
        ...fillStyle,
      },
      type,
      ...rest,
    },
    style: {
      width: isHorizontal ? 48 : 4,
      height: isHorizontal ? 4 : 48,
      backgroundColor: Palette.surfaceActive,
      ...style,
    },
  };
}
