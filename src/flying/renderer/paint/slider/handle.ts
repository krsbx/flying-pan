import type { Window } from '@flying/app';
import type { Renderer } from '@flying/renderer';
import { Metrics, Palette, type ViewStyle } from '@flying/widget';
import { HANDLE_SIZE } from '@flying/widget/slider/constant';
import { paintBackground, paintBorder } from '../utility';

export function paintSliderHandle(
  window: Window,
  options: {
    renderer: Renderer;
    x: number;
    y: number;
    handle: ViewStyle;
  }
): void {
  const { renderer, x, y, handle } = options;

  paintBorder(window, {
    x,
    y,
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    style: {
      borderWidth: Metrics.borderWidth,
      borderColor: Palette.border,
      borderRadius: HANDLE_SIZE / 2,
      ...handle,
    },
    renderer,
  });

  paintBackground(window, {
    x,
    y,
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    style: {
      backgroundColor: Palette.surface,
      borderRadius: HANDLE_SIZE / 2,
      ...handle,
    },
    renderer,
  });
}
