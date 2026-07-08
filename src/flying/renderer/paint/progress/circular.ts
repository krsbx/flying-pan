import type { Window } from '@flying/app';
import { valueToRatio } from '@flying/utility/common';
import {
  CircularProgressDirection,
  Palette,
  type CircularProgressProps,
} from '@flying/widget';
import type { PaintOptions } from '../types';
import { paintInlineLabel } from './label';
import { formatValueLabel, resolveFillColorClamped } from './utility';

export function paintCircularProgress(
  window: Window,
  options: PaintOptions
): void {
  const { renderer, ctx, layout } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as CircularProgressProps;

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

  const drawArcShape = (
    arcRatio: number,
    arcColor: string,
    arcOpacity?: number
  ) => {
    if (arcRatio <= 0) return;
    const endAngle = startAngle + directionSign * Math.PI * 2 * arcRatio;

    if (thickness >= 1) {
      renderer.drawArc(window, {
        cx,
        cy,
        radius,
        startAngle,
        endAngle,
        color: arcColor,
        opacity: arcOpacity,
      });
    } else {
      renderer.drawRing(window, {
        cx,
        cy,
        outerRadius: radius,
        innerRadius,
        startAngle,
        endAngle,
        color: arcColor,
        opacity: arcOpacity,
      });
    }
  };

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
    drawArcShape(bufRatio, bufferColor, bufferOpacity);
  }

  const mainColor = props.colorStops
    ? resolveFillColorClamped({
        ratio,
        fillStyle,
        colorStops: props.colorStops,
      })
    : (fillStyle.backgroundColor ?? Palette.accent);
  drawArcShape(ratio, mainColor, fillStyle.opacity);

  const labelText =
    props.label ??
    formatValueLabel({
      value: props.value,
      min: props.min,
      max: props.max,
      format: props.showValue,
    });

  if (labelText && props.font) {
    paintInlineLabel(window, {
      renderer,
      ctx,
      x,
      y,
      width,
      height,
      label: labelText,
      font: props.font,
      style: props.labelStyle ?? {},
    });
  }
}
