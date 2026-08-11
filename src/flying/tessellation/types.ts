import type { Coordinate2D } from '../types';
import type { FillRule, PathCommandType } from './constant';

export interface MovePathCommand {
  type: typeof PathCommandType.Move;
  to: Coordinate2D;
}

export interface LinePathCommand {
  type: typeof PathCommandType.Line;
  to: Coordinate2D;
}

export interface QuadraticPathCommand {
  type: typeof PathCommandType.Quadratic;
  control: Coordinate2D;
  to: Coordinate2D;
}

export interface CubicPathCommand {
  type: typeof PathCommandType.Cubic;
  control1: Coordinate2D;
  control2: Coordinate2D;
  to: Coordinate2D;
}

export interface ArcPathCommand {
  type: typeof PathCommandType.Arc;
  center: Coordinate2D;
  radius: number;
  startAngle: number;
  endAngle: number;
  anticlockwise?: boolean;
}

export interface ClosePathCommand {
  type: typeof PathCommandType.Close;
}

export type PathCommand =
  | MovePathCommand
  | LinePathCommand
  | QuadraticPathCommand
  | CubicPathCommand
  | ArcPathCommand
  | ClosePathCommand;

export interface TriangleList {
  positions: number[]; // flat [x,y, x,y, ...]
  colors?: number[]; // optional flat [r,g,b,a, ...] — length = vertexCount * 4
  vertexCount: number;
}

export interface TessellateOptions {
  fillRule?: FillRule; // default FillRule.NONZERO
  tolerance?: number; // default 0.5 — max px deviation for curve flattening
}

export interface Polygon {
  outer: Coordinate2D[];
  holes: Coordinate2D[][];
}

/**
 * A flattened polyline contour — the stroke-side analog of {@link Polygon}.
 * `closed` is true when the path emitted a `closePath` command for this
 * contour; open contours get butt caps at their endpoints.
 */
export interface Polyline {
  points: Coordinate2D[];
  closed: boolean;
}
