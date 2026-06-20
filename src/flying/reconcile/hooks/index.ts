import type { WidgetDescriptor } from '@/flying/widget';

let currentStableIds: Map<WidgetDescriptor, number> = new Map();

export function setCurrentStableIds(map: Map<WidgetDescriptor, number>): void {
  currentStableIds = map;
}

export function getStableId(widget: WidgetDescriptor): number {
  return currentStableIds.get(widget) ?? 0;
}
