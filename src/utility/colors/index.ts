import { BaseStruct } from '../base-struct';

export class Color extends BaseStruct {
  public static override readonly BYTE_SIZE = 4;

  public get r() {
    return this.$view.getUint8(0);
  }

  public set r(value: number) {
    this.$view.setUint8(0, value);
  }

  public get g() {
    return this.$view.getUint8(1);
  }

  public set g(value: number) {
    this.$view.setUint8(1, value);
  }

  public get b() {
    return this.$view.getUint8(2);
  }

  public set b(value: number) {
    this.$view.setUint8(2, value);
  }

  public get a() {
    return this.$view.getUint8(3);
  }

  public set a(value: number) {
    this.$view.setUint8(3, value);
  }

  public toNumber() {
    return (this.r << 24) | (this.g << 16) | (this.b << 8) | (this.a << 0);
  }
}
