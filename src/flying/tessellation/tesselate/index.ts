import { earclip } from '../earclip';
import type { Path2D } from '../path2d';
import type {
  Polygon,
  Polyline,
  TessellateOptions,
  TriangleList,
} from '../types';
import { Path2DContour } from './contour';
import { fanTriangulate, isConvex } from './utils';

export function tessellatePath(
  path: Path2D,
  options: TessellateOptions | null = null
): TriangleList {
  const tolerance = options?.tolerance ?? 0.5;

  const contours = new Path2DContour(path.commands, tolerance)
    .flatten()
    .group();
  const groups = contours.groups;

  const positions: number[] = [];

  for (const group of groups) {
    if (group.holes.length === 0 && isConvex(group.outer)) {
      fanTriangulate(group.outer, positions);
    } else {
      const polygon: Polygon = {
        outer: group.outer,
        holes: group.holes,
      };

      positions.push(...earclip(polygon));
    }
  }

  return {
    positions,
    vertexCount: positions.length / 2,
  };
}

/**
 * Flatten a path into polyline contours with open/closed state — the
 * stroke-side analog of {@link tessellatePath}. Curves are converted to
 * line segments within `tolerance` pixels of deviation. Each `closePath`
 * marks its contour as closed; unclosed contours retain their endpoints
 * (butt caps on stroke).
 */
export function flattenPath(
  path: Path2D,
  tolerance: number = 0.5
): readonly Polyline[] {
  return new Path2DContour(path.commands, tolerance).flatten().polylines;
}
