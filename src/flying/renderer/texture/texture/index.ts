import type { Resolution } from '@flying/types';
import type { GLFW } from '@glfw';

export interface TextureOptions extends Resolution {
  id: number;
  gl: GLFW;
}

export class Texture {
  public readonly id: number;
  public readonly width: number;
  public readonly height: number;
  public readonly gl: GLFW;

  protected _destroyed: boolean;

  public constructor(options: TextureOptions) {
    this.id = options.id;
    this.width = options.width;
    this.height = options.height;
    this.gl = options.gl;

    this._destroyed = false;
  }

  public get destroyed(): boolean {
    return this._destroyed;
  }

  public destroy(): void {
    if (this._destroyed) return;

    this.gl.glDeleteTextures({ n: 1, textures: new Int32Array([this.id]) });

    this._destroyed = true;
  }
}
