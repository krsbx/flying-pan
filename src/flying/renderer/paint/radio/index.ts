import type { Window } from '@flying/app';
import { Palette, type RadioProps } from '@flying/widget';
import type { SubMarkPaintOptions } from '../types';
import { paintBackground, paintBorder, resolveStyle } from '../utility';

const DOT_INSET = 0.5;

export function paintRadio(window: Window, options: SubMarkPaintOptions) {
  const { renderer, layout, checked, hovered, focused, pressed, disabled } =
    options;
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
    disabled,
  });

  paintBorder(window, {
    x: dotX,
    y: dotY,
    width: dotSize,
    height: dotSize,
    style: {
      borderRadius: dotSize / 2,
      ...dot,
    },
    renderer,
  });

  paintBackground(window, {
    x: dotX,
    y: dotY,
    width: dotSize,
    height: dotSize,
    style: {
      backgroundColor: Palette.accent,
      borderRadius: dotSize / 2,
      ...dot,
    },
    renderer,
  });
}
