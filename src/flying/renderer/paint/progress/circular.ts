import type { Window } from '@/flying/app';
import {
  CircularProgressDirection,
  Palette,
  type CircularProgressProps,
} from '@flying/widget';
import type { PaintOptions } from '../types';
import { paintInlineLabel } from './label';
import { calculateProgressRatio } from './utility';

export function paintCircularProgress(
  window: Window,
  options: PaintOptions
): void {
  const { renderer, ctx, layout } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as CircularProgressProps;

  const ratio = calculateProgressRatio(props);

  const cx = x + width / 2;
  const cy = y + height / 2;
  const radius = Math.min(width, height) / 2;

  const startAngle = props.startAngle ?? -Math.PI / 2;
  const directionSign =
    props.direction === CircularProgressDirection.CounterClockwise ? -1 : 1;
  const endAngle = startAngle + directionSign * Math.PI * 2 * ratio;

  const fillStyle = props.fillStyle ?? {};
  const color = fillStyle.backgroundColor ?? Palette.accent;
  const opacity = fillStyle.opacity;
  const thickness = props.thickness ?? 0.1;

  if (thickness >= 1) {
    renderer.drawArc(window, {
      cx,
      cy,
      radius,
      startAngle,
      endAngle,
      color,
      opacity,
    });
  } else {
    const innerRadius = radius * (1 - thickness);
    renderer.drawRing(window, {
      cx,
      cy,
      outerRadius: radius,
      innerRadius,
      startAngle,
      endAngle,
      color,
      opacity,
    });
  }

  if (props.label && props.font) {
    paintInlineLabel(window, {
      renderer,
      ctx,
      x,
      y,
      width,
      height,
      label: props.label,
      font: props.font,
      color: props.labelColor ?? Palette.text,
    });
  }
}
