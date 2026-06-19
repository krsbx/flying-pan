import type { InteractionManager } from '@/flying/interactions';
import type { FontManager } from '@flying/app';
import type { LayoutNode } from '@flying/layout';
import type { Renderer } from '@flying/renderer';

export interface PaintOptions {
  renderer: Renderer;
  layout: LayoutNode;
  fontManager: FontManager;
  interactionManager: InteractionManager;
}
