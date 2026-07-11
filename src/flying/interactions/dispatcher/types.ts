import type { InputManager, Window } from '@flying/app';
import type { EventContext } from '@flying/interactions';
import type { LayoutNode } from '@flying/layout';
import type { StateStore } from '@flying/state';

export interface DispatcherConfig {
  input: InputManager;
  ctx: EventContext;
}

export interface DispatchOptions {
  window: Window;
  layout: LayoutNode;
  layoutIndex: Map<number, LayoutNode>;
  focusableNodes: LayoutNode[];
  stateStore: StateStore;
  treeChanged: boolean;
  /** Animation clock (performance.now()), from AnimationManager. */
  time: number;
}
