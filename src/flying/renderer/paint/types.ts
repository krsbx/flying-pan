import type { FontManager } from '@flying/app';
import type { InteractionManager } from '@flying/interactions';
import type { LayoutNode } from '@flying/layout';
import type { GetStableIdFn } from '@flying/reconcile';
import type { Renderer } from '@flying/renderer';
import type { StateStore } from '@flying/state';
import type { Coordinate2D, Resolution } from '@flying/types';
import type { ViewStyle } from '@flying/widget';
import type { TextureManager } from '../texture/manager';

export interface PaintContext {
  fontManager: FontManager;
  interactionManager: InteractionManager;
  textureManager: TextureManager | null;
  getStableId: GetStableIdFn;
  stateStore: StateStore;
  /** Populated by layoutFlex each frame. Cleared before layout. */
  layoutIndex: Map<number, LayoutNode>;
  /** Focusable nodes in tree order (tab order). Populated by layoutFlex. */
  focusableNodes: LayoutNode[];
}

export interface PaintOptions {
  renderer: Renderer;
  layout: LayoutNode;
  ctx: PaintContext;
}

export interface ResolveStyleOptions {
  style: ViewStyle;
  checked: boolean;
  hovered: boolean;
  focused: boolean;
  pressed: boolean;
  disabled: boolean;
}

export interface SubMarkPaintOptions
  extends PaintOptions, ResolveStyleOptions {}

export interface PaintShadowOptions extends Resolution, Coordinate2D {
  style: ViewStyle;
  renderer: Renderer;
}

export interface PaintBorderOptions extends Resolution, Coordinate2D {
  style: ViewStyle;
  renderer: Renderer;
}

export interface PaintBackgroundOptions extends Resolution, Coordinate2D {
  style: ViewStyle;
  renderer: Renderer;
  colorOverride?: string;
}
