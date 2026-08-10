import type { Coordinate2D } from '@flying/types';
import { PathCommandType } from '../constant';
import { flattenArc, flattenCubic, flattenQuadratic } from '../flatten';
import type { PathCommand, Polygon } from '../types';
import { contains, signedArea } from './utils';

export class Path2DContour {
  public readonly commands: readonly PathCommand[] | PathCommand[];
  public readonly tolerance: number;

  protected current: Coordinate2D[] | null;
  protected coord: Coordinate2D | null;
  protected _contours: Coordinate2D[][];
  protected _groups: Polygon[];

  public constructor(
    commands: readonly PathCommand[] | PathCommand[],
    tolerance: number = 0.5
  ) {
    this.commands = commands;
    this.tolerance = tolerance;
    this.current = null;
    this.coord = null;
    this._contours = [];
    this._groups = [];
  }

  protected flush(): void {
    if (this.current && this.current.length >= 3) {
      const last = this.current[this.current.length - 1]!;
      const first = this.current[0]!;

      if (last.x === first.x && last.y === first.y) {
        this.current.pop();
      }

      if (this.current.length >= 3) {
        this._contours.push(this.current);
      }
    }

    this.current = null;
    this.coord = null;
  }

  public flatten(tolerance: number = this.tolerance): Path2DContour {
    for (const cmd of this.commands) {
      switch (cmd.type) {
        case PathCommandType.Move: {
          this.flush();
          this.current = [cmd.to];
          this.coord = cmd.to;
          break;
        }

        case PathCommandType.Line: {
          this.current ||= [];
          this.current.push(cmd.to);
          this.coord = cmd.to;
          break;
        }

        case PathCommandType.Quadratic: {
          if (!this.current || !this.coord) {
            this.current = [cmd.to];
            this.coord = cmd.to;
            break;
          }

          const pts = flattenQuadratic({
            from: this.coord,
            control: cmd.control,
            to: cmd.to,
            tolerance: tolerance,
          });

          this.current.push(...pts);
          this.coord = cmd.to;
          break;
        }

        case PathCommandType.Cubic: {
          if (!this.current || !this.coord) {
            this.current = [cmd.to];
            this.coord = cmd.to;
            break;
          }

          const pts = flattenCubic({
            from: this.coord,
            control1: cmd.control1,
            control2: cmd.control2,
            to: cmd.to,
            tolerance: tolerance,
          });

          this.current.push(...pts);
          this.coord = cmd.to;
          break;
        }

        case PathCommandType.Arc: {
          if (!this.current || !this.coord) {
            // Defensive: Path2D always emits MOVE/LINE before ARC, but guard
            // against direct command construction by seeding from the arc start.
            const start: Coordinate2D = {
              x: cmd.center.x + Math.cos(cmd.startAngle) * cmd.radius,
              y: cmd.center.y + Math.sin(cmd.startAngle) * cmd.radius,
            };

            this.current = [start];
            this.coord = start;
          }

          const pts = flattenArc({
            center: cmd.center,
            radius: cmd.radius,
            startAngle: cmd.startAngle,
            endAngle: cmd.endAngle,
            anticlockwise: cmd.anticlockwise,
            tolerance: tolerance,
          });

          this.current.push(...pts);

          if (pts.length > 0) {
            this.coord = pts[pts.length - 1]!;
          }

          break;
        }

        case PathCommandType.Close: {
          this.flush();
          break;
        }
      }
    }

    this.flush();

    return this;
  }

  public group(contours: Coordinate2D[][] = this._contours): Path2DContour {
    this._groups = Path2DContour.group(contours);

    return this;
  }

  public get contours(): Coordinate2D[][] {
    return this._contours;
  }

  public get groups(): Polygon[] {
    return this._groups;
  }

  public static group(contours: Coordinate2D[][]): Polygon[] {
    if (contours.length === 0) return [];

    const parents: (number | null)[] = contours.map(() => null);
    const areas = contours.map((c) => Math.abs(signedArea(c)));

    for (let i = 0; i < contours.length; i++) {
      const probe = contours[i]![0]!;

      let best: number | null = null;
      let bestArea = Infinity;

      for (let j = 0; j < contours.length; j++) {
        if (i === j) continue;

        if (contains(contours[j]!, probe) && areas[j]! < bestArea) {
          bestArea = areas[j]!;
          best = j;
        }
      }

      parents[i] = best;
    }

    const groups: Polygon[] = [];

    for (let i = 0; i < contours.length; i++) {
      if (parents[i] !== null) continue;

      const holes: Coordinate2D[][] = [];

      for (let j = 0; j < contours.length; j++) {
        if (parents[j] === i) holes.push(contours[j]!);
      }

      groups.push({ outer: contours[i]!, holes });
    }

    return groups;
  }
}
