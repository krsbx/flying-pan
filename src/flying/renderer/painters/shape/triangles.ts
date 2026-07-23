import type { GLLike } from '../../batch';
import { parseColor } from '../../color';
import { GL_TRIANGLES } from '../../constant';
import type { DrawTrianglesOptions } from '../../renderer/types';

export function drawTriangles(gl: GLLike, options: DrawTrianglesOptions): void {
  const { triangles, color, opacity = 1 } = options;
  const { positions, colors, vertexCount } = triangles;

  const rgba = parseColor(color);
  const solidAlpha = rgba.alpha * opacity;

  gl.glBegin({ mode: GL_TRIANGLES });

  for (let i = 0; i < vertexCount; i++) {
    if (colors) {
      const base = i * 4;
      gl.glColor4f({
        red: colors[base]!,
        green: colors[base + 1]!,
        blue: colors[base + 2]!,
        alpha: colors[base + 3]! * opacity,
      });
    } else {
      gl.glColor4f({
        red: rgba.red,
        green: rgba.green,
        blue: rgba.blue,
        alpha: solidAlpha,
      });
    }
    const p = i * 2;
    gl.glVertex2f({ x: positions[p]!, y: positions[p + 1]! });
  }

  gl.glEnd();
}
