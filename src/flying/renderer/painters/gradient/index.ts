import { lerpRgba } from '@flying/animation/interpolate';
import type { Coordinate2D, RGBA } from '@flying/types';
import type { LinearGradient, Rect } from '@flying/widget';
import { parseColor } from '../../color';
import type { GradientCtx } from './types';

const CSS_ANGLE_DEFAULT = 180;

export function createGradientCtx(
  gradient: LinearGradient,
  bounds: Rect
): GradientCtx {
  const angleDeg = gradient.angle ?? CSS_ANGLE_DEFAULT;
  const theta = (angleDeg * Math.PI) / 180;
  const dir: Coordinate2D = { x: Math.sin(theta), y: -Math.cos(theta) }; // CSS → y-down

  const corners: Coordinate2D[] = [
    { x: bounds.x, y: bounds.y },
    { x: bounds.x + bounds.width, y: bounds.y },
    { x: bounds.x + bounds.width, y: bounds.y + bounds.height },
    { x: bounds.x, y: bounds.y + bounds.height },
  ];

  const projections = corners.map((c) => c.x * dir.x + c.y * dir.y);
  const minProj = Math.min(...projections);
  const maxProj = Math.max(...projections);
  const span = Math.max(1e-6, maxProj - minProj); // avoid /0

  const origin: Coordinate2D = { x: dir.x * minProj, y: dir.y * minProj };

  const stops = gradient.stops
    .map((s) => ({
      pos: Math.max(0, Math.min(1, s.position)),
      rgba: parseColor(s.color),
    }))
    .sort((a, b) => a.pos - b.pos);

  return { stops, origin, dir, invSpan: 1 / span };
}

export function getGradientColor(
  options: Coordinate2D & {
    ctx: GradientCtx;
    opacity?: number;
  }
): RGBA {
  const { x, y, ctx, opacity = 1 } = options;

  const raw = (x - ctx.origin.x) * ctx.dir.x + (y - ctx.origin.y) * ctx.dir.y;
  const t = Math.max(0, Math.min(1, raw * ctx.invSpan));

  if (ctx.stops.length === 0) {
    return { red: 0, green: 0, blue: 0, alpha: opacity };
  }

  const first = ctx.stops[0]!;
  const last = ctx.stops[ctx.stops.length - 1]!;

  if (t <= first.pos) {
    const rgba = first.rgba;

    return { ...rgba, alpha: rgba.alpha * opacity };
  }

  if (t >= last.pos) {
    const rgba = last.rgba;

    return { ...rgba, alpha: rgba.alpha * opacity };
  }

  if (ctx.stops.length === 1) {
    const c = ctx.stops[0]!.rgba;

    return { ...c, alpha: c.alpha * opacity };
  }

  for (let i = 0; i < ctx.stops.length - 1; i++) {
    const a = ctx.stops[i]!;
    const b = ctx.stops[i + 1]!;

    if (t >= a.pos && t <= b.pos) {
      const tRel = (t - a.pos) / Math.max(1e-6, b.pos - a.pos);

      const rgba = lerpRgba(a.rgba, b.rgba, tRel);

      return { ...rgba, alpha: rgba.alpha * opacity };
    }
  }

  return { ...last.rgba, alpha: last.rgba.alpha * opacity };
}
