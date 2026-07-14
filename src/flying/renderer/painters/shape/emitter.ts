import type { GLLike } from '../../batch';
import { getGradientColor } from '../gradient';
import type { DrawArcGLOptions, DrawRectGLOptions } from '../types';

export function emitRectVertices(gl: GLLike, options: DrawRectGLOptions): void {
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
}

export function emitArcVertices(gl: GLLike, options: DrawArcGLOptions): void {
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
}
