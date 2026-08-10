import type { Coordinate2D } from '@flying/types';

export function signedArea(coords: Coordinate2D[]): number {
  let area = 0;

  const n = coords.length;

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;

    area += coords[i]!.x * coords[j]!.y - coords[i]!.y * coords[j]!.x;
  }

  return area / 2;
}

export function contains(polygon: Coordinate2D[], c: Coordinate2D): boolean {
  let inside = false;
  const n = polygon.length;

  for (let i = 0, j = n - 1; i < n; j = i, i++) {
    const pi = polygon[i]!;
    const pj = polygon[j]!;

    if (pi.y > c.y !== pj.y > c.y) {
      const xCross = pj.x + ((c.y - pj.y) / (pi.y - pj.y)) * (pi.x - pj.x);

      if (c.x < xCross) inside = !inside;
    }
  }

  return inside;
}

export function isConvex(coords: Coordinate2D[]): boolean {
  const n = coords.length;

  if (n < 3) return false;

  let sign = 0;

  for (let i = 0; i < n; i++) {
    const prev = coords[(i - 1 + n) % n]!;
    const cur = coords[i]!;
    const next = coords[(i + 1) % n]!;
    const cross =
      (cur.x - prev.x) * (next.y - prev.y) -
      (cur.y - prev.y) * (next.x - prev.x);

    if (cross === 0) continue;

    const crossSign = cross > 0 ? 1 : -1;

    if (sign === 0) sign = crossSign;
    else if (crossSign !== sign) return false;
  }

  return true;
}

export function fanTriangulate(coords: Coordinate2D[], result: number[]): void {
  const pivot = coords[0]!;

  for (let i = 1; i < coords.length - 1; i++) {
    result.push(
      pivot.x,
      pivot.y,
      coords[i]!.x,
      coords[i]!.y,
      coords[i + 1]!.x,
      coords[i + 1]!.y
    );
  }
}
