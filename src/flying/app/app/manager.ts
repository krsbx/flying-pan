import { InteractionManager } from '@flying/interactions';
import { Reconciler } from '@flying/reconcile';
import { TextureManager } from '@flying/renderer/texture/manager';
import { setCurrentStateStore, StateStore } from '@flying/state';
import type { GLFW } from '@glfw';
import { AudioManager, type AudioManagerOptions } from '../audio';
import { FontManager } from '../fonts/manager';
import { InputManager } from '../input';
import { MonitorManager } from '../monitor';
import { WindowManager } from '../window';
import type { FontConfig } from './types';

export interface AppManagerOptions {
  gl: GLFW;
  fonts: FontConfig[];
  audio: AudioManagerOptions | null;
  texture: string | null;
}

export class AppManager {
  public readonly window: WindowManager;
  public readonly monitor: MonitorManager;
  public readonly input: InputManager;
  public readonly font: FontManager;
  public readonly interaction: InteractionManager;
  public readonly audio: AudioManager | null;
  public readonly texture: TextureManager | null;
  public readonly reconciler: Reconciler;
  public readonly stateStore: StateStore;

  public constructor(options: AppManagerOptions) {
    this.window = new WindowManager(options.gl);
    this.monitor = new MonitorManager(options.gl);
    this.input = new InputManager();
    this.font = new FontManager({
      fonts: options.fonts,
      gl: options.gl,
    });
    this.interaction = new InteractionManager(this.input);
    this.audio = options.audio ? new AudioManager(options.audio) : null;
    this.texture = options.texture
      ? new TextureManager({
          gl: options.gl,
          imageLibPath: options.texture,
        })
      : null;
    this.stateStore = new StateStore();
    this.reconciler = new Reconciler(this.stateStore);

    setCurrentStateStore(this.stateStore);
  }
}
