import { TextAlign, type LabelProps, type TextStyle } from '@/flying/widget';
import type { Window } from '@flying/app';
import { Color } from '../../color';
import type { PaintOptions } from '../types';

export function paintText(
  window: Window,
  options: PaintOptions & { style: TextStyle }
) {
  const { renderer, ctx, layout, style } = options;
  const { widget, y, width } = layout;

  const fontAtlas = ctx.fontManager.get(style.font);

  const text = (widget.props as LabelProps)?.text ?? '';
  const color = style.color ?? Color.white;

  if (!text) return;

  let x = options.layout.x;

  const measured = fontAtlas.measureText({
    text,
    letterSpacing: style.letterSpacing,
    lineHeight: style.lineHeight,
    fontSize: style.fontSize,
  });

  switch (style.textAlign) {
    case TextAlign.Center: {
      x += (width - measured.width) / 2;
      break;
    }

    case TextAlign.Right: {
      x += width - measured.width;
      break;
    }

    case TextAlign.Left:
    default:
      break;
  }

  renderer.drawText(window, {
    text,
    x,
    y,
    color,
    atlas: fontAtlas,
    opacity: style.opacity,
    letterSpacing: style.letterSpacing,
    lineHeight: style.lineHeight,
    fontSize: style.fontSize,
  });
}
