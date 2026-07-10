import type { RGBA } from '@flying/types';

export const Color = {
  background: '#1a1a2e',
  white: '#ffffff',
  black: '#000000',
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff',
  yellow: '#ffff00',
  cyan: '#00ffff',
  magenta: '#ff00ff',
  gray: '#808080',
  grey: '#808080',
  transparent: '#00000000',
} satisfies Record<string, string>;

export type Color = keyof typeof Color;

const colorCache = new Map<string, RGBA>();
const COLOR_CACHE_CAP = 256;

export function parseColor(color: string): RGBA {
  const cached = colorCache.get(color);
  if (cached) return cached;

  const result = resolveColor(color);

  if (colorCache.size >= COLOR_CACHE_CAP) {
    colorCache.clear();
  }

  colorCache.set(color, result);
  return result;
}

function resolveColor(color: string): RGBA {
  // #RGB
  if (/^#[0-9a-fA-F]{3}$/.test(color)) {
    const hex = color.slice(1);

    return {
      red: parseInt(hex[0]! + hex[0], 16) / 255,
      green: parseInt(hex[1]! + hex[1], 16) / 255,
      blue: parseInt(hex[2]! + hex[2], 16) / 255,
      alpha: 1,
    };
  }

  // #RRGGBB
  if (/^#[0-9a-fA-F]{6}$/.test(color)) {
    const hex = color.slice(1);

    return {
      red: parseInt(hex.slice(0, 2), 16) / 255,
      green: parseInt(hex.slice(2, 4), 16) / 255,
      blue: parseInt(hex.slice(4, 6), 16) / 255,
      alpha: 1,
    };
  }

  // #RRGGBBAA
  if (/^#[0-9a-fA-F]{8}$/.test(color)) {
    const hex = color.slice(1);

    return {
      red: parseInt(hex.slice(0, 2), 16) / 255,
      green: parseInt(hex.slice(2, 4), 16) / 255,
      blue: parseInt(hex.slice(4, 6), 16) / 255,
      alpha: parseInt(hex.slice(6, 8), 16) / 255,
    };
  }

  // rgb() / rgba() — channels 0-255, alpha 0-1 (comma or space separated)
  const rgbMatch = /^rgba?\(([^)]+)\)$/i.exec(color);

  if (rgbMatch) {
    const parts = rgbMatch[1]!.split(/[\s,/]+/).filter(Boolean);
    const channel = (v: string | undefined): number =>
      Math.max(0, Math.min(1, parseFloat(v ?? '0') / 255));
    const aPart = parts[3];
    const alpha = aPart ? Math.max(0, Math.min(1, parseFloat(aPart))) : 1;

    return {
      red: channel(parts[0]),
      green: channel(parts[1]),
      blue: channel(parts[2]),
      alpha,
    };
  }

  const hex = Color[color.toLowerCase() as keyof typeof Color];

  if (hex) return parseColor(hex.toString());

  return {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 1,
  };
}
