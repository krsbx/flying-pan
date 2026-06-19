import { FlexAlign, FlexJustify, Position, resolveSize } from '@flying/widget';
import type { LayoutFlexFn, PositionFlowChildrenOptions } from './types';

export function positionFlowChildren(
  options: PositionFlowChildrenOptions,
  layoutFlex: LayoutFlexFn
) {
  const {
    measurements,
    alignItems,
    isRow,
    padding,
    crossAxisSize,
    mainPos: startMainPos,
    spaceBetweenGap,
    spaceEvenlyGap,
    justifyItems,
    x,
    y,
    gap,
    fontManager,
    children,
  } = options;

  let mainPos = startMainPos;

  for (const m of measurements) {
    const childCrossStart = isRow ? padding.top : padding.left;
    const childMain = mainPos + (isRow ? m.margin.left : m.margin.top);

    const childCrossSize = isRow ? m.height : m.width;
    const crossWithMargin = isRow
      ? crossAxisSize - m.margin.top - m.margin.bottom
      : crossAxisSize - m.margin.left - m.margin.right;

    let crossPos = childCrossStart;

    const childAlign = m.widget.style?.alignSelf ?? alignItems;

    switch (childAlign) {
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
    let childX = isRow ? childMain : crossPos;
    let childY = isRow ? crossPos : childMain;

    // Apply position: relative offset
    if (m.widget.style?.position === Position.Relative) {
      if (m.widget.style.left != null)
        childX += resolveSize(m.widget.style.left, crossAxisSize);
      if (m.widget.style.top != null)
        childY += resolveSize(m.widget.style.top, crossAxisSize);
    }

    children.push(
      layoutFlex({
        node: m.widget,
        x: x + childX,
        y: y + childY,
        availableWidth: m.width,
        availableHeight: m.height,
        fontManager,
      })
    );

    const childMainSize = isRow ? m.width : m.height;
    const marginEnd = isRow ? m.margin.right : m.margin.bottom;

    mainPos += childMainSize + marginEnd + gap;

    if (justifyItems === FlexJustify.SpaceBetween) {
      mainPos += spaceBetweenGap;
    } else if (justifyItems === FlexJustify.SpaceEvenly) {
      mainPos += spaceEvenlyGap;
    }
  }
}
