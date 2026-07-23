import type { Polygon } from '../types';
import { EarclipLinkedList } from './linked-list';

export function earclip(polygon: Polygon): number[] {
  if (polygon.outer.length < 3) return [];

  const outer = new EarclipLinkedList(polygon.outer);

  if (outer.signedArea() < 0) {
    outer.reverse();
  }

  for (const hole of polygon.holes) {
    if (hole.length < 3) continue;

    const inner = new EarclipLinkedList(hole);

    if (inner.signedArea() > 0) {
      inner.reverse();
    }

    outer.bridgeHole(inner);
  }

  const result: number[] = [];

  outer.clipEars(result);

  return result;
}
