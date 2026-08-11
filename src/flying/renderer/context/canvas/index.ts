import type { FontManager, Window } from '@flying/app';
import { CanvasStateNode } from '@flying/state';
import type { CanvasStateNodeValue } from '@flying/state/canvas/types';
import {
  flattenPath,
  Path2D,
  tessellatePath,
  type TriangleList,
} from '@flying/tessellation';
import type { Coordinate2D, ValidColor } from '@flying/types';
import { ROOT_FONT_SIZE } from '@flying/widget';
import { Color } from '../../color';
import type { Renderer } from '../../renderer';
import type { CanvasContextOptions } from './types';

export class CanvasContext implements CanvasStateNodeValue {
  public fillStyle: ValidColor;
  public strokeStyle: ValidColor;
  public lineWidth: number;
  public globalAlpha: number;
  public font: string | null;
  public fontSize: number;

  protected readonly window: Window;
  protected readonly renderer: Renderer;
  protected readonly fontManager: FontManager;

  protected path2d: Path2D;
  protected states: CanvasStateNode[] = [];

  public constructor(options: CanvasContextOptions) {
    this.fillStyle = Color.black;
    this.strokeStyle = Color.black;
    this.lineWidth = 1;
    this.globalAlpha = 1;
    this.font = null;
    this.fontSize = ROOT_FONT_SIZE;

    this.window = options.window;
    this.renderer = options.renderer;
    this.fontManager = options.fontManager;

    this.path2d = new Path2D();
    this.states = [];
  }

  // -------------------------------------------------------------------------
  // Path building — delegates to internal Path2D
  // -------------------------------------------------------------------------

  public beginPath(): this {
    this.path2d = new Path2D();

    return this;
  }

  public moveTo(x: number, y: number): this {
    this.path2d.moveTo({ x, y });

    return this;
  }

  public lineTo(x: number, y: number): this {
    this.path2d.lineTo({ x, y });

    return this;
  }

