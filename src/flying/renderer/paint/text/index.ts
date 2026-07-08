import type { Window } from '@flying/app';
import {
  Palette,
  TextAlign,
  type LabelProps,
  type TextStyle,
} from '@flying/widget';
import type { PaintOptions } from '../types';

export function paintText(
  window: Window,
  options: PaintOptions & { style: TextStyle }
) {
  const { renderer, ctx, layout, style } = options;
  const { widget, y, width } = layout;
  const props = widget.props as LabelProps;

  const color = style.color ?? Palette.text;
  const text = props?.text ?? '';

  if (!text) return;

  const fontAtlas = ctx.fontManager.get(props.font);

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
