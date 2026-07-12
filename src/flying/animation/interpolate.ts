import { parseColor } from '@flying/renderer/color';
import type { RGBA } from '@flying/types';

/** Linear interpolation between two RGBA colors. Shared with gradient painter. */
export function lerpRgba(from: RGBA, to: RGBA, t: number): RGBA {
  return {
    red: from.red + (to.red - from.red) * t,
    green: from.green + (to.green - from.green) * t,
    blue: from.blue + (to.blue - from.blue) * t,
    alpha: from.alpha + (to.alpha - from.alpha) * t,
  };
}

/** Interpolate between two style values (number or color string). */
export function interpolate(
  from: string | number,
  to: string | number,
  t: number
): string | number {
  if (typeof from === 'number' && typeof to === 'number') {
    return from + (to - from) * t;
  }

  const rgba = lerpRgba(
    parseColor(from as string),
    parseColor(to as string),
    t
  );

  return `rgba(${Math.round(rgba.red * 255)},${Math.round(rgba.green * 255)},${Math.round(rgba.blue * 255)},${rgba.alpha})`;
}
