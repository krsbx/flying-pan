/**
 * Tailwind-flavored default palette + metrics for flying-pan.
 *
 * flying-pan targets Electron-replacement use cases, so the toolkit's
 * defaults match the web ecosystem's de facto neutral palette. Every
 * color is a stable Tailwind shade — extensions (success/warning/error,
 * dark-mode counterparts) can drop in later without renaming existing
 * keys.
 *
 * Keep references going through `Palette` / `Metrics` rather than
 * re-literalizing hex values, so a palette bump touches one file.
 */

export const Palette = {
  // Surfaces
  surface: '#ffffff', // white
  surfaceHover: '#f3f4f6', // gray-100
  surfaceActive: '#e5e7eb', // gray-200

  // Borders
  border: '#d1d5db', // gray-300 — idle
  borderFocus: '#3b82f6', // blue-500 — focus / checked

  // Text
  text: '#1f2937', // gray-800
  textMuted: '#6b7280', // gray-500
  textOnAccent: '#ffffff', // white on accent fills

  // Accent
  accent: '#3b82f6', // blue-500
  accentHover: '#2563eb', // blue-600
  accentActive: '#1d4ed8', // blue-700
} as const;

export type PaletteColor = keyof typeof Palette;

/**
 * Standard layout metrics used by widget defaults. Keeps radii, paddings,
 * and stroke widths consistent across the toolkit.
 */
export const Metrics = {
  borderWidth: 1, // Tailwind default stroke
  borderWidthThick: 2, // for emphasis states / larger controls
  controlRadius: 4, // checkbox / radio / small input
  buttonRadius: 6,
  inputRadius: 4,
  defaultPadding: 8,
  controlSize: 16, // checkbox / radio default dimension
} as const;

export type MetricKey = keyof typeof Metrics;
