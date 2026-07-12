import type { ValidColor } from '@flying/types';
import type { ProgressType, ProgressValueType } from '../constant';
import type { TextStyle, ViewStyle } from '../styles';

export interface ColorStop {
  /** Position along the track in [0, 1] (post-clamp ratio). */
  at: number;
  color: ValidColor;
}

export interface ProgressProps {
  value?: number;
  /**
   * Optional secondary "buffer" fill rendered behind the main fill
   * (YouTube/Netflix seek bar pattern). Same units/scale as `value` —
   * normalized via `min`/`max`. Drawn at lower opacity unless
   * `bufferStyle.opacity` is set.
   */
  buffer?: number;

  min?: number;
  max?: number;

  type?: ProgressType;

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
   * (explicit label wins). Same semantics as `ProgressBarProps.showValue`.
   */
  showValue?: ProgressValueType;

  style?: ViewStyle;
  fillStyle?: ViewStyle;

  /** Style override for the buffer arc. Defaults to `fillStyle` at 0.35 opacity. */
  bufferStyle?: ViewStyle;
}
