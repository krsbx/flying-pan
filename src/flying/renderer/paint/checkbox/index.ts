import type { Window } from '@/flying/app';
import type { CheckboxProps, ViewStyle } from '@/flying/widget';
import type { PaintOptions } from '../types';

const CHECK_COLOR = '#ffffff';

const CHECK_INSET = 0.5;

export function paintCheckbox(
  window: Window,
  options: PaintOptions & { style: ViewStyle; checked: boolean }
) {
  const { renderer, layout, style, checked } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as CheckboxProps;

  if (!checked) return;

  const markWidth = width * (props.tickSize ?? CHECK_INSET);
  const markHeight = height * (props.tickSize ?? CHECK_INSET);
  const markX = x + (width - markWidth) / 2;
  const markY = y + (height - markHeight) / 2;

  renderer.drawRect(window, {
    x: markX,
    y: markY,
    width: markWidth,
    height: markHeight,
    color: props.tickStyle?.backgroundColor ?? CHECK_COLOR,
    opacity: style.opacity,
    borderRadius: style.borderRadius,
  });
}
