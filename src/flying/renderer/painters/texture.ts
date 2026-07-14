import type { GLLike } from '../batch';
import { GL_QUADS, GL_TEXTURE_2D } from '../constant';
import type { DrawTextureOptions } from '../renderer/types';

export function drawTexture(gl: GLLike, options: DrawTextureOptions): void {
  const { texture, x, y, width, height, opacity } = options;

  // Enable texturing
  gl.glEnable({ cap: GL_TEXTURE_2D });
  gl.glBindTexture({ target: GL_TEXTURE_2D, texture: texture.id });
  gl.glColor4f({ red: 1, green: 1, blue: 1, alpha: opacity ?? 1 });

  gl.glBegin({ mode: GL_QUADS });

  // Top-left
  gl.glTexCoord2f({ s: 0, t: 0 });
  gl.glVertex2f({ x, y });
  // Bottom-left
  gl.glTexCoord2f({ s: 0, t: 1 });
  gl.glVertex2f({ x, y: y + height });
  // Bottom-right
  gl.glTexCoord2f({ s: 1, t: 1 });
  gl.glVertex2f({ x: x + width, y: y + height });
  // Top-right
  gl.glTexCoord2f({ s: 1, t: 0 });
  gl.glVertex2f({ x: x + width, y });

  gl.glEnd();

  // Disable texturing
  gl.glBindTexture({ target: GL_TEXTURE_2D, texture: 0 });
  gl.glDisable({ cap: GL_TEXTURE_2D });
}
