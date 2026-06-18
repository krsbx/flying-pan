import type { LayoutNode } from '../../layout';
import { PointerEvents } from '../../widget/constant';
import type { HitTestOptions } from './types';

export function hitTest(options: HitTestOptions): LayoutNode | null {
  const { node, x, y } = options;

  for (let i = options.node.children.length - 1; i >= 0; i--) {
    const node = options.node.children[i];

    if (!node) continue;

    const hit = hitTest({
      node,
      x: options.x,
      y: options.y,
    });

    if (hit) return hit;
  }

  const isWithinXAxis = x >= node.x && x <= node.x + node.width;
  const isWithinYAxis = y >= node.y && y <= node.y + node.height;
  const inRect = isWithinXAxis && isWithinYAxis;

  if (inRect && node.widget.style?.pointerEvents !== PointerEvents.None) {
    return node;
  }

  return null;
}
