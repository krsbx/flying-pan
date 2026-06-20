import type { StateForOptions } from './types';

export class StateStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected store: Map<number, any>;

  public constructor() {
    this.store = new Map();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public stateFor<T = (() => any) | any>(options: StateForOptions<T>): T {
    const { stableId, initial } = options;
    const existing = this.store.get(stableId);

    if (existing !== undefined) {
      return existing as T;
    }

    const created = typeof initial === 'function' ? initial() : initial;
    this.store.set(stableId, created);

    return created;
  }

  public destroy(stableId: number): void {
    this.store.delete(stableId);
  }

  public clear(): void {
    this.store.clear();
  }
}
