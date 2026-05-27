import { CStruct } from '../cstruct';
import type { Vector3Options } from './types';
import { Vector2 } from './vector2';

export class Vector3 extends Vector2 {
  private zStruct: CStruct;

  public constructor(options: Vector3Options | null = null) {
    super(options);

    this.zStruct = new CStruct({ length: CStruct.BYTE_SIZE.i32 });

    if (options) {
      this.zStruct.setValue(0, options.z, 'i32');
    }
  }

  public get z() {
    return this.zStruct.getValue(0, 'i32');
  }

  public set z(value: number) {
    this.zStruct.setValue(0, value, 'i32');
  }

  public get zRef() {
    return this.zStruct.$address;
  }
}
