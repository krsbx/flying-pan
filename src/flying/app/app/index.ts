import { parseColor } from '@/flying/renderer/color';
import { GL_COLOR_BUFFER_BIT } from '@/flying/rendererx';
import { GLFW } from '@/glfw';
import { FontAtlas } from '../../fonts/font-atlas';
import { InputManager } from '../input';
import { MonitorManager } from '../monitor';
import { Window, WindowManager, type WindowOptions } from '../window';
import { WindowManagerEvent } from '../window/manager/constant';
import type { AppConfig, AppFonts, FontConfig, OnRenderFrame } from './types';

export class App<Fonts extends readonly FontConfig[]> {
  public readonly gl: GLFW;
  public readonly windowManager: WindowManager;
  public readonly monitorManager: MonitorManager;
  public readonly inputManager: InputManager;
  public readonly fontAtlas: AppFonts<Fonts>;
  public readonly root: Window;
  public destroyWindow: WindowManager['destroy'];
  public setActiveWindow: WindowManager['setActive'];

  protected _onRenderFrame: OnRenderFrame<Fonts> | null = null;
  protected _running: boolean;
  protected _vsync!: boolean;

  public constructor(options: AppConfig<Fonts>) {
    this.gl = new GLFW(options.libPath);

    if (!this.gl.glfwInit()) {
      throw new Error('Failed to initialize GLFW!');
    }

    const windowManager = new WindowManager(this.gl);
    const monitorManager = new MonitorManager(this.gl);
    const inputManager = new InputManager(this.gl);

    this.windowManager = windowManager;
    this.monitorManager = monitorManager;
    this.inputManager = inputManager;

    windowManager.on(WindowManagerEvent.Created, (window) => {
      inputManager.register(window);
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
            [] as [keyof AppFonts<Fonts>, FontAtlas][]
          )
        : []
    ) as AppFonts<Fonts>;
  }

  public onFrame(fn: OnRenderFrame<Fonts>): void {
    this._onRenderFrame = fn;
  }

  public createWindow(options: WindowOptions) {
    const window = this.windowManager.create(options);

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
        this.gl.glClearColor(parseColor(this.activeWindow.backgroundColor));
        this.gl.glClear({ mask: GL_COLOR_BUFFER_BIT });
        this.gl.glFlush();
        this.gl.glfwSwapBuffers({ window: this.activeWindow.$address });
      }

      this._onRenderFrame?.(this);

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
