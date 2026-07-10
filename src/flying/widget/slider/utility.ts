import { CircularSliderDirection } from '../constant';
import type { CircularSliderProps } from './circular';
import { DEFAULT_START_ANGLE, DEFAULT_SWEEP, HANDLE_SIZE } from './constant';
import type { CircularGeometry } from './types';

export function pointerToValue(options: {
  coord: number;
  start: number;
  length: number;
  flip?: boolean;
  min: number;
  max: number;
  step?: number;
}): number {
  const { coord, start, length, flip, min, max, step } = options;

  const usable = length - HANDLE_SIZE;
  const rel = flip
    ? start + length - HANDLE_SIZE / 2 - coord
    : coord - start - HANDLE_SIZE / 2;

  const ratio = Math.min(1, Math.max(0, rel / usable));
  const raw = min + ratio * (max - min);

  return step ? Math.round(raw / step) * step : raw;
}

export function resolveGeometry(
  props: CircularSliderProps,
  node: { x: number; y: number; width: number; height: number }
): CircularGeometry {
  return {
    cx: node.x + node.width / 2,
    cy: node.y + node.height / 2,
    startAngle: props.startAngle ?? DEFAULT_START_ANGLE,
    sweep: props.sweep ?? DEFAULT_SWEEP,
    direction:
      props.direction === CircularSliderDirection.CounterClockwise ? -1 : 1,
    min: props.min ?? 0,
    max: props.max ?? 100,
  };
}

const TAU = Math.PI * 2;

export function pointerToAngleValue(
  options: CircularGeometry & {
    pointerX: number;
    pointerY: number;
    step?: number;
  }
): number {
  const {
    pointerX,
    pointerY,
    cx,
    cy,
    startAngle,
    sweep,
    direction,
    min,
    max,
    step,
  } = options;

  const raw = Math.atan2(pointerY - cy, pointerX - cx);
  let rel = direction * (raw - startAngle);
  rel = ((rel % TAU) + TAU) % TAU;

  const clamped = Math.min(rel, sweep);
  const ratio = sweep > 0 ? clamped / sweep : 0;
  const rawValue = min + ratio * (max - min);

  return step ? Math.round(rawValue / step) * step : rawValue;
}
