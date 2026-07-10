import type { Window } from '@flying/app';
import { valueToRatio } from '@flying/utility/common';
import type { ProgressBarProps } from '@flying/widget';
import { ProgressBarOrientation, ProgressDirection } from '@flying/widget';
import { paintContinuousFill, paintSteppedFill } from '../fill';
import { paintInlineValueLabel } from '../text';
import type { PaintOptions } from '../types';
import { resolveFillColorClamped } from '../utility';

export function paintProgressBar(window: Window, options: PaintOptions): void {
  const { renderer, ctx, layout } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as ProgressBarProps;

  const isHorizontal = props.orientation === ProgressBarOrientation.Horizontal;
  const isForward = props.direction === ProgressDirection.Forward;

  const ratio = valueToRatio({
    value: props.value ?? 0,
    max: props.max ?? 1,
    min: props.min ?? 0,
  });

  const fillStyle = props.fillStyle ?? {};
  const steps = props.steps ?? 0;

  const bufRatio = valueToRatio({
    value: props.buffer ?? 0,
    max: props.max ?? 1,
    min: props.min ?? 0,
  });

  if (bufRatio > 0) {
    const bufferStyle = {
      ...fillStyle,
      opacity: props.bufferStyle?.opacity ?? 0.35,
      ...props.bufferStyle,
    };

    if (steps > 1) {
      paintSteppedFill(window, {
        renderer,
        x,
        y,
        width,
        height,
        isHorizontal,
        isForward,
        steps,
        stepGap: props.stepGap ?? 2,
        filledSegments: Math.round(bufRatio * steps),
        fillStyle: bufferStyle,
      });
    } else {
      paintContinuousFill(window, {
        renderer,
        x,
        y,
        width,
        height,
        isHorizontal,
        isForward,
        ratio: bufRatio,
        fillStyle: bufferStyle,
      });
    }
  }

  if (steps > 1) {
    paintSteppedFill(window, {
      renderer,
      x,
      y,
      width,
      height,
      isHorizontal,
      isForward,
      steps,
      stepGap: props.stepGap ?? 2,
      filledSegments: Math.round(ratio * steps),
      fillStyle,
      colorStops: props.colorStops,
    });
  } else {
    paintContinuousFill(window, {
      renderer,
      x,
      y,
      width,
      height,
      isHorizontal,
      isForward,
      ratio,
      fillStyle,
      colorOverride: props.colorStops
        ? resolveFillColorClamped({
            ratio,
            fillStyle,
            colorStops: props.colorStops,
          })
        : undefined,
    });
  }

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
