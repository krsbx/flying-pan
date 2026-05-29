import type { GLFW } from '@/glfw';
import type { Pointer } from 'bun:ffi';
import type { KnownColor } from '../rendererx';

export interface WindowOptions {
  width: number;
  height: number;
  title: string;

  /** Active window identifier - Default use {title} */
  identifier?: string | null;
  backgroundColor?: KnownColor | (string & {}) | null;
}

export class Window {
  public readonly gl: GLFW;
  public $address: Pointer | null;
  protected _width: number;
  protected _height: number;
  protected _title: string;
  protected _identifier: string;
  public backgroundColor: string;

  public constructor(options: WindowOptions & { gl: GLFW }) {
    this.gl = options.gl;
    this._width = options.width;
    this._height = options.height;
    this._title = options.title;
    this._identifier = options.identifier || options.title;
    this.backgroundColor = options.backgroundColor || '#1a1a2e';

    this.$address = this.init();
  }

  protected init() {
    const window = this.gl.glfwCreateWindow({
      width: this.width,
      height: this.height,
      title: this.title,
      monitor: null,
      share: null,
    });

    return window;
  }

  public get resolution() {
    return {
      width: this.width,
      height: this.height,
    };
  }

  public set resolution(value: { width: number; height: number }) {
    this._width = value.width;
    this._height = value.height;

    this.gl.glfwSetWindowSize({
      window: this.$address,
      width: this.width,
      height: this.height,
    });
  }

  public get width() {
    return this._width;
  }

  public set width(value: number) {
    this._width = value;

    this.resolution = this;
  }

  public get height() {
    return this._height;
  }

  public set height(value: number) {
    this._height = value;

    this.resolution = this;
  }

  public get title() {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }
}
