import { CString, type Pointer, ptr, toArrayBuffer } from 'bun:ffi';
import { CStruct } from '.';
import type { BaseStruct, BaseStructConstructor } from '../base-struct';
import { stringToCString } from '../common';
import { ReadArrayPrimitiveReturnTypeMap } from './constant';
import type {
  BigIntCType,
  NumberedCType,
  PointerCType,
  ReadType,
} from './types';

export function readArray<
  T extends BaseStructConstructor,
  U extends InstanceType<T>,
>(StructClass: T, address: Pointer, count: number): U[];
export function readArray<
  T extends BaseStructConstructor,
  U extends InstanceType<T>,
>(StructClass: T, address: Pointer, count: number, clone: true): U[];
export function readArray<T extends BaseStructConstructor>(
  StructClass: T,
  address: Pointer,
  count: number,
  clone?: boolean
) {
  if (!address || count <= 0) return [];

  const totalSize = count * StructClass.BYTE_SIZE;
  const buffer = toArrayBuffer(address, 0, totalSize);
  const memory = new Uint8Array(buffer);

  return Array.from({ length: count }, (_, i) => {
    const offset = i * StructClass.BYTE_SIZE;

    const instance = new StructClass(
      memory.subarray(offset, offset + StructClass.BYTE_SIZE)
    );

    return clone ? instance.clone() : instance;
  });
}

export function readArrayPointer<
  T extends BaseStructConstructor,
  U extends InstanceType<T>,
>(StructClass: T, address: Pointer, count: number): U[];
export function readArrayPointer<
  T extends BaseStructConstructor,
  U extends InstanceType<T>,
>(StructClass: T, address: Pointer, count: number, clone: true): U[];
export function readArrayPointer<T extends BaseStructConstructor>(
  StructClass: T,
  address: Pointer,
  count: number,
  clone?: boolean
) {
  const pointers = CStruct.readArrayPrimitive(address, count, 'ptr');

  return pointers.map((ptr) => {
    const instance = new StructClass(ptr);

    return clone ? instance.clone() : instance;
  });
}

export function readArrayLazy<
  T extends BaseStructConstructor,
  U extends InstanceType<T>,
>(StructClass: T, address: Pointer, count: number): readonly U[] {
  if (!address || count <= 0) return [];

  function createInstance(index: number) {
    const offset = index * StructClass.BYTE_SIZE;

    return new StructClass(
      new Uint8Array(toArrayBuffer(address, offset, StructClass.BYTE_SIZE))
    );
  }

  return new Proxy([], {
    get(_, prop) {
      if (prop === 'length') return count;

      if (prop === Symbol.iterator) {
        return function* () {
          for (let i = 0; i < count; i++) {
            yield createInstance(i);
          }
        };
      }

      const index = Number(prop);

      if (typeof prop === 'string' && !Number.isNaN(index)) {
        if (index < 0 || index >= count) {
          throw new RangeError(`Index out of range: ${index}`);
        }

        return createInstance(index);
      }

      return undefined;
    },
    set() {
      throw new TypeError('Cannot assign to read only array');
    },
    has(_, prop) {
      if (prop === 'length') return true;

      if (typeof prop === 'string' && !isNaN(Number(prop))) {
        const index = Number(prop);
        return index >= 0 && index < count;
      }

      return false;
    },
  });
}

export function readArrayPrimitive<
  T extends NumberedCType,
  U extends ReadArrayPrimitiveReturnTypeMap[T],
  V extends InstanceType<U>,
>(address: Pointer, count: number, type: T): V;
export function readArrayPrimitive<
  T extends BigIntCType,
  U extends ReadArrayPrimitiveReturnTypeMap[T],
  V extends InstanceType<U>,
>(address: Pointer, count: number, type: T): V;
export function readArrayPrimitive(
  address: Pointer,
  count: number,
  type: PointerCType
): Pointer[];
export function readArrayPrimitive(
  address: Pointer,
  count: number,
  type: ReadType
) {
  if (!address || count <= 0) {
    if (type === 'ptr' || type === 'intptr') return [];

    const TypedArrayClass = ReadArrayPrimitiveReturnTypeMap[type];

    return new TypedArrayClass(0);
  }

  // For pointer types, we need to read each value individually
  if (type === 'ptr' || type === 'intptr') {
    const list = new CStruct({
      address,
      length: count * CStruct.BYTE_SIZE[type],
    });

    return Array.from({ length: count }, (_, i) =>
      list.getValue(i * CStruct.BYTE_SIZE[type], type)
    );
  }

  // For primitive types, create a typed array view directly
  const byteSize = count * CStruct.BYTE_SIZE[type];
  const buffer = toArrayBuffer(address, 0, byteSize);

  const TypedArrayClass = ReadArrayPrimitiveReturnTypeMap[type];

  return new TypedArrayClass(buffer);
}

export function readArrayString(address: Pointer, count: number | null) {
  let pointers: Pointer[] = [];

  if (count !== null) {
    pointers = CStruct.readArrayPrimitive(address, count, 'ptr');
  } else {
    let offset = 0;
    const size = CStruct.BYTE_SIZE.ptr;

    while (true) {
      const buffer = toArrayBuffer(address, offset, size);
      const ptr = Number(new DataView(buffer).getBigUint64(0, true)) as Pointer;

      if (!ptr) break;

      pointers.push(ptr);
      offset += size;
    }
  }

  return pointers.map((ptr) => new CString(ptr).toString());
}

export function writeArray<T extends BaseStruct>(
  items: T[],
  itemSize: number
): { buffer: Uint8Array; address: Pointer } {
  const buffer = new Uint8Array(items.length * itemSize);

  for (let i = 0; i < items.length; i++) {
    const offset = i * itemSize;
    buffer.set(items[i]!.$memory, offset);
  }

  return {
    address: ptr(buffer),
    buffer,
  };
}

export function writeArrayString(items: string[]) {
  const converted = items.map(stringToCString);
  const buffer = new BigUint64Array(items.length);

  for (let i = 0; i < converted.length; i++) {
    buffer[i] = BigInt(converted[i]!.ptr);
  }

  return {
    address: ptr(buffer),
    buffer,
    converted,
  };
}

export function writeArrayPointer(items: Pointer[]) {
  const buffer = new BigUint64Array(items.length);

  for (let i = 0; i < items.length; i++) {
    buffer[i] = BigInt(items[i]!);
  }

  return {
    address: ptr(buffer),
    buffer,
  };
}
