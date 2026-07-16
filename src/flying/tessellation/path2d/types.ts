import type { Coordinate2D, Resolution } from '@flying/types';

export interface RectOptions extends Coordinate2D, Resolution {}

export interface ArcOptions {
  center: Coordinate2D;
  radius: number;
  startAngle: number;
  endAngle: number;
  anticlockwise?: boolean;
}
