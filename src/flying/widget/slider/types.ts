import type { ProgressValueType } from '../constant';
import type { ColorStop } from '../progress/types';
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

  /**
   * Value-driven fill color. The stop with the highest `at` where
   * `ratio >= at` wins. Same semantics as `ProgressBarProps.colorStops`.
   */
  colorStops?: ColorStop[];

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

  /** Tick marks at specified values, with optional labels. Bar sliders only. */
  marks?: SliderMark[];

  style?: ViewStyle;
  trackStyle?: ViewStyle;
  filledStyle?: ViewStyle;
  handleStyle?: ViewStyle;
}

export interface SliderMark {
  value: number;
  label?: string;
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
