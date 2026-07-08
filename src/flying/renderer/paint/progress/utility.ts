import type { ValidColor } from '@flying/types';
import {
  Palette,
  ProgressValueType,
  type ColorStop,
  type ViewStyle,
} from '@flying/widget';
import { clamp } from '@utility/common';

export function resolveFillColor(options: {
  ratio: number;
  fillStyle?: ViewStyle;
  colorStops?: ColorStop[];
}): ValidColor {
  const { ratio, fillStyle, colorStops } = options;

  if (colorStops && colorStops.length > 0) {
    const sorted = [...colorStops].sort((a, b) => a.at - b.at);
    let picked = sorted[0]!.color;

    for (const stop of sorted) {
      if (ratio >= stop.at) picked = stop.color;
      else break;
    }

    return picked;
  }

  return fillStyle?.backgroundColor ?? Palette.accent;
}

export function resolveFillColorClamped(options: {
  ratio: number;
  fillStyle?: ViewStyle;
  colorStops?: ColorStop[];
}): ValidColor {
  return resolveFillColor({
    ratio: clamp({ value: options.ratio, min: 0, max: 1 }),
    fillStyle: options.fillStyle,
    colorStops: options.colorStops,
  });
}

export function formatValueLabel(options: {
  value?: number;
  min?: number;
  max?: number;
  format?: ProgressValueType;
}): string | null {
  const { value, min, max, format } = options;

  if (format === undefined || value === undefined) return null;

  const lo = min ?? 0;
  const hi = max ?? 1;
  const span = hi - lo;
  const ratio = span === 0 ? 0 : (value - lo) / span;

  if (format === ProgressValueType.Percent) {
    return `${Math.round(ratio * 100)}%`;
  }

  return `${value}/${hi}`;
}
