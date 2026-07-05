import type { Coordinate2D, Resolution } from '@/flying/types';
import type { Window } from '@flying/app';
import type { ViewStyle } from '@flying/widget';
import type { Renderer } from '../renderer';
import type { ResolveStyleOptions } from './types';

export function paintBorder(
  window: Window,
  options: Resolution &
    Coordinate2D & {
      style: ViewStyle;
      renderer: Renderer;
    }
): void {
  const { renderer, style, width, height, x, y } = options;

  // Render the border by drawing a rectangle with a bigger size as the requested
  if (style.borderWidth && style.borderColor) {
    renderer.drawRect(window, {
      x: x - style.borderWidth / 2,
      y: y - style.borderWidth / 2,
      width: width + style.borderWidth,
      height: height + style.borderWidth,
      color: style.borderColor,
      borderRadius: style.borderRadius,
      opacity: style.opacity,
    });
  }
}

export function resolveStyle(options: ResolveStyleOptions): ViewStyle {
  const { style, focused, hovered, pressed, checked } = options;

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
