import { MiniAudio } from '@miniaudio';
import { MA_SUCCESS } from '@miniaudio/enums';
import { ma_engine } from '@miniaudio/structs';
import { Audio, type AudioOptions } from '../audio';

export interface AudioManagerOptions {
  miniaudioLibPath: string;
  volume?: number | null;
  /** Maximum number of audio instances to be played at the same time, @default `null` for no limit */
  maxInstances?: number | null;
}

export class AudioManager {
  public maxInstances: number | null;

  protected miniaudio: MiniAudio;
  protected engine: ma_engine;
  protected instances: Map<string, Audio>;
  protected _volume!: number;
  protected _destroyed: boolean;

  public constructor(options: AudioManagerOptions) {
    this.maxInstances = options.maxInstances || null;
    this.miniaudio = new MiniAudio(options.miniaudioLibPath);
    this.engine = ma_engine.create();

    const init = this.miniaudio.ma_engine_init({
      pEngine: this.engine.$address,
      pConfig: null,
    });

    if (init !== null && init !== MA_SUCCESS) {
      throw new Error('[AudioManager] MiniAudio failed to initialize!');
    }

    this.instances = new Map();
    this._destroyed = false;
    this.volume = options.volume ?? 1;
  }

  public create(options: Omit<AudioOptions, 'engine' | 'miniaudio'>): Audio {
    const existing = this.instances.get(options.path);

    if (existing) return existing;

    if (this.maxInstances && this.instances.size >= this.maxInstances) {
      throw new Error(
        '[AudioManager] Maximum number of audio instances reached!'
      );
    }

    const audio = new Audio({
      ...options,
      engine: this.engine,
      miniaudio: this.miniaudio,
    });

    this.instances.set(options.path, audio);

    return audio;
  }

  public play(path: string) {
    const audio = this.instances.get(path);

    if (!audio) throw new Error('[AudioManager] Audio not found!');

    audio.play();
  }

  public stop(path: string) {
    const audio = this.instances.get(path);

    if (!audio) throw new Error('[AudioManager] Audio not found!');

    audio.stop();
  }

  public close(path: string): void {
    const audio = this.instances.get(path);

    if (!audio) throw new Error('[AudioManager] Audio not found!');

    audio.destroy();

    this.instances.delete(path);
  }

  public get(path: string): Audio {
    const audio = this.instances.get(path);

    if (!audio) throw new Error('[AudioManager] Audio not found!');

    return audio;
  }

  public forEach(fn: (audio: Audio) => void): void {
    this.instances.forEach(fn);
  }

  public get count(): number {
    return this.instances.size;
  }

  public get volume(): number {
    return this._volume;
  }

  public set volume(value: number) {
    this.miniaudio.ma_engine_set_volume({
      pEngine: this.engine.$address,
      volume: value,
    });

    this._volume = value;
  }

  public get sampleRate(): number {
    return this.miniaudio.ma_engine_get_sample_rate({
      pEngine: this.engine.$address,
    }) as number;
  }

  public get destroyed(): boolean {
    return this._destroyed;
  }

  public destroy(): void {
    if (this._destroyed) return;

    this.instances.forEach((audio) => audio.destroy());

    this.miniaudio.ma_engine_uninit({ pEngine: this.engine.$address });

    this.miniaudio.close();

    this._destroyed = true;
  }
}
