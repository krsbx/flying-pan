import { CStruct } from '@/utility/cstruct';
import type { FFITypeStringToType } from 'bun:ffi';
import type { DataViewDataType } from '../types';

export const DataViewPrefix = {
  i32: 'Int32',
  u32: 'Uint32',
  i16: 'Int16',
  u16: 'Uint16',
  i8: 'Int8',
  u8: 'Uint8',
  f32: 'Float32',
  f64: 'Float64',
  i64: 'BigInt64',
  u64: 'BigUint64',
} satisfies Record<string, DataViewDataType>;

export type DataViewPrefix =
  (typeof DataViewPrefix)[keyof typeof DataViewPrefix];

export const TypeScriptType = {
  NUMBER: 'number',
  BIGINT: 'bigint',
  STRING: 'string',
  BOOLEAN: 'boolean',
  VOID: 'void',
  NEVER: 'never',
  POINTER: 'Pointer',
  TYPED_ARRAY: 'NodeJS.TypedArray',
  CSTRING: 'CString',
  NULL: 'null',
} as const;

export type TypeScriptType =
  (typeof TypeScriptType)[keyof typeof TypeScriptType];

export const CType = {
  INT: 'int',
  UINT: 'unsigned int',
  SHORT: 'short',
  USHORT: 'unsigned short',
  CHAR: 'char',
  UCHAR: 'unsigned char',
  FLOAT: 'float',
  DOUBLE: 'double',
  LONG_LONG: 'long long',
  ULONG_LONG: 'unsigned long long',
  LONG: 'long',
  ULONG: 'unsigned long',
  LONG_DOUBLE: 'long double',
  SIZE_T: 'size_t',
  VOID: 'void',
} as const;

export type CType = (typeof CType)[keyof typeof CType];

export const CTypeToFFIType = {
  [CType.INT]: 'i32',
  [CType.UINT]: 'u32',
  [CType.SHORT]: 'i16',
  [CType.USHORT]: 'u16',
  [CType.CHAR]: 'i8',
  [CType.UCHAR]: 'u8',
  [CType.FLOAT]: 'f32',
  [CType.DOUBLE]: 'f64',
  [CType.LONG_LONG]: 'i64',
  [CType.ULONG_LONG]: 'u64',
  [CType.LONG]: 'i32',
  [CType.ULONG]: 'u32',
  [CType.LONG_DOUBLE]: 'f64',
  [CType.SIZE_T]: 'u64',
  [CType.VOID]: 'void',
} satisfies Record<CType, keyof FFITypeStringToType>;

export const PrimitiveMap = {
  [CType.INT]: {
    prefix: DataViewPrefix.i32,
    size: CStruct.BYTE_SIZE.i32,
    tsType: TypeScriptType.NUMBER,
  },
  [CType.UINT]: {
    prefix: DataViewPrefix.u32,
    size: CStruct.BYTE_SIZE.u32,
    tsType: TypeScriptType.NUMBER,
  },
  [CType.SHORT]: {
    prefix: DataViewPrefix.i16,
    size: CStruct.BYTE_SIZE.i16,
    tsType: TypeScriptType.NUMBER,
  },
  [CType.USHORT]: {
    prefix: DataViewPrefix.u16,
    size: CStruct.BYTE_SIZE.u16,
    tsType: TypeScriptType.NUMBER,
  },
  [CType.CHAR]: {
    prefix: DataViewPrefix.i8,
    size: CStruct.BYTE_SIZE.i8,
    tsType: TypeScriptType.NUMBER,
  },
  [CType.UCHAR]: {
    prefix: DataViewPrefix.u8,
    size: CStruct.BYTE_SIZE.u8,
    tsType: TypeScriptType.NUMBER,
  },
  [CType.FLOAT]: {
    prefix: DataViewPrefix.f32,
    size: CStruct.BYTE_SIZE.f32,
    tsType: TypeScriptType.NUMBER,
  },
  [CType.DOUBLE]: {
    prefix: DataViewPrefix.f64,
    size: CStruct.BYTE_SIZE.f64,
    tsType: TypeScriptType.NUMBER,
  },
  [CType.LONG_LONG]: {
    prefix: DataViewPrefix.i64,
    size: CStruct.BYTE_SIZE.i64,
    tsType: TypeScriptType.BIGINT,
  },
  [CType.ULONG_LONG]: {
    prefix: DataViewPrefix.u64,
    size: CStruct.BYTE_SIZE.u64,
    tsType: TypeScriptType.BIGINT,
  },
  [CType.LONG]: {
    prefix: DataViewPrefix.i32,
    size: CStruct.BYTE_SIZE.i32,
    tsType: TypeScriptType.NUMBER,
  },
  [CType.ULONG]: {
    prefix: DataViewPrefix.u32,
    size: CStruct.BYTE_SIZE.u32,
    tsType: TypeScriptType.NUMBER,
  },
  [CType.LONG_DOUBLE]: {
    prefix: DataViewPrefix.f64,
    size: CStruct.BYTE_SIZE.f64,
    tsType: TypeScriptType.NUMBER,
  },
  [CType.SIZE_T]: {
    prefix: DataViewPrefix.u64,
    size: CStruct.BYTE_SIZE.u64,
    tsType: TypeScriptType.BIGINT,
  },
  [CType.VOID]: {
    /** Keep it as i64 for the sake of tsc, never in use in world cases */
    prefix: DataViewPrefix.i64,
    /** Keep it as i64 for the sake of tsc, never in use in world cases */
    size: CStruct.BYTE_SIZE.i64,
    tsType: TypeScriptType.NEVER,
  },
} satisfies Record<
  CType,
  {
    prefix: DataViewPrefix;
    size: number;
    tsType: TypeScriptType;
  }
>;
