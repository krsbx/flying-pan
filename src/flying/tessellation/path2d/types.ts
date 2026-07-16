import type { Coordinate2D, Resolution } from '@flying/types';

export interface RectOptions extends Coordinate2D, Resolution {}

export interface ArcOptions {
  center: Coordinate2D;
  radius: number;
  startAngle: number;
  endAngle: number;
  anticlockwise?: boolean;
}

export interface ArcToOptions {
  from: Coordinate2D;
  via: Coordinate2D;
  to: Coordinate2D;
  radius: number;
}

export interface QuadraticCurveToOptions {
  control: Coordinate2D;
  to: Coordinate2D;
}

export interface BezierCurveToOptions {
  control1: Coordinate2D;
  control2: Coordinate2D;
  to: Coordinate2D;
}
