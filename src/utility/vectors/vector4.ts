import { CStruct } from '../cstruct';
import type { Vector4Options } from './types';
import { Vector3 } from './vector3';

export class Vector4 extends Vector3 {
  private wStruct: CStruct;

  public constructor(options: Vector4Options | null = null) {
    super(options);

    this.wStruct = new CStruct({ length: CStruct.BYTE_SIZE.i32 });

    if (options) {
      this.wStruct.setValue(0, options.w, 'i32');
    }
  }

  public get w() {
    return this.wStruct.getValue(0, 'i32');
  }

  public set w(value: number) {
    this.wStruct.setValue(0, value, 'i32');
  }

  public get wRef() {
    return this.wStruct.$address;
  }
}
