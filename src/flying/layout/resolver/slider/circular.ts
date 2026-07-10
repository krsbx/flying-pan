import { formatValueLabel } from '@flying/renderer/paint/progress/utility';
import type { CircularSliderProps } from '@flying/widget';
import type { ResolveWidgetSizeOptions } from '../types';

export function resolveCircularSliderSize(
  options: ResolveWidgetSizeOptions
): void {
  const props = options.widget.props as CircularSliderProps;

  const labelText =
    props.label ??
    formatValueLabel({
      value: props.value,
      min: props.min,
      max: props.max,
      format: props.showValue,
    });

  if (labelText && props.font) {
    const fontAtlas = options.ctx.fontManager.get(props.font);
    const measured = fontAtlas.measureText({ text: labelText });

    // Stay square so the circle stays circular — growing only width or
    // height would distort the box and drawRoundedRect's radius clamp
    // would then produce an ellipse.
    const minSize = Math.max(measured.width, measured.height);

    if (options.size.width < minSize) options.size.width = minSize;
    if (options.size.height < minSize) options.size.height = minSize;
  }
}
