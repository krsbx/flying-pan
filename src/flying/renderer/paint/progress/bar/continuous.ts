import type { Window } from '@flying/app';
import type { Renderer } from '@flying/renderer/renderer';
import { Palette, type ViewStyle } from '@flying/widget';
import { paintBorder } from '../../utility';

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

  renderer.drawRect(window, {
    x: fillX,
    y: fillY,
    width: fillW,
    height: fillH,
    color: fillStyle.backgroundColor ?? Palette.accent,
    borderRadius: fillStyle.borderRadius,
    opacity: fillStyle.opacity,
  });
}
