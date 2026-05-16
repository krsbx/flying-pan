import { type Pointer, ptr, toArrayBuffer } from 'bun:ffi';
import type {
  BigIntCType,
  CStructOptions,
  NumberedCType,
  PointerCType,
  ReadType,
} from './types';
import {
  readArray,
  readArrayLazy,
  readArrayPointer,
  readArrayPrimitive,
  readArrayString,
  writeArray,
  writeArrayPointer,
  writeArrayString,
} from './utils';

export class CStruct<Options extends CStructOptions> {
  public static readonly BYTE_SIZE = {
    u8: 1,
    i8: 1,
    u16: 2,
    i16: 2,
    u32: 4,
    i32: 4,
    f32: 4,
    u64: 8,
    i64: 8,
    f64: 8,
    intptr: 8,
    ptr: 8,
  } as const;

  public static readArray = readArray;
  public static readArrayPointer = readArrayPointer;
  public static readArrayLazy = readArrayLazy;
  public static readArrayPrimitive = readArrayPrimitive;
  public static readArrayString = readArrayString;
  public static writeArray = writeArray;
  public static writeArrayString = writeArrayString;
  public static writeArrayPointer = writeArrayPointer;

  public $memory: Uint8Array;
  public $address: Pointer;
  public $view: DataView;

  public constructor(options: Options) {
    if ('address' in options && 'length' in options) {
      const buffer = toArrayBuffer(options.address, 0, options.length);
      this.$memory = new Uint8Array(buffer);
      this.$address = options.address;
    } else if ('length' in options) {
      this.$memory = new Uint8Array(options.length);
      this.$address = ptr(this.$memory);
    } else {
      const buffer = toArrayBuffer(options.address);
      this.$memory = new Uint8Array(buffer);
      this.$address = options.address;
    }

    this.$view = new DataView(
      this.$memory.buffer,
      this.$memory.byteOffset,
      this.$memory.byteLength
    );
  }

  public getValue(offset: number, type: NumberedCType): number;
  public getValue(offset: number, type: BigIntCType): bigint;
  public getValue(offset: number, type: PointerCType): Pointer;
  public getValue(offset: number, type: ReadType) {
    switch (type) {
      case 'u8':
        return this.$view.getUint8(offset);

      case 'i8':
        return this.$view.getInt8(offset);

      case 'u16':
        return this.$view.getUint16(offset, true);

      case 'i16':
        return this.$view.getInt16(offset, true);

      case 'u32':
        return this.$view.getUint32(offset, true);

      case 'i32':
        return this.$view.getInt32(offset, true);

      case 'f32':
        return this.$view.getFloat32(offset, true);

      case 'u64':
        return this.$view.getBigUint64(offset, true);

      case 'i64':
        return this.$view.getBigInt64(offset, true);

      case 'f64':
        return this.$view.getFloat64(offset, true);

      case 'intptr':
      case 'ptr':
        return Number(this.$view.getBigInt64(offset, true)) as Pointer;

      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  }

  public setValue(offset: number, value: number, type: NumberedCType): this;
  public setValue(offset: number, value: bigint, type: BigIntCType): this;
  public setValue(offset: number, value: number, type: PointerCType): this;
  public setValue(offset: number, value: never, type: ReadType) {
    if (!this.$view) {
      throw new Error('Cannot write to a read-only struct');
    }

    switch (type) {
      case 'u8':
        this.$view.setUint8(offset, value);
        break;

      case 'i8':
        this.$view.setInt8(offset, value);
        break;

      case 'u16':
        this.$view.setUint16(offset, value, true);
        break;

      case 'i16':
        this.$view.setInt16(offset, value, true);
        break;

      case 'u32':
        this.$view.setUint32(offset, value, true);
        break;

      case 'i32':
        this.$view.setInt32(offset, value, true);
        break;

      case 'f32':
        this.$view.setFloat32(offset, value, true);
        break;

      case 'u64':
        this.$view.setBigUint64(offset, BigInt(value), true);
        break;

      case 'i64':
        this.$view.setBigInt64(offset, BigInt(value), true);
        break;

      case 'f64':
        this.$view.setFloat64(offset, value, true);
        break;

      case 'intptr':
      case 'ptr':
        this.$view.setBigInt64(offset, BigInt(value), true);
        break;

      default:
        throw new Error(`Unsupported type: ${type}`);
    }

    return this;
  }

  public clone() {
    if (!this.$memory) {
      throw new Error('Cannot clone a read-only struct');
    }

    const struct = new CStruct({
      length: this.$memory.byteLength,
    });

    struct.$memory = this.$memory.slice();
    struct.$address = ptr(struct.$memory);

    return struct;
  }
}
