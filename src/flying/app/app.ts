import { GLFW } from '@/glfw';
import type { Pointer } from 'bun:ffi';
import { parseColor } from '../renderer/color';
import { GL_COLOR_BUFFER_BIT } from '../renderer/constant';
import { Window, type WindowOptions } from './window';

export interface FontConfig {
  libPath: string;
  fontSize: number;
  fontPath: string;
}

export interface AppConfig extends WindowOptions {
  libPath: string;
  backgroundColor?: string | null;
  font?: FontConfig | null;
  vsync?: boolean;
}

export class App {
  public readonly gl: GLFW;
  public readonly windows: Map<string | Pointer, Window>;
  public readonly root: Window;
  public activeWindow!: Window | null;

  protected _vsync!: boolean;

  public constructor(options: AppConfig) {
    this.gl = new GLFW(options.libPath);
    this.windows = new Map();

    if (!this.gl.glfwInit()) {
      throw new Error('Failed to initialize GLFW!');
    }

    this.root = this.createWindow(options);
    this.vsync = options.vsync ?? false;
    this.setActive(this.root);
  }

  public createWindow(options: WindowOptions): Window {
    const window = new Window({
      ...options,
      gl: this.gl,
    });

    if (!window.$address) {
      this.gl.glfwTerminate();

      throw new Error('Failed to create a new GLFW window!');
    }

    this.windows.set(options.identifier || options.title, window);
    this.windows.set(window.$address, window);

    // Auto switch the active window on focus
    this.setActive(window);
    window.on('focus', (focus) => {
      if (!focus) return;

      this.setActive(window);
    });

    return window;
  }

  public setActive(window: Window): void;
  public setActive(pointer: Pointer): void;
  public setActive(identifier: string): void;
  public setActive(arg0: string | Window | Pointer) {
    let window: Window | undefined;

    if (arg0 instanceof Window) {
      window = arg0;
    } else {
      window = this.windows.get(arg0);
    }

    if (!window) {
      throw new Error('Window not found!');
    }

    this.activeWindow = window;

    this.gl.glfwMakeContextCurrent({ window: window.$address });
  }

  public get vsync() {
    return this._vsync;
  }

  public set vsync(value: boolean) {
    this._vsync = value;
    this.gl.glfwSwapInterval({ interval: Number(value) });
  }

  public async run(fn: () => void) {
    while (true) {
      fn();

      if (this.activeWindow) {
        this.gl.glClearColor(parseColor(this.activeWindow.backgroundColor));
        this.gl.glClear({ mask: GL_COLOR_BUFFER_BIT });
        this.gl.glfwSwapBuffers({ window: this.activeWindow.$address });
      }

      this.gl.glfwPollEvents();

      this.windows.forEach((window, key) => {
        if (this.gl.glfwWindowShouldClose({ window: window.$address })) {
          this.gl.glfwDestroyWindow({ window: window.$address });

          this.windows.delete(window.$address || key);
          this.windows.delete(key);
        }
      });

      if (this.windows.size === 0) {
        break;
      }
    }

    this.gl.glfwTerminate();
    this.gl.close();
  }
}
