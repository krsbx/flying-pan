import { CStruct } from '@cstruct';
import {
  GL_LINEAR,
  GL_RGBA,
  GL_TEXTURE_2D,
  GL_TEXTURE_MAG_FILTER,
  GL_TEXTURE_MIN_FILTER,
  GL_UNSIGNED_BYTE,
} from '@flying/renderer/constant';
import type { GLFW } from '@glfw';
import { TrueType } from '@truetype';
import { BakedChar } from './baked-char';
import {
  ATLAS_HEIGHT,
  ATLAS_WIDTH,
  BAKED_CHAR_SIZE,
  FIRST_CHAR,
  NUM_CHARS,
} from './constant';
import type {
  CharIndexAtXOptions,
  FontAtlasContract,
  GetQuadsOptions,
  MeasureTextOptions,
  MeasureTextResult,
  TextQuad,
} from './types';

export interface FontAtlasOptions {
  fontPath: string;
  fontSize: number;
  truetypeLibPath: string;
  gl: GLFW;
}

export abstract class BaseFontAtlas implements FontAtlasContract {
  public readonly fontPath: string;
  public readonly fontSize: number;
  protected truetype: TrueType;
  protected bakedChars: CStruct;
  protected gl: GLFW;
  protected _textureId: number;
  protected ATLAS_SIZE: number;
  protected _destroyed: boolean;
  protected _initialized: boolean;
  protected _ascent: number;
  protected _descent: number;

  public constructor(options: FontAtlasOptions) {
    this.fontPath = options.fontPath;
    this.fontSize = options.fontSize;
    this.truetype = new TrueType(options.truetypeLibPath);
    this.bakedChars = new CStruct(NUM_CHARS * BAKED_CHAR_SIZE);
    this.gl = options.gl;
    this._textureId = 0;
    this.ATLAS_SIZE = ATLAS_WIDTH * ATLAS_HEIGHT;
    this._destroyed = false;
    this._initialized = false;
    this._ascent = 0;
    this._descent = 0;
  }

  public async init(): Promise<void> {
    if (this._initialized) {
      this.destroy();
    }

    const { rgba } = await this.bakeFontBitmap();

    this.computeVerticalMetrics();

    // Generate OpenGL Texture
    const textureStruct = new CStruct({ length: CStruct.BYTE_SIZE.i32 });

    this.gl.glGenTextures({
      n: 1,
      textures: textureStruct.$address,
    });

    this._textureId = textureStruct.getValue(0, 'i32');

    this.gl.glBindTexture({
      target: GL_TEXTURE_2D,
      texture: this._textureId,
    });

    this.gl.glTexImage2D({
      target: GL_TEXTURE_2D,
      level: 0,
      internalformat: GL_RGBA,
      width: ATLAS_WIDTH,
      height: ATLAS_HEIGHT,
      border: 0,
      format: GL_RGBA,
      type: GL_UNSIGNED_BYTE,
      pixels: rgba.$address,
    });

    this.gl.glTexParameteri({
      target: GL_TEXTURE_2D,
      pname: GL_TEXTURE_MIN_FILTER,
      param: GL_LINEAR,
    });

    this.gl.glTexParameteri({
      target: GL_TEXTURE_2D,
      pname: GL_TEXTURE_MAG_FILTER,
      param: GL_LINEAR,
    });

    // Unbind texture
    this.gl.glBindTexture({
      target: GL_TEXTURE_2D,
      texture: 0,
    });

    this._initialized = true;
  }

  protected async bakeFontBitmap() {
    // Load font file asynchronously
    const fontData = await Bun.file(this.fontPath).bytes();

    // Get font offset
    const offset = this.truetype.stbtt_GetFontOffsetForIndex({
      data: fontData,
      index: 0,
    });

    // Allocate pixel buffer for the atlas
    const pixels = new CStruct(this.ATLAS_SIZE);

    // Bake font bitmap
    const result = this.truetype.stbtt_BakeFontBitmap({
      data: fontData,
      offset,
      pixel_height: this.fontSize,
      pixels: pixels.$address,
      pw: ATLAS_WIDTH,
      ph: ATLAS_HEIGHT,
      first_char: FIRST_CHAR,
      num_chars: NUM_CHARS,
      chardata: this.bakedChars.$address,
    });

    if (result <= 0) {
      throw new Error('stbtt_BakeFontBitmap failed — atlas may be too small');
    }

    // Convert gray bitmap to RGBA
    const rgba = new CStruct(this.ATLAS_SIZE * 4);
    const src = pixels.$memory;
    const dst = rgba.$memory;

    dst.fill(255);

    for (let i = 0; i < this.ATLAS_SIZE; i++) {
      dst[i * 4 + 3] = src[i] ?? 0;
    }

    return {
      pixels,
      rgba,
    };
  }

  public abstract measureText(options: MeasureTextOptions): MeasureTextResult;

  public abstract getQuads(options: GetQuadsOptions): TextQuad[];

  public abstract charIndexAtX(options: CharIndexAtXOptions): number;

  protected computeVerticalMetrics(): void {
    const bakedChars = CStruct.readArrayLazy(
      BakedChar,
      this.bakedChars.$address,
      NUM_CHARS
    );

    let minTop = 0;
    let maxBottom = 0;

    for (const b of bakedChars) {
      const atlasHeight = b.y1 - b.y0;

      if (atlasHeight <= 0) continue; // no glyph (space, etc.)

      const top = b.yOff; // negative = above baseline
      const bottom = b.yOff + atlasHeight; // positive = below baseline

      if (top < minTop) minTop = top;
      if (bottom > maxBottom) maxBottom = bottom;
    }

    this._ascent = -minTop;
    this._descent = maxBottom;
  }

  public get textureId(): number {
    return this._textureId;
  }

  public get initialized(): boolean {
    return this._initialized;
  }

  public get destroyed(): boolean {
    return this._destroyed;
  }

  public get ascent(): number {
    return this._ascent;
  }

  public get descent(): number {
    return this._descent;
  }

  public destroy(): void {
    if (!this._initialized) return;
    if (this._destroyed) return;

    if (this.textureId) {
      this.gl.glDeleteTextures({
        n: 1,
        textures: new Int32Array([this.textureId]),
      });
      this._textureId = 0;
    }

    this.truetype.close();
    this._initialized = false;
    this._destroyed = true;
  }
}
