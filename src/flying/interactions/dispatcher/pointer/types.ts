import type { InputManager, Window } from '@/flying/app';
import type { EventContext } from '@flying/interactions/event/types';
import type { LayoutNode } from '@flying/layout';
import type { Coordinate2D } from '@flying/types';

export interface PointerEventOptions {
  window: Window;
  node: LayoutNode | null;
  position: Coordinate2D;
  modifiers: number;
  ctx: EventContext;
  input: InputManager;
}

export interface LastClick {
  stableId: number;
  button: number;
  time: number;
  count: number;
}
