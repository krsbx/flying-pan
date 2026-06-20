import type { BaseFontAtlas } from '@flying/fonts';
import type { Coordinate2D, RGBA, Size, ValidColor } from '@flying/types';
import type { BoxShadow } from '@/flying/widget';
import type { Texture } from '../texture/texture';

export interface DrawRectOptions extends Coordinate2D, Size {
  color: ValidColor;
  opacity?: number;
  borderRadius?: number | null;
}

export interface DrawShadowOptions extends Coordinate2D, Size {
  shadow: BoxShadow;
  borderRadius?: number | null;
}

export interface DrawRectGLOptions extends Coordinate2D, Size {
  rgba: RGBA;
  opacity?: number;
}

export interface DrawRoundedRectOptions extends Coordinate2D, Size {
  rgba: RGBA;
  radius: number;
  opacity?: number;
}

export interface DrawCornerArcOptions {
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
