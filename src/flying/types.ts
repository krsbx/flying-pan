import type { Color } from './renderer/color';

export interface Coordinate2D {
  x: number;
  y: number;
}

export interface Coordinate3D extends Coordinate2D {
  z: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Resolution {
  width: number;
  height: number;
}

export interface RGBA {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export interface FrameBufferSize {
  width: number;
  height: number;
}

export type ValidColor = Color | (string & {});
