import type { Window } from '@flying/app';
import type { Renderer } from '@flying/renderer';
import { Palette, TextAlign, type TextStyle } from '@flying/widget';
import type { PaintContext } from '../types';

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
