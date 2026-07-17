import type { CubicDeviationOptions, QuadraticDeviationOptions } from './types';

export function quadraticDeviation(options: QuadraticDeviationOptions): number {
  const dx = options.to.x - options.from.x;
  const dy = options.to.y - options.from.y;
  const len = Math.hypot(dx, dy);

  if (len === 0) {
    return Math.hypot(
      options.control.x - options.from.x,
      options.control.y - options.from.y
    );
  }

  return (
    Math.abs(
      (options.control.x - options.from.x) * dy -
        (options.control.y - options.from.y) * dx
    ) / len
  );
}

export function cubicDeviation(options: CubicDeviationOptions): number {
  const dx = options.to.x - options.from.x;
  const dy = options.to.y - options.from.y;
  const len = Math.hypot(dx, dy);

  if (len === 0) {
    return Math.max(
      Math.hypot(
        options.control1.x - options.from.x,
        options.control1.y - options.from.y
      ),
      Math.hypot(
        options.control2.x - options.from.x,
        options.control2.y - options.from.y
      )
    );
  }

  const d1 =
    Math.abs(
      (options.control1.x - options.from.x) * dy -
        (options.control1.y - options.from.y) * dx
    ) / len;
  const d2 =
    Math.abs(
      (options.control2.x - options.from.x) * dy -
        (options.control2.y - options.from.y) * dx
    ) / len;

  return Math.max(d1, d2);
}
