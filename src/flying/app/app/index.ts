import { layoutFlex } from '@/flying/layout';
import { GLFW } from '@/glfw';
import { paint, Renderer } from '../../renderer';
import {
  Window,
  WindowEvent,
  WindowManager,
  WindowManagerEvent,
  type WindowOptions,
} from '../window';
import { AppManager } from './manager';
import type { AppConfig, OnRenderFrame } from './types';

export class App {
  public readonly gl: GLFW;
  public readonly manager: AppManager;
  public readonly renderer: Renderer;
  public destroyWindow: WindowManager['destroy'];
  public setActiveWindow: WindowManager['setActive'];

  protected _onRenderFrame: OnRenderFrame | null = null;
  protected _root: Window | null;
  protected _running: boolean;
  protected _vsync!: boolean;

  public constructor(options: AppConfig) {
    this.gl = new GLFW(options.libPath);

    if (!this.gl.glfwInit()) {
      throw new Error('Failed to initialize GLFW!');
    }

    this.manager = new AppManager({
      fonts: options.fonts || [],
      gl: this.gl,
    });
    this.renderer = new Renderer({
      gl: this.gl,
      windowManager: this.manager.window,
    });

    this.manager.window.on(WindowManagerEvent.Created, (window) => {
      this.manager.input.register(window);
      this.renderer.init(window);
    });

    this.destroyWindow = this.manager.window.destroy.bind(this.manager.window);
    this.setActiveWindow = this.manager.window.setActive.bind(
      this.manager.window
    );

    this._running = false;
    this.vsync = options.vsync ?? false;
    this._root = this.createWindow(options);

    this.manager.window.on(WindowManagerEvent.Destroyed, (window) => {
      if (window === this._root) {
        this._root = null;
        this._running = false;
      }
    });
  }

  public onFrame(fn: OnRenderFrame): void {
    this._onRenderFrame = fn;
  }

  public createWindow(options: Omit<WindowOptions, 'share'>): Window {
    // Share GL context with any alive window to keep textures/buffers available
    const existing = this.manager.window.all.values().next().value;
    const window = this.manager.window.create({
      ...options,
      share: existing ?? null,
    });

    window.on(WindowEvent.Resized, () => {
      this.renderer.init(window);
    });

    return window;
  }

  public get running(): boolean {
    return this._running;
  }

  public get vsync(): boolean {
    return this._vsync;
  }

  public set vsync(value: boolean) {
    this._vsync = value;
    this.gl.glfwSwapInterval({ interval: Number(value) });
  }

  public get root() {
    const root = this._root;

    if (!root) {
      throw new Error('Root window already destroyed!');
    }

    return root;
  }

  public get activeWindow(): Window | null {
    return this.manager.window.active;
  }

  public async run(): Promise<void> {
    if (!this.manager.font.isEmpty) {
      await this.manager.font.init();
    }

    this._running = true;

    while (this._running) {
      this.manager.input.update();

      if (this.activeWindow) {
        const window = this.activeWindow;

        this.renderer.clear(window, window.backgroundColor);

        if (window.widget) {
          const layout = layoutFlex({
            node: window.widget,
            x: 0,
            y: 0,
            availableWidth: window.size.width,
            availableHeight: window.size.height,
            fontManager: this.manager.font,
          });

          paint(window, {
            renderer: this.renderer,
            layout: layout,
            fontManager: this.manager.font,
          });
        }
      }

      this._onRenderFrame?.(this);

      if (this.activeWindow) {
        this.renderer.flush(this.activeWindow);
      }

      this.gl.glfwPollEvents();
      this.manager.window.cleanUp();

      if (this.manager.window.isEmpty) {
        break;
      }
    }

    this.close();
  }

  public close(): void {
    this._running = false;

    this.manager.window.destroyAll();
    this.manager.font.destroy();
    this.gl.glfwTerminate();
  }
}
