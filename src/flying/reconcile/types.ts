import type { WidgetDescriptor } from '../widget';

export type Key = string | number;

export interface ReconciledNode {
  widget: WidgetDescriptor;
  stableId: number;
  children: ReconciledNode[];
}
