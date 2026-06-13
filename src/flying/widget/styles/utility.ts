import { ROOT_FONT_SIZE, SizeUnit } from '../constant';
import type {
  LayoutConstraints,
  LayoutConstraintsOptions,
  ResolvedSpacing,
  SizeInput,
  SpacingInput,
} from './types';

/**
 * Resolves a size value (number or string with unit) to pixels.
 *
 * Supported units:
 * - `px` — direct pixels
 * - `%` — relative to `percentBase` (caller provides parent dimension)
 * - `em` — multiplied by ROOT_FONT_SIZE
 * - `rem` — multiplied by ROOT_FONT_SIZE
 */
export function resolveSize(
  value: SizeInput | undefined | null,
  percentBase: number
): number {
  if (value === undefined || value === null) return 0;
  if (typeof value === 'number') return value;

  const match = value.match(/^([\d.]+)(px|%|em|rem)?$/);
  if (!match) return 0;

  const num = parseFloat(match[1]!);
  const unit = match[2] as SizeUnit | undefined;

  switch (unit) {
    case SizeUnit.Pixel:
      return num;

    case SizeUnit.Percentage:
      return (num / 100) * percentBase;

    case SizeUnit.EM:
    case SizeUnit.REM:
      return num * ROOT_FONT_SIZE;

    default:
      return num;
  }
}

/**
 * Resolves spacing input to pixel values.
 * Percentage values use `percentBase` (CSS standard: parent content width).
 */
export function resolveSpacing(
  input: SpacingInput | undefined | null,
  percentBase: number
): ResolvedSpacing {
  if (input === undefined || input === null) {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }

  if (typeof input === 'number') {
    return { top: input, right: input, bottom: input, left: input };
  }

  if (Array.isArray(input)) {
    if (input.length === 2) {
      const v = resolveSize(input[0], percentBase);
      const h = resolveSize(input[1], percentBase);

      return { top: v, right: h, bottom: v, left: h };
    }

    return {
      top: resolveSize(input[0], percentBase),
      right: resolveSize(input[1], percentBase),
      bottom: resolveSize(input[2], percentBase),
      left: resolveSize(input[3], percentBase),
    };
  }

  // It's a Spacing object
  const spacing = input as import('./types').Spacing;

  return {
    top: resolveSize(spacing.top, percentBase),
    right: resolveSize(spacing.right, percentBase),
    bottom: resolveSize(spacing.bottom, percentBase),
    left: resolveSize(spacing.left, percentBase),
  };
}

export function layoutConstraints(
  options: LayoutConstraintsOptions
): LayoutConstraints {
  return {
    minWidth: 0,
    maxWidth: options.width ?? options.parentWidth,
    minHeight: 0,
    maxHeight: options.height ?? options.parentHeight,
  };
}
