import type { Window } from '@flying/app';
import type { Renderer } from '@flying/renderer';
import {
  Palette,
  ProgressValueType,
  TextAlign,
  type LabelProps,
  type TextStyle,
} from '@flying/widget';
import type { PaintContext, PaintOptions } from '../types';
import { formatValueLabel } from '../utility';

export interface InlineLabelOptions {
  renderer: Renderer;
  ctx: PaintContext;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  font: string;
  style: TextStyle;
}

export function paintInlineLabel(window: Window, options: InlineLabelOptions) {
  const { renderer, ctx, x, y, width, height, label, font, style } = options;

  const color = style.color ?? Palette.text;

  if (!label) return;

  const fontAtlas = ctx.fontManager.get(font);
  const measured = fontAtlas.measureText({
    text: label,
    letterSpacing: style.letterSpacing,
    lineHeight: style.lineHeight,
    fontSize: style.fontSize,
  });

  const textAlign = style.textAlign ?? TextAlign.Center;
  let textX = x;
  const textY = y + (height - measured.height) / 2;

  switch (textAlign) {
    case TextAlign.Center:
      textX += (width - measured.width) / 2;
      break;

    case TextAlign.Right:
      textX += width - measured.width;
      break;

    case TextAlign.Left:
    default:
      break;
  }

  renderer.drawText(window, {
    text: label,
    x: textX,
    y: textY,
    color,
    atlas: fontAtlas,
    opacity: style.opacity,
    letterSpacing: style.letterSpacing,
    lineHeight: style.lineHeight,
    fontSize: style.fontSize,
  });
}

export function paintText(
  window: Window,
  options: PaintOptions & { style: TextStyle }
) {
  const { renderer, ctx, layout, style } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as LabelProps;

  paintInlineLabel(window, {
    renderer,
    ctx,
    x,
    y,
    width,
    height,
    label: props?.text ?? '',
    font: props.font,
    style,
  });
}

export interface InlineValueLabelOptions {
  renderer: Renderer;
  ctx: PaintContext;
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  font?: string;
  labelStyle?: TextStyle;
  value?: number;
  min?: number;
  max?: number;
  showValue?: ProgressValueType;
}

export function paintInlineValueLabel(
  window: Window,
  options: InlineValueLabelOptions
) {
  const labelText =
    options.label ??
    formatValueLabel({
      value: options.value,
      min: options.min,
      max: options.max,
      format: options.showValue,
    });

  if (labelText && options.font) {
    paintInlineLabel(window, {
      renderer: options.renderer,
      ctx: options.ctx,
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height,
      label: labelText,
      font: options.font,
      style: options.labelStyle ?? {},
    });
  }
}
