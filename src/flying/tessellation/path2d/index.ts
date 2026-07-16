import type { Coordinate2D } from '@/flying/types';
import { PathCommandType } from '../constant';
import type { PathCommand } from '../types';
import type { ArcOptions, RectOptions } from './types';

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

  public arcTo(): this {
    throw new Error('Not implemented');
  }

  public quadraticCurveTo(): this {
    throw new Error('Not implemented');
  }

  public bezierCurveTo(): this {
    throw new Error('Not implemented');
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
