import type { EventContext } from '@/flying/interactions/event/types';
import type { StateStore } from '@/flying/state';
import type { InputManager, Window } from '@flying/app';
import type { LayoutNode } from '@flying/layout';

export interface DispatcherConfig {
  input: InputManager;
  ctx: EventContext;
}

export interface DispatchOptions {
  window: Window;
  layout: LayoutNode;
  stateStore: StateStore;
}
