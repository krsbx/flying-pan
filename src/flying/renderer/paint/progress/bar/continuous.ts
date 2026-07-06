import type { Window } from '@/flying/app';
import { Palette, type ViewStyle } from '@/flying/widget';
import type { Renderer } from '@flying/renderer/renderer';
import type { ValidColor } from '@flying/types';
import { paintBackground, paintBorder } from '../../utility';

interface ContinuousFillOptions {
  renderer: Renderer;
  x: number;
  y: number;
  width: number;
  height: number;
  isHorizontal: boolean;
  isForward: boolean;
  ratio: number;
  fillStyle: ViewStyle;
  /** If set, overrides `fillStyle.backgroundColor` (used by `colorStops`). */
  colorOverride?: ValidColor;
}

export function paintContinuousFill(
  window: Window,
  options: ContinuousFillOptions
) {
  const {
    renderer,
    x,
    y,
    width,
    height,
    isHorizontal,
    isForward,
    ratio,
    fillStyle,
    colorOverride,
  } = options;

  const fillW = isHorizontal ? width * ratio : width;
  const fillH = isHorizontal ? height : height * ratio;
  const fillX = isHorizontal && !isForward ? x + width - fillW : x;
  const fillY = isHorizontal ? y : isForward ? y : y + height - fillH;

  paintBorder(window, {
    x: fillX,
    y: fillY,
    width: fillW,
    height: fillH,
    renderer,
    style: fillStyle,
  });

  paintBackground(window, {
    x: fillX,
    y: fillY,
    width: fillW,
    height: fillH,
    style: {
      backgroundColor: Palette.accent,
      ...fillStyle,
    },
    colorOverride,
    renderer,
  });
}
