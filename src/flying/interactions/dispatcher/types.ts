import type { StateStore } from '@/flying/state';
import type { InputManager, Window } from '@flying/app';
import type { LayoutNode } from '@flying/layout';

export interface DispatchOptions {
  window: Window;
  layout: LayoutNode;
  input?: InputManager | null;
  stateStore: StateStore;
}
