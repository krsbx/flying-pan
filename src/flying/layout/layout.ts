import {
  FlexDirection,
  FlexWrap,
  resolveSize,
  resolveSpacing,
  SpacingType,
  type ViewStyle,
} from '@flying/widget';
import { positionAbsolute } from './absolute';
import { measureChildsComponent } from './measurement';
import type { LayoutFlexFn, LayoutNode } from './types';
import { layoutSingleLine, layoutWrap } from './wrap';

export const layoutFlex: LayoutFlexFn = function (options) {
  const { node, x, y, availableWidth, availableHeight, ctx } = options;
  const style = node.style ?? ({} as ViewStyle);

  const padding = resolveSpacing(
    node.style?.[SpacingType.Padding],
    availableWidth
  );
  const isRow = style.flexDirection === FlexDirection.Row;

  const width = resolveSize(style.width, availableWidth);
  const height = resolveSize(style.height, availableHeight);

  const contentWidth = (width || availableWidth) - padding.left - padding.right;
  const contentHeight =
    (height || availableHeight) - padding.top - padding.bottom;

  const gap = resolveSize(style.gap, contentWidth);

  const stableId = ctx.getStableId(node);
  const children: LayoutNode[] = [];

  // Create node early and register before laying out children (pre-order).
  // This folds layoutIndex + focusable collection into the layout pass.
  const layoutNode: LayoutNode = {
    widget: node,
    stableId,
    x,
    y,
    width: contentWidth + padding.left + padding.right,
    height: contentHeight + padding.top + padding.bottom,
    children,
  };

  ctx.layoutIndex.set(stableId, layoutNode);

  if (node.style?.focusable === true) {
    ctx.focusableNodes.push(layoutNode);
  }

  if (!node.children || node.children.length === 0) {
    return layoutNode;
  }

  const { flow, absolute } = measureChildsComponent({
    children: node.children,
    parentWidth: contentWidth,
    parentHeight: contentHeight,
    ctx,
  });

  const lineOptions = {
    flow,
    style,
    padding,
    isRow,
    gap,
    contentWidth,
    contentHeight,
    x,
    y,
    children,
    ctx,
  };

  if (flow.length > 0) {
    if (style.flexWrap === FlexWrap.Wrap) {
      layoutWrap(lineOptions, layoutFlex);
    } else {
      layoutSingleLine(lineOptions, layoutFlex);
    }
  }

  for (const m of absolute) {
    positionAbsolute({ m, ...lineOptions }, layoutFlex);
  }

  return layoutNode;
};
