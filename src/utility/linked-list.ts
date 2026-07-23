export class LinkedListNode<T, Nullable extends boolean = true> {
  public value: T;
  public next:
    | LinkedListNode<T, Nullable>
    | (Nullable extends true ? null : never);
  public prev:
    | LinkedListNode<T, Nullable>
    | (Nullable extends true ? null : never);

  public constructor(value: T) {
    this.value = value;
    this.next = null!;
    this.prev = null!;
  }
}

export class LinkedList<T, Nullable extends boolean = true> {
  public head: LinkedListNode<T, Nullable>;
  public tail: LinkedListNode<T, Nullable>;

  public constructor() {
    this.head = null!;
    this.tail = null!;
  }

  public reverse(start: LinkedListNode<T, Nullable> | null = this.head): this {
    if (!start) return this;

    const node = start;

    let p: LinkedListNode<T, Nullable> | null = start;

    do {
      const tmp = p.next as LinkedListNode<T, Nullable>;
      p.next = p.prev;
      p.prev = tmp;
      p = tmp;
    } while (p && p !== node);

    return this;
  }

  public count(start: LinkedListNode<T, Nullable> | null = this.head): number {
    let count = 0;

    if (!start) return count;

    const node = start;
    let p: LinkedListNode<T, Nullable> | null = start;

    do {
      count++;
      p = p.next;
    } while (p && p !== node);

    return count;
  }
}
