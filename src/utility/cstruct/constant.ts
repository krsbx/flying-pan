import type { BigIntCType, NumberedCType } from './types';

export const ReadArrayPrimitiveReturnTypeMap = {
  u8: Uint8Array,
  i8: Int8Array,
  u16: Uint16Array,
  i16: Int16Array,
  u32: Uint32Array,
  i32: Int32Array,
  f32: Float32Array,
  f64: Float64Array,
  u64: BigUint64Array,
  i64: BigInt64Array,
} satisfies Record<NumberedCType | BigIntCType, unknown>;

export type ReadArrayPrimitiveReturnTypeMap =
  typeof ReadArrayPrimitiveReturnTypeMap;

export type ReadArrayPrimitiveReturnType =
  (typeof ReadArrayPrimitiveReturnTypeMap)[keyof typeof ReadArrayPrimitiveReturnTypeMap];
