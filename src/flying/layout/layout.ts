import {
  FlexDirection,
  FlexWrap,
  Overflow,
  resolveSize,
  resolveSpacing,
  SpacingType,
  type ViewStyle,
} from '@flying/widget';
import { positionAbsolute } from './absolute';
import { measureChildsComponent } from './measurement';
import { widgetLevelLayoutFlex } from './processor';
import type { LayoutFlexFn, LayoutNode } from './types';
import { layoutSingleLine, layoutWrap } from './wrap';

export const layoutFlex: LayoutFlexFn = function (options) {
  const { node, x, y, availableWidth, availableHeight, ctx } = options;
  const scrollAccumulated = options.scrollAccumulated ?? { x: 0, y: 0 };
  const style = node.style ?? ({} as ViewStyle);

  const padding = resolveSpacing(
    node.style?.[SpacingType.Padding],
    availableWidth
  );
  const isRow = style.flexDirection === FlexDirection.Row;

  const hasExplicitWidth = style.width != null;
  const hasExplicitHeight = style.height != null;

  const width = resolveSize(style.width, availableWidth);
  const height = resolveSize(style.height, availableHeight);

  let contentWidth = (width || availableWidth) - padding.left - padding.right;
  let contentHeight =
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
    screenX: x + scrollAccumulated.x,
    screenY: y + scrollAccumulated.y,
  };

  ctx.layoutIndex.set(stableId, layoutNode);

  // Compute child scroll accumulation: if this node is scrollable, subtract
  // its scroll offset so children's screenX/screenY reflect the scrolled view.
  const overflow = node.style?.overflow;
  const isScrollable =
    overflow === Overflow.Scroll || overflow === Overflow.Auto;

  const childAccumulated = { ...scrollAccumulated };

  if (isScrollable) {
    const offset = ctx.interactionManager.scroll.offset(layoutNode);

    childAccumulated.x -= offset.x;
    childAccumulated.y -= offset.y;
  }

  if (node.style?.focusable === true) {
    ctx.focusableNodes.push(layoutNode);
  }

  widgetLevelLayoutFlex({
    ...options,
    contentHeight,
    contentWidth,
    layoutNode,
    stableId,
  });

  if (!node.children || node.children.length === 0) {
    return layoutNode;
  }

  const { flow, absolute, maxH, sumH, maxW, sumW } = measureChildsComponent({
    children: node.children,
    parentWidth: contentWidth,
    parentHeight: contentHeight,
    ctx,
  });

  // Fit container to content when dimensions aren't explicitly set.
  // Cross-axis: use tallest/widest child. Main-axis: sum children + gaps.
  if (flow.length > 0) {
    const gaps = flow.length > 1 ? gap * (flow.length - 1) : 0;

    if (!hasExplicitHeight) {
      contentHeight = isRow ? maxH : sumH + gaps;
      layoutNode.height = contentHeight + padding.top + padding.bottom;
    }

    if (!hasExplicitWidth) {
      contentWidth = isRow ? sumW + gaps : maxW;
      layoutNode.width = contentWidth + padding.left + padding.right;
    }
  }

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
    scrollAccumulated: childAccumulated,
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
