import type { Window } from '@flying/app';
import type { WidgetDescriptor } from '@flying/widget';
import type { ReconciledNode } from '../types';

export interface ReconcileOptions {
  window: Window;
  next: WidgetDescriptor;
}

export interface ReconcileNodeOptions {
  prev: ReconciledNode | null;
  next: WidgetDescriptor;
  window: Window;
}

export interface UnmountNodeOptions {
  node: ReconciledNode;
  window: Window;
}
