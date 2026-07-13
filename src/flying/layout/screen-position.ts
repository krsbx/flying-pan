import type { Coordinate2D } from '@flying/types';
import { Overflow } from '@flying/widget';
import type { ScrollOffsetFn } from '../interactions/dispatcher/scroll/types';
import type { LayoutNode } from './types';

/**
 * Post-layout pass that writes `screenX`/`screenY` on every node.
 *
 * Layout positions are content-space (the layout engine does not apply
 * scroll). Rendering translates each scrollable's children by `-offset`
 * via the GL modelview matrix, so a widget at layout y=600 inside a
 * dashboard scrolled by 500 is drawn at screen y=100. To match what the
 * user sees, pointer hit-test, clip rects, and any screen-space math
 * must read positions that have been adjusted by the same accumulated
 * translate the renderer applies.
 *
 * This walk computes that adjustment once per frame, after layout. Each
 * scrollable ancestor contributes `-offset` to a running accumulated
 * translate; the node's screen position is `x + accumulated`.
 *
 * Same one-frame latency the list processor already has: layout runs
 * before dispatch in the frame loop, so it reads the previous frame's
 * committed offsets. Imperceptible at 60fps with overscan buffering.
 */
export function assignScreenPositions(
  node: LayoutNode,
  scrollOffset: ScrollOffsetFn,
  accumulated: Coordinate2D = { x: 0, y: 0 }
): void {
  node.screenX = node.x + accumulated.x;
  node.screenY = node.y + accumulated.y;

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

  for (const child of node.children) {
    assignScreenPositions(child, scrollOffset, childAccumulated);
  }
}
