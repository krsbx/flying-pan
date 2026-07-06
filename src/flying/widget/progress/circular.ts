import type { ValidColor } from '@flying/types';
import {
  CircularProgressDirection,
  ProgressType,
  WidgetType,
} from '../constant';
import { Palette, type ViewStyle, type WidgetDescriptor } from '../styles';

export interface CircularProgressProps {
  value?: number;
  buffer?: number;
  min?: number;
  max?: number;
  /** Diameter in px. Default 48. */
  size?: number;
  /**
   * Fill thickness as a fraction of the radius, in [0, 1].
   *
   * - `>= 1` (or any value that consumes the full radius) renders as a pie
   *   sector via `drawArc`.
   * - `< 1` renders as a ring stroke via `drawRing`, with
   *   `innerRadius = radius * (1 - thickness)`.
   *
   * Defaults to `0.1` (thin ring) because most "circular progress" UIs are
   * rings, not pies.
   */
  thickness?: number;
  /** Starting angle in radians. Default `-π/2` (top of circle). */
  startAngle?: number;
  /** Rotation direction. Default `Clockwise`. */
  direction?: CircularProgressDirection;
  style?: ViewStyle;
  fillStyle?: ViewStyle;
  type?: ProgressType;
  /** Optional text rendered centered in the circle. */
  label?: string;
  /** Required if `label` is set. */
  font?: string;
  /** Label color. Defaults to Palette.text. */
  labelColor?: ValidColor;
}

const DEFAULT_SIZE = 48;
const DEFAULT_THICKNESS = 0.1;
const DEFAULT_START_ANGLE = -Math.PI / 2;

export function CircularProgress(
  props: CircularProgressProps
): WidgetDescriptor {
  const { value, style, fillStyle, ...rest } = props;

  const size = props.size ?? DEFAULT_SIZE;
  const startAngle = props.startAngle ?? DEFAULT_START_ANGLE;
  const direction = props.direction || CircularProgressDirection.Clockwise;
  const type =
    value !== undefined
      ? ProgressType.Determinate
      : props.type || ProgressType.Indeterminate;
  // thickness undefined → ring (default). >= 1 → pie. < 1 → ring.
  const thickness = props.thickness ?? DEFAULT_THICKNESS;

  return {
    type: WidgetType.CircularProgress,
    props: {
      value,
      fillStyle: {
        backgroundColor: Palette.accent,
        ...fillStyle,
      },
      ...rest,
      thickness,
      startAngle,
      direction,
      type,
      size,
    },
    style: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: Palette.surfaceActive,
      ...style,
    },
  };
}
