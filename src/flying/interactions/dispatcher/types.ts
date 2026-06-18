import type { InputManager, Window } from '@/flying/app';
import type { LayoutNode } from '@/flying/layout';
import type { Coordinate2D } from '@/flying/types';

export interface DispatchOptions {
  window: Window;
  layout: LayoutNode;
  input?: InputManager | null;
}

export interface PointerEventOptions {
  window: Window;
  node: LayoutNode | null;
  position: Coordinate2D;
  modifiers: number;
}
