import type { RGBA } from '@flying/types';
import type { GLLike } from '../../batch';
import { parseColor } from '../../color';
import { GL_TRIANGLES } from '../../constant';
import type {
  DrawArcOptions,
  DrawGradientRectOptions,
  DrawRectOptions,
  DrawRingOptions,
  DrawShadowOptions,
} from '../../renderer/types';
import { createGradientCtx } from '../gradient';
import { drawArcGL, drawRectGL, drawRoundedRectGL } from './gl';

export function drawRect(gl: GLLike, options: DrawRectOptions): void {
  const rgba = parseColor(options.color);

  if (options.borderRadius && options.borderRadius > 0) {
    drawRoundedRectGL(gl, {
      ...options,
      radius: options.borderRadius,
      rgba,
    });
  } else {
    drawRectGL(gl, { ...options, rgba });
  }
}

export function drawShadow(gl: GLLike, options: DrawShadowOptions): void {
  const { x, y, width, height, shadow, borderRadius } = options;

  const baseRgba = parseColor(shadow.color);
  const offsetX = shadow.x ?? 0;
  const offsetY = shadow.y ?? 0;
  const blur = shadow.blur ?? 0;
  const spread = shadow.spread ?? 0;
  const radius = borderRadius ?? 0;

  const layers = Math.max(1, Math.min(12, Math.round(blur / 2)));

  for (let i = layers; i >= 1; i--) {
    const t = (i - 1) / layers;
    const expand = spread + blur * t;
    const alpha = baseRgba.alpha * (1 - t) * (1 - t);

    if (alpha <= 0) continue;

    const layerRgba: RGBA = { ...baseRgba, alpha };

    if (radius > 0) {
      drawRoundedRectGL(gl, {
        x: x - expand + offsetX,
        y: y - expand + offsetY,
        width: width + expand * 2,
        height: height + expand * 2,
        radius: radius + expand,
        rgba: layerRgba,
      });
    } else {
      drawRectGL(gl, {
        x: x - expand + offsetX,
        y: y - expand + offsetY,
        width: width + expand * 2,
        height: height + expand * 2,
        rgba: layerRgba,
      });
    }
  }
}

export function drawRing(gl: GLLike, options: DrawRingOptions): void {
  const { cx, cy, outerRadius, innerRadius } = options;

  const rgba = { ...parseColor(options.color) };

  if (options.opacity !== undefined) {
    rgba.alpha *= options.opacity;
  }

  const startAngle = options.startAngle ?? 0;
  const endAngle = options.endAngle ?? Math.PI * 2;
  const segments =
    options.segments ?? Math.max(16, Math.ceil(outerRadius * 1.5));

  const step = (endAngle - startAngle) / segments;

  gl.glColor4f(rgba);
  gl.glBegin({ mode: GL_TRIANGLES });

  for (let i = 0; i < segments; i++) {
    const a1 = startAngle + step * i;
    const a2 = a1 + step;

    const ox0 = cx + Math.cos(a1) * outerRadius;
    const oy0 = cy + Math.sin(a1) * outerRadius;
    const ox1 = cx + Math.cos(a2) * outerRadius;
    const oy1 = cy + Math.sin(a2) * outerRadius;

    const ix0 = cx + Math.cos(a1) * innerRadius;
    const iy0 = cy + Math.sin(a1) * innerRadius;
    const ix1 = cx + Math.cos(a2) * innerRadius;
    const iy1 = cy + Math.sin(a2) * innerRadius;

    gl.glVertex2f({ x: ix0, y: iy0 });
    gl.glVertex2f({ x: ox0, y: oy0 });
    gl.glVertex2f({ x: ox1, y: oy1 });

    gl.glVertex2f({ x: ox1, y: oy1 });
    gl.glVertex2f({ x: ix0, y: iy0 });
    gl.glVertex2f({ x: ix1, y: iy1 });
  }

  gl.glEnd();
}

export function drawArc(gl: GLLike, options: DrawArcOptions): void {
  const { cx, cy, radius } = options;

  const rgba = parseColor(options.color);

  drawArcGL(gl, {
    cx,
    cy,
    radius,
    startAngle: options.startAngle ?? 0,
    endAngle: options.endAngle ?? Math.PI * 2,
    segments: options.segments ?? Math.max(16, Math.ceil(radius * 1.5)),
    rgba,
  });
}

export function drawGradientRect(
  gl: GLLike,
  options: DrawGradientRectOptions
): void {
  const { x, y, width, height, gradient, opacity } = options;
  const radius = options.borderRadius ?? 0;

  const gradientCtx = createGradientCtx(gradient, { x, y, width, height });

  if (options.borderRadius && options.borderRadius > 0) {
    drawRoundedRectGL(gl, {
      x,
      y,
      width,
      height,
      radius,
      gradientCtx,
      opacity,
    });
  } else {
    drawRectGL(gl, {
      x,
      y,
      width,
      height,
      gradientCtx,
      opacity,
    });
  }
}
