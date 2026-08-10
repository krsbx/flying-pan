import type { Coordinate2D } from '@/flying/types';
import { LinkedList } from '@/utility/linked-list';
import { EarclipLinkedListNode } from '.';

export class EarclipLinkedList extends LinkedList<Coordinate2D, false> {
  public override head: EarclipLinkedListNode;
  public override tail: EarclipLinkedListNode;

  public constructor(coords: Coordinate2D[]) {
    super();

    if (!coords[0]) {
      throw new Error('No coordinates provided');
    }

    const start = new EarclipLinkedListNode(coords[0]);

    let prev = start;

    for (let i = 1; i < coords.length; i++) {
      const coord = coords[i];

      if (!coord) continue;

      const node = new EarclipLinkedListNode(coord);

      node.prev = prev;
      prev.next = node;
      prev = node;
    }

    prev.next = start;
    start.prev = prev;

    this.head = start;
    this.tail = prev;
  }

  public signedArea(start: EarclipLinkedListNode | null = this.head): number {
    let area = 0;

    if (!start) return area;

    const node = start;

    let p: EarclipLinkedListNode = start;

    do {
      area += p.value.x * p.next.value.y - p.value.y * p.next.value.x;

      p = p.next;
    } while (p && p !== node);

    return area;
  }

  public bridgeHole(inner: EarclipLinkedList): void {
    // 1. Rightmost vertex of the hole (inner ring).
    let h: EarclipLinkedListNode = inner.head;
    let rightmost = h;
    h = h.next;

    while (h !== inner.head) {
      if (h.value.x > rightmost.value.x) rightmost = h;
      h = h.next;
    }

    const H = rightmost;

    // 2. Cast ray H → (+x). Find closest edge intersection on outer at y = H.y.
    let best: { node: EarclipLinkedListNode; x: number } | null = null;

    let m: EarclipLinkedListNode = this.head;
    do {
      const n = m.next;
      const yMin = Math.min(m.value.y, n.value.y);
      const yMax = Math.max(m.value.y, n.value.y);

      if (H.value.y < yMin || H.value.y > yMax || yMin === yMax) {
        m = n;
        continue;
      }

      const t = (H.value.y - m.value.y) / (n.value.y - m.value.y);
      const x = m.value.x + t * (n.value.x - m.value.x);
      if (x >= H.value.x && (!best || x < best.x)) {
        best = { node: m, x };
      }
      m = n;
    } while (m !== this.head);

    if (!best) return;

    // 3. Pick the bridge vertex — reuse existing vertex or split the edge.
    let M: EarclipLinkedListNode;
    const { node: edgeA, x: hitX } = best;
    const edgeB = edgeA.next;

    if (hitX === edgeA.value.x && H.value.y === edgeA.value.y) {
      M = edgeA;
    } else if (hitX === edgeB.value.x && H.value.y === edgeB.value.y) {
      M = edgeB;
    } else {
      M = new EarclipLinkedListNode({ x: hitX, y: H.value.y });
      M.prev = edgeA;
      M.next = edgeB;
      edgeA.next = M;
      edgeB.prev = M;
    }

    // 4. Splice the hole ring in with duplicate bridge vertices.
    const Mn = M.next;
    const Hp = H.prev;

    const Mdup = new EarclipLinkedListNode({ x: M.value.x, y: M.value.y });
    const Hdup = new EarclipLinkedListNode({ x: H.value.x, y: H.value.y });

    M.next = H;
    H.prev = M;

    Hp.next = Hdup;
    Hdup.prev = Hp;
    Hdup.next = Mdup;
    Mdup.prev = Hdup;
    Mdup.next = Mn;
    Mn.prev = Mdup;
  }

  public clipEars(result: number[]): void {
    const count = this.count();

    if (count < 3) return;

    const maxIterations = count * count * 16;
    let remaining = count;
    let guard = 0;
    let advanced = false;

    let curr: EarclipLinkedListNode = this.head;
    let lapStart: EarclipLinkedListNode = this.head;

    while (remaining > 3 && guard < maxIterations) {
      guard++;

      const next = curr.next;

      if (curr.isConvex && curr.isEar) {
        curr.emit(result);
        curr.prev.next = curr.next;
        curr.next.prev = curr.prev;
        remaining--;
        advanced = true;

        // Advance lap sentinel if it was just clipped
        if (curr === lapStart) {
          lapStart = next;
        }
      }

      curr = next;

      if (curr === lapStart) {
        if (!advanced) break;
        advanced = false;
      }
    }

    if (remaining === 3) {
      curr.emit(result);
    }
  }
}
