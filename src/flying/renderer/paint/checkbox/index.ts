import type { Window } from '@flying/app';
import { Palette, type CheckboxProps } from '@flying/widget';
import type { SubMarkPaintOptions } from '../types';
import { paintBackground, paintBorder, resolveStyle } from '../utility';

const TICK_INSET = 0.5;

export function paintCheckbox(window: Window, options: SubMarkPaintOptions) {
  const {
    renderer,
    ctx,
    layout,
    checked,
    hovered,
    focused,
    pressed,
    disabled,
  } = options;
  const { widget, x, y, width, height, stableId } = layout;
  const props = widget.props as CheckboxProps;

  if (!checked) return;

  const markWidth = width * (props.tickSize ?? TICK_INSET);
  const markHeight = height * (props.tickSize ?? TICK_INSET);
  const markX = x + (width - markWidth) / 2;
  const markY = y + (height - markHeight) / 2;

  const tickResolved = resolveStyle({
    style: props.tickStyle ?? {},
    hovered,
    focused,
    pressed,
    checked,
    disabled,
  });
  const tick = props.tickStyle?.transition
    ? ctx.animationManager.applyOverlay(
        stableId,
        tickResolved,
        props.tickStyle.transition,
        'tick'
      )
    : tickResolved;

  paintBorder(window, {
    x: markX,
    y: markY,
    width: markWidth,
    height: markHeight,
    style: tick,
    renderer,
  });

  paintBackground(window, {
    x: markX,
    y: markY,
    width: markWidth,
    height: markHeight,
    style: {
      backgroundColor: Palette.textOnAccent,
      ...tick,
    },
    renderer,
  });
}
