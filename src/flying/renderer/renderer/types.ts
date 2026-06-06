import type { BaseFontAtlas } from '@/flying/fonts';
import type { Coordinate2D, RGBA, Size, ValidColor } from '@/flying/types';

export interface DrawRectOptions extends Coordinate2D, Size {
  color: ValidColor;
  borderRadius?: number | null;
}

export interface DrawRectGLOptions extends Coordinate2D, Size {
  rgba: RGBA;
}

export interface DrawRoundedRectOptions extends Coordinate2D, Size {
  rgba: RGBA;
  radius: number;
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
}
