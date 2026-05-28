import type { GLFW } from '@/glfw';
import { TrueType } from '@/truetype';
import { CStruct } from '@/utility/cstruct';
import {
  GL_LINEAR,
  GL_RGBA,
  GL_TEXTURE_2D,
  GL_TEXTURE_MAG_FILTER,
  GL_TEXTURE_MIN_FILTER,
  GL_UNSIGNED_BYTE,
} from '../renderer/constant';
import {
  ATLAS_HEIGHT,
  ATLAS_WIDTH,
  BAKED_CHAR_SIZE,
  FIRST_CHAR,
  NUM_CHARS,
} from './constant';
import type {
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
}

export abstract class BaseFontAtlas implements FontAtlasContract {
  private truetype: TrueType;
  private fontPath: string;
  private fontSize: number;
  private bakedChars: CStruct;
  private glfw: GLFW | null;
  private _textureId: number;
  private ATLAS_SIZE: number;

  public constructor(options: FontAtlasOptions) {
    this.fontPath = options.fontPath;
    this.fontSize = options.fontSize;
    this.truetype = new TrueType(options.truetypeLibPath);
    this.bakedChars = new CStruct(NUM_CHARS * BAKED_CHAR_SIZE);
    this.glfw = null;
    this._textureId = 0;
    this.ATLAS_SIZE = ATLAS_WIDTH * ATLAS_HEIGHT;
  }

  public async init(gl: GLFW): Promise<void> {
    if (this.glfw) {
      this.destroy(gl);
    }

    this.glfw = gl;

    const { rgba } = await this.bakeFontBitmap();

    this.generateOpenGLTexture({
      gl,
      rgba,
    });
  }

  private async bakeFontBitmap() {
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

    for (let i = 0; i < this.ATLAS_SIZE; i++) {
      rgba.setValue(i * 4 + 0, 255, 'i8'); // R
      rgba.setValue(i * 4 + 1, 255, 'i8'); // G
      rgba.setValue(i * 4 + 2, 255, 'i8'); // B
      rgba.setValue(i * 4 + 3, pixels.getValue(i, 'i8'), 'i8'); // A
    }

    return {
      pixels,
      rgba,
    };
  }

  private generateOpenGLTexture(options: { gl: GLFW; rgba: CStruct }): void {
    // Generate OpenGL Texture
    const textureStruct = new CStruct({ length: CStruct.BYTE_SIZE.i32 });

    options.gl.glGenTextures({
      n: 1,
      textures: textureStruct.$address,
    });

    this._textureId = textureStruct.getValue(0, 'i32');

    options.gl.glBindTexture({
      target: GL_TEXTURE_2D,
      texture: this._textureId,
    });

    options.gl.glTexImage2D({
      target: GL_TEXTURE_2D,
      level: 0,
      internalformat: GL_RGBA,
      width: ATLAS_WIDTH,
      height: ATLAS_HEIGHT,
      border: 0,
      format: GL_RGBA,
      type: GL_UNSIGNED_BYTE,
      pixels: options.rgba.$address,
    });

    options.gl.glTexParameteri({
      target: GL_TEXTURE_2D,
      pname: GL_TEXTURE_MIN_FILTER,
      param: GL_LINEAR,
    });

    options.gl.glTexParameteri({
      target: GL_TEXTURE_2D,
      pname: GL_TEXTURE_MAG_FILTER,
      param: GL_LINEAR,
    });

    // Unbind texture
    options.gl.glBindTexture({
      target: GL_TEXTURE_2D,
      texture: 0,
    });
  }

  public abstract measureText(options: MeasureTextOptions): MeasureTextResult;

  public abstract getQuads(options: GetQuadsOptions): TextQuad[];

  public get textureId(): number {
    return this._textureId;
  }

  public destroy(gl: GLFW | null = this.glfw): void {
    if (!gl) {
      throw new Error('GLFW is not initialized');
    }

    if (this.textureId) {
      gl.glDeleteTextures({ n: 1, textures: new Int32Array([this.textureId]) });
      this._textureId = 0;
    }

    this.truetype.close();
  }
}
