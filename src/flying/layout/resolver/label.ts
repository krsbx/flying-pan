import {
  ROOT_FONT_SIZE,
  type LabelProps,
  type TextStyle,
} from '@flying/widget';
import type { ResolveWidgetSizeOptions } from './types';

export function resolveLabelSize(options: ResolveWidgetSizeOptions): void {
  const props = options.widget.props as LabelProps;
  const style = options.widget.style as TextStyle;
  const fontAtlas = options.ctx.fontManager.get(props.font);

  const text = props.text;

  if (!text) return;

  const fontSize = style?.fontSize ?? ROOT_FONT_SIZE;
  const letterSpacing = style?.letterSpacing;
  const lineHeight = style?.lineHeight;

  const measured = fontAtlas.measureText({
    text,
    fontSize,
    letterSpacing,
    lineHeight,
  });

  options.size.width ||= measured.width;
  options.size.height ||= measured.height;
}
