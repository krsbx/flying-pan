import type { ProgressValueType } from '../constant';
import type { TextStyle, ViewStyle } from '../styles';

export interface SliderProps {
  /** Controlled value. When set, the widget is controlled — parent must update. */
  value?: number;

  /** Uncontrolled initial value. Used only on first paint. */
  defaultValue?: number;

  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;

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
  trackStyle?: ViewStyle;
  filledStyle?: ViewStyle;
  handleStyle?: ViewStyle;
}

export interface CircularGeometry {
  cx: number;
  cy: number;
  startAngle: number;
  sweep: number;
  direction: 1 | -1;
  min: number;
  max: number;
}
