import type { GLFW } from '@glfw';
import { GL_QUADS, GL_TRIANGLES } from '../../constant';
import { getGradientColor } from '../gradient';
import type {
  DrawArcGLOptions,
  DrawRectGLOptions,
  DrawRoundedGLRectOptions,
  DrawRoundedRectGLCornerOptions,
} from '../types';

export function drawRoundedRectGL(
  gl: GLFW,
  options: DrawRoundedGLRectOptions
): void {
  const {
    x,
    y,
    width,
    height,
    rgba,
    radius,
    gradientCtx,
    opacity = 1,
  } = options;

  // Clamp radius
  const maxRadius = Math.min(width, height) / 2;
  const r = Math.min(radius, maxRadius);

  gl.glBegin({ mode: GL_QUADS });

  // Center rectangle (full width, reduced height)
  drawRectGL(gl, {
    x,
    y: y + r,
    width,
    height: height - 2 * r,
    rgba,
    gradientCtx,
    opacity,
    skipRendering: true,
  });

  // Top rectangle
  drawRectGL(gl, {
    x: x + r,
    y,
    width: width - 2 * r,
    height: r,
    rgba,
    gradientCtx,
    opacity,
    skipRendering: true,
  });

  // Bottom rectangle
  drawRectGL(gl, {
    x: x + r,
    y: y + height - r,
    width: width - 2 * r,
    height: r,
    rgba,
    gradientCtx,
    opacity,
    skipRendering: true,
  });

  gl.glEnd();

  drawRoundedRectGLCorner(gl, { ...options, radius: r });
}

function drawRoundedRectGLCorner(
  gl: GLFW,
  options: DrawRoundedRectGLCornerOptions
): void {
  const {
    x,
    y,
    width,
    height,
    rgba,
    radius: r,
    gradientCtx,
    opacity = 1,
  } = options;

  gl.glBegin({ mode: GL_TRIANGLES });

  const segments = Math.max(4, Math.ceil(r / 2));

  // Corner arcs — pass through the gradientCtx/opacity so corners blend.
  // rgba is ignored by drawArcGL when gradientCtx is set.
  // Top-left
  drawArcGL(gl, {
    cx: x + r,
    cy: y + r,
    radius: r,
    startAngle: Math.PI,
    endAngle: Math.PI * 1.5,
    segments,
    rgba,
    gradientCtx,
    opacity,
    skipRendering: true,
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
    gradientCtx,
    opacity,
    skipRendering: true,
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
    gradientCtx,
    opacity,
    skipRendering: true,
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
    gradientCtx,
    opacity,
    skipRendering: true,
  });

  gl.glEnd();
}

export function drawArcGL(gl: GLFW, options: DrawArcGLOptions): void {
  const {
    cx,
    cy,
    radius,
    startAngle,
    endAngle,
    segments,
    rgba,
    gradientCtx,
    opacity = 1,
  } = options;
  const step = (endAngle - startAngle) / segments;

  const emitColor = (x: number, y: number) => {
    if (!gradientCtx) return;

    const c = getGradientColor({ ctx: gradientCtx, x, y, opacity });
    gl.glColor4f(c);
  };

  if (!gradientCtx && rgba) {
    gl.glColor4f({
      red: rgba.red,
      green: rgba.green,
      blue: rgba.blue,
      alpha: rgba.alpha * opacity,
    });
  }

  if (!options.skipRendering) {
    gl.glBegin({ mode: GL_TRIANGLES });
  }

  for (let i = 0; i < segments; i++) {
    const a1 = startAngle + step * i;
    const a2 = a1 + step;

    const x0 = cx + Math.cos(a1) * radius;
    const y0 = cy + Math.sin(a1) * radius;
    const x1 = cx + Math.cos(a2) * radius;
    const y1 = cy + Math.sin(a2) * radius;

    emitColor(cx, cy);
    gl.glVertex2f({ x: cx, y: cy });

    emitColor(x0, y0);
    gl.glVertex2f({ x: x0, y: y0 });

    emitColor(x1, y1);
    gl.glVertex2f({ x: x1, y: y1 });
  }

  if (!options.skipRendering) {
    gl.glEnd();
  }
}

export function drawRectGL(gl: GLFW, options: DrawRectGLOptions): void {
  const { x, y, width, height, rgba, gradientCtx, opacity = 1 } = options;

  const emitColor = (px: number, py: number) => {
    if (!gradientCtx) return;

    const c = getGradientColor({ ctx: gradientCtx, x: px, y: py, opacity });
    gl.glColor4f(c);
  };

  if (!gradientCtx && rgba) {
    gl.glColor4f({
      red: rgba.red,
      green: rgba.green,
      blue: rgba.blue,
      alpha: rgba.alpha * opacity,
    });
  }

  if (!options.skipRendering) {
    gl.glBegin({ mode: GL_QUADS });
  }

  // Render on top-left
  emitColor(x, y);

  gl.glVertex2f({ x: x, y: y });
  // Render on top-right
  emitColor(x + width, y);
  gl.glVertex2f({ x: x + width, y: y });

  // Render on bottom-right
  emitColor(x + width, y + height);
  gl.glVertex2f({ x: x + width, y: y + height });

  // Render on bottom-left
  emitColor(x, y + height);
  gl.glVertex2f({ x: x, y: y + height });

  if (!options.skipRendering) {
    gl.glEnd();
  }
}
