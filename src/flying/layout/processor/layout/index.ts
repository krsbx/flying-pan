import { WidgetType } from '@/flying/widget';
import { listLayoutFlex } from './list';
import type { WidgetLevelLayoutFlexOptions } from './types';

export function widgetLevelLayoutFlex(
  options: WidgetLevelLayoutFlexOptions
): void {
  switch (options.node.type) {
    case WidgetType.List:
      listLayoutFlex(options);
      break;

    default:
      break;
  }
}
