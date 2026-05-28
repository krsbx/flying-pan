import { BaseStruct } from '@/utility/base-struct';
import { BAKED_CHAR_SIZE } from './constant';

export class BakedChar extends BaseStruct {
  public static override readonly BYTE_SIZE: number = BAKED_CHAR_SIZE;

  public get x0() {
    return this.$view.getUint16(0, true);
  }

  public set x0(value: number) {
    this.$view.setUint16(0, value, true);
  }

  public get y0() {
    return this.$view.getUint16(2, true);
  }

  public set y0(value: number) {
    this.$view.setUint16(2, value, true);
  }

  public get x1() {
    return this.$view.getUint16(4, true);
  }

  public set x1(value: number) {
    this.$view.setUint16(4, value, true);
  }

  public get y1() {
    return this.$view.getUint16(6, true);
  }

  public set y1(value: number) {
    this.$view.setUint16(6, value, true);
  }

  public get xOff() {
    return this.$view.getFloat32(8, true);
  }

  public set xOff(value: number) {
    this.$view.setFloat32(8, value, true);
  }

  public get yOff() {
    return this.$view.getFloat32(12, true);
  }

  public set yOff(value: number) {
    this.$view.setFloat32(12, value, true);
  }

  public get xAdvance() {
    return this.$view.getFloat32(16, true);
  }

  public set xAdvance(value: number) {
    this.$view.setFloat32(16, value, true);
  }
}
