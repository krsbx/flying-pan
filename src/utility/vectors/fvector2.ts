import { CStruct } from '../cstruct';
import type { Vector2Options } from './types';

export class FVector2 {
  private xStruct: CStruct;
  private yStruct: CStruct;

  public constructor(options: Vector2Options | null = null) {
    this.xStruct = new CStruct({ length: CStruct.BYTE_SIZE.f32 });
    this.yStruct = new CStruct({ length: CStruct.BYTE_SIZE.f32 });

    if (options) {
      this.xStruct.setValue(0, options.x, 'f32');
      this.yStruct.setValue(0, options.y, 'f32');
    }
  }

  public get x() {
    return this.xStruct.getValue(0, 'f32');
  }

  public set x(value: number) {
    this.xStruct.setValue(0, value, 'f32');
  }

  public get xRef() {
    return this.xStruct.$address;
  }

  public get y() {
    return this.yStruct.getValue(0, 'f32');
  }

  public set y(value: number) {
    this.yStruct.setValue(0, value, 'f32');
  }

  public get yRef() {
    return this.yStruct.$address;
  }
}
