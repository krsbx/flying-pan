import type { LayoutNode } from '@flying/layout';
import { Overflow, PointerEvents } from '@flying/widget';
import type { HitTestNodeOptions, HitTestOptions } from './types';

export function hitTest(options: HitTestOptions): LayoutNode | null {
  return hitTestNode({
    ...options,
    accumulated: {
      x: 0,
      y: 0,
    },
  });
}

function hitTestNode(options: HitTestNodeOptions): LayoutNode | null {
  const { node, x: mouseX, y: mouseY, accumulated, scrollOffset } = options;

  // Convert screen-space mouse into this node's content space.
  // Widget at layout (lx, ly) is drawn at screen (lx + accumulated.x,
  // ly + accumulated.y), so the inverse is mouse - accumulated.
  const localX = mouseX - accumulated.x;
  const localY = mouseY - accumulated.y;

  const isWithinXAxis = localX >= node.x && localX <= node.x + node.width;
  const isWithinYAxis = localY >= node.y && localY <= node.y + node.height;
  const inRect = isWithinXAxis && isWithinYAxis;

  if (!inRect) return null;

  const overflow = node.widget.style?.overflow;
  const isScrollable =
    overflow === Overflow.Scroll || overflow === Overflow.Auto;

  let childAccumulated = accumulated;

  if (isScrollable) {
    const offset = scrollOffset(node);

    childAccumulated = {
      x: accumulated.x - offset.x,
      y: accumulated.y - offset.y,
    };
  }

  for (let i = node.children.length - 1; i >= 0; i--) {
    const child = node.children[i];

    if (!child) continue;

    const hit = hitTestNode({
      node: child,
      x: mouseX,
      y: mouseY,
      accumulated: childAccumulated,
      scrollOffset,
    });

    if (hit) return hit;
  }

  if (node.widget.style?.pointerEvents !== PointerEvents.None) {
    return node;
  }

  return null;
}
