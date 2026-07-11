import type { Window } from '@flying/app';
import { valueToRatio } from '@flying/utility/common';
import {
  CircularProgressDirection,
  Palette,
  ProgressType,
  type CircularProgressProps,
} from '@flying/widget';
import { paintInlineValueLabel } from '../text';
import type { PaintOptions } from '../types';
import { drawArcSegment, resolveFillColorClamped } from '../utility';
import { paintIndeterminateCircularProgress } from './indeterminate';

export function paintCircularProgress(
  window: Window,
  options: PaintOptions
): void {
  const { renderer, ctx, layout } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as CircularProgressProps;

  if (props.type === ProgressType.Indeterminate) {
    paintIndeterminateCircularProgress(window, options);
    return;
  }

  const ratio = valueToRatio({
    value: props.value ?? 0,
    max: props.max ?? 1,
    min: props.min ?? 0,
  });

  const cx = x + width / 2;
  const cy = y + height / 2;
  const radius = Math.min(width, height) / 2;

  const startAngle = props.startAngle ?? -Math.PI / 2;
  const directionSign =
    props.direction === CircularProgressDirection.CounterClockwise ? -1 : 1;

  const fillStyle = props.fillStyle ?? {};
  const thickness = props.thickness ?? 0.1;
  const innerRadius = radius * (1 - thickness);

  const bufRatio = valueToRatio({
    value: props.buffer ?? 0,
    max: props.max ?? 1,
    min: props.min ?? 0,
  });

  if (bufRatio > 0) {
    const bufferColor =
      props.bufferStyle?.backgroundColor ??
      fillStyle.backgroundColor ??
      Palette.accent;

    const bufferOpacity = props.bufferStyle?.opacity ?? 0.35;

    drawArcSegment(window, {
      renderer,
      cx,
      cy,
      radius,
      innerRadius,
      startAngle,
      endAngle: startAngle + directionSign * Math.PI * 2 * bufRatio,
      color: bufferColor,
      opacity: bufferOpacity,
    });
  }

  const mainColor = resolveFillColorClamped({
    ratio,
    fillStyle,
    colorStops: props.colorStops,
  });

  drawArcSegment(window, {
    renderer,
    cx,
    cy,
    radius,
    innerRadius,
    startAngle,
    endAngle: startAngle + directionSign * Math.PI * 2 * ratio,
    color: mainColor,
    opacity: fillStyle.opacity,
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
    value: props.value,
    min: props.min,
    max: props.max,
    showValue: props.showValue,
  });
}
