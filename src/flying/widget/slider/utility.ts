import { HANDLE_SIZE } from './constant';

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
