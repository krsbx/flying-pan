import type { FontAtlas } from '@/flying/fonts/font-atlas';
import type { App } from '.';
import type { WindowOptions } from '../window';

export interface FontConfig {
  libPath: string;
  fontSize: number;
  fontPath: string;
  identifier: string;
}

export interface AppConfig<
  Fonts extends readonly FontConfig[],
> extends WindowOptions {
  libPath: string;
  backgroundColor?: string | null;
  fonts?: Fonts | null;
  vsync?: boolean;
}

export type AppFonts<Fonts extends readonly FontConfig[]> = Omit<
  Map<Fonts[number]['identifier'], FontAtlas>,
  'get'
> & {
  get(key: Fonts[number]['identifier']): FontAtlas;
};

export interface OnRenderFrame<Fonts extends readonly FontConfig[]> {
  (app: App<Fonts>): void;
}
