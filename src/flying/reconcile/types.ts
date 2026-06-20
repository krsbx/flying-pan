import type { WidgetDescriptor } from '../widget';

export interface ReconciledNode {
  widget: WidgetDescriptor;
  stableId: number;
  children: ReconciledNode[];
}
