import { earclip } from '../earclip';
import type { Path2D } from '../path2d';
import type { Polygon, TessellateOptions, TriangleList } from '../types';
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
