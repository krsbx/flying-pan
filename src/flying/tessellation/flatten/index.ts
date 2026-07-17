import type { Coordinate2D } from '@flying/types';
import { DEFAULT_TOLERANCE } from './constant';
import { flattenCubicRecursive, flattenQuadraticRecursive } from './recursive';
import type {
  FlattenArcOptions,
  FlattenCubicOptions,
  FlattenQuadraticOptions,
} from './types';
import { cubicDeviation, quadraticDeviation } from './utility';

export function flattenQuadratic(
  options: FlattenQuadraticOptions
): Coordinate2D[] {
  const { to, tolerance = DEFAULT_TOLERANCE } = options;

  if (quadraticDeviation(options) <= tolerance) {
    return [to];
  }

  return flattenQuadraticRecursive({
    ...options,
    tolerance,
    depth: 0,
  });
}

export function flattenCubic(options: FlattenCubicOptions): Coordinate2D[] {
  const { to, tolerance = DEFAULT_TOLERANCE } = options;

  if (cubicDeviation(options) <= tolerance) {
    return [to];
  }

  return flattenCubicRecursive({
    ...options,
    tolerance,
    depth: 0,
  });
}

export function flattenArc(options: FlattenArcOptions): Coordinate2D[] {
  const {
    center,
    radius,
    startAngle,
    endAngle,
    anticlockwise,
    tolerance = DEFAULT_TOLERANCE,
  } = options;

  let delta = endAngle - startAngle;

  if (!anticlockwise) {
    if (delta <= 0) delta += Math.PI * 2;
  } else {
    if (delta >= 0) delta -= Math.PI * 2;
  }

  const absDelta = Math.abs(delta);

  let segments: number = 1;

  if (radius > tolerance || absDelta !== 0) {
    const denom =
      2 * Math.acos(Math.max(-1, Math.min(1, 1 - tolerance / radius)));
    segments = Math.max(1, Math.ceil(absDelta / denom));
  }

  const points: Coordinate2D[] = [];

  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const angle = startAngle + t * delta;

    points.push({
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    });
  }

  return points;
}
