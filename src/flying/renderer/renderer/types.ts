import type { BaseFontAtlas } from '@flying/fonts';
import type { Coordinate2D, RGBA, Size, ValidColor } from '@flying/types';
import type { BoxShadow, LinearGradient } from '@flying/widget';
import type { Texture } from '../texture/texture';

export interface DrawRectOptions extends Coordinate2D, Size {
  color: ValidColor;
  opacity?: number;
  borderRadius?: number | null;
}

export interface DrawGradientRectOptions extends Coordinate2D, Size {
  gradient: LinearGradient;
  opacity?: number;
  borderRadius?: number | null;
}

export interface GradientCtx {
  stops: readonly { pos: number; rgba: RGBA }[];
  origin: Coordinate2D;
  dir: Coordinate2D;
  invSpan: number;
}

export interface DrawShadowOptions extends Coordinate2D, Size {
  shadow: BoxShadow;
  borderRadius?: number | null;
}

export interface DrawRingOptions {
  /** The center of the arc */
  cx: number;
  cy: number;

  /** The radius of the arc */
  outerRadius: number;
  innerRadius: number;

  /** The starting angle of the arc in radians, defaults to 0 */
  startAngle?: number;
  /** The ending angle of the arc in radians, defaults to 2 * Math.PI */
  endAngle?: number;

  /** The number of segments to use to draw the arc */
  segments?: number;
  color: ValidColor;
  opacity?: number;
}

export interface DrawArcOptions {
  /** The center of the arc */
  cx: number;
  cy: number;

  /** The radius of the arc */
  radius: number;

  /** The starting angle of the arc in radians, defaults to 0 */
  startAngle?: number;
  /** The ending angle of the arc in radians, defaults to 2 * Math.PI */
  endAngle?: number;

  /** The number of segments to use to draw the arc */
  segments?: number;
  color: ValidColor;
  opacity?: number;
}

export interface DrawRectGLOptions extends Coordinate2D, Size {
  rgba: RGBA;
  opacity?: number;
}

export interface DrawRoundedGLRectOptions extends Coordinate2D, Size {
  rgba: RGBA;
  radius: number;
  opacity?: number;
}

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
  rgba: RGBA;

  /**
   * Optional gradient context. When set, `drawArcGL` emits a per-vertex
   * color via `gradientColorAt` instead of a single solid color. Used by
   * the gradient rounded-rect path so corner arcs blend correctly.
   */
  gradientCtx?: GradientCtx;
  /** Alpha multiplier applied to every vertex. Defaults to 1. */
  alphaMul?: number;
}

export interface DrawTextOptions extends Coordinate2D {
  text: string;
  atlas: BaseFontAtlas;
  color: ValidColor;
  opacity?: number;
  letterSpacing?: number;
  lineHeight?: number;
  fontSize?: number;
}

export interface DrawTextureOptions extends Coordinate2D, Size {
  texture: Texture;
  opacity?: number;
}
