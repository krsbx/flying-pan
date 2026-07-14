export interface GLLike {
  glBegin(options: { mode: number }): void;
  glEnd(): void;
  glVertex2f(options: { x: number; y: number }): void;
  glColor4f(options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }): void;
  glTexCoord2f(options: { s: number; t: number }): void;
  glEnable(options: { cap: number }): void;
  glDisable(options: { cap: number }): void;
  glBindTexture(options: { target: number; texture: number }): void;
}

export interface BatchData {
  positions: number[];
  colors: number[];
  texCoords: number[];
  vertexCount: number;
}
