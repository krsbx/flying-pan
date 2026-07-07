export interface TextQuad {
  // Screen coordinates
  x0: number;
  y0: number;
  x1: number;
  y1: number;

  // Texture coordinates
  s0: number;
  t0: number;
  s1: number;
  t1: number;
}

export interface MeasureTextOptions {
  text: string;
  fontSize?: number;
  letterSpacing?: number;
  lineHeight?: number;
}

export interface MeasureTextResult {
  width: number;
  height: number;
}

export interface CharIndexAtXOptions {
  text: string;
  /** X relative to the text's left edge (i.e. screen x minus contentX). */
  x: number;
  fontSize?: number;
  letterSpacing?: number;
}

export interface TextMeasurer {
  measureText(options: MeasureTextOptions): MeasureTextResult;
}

export interface CharIndexResolver {
  /**
   * Returns the char index whose left edge is nearest to `options.x`.
   * Used by TextInput click-to-caret. Returns 0 for empty text / x <= 0;
   * `text.length` for x past the end.
   */
  charIndexAtX(options: CharIndexAtXOptions): number;
}

export interface GetQuadsOptions {
  text: string;
  x: number;
  y: number;
  letterSpacing?: number;
  lineHeight?: number;
  fontSize?: number;
}

export interface GetQuads {
  getQuads(options: GetQuadsOptions): TextQuad[];
}

export type FontAtlasContract = TextMeasurer & GetQuads & CharIndexResolver;
