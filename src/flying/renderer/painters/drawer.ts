import type { GLLike } from '../batch';
import { GL_QUADS, GL_TRIANGLES } from '../constant';

export function drawQuads<T, U extends () => T>(gl: GLLike, fn: U): void {
  gl.glBegin({ mode: GL_QUADS });

  fn();

  gl.glEnd();
}

export function drawTriangles<T, U extends () => T>(gl: GLLike, fn: U): void {
  gl.glBegin({ mode: GL_TRIANGLES });

  fn();

  gl.glEnd();
}
