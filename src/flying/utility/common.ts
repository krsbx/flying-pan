import { clamp } from '@utility/common';
import type { Coordinate2D } from '../types';

export function valueToRatio(options: {
  value: number;
  min: number;
  max: number;
}): number {
  const { value, min, max } = options;
  const span = max - min;
  const ratio = span === 0 ? 0 : (value - min) / span;

  return clamp({
    value: ratio,
    min: 0,
    max: 1,
  });
}

export function midpoint(a: number, b: number): number;
export function midpoint(a: Coordinate2D, b: Coordinate2D): Coordinate2D;
export function midpoint(
  a: number | Coordinate2D,
  b: number | Coordinate2D
): number | Coordinate2D {
  if (typeof a === 'number' && typeof b === 'number') {
    return (a + b) / 2;
  }

  if (typeof a === 'object' && typeof b === 'object') {
    return {
      x: midpoint(a.x, b.x),
      y: midpoint(a.y, b.y),
    };
  }

  throw new Error('Invalid arguments');
}
