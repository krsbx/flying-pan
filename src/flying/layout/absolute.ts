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
      ? padding.left + childStyle.left
      : childStyle?.right !== undefined
        ? contentWidth + padding.left - m.width - childStyle.right
        : padding.left;

  // Resolve vertical position
  const absY =
    childStyle?.top !== undefined
      ? padding.top + childStyle.top
      : childStyle?.bottom !== undefined
        ? contentHeight + padding.top - m.height - childStyle.bottom
        : padding.top;

  // Use explicit size or fall back to content area size
  const absWidth = childStyle?.width || contentWidth;
  const absHeight = childStyle?.height || contentHeight;

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
