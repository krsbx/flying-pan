import { GLFW } from '@/glfw';
import { FontAtlas } from '../../fonts';
import { Renderer } from '../../renderer';
import { InputManager } from '../input';
import { MonitorManager } from '../monitor';
import {
  Window,
  WindowEvent,
  WindowManager,
  WindowManagerEvent,
  type WindowOptions,
} from '../window';
import type { AppConfig, OnRenderFrame } from './types';

export class App {
  public readonly gl: GLFW;
  public readonly windowManager: WindowManager;
  public readonly monitorManager: MonitorManager;
  public readonly inputManager: InputManager;
  public readonly fontAtlas: Map<string, FontAtlas>;
  public readonly root: Window;
  public readonly renderer: Renderer;
  public destroyWindow: WindowManager['destroy'];
  public setActiveWindow: WindowManager['setActive'];

  protected _onRenderFrame: OnRenderFrame | null = null;
  protected _running: boolean;
  protected _vsync!: boolean;

  public constructor(options: AppConfig) {
    this.gl = new GLFW(options.libPath);

    if (!this.gl.glfwInit()) {
      throw new Error('Failed to initialize GLFW!');
    }

    const windowManager = new WindowManager(this.gl);
    const monitorManager = new MonitorManager(this.gl);
    const inputManager = new InputManager(this.gl);

    this.renderer = new Renderer({
      gl: this.gl,
      windowManager,
    });
    this.windowManager = windowManager;
    this.monitorManager = monitorManager;
    this.inputManager = inputManager;

    windowManager.on(WindowManagerEvent.Created, (window) => {
      inputManager.register(window);
      this.renderer.init(window);
    });

    this.destroyWindow = windowManager.destroy.bind(windowManager);
    this.setActiveWindow = windowManager.setActive.bind(windowManager);

    this._running = false;
    this.root = this.createWindow(options);
    this.vsync = options.vsync ?? false;

    this.fontAtlas = new Map(
      options.fonts
        ? options.fonts.reduce(
            (acc, curr) => {
              acc.push([
                curr.identifier as never,
                new FontAtlas({
                  fontPath: curr.fontPath,
                  fontSize: curr.fontSize,
                  truetypeLibPath: curr.libPath,
                }),
              ]);

              return acc;
            },
            [] as [string, FontAtlas][]
          )
        : []
    );
  }

  public onFrame(fn: OnRenderFrame): void {
    this._onRenderFrame = fn;
  }

  public createWindow(options: Omit<WindowOptions, 'share'>) {
    const window = this.windowManager.create({
      ...options,
      share: this.root,
    });

    window.on(WindowEvent.Resized, () => {
      this.renderer.init(window);
    });

    return window;
  }

  public get running() {
    return this._running;
  }

  public get vsync() {
    return this._vsync;
  }

  public set vsync(value: boolean) {
    this._vsync = value;
    this.gl.glfwSwapInterval({ interval: Number(value) });
  }

  public get activeWindow() {
    return this.windowManager.active;
  }

  public async run() {
    if (this.fontAtlas.size > 0) {
      await Promise.all(
        this.fontAtlas.values().map((font) => font.init(this.gl))
      );
    }

    this._running = true;

    while (this._running) {
      this.inputManager.update();

      if (this.activeWindow) {
        this.renderer.clear(
          this.activeWindow,
          this.activeWindow.backgroundColor
        );
      }

      this._onRenderFrame?.(this);

      if (this.activeWindow) {
        this.renderer.flush(this.activeWindow);
      }

      this.gl.glfwPollEvents();
      this.windowManager.cleanUp();

      if (this.windowManager.isEmpty) {
        break;
      }
    }

    this.close();
  }

  public close(): void {
    this._running = false;

    if (this.fontAtlas.size > 0) {
      this.fontAtlas.forEach((font) => font.destroy(this.gl));
      this.fontAtlas.clear();
    }

    this.windowManager.all.forEach((window) => this.destroyWindow(window));
    this.gl.glfwTerminate();
  }
}
