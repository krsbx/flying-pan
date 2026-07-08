import type { PaintContext } from '@flying/renderer';
import type { Resolution } from '@flying/types';
import type { WidgetDescriptor } from '@flying/widget';

export interface ResolveChildSizeOptions {
  widget: WidgetDescriptor;
  ctx: PaintContext;
  parentWidth: number;
  parentHeight: number;
}

export interface ResolveWidgetSizeOptions {
  widget: WidgetDescriptor;
  size: Resolution;
  ctx: PaintContext;
}
