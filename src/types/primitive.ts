import type { Brand } from '@/types/shared';

export type PrimitiveNumber<K extends string> = number | Brand<number, K>;

export type Float = PrimitiveNumber<'Float'>;
export type UFloat = PrimitiveNumber<'UFloat'>;
export type Int8 = PrimitiveNumber<'Int8'>;
export type Int16 = PrimitiveNumber<'Int16'>;
export type Int32 = PrimitiveNumber<'Int32'>;
export type UInt8 = PrimitiveNumber<'UInt8'>;
export type UInt16 = PrimitiveNumber<'UInt16'>;
export type UInt32 = PrimitiveNumber<'UInt32'>;
export type Bool = boolean | Brand<boolean, 'Bool'>;
