import type { LayoutNode } from '@/flying/layout';

export interface UseWidgetStateOptions<T> {
  node: LayoutNode;
  initial: T;
}
