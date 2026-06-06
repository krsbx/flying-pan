import type { LabelProps } from '@/flying/widget';
import { TextAlign, WidgetType } from '@/flying/widget/constant';
import type { TextStyle } from '@/flying/widget/styles';
import type { Window } from '../../app';
import { Color } from '../color';
import type { PaintOptions } from './types';

export function paint(window: Window, options: PaintOptions) {
  const { renderer, fontManager } = options;
  const { widget, x, y, width, height, children } = options.layout;
  const style = widget.style ?? {};

  let finalX = x;
  let finalY = y;
  let finalWidth = width;
  let finalHeight = height;

  // Render the border by drawing a rectangle with a same size as the requested but resize the rectangle to fit the border
  if (style.borderWidth && style.borderColor) {
    renderer.drawRect(window, {
      x: finalX,
      y: finalY,
      width: finalWidth,
      height: finalHeight,
      color: style.borderColor,
      borderRadius: style.borderRadius,
      opacity: style.opacity,
    });

    finalX += style.borderWidth / 2;
    finalY += style.borderWidth / 2;
    finalWidth -= style.borderWidth;
    finalHeight -= style.borderWidth;
  }

  if (style.backgroundColor) {
    renderer.drawRect(window, {
      x: finalX,
      y: finalY,
      width: finalWidth,
      height: finalHeight,
      color: style.backgroundColor,
      borderRadius: style.borderRadius,
      opacity: style.opacity,
    });
  }

  if (widget.type === WidgetType.Label) {
    const textStyle = style as TextStyle;
    const fontAtlas = fontManager.get(textStyle.font);

    const text = (widget.props as LabelProps)?.text ?? '';
    const color = textStyle.color ?? Color.white;

    if (text) {
      let x = options.layout.x;

      const measured = fontAtlas.measureText({
        text,
        letterSpacing: textStyle.letterSpacing,
        lineHeight: textStyle.lineHeight,
        fontSize: textStyle.fontSize,
      });

      switch (textStyle.textAlign) {
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
        letterSpacing: textStyle.letterSpacing,
        lineHeight: textStyle.lineHeight,
      });
    }
  }

  for (const child of children) {
    paint(window, { renderer, fontManager, layout: child });
  }
}
