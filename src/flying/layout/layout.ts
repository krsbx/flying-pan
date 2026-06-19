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
  const { node, x, y, fontManager, availableWidth, availableHeight } = options;
  const style: ViewStyle = node.style ?? {};

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

  const children: LayoutNode[] = [];

  if (!node.children || node.children.length === 0) {
    return {
      widget: node,
      x,
      y,
      width: contentWidth + padding.left + padding.right,
      height: contentHeight + padding.top + padding.bottom,
      children,
    };
  }

  const { flow, absolute } = measureChildsComponent({
    children: node.children,
    fontManager,
    parentWidth: contentWidth,
    parentHeight: contentHeight,
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
    fontManager,
    children,
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

  return {
    widget: node,
    x,
    y,
    width: contentWidth + padding.left + padding.right,
    height: contentHeight + padding.top + padding.bottom,
    children,
  };
};
