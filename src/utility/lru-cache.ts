export interface LRUCacheOptions {
  capacity: number;
}

/**
 * LRU cache backed by a Map.
 *
 * Map preserves insertion order — on access, entries are moved to the end
 * (most recently used). When capacity is exceeded, the oldest entry is
 * evicted.
 */
export class LRUCache<K, V> {
  private readonly entries: Map<K, V> = new Map();
  private readonly capacity: number;

  public constructor(options: LRUCacheOptions) {
    this.capacity = options.capacity;
  }

  public get(key: K): V | undefined {
    if (!this.entries.has(key)) return undefined;

    const value = this.entries.get(key)!;
    this.entries.delete(key);
    this.entries.set(key, value);
    return value;
  }

  public set(key: K, value: V): void {
    if (this.entries.has(key)) {
      this.entries.delete(key);
    } else if (this.entries.size >= this.capacity) {
      const oldest = this.entries.keys().next().value;
      if (oldest !== undefined) this.entries.delete(oldest);
    }

    this.entries.set(key, value);
  }

  public has(key: K): boolean {
    return this.entries.has(key);
  }

  public get size(): number {
    return this.entries.size;
  }

  public clear(): void {
    this.entries.clear();
  }
}
