import type { AppConfig } from '@flying/app';
import path from 'node:path';

export async function loadConfig(): Promise<AppConfig> {
  const configPath = path.resolve(
    process.env.FLYING_CONFIG || path.join(process.cwd(), 'flying.config.ts')
  );
  const exists = await Bun.file(configPath).exists();

  if (!exists) {
    throw new Error(`[Config] Config file not found: ${configPath}`);
  }

  const config = (await import(`${configPath}?t=${Date.now()}`)).default;

  if (!config) {
    throw new Error(`[Config] Config file is empty: ${configPath}`);
  }

  console.log(`[Config] loaded ${path.relative(process.cwd(), configPath)}`);

  return config;
}
