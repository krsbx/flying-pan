import type { Coordinate2D } from '@flying/types';
import { CircularProgressDirection } from '../constant';
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
  node: {
    screenX: number;
    screenY: number;
    width: number;
    height: number;
  }
): CircularGeometry {
  return {
    cx: node.screenX + node.width / 2,
    cy: node.screenY + node.height / 2,
    startAngle: props.startAngle ?? DEFAULT_START_ANGLE,
    sweep: props.sweep ?? DEFAULT_SWEEP,
    direction:
      props.direction === CircularProgressDirection.CounterClockwise ? -1 : 1,
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

export function isOnBarHandle(options: {
  position: Coordinate2D;
  node: {
    screenX: number;
    screenY: number;
    width: number;
    height: number;
  };
  ratio: number;
  isVertical: boolean;
}): boolean {
  const { position, node, ratio, isVertical } = options;
  const hx = isVertical
    ? node.screenX + (node.width - HANDLE_SIZE) / 2
    : node.screenX + ratio * (node.width - HANDLE_SIZE);
  const hy = isVertical
    ? node.screenY + (1 - ratio) * (node.height - HANDLE_SIZE)
    : node.screenY + (node.height - HANDLE_SIZE) / 2;

  return (
    position.x >= hx &&
    position.x <= hx + HANDLE_SIZE &&
    position.y >= hy &&
    position.y <= hy + HANDLE_SIZE
  );
}

export function isOnCircularHandle(options: {
  position: Coordinate2D;
  geo: CircularGeometry;
  value: number;
  size: number;
  thickness: number;
}): boolean {
  const { position, geo, value, size, thickness } = options;
  const ratio = geo.max > geo.min ? (value - geo.min) / (geo.max - geo.min) : 0;
  const handleAngle = geo.startAngle + geo.direction * geo.sweep * ratio;
  const radius = size / 2;
  const innerRadius = radius * (1 - thickness);
  const midRadius = (radius + innerRadius) / 2;
  const handleCx = geo.cx + Math.cos(handleAngle) * midRadius;
  const handleCy = geo.cy + Math.sin(handleAngle) * midRadius;
  const dist = Math.hypot(position.x - handleCx, position.y - handleCy);

  return dist <= HANDLE_SIZE / 2;
}
