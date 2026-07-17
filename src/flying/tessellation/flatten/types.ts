import type { Coordinate2D } from '@flying/types';

export interface QuadraticDeviationOptions {
  from: Coordinate2D;
  control: Coordinate2D;
  to: Coordinate2D;
}

export interface CubicDeviationOptions {
  from: Coordinate2D;
  control1: Coordinate2D;
  control2: Coordinate2D;
  to: Coordinate2D;
}

export interface FlattenQuadraticOptions {
  from: Coordinate2D;
  control: Coordinate2D;
  to: Coordinate2D;
  tolerance?: number;
}

export interface FlattenQuadraticRecursiveOptions {
  from: Coordinate2D;
  control: Coordinate2D;
  to: Coordinate2D;
  tolerance: number;
  depth: number;
}

export interface FlattenCubicOptions {
  from: Coordinate2D;
  control1: Coordinate2D;
  control2: Coordinate2D;
  to: Coordinate2D;
  tolerance?: number;
}

export interface FlattenCubicRecursiveOptions {
  from: Coordinate2D;
  control1: Coordinate2D;
  control2: Coordinate2D;
  to: Coordinate2D;
  tolerance: number;
  depth: number;
}

export interface FlattenArcOptions {
  center: Coordinate2D;
  radius: number;
  startAngle: number;
  endAngle: number;
  anticlockwise?: boolean;
  tolerance?: number;
}
