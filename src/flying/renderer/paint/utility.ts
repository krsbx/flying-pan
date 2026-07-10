import type { ColorStop } from '@/flying/widget/progress/types';
import type { Window } from '@flying/app';
import type { LayoutNode } from '@flying/layout';
import type { Renderer } from '@flying/renderer';
import type { ValidColor } from '@flying/types';
import {
  Palette,
  ProgressValueType,
  WidgetType,
  type CheckboxProps,
  type RadioProps,
  type ToggleProps,
  type ViewStyle,
  type WidgetDescriptor,
} from '@flying/widget';
import { clamp } from '@utility/common';
import { resolvedStyleCache } from './constant';
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

  let mask = 0;
  if (hovered) mask |= 1;
  if (focused) mask |= 2;
  if (pressed) mask |= 4;
  if (checked) mask |= 8;
  if (disabled) mask |= 16;

  let perStyle = resolvedStyleCache.get(style);

  if (perStyle) {
    const cached = perStyle.get(mask);

    if (cached) return cached;
  } else {
    perStyle = new Map();

    resolvedStyleCache.set(style, perStyle);
  }

  const { _hover, _focus, _active, _checked, _disabled, ...base } = style;
  let resolved: ViewStyle = base;

  if (hovered && _hover) resolved = { ...resolved, ..._hover };
  if (focused && _focus) resolved = { ...resolved, ..._focus };
  if (pressed && _active) resolved = { ...resolved, ..._active };
  if (checked && _checked) resolved = { ...resolved, ..._checked };
  if (disabled && _disabled) resolved = { ...resolved, ..._disabled };

  perStyle.set(mask, resolved);

  return resolved;
}

export function resolveWidgetCheckedState(options: {
  widget: WidgetDescriptor;
  layout: LayoutNode;
  ctx: PaintContext;
}): boolean {
  const { widget, layout, ctx } = options;

  switch (widget.type) {
    case WidgetType.Radio: {
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
      break;
    }

    case WidgetType.Checkbox: {
      const cbProps = widget.props as CheckboxProps;

      return (
        cbProps.value ??
        ctx.stateStore.stateFor<boolean>({
          stableId: layout.stableId,
          initial: cbProps.defaultValue ?? false,
        })
      );
    }

    case WidgetType.Toggle: {
      const toggleProps = widget.props as ToggleProps;

      return (
        toggleProps.value ??
        ctx.stateStore.stateFor<boolean>({
          stableId: layout.stableId,
          initial: toggleProps.defaultValue ?? false,
        })
      );
    }
  }

  return false;
}

export interface DrawArcSegmentOptions {
  renderer: Renderer;
  cx: number;
  cy: number;
  radius: number;
  innerRadius: number;
  startAngle: number;
  endAngle: number;
  color: string;
  opacity?: number;
}

export function drawArcSegment(
  window: Window,
  options: DrawArcSegmentOptions
): void {
  const {
    renderer,
    cx,
    cy,
    radius,
    innerRadius,
    startAngle,
    endAngle,
    color,
    opacity,
  } = options;

  if (startAngle === endAngle) return;

  if (innerRadius <= 0) {
    renderer.drawArc(window, {
      cx,
      cy,
      radius,
      startAngle,
      endAngle,
      color,
      opacity,
    });
  } else {
    renderer.drawRing(window, {
      cx,
      cy,
      outerRadius: radius,
      innerRadius,
      startAngle,
      endAngle,
      color,
      opacity,
    });
  }
}

export function resolveFillColor(options: {
  ratio: number;
  fillStyle?: ViewStyle;
  colorStops?: ColorStop[];
}): ValidColor {
  const { ratio, fillStyle, colorStops } = options;

  if (colorStops && colorStops.length > 0) {
    const sorted = [...colorStops].sort((a, b) => a.at - b.at);
    let picked = sorted[0]!.color;

    for (const stop of sorted) {
      if (ratio >= stop.at) picked = stop.color;
      else break;
    }

    return picked;
  }

  return fillStyle?.backgroundColor ?? Palette.accent;
}

export function resolveFillColorClamped(options: {
  ratio: number;
  fillStyle?: ViewStyle;
  colorStops?: ColorStop[];
}): ValidColor {
  return resolveFillColor({
    ratio: clamp({ value: options.ratio, min: 0, max: 1 }),
    fillStyle: options.fillStyle,
    colorStops: options.colorStops,
  });
}

export function formatValueLabel(options: {
  value?: number;
  min?: number;
  max?: number;
  format?: ProgressValueType;
}): string | null {
  const { value, min, max, format } = options;

  if (format === undefined || value === undefined) return null;

  const lo = min ?? 0;
  const hi = max ?? 1;
  const span = hi - lo;
  const ratio = span === 0 ? 0 : (value - lo) / span;

  if (format === ProgressValueType.Percent) {
    return `${Math.round(ratio * 100)}%`;
  }

  return `${value}/${hi}`;
}
