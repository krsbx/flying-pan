import type { Window } from '@flying/app';
import { valueToRatio } from '@flying/utility/common';
import type { CircularSliderProps } from '@flying/widget';
import { CircularProgressDirection, Palette } from '@flying/widget';
import {
  DEFAULT_START_ANGLE,
  DEFAULT_SWEEP,
  DEFAULT_THICKNESS,
  HANDLE_SIZE,
} from '@flying/widget/slider/constant';
import { makeSliderState } from '@flying/widget/slider/state';
import { paintSliderHandle } from './handle';
import { paintInlineValueLabel } from '../text';
import type { SubMarkPaintOptions } from '../types';
import {
  drawArcSegment,
  resolveFillColorClamped,
  resolveStyle,
} from '../utility';

export function paintCircularSlider(
  window: Window,
  options: SubMarkPaintOptions
): void {
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
  const props = widget.props as CircularSliderProps;

  const min = props.min ?? 0;
  const max = props.max ?? 100;
  const value =
    props.value ??
    ctx.stateStore.stateFor<number>({
      stableId,
      initial: makeSliderState(props),
    });
  const ratio = valueToRatio({ value, min, max });

  const thickness = props.thickness ?? DEFAULT_THICKNESS;
  const startAngle = props.startAngle ?? DEFAULT_START_ANGLE;
  const sweep = props.sweep ?? DEFAULT_SWEEP;
  const dirSign =
    props.direction === CircularProgressDirection.CounterClockwise ? -1 : 1;

  const cx = x + width / 2;
  const cy = y + height / 2;
  const radius = Math.min(width, height) / 2;
  const innerRadius = radius * (1 - thickness);
  const midRadius = (radius + innerRadius) / 2;

  // Angle at the handle position.
  const handleAngle = startAngle + dirSign * sweep * ratio;

  const track = resolveStyle({
    style: props.trackStyle ?? {},
    hovered,
    focused,
    pressed,
    checked,
    disabled,
  });
  const filled = resolveStyle({
    style: props.filledStyle ?? {},
    hovered,
    focused,
    pressed,
    checked,
    disabled,
  });
  const handle = resolveStyle({
    style: props.handleStyle ?? {},
    hovered,
    focused,
    pressed,
    checked,
    disabled,
  });

  drawArcSegment(window, {
    renderer,
    cx,
    cy,
    radius,
    innerRadius,
    startAngle,
    endAngle: startAngle + dirSign * sweep,
    color: track.backgroundColor ?? Palette.surfaceActive,
    opacity: track.opacity,
  });

  const filledColor = resolveFillColorClamped({
    ratio,
    fillStyle: filled,
    colorStops: props.colorStops,
  });

  drawArcSegment(window, {
    renderer,
    cx,
    cy,
    radius,
    innerRadius,
    startAngle,
    endAngle: handleAngle,
    color: filledColor,
    opacity: filled.opacity,
  });

  const hx = cx + Math.cos(handleAngle) * midRadius;
  const hy = cy + Math.sin(handleAngle) * midRadius;
  const handleX = hx - HANDLE_SIZE / 2;
  const handleY = hy - HANDLE_SIZE / 2;

  paintSliderHandle(window, {
    renderer,
    x: handleX,
    y: handleY,
    handle,
  });

  paintInlineValueLabel(window, {
    renderer,
    ctx,
    x,
    y,
    width,
    height,
    label: props.label,
    font: props.font,
    labelStyle: props.labelStyle,
    value,
    min,
    max,
    showValue: props.showValue,
  });
}
