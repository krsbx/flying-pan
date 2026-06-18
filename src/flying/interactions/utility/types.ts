import type { LayoutNode } from '@/flying/layout';
import type { Coordinate2D } from '@/flying/types';

export interface HitTestOptions extends Coordinate2D {
  node: LayoutNode;
}
