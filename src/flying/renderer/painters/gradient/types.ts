import type { Coordinate2D, RGBA } from '@flying/types';

export interface GradientCtx {
  stops: readonly { pos: number; rgba: RGBA }[];
  origin: Coordinate2D;
  dir: Coordinate2D;
  invSpan: number;
}
