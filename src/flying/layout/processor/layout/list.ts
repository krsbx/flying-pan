import {
  ProgressBarOrientation,
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
  const { layoutNode, node, contentHeight, contentWidth, stableId, ctx } =
    options;

  const props = node.props as ListProps;
  const { itemCount, itemSize, renderItem, overscan = 3, orientation } = props;

  const isHorizontal = orientation === ProgressBarOrientation.Horizontal;
  const scrollOffset = ctx.interactionManager.scroll.offset(layoutNode);
  const viewport = isHorizontal ? contentWidth : contentHeight;

  const scrollPos = isHorizontal ? scrollOffset.x : scrollOffset.y;
  const firstVisible = Math.max(0, Math.floor(scrollPos / itemSize) - overscan);
  const lastVisible = Math.min(
    itemCount,
    Math.ceil((scrollPos + viewport) / itemSize) + overscan
  );

  const virtualChildren: WidgetDescriptor[] = [];

  if (firstVisible > 0) {
    virtualChildren.push(
      withVirtualStableId(
        {
          type: WidgetType.View,
          props: {},
          style: isHorizontal
            ? { height: '100%', width: firstVisible * itemSize }
            : { width: '100%', height: firstVisible * itemSize },
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
          style: isHorizontal
            ? {
                height: '100%',
                width: (itemCount - lastVisible) * itemSize,
              }
            : {
                width: '100%',
                height: (itemCount - lastVisible) * itemSize,
              },
        },
        stableId,
        itemCount + 1
      )
    );
  }

  node.children = virtualChildren;
}
