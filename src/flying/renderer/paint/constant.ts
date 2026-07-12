import type { ViewStyle } from '@flying/widget';

// Cache resolved styles by (style ref, pseudo-state bitmask).
// WeakMap lets entries be GC'd when descriptors are rebuilt (Path C).
export const resolvedStyleCache = new WeakMap<
  ViewStyle,
  Map<number, ViewStyle>
>();
