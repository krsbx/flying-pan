import type { GLFW } from '@/glfw';
import type { Pointer } from 'bun:ffi';
import { WindowEvent } from './constant';
import { Window, type WindowOptions } from './window';

export class WindowManager {
  public readonly gl: GLFW;
  public readonly windows: Map<string | Pointer, Window>;
  public readonly identifiers: Set<string>;
  public readonly addresses: Set<Pointer>;
  protected _active: Window | null;

  public constructor(gl: GLFW) {
    this.gl = gl;
    this.windows = new Map();
    this.identifiers = new Set();
    this.addresses = new Set();
    this._active = null;
  }

  public create(options: WindowOptions) {
    const window = new Window({ ...options, gl: this.gl });

    if (!window.$address) {
      throw new Error('Failed to create a new GLFW window!');
    }

    this.identifiers.add(options.identifier || options.title);
    this.windows.set(options.identifier || options.title, window);
    this.windows.set(window.$address, window);

    // Change the active window to the newly created one
    this.setActive(window);

    // Auto switch the active window on focus
    window.on(WindowEvent.Focus, (focus) => {
      if (!focus) return;

      this.setActive(window);
    });

    return window;
  }

  public destroy(window: Window): void;
  public destroy(pointer: Pointer): void;
  public destroy(identifier: string): void;
  public destroy(arg0: Window | Pointer | string) {
    let address: Pointer | null;
    let identifier: string | null;

    if (arg0 instanceof Window) {
      address = arg0.$address;
      identifier = arg0.identifier;
    } else {
      const window = this.windows.get(arg0);

      if (!window) {
        throw new Error('[WindowManager] Invalid window identifier/pointer!');
      }

      address = window.$address;
      identifier = window.identifier;
    }

    if (!address || !identifier) {
      throw new Error('[WindowManager] Invalid window identifier/pointer!');
    }

    this.gl.glfwDestroyWindow({ window: address });

    this.windows.delete(address);
    this.windows.delete(identifier);
  }

  public get active() {
    return this._active;
  }

  public get isEmpty() {
    return this.windows.size === 0;
  }

  public setActive(window: Window): void;
  public setActive(pointer: Pointer): void;
  public setActive(identifier: string): void;
  public setActive(arg0: Window | Pointer | string) {
    let window: Window | undefined;

    if (arg0 instanceof Window) {
      window = arg0;
    } else {
      window = this.windows.get(arg0);
    }

    if (!window) {
      throw new Error('Window not found!');
    }

    this._active = window;

    this.gl.glfwMakeContextCurrent({ window: window.$address });
  }

  public cleanUp(): void {
    this.windows.forEach((window) => {
      if (this.gl.glfwWindowShouldClose({ window: window.$address })) {
        this.destroy(window);
      }
    });
  }
}
