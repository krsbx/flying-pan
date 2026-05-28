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
  fontSize: number;
}

export interface MeasureTextResult {
  width: number;
  height: number;
}

export interface TextMeasurer {
  measureText(options: MeasureTextOptions): MeasureTextResult;
}

export interface GetQuadsOptions {
  text: string;
  x: number;
  y: number;
}

export interface GetQuads {
  getQuads(options: GetQuadsOptions): TextQuad[];
}

export type FontAtlasContract = TextMeasurer & GetQuads;
