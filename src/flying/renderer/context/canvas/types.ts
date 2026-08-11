import type { FontManager, Window } from '@flying/app';
import type { Coordinate2D, Resolution } from '@flying/types';
import type { Renderer } from '../../renderer';

export interface CanvasContextOptions {
  window: Window;
  renderer: Renderer;
  fontManager: FontManager;
}

export interface FillRectOptions extends Coordinate2D, Resolution {}

export interface FillTextOptions extends Coordinate2D {
  text: string;
}

export interface StrokeRectOptions extends Coordinate2D, Resolution {}
