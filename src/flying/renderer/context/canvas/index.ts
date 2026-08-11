import type {
  ArcOptions,
  ArcToOptions,
  BezierCurveToOptions,
  QuadraticCurveToOptions,
  RectOptions,
} from '@/flying/tessellation/path2d/types';
import type { FontManager, Window } from '@flying/app';
import { CanvasStateNode } from '@flying/state';
import type { CanvasStateNodeValue } from '@flying/state/canvas/types';
import { Path2D, tessellatePath } from '@flying/tessellation';
import type { Coordinate2D, ValidColor } from '@flying/types';
import { ROOT_FONT_SIZE } from '@flying/widget';
import { Color } from '../../color';
import type { Renderer } from '../../renderer';
import type {
  CanvasContextOptions,
  FillRectOptions,
  FillTextOptions,
  StrokeRectOptions,
} from './types';

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

  public moveTo(to: Coordinate2D): this {
    this.path2d.moveTo(to);

    return this;
  }

  public lineTo(to: Coordinate2D): this {
    this.path2d.lineTo(to);

    return this;
  }

  public arc(options: ArcOptions): this {
    this.path2d.arc(options);

    return this;
  }

  public arcTo(options: ArcToOptions): this {
    this.path2d.arcTo(options);

    return this;
  }

  public rect(options: RectOptions): this {
    this.path2d.rect(options);

    return this;
  }

  public quadraticCurveTo(options: QuadraticCurveToOptions): this {
    this.path2d.quadraticCurveTo(options);

    return this;
  }

  public bezierCurveTo(options: BezierCurveToOptions): this {
    this.path2d.bezierCurveTo(options);

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

  public fillRect(options: FillRectOptions): this {
    this.renderer.drawRect(this.window, {
      ...options,
      color: this.fillStyle,
      opacity: this.globalAlpha,
    });

    return this;
  }

  public fillText(options: FillTextOptions): this {
    if (!this.font) {
      throw new Error('[CanvasContext] No font set');
    }

    const atlas = this.fontManager.get(this.font);

    this.renderer.drawText(this.window, {
      ...options,
      atlas,
      color: this.fillStyle,
      opacity: this.globalAlpha,
    });

    return this;
  }

  // -------------------------------------------------------------------------
  // Stroke (rectangular only — arbitrary path strokes need outline expansion)
  // -------------------------------------------------------------------------

  public strokeRect(options: StrokeRectOptions): this {
    const { x, y, height, width } = options;

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

  public translate(offset: Coordinate2D): this {
    this.renderer.translate(this.window, offset);

    return this;
  }

  public rotate(angle: number): this {
    this.renderer.rotate(this.window, angle);

    return this;
  }

  public scale(scales: Coordinate2D): this {
    this.renderer.scale(this.window, scales);

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
