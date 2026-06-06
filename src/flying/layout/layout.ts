import {
  FlexAlign,
  FlexDirection,
  FlexJustify,
  SpacingType,
} from '@/flying/widget/constant';
import { resolveSpacing } from '@/flying/widget/styles';
import type { LayoutFlexOptions, LayoutNode } from './types';
import {
  calculateMainContentSize,
  measureChildsComponent,
  updateChildMeasurements,
} from './utility';

export function layoutFlex(options: LayoutFlexOptions): LayoutNode {
  const { node, x, y, textMeasurer, availableWidth, availableHeight } = options;
  const style = node.style ?? {};

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

  const measurements = measureChildsComponent({
    children: node.children,
    textMeasurer: textMeasurer || null,
  });

  const { crossAxisSize, mainAxisSize, totalGaps } = updateChildMeasurements({
    measurements,
    contentHeight,
    contentWidth,
    isRow,
    gap,
  });

  const {
    alignItems,
    justifyItems,
    mainPos: calculatedMainPos,
    spaceBetweenGap,
    spaceEvenlyGap,
  } = calculateMainContentSize({
    crossAxisSize,
    mainAxisSize,
    measurements,
    totalGaps,
    padding,
    style,
    isRow,
  });

  let mainPos = calculatedMainPos;

  for (const m of measurements) {
    const chilCrossStart = isRow ? padding.top : padding.left;
    const childMain = mainPos + (isRow ? m.margin.left : m.margin.top);

    const childCrossSize = isRow ? m.height : m.width;
    const crossWithMargin = isRow
      ? crossAxisSize - m.margin.top - m.margin.bottom
      : crossAxisSize - m.margin.left - m.margin.right;

    let crossPos = chilCrossStart;

    switch (alignItems) {
      case FlexAlign.Center:
        crossPos += (crossWithMargin - childCrossSize) / 2;
        break;

      case FlexAlign.End:
        crossPos += crossWithMargin - childCrossSize;
        break;

      case FlexAlign.Start:
      case FlexAlign.Stretch:
      case FlexAlign.Baseline:
      default:
        break;
    }

    crossPos += isRow ? m.margin.top : m.margin.left;
    const childX = isRow ? childMain : crossPos;
    const childY = isRow ? crossPos : childMain;

    const childLayout = layoutFlex({
      node: m.widget,
      x: x + childX,
      y: y + childY,
      availableWidth: m.width,
      availableHeight: m.height,
      textMeasurer,
    });

    children.push(childLayout);

    const childMainSize = isRow ? m.width : m.height;
    const marginEnd = isRow ? m.margin.right : m.margin.bottom;

    mainPos += childMainSize + marginEnd + gap;

    if (justifyItems === FlexJustify.SpaceBetween) {
      mainPos += spaceBetweenGap;
    } else if (justifyItems === FlexJustify.SpaceEvenly) {
      mainPos += spaceEvenlyGap;
    }
  }

  return {
    widget: node,
    x,
    y,
    width: contentWidth + padding.left + padding.right,
    height: contentHeight + padding.top + padding.bottom,
    children,
  };
}
