import type { Window } from '@/flying/app';
import type { ToggleProps } from '@/flying/widget/toggle';
import type { SubMarkPaintOptions } from '../types';
import { paintBorder, resolveStyle } from '../utility';

const INDICATOR_COLOR = '#ffffff';

const INDICATOR_INSET = 1;

export function paintToggle(window: Window, options: SubMarkPaintOptions) {
  const { renderer, layout, checked, hovered, focused, pressed } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as ToggleProps;

  const half = width / 2;
  const markWidth = half - INDICATOR_INSET;
  const markHeight = height - INDICATOR_INSET * 2;
  const markX = checked ? x + half : x + INDICATOR_INSET;
  const markY = y + INDICATOR_INSET;

  const knob = resolveStyle({
    style: props.indicatorStyle ?? {},
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
    style: knob,
  });

  renderer.drawRect(window, {
    x: markX,
    y: markY,
    width: markWidth,
    height: markHeight,
    color: knob.backgroundColor ?? INDICATOR_COLOR,
    opacity: knob.opacity,
    borderRadius: knob.borderRadius ?? markHeight / 2,
  });
}
