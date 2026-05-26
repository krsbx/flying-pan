import type { StructInit } from '@/types/shared';
import { type Pointer, ptr, toArrayBuffer } from 'bun:ffi';

export type BaseStructOptions = Pointer | Uint8Array;

type BaseStructStatic = Omit<typeof BaseStruct, 'prototype'>;

export type BaseStructConstructor<T extends BaseStruct = BaseStruct> = {
  new (data: BaseStructOptions): T;
} & BaseStructStatic;

export abstract class BaseStruct {
  public static readonly BYTE_SIZE: number;

  public $memory: Uint8Array;
  public $view: DataView;

  public get $address(): Pointer {
    return ptr(this.$memory);
  }

  public constructor(data: BaseStructOptions) {
    const BYTE_SIZE = (new.target as typeof BaseStruct).BYTE_SIZE;

    if (!BYTE_SIZE) {
      throw new Error('Missing BYTE_SIZE');
    }

    if (data instanceof Uint8Array) {
      this.$memory = data;
    } else {
      const buffer = toArrayBuffer(data, 0, BYTE_SIZE);
      this.$memory = new Uint8Array(buffer);
    }

    this.$view = new DataView(
      this.$memory.buffer,
      this.$memory.byteOffset,
      this.$memory.byteLength
    );
  }

  public static allocMemory() {
    if (!this.BYTE_SIZE) {
      throw new Error('Missing BYTE_SIZE');
    }

    return new Uint8Array(this.BYTE_SIZE);
  }

  public static create<T extends BaseStruct>(this: BaseStructConstructor<T>): T;
  public static create<T extends BaseStruct>(
    this: BaseStructConstructor<T>,
    data: StructInit<T>
  ): T;
  public static create<T extends BaseStruct>(
    this: BaseStructConstructor<T>,
    data?: StructInit<T>
  ): T;
  public static create<T extends BaseStruct>(
    this: BaseStructConstructor<T>,
    data?: StructInit<T>
  ) {
    const instance = new this(this.allocMemory());

    if (data) Object.assign(instance, data);

    return instance;
  }

  public static fromPointer<T extends BaseStruct>(
    this: BaseStructConstructor<T>,
    pointer: Pointer
  ) {
    return new this(pointer);
  }

  public clone(): this;
  public clone(data: StructInit<this>): this;
  public clone(data?: StructInit<this>): this;
  public clone(data?: StructInit<this>) {
    const ctor = this.constructor as BaseStructConstructor<this>;

    const instance = new ctor(this.$memory.slice());

    if (data) Object.assign(instance, data);

    return instance;
  }

  public reset() {
    this.$memory.fill(0);

    return this;
  }

  public equals(other: BaseStruct): boolean {
    if (this.$memory.length !== other.$memory.length) return false;

    return this.$memory.every((byte, i) => byte === other.$memory[i]);
  }
}
