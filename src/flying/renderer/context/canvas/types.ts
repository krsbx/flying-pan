import type { FontManager, Window } from '@flying/app';
import type { Renderer } from '../../renderer';

export interface CanvasContextOptions {
  window: Window;
  renderer: Renderer;
  fontManager: FontManager;
}
