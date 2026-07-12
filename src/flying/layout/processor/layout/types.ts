import type { WidgetDescriptor } from '@flying/widget';
import type { LayoutContext, LayoutNode } from '../../types';

export interface WidgetLevelLayoutFlexOptions {
  node: WidgetDescriptor;
  ctx: LayoutContext;
  layoutNode: LayoutNode;
  contentWidth: number;
  contentHeight: number;
  stableId: number;
}
