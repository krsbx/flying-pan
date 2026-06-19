import { resolveSize } from '@flying/widget';
import type { LayoutFlexFn, PositionAbsoluteOptions } from './types';

export function positionAbsolute(
  options: PositionAbsoluteOptions,
  layoutFlex: LayoutFlexFn
) {
  const {
    m,
    padding,
    contentWidth,
    contentHeight,
    x,
    y,
    fontManager,
    children,
  } = options;
  const childStyle = m.widget.style;

  // Resolve horizontal position
  const absX =
    childStyle?.left !== undefined
      ? padding.left + resolveSize(childStyle.left, contentWidth)
      : childStyle?.right !== undefined
        ? contentWidth +
          padding.left -
          m.width -
          resolveSize(childStyle.right, contentWidth)
        : padding.left;

  // Resolve vertical position
  const absY =
    childStyle?.top !== undefined
      ? padding.top + resolveSize(childStyle.top, contentHeight)
      : childStyle?.bottom !== undefined
        ? contentHeight +
          padding.top -
          m.height -
          resolveSize(childStyle.bottom, contentHeight)
        : padding.top;

  // Use explicit size or fall back to content area size
  const absWidth = resolveSize(childStyle?.width, contentWidth) || contentWidth;
  const absHeight =
    resolveSize(childStyle?.height, contentHeight) || contentHeight;

  children.push(
    layoutFlex({
      node: m.widget,
      x: x + absX,
      y: y + absY,
      availableWidth: absWidth,
      availableHeight: absHeight,
      fontManager,
    })
  );
}
