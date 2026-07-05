import type { Window } from '@/flying/app';
import { Palette } from '@/flying/widget';
import type { ToggleProps } from '@/flying/widget/toggle';
import type { SubMarkPaintOptions } from '../types';
import { paintBorder, resolveStyle } from '../utility';

const KNOB_INSET = 1;

export function paintToggle(window: Window, options: SubMarkPaintOptions) {
  const { renderer, layout, checked, hovered, focused, pressed, disabled } =
    options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as ToggleProps;

  const half = width / 2;
  const markWidth = half - KNOB_INSET;
  const markHeight = height - KNOB_INSET * 2;
  const markX = checked ? x + half : x + KNOB_INSET;
  const markY = y + KNOB_INSET;

  const knob = resolveStyle({
    style: props.knobStyle ?? {},
    hovered,
    focused,
    pressed,
    checked,
    disabled,
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
    color: knob.backgroundColor ?? Palette.surface,
    opacity: knob.opacity,
    borderRadius: knob.borderRadius ?? markHeight / 2,
  });
}
