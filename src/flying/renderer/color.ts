export interface RGBA {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export const Color = {
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

export function parseColor(color: string): RGBA {
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

  const hex = Color[color.toLowerCase() as keyof typeof Color];

  if (hex) return parseColor(hex.toString());

  return {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 1,
  };
}
