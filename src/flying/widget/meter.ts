import {
  PointerEvents,
  ProgressBarOrientation,
  ProgressDirection,
  WidgetType,
  type ProgressValueType,
} from './constant';
import {
  Palette,
  type TextStyle,
  type ViewStyle,
  type WidgetDescriptor,
  type WidgetProps,
} from './styles';

export interface MeterProps extends WidgetProps {
  value?: number;
  min?: number;
  max?: number;

  low?: number;
  high?: number;
  optimum?: number;

  orientation?: ProgressBarOrientation;
  direction?: ProgressDirection;

  /** Optional text rendered centered on the bar. */
  label?: string;
  /** Required if `label` is being set */
  font?: string;
  labelStyle?: TextStyle;

  /**
   * Auto-compute the label from the value. Ignored if `label` is also set
   * (explicit label wins). Same semantics as `ProgressBarProps.showValue`.
   */
  showValue?: ProgressValueType;

  style?: ViewStyle;
  fillStyle?: ViewStyle;
}

export function Meter(props: MeterProps): WidgetDescriptor {
  const { style, fillStyle, ...rest } = props;

  const orientation = props.orientation || ProgressBarOrientation.Horizontal;
  const direction = props.direction || ProgressDirection.Forward;

  const isHorizontal = orientation === ProgressBarOrientation.Horizontal;

  return {
    type: WidgetType.Meter,
    props: {
      ...rest,
      fillStyle: {
        backgroundColor: Palette.accent,
        ...fillStyle,
      },
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
