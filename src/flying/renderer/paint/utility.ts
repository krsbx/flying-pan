import type { ViewStyle } from '@/flying/widget';

export function resolveStyle({
  style,
  focused,
  hovered,
  pressed,
  checked,
}: {
  style: ViewStyle;
  hovered: boolean;
  focused: boolean;
  pressed: boolean;
  checked: boolean;
}): ViewStyle {
  if (!style._hover && !style._focus && !style._active && !style._checked)
    return style;

  const { _hover, _focus, _active, _checked, ...base } = style;
  let resolved: ViewStyle = base;

  if (hovered && _hover) resolved = { ...resolved, ..._hover };
  if (focused && _focus) resolved = { ...resolved, ..._focus };
  if (pressed && _active) resolved = { ...resolved, ..._active };
  if (checked && _checked) resolved = { ...resolved, ..._checked };

  return resolved;
}
