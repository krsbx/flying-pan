import type {
  IStateStore,
  SetStateByNameOptions,
  SetStateOptions,
  StateForByNameOptions,
  StateForOptions,
} from './types';

export class StateStore implements IStateStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected store: Map<number, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected namedStore: Map<string, any>;

  public constructor() {
    this.store = new Map();
    this.namedStore = new Map();
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

  public stateForByName<T, U = (() => T) | T>(
    options: StateForByNameOptions<U>
  ): T {
    const { name, initial } = options;
    const existing = this.namedStore.get(name);

    if (existing !== undefined) {
      return existing as T;
    }

    const created = typeof initial === 'function' ? initial() : initial;
    this.namedStore.set(name, created);

    return created;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setStateByName<T = any>(options: SetStateByNameOptions<T>): void {
    this.namedStore.set(options.name, options.value);
  }

  public destroy(stableId: number): void {
    this.store.delete(stableId);
  }

  public destroyByName(name: string): void {
    this.namedStore.delete(name);
  }

  public clear(): void {
    this.store.clear();
    this.namedStore.clear();
  }
}
