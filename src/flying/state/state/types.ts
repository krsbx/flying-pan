export interface StateForOptions<T> {
  stableId: number;
  initial: T;
}

export interface SetStateOptions<T> {
  stableId: number;
  value: T;
}

export interface StateForByNameOptions<T> {
  name: string;
  initial: T;
}

export interface SetStateByNameOptions<T> {
  name: string;
  value: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface StoreForFn<T = any> {
  (options: StateForOptions<T>): T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface StoreSetStateFn<T = any> {
  (options: SetStateOptions<T>): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface StoreForByNameFn<T = any> {
  (options: StateForByNameOptions<T>): T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface StoreSetStateByNameFn<T = any> {
  (options: SetStateByNameOptions<T>): void;
}

export interface IStateStore {
  stateFor: StoreForFn;
  setState: StoreSetStateFn;
  stateForByName: StoreForByNameFn;
  setStateByName: StoreSetStateByNameFn;
}
