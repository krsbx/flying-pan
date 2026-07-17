import type { Coordinate2D } from '@flying/types';
import { midpoint } from '@flying/utility/common';
import { MAX_RECURSION_DEPTH } from './constant';
import type {
  FlattenCubicRecursiveOptions,
  FlattenQuadraticRecursiveOptions,
} from './types';
import { cubicDeviation, quadraticDeviation } from './utility';

export function flattenQuadraticRecursive(
  options: FlattenQuadraticRecursiveOptions
): Coordinate2D[] {
  const { from, control, to, tolerance, depth } = options;

  if (
    depth >= MAX_RECURSION_DEPTH ||
    quadraticDeviation(options) <= tolerance
  ) {
    return [to];
  }

  // de Casteljau split at t=0.5.
  const q0 = midpoint(from, control);
  const q1 = midpoint(control, to);
  const s = midpoint(q0, q1);

  const left = flattenQuadraticRecursive({
    from: from,
    control: q0,
    to: s,
    tolerance,
    depth: depth + 1,
  });

  const right = flattenQuadraticRecursive({
    from: s,
    control: q1,
    to: to,
    tolerance,
    depth: depth + 1,
  });

  return [...left, ...right];
}

export function flattenCubicRecursive(
  options: FlattenCubicRecursiveOptions
): Coordinate2D[] {
  const { from, control1, control2, to, tolerance, depth } = options;

  if (
    depth >= MAX_RECURSION_DEPTH ||
    cubicDeviation({ from, control1, control2, to }) <= tolerance
  ) {
    return [to];
  }

  // de Casteljau split at t=0.5.
  const q0 = midpoint(from, control1);
  const q1 = midpoint(control1, control2);
  const q2 = midpoint(control2, to);
  const r0 = midpoint(q0, q1);
  const r1 = midpoint(q1, q2);
  const s = midpoint(r0, r1);

  const left = flattenCubicRecursive({
    from: from,
    control1: q0,
    control2: r0,
    to: s,
    tolerance,
    depth: depth + 1,
  });

  const right = flattenCubicRecursive({
    from: s,
    control1: r1,
    control2: q2,
    to: to,
    tolerance,
    depth: depth + 1,
  });

  return [...left, ...right];
}
