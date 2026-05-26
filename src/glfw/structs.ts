import { BaseStruct } from '@utility/base-struct';
import type { Pointer } from 'bun:ffi';

export class __darwin_pthread_handler_rec extends BaseStruct {
  public static override readonly BYTE_SIZE = 24;

  public get __routine(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── __arg (offset 8, void) ───
  public get __arg(): Pointer {
    return Number(this.$view.getBigInt64(8, true)) as Pointer;
  }
  public set __arg(value: Pointer) {
    this.$view.setBigInt64(8, BigInt(value), true);
  }

  // ─── __next (offset 16, struct __darwin_pthread_handler_rec) ───
  public get __next(): Pointer {
    return Number(this.$view.getBigInt64(16, true)) as Pointer;
  }
  public set __next(value: Pointer) {
    this.$view.setBigInt64(16, BigInt(value), true);
  }
}

export class _opaque_pthread_attr_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 64;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }
}

export class _opaque_pthread_cond_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 48;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }
}

export class _opaque_pthread_condattr_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 16;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }
}

export class _opaque_pthread_mutex_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 64;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }
}

export class _opaque_pthread_mutexattr_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 16;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }
}

export class _opaque_pthread_once_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 16;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }
}

export class _opaque_pthread_rwlock_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 200;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }
}

export class _opaque_pthread_rwlockattr_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 24;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }
}

export class _opaque_pthread_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 8192;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  // ─── __cleanup_stack (offset 8, struct __darwin_pthread_handler_rec) ───
  public get __cleanup_stack(): Pointer {
    return Number(this.$view.getBigInt64(8, true)) as Pointer;
  }
  public set __cleanup_stack(value: Pointer) {
    this.$view.setBigInt64(8, BigInt(value), true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 16) as unknown as Pointer;
  }
}

export class GLFWvidmode extends BaseStruct {
  public static override readonly BYTE_SIZE = 24;

  // ─── width (offset 0, int) ───
  public get width(): number {
    return this.$view.getInt32(0, true);
  }
  public set width(value: number) {
    this.$view.setInt32(0, value, true);
  }

  // ─── height (offset 4, int) ───
  public get height(): number {
    return this.$view.getInt32(4, true);
  }
  public set height(value: number) {
    this.$view.setInt32(4, value, true);
  }

  // ─── redBits (offset 8, int) ───
  public get redBits(): number {
    return this.$view.getInt32(8, true);
  }
  public set redBits(value: number) {
    this.$view.setInt32(8, value, true);
  }

  // ─── greenBits (offset 12, int) ───
  public get greenBits(): number {
    return this.$view.getInt32(12, true);
  }
  public set greenBits(value: number) {
    this.$view.setInt32(12, value, true);
  }

  // ─── blueBits (offset 16, int) ───
  public get blueBits(): number {
    return this.$view.getInt32(16, true);
  }
  public set blueBits(value: number) {
    this.$view.setInt32(16, value, true);
  }

  // ─── refreshRate (offset 20, int) ───
  public get refreshRate(): number {
    return this.$view.getInt32(20, true);
  }
  public set refreshRate(value: number) {
    this.$view.setInt32(20, value, true);
  }
}

export class GLFWgammaramp extends BaseStruct {
  public static override readonly BYTE_SIZE = 32;

  // ─── red (offset 0, unsigned short) ───
  public get red(): Pointer {
    return Number(this.$view.getBigInt64(0, true)) as Pointer;
  }
  public set red(value: Pointer) {
    this.$view.setBigInt64(0, BigInt(value), true);
  }

  // ─── green (offset 8, unsigned short) ───
  public get green(): Pointer {
    return Number(this.$view.getBigInt64(8, true)) as Pointer;
  }
  public set green(value: Pointer) {
    this.$view.setBigInt64(8, BigInt(value), true);
  }

  // ─── blue (offset 16, unsigned short) ───
  public get blue(): Pointer {
    return Number(this.$view.getBigInt64(16, true)) as Pointer;
  }
  public set blue(value: Pointer) {
    this.$view.setBigInt64(16, BigInt(value), true);
  }

  // ─── size (offset 24, unsigned int) ───
  public get size(): number {
    return this.$view.getUint32(24, true);
  }
  public set size(value: number) {
    this.$view.setUint32(24, value, true);
  }
}

export class GLFWimage extends BaseStruct {
  public static override readonly BYTE_SIZE = 16;

  // ─── width (offset 0, int) ───
  public get width(): number {
    return this.$view.getInt32(0, true);
  }
  public set width(value: number) {
    this.$view.setInt32(0, value, true);
  }

  // ─── height (offset 4, int) ───
  public get height(): number {
    return this.$view.getInt32(4, true);
  }
  public set height(value: number) {
    this.$view.setInt32(4, value, true);
  }

  // ─── pixels (offset 8, unsigned char) ───
  public get pixels(): Pointer {
    return Number(this.$view.getBigInt64(8, true)) as Pointer;
  }
  public set pixels(value: Pointer) {
    this.$view.setBigInt64(8, BigInt(value), true);
  }
}

export class GLFWgamepadstate extends BaseStruct {
  public static override readonly BYTE_SIZE = 40;

  public get buttons(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  public get axes(): Pointer {
    return (this.$address + 16) as unknown as Pointer;
  }
}

export class GLFWallocator extends BaseStruct {
  public static override readonly BYTE_SIZE = 32;

  public get allocate(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  public get reallocate(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }

  public get deallocate(): Pointer {
    return (this.$address + 16) as unknown as Pointer;
  }

  // ─── user (offset 24, void) ───
  public get user(): Pointer {
    return Number(this.$view.getBigInt64(24, true)) as Pointer;
  }
  public set user(value: Pointer) {
    this.$view.setBigInt64(24, BigInt(value), true);
  }
}
