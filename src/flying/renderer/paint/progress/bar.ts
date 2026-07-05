import type { Window } from '@/flying/app';
import {
  Palette,
  ProgressBarOrientation,
  ProgressFlowDirection,
} from '@/flying/widget';
import type { ProgressBarProps } from '@/flying/widget/progress';
import { clamp } from '@utility/common';
import type { PaintOptions } from '../types';
import { paintBorder } from '../utility';

export function paintProgressBar(window: Window, options: PaintOptions): void {
  const { renderer, layout } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as ProgressBarProps;

  const isHorizontal = props.orientation === ProgressBarOrientation.Horizontal;
  const isForward = props.flowDirection === ProgressFlowDirection.Forward;

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

  const fillW = isHorizontal ? width * ratio : width;
  const fillH = isHorizontal ? height : height * ratio;
  const fillX = isHorizontal && !isForward ? x + width - fillW : x;
  const fillY = isHorizontal ? y : isForward ? y : y + height - fillH;

  const bar = props.fillStyle ?? {};

  paintBorder(window, {
    x: fillX,
    y: fillY,
    width: fillW,
    height: fillH,
    renderer,
    style: bar,
  });

  renderer.drawRect(window, {
    x: fillX,
    y: fillY,
    width: fillW,
    height: fillH,
    color: bar.backgroundColor ?? Palette.accent,
    borderRadius: bar.borderRadius,
    opacity: bar.opacity,
  });
}
