import type { Coordinate2D, RGBA, Size } from '@/flying/types';
import type { GradientCtx } from './gradient/types';

export interface DrawRectGLOptions extends Coordinate2D, Size {
  rgba?: RGBA;
  opacity?: number;
  gradientCtx?: GradientCtx;
}

export interface DrawRoundedGLRectOptions extends DrawRectGLOptions {
  radius: number;
}

export type DrawRoundedRectGLCornerOptions = DrawRoundedGLRectOptions;

export interface DrawArcGLOptions {
  /** The center of the arc */
  cx: number;
  cy: number;

  /** The radius of the arc */
  radius: number;

  /** The starting angle of the arc in radians */
  startAngle: number;
  endAngle: number;

  /** The number of segments to use to draw the arc */
  segments: number;
  rgba?: RGBA;

  gradientCtx?: GradientCtx;
  opacity?: number;
}
