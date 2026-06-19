import type { Window } from '@/flying/app';
import type { LayoutNode } from '@/flying/layout';
import type { Coordinate2D } from '@/flying/types';
import type { WidgetDescriptor } from '@/flying/widget';

export interface PointerEventOptions {
  window: Window;
  node: LayoutNode | null;
  position: Coordinate2D;
  modifiers: number;
}

export interface LastClick {
  widget: WidgetDescriptor;
  button: number;
  time: number;
  count: number;
}
