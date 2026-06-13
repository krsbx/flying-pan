import { FlexDirection, FlexWrap, SpacingType } from '@/flying/widget/constant';
import { resolveSpacing } from '@/flying/widget/styles';
import type { ViewStyle } from '@/flying/widget/styles/types';
import { positionAbsolute } from './absolute';
import { measureChildsComponent } from './measurement';
import type { LayoutFlexFn, LayoutNode } from './types';
import { layoutSingleLine, layoutWrap } from './wrap';

export const layoutFlex: LayoutFlexFn = function (options) {
  const { node, x, y, fontManager, availableWidth, availableHeight } = options;
  const style: ViewStyle = node.style ?? {};

  const padding = resolveSpacing(node.style?.[SpacingType.Padding]);
  const isRow = style.flexDirection === FlexDirection.Row;
  const gap = style.gap ?? 0;

  const contentWidth =
    (style.width ?? availableWidth) - padding.left - padding.right;
  const contentHeight =
    (style.height ?? availableHeight) - padding.top - padding.bottom;

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
