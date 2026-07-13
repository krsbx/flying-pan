import type { LayoutNode } from '@flying/layout';
import { PointerEvents } from '@flying/widget';
import type { HitTestOptions } from './types';

/**
 * Hit-tests a screen-space point against the layout tree.
 *
 * Reads `node.screenX`/`screenY` (written by `assignScreenPositions`
 * after layout) so the check matches what the user sees drawn —
 * layout positions already adjusted for ancestor scroll offsets.
 */
export function hitTest(options: HitTestOptions): LayoutNode | null {
  const { node, x, y } = options;

  for (let i = node.children.length - 1; i >= 0; i--) {
    const child = node.children[i];

    if (!child) continue;

    const hit = hitTest({ node: child, x, y });

    if (hit) return hit;
  }

  const isWithinXAxis = x >= node.screenX && x <= node.screenX + node.width;
  const isWithinYAxis = y >= node.screenY && y <= node.screenY + node.height;
  const inRect = isWithinXAxis && isWithinYAxis;

  if (inRect && node.widget.style?.pointerEvents !== PointerEvents.None) {
    return node;
  }

  return null;
}
