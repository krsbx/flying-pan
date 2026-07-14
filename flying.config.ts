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
  libPath: process.env.GLFW_PATH!,
  backgroundColor: '#1a1a2e',
  fonts: [
    {
      fontPath: '/System/Library/Fonts/Helvetica.ttc',
      fontSize: 24,
      libPath: process.env.STB_TRUETYPE_PATH!,
      identifier: 'default',
    },
  ],
  audio: {
    miniaudioLibPath: process.env.MINI_AUDIO_PATH!,
  },
  texture: process.env.STB_IMAGE_PATH,
  useVBO: true,
} satisfies AppConfig;
