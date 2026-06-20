import type { SetStateOptions, StateForOptions, StoreFor } from './types';

export class StateStore implements StoreFor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected store: Map<number, any>;

  public constructor() {
    this.store = new Map();
  }

  public stateFor<T, U = (() => T) | T>(options: StateForOptions<U>): T {
    const { stableId, initial } = options;
    const existing = this.store.get(stableId);

    if (existing !== undefined) {
      return existing as T;
    }

    const created = typeof initial === 'function' ? initial() : initial;
    this.store.set(stableId, created);

    return created;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setState<T = any>(options: SetStateOptions<T>): void {
    this.store.set(options.stableId, options.value);
  }

  public destroy(stableId: number): void {
    this.store.delete(stableId);
  }

  public clear(): void {
    this.store.clear();
  }
}
