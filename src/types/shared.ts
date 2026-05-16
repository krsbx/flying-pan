export type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type NumericRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export type Brand<K, T> = K & { __brand: T };

// Build a tuple of exact length
export type BuildTuple<
  Length extends number,
  Value,
  Acc extends Value[] = [],
> = Acc['length'] extends Length
  ? Acc
  : BuildTuple<Length, Value, [...Acc, Value]>;

// Generate union of readonly tuples from Min to Max length
export type TupleRange<
  Min extends number,
  Max extends number,
  Value,
  Current extends Value[] = BuildTuple<Min, Value>,
  Acc = Readonly<Current>,
> = Current['length'] extends Max
  ? Acc
  : TupleRange<
      Min,
      Max,
      Value,
      [...Current, Value],
      Acc | Readonly<[...Current, Value]>
    >;

export type PublicStructProperties<T> = {
  [K in keyof T as K extends `$${string}`
    ? never
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      T[K] extends (...args: any[]) => any
      ? never
      : K]: T[K];
};

export type StructInit<T> = Partial<PublicStructProperties<T>>;
