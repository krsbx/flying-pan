import type { Window } from '@/flying/app';
import {
  Palette,
  ProgressBarOrientation,
  ProgressDirection,
} from '@/flying/widget';
import type { ProgressBarProps } from '@/flying/widget/progress';
import { clamp } from '@utility/common';
import type { PaintOptions } from '../../types';
import { paintContinuousFill } from './continuous';
import { paintInlineLabel } from './label';
import { paintSteppedFill } from './step';

export function paintProgressBar(window: Window, options: PaintOptions): void {
  const { renderer, ctx, layout } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as ProgressBarProps;

  const isHorizontal = props.orientation === ProgressBarOrientation.Horizontal;
  const isForward = props.direction === ProgressDirection.Forward;

  const min = props.min ?? 0;
  const max = props.max ?? 1;
  const span = max - min;
  const value = props.value ?? 0;
  const ratio =
    span === 0
      ? 0
      : clamp({
          value: (value - min) / span,
          min: 0,
          max: 1,
        });

  const fillStyle = props.fillStyle ?? {};
  const steps = props.steps ?? 0;

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
