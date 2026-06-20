import type { InteractionManager } from '@/flying/interactions';
import type { GetStableIdFn } from '@/flying/reconcile/reconciler/types';
import type { StateStore } from '@/flying/state';
import type { FontManager } from '@flying/app';
import type { LayoutNode } from '@flying/layout';
import type { Renderer } from '@flying/renderer';
import type { TextureManager } from '../texture/manager';

export interface PaintContext {
  fontManager: FontManager;
  interactionManager: InteractionManager;
  textureManager: TextureManager | null;
  getStableId: GetStableIdFn;
  stateStore: StateStore;
}

export interface PaintOptions {
  renderer: Renderer;
  layout: LayoutNode;
  ctx: PaintContext;
}
