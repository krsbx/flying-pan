import { CStruct } from '../cstruct';
import { FVector3 } from './fvector3';
import type { Vector4Options } from './types';

export class FVector4 extends FVector3 {
  private wStruct: CStruct;

  public constructor(options: Vector4Options | null = null) {
    super(options);

    this.wStruct = new CStruct({ length: CStruct.BYTE_SIZE.f32 });

    if (options) {
      this.wStruct.setValue(0, options.w, 'f32');
    }
  }

  public get w() {
    return this.wStruct.getValue(0, 'f32');
  }

  public set w(value: number) {
    this.wStruct.setValue(0, value, 'f32');
  }

  public get wRef() {
    return this.wStruct.$address;
  }
}
