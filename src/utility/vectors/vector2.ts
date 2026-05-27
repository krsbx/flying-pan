import { CStruct } from '../cstruct';
import type { Vector2Options } from './types';

export class Vector2 {
  private xStruct: CStruct;
  private yStruct: CStruct;

  public constructor(options: Vector2Options | null = null) {
    this.xStruct = new CStruct({ length: CStruct.BYTE_SIZE.i32 });
    this.yStruct = new CStruct({ length: CStruct.BYTE_SIZE.i32 });

    if (options) {
      this.xStruct.setValue(0, options.x, 'i32');
      this.yStruct.setValue(0, options.y, 'i32');
    }
  }

  public get x() {
    return this.xStruct.getValue(0, 'i32');
  }

  public set x(value: number) {
    this.xStruct.setValue(0, value, 'i32');
  }

  public get xRef() {
    return this.xStruct.$address;
  }

  public get y() {
    return this.yStruct.getValue(0, 'i32');
  }

  public set y(value: number) {
    this.yStruct.setValue(0, value, 'i32');
  }

  public get yRef() {
    return this.yStruct.$address;
  }
}
