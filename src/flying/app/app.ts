import { GLFW } from '@/glfw';
import { Window, type WindowOptions } from './window';

export interface FontConfig {
  libPath: string;
  fontSize: number;
  fontPath: string;
}

export interface AppConfig extends WindowConfig {
  libPath: string;
  backgroundColor?: string | null;
  font?: FontConfig | null;
  vsync?: boolean;
}

export interface WindowConfig {
  width: number;
  height: number;
  title: string;

  /** Active window identifier - Default use {title} */
  identifier?: string | null;
}

export class App {
  public readonly gl: GLFW;
  public readonly windows: Record<string, Window>;
  public activeWindow: Window | null;

  protected _vsync!: boolean;

  public constructor(options: AppConfig) {
    this.gl = new GLFW(options.libPath);

    if (!this.gl.glfwInit()) {
      throw new Error('Failed to initialize GLFW!');
    }

    this.activeWindow = new Window({
      ...options,
      gl: this.gl,
    });

    if (!this.activeWindow.$address) {
      this.gl.glfwTerminate();

      throw new Error('Failed to create GLFW window!');
    }

    this.windows = {
      [options.identifier || options.title]: this.activeWindow,
    };

    this.vsync = options.vsync ?? false;
    this.setActive(this.activeWindow);
  }

  public createWindow(options: WindowOptions): Window {
    const window = new Window({
      ...options,
      gl: this.gl,
    });

    if (!window.$address) {
      throw new Error('Failed to create a new GLFW window!');
    }

    this.windows[options.identifier || options.title] = window;

    this.setActive(window);

    return window;
  }

  public setActive(window: Window): void;
  public setActive(identifier: string): void;
  public setActive(arg0: string | Window) {
    let window: Window | undefined;

    if (arg0 instanceof Window) {
      window = arg0;
    } else {
      window = this.windows[arg0];
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
}
