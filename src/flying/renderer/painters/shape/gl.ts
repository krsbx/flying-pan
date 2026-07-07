import type { GLFW } from '@glfw';
import { GL_QUADS, GL_TRIANGLES } from '../../constant';
import type {
  DrawArcGLOptions,
  DrawRectGLOptions,
  DrawRoundedGLRectOptions,
} from '../../renderer/types';

export function drawRoundedRectGL(
  gl: GLFW,
  options: DrawRoundedGLRectOptions
): void {
  const { x, y, width, height, rgba, radius } = options;

  // Clamp radius
  const maxRadius = Math.min(width, height) / 2;
  const r = Math.min(radius, maxRadius);

  gl.glColor4f(rgba);
  gl.glBegin({ mode: GL_QUADS });

  // Center rectangle (full width, reduced height)
  gl.glVertex2f({ x, y: y + r });
  gl.glVertex2f({ x: x + width, y: y + r });
  gl.glVertex2f({ x: x + width, y: y + height - r });
  gl.glVertex2f({ x, y: y + height - r });

  // Top rectangle
  gl.glVertex2f({ x: x + r, y });
  gl.glVertex2f({ x: x + width - r, y });
  gl.glVertex2f({ x: x + width - r, y: y + r });
  gl.glVertex2f({ x: x + r, y: y + r });

  // Bottom rectangle
  gl.glVertex2f({ x: x + r, y: y + height - r });
  gl.glVertex2f({ x: x + width - r, y: y + height - r });
  gl.glVertex2f({ x: x + width - r, y: y + height });
  gl.glVertex2f({ x: x + r, y: y + height });

  gl.glEnd();

  const segments = Math.max(4, Math.ceil(r / 2));

  // Top-left
  drawArcGL(gl, {
    cx: x + r,
    cy: y + r,
    radius: r,
    startAngle: Math.PI,
    endAngle: Math.PI * 1.5,
    segments,
    rgba,
  });

  // Top-right
  drawArcGL(gl, {
    cx: x + width - r,
    cy: y + r,
    radius: r,
    startAngle: Math.PI * 1.5,
    endAngle: Math.PI * 2,
    segments,
    rgba,
  });

  // Bottom-right
  drawArcGL(gl, {
    cx: x + width - r,
    cy: y + height - r,
    radius: r,
    startAngle: 0,
    endAngle: Math.PI * 0.5,
    segments,
    rgba,
  });

  // Bottom-left
  drawArcGL(gl, {
    cx: x + r,
    cy: y + height - r,
    radius: r,
    startAngle: Math.PI * 0.5,
    endAngle: Math.PI,
    segments,
    rgba,
  });
}

export function drawArcGL(gl: GLFW, options: DrawArcGLOptions): void {
  const { cx, cy, radius, startAngle, endAngle, segments, rgba } = options;
  const step = (endAngle - startAngle) / segments;

  gl.glColor4f(rgba);
  gl.glBegin({ mode: GL_TRIANGLES });

  for (let i = 0; i < segments; i++) {
    const a1 = startAngle + step * i;
    const a2 = a1 + step;

    const x0 = cx + Math.cos(a1) * radius;
    const y0 = cy + Math.sin(a1) * radius;
    const x1 = cx + Math.cos(a2) * radius;
    const y1 = cy + Math.sin(a2) * radius;

    gl.glVertex2f({ x: cx, y: cy });
    gl.glVertex2f({ x: x0, y: y0 });
    gl.glVertex2f({ x: x1, y: y1 });
  }

  gl.glEnd();
}

export function drawRectGL(gl: GLFW, options: DrawRectGLOptions): void {
  const { x, y, width, height, rgba } = options;

  gl.glColor4f(rgba);
  gl.glBegin({ mode: GL_QUADS });

  // Render on top-left
  gl.glVertex2f({ x: x, y: y });
  // Render on top-right
  gl.glVertex2f({ x: x + width, y: y });
  // Render on bottom-right
  gl.glVertex2f({ x: x + width, y: y + height });
  // Render on bottom-left
  gl.glVertex2f({ x: x, y: y + height });

  gl.glEnd();
}
