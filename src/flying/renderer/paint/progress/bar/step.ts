import type { Window } from '@flying/app';
import type { Renderer } from '@flying/renderer/renderer';
import { Palette, type ViewStyle } from '@flying/widget';
import { paintBorder } from '../../utility';

export interface SteppedFillOptions {
  renderer: Renderer;
  x: number;
  y: number;
  width: number;
  height: number;
  isHorizontal: boolean;
  isForward: boolean;
  steps: number;
  stepGap: number;
  filledSegments: number;
  fillStyle: ViewStyle;
}

export function paintSteppedFill(window: Window, options: SteppedFillOptions) {
  const {
    renderer,
    x,
    y,
    width,
    height,
    isHorizontal,
    isForward,
    steps,
    stepGap,
    filledSegments,
    fillStyle,
  } = options;

  // Total extent along the fill axis, minus the gaps between segments.
  const fillAxis = isHorizontal ? width : height;
  const crossAxis = isHorizontal ? height : width;
  const gapTotal = stepGap * (steps - 1);
  const segmentLong = Math.max(0, (fillAxis - gapTotal) / steps);
  const segmentShort = crossAxis;

  for (let i = 0; i < steps; i++) {
    // Forward: low indices fill first. Backward: high indices fill first.
    const isFilled = isForward
      ? i < filledSegments
      : i >= steps - filledSegments;
    if (!isFilled) continue; // track background shows through

    // Position along the fill axis (left edge for horizontal, top edge for vertical).
    const positionAlong = i * (segmentLong + stepGap);

    const segX = isHorizontal ? x + positionAlong : x;
    const segY = isHorizontal ? y : y + positionAlong;
    const segW = isHorizontal ? segmentLong : segmentShort;
    const segH = isHorizontal ? segmentShort : segmentLong;

    paintBorder(window, {
      x: segX,
      y: segY,
      width: segW,
      height: segH,
      renderer,
      style: fillStyle,
    });

    renderer.drawRect(window, {
      x: segX,
      y: segY,
      width: segW,
      height: segH,
      color: fillStyle.backgroundColor ?? Palette.accent,
      borderRadius: fillStyle.borderRadius,
      opacity: fillStyle.opacity,
    });
  }
}
