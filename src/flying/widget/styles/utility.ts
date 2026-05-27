import type { Spacing, SpacingInput } from './types';

export function resolveSpacing(input: SpacingInput): Spacing {
  if (typeof input === 'number') {
    return {
      top: input,
      right: input,
      bottom: input,
      left: input,
    };
  }

  if (Array.isArray(input)) {
    if (input.length === 2) {
      const [v, h] = input;

      return {
        top: v,
        right: h,
        bottom: v,
        left: h,
      };
    }

    const [top, right, bottom, left] = input;

    return {
      top,
      right,
      bottom,
      left,
    };
  }

  return input;
}
