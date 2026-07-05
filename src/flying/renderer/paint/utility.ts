import type { LayoutNode } from '@/flying/layout';
import type { Coordinate2D, Resolution } from '@/flying/types';
import type { Window } from '@flying/app';
import {
  WidgetType,
  type CheckboxProps,
  type RadioProps,
  type ToggleProps,
  type ViewStyle,
  type WidgetDescriptor,
} from '@flying/widget';
import type { Renderer } from '../renderer';
import type { PaintContext, ResolveStyleOptions } from './types';

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
  const { style, focused, hovered, pressed, checked, disabled } = options;

  if (
    !style._hover &&
    !style._focus &&
    !style._active &&
    !style._checked &&
    !style._disabled
  )
    return style;

  const { _hover, _focus, _active, _checked, _disabled, ...base } = style;
  let resolved: ViewStyle = base;

  if (hovered && _hover) resolved = { ...resolved, ..._hover };
  if (focused && _focus) resolved = { ...resolved, ..._focus };
  if (pressed && _active) resolved = { ...resolved, ..._active };
  if (checked && _checked) resolved = { ...resolved, ..._checked };
  if (disabled && _disabled) resolved = { ...resolved, ..._disabled };

  return resolved;
}

export function resolveWidgetCheckedState(options: {
  widget: WidgetDescriptor;
  layout: LayoutNode;
  ctx: PaintContext;
}): boolean {
  const { widget, layout, ctx } = options;

  if (widget.type === WidgetType.Radio) {
    const radioProps = widget.props as RadioProps;

    if (radioProps.selected !== undefined) {
      return radioProps.selected;
    } else if (radioProps.name !== undefined) {
      const current = ctx.stateStore.stateForByName<string>({
        name: radioProps.name,
        initial: radioProps.groupDefaultValue ?? '',
      });

      return current === radioProps.value;
    }
  } else if (widget.type === WidgetType.Checkbox) {
    const cbProps = widget.props as CheckboxProps;

    return (
      cbProps.value ??
      ctx.stateStore.stateFor<boolean>({
        stableId: layout.stableId,
        initial: cbProps.defaultValue ?? false,
      })
    );
  } else if (widget.type === WidgetType.Toggle) {
    const toggleProps = widget.props as ToggleProps;

    return (
      toggleProps.value ??
      ctx.stateStore.stateFor<boolean>({
        stableId: layout.stableId,
        initial: toggleProps.defaultValue ?? false,
      })
    );
  }

  return false;
}
