import { CStruct } from '@cstruct';
import type { GLFW } from '@glfw';
import { Image } from '@image';
import { Vector2 } from '@vectors';
import type { Pointer } from 'bun:ffi';
import {
  GL_LINEAR,
  GL_RGBA,
  GL_TEXTURE_2D,
  GL_TEXTURE_MAG_FILTER,
  GL_TEXTURE_MIN_FILTER,
  GL_UNSIGNED_BYTE,
} from '../../constant';
import { ImageInfo } from '../image';
import { Texture } from '../texture';

export interface TextureManagerOptions {
  gl: GLFW;
  imageLibPath: string;
}

export class TextureManager {
  protected glfw: GLFW;
  protected image: Image;
  protected textures: Map<string, Texture>;
  protected infos: Map<string, ImageInfo>;
  protected _destroyed: boolean;

  public constructor(options: TextureManagerOptions) {
    this.glfw = options.gl;
    this.image = new Image(options.imageLibPath);
    this.textures = new Map();
    this.infos = new Map();
    this._destroyed = false;
  }

  public info(path: string): ImageInfo | null {
    const existing = this.infos.get(path);

    if (existing) return existing;

    const sizeVec = new Vector2();
    const channelStruct = new CStruct(CStruct.BYTE_SIZE.i32);

    const result = this.image.stbi_info({
      filename: path,
      x: sizeVec.xRef,
      y: sizeVec.yRef,
      comp: channelStruct.$address,
    });

    if (!result) return null;

    const info = new ImageInfo({
      path,
      vector2: sizeVec,
      channel: channelStruct.getValue(0, 'i32'),
    });

    this.infos.set(path, info);

    return info;
  }

  protected loadFile(
    path: string
  ): { width: number; height: number; pixels: Pointer } | null {
    const info = this.info(path);

    if (!info) return null;

    const pixels = this.image.stbi_load({
      channels_in_file: info.channelRef,
      desired_channels: 4,
      filename: path,
      x: info.vector2.xRef,
      y: info.vector2.yRef,
    });

    if (!pixels) return null;

    return {
      width: info.width,
      height: info.height,
      pixels,
    };
  }

  public load(path: string): Texture | null {
    const existing = this.textures.get(path);

    if (existing) return existing;

    const data = this.loadFile(path);

    if (!data) return null;

    const textureStruct = new CStruct({ length: CStruct.BYTE_SIZE.i32 });

    this.glfw.glGenTextures({
      n: 1,
      textures: textureStruct.$address,
    });

    const textureId = textureStruct.getValue(0, 'i32');

    this.glfw.glBindTexture({
      target: GL_TEXTURE_2D,
      texture: textureId,
    });

    this.glfw.glTexImage2D({
      target: GL_TEXTURE_2D,
      level: 0,
      internalformat: GL_RGBA,
      width: data.width,
      height: data.height,
      border: 0,
      format: GL_RGBA,
      type: GL_UNSIGNED_BYTE,
      pixels: data.pixels,
    });

    this.glfw.glTexParameteri({
      target: GL_TEXTURE_2D,
      pname: GL_TEXTURE_MIN_FILTER,
      param: GL_LINEAR,
    });

    this.glfw.glTexParameteri({
      target: GL_TEXTURE_2D,
      pname: GL_TEXTURE_MAG_FILTER,
      param: GL_LINEAR,
    });

    // Unbind so this texture isn't left bound for unrelated GL calls
    this.glfw.glBindTexture({
      target: GL_TEXTURE_2D,
      texture: 0,
    });

    // GL has copied the pixel data — release the stb buffer
    this.image.stbi_image_free({ retval_from_stbi_load: data.pixels });

    const texture = new Texture({
      id: textureId,
      width: data.width,
      height: data.height,
      gl: this.glfw,
    });

    this.textures.set(path, texture);

    return texture;
  }

  public get(path: string): Texture | null {
    const existing = this.textures.get(path);

    if (existing) return existing;

    return this.load(path);
  }

  public dispose(): void;
  public dispose(path: string): void;
  public dispose(path: string | null = null): void {
    if (!path) {
      this.textures.forEach((texture) => texture.destroy());
      this.textures.clear();
      this.infos.clear();
      return;
    }

    const texture = this.textures.get(path);

    if (!texture) return;

    texture.destroy();
    this.infos.delete(path);
    this.textures.delete(path);
  }

  public get destroyed(): boolean {
    return this._destroyed;
  }

  public destroy(): void {
    if (this._destroyed) return;

    this.dispose();
    this.image.close();

    this._destroyed = true;
  }
}