  public arc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise = false
  ): this {
    this.path2d.arc({
      center: { x, y },
      radius,
      startAngle,
      endAngle,
      anticlockwise,
    });

    return this;
  }

  public arcTo(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    radius: number
  ): this {
    const from = this.path2d.current ?? { x: 0, y: 0 };

    this.path2d.arcTo({
      from,
      via: { x: x1, y: y1 },
      to: { x: x2, y: y2 },
      radius,
    });

    return this;
  }

  public rect(x: number, y: number, width: number, height: number): this {
    this.path2d.rect({ x, y, width, height });

    return this;
  }

  public quadraticCurveTo(
    cpx: number,
    cpy: number,
    x: number,
    y: number
  ): this {
    this.path2d.quadraticCurveTo({
      control: { x: cpx, y: cpy },
      to: { x, y },
    });

    return this;
  }

  public bezierCurveTo(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number
  ): this {
    this.path2d.bezierCurveTo({
      control1: { x: cp1x, y: cp1y },
      control2: { x: cp2x, y: cp2y },
      to: { x, y },
    });

    return this;
  }

  public closePath(): this {
    this.path2d.closePath();

    return this;
  }

  // -------------------------------------------------------------------------
  // Fill
  // -------------------------------------------------------------------------

  public fill(): this {
    const triangles = tessellatePath(this.path2d);

    this.renderer.drawTriangles(this.window, {
      triangles,
      color: this.fillStyle,
      opacity: this.globalAlpha,
    });

    return this;
  }

  public fillRect(x: number, y: number, width: number, height: number): this {
    this.renderer.drawRect(this.window, {
      x,
      y,
      width,
      height,
      color: this.fillStyle,
      opacity: this.globalAlpha,
    });

    return this;
  }

  public fillText(text: string, x: number, y: number): this {
    if (!this.font) {
      throw new Error('[CanvasContext] No font set');
    }

    const atlas = this.fontManager.get(this.font);

    this.renderer.drawText(this.window, {
      text,
      x,
      y,
      atlas,
      color: this.fillStyle,
      opacity: this.globalAlpha,
      fontSize: this.fontSize,
    });

    return this;
  }

  // -------------------------------------------------------------------------
  // Stroke
  // -------------------------------------------------------------------------

  public strokeRect(x: number, y: number, width: number, height: number): this {
    const lw = this.lineWidth;
    const color = this.strokeStyle;
    const opacity = this.globalAlpha;

    // Top
    this.renderer.drawRect(this.window, {
      x,
      y,
      width,
      height: lw,
      color,
      opacity,
    });

    // Bottom
    this.renderer.drawRect(this.window, {
      x,
      y: y + height - lw,
      width,
      height: lw,
      color,
      opacity,
    });

    // Left
    this.renderer.drawRect(this.window, {
      x,
      y,
      width: lw,
      height,
      color,
      opacity,
    });

    // Right
    this.renderer.drawRect(this.window, {
      x: x + width - lw,
      y,
      width: lw,
      height,
      color,
      opacity,
    });

    return this;
  }

  /**
   * Stroke the current path by expanding it into quad geometry (miter joins,
   * butt caps). Each input segment becomes 2 triangles.
   */
  public stroke(): this {
    const halfWidth = this.lineWidth / 2;
    const polylines = flattenPath(this.path2d);
    const positions: number[] = [];

    for (const polyline of polylines) {
      const { points, closed } = polyline;
      const n = points.length;
      if (n < 2) continue;

      const offsets = this.computeStrokeOffsets(points, closed, halfWidth);
      const segmentCount = closed ? n : n - 1;

      for (let i = 0; i < segmentCount; i++) {
        const j = (i + 1) % n;
        const p1 = points[i]!;
        const p2 = points[j]!;
        const o1 = offsets[i]!;
        const o2 = offsets[j]!;

        // Left / right side vertices at each endpoint
        const l1x = p1.x + o1.x;
        const l1y = p1.y + o1.y;
        const r1x = p1.x - o1.x;
        const r1y = p1.y - o1.y;
        const l2x = p2.x + o2.x;
        const l2y = p2.y + o2.y;
        const r2x = p2.x - o2.x;
        const r2y = p2.y - o2.y;

        positions.push(
          l1x,
          l1y,
          r1x,
          r1y,
          l2x,
          l2y,
          r1x,
          r1y,
          r2x,
          r2y,
          l2x,
          l2y
        );
      }
    }

    const triangles: TriangleList = {
      positions,
      vertexCount: positions.length / 2,
    };

    this.renderer.drawTriangles(this.window, {
      triangles,
      color: this.strokeStyle,
      opacity: this.globalAlpha,
    });

    return this;
  }

  /**
   * Compute the miter offset vector at each polyline vertex. The offset is
   * perpendicular to the stroke's local direction; adding it to the vertex
   * gives the left side, subtracting gives the right side.
   *
   * - Interior vertices: miter along the bisector of incoming + outgoing dirs.
   * - Open-path endpoints: perpendicular to the single adjacent segment.
   * - Anti-parallel foldback (180°): falls back to the incoming normal (bevel).
   */
  protected computeStrokeOffsets(
    points: Coordinate2D[],
    closed: boolean,
    halfWidth: number
  ): Coordinate2D[] {
    const n = points.length;
    const offsets: Coordinate2D[] = new Array(n);

    for (let i = 0; i < n; i++) {
      const cur = points[i]!;
      const prev = closed
        ? points[(i - 1 + n) % n]!
        : points[Math.max(0, i - 1)]!;
      const next = closed
        ? points[(i + 1) % n]!
        : points[Math.min(n - 1, i + 1)]!;

      const dInX = cur.x - prev.x;
      const dInY = cur.y - prev.y;
      const dOutX = next.x - cur.x;
      const dOutY = next.y - cur.y;

      const lenIn = Math.hypot(dInX, dInY);
      const lenOut = Math.hypot(dOutX, dOutY);

      // Perpendicular of the incoming direction (unit). Used both for the
      // miter projection denominator and as the anti-parallel fallback.
      let perpInX = 0;
      let perpInY = 0;
      if (lenIn > 0) {
        perpInX = -dInY / lenIn;
        perpInY = dInX / lenIn;
      }

      // Sum of unit incoming + outgoing directions → tangent bisector.
      let bisectX = 0;
      let bisectY = 0;
      if (lenIn > 0) {
        bisectX += dInX / lenIn;
        bisectY += dInY / lenIn;
      }
      if (lenOut > 0) {
        bisectX += dOutX / lenOut;
        bisectY += dOutY / lenOut;
      }

      const bisectLen = Math.hypot(bisectX, bisectY);

      if (bisectLen < 1e-6) {
        // Anti-parallel reversal — use incoming normal (bevel).
        offsets[i] = { x: perpInX * halfWidth, y: perpInY * halfWidth };
        continue;
      }

      // Miter normal = perpendicular of the tangent bisector.
      const miterX = -bisectY / bisectLen;
      const miterY = bisectX / bisectLen;

      // Scale miter so its projection onto perpIn equals halfWidth.
      const proj = miterX * perpInX + miterY * perpInY;
      if (Math.abs(proj) < 1e-6) {
        offsets[i] = { x: perpInX * halfWidth, y: perpInY * halfWidth };
      } else {
        const scale = halfWidth / proj;
        offsets[i] = { x: miterX * scale, y: miterY * scale };
      }
    }

    return offsets;
  }

  // -------------------------------------------------------------------------
  // Transforms — multiply current matrix (no push/pop)
  // -------------------------------------------------------------------------

  public translate(x: number, y: number): this {
    this.renderer.translate(this.window, { x, y });

    return this;
  }

  public rotate(angle: number): this {
    this.renderer.rotate(this.window, angle);

    return this;
  }

  public scale(x: number, y: number): this {
    this.renderer.scale(this.window, { x, y });

    return this;
  }

  public save(): this {
    this.renderer.pushMatrix(this.window);
    this.states.push(new CanvasStateNode(this));

    return this;
  }

  public restore(): this {
    const state = this.states.pop();

    if (!state) return this;

    this.renderer.popMatrix(this.window);
    this.fillStyle = state.fillStyle;
    this.strokeStyle = state.strokeStyle;
    this.lineWidth = state.lineWidth;
    this.globalAlpha = state.globalAlpha;
    this.font = state.font;
    this.fontSize = state.fontSize;

    return this;
  }
}
