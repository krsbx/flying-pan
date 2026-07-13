import type { InputManager, Window } from '@flying/app';
import type { LayoutNode } from '@flying/layout';
import type { StateStore } from '@flying/state';
import type { EventContext } from '../event/types';
import type { ScrollOffsetFn } from './scroll/types';

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
  /** Scroll offset lookup — passed to hitTest so it can transform mouse
   *  coordinates through nested scrollables. Source of truth is the
   *  ScrollDispatcher; plumbed through here so pointer/focus dispatchers
   *  don't need a direct sibling reference. */
  scrollOffset: ScrollOffsetFn;
}
