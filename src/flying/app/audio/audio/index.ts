import type { MiniAudio } from '@miniaudio';
import { MA_SUCCESS } from '@miniaudio/enums';
import { ma_engine, ma_sound } from '@miniaudio/structs';
import path from 'node:path';

export interface AudioOptions {
  engine: ma_engine;
  miniaudio: MiniAudio;
  path: string;
  volume?: number | null;
  isLooping?: boolean | null;
}

export class Audio {
  protected miniaudio: MiniAudio;
  protected engine: ma_engine;
  protected _destroyed: boolean;
  protected _volume!: number;
  protected _isLooping!: boolean;
  protected path: string;
  protected sound: ma_sound;

  public constructor(options: AudioOptions) {
    this._destroyed = false;
    this.engine = options.engine;
    this.miniaudio = options.miniaudio;
    this.path = options.path;
    this.sound = ma_sound.create();

    const init = this.miniaudio.ma_sound_init_from_file({
      pEngine: this.engine.$address,
      pFilePath: path.resolve(this.path),
      flags: 0,
      pGroup: null,
      pDoneFence: null,
      pSound: this.sound.$address,
    });

    if (init !== null && init !== MA_SUCCESS) {
      throw new Error('[Audio] MiniAudio failed to initialize sound!');
    }

    this.volume = options.volume ?? 1;
    this.isLooping = options.isLooping ?? false;
  }

  public play(): void {
    if (this.isPlaying) {
      this.stop();
    }

    this.miniaudio.ma_sound_start({
      pSound: this.sound.$address,
    });
  }

  public stop(): void {
    if (!this.isPlaying) return;

    this.miniaudio.ma_sound_stop({
      pSound: this.sound.$address,
    });
  }

  public get volume(): number {
    return this._volume;
  }

  public set volume(value: number) {
    this.miniaudio.ma_sound_set_volume({
      pSound: this.sound.$address,
      volume: value,
    });

    this._volume = value;
  }

  public get isLooping(): boolean {
    return this._isLooping;
  }

  public set isLooping(value: boolean) {
    this.miniaudio.ma_sound_set_looping({
      pSound: this.sound.$address,
      isLooping: +value,
    });

    this._isLooping = value;
  }

  public get isPlaying(): boolean {
    return Boolean(
      this.miniaudio.ma_sound_is_playing({
        pSound: this.sound.$address,
      })
    );
  }

  public destroy(): void {
    if (this._destroyed) return;

    this.miniaudio.ma_sound_uninit({
      pSound: this.sound.$address,
    });

    this._destroyed = true;
  }

  public get destroyed(): boolean {
    return this._destroyed;
  }
}
