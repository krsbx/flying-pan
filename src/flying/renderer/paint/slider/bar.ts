import type { Window } from '@flying/app';
import { valueToRatio } from '@flying/utility/common';
import type { SliderBarProps } from '@flying/widget';
import { Palette, ProgressBarOrientation } from '@flying/widget';
import { HANDLE_SIZE, TRACK_THICKNESS } from '@flying/widget/slider/constant';
import { makeSliderState } from '@flying/widget/slider/state';
import { paintInlineValueLabel } from '../text';
import type { SubMarkPaintOptions } from '../types';
import {
  paintBackground,
  resolveFillColorClamped,
  resolveStyle,
} from '../utility';
import { paintSliderHandle } from './handle';
import { paintSliderMarks } from './marks';

export function paintSlider(window: Window, options: SubMarkPaintOptions) {
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
  const props = widget.props as SliderBarProps;

  const min = props.min ?? 0;
  const max = props.max ?? 100;
  const value =
    props.value ??
    ctx.stateStore.stateFor<number>({
      stableId,
      initial: makeSliderState(props),
    });
  const ratio = valueToRatio({ value, min, max });
  const isVertical = props.orientation === ProgressBarOrientation.Vertical;

  const trackX = isVertical ? x + (width - TRACK_THICKNESS) / 2 : x;
  const trackY = isVertical ? y : y + (height - TRACK_THICKNESS) / 2;
  const trackW = isVertical ? TRACK_THICKNESS : width;
  const trackH = isVertical ? height : TRACK_THICKNESS;

  const handleX = isVertical
    ? x + (width - HANDLE_SIZE) / 2
    : x + ratio * (width - HANDLE_SIZE);
  const handleY = isVertical
    ? y + (1 - ratio) * (height - HANDLE_SIZE)
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

  const filledX = isVertical ? trackX : x;
  const filledY = isVertical ? handleY + HANDLE_SIZE / 2 : trackY;
  const filledW = isVertical ? TRACK_THICKNESS : handleX - x + HANDLE_SIZE / 2;
  const filledH = isVertical ? y + height - filledY : TRACK_THICKNESS;

  const filledColor = resolveFillColorClamped({
    ratio,
    fillStyle: filled,
    colorStops: props.colorStops,
  });

  paintBackground(window, {
    x: filledX,
    y: filledY,
    width: filledW,
    height: filledH,
    style: {
      borderRadius: TRACK_THICKNESS / 2,
      ...filled,
      backgroundColor: filledColor,
    },
    renderer,
  });

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
    x: handleX,
    y: handleY,
    handle,
  });

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
    value,
    min,
    max,
    showValue: props.showValue,
  });
}
