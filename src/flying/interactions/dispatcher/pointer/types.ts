import type { Window } from '@/flying/app';
import type { LayoutNode } from '@/flying/layout';
import type { Coordinate2D } from '@/flying/types';

export interface PointerEventOptions {
  window: Window;
  node: LayoutNode | null;
  position: Coordinate2D;
  modifiers: number;
}

export interface LastClick {
  stableId: number;
  button: number;
  time: number;
  count: number;
}
