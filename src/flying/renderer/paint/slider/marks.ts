import type { Window } from '@flying/app';
import type { Renderer } from '@flying/renderer';
import { valueToRatio } from '@flying/utility/common';
import { Palette } from '@flying/widget';
import {
  TICK_LABEL_FONT_SIZE,
  TICK_SIZE,
  TRACK_THICKNESS,
} from '@flying/widget/slider/constant';
import type { SliderMark } from '@flying/widget/slider/types';
import { paintInlineLabel } from '../text';
import type { PaintContext } from '../types';
import { paintBackground } from '../utility';

export interface PaintSliderMarksOptions {
  window: Window;
  renderer: Renderer;
  ctx: PaintContext;
  marks: SliderMark[];
  min: number;
  max: number;
  x: number;
  y: number;
  width: number;
  height: number;
  trackX: number;
  trackY: number;
  isVertical: boolean;
  font?: string;
}

export function paintSliderMarks(options: PaintSliderMarksOptions): void {
  const {
    window,
    renderer,
    ctx,
    marks,
    min,
    max,
    x,
    y,
    width,
    height,
    trackX,
    trackY,
    isVertical,
    font,
  } = options;

  if (!marks || marks.length === 0) return;

  for (const mark of marks) {
    if (mark.value < min || mark.value > max) continue;

    const markRatio = valueToRatio({ value: mark.value, min, max });

    if (isVertical) {
      const my = y + (1 - markRatio) * height;

      paintBackground(window, {
        x: trackX + (TRACK_THICKNESS - TICK_SIZE) / 2,
        y: my - TICK_SIZE / 2,
        width: TICK_SIZE,
        height: TICK_SIZE,
        style: { backgroundColor: Palette.border },
        renderer,
      });

      if (mark.label && font) {
        paintInlineLabel(window, {
          renderer,
          ctx,
          x: trackX + TRACK_THICKNESS + 2,
          y: my - TICK_LABEL_FONT_SIZE,
          width: 40,
          height: TICK_LABEL_FONT_SIZE + 2,
          label: mark.label,
          font,
          style: { fontSize: TICK_LABEL_FONT_SIZE },
        });
      }
    } else {
      const mx = x + markRatio * width;

      paintBackground(window, {
        x: mx - TICK_SIZE / 2,
        y: trackY + (TRACK_THICKNESS - TICK_SIZE) / 2,
        width: TICK_SIZE,
        height: TICK_SIZE,
        style: { backgroundColor: Palette.border },
        renderer,
      });

      if (mark.label && font) {
        paintInlineLabel(window, {
          renderer,
          ctx,
          x: mx - 20,
          y: trackY + TRACK_THICKNESS + 2,
          width: 40,
          height: TICK_LABEL_FONT_SIZE + 2,
          label: mark.label,
          font,
          style: { fontSize: TICK_LABEL_FONT_SIZE },
        });
      }
    }
  }
}
