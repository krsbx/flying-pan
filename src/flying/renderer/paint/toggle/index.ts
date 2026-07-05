import type { Window } from '@/flying/app';
import type { ViewStyle } from '@/flying/widget';
import type { ToggleProps } from '@/flying/widget/toggle';
import type { PaintOptions } from '../types';

const INDICATOR_COLOR = '#ffffff';

const INDICATOR_INSET = 1;

export function paintToggle(
  window: Window,
  options: PaintOptions & { style: ViewStyle; checked: boolean }
) {
  const { renderer, layout, style, checked } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as ToggleProps;

  const half = width / 2;
  const markWidth = half - INDICATOR_INSET;
  const markHeight = height - INDICATOR_INSET * 2;
  const markX = checked ? x + half : x + INDICATOR_INSET;
  const markY = y + INDICATOR_INSET;

  renderer.drawRect(window, {
    x: markX,
    y: markY,
    width: markWidth,
    height: markHeight,
    color: props.indicatorStyle?.backgroundColor ?? INDICATOR_COLOR,
    opacity: style.opacity,
    borderRadius: props.indicatorStyle?.borderRadius ?? markHeight / 2,
  });
}
