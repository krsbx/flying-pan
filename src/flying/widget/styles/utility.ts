import type {
  LayoutConstraints,
  LayoutConstraintsOptions,
  ResolvedSpacing,
  SpacingInput,
} from './types';

export function resolveSpacing(
  input: SpacingInput | undefined | null
): ResolvedSpacing {
  if (input === undefined || input === null) {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }

  if (typeof input === 'number') {
    return { top: input, right: input, bottom: input, left: input };
  }

  if (Array.isArray(input)) {
    if (input.length === 2) {
      const [v, h] = input;

      return { top: v, right: h, bottom: v, left: h };
    }

    const [top, right, bottom, left] = input;

    return { top, right, bottom, left };
  }

  return input;
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
