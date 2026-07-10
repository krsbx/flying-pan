import type { ColorStop } from '@/flying/widget/progress/types';
import type { Window } from '@flying/app';
import type { Renderer } from '@flying/renderer';
import type { ViewStyle } from '@flying/widget';
import { Palette } from '@flying/widget';
import { paintBackground, paintBorder } from '../../utility';
import { resolveFillColorClamped } from '../../utility';

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
  /**
   * If provided, each segment is colored by its midpoint ratio (segment `i`
   * of `steps` sits at `(i + 0.5) / steps`). Falls back to
   * `fillStyle.backgroundColor`.
   */
  colorStops?: ColorStop[];
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
    colorStops,
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

    // For color stops, this segment sits at the midpoint of [i/steps, (i+1)/steps].
    const colorOverride = colorStops
      ? resolveFillColorClamped({
          ratio: (i + 0.5) / steps,
          fillStyle,
          colorStops,
        })
      : undefined;

    paintBorder(window, {
      x: segX,
      y: segY,
      width: segW,
      height: segH,
      style: fillStyle,
      renderer,
    });

    paintBackground(window, {
      x: segX,
      y: segY,
      width: segW,
      height: segH,
      style: {
        backgroundColor: Palette.accent,
        ...fillStyle,
      },
      renderer,
      colorOverride,
    });
  }
}
