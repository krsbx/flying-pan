import type { EarclipLinkedListNode } from './linked-list';

export function triArea<T extends EarclipLinkedListNode>(
  a: T,
  b: T,
  c: T
): number {
  return (
    (b.value.x - a.value.x) * (c.value.y - a.value.y) -
    (c.value.x - a.value.x) * (b.value.y - a.value.y)
  );
}

export function pointInTriangle<T extends EarclipLinkedListNode>(
  p: T,
  a: T,
  b: T,
  c: T
): boolean {
  return (
    triArea(a, b, p) >= 0 && triArea(b, c, p) >= 0 && triArea(c, a, p) >= 0
  );
}
