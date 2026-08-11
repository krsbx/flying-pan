import type { FontManager, Window } from '@flying/app';
import { CanvasStateNode } from '@flying/state';
import type { CanvasStateNodeValue } from '@flying/state/canvas/types';
import { Path2D, tessellatePath } from '@flying/tessellation';
import type { ValidColor } from '@flying/types';
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
  // Stroke (rectangular only — arbitrary path strokes need outline expansion)
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
