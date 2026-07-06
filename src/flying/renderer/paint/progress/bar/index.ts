import type { Window } from '@/flying/app';
import {
  Palette,
  ProgressBarOrientation,
  ProgressDirection,
} from '@/flying/widget';
import type { ProgressBarProps } from '@/flying/widget/progress';
import type { PaintOptions } from '../../types';
import { paintInlineLabel } from '../label';
import { calculateProgressRatio } from '../utility';
import { paintContinuousFill } from './continuous';
import { paintSteppedFill } from './step';

export function paintProgressBar(window: Window, options: PaintOptions): void {
  const { renderer, ctx, layout } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as ProgressBarProps;

  const isHorizontal = props.orientation === ProgressBarOrientation.Horizontal;
  const isForward = props.direction === ProgressDirection.Forward;

  const ratio = calculateProgressRatio(props);

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
