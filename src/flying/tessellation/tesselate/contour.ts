import type { Coordinate2D } from '@flying/types';
import { PathCommandType } from '../constant';
import { flattenArc, flattenCubic, flattenQuadratic } from '../flatten';
import type { PathCommand, Polygon, Polyline } from '../types';
import { contains, signedArea } from './utils';

export class Path2DContour {
  public readonly commands: readonly PathCommand[] | PathCommand[];
  public readonly tolerance: number;

  protected current: Polyline | null;
  protected coord: Coordinate2D | null;
  protected _polylines: Polyline[];
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
    this._polylines = [];
    this._contours = [];
    this._groups = [];
  }

  protected flush(): void {
    if (this.current && this.current.points.length >= 2) {
      // Raw polyline view — consumed by stroke. Preserves 2-point contours
      // (single segments) and the open/closed distinction.
      this._polylines.push(this.current);

      // Fill-friendly view — dedup the implicit closing point and require
      // enough vertices to form a polygon. Consumed by group().
      const points = this.current.points;

      if (points.length >= 3) {
        const last = points[points.length - 1]!;
        const first = points[0]!;

        const deduped =
          last.x === first.x && last.y === first.y
            ? points.slice(0, -1)
            : points;

        if (deduped.length >= 3) {
          this._contours.push(deduped);
        }
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
          this.current = { points: [cmd.to], closed: false };
          this.coord = cmd.to;
          break;
        }

        case PathCommandType.Line: {
          this.current ||= { points: [], closed: false };
          this.current.points.push(cmd.to);
          this.coord = cmd.to;
          break;
        }

        case PathCommandType.Quadratic: {
          if (!this.current || !this.coord) {
            this.current = { points: [cmd.to], closed: false };
            this.coord = cmd.to;
            break;
          }

          const pts = flattenQuadratic({
            from: this.coord,
            control: cmd.control,
            to: cmd.to,
            tolerance: tolerance,
          });

          this.current.points.push(...pts);
          this.coord = cmd.to;
          break;
        }

        case PathCommandType.Cubic: {
          if (!this.current || !this.coord) {
            this.current = { points: [cmd.to], closed: false };
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

          this.current.points.push(...pts);
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

            this.current = { points: [start], closed: false };
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

          this.current.points.push(...pts);

          if (pts.length > 0) {
            this.coord = pts[pts.length - 1]!;
          }

          break;
        }

        case PathCommandType.Close: {
          if (this.current) this.current.closed = true;
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

  /**
   * Raw flattened polylines with open/closed state — the stroke-side output.
   * Preserves 2-point contours (single segments) and reports whether each
   * contour was explicitly closed via `closePath()`.
   */
  public get polylines(): readonly Polyline[] {
    return this._polylines;
  }

  /**
   * Fill-friendly contours — closing point deduplicated, degenerate
   * (< 3 point) contours dropped. Used by {@link group}.
   */
  public get contours(): readonly Coordinate2D[][] {
    return this._contours;
  }

  public get groups(): readonly Polygon[] {
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
