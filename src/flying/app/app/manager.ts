import { FontAtlas } from '@/flying/fonts';
import type { GLFW } from '@/glfw';
import { FontManager } from '../fonts/manager';
import { InputManager } from '../input';
import { MonitorManager } from '../monitor';
import { WindowManager } from '../window';
import type { FontConfig } from './types';

export interface AppManagerOptions {
  gl: GLFW;
  fonts: FontConfig[];
}

export class AppManager {
  public readonly window: WindowManager;
  public readonly monitor: MonitorManager;
  public readonly input: InputManager;
  public readonly font: FontManager;

  public constructor(options: AppManagerOptions) {
    this.window = new WindowManager(options.gl);
    this.monitor = new MonitorManager(options.gl);
    this.input = new InputManager();
    this.font = new FontManager({
      fontAtlas: FontAtlas,
      fonts: options.fonts,
      gl: options.gl,
    });
  }
}
