import { BaseStruct } from '@/utility/base-struct';
import { ALIGNED_QUAD_SIZE } from './constant';

export class AlignedQuad extends BaseStruct {
  public static override readonly BYTE_SIZE: number = ALIGNED_QUAD_SIZE;

  public get x0() {
    return this.$view.getFloat32(0, true);
  }

  public set x0(value: number) {
    this.$view.setFloat32(0, value, true);
  }

  public get y0() {
    return this.$view.getFloat32(4, true);
  }

  public set y0(value: number) {
    this.$view.setFloat32(4, value, true);
  }

  public get s0() {
    return this.$view.getFloat32(8, true);
  }

  public set s0(value: number) {
    this.$view.setFloat32(8, value, true);
  }

  public get t0() {
    return this.$view.getFloat32(12, true);
  }

  public set t0(value: number) {
    this.$view.setFloat32(12, value, true);
  }

  public get x1() {
    return this.$view.getFloat32(16, true);
  }

  public set x1(value: number) {
    this.$view.setFloat32(16, value, true);
  }

  public get y1() {
    return this.$view.getFloat32(20, true);
  }

  public set y1(value: number) {
    this.$view.setFloat32(20, value, true);
  }

  public get s1() {
    return this.$view.getFloat32(24, true);
  }

  public set s1(value: number) {
    this.$view.setFloat32(24, value, true);
  }

  public get t1() {
    return this.$view.getFloat32(28, true);
  }

  public set t1(value: number) {
    this.$view.setFloat32(28, value, true);
  }
}
