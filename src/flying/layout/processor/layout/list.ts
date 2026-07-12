import {
  WidgetType,
  type ListProps,
  type WidgetDescriptor,
} from '@flying/widget';
import type { WidgetLevelLayoutFlexOptions } from './types';

const MAX_ITEM_COUNT = 100_001;

function withVirtualStableId(
  widget: WidgetDescriptor,
  listStableId: number,
  slot: number
): WidgetDescriptor {
  widget._virtualStableId = -(listStableId * MAX_ITEM_COUNT + slot + 1);

  return widget;
}

export function listLayoutFlex(options: WidgetLevelLayoutFlexOptions): void {
  const { layoutNode, node, contentHeight, stableId, ctx } = options;

  const props = node.props as ListProps;
  const { itemCount, rowHeight, renderItem, overscan = 3 } = props;

  const scrollY = ctx.interactionManager.scroll.offset(layoutNode).y;
  const firstVisible = Math.max(0, Math.floor(scrollY / rowHeight) - overscan);
  const lastVisible = Math.min(
    itemCount,
    Math.ceil((scrollY + contentHeight) / rowHeight) + overscan
  );

  const virtualChildren: WidgetDescriptor[] = [];

  if (firstVisible > 0) {
    virtualChildren.push(
      withVirtualStableId(
        {
          type: WidgetType.View,
          props: {},
          style: { width: '100%', height: firstVisible * rowHeight },
        },
        stableId,
        0
      )
    );
  }

  for (let i = firstVisible; i < lastVisible; i++) {
    virtualChildren.push(withVirtualStableId(renderItem(i), stableId, i + 1));
  }

  if (lastVisible < itemCount) {
    virtualChildren.push(
      withVirtualStableId(
        {
          type: WidgetType.View,
          props: {},
          style: {
            width: '100%',
            height: (itemCount - lastVisible) * rowHeight,
          },
        },
        stableId,
        itemCount + 1
      )
    );
  }

  node.children = virtualChildren;
}
