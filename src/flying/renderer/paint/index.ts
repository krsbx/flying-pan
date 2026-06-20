import type { Window } from '@flying/app';
import {
  Overflow,
  WidgetType,
  type CheckboxProps,
  type TextStyle,
  type ViewStyle,
} from '@flying/widget';
import { paintCheckbox } from './checkbox';
import { paintImage } from './image';
import { paintText } from './text';
import type { PaintOptions } from './types';
import { resolveStyle } from './utility';

export function paint(window: Window, options: PaintOptions) {
  const { renderer, ctx, layout } = options;
  const { widget, x, y, width, height, children } = layout;
  const baseStyle = widget.style ?? ({} as ViewStyle);

  const stableId = layout.stableId;
  const hovered = ctx.interactionManager.pointer.hoveredStableId === stableId;
  const focused = ctx.interactionManager.focus.focusedStableId === stableId;
  const pressed = ctx.interactionManager.pointer.pressedStableId === stableId;
  const style = resolveStyle(baseStyle, hovered, focused, pressed);

  const borderRadius = style.borderRadius;
  const opacity = style.opacity;

  // Drop shadow first, so its rendered behind the requested
  if (style.boxShadow) {
    const shadows = Array.isArray(style.boxShadow)
      ? style.boxShadow
      : [style.boxShadow];

    for (const shadow of shadows) {
      renderer.drawShadow(window, {
        x,
        y,
        width,
        height,
        shadow,
        borderRadius,
      });
    }
  }

  // Render the border by drawing a rectangle with a bigger size as the requested
  if (style.borderWidth && style.borderColor) {
    renderer.drawRect(window, {
      x: x - style.borderWidth / 2,
      y: y - style.borderWidth / 2,
      width: width + style.borderWidth,
      height: height + style.borderWidth,
      color: style.borderColor,
      borderRadius,
      opacity,
    });
  }

  if (style.backgroundColor) {
    renderer.drawRect(window, {
      x,
      y,
      width,
      height,
      color: style.backgroundColor,
      borderRadius,
      opacity,
    });
  }

  if (widget.type === WidgetType.Image) {
    paintImage(window, {
      ctx,
      layout,
      renderer,
      style,
    });
  }

  if (widget.type === WidgetType.Label) {
    paintText(window, {
      ctx,
      layout,
      renderer,
      style: style as TextStyle,
    });
  }

  if (widget.type === WidgetType.Checkbox) {
    const props = widget.props as CheckboxProps;
    const mergedStyle = { ...style, ...props.tickStyle };

    paintCheckbox(window, {
      ctx,
      layout,
      renderer,
      style: resolveStyle(mergedStyle, hovered, focused, pressed),
    });
  }

  const overflow = style.overflow;
  const isScrollable =
    overflow === Overflow.Scroll || overflow === Overflow.Auto;
  const shouldClip =
    (overflow === Overflow.Hidden || isScrollable) && children.length > 0;

  if (shouldClip) {
    renderer.pushClip(window, { x, y, width, height });
  }

  if (isScrollable && children.length > 0) {
    const offset = ctx.interactionManager.scroll.offset(layout);
    renderer.pushTranslate(window, { x: -offset.x, y: -offset.y });
  }

  for (const child of children) {
    paint(window, {
      renderer,
      layout: child,
      ctx,
    });
  }

  if (isScrollable && children.length > 0) {
    renderer.popTranslate(window);
  }

  if (shouldClip) {
    renderer.popClip(window);
  }
}
