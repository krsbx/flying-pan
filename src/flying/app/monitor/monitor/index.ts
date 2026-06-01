import type { Coordinate2D, Resolution } from '@/flying/types';
import type { GLFW } from '@/glfw';
import { FVector2, Vector2 } from '@/utility/vectors';
import { type Pointer } from 'bun:ffi';

export interface MonitorOptions {
  gl: GLFW;
  address: Pointer | null;
}

export class Monitor {
  public readonly gl: GLFW;
  public $address: Pointer | null;

  protected _name: string;

  public constructor(options: MonitorOptions) {
    this.gl = options.gl;
    this.$address = options.address;

    this._name = this.getName();
  }

  protected getName(): string {
    return this.gl
      .glfwGetMonitorName({
        monitor: this.$address,
      })
      .toString();
  }

  protected getMonitorScale(): Coordinate2D {
    const scaleVec = new FVector2();

    this.gl.glfwGetMonitorContentScale({
      monitor: this.$address,
      xscale: scaleVec.xRef,
      yscale: scaleVec.yRef,
    });

    return {
      x: scaleVec.x,
      y: scaleVec.y,
    };
  }

  protected getMonitorPosition(): Coordinate2D {
    const posVec = new Vector2();

    this.gl.glfwGetMonitorPos({
      monitor: this.$address,
      xpos: posVec.xRef,
      ypos: posVec.yRef,
    });

    return {
      x: posVec.x,
      y: posVec.y,
    };
  }

  protected getWorkArea(): Coordinate2D & Resolution {
    const sizeVec = new Vector2();
    const posVec = new Vector2();

    this.gl.glfwGetMonitorWorkarea({
      monitor: this.$address,
      xpos: posVec.xRef,
      ypos: posVec.yRef,
      width: sizeVec.xRef,
      height: sizeVec.yRef,
    });

    return {
      x: posVec.x,
      y: posVec.y,
      width: sizeVec.x,
      height: sizeVec.y,
    };
  }

  public get name() {
    return this._name;
  }

  public get position() {
    return this.getMonitorPosition();
  }

  public get scale() {
    return this.getMonitorScale();
  }

  public get workArea() {
    return this.getWorkArea();
  }
}
