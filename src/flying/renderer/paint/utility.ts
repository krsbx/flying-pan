import type { ViewStyle } from '@/flying/widget';

export function resolveStyle(
  style: ViewStyle,
  hovered: boolean,
  focused: boolean,
  pressed: boolean
): ViewStyle {
  if (!style._hover && !style._focus && !style._active) return style;

  const { _hover, _focus, _active, ...base } = style;
  let resolved: ViewStyle = base;

  if (hovered && _hover) resolved = { ...resolved, ..._hover };
  if (focused && _focus) resolved = { ...resolved, ..._focus };
  if (pressed && _active) resolved = { ...resolved, ..._active };

  return resolved;
}
