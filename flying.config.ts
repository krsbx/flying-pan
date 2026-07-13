import type { AppConfig } from '@flying/app';

/**
 * Dev-only app config. Read once at startup by `src/bin/develop/index.ts`.
 *
 * Structural settings (window size, library paths, fonts) are NOT hot-reloaded —
 * restart the dev process (`bun run dev`) to pick up changes here.
 */
export default {
  width: 800,
  height: 600,
  title: 'flying-pan',
  libPath: './ffi/glfw/libglfw.3.dylib',
  backgroundColor: '#1a1a2e',
  fonts: [
    {
      fontPath: '/System/Library/Fonts/Helvetica.ttc',
      fontSize: 24,
      libPath: './ffi/truetype/libtruetype.dylib',
      identifier: 'default',
    },
  ],
  audio: {
    miniaudioLibPath: './ffi/miniaudio/libminiaudio.dylib',
  },
  texture: './ffi/stb_image/libimage.dylib',
} satisfies AppConfig;
