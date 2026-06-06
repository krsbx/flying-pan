import type { FontManager } from '@/flying/app/fonts/manager';
import type { LayoutNode } from '@/flying/layout/types';
import type { Renderer } from '../renderer';

export interface PaintOptions {
  renderer: Renderer;
  layout: LayoutNode;
  fontManager: FontManager;
}
