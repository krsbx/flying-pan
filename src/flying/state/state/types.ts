export interface StateForOptions<T> {
  stableId: number;
  initial: T;
}

export interface SetStateOptions<T> {
  stableId: number;
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

export interface StoreFor {
  stateFor: StoreForFn;
  setState: StoreSetStateFn;
}
