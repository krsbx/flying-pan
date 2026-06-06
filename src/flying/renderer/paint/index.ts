import type { LabelProps } from '@/flying/widget';
import { WidgetType } from '@/flying/widget/constant';
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

  if (style.borderWidth && style.borderColor) {
    finalX -= style.borderWidth;
    finalY -= style.borderWidth;
    finalWidth += style.borderWidth * 2;
    finalHeight += style.borderWidth * 2;

    // Render the border by drawing a rectangle with a slightly larger width and height
    renderer.drawRect(window, {
      x: x - style.borderWidth,
      y: y - style.borderWidth,
      width: width + style.borderWidth * 2,
      height: height + style.borderWidth * 2,
      color: style.borderColor,
      borderRadius: style.borderRadius,
    });
  }

  if (style.backgroundColor) {
    renderer.drawRect(window, {
      x: finalX,
      y: finalY,
      width: finalWidth,
      height: finalHeight,
      color: style.backgroundColor,
      borderRadius: style.borderRadius,
    });
  }

  if (widget.type === WidgetType.Label) {
    const fontAtlas = fontManager.get((style as TextStyle).font);

    const text = (widget.props as LabelProps)?.text ?? '';
    const color = (style as TextStyle).color ?? Color.white;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fontSize = (style as TextStyle).fontSize;

    if (text) {
      renderer.drawText(window, {
        text,
        x,
        y,
        color,
        atlas: fontAtlas,
      });
    }
  }

  for (const child of children) {
    paint(window, { renderer, fontManager, layout: child });
  }
}
