import type { GLFW } from '@glfw';
import { parseColor } from '../color';
import { GL_QUADS, GL_TEXTURE_2D } from '../constant';
import type { DrawTextOptions } from '../renderer/types';

export function drawText(gl: GLFW, options: DrawTextOptions): void {
  const rgba = { ...parseColor(options.color) };

  if (options.opacity !== undefined) {
    rgba.alpha *= options.opacity;
  }

  const quads = options.atlas.getQuads(options);

  // Enable texturing
  gl.glEnable({ cap: GL_TEXTURE_2D });
  gl.glBindTexture({
    target: GL_TEXTURE_2D,
    texture: options.atlas.textureId,
  });
  gl.glColor4f(rgba);

  gl.glBegin({ mode: GL_QUADS });

  for (const q of quads) {
    // Top-left
    gl.glTexCoord2f({ s: q.s0, t: q.t0 });
    gl.glVertex2f({ x: q.x0, y: q.y0 });
    // Bottom-left
    gl.glTexCoord2f({ s: q.s0, t: q.t1 });
    gl.glVertex2f({ x: q.x0, y: q.y1 });
    // Bottom-right
    gl.glTexCoord2f({ s: q.s1, t: q.t1 });
    gl.glVertex2f({ x: q.x1, y: q.y1 });
    // Top-right
    gl.glTexCoord2f({ s: q.s1, t: q.t0 });
    gl.glVertex2f({ x: q.x1, y: q.y0 });
  }

  gl.glEnd();

  // Disable texturing
  gl.glBindTexture({ target: GL_TEXTURE_2D, texture: 0 });
  gl.glDisable({ cap: GL_TEXTURE_2D });
}
