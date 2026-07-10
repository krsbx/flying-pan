import { formatValueLabel } from '@flying/renderer/paint/utility';
import { ROOT_FONT_SIZE, type ProgressBarProps } from '@flying/widget';
import type { ResolveWidgetSizeOptions } from '../types';

export function resolveProgressBarSize(
  options: ResolveWidgetSizeOptions
): void {
  const props = options.widget.props as ProgressBarProps;
  const fontSize = props.labelStyle?.fontSize ?? ROOT_FONT_SIZE;
  const letterSpacing = props.labelStyle?.letterSpacing;
  const lineHeight = props.labelStyle?.lineHeight;

  const text =
    props.label ??
    formatValueLabel({
      value: props.value,
      min: props.min,
      max: props.max,
      format: props.showValue,
    });

  if (text && props.font) {
    const fontAtlas = options.ctx.fontManager.get(props.font);
    const measured = fontAtlas.measureText({
      text,
      fontSize,
      letterSpacing,
      lineHeight,
    });

    if (options.size.width < measured.width)
      options.size.width = measured.width;
    if (options.size.height < measured.height)
      options.size.height = measured.height;
  }
}
