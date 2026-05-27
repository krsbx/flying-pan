import { CStruct } from '../cstruct';
import { FVector2 } from './fvector2';
import type { Vector3Options } from './types';

export class FVector3 extends FVector2 {
  private zStruct: CStruct;

  public constructor(options: Vector3Options | null = null) {
    super(options);

    this.zStruct = new CStruct({ length: CStruct.BYTE_SIZE.f32 });

    if (options) {
      this.zStruct.setValue(0, options.z, 'f32');
    }
  }

  public get z() {
    return this.zStruct.getValue(0, 'f32');
  }

  public set z(value: number) {
    this.zStruct.setValue(0, value, 'f32');
  }

  public get zRef() {
    return this.zStruct.$address;
  }
}
