/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSCallback, type FFIFunction } from 'bun:ffi';

export class TypedJSCallback<
  T extends (...args: any[]) => any = (...args: any[]) => any,
> extends JSCallback {
  public constructor(options: T, definition: FFIFunction) {
    super(options, definition);
  }
}
