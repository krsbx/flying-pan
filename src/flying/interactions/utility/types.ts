import type { LayoutNode } from '@flying/layout';
import type { Coordinate2D } from '@flying/types';
import type { ScrollOffsetFn } from '../dispatcher';

export interface HitTestOptions extends Coordinate2D {
  node: LayoutNode;
  scrollOffset: ScrollOffsetFn;
}

export interface HitTestNodeOptions extends HitTestOptions {
  accumulated: Coordinate2D;
}
