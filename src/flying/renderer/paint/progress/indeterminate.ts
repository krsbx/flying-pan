import { EasingName, easings } from '@flying/animation';
import type { Window } from '@flying/app';
import {
  CircularProgressDirection,
  Palette,
  ProgressBarOrientation,
  ProgressDirection,
  type CircularProgressProps,
  type ProgressBarProps,
} from '@flying/widget';
import type { PaintOptions } from '../types';
import { drawArcSegment, paintBackground } from '../utility';

const INDETERMINATE_BAR_DURATION = 1500;
const INDETERMINATE_CIRCULAR_DURATION = 2000;
const INDETERMINATE_SEGMENT = 0.4;
const INDETERMINATE_SWEEP = Math.PI * 1.5;

export function paintIndeterminateProgressBar(
  window: Window,
  options: PaintOptions
): void {
  const { renderer, ctx, layout } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as ProgressBarProps;

  const cycle =
    (ctx.animationManager.time % INDETERMINATE_BAR_DURATION) /
    INDETERMINATE_BAR_DURATION;
  const eased = easings[EasingName.EaseInOut](cycle);

  const isHorizontal = props.orientation === ProgressBarOrientation.Horizontal;
  const isForward = props.direction === ProgressDirection.Forward;

  const trackSize = isHorizontal ? width : height;
  const segSize = trackSize * INDETERMINATE_SEGMENT;
  const travel = trackSize + segSize;

  const segStart = isForward
    ? eased * travel - segSize
    : trackSize - eased * travel;

  const visStart = Math.max(segStart, 0);
  const visEnd = Math.min(segStart + segSize, trackSize);
  const visSize = visEnd - visStart;

  if (visSize > 0) {
    const fillStyle = {
      backgroundColor: Palette.accent,
      ...props.fillStyle,
    };

    paintBackground(window, {
      x: isHorizontal ? x + visStart : x,
      y: isHorizontal ? y : y + visStart,
      width: isHorizontal ? visSize : width,
      height: isHorizontal ? height : visSize,
      style: fillStyle,
      renderer,
    });
  }
}

export function paintIndeterminateCircularProgress(
  window: Window,
  options: PaintOptions
): void {
  const { renderer, ctx, layout } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as CircularProgressProps;

  const cycle =
    (ctx.animationManager.time % INDETERMINATE_CIRCULAR_DURATION) /
    INDETERMINATE_CIRCULAR_DURATION;

  const dirSign =
    props.direction === CircularProgressDirection.CounterClockwise ? -1 : 1;
  const startAngle = props.startAngle ?? -Math.PI / 2;

  const arcStart = startAngle + dirSign * cycle * Math.PI * 2;
  const arcEnd = arcStart + dirSign * INDETERMINATE_SWEEP;

  const radius = Math.min(width, height) / 2;
  const thickness = props.thickness ?? 0.1;
  const innerRadius = radius * (1 - thickness);
  const fillStyle = props.fillStyle ?? {};
  const color = fillStyle.backgroundColor ?? Palette.accent;

  drawArcSegment(window, {
    renderer,
    cx: x + width / 2,
    cy: y + height / 2,
    radius,
    innerRadius,
    startAngle: arcStart,
    endAngle: arcEnd,
    color,
    opacity: fillStyle.opacity,
  });
}
