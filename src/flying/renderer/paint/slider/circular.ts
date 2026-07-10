import type { Window } from '@flying/app';
import { valueToRatio } from '@flying/utility/common';
import type { CircularSliderProps } from '@flying/widget';
import { CircularSliderDirection, Metrics, Palette } from '@flying/widget';
import {
  DEFAULT_START_ANGLE,
  DEFAULT_SWEEP,
  DEFAULT_THICKNESS,
  HANDLE_SIZE,
} from '@flying/widget/slider/constant';
import { makeSliderState } from '@flying/widget/slider/state';
import { paintInlineLabel } from '../progress/label';
import { formatValueLabel } from '../progress/utility';
import type { SubMarkPaintOptions } from '../types';
import { paintBackground, paintBorder, resolveStyle } from '../utility';

export function paintCircularSlider(
  window: Window,
  options: SubMarkPaintOptions
): void {
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
  const props = widget.props as CircularSliderProps;

  const min = props.min ?? 0;
  const max = props.max ?? 100;
  const value =
    props.value ??
    ctx.stateStore.stateFor<number>({
      stableId,
      initial: makeSliderState(props),
    });
  const ratio = valueToRatio({ value, min, max });

  const thickness = props.thickness ?? DEFAULT_THICKNESS;
  const startAngle = props.startAngle ?? DEFAULT_START_ANGLE;
  const sweep = props.sweep ?? DEFAULT_SWEEP;
  const dirSign =
    props.direction === CircularSliderDirection.CounterClockwise ? -1 : 1;

  const cx = x + width / 2;
  const cy = y + height / 2;
  const radius = Math.min(width, height) / 2;
  const innerRadius = radius * (1 - thickness);
  const midRadius = (radius + innerRadius) / 2;

  // Angle at the handle position.
  const handleAngle = startAngle + dirSign * sweep * ratio;

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

  const drawArcSegment = (
    segStart: number,
    segEnd: number,
    color: string,
    opacity?: number
  ) => {
    if (segStart === segEnd) return;

    if (thickness >= 1) {
      renderer.drawArc(window, {
        cx,
        cy,
        radius,
        startAngle: segStart,
        endAngle: segEnd,
        color,
        opacity,
      });
    } else {
      renderer.drawRing(window, {
        cx,
        cy,
        outerRadius: radius,
        innerRadius,
        startAngle: segStart,
        endAngle: segEnd,
        color,
        opacity,
      });
    }
  };

  drawArcSegment(
    startAngle,
    startAngle + dirSign * sweep,
    track.backgroundColor ?? Palette.surfaceActive,
    track.opacity
  );

  drawArcSegment(
    startAngle,
    handleAngle,
    filled.backgroundColor ?? Palette.accent,
    filled.opacity
  );

  const hx = cx + Math.cos(handleAngle) * midRadius;
  const hy = cy + Math.sin(handleAngle) * midRadius;
  const handleX = hx - HANDLE_SIZE / 2;
  const handleY = hy - HANDLE_SIZE / 2;

  paintBorder(window, {
    x: handleX,
    y: handleY,
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
    x: handleX,
    y: handleY,
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    style: {
      backgroundColor: Palette.surface,
      borderRadius: HANDLE_SIZE / 2,
      ...handle,
    },
    renderer,
  });

  const labelText =
    props.label ??
    formatValueLabel({
      value,
      min,
      max,
      format: props.showValue,
    });

  if (labelText && props.font) {
    paintInlineLabel(window, {
      renderer,
      ctx,
      x,
      y,
      width,
      height,
      label: labelText,
      font: props.font,
      style: props.labelStyle ?? {},
    });
  }
}
