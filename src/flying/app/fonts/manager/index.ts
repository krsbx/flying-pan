import { BaseFontAtlas, FontAtlas } from '@flying/fonts';
import type { GLFW } from '@glfw';
import type { FontConfig } from '../../app/types';

export interface FontManagerOptions {
  fonts: FontConfig[];
  gl: GLFW;
}

export class FontManager {
  public readonly gl: GLFW;
  protected _fonts: Map<string, BaseFontAtlas>;

  public constructor(options: FontManagerOptions) {
    this.gl = options.gl;
    this._fonts = new Map(
      options.fonts.map(
        ({
          fontPath,
          fontSize,
          identifier,
          libPath,
          fontAtlas = FontAtlas,
        }) => [
          identifier,
          new fontAtlas({
            fontPath,
            fontSize,
            truetypeLibPath: libPath,
            gl: options.gl,
          }),
        ]
      )
    );
  }

  public async init(): Promise<void> {
    await Promise.all(this._fonts.values().map((font) => font.init()));
  }

  public async load(config: FontConfig): Promise<void> {
    const {
      fontPath,
      fontSize,
      identifier,
      libPath,
      fontAtlas = FontAtlas,
    } = config;

    const existing = this._fonts.get(identifier);

    if (existing) {
      // Same font already loaded, skip
      if (existing instanceof fontAtlas) {
        if (existing.fontPath === fontPath && existing.fontSize === fontSize) {
          return;
        }
      }

      existing.destroy();
    }

    const font = new fontAtlas({
      fontPath,
      fontSize,
      truetypeLibPath: libPath,
      gl: this.gl,
    });

    await font.init();

    this._fonts.set(identifier, font);
  }

  public destroy(): void {
    this._fonts.forEach((font) => font.destroy());
    this._fonts.clear();
  }

  public get(identifier: string): BaseFontAtlas {
    const font = this._fonts.get(identifier);

    if (!font) throw new Error('[FontManager] Font not found!');

    return font;
  }

  public get count(): number {
    return this._fonts.size;
  }

  public get isEmpty(): boolean {
    return this.count === 0;
  }
}
