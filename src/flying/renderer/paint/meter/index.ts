import { valueToRatio } from '@/flying/utility/common';
import {
  Palette,
  ProgressBarOrientation,
  ProgressDirection,
  type MeterProps,
} from '@/flying/widget';
import type { Window } from '@flying/app';
import { paintContinuousFill } from '../fill';
import { paintInlineValueLabel } from '../text';
import type { PaintOptions } from '../types';

function resolveMeterColor(options: {
  value: number;
  low: number;
  high: number;
  optimum: number;
}): keyof typeof Palette {
  const { value, low, high, optimum } = options;

  const optimumInLow = optimum < low;
  const optimumInHigh = optimum > high;

  const valueInLow = value < low;
  const valueInHigh = value > high;
  const valueInMedium = !valueInLow && !valueInHigh;

  if (optimumInLow) {
    if (valueInLow) return 'success';
    if (valueInMedium) return 'warning';
    return 'error';
  }

  if (optimumInHigh) {
    if (valueInHigh) return 'success';
    if (valueInMedium) return 'warning';
    return 'error';
  }

  if (valueInMedium) return 'success';
  return 'warning';
}

export function paintMeter(window: Window, options: PaintOptions) {
  const { renderer, ctx, layout } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as MeterProps;

  const min = props.min ?? 0;
  const max = props.max ?? 100;
  const low = props.low ?? min + (max - min) / 3;
  const high = props.high ?? min + ((max - min) * 2) / 3;
  const optimum = props.optimum ?? (low + high) / 2;

  const value = props.value ?? min;
  const ratio = valueToRatio({ value, min, max });

  const isHorizontal = props.orientation === ProgressBarOrientation.Horizontal;
  const isForward = props.direction === ProgressDirection.Forward;

  const zoneColor = Palette[resolveMeterColor({ value, low, high, optimum })];

  paintContinuousFill(window, {
    renderer,
    x,
    y,
    width,
    height,
    isHorizontal,
    isForward,
    ratio,
    fillStyle: props.fillStyle ?? {},
    colorOverride: zoneColor,
  });

  paintInlineValueLabel(window, {
    renderer,
    ctx,
    x,
    y,
    width,
    height,
    label: props.label,
    font: props.font,
    labelStyle: props.labelStyle,
    value,
    min,
    max,
    showValue: props.showValue,
  });
}
