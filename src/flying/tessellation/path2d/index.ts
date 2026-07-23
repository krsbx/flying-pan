import type { Coordinate2D } from '@/flying/types';
import { PathCommandType } from '../constant';
import type { PathCommand } from '../types';
import type {
  ArcOptions,
  ArcToOptions,
  BezierCurveToOptions,
  QuadraticCurveToOptions,
  RectOptions,
} from './types';

export class Path2D {
  protected _commands: PathCommand[];
  protected _current: Coordinate2D | null;
  protected _subpathStart: Coordinate2D | null;

  public constructor() {
    this._commands = [];
    this._current = null;
    this._subpathStart = null;
  }

  public moveTo(to: Coordinate2D): this {
    this._commands.push({ type: PathCommandType.Move, to });
    this._current = to;
    this._subpathStart = to;

    return this;
  }

  public lineTo(to: Coordinate2D): this {
    if (this._current === null) {
      this.moveTo(to);
    }

    this._commands.push({ type: PathCommandType.Line, to });
    this._current = to;

    return this;
  }

  public rect(options: RectOptions): this {
    const { x, y, width, height } = options;

    return this.moveTo({ x, y })
      .lineTo({ x: x + width, y })
      .lineTo({ x: x + width, y: y + height })
      .lineTo({ x, y: y + height })
      .closePath();
  }

  public arc(options: ArcOptions): this {
    const { center, radius, startAngle, endAngle, anticlockwise } = options;

    const startPoint = {
      x: center.x + Math.cos(startAngle) * radius,
      y: center.y + Math.sin(startAngle) * radius,
    };
    const endPoint = {
      x: center.x + Math.cos(endAngle) * radius,
      y: center.y + Math.sin(endAngle) * radius,
    };

    if (this._current !== null) {
      const dx = startPoint.x - this._current.x;
      const dy = startPoint.y - this._current.y;

      if (dx !== 0 || dy !== 0) {
        this._commands.push({
          type: PathCommandType.Line,
          to: startPoint,
        });
      }
    } else {
      this._commands.push({ type: PathCommandType.Move, to: startPoint });
      this._subpathStart = startPoint;
    }

    this._commands.push({
      type: PathCommandType.Arc,
      center,
      radius,
      startAngle,
      endAngle,
      anticlockwise,
    });
    this._current = endPoint;

    return this;
  }

  public arcTo(options: ArcToOptions): this {
    const { from, via, to, radius } = options;

    const d1x = from.x - via.x;
    const d1y = from.y - via.y;

    const d2x = to.x - via.x;
    const d2y = to.y - via.y;

    const len1 = Math.hypot(d1x, d1y);
    const len2 = Math.hypot(d2x, d2y);

    if (len1 === 0 || len2 === 0) {
      return this.lineTo(to);
    }

    const dot = (d1x * d2x + d1y * d2y) / (len1 * len2);
    const theta = Math.acos(Math.min(Math.max(dot, -1), 1));
    const halftheta = theta / 2;

    const sinHalf = Math.sin(halftheta);

    if (sinHalf === 0) {
      return this.lineTo(to);
    }

    const tanHalf = Math.tan(halftheta);
    const tangentDist = radius / tanHalf;

    const t1 = {
      x: via.x + (d1x / len1) * tangentDist,
      y: via.y + (d1y / len1) * tangentDist,
    };
    const t2 = {
      x: via.x + (d2x / len2) * tangentDist,
      y: via.y + (d2y / len2) * tangentDist,
    };

    if (this._current !== null) {
      const dx = t1.x - this._current.x;
      const dy = t1.y - this._current.y;

      if (dx !== 0 || dy !== 0) {
        this._commands.push({ type: PathCommandType.Line, to: t1 });
      }
    } else {
      this._commands.push({ type: PathCommandType.Move, to: t1 });
      this._subpathStart = t1;
    }

    const bisecLen = radius / sinHalf;
    const bx = d1x / len1 + d2x / len2;
    const by = d1y / len1 + d2y / len2;
    const bLen = Math.hypot(bx, by);

    if (bLen === 0) {
      this._current = t2;
      return this.lineTo(to);
    }

    const center = {
      x: via.x + (bx / bLen) * bisecLen,
      y: via.y + (by / bLen) * bisecLen,
    };

    const startAngle = Math.atan2(t1.y - center.y, t1.x - center.x);
    const endAngle = Math.atan2(t2.y - center.y, t2.x - center.x);

    this._commands.push({
      type: PathCommandType.Arc,
      center,
      radius,
      startAngle,
      endAngle,
    });
    this._current = to;

    return this;
  }

  public quadraticCurveTo(options: QuadraticCurveToOptions): this {
    if (this._current === null) {
      return this.moveTo(options.to);
    }

    this._commands.push({
      type: PathCommandType.Quadratic,
      ...options,
    });
    this._current = options.to;

    return this;
  }

  public bezierCurveTo(options: BezierCurveToOptions): this {
    if (this._current === null) {
      return this.moveTo(options.to);
    }

    this._commands.push({
      type: PathCommandType.Cubic,
      ...options,
    });
    this._current = options.to;

    return this;
  }

  public closePath(): this {
    if (this._subpathStart === null) {
      return this;
    }

    this._commands.push({ type: PathCommandType.Close });
    this._current = this._subpathStart;

    return this;
  }

  public get commands(): readonly PathCommand[] {
    return this._commands;
  }

  public get current(): Coordinate2D | null {
    return this._current;
  }

  public get subpathStart(): Coordinate2D | null {
    return this._subpathStart;
  }
}
