import type { Window } from '@/flying/app';
import type { RadioProps, ViewStyle } from '@/flying/widget';
import type { PaintOptions } from '../types';

const DOT_COLOR = '#1a73e8';

const DOT_INSET = 0.5;

export function paintRadio(
  window: Window,
  options: PaintOptions & { style: ViewStyle; checked: boolean }
) {
  const { renderer, layout, style, checked } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as RadioProps;

  if (!checked) return;

  const dotSize = Math.min(width, height) * (props.dotSize ?? DOT_INSET);
  const dotX = x + (width - dotSize) / 2;
  const dotY = y + (height - dotSize) / 2;

  renderer.drawRect(window, {
    x: dotX,
    y: dotY,
    width: dotSize,
    height: dotSize,
    color: props.dotStyle?.backgroundColor ?? DOT_COLOR,
    opacity: style.opacity,
    borderRadius: dotSize / 2,
  });
}
