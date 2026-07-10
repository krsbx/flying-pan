import type { RangeSliderState } from '@/flying/widget/slider/types';
import type { Window } from '@flying/app';
import { valueToRatio } from '@flying/utility/common';
import type { RangeSliderBarProps } from '@flying/widget';
import { Palette, ProgressBarOrientation } from '@flying/widget';
import { HANDLE_SIZE, TRACK_THICKNESS } from '@flying/widget/slider/constant';
import { makeRangeSliderState } from '@flying/widget/slider/state';
import { paintInlineLabel } from '../text';
import type { SubMarkPaintOptions } from '../types';
import {
  paintBackground,
  resolveFillColorClamped,
  resolveStyle,
} from '../utility';
import { paintSliderHandle } from './handle';
import { paintSliderMarks } from './marks';

export function paintRangeSlider(window: Window, options: SubMarkPaintOptions) {
  const {
    renderer,
    ctx,
    layout,
    checked,
    hovered,
    focused,
    pressed,
    disabled,
  } = options;
  const { widget, x, y, width, height, stableId } = layout;
  const props = widget.props as RangeSliderBarProps;

  const min = props.min ?? 0;
  const max = props.max ?? 100;
  const state = ctx.stateStore.stateFor<RangeSliderState>({
    stableId,
    initial: makeRangeSliderState(props),
  });
  const start = props.value?.[0] ?? state.start;
  const end = props.value?.[1] ?? state.end;
  const startRatio = valueToRatio({ value: start, min, max });
  const endRatio = valueToRatio({ value: end, min, max });
  const isVertical = props.orientation === ProgressBarOrientation.Vertical;

  const trackX = isVertical ? x + (width - TRACK_THICKNESS) / 2 : x;
  const trackY = isVertical ? y : y + (height - TRACK_THICKNESS) / 2;
  const trackW = isVertical ? TRACK_THICKNESS : width;
  const trackH = isVertical ? height : TRACK_THICKNESS;

  const startHandleX = isVertical
    ? x + (width - HANDLE_SIZE) / 2
    : x + startRatio * (width - HANDLE_SIZE);
  const startHandleY = isVertical
    ? y + (1 - startRatio) * (height - HANDLE_SIZE)
    : y + (height - HANDLE_SIZE) / 2;
  const endHandleX = isVertical
    ? x + (width - HANDLE_SIZE) / 2
    : x + endRatio * (width - HANDLE_SIZE);
  const endHandleY = isVertical
    ? y + (1 - endRatio) * (height - HANDLE_SIZE)
    : y + (height - HANDLE_SIZE) / 2;

  const track = resolveStyle({
    style: props.trackStyle ?? {},
    hovered,
    focused,
    pressed,
    checked,
    disabled,
  });
  const filled = resolveStyle({
    style: props.filledStyle ?? {},
    hovered,
    focused,
    pressed,
    checked,
    disabled,
  });
  const handle = resolveStyle({
    style: props.handleStyle ?? {},
    hovered,
    focused,
    pressed,
    checked,
    disabled,
  });

  paintBackground(window, {
    x: trackX,
    y: trackY,
    width: trackW,
    height: trackH,
    style: {
      backgroundColor: Palette.surfaceActive,
      borderRadius: TRACK_THICKNESS / 2,
      ...track,
    },
    renderer,
  });

  const midRatio = (startRatio + endRatio) / 2;
  const filledColor = resolveFillColorClamped({
    ratio: midRatio,
    fillStyle: filled,
    colorStops: props.colorStops,
  });

  if (isVertical) {
    // Vertical: values increase upward — end handle is above start handle.
    // Filled region spans from end handle center to start handle center.
    const filledY = endHandleY + HANDLE_SIZE / 2;
    const filledH = startHandleY - endHandleY;

    paintBackground(window, {
      x: trackX,
      y: filledY,
      width: TRACK_THICKNESS,
      height: filledH,
      style: {
        borderRadius: TRACK_THICKNESS / 2,
        ...filled,
        backgroundColor: filledColor,
      },
      renderer,
    });
  } else {
    const filledX = startHandleX + HANDLE_SIZE / 2;
    const filledW = endHandleX - startHandleX;

    paintBackground(window, {
      x: filledX,
      y: trackY,
      width: filledW,
      height: TRACK_THICKNESS,
      style: {
        borderRadius: TRACK_THICKNESS / 2,
        ...filled,
        backgroundColor: filledColor,
      },
      renderer,
    });
  }

  paintSliderMarks({
    window,
    renderer,
    ctx,
    marks: props.marks ?? [],
    min,
    max,
    x,
    y,
    width,
    height,
    trackX,
    trackY,
    isVertical,
    font: props.font,
  });

  paintSliderHandle(window, {
    renderer,
    x: startHandleX,
    y: startHandleY,
    handle,
  });
  paintSliderHandle(window, {
    renderer,
    x: endHandleX,
    y: endHandleY,
    handle,
  });

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
      style: props.labelStyle ?? {},
    });
  }
}
