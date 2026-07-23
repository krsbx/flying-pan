import type { Coordinate2D } from '@/flying/types';
import { LinkedListNode } from '@/utility/linked-list';
import { pointInTriangle } from '../utility';

export class EarclipLinkedListNode extends LinkedListNode<Coordinate2D, false> {
  public override next: EarclipLinkedListNode;
  public override prev: EarclipLinkedListNode;

  public constructor(value: Coordinate2D) {
    super(value);

    this.next = null!;
    this.prev = null!;
  }

  public get cross(): number {
    const { prev, next, value } = this;

    return (
      (value.x - prev.value.x) * (next.value.y - prev.value.y) -
      (value.y - prev.value.y) * (next.value.x - prev.value.x)
    );
  }

  public get isConvex(): boolean {
    return this.cross > 0;
  }

  public get isEar(): boolean {
    const a = this.prev;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const b = this;
    const c = this.next;

    let p = this.next.next;

    while (p !== this.prev) {
      if (!p.isConvex && pointInTriangle(p, a, b, c)) {
        return false;
      }

      p = p.next;
    }

    return true;
  }

  public emit(result: number[]): void {
    result.push(
      this.prev.value.x,
      this.prev.value.y,
      this.value.x,
      this.value.y,
      this.next.value.x,
      this.next.value.y
    );
  }
}
