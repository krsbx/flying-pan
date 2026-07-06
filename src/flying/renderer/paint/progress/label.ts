import type { Window } from '@flying/app';
import type { Renderer } from '@flying/renderer/renderer';
import type { ValidColor } from '@flying/types';
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
  color: ValidColor;
}

export function paintInlineLabel(window: Window, options: InlineLabelOptions) {
  const { renderer, ctx, x, y, width, height, label, font, color } = options;

  const fontAtlas = ctx.fontManager.get(font);
  const measured = fontAtlas.measureText({ text: label });

  const textX = x + (width - measured.width) / 2;
  const textY = y + (height - measured.height) / 2;

  renderer.drawText(window, {
    text: label,
    x: textX,
    y: textY,
    color,
    atlas: fontAtlas,
  });
}
