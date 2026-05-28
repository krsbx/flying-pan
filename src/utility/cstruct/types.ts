import { type Pointer, read } from 'bun:ffi';

export type ReadType = keyof typeof read;

export type CStructOptionsWithLength = {
  length: number;
};

export type CStructOptionsWithAddress = {
  address: Pointer;
};

export type CStructOptionsWithLengthAndAddress = {
  length: number;
  address: Pointer;
};

export type CStructOptions =
  | number
  | CStructOptionsWithLength
  | CStructOptionsWithAddress
  | CStructOptionsWithLengthAndAddress;

export type BigIntCType = Extract<ReadType, 'u64' | 'i64'>;

export type PointerCType = Extract<ReadType, 'intptr' | 'ptr'>;

export type NumberedCType = Exclude<ReadType, BigIntCType | PointerCType>;
