import { GLFW } from '@/glfw';
import { parseColor } from '../renderer/color';
import { GL_COLOR_BUFFER_BIT } from '../renderer/constant';
import { Window, WindowManager, type WindowOptions } from './window';

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
  public readonly windowManager: WindowManager;
  public readonly root: Window;
  public createWindow: WindowManager['create'];
  public destroyWindow: WindowManager['destroy'];
  public setActiveWindow: WindowManager['setActive'];
  protected _vsync!: boolean;

  public constructor(options: AppConfig) {
    this.gl = new GLFW(options.libPath);
    this.windowManager = new WindowManager(this.gl);

    if (!this.gl.glfwInit()) {
      throw new Error('Failed to initialize GLFW!');
    }

    const windowManager = this.windowManager;

    this.createWindow = windowManager.create.bind(windowManager);
    this.destroyWindow = windowManager.destroy.bind(windowManager);
    this.setActiveWindow = windowManager.setActive.bind(windowManager);

    this.root = this.createWindow(options);
    this.vsync = options.vsync ?? false;
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

  public async run(fn: () => void) {
    while (true) {
      fn();

      if (this.activeWindow) {
        this.gl.glClearColor(parseColor(this.activeWindow.backgroundColor));
        this.gl.glClear({ mask: GL_COLOR_BUFFER_BIT });
        this.gl.glfwSwapBuffers({ window: this.activeWindow.$address });
      }

      this.gl.glfwPollEvents();
      this.windowManager.cleanUp();

      if (this.windowManager.isEmpty) {
        break;
      }
    }

    this.gl.glfwTerminate();
    this.gl.close();
  }
}
