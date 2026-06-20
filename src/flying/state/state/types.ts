export interface StateForOptions<T> {
  stableId: number;
  initial: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface StoreForFn<T = (() => any) | any> {
  (options: StateForOptions<T>): T;
}

export interface StoreFor {
  stateFor: StoreForFn;
}
