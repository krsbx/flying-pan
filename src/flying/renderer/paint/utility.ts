import type { LayoutNode } from '@/flying/layout';
import type { Window } from '@flying/app';
import {
  WidgetType,
  type CheckboxProps,
  type RadioProps,
  type ToggleProps,
  type ViewStyle,
  type WidgetDescriptor,
} from '@flying/widget';
import type {
  PaintBackgroundOptions,
  PaintBorderOptions,
  PaintContext,
  PaintShadowOptions,
  ResolveStyleOptions,
} from './types';

export function paintShadow(window: Window, options: PaintShadowOptions) {
  const { renderer, style, width, height, x, y } = options;

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
        borderRadius: style.borderRadius,
      });
    }
  }
}

export function paintBorder(window: Window, options: PaintBorderOptions): void {
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

export function paintBackground(
  window: Window,
  options: PaintBackgroundOptions
): void {
  const { renderer, style, width, height, x, y, colorOverride } = options;

  const drawOptions = {
    x,
    y,
    width,
    height,
    opacity: style.opacity,
    borderRadius: style.borderRadius,
  };

  if (colorOverride) {
    renderer.drawRect(window, {
      ...drawOptions,
      color: colorOverride,
    });
  } else if (style.background) {
    renderer.drawGradientRect(window, {
      ...drawOptions,
      gradient: style.background,
    });
  } else if (style.backgroundColor) {
    renderer.drawRect(window, {
      ...drawOptions,
      color: style.backgroundColor,
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
