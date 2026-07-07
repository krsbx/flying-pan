import type { GLFW } from '@glfw';
import { drawQuads, drawTriangles } from '../drawer';
import type {
  DrawArcGLOptions,
  DrawRectGLOptions,
  DrawRoundedGLRectOptions,
  DrawRoundedRectGLCornerOptions,
} from '../types';
import { emitArcVertices, emitRectVertices } from './emitter';

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

  drawQuads(gl, () => {
    // Center rectangle (full width, reduced height)
    emitRectVertices(gl, {
      x,
      y: y + r,
      width,
      height: height - 2 * r,
      rgba,
      gradientCtx,
      opacity,
    });

    // Top rectangle
    emitRectVertices(gl, {
      x: x + r,
      y,
      width: width - 2 * r,
      height: r,
      rgba,
      gradientCtx,
      opacity,
    });

    // Bottom rectangle
    emitRectVertices(gl, {
      x: x + r,
      y: y + height - r,
      width: width - 2 * r,
      height: r,
      rgba,
      gradientCtx,
      opacity,
    });
  });

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

  const segments = Math.max(4, Math.ceil(r / 2));

  drawTriangles(gl, () => {
    // Corner arcs — pass through the gradientCtx/opacity so corners blend.
    // rgba is ignored by emitArcVertices when gradientCtx is set.
    // Top-left
    emitArcVertices(gl, {
      cx: x + r,
      cy: y + r,
      radius: r,
      startAngle: Math.PI,
      endAngle: Math.PI * 1.5,
      segments,
      rgba,
      gradientCtx,
      opacity,
    });

    // Top-right
    emitArcVertices(gl, {
      cx: x + width - r,
      cy: y + r,
      radius: r,
      startAngle: Math.PI * 1.5,
      endAngle: Math.PI * 2,
      segments,
      rgba,
      gradientCtx,
      opacity,
    });

    // Bottom-right
    emitArcVertices(gl, {
      cx: x + width - r,
      cy: y + height - r,
      radius: r,
      startAngle: 0,
      endAngle: Math.PI * 0.5,
      segments,
      rgba,
      gradientCtx,
      opacity,
    });

    // Bottom-left
    emitArcVertices(gl, {
      cx: x + r,
      cy: y + height - r,
      radius: r,
      startAngle: Math.PI * 0.5,
      endAngle: Math.PI,
      segments,
      rgba,
      gradientCtx,
      opacity,
    });
  });
}

export function drawArcGL(gl: GLFW, options: DrawArcGLOptions): void {
  drawTriangles(gl, () => emitArcVertices(gl, options));
}

export function drawRectGL(gl: GLFW, options: DrawRectGLOptions): void {
  drawQuads(gl, () => emitRectVertices(gl, options));
}
