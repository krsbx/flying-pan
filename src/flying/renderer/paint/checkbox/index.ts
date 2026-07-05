import type { Window } from '@/flying/app';
import type { CheckboxProps } from '@/flying/widget';
import type { SubMarkPaintOptions } from '../types';
import { paintBorder, resolveStyle } from '../utility';

const CHECK_COLOR = '#ffffff';

const CHECK_INSET = 0.5;

export function paintCheckbox(window: Window, options: SubMarkPaintOptions) {
  const { renderer, layout, checked, hovered, focused, pressed } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as CheckboxProps;

  if (!checked) return;

  const markWidth = width * (props.tickSize ?? CHECK_INSET);
  const markHeight = height * (props.tickSize ?? CHECK_INSET);
  const markX = x + (width - markWidth) / 2;
  const markY = y + (height - markHeight) / 2;

  const tick = resolveStyle({
    style: props.tickStyle ?? {},
    hovered,
    focused,
    pressed,
    checked,
  });

  paintBorder(window, {
    x: markX,
    y: markY,
    width: markWidth,
    height: markHeight,
    renderer,
    style: tick,
  });

  renderer.drawRect(window, {
    x: markX,
    y: markY,
    width: markWidth,
    height: markHeight,
    color: tick.backgroundColor ?? CHECK_COLOR,
    opacity: tick.opacity,
    borderRadius: tick.borderRadius,
  });
}
