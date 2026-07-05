import type { Window } from '@/flying/app';
import type { RadioProps } from '@/flying/widget';
import type { SubMarkPaintOptions } from '../types';
import { paintBorder, resolveStyle } from '../utility';

const DOT_COLOR = '#1a73e8';

const DOT_INSET = 0.5;

export function paintRadio(window: Window, options: SubMarkPaintOptions) {
  const { renderer, layout, checked, hovered, focused, pressed } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as RadioProps;

  if (!checked) return;

  const dotSize = Math.min(width, height) * (props.dotSize ?? DOT_INSET);
  const dotX = x + (width - dotSize) / 2;
  const dotY = y + (height - dotSize) / 2;

  const dot = resolveStyle({
    style: props.dotStyle ?? {},
    hovered,
    focused,
    pressed,
    checked,
  });

  paintBorder(window, {
    x: dotX,
    y: dotY,
    width: dotSize,
    height: dotSize,
    renderer,
    style: dot,
  });

  renderer.drawRect(window, {
    x: dotX,
    y: dotY,
    width: dotSize,
    height: dotSize,
    color: dot.backgroundColor ?? DOT_COLOR,
    opacity: dot.opacity,
    borderRadius: dot.borderRadius ?? dotSize / 2,
  });
}
