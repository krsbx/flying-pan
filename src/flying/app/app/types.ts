import type { BaseFontAtlas, FontAtlasOptions } from '@flying/fonts';
import type { App } from '.';
import type { AudioManagerOptions } from '../audio';
import type { WindowOptions } from '../window';

export interface FontConfig {
  libPath: string;
  fontSize: number;
  fontPath: string;
  identifier: string;
  fontAtlas?: new (font: FontAtlasOptions) => BaseFontAtlas;
}

export interface AppConfig extends WindowOptions {
  libPath: string;
  backgroundColor?: string | null;
  fonts?: FontConfig[] | null;
  audio?: AudioManagerOptions | null;
  texture?: string | null;
  vsync?: boolean;
}

export type AppFonts<Fonts extends readonly FontConfig[]> = Omit<
  Map<Fonts[number]['identifier'], BaseFontAtlas>,
  'get'
> & {
  get(key: Fonts[number]['identifier']): BaseFontAtlas;
};

export interface OnRenderFrame {
  (app: App): void;
}
