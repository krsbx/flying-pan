import type { LayoutNode } from '@/flying/layout';
import type { Coordinate2D } from '@/flying/types';

export interface ScrollOffsetFn {
  (node: LayoutNode): Coordinate2D;
}

export interface IScrollDispatcher {
  offset: ScrollOffsetFn;
}
