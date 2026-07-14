import type { GLFW } from '@glfw';
import {
  GL_COLOR_ARRAY,
  GL_FLOAT,
  GL_TEXTURE_2D,
  GL_TEXTURE_COORD_ARRAY,
  GL_TRIANGLES,
  GL_VERTEX_ARRAY,
} from '../constant';
import type { BatchData, BatchEntry, GLLike } from './types';

export class BatchManager implements GLLike {
  protected mode: number = -1;
  protected currentColor = { red: 1, green: 1, blue: 1, alpha: 1 };
  protected currentTexCoord = { s: 0, t: 0 };
  protected currentTexture = 0;
  protected textureEnabled = false;

  protected pendingPositions: number[] = [];
  protected pendingColors: number[] = [];
  protected pendingTexCoords: number[] = [];

  protected batches: BatchEntry[] = [];

  public glBegin(options: { mode: number }): void {
    this.mode = options.mode;
    this.pendingPositions = [];
    this.pendingColors = [];
    this.pendingTexCoords = [];
  }

  public glEnd(): void {
    const count = this.pendingPositions.length / 2;

    if (count === 0) {
      this.mode = -1;
      return;
    }

    if (this.mode === GL_TRIANGLES) {
      this.commitTriangles(count);
    } else {
      this.commitQuads(count);
    }

    this.mode = -1;
    this.pendingPositions = [];
    this.pendingColors = [];
    this.pendingTexCoords = [];
  }

  public glVertex2f(options: { x: number; y: number }): void {
    this.pendingPositions.push(options.x, options.y);

    this.pendingColors.push(
      this.currentColor.red,
      this.currentColor.green,
      this.currentColor.blue,
      this.currentColor.alpha
    );

    this.pendingTexCoords.push(this.currentTexCoord.s, this.currentTexCoord.t);
  }

  public glColor4f(options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }): void {
    this.currentColor = {
      red: options.red,
      green: options.green,
      blue: options.blue,
      alpha: options.alpha,
    };
  }

  public glTexCoord2f(options: { s: number; t: number }): void {
    this.currentTexCoord = { s: options.s, t: options.t };
  }

  public glEnable(options: { cap: number }): void {
    if (options.cap === GL_TEXTURE_2D) {
      this.textureEnabled = true;
    }
  }

  public glDisable(options: { cap: number }): void {
    if (options.cap === GL_TEXTURE_2D) {
      this.textureEnabled = false;
      this.currentTexture = 0;
    }
  }

  public glBindTexture(options: { target: number; texture: number }): void {
    if (options.target === GL_TEXTURE_2D) {
      this.currentTexture = options.texture;
    }
  }

  // -------------------------------------------------------------------------
  // Batch commit — convert pending vertices to triangles
  // -------------------------------------------------------------------------

  protected getActiveTexture(): number {
    return this.textureEnabled ? this.currentTexture : 0;
  }

  protected getOrCreateBatch(textureId: number): BatchData {
    const last = this.batches[this.batches.length - 1];

    // Only merge with the last entry if it shares the same texture.
    // This preserves paint-order z-ordering: a background painted after
    // text must not be regrouped ahead of that text at flush time.
    if (last && last.textureId === textureId) {
      return last.data;
    }

    const data: BatchData = {
      positions: [],
      colors: [],
      texCoords: [],
      vertexCount: 0,
    };

    this.batches.push({ textureId, data });

    return data;
  }

  protected commitTriangles(count: number): void {
    const textureId = this.getActiveTexture();
    const batch = this.getOrCreateBatch(textureId);

    for (let i = 0; i < count; i++) {
      batch.positions.push(
        this.pendingPositions[i * 2]!,
        this.pendingPositions[i * 2 + 1]!
      );

      batch.colors.push(
        this.pendingColors[i * 4]!,
        this.pendingColors[i * 4 + 1]!,
        this.pendingColors[i * 4 + 2]!,
        this.pendingColors[i * 4 + 3]!
      );

      batch.texCoords.push(
        this.pendingTexCoords[i * 2]!,
        this.pendingTexCoords[i * 2 + 1]!
      );
    }

    batch.vertexCount += count;
  }

  protected commitQuads(count: number): void {
    const textureId = this.getActiveTexture();
    const batch = this.getOrCreateBatch(textureId);
    const quadCount = Math.floor(count / 4);

    for (let q = 0; q < quadCount; q++) {
      const i = q * 4;

      // Quad vertices: v0=top-left, v1=top-right, v2=bottom-right, v3=bottom-left
      // Two triangles: (v0,v1,v2) and (v0,v2,v3)
      const indices = [i, i + 1, i + 2, i, i + 2, i + 3];

      for (const vi of indices) {
        batch.positions.push(
          this.pendingPositions[vi * 2]!,
          this.pendingPositions[vi * 2 + 1]!
        );

        batch.colors.push(
          this.pendingColors[vi * 4]!,
          this.pendingColors[vi * 4 + 1]!,
          this.pendingColors[vi * 4 + 2]!,
          this.pendingColors[vi * 4 + 3]!
        );

        batch.texCoords.push(
          this.pendingTexCoords[vi * 2]!,
          this.pendingTexCoords[vi * 2 + 1]!
        );
      }
    }

    batch.vertexCount += quadCount * 6;
  }

  // -------------------------------------------------------------------------
  // Flush — issue glDrawArrays for each batch
  // -------------------------------------------------------------------------

  public flush(gl: GLFW): void {
    if (this.batches.length === 0) return;

    gl.glEnableClientState({ array: GL_VERTEX_ARRAY });
    gl.glEnableClientState({ array: GL_COLOR_ARRAY });
    gl.glEnableClientState({ array: GL_TEXTURE_COORD_ARRAY });

    for (const { textureId, data: batch } of this.batches) {
      if (batch.vertexCount === 0) continue;

      const positions = new Float32Array(batch.positions);
      const colors = new Float32Array(batch.colors);
      const texCoords = new Float32Array(batch.texCoords);

      gl.glVertexPointer({
        size: 2,
        type: GL_FLOAT,
        stride: 0,
        pointer: positions,
      });

      gl.glColorPointer({
        size: 4,
        type: GL_FLOAT,
        stride: 0,
        pointer: colors,
      });

      gl.glTexCoordPointer({
        size: 2,
        type: GL_FLOAT,
        stride: 0,
        pointer: texCoords,
      });

      if (textureId !== 0) {
        gl.glEnable({ cap: GL_TEXTURE_2D });
        gl.glBindTexture({ target: GL_TEXTURE_2D, texture: textureId });
      }

      gl.glDrawArrays({
        mode: GL_TRIANGLES,
        first: 0,
        count: batch.vertexCount,
      });

      if (textureId !== 0) {
        gl.glBindTexture({ target: GL_TEXTURE_2D, texture: 0 });
        gl.glDisable({ cap: GL_TEXTURE_2D });
      }
    }

    gl.glDisableClientState({ array: GL_TEXTURE_COORD_ARRAY });
    gl.glDisableClientState({ array: GL_COLOR_ARRAY });
    gl.glDisableClientState({ array: GL_VERTEX_ARRAY });

    this.batches = [];
  }
}
