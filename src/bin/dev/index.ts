import {
  App,
  WindowEvent,
  type AppConfig,
  type OnRenderFrame,
} from '@flying/app';
import { watch } from 'node:fs';
import path from 'node:path';
import { loadConfig } from '../config';

interface CleanupFn {
  (): void | Promise<void>;
}

export interface RestartFn {
  (app: App): CleanupFn | void;
}

export interface EntryModule {
  default?: OnRenderFrame;
  onReload?: RestartFn;
}

class DevServer {
  protected _loaded: boolean;
  protected _entryPath: string;
  protected _entryModule!: EntryModule;
  protected _frameFn: OnRenderFrame;
  protected _cleanupFn: CleanupFn | null;
  protected _config: AppConfig | null;
  protected app: App | null;

  public constructor(entryPath: string) {
    this._loaded = false;
    this._frameFn = () => {};
    this._cleanupFn = null;
    this._entryPath = entryPath;
    this._config = null;
    this.app = null;
  }

  public async reload(): Promise<void> {
    if (!this.app) {
      console.warn('[DEV] reload called before start — skipping');
      return;
    }

    try {
      const mod: EntryModule = await import(
        `${this._entryPath}?t=${Date.now()}`
      );

      let nextCleanup: CleanupFn | null = null;
      if (typeof mod.onReload === 'function') {
        const result = mod.onReload(this.app);
        nextCleanup = typeof result === 'function' ? result : null;
      }

      const prevCleanup = this._cleanupFn;
      this._frameFn = mod.default ?? (() => {});
      this._cleanupFn = nextCleanup;
      this._entryModule = mod;

      if (prevCleanup) {
        try {
          await prevCleanup();
        } catch (e) {
          console.error('[DEV] onReload cleanup threw:', e);
        }
      }

      this._loaded = true;

      console.log(
        `[DEV] loaded ${path.relative(process.cwd(), this._entryPath)}`
      );
    } catch (e) {
      console.error('[DEV] Failed to load entry:', e);
    }
  }

  public async start(): Promise<void> {
    const config = this._config ?? (await loadConfig());
    this._config = config;

    this.app = new App(config);

    this.app.root.on(WindowEvent.Close, () => {
      process.exit(0);
    });

    this.app.onFrame((app) => this._frameFn(app));

    await this.reload();

    this.app.run();

    this.watchEntryModule();
  }

  protected watchEntryModule(): void {
    let reloadTimer: NodeJS.Timeout | null = null;
    const EXCLUDE = /(^|[/\\])(node_modules|\.git)([/\\]|$)/;

    const schedule = (filename?: string | null) => {
      if (filename && EXCLUDE.test(filename)) return;
      if (reloadTimer) clearTimeout(reloadTimer);
      reloadTimer = setTimeout(() => {
        console.log('[DEV] change detected — reloading');
        this.reload();
      }, 120);
    };

    const entryDir = path.dirname(this._entryPath);

    try {
      watch(entryDir, { recursive: true }, (_event, filename) =>
        schedule(filename)
      );
    } catch (e) {
      console.error(
        `[DEV] recursive watch unavailable on this platform — ` +
          `manual restart required for changes:`,
        e
      );
    }

    console.log(
      `[DEV] watching ${path.relative(process.cwd(), entryDir)}/ recursively` +
        ' (excl. node_modules, .git)'
    );
  }

  public get loaded(): boolean {
    return this._loaded;
  }

  public get cleanupFn(): CleanupFn | null {
    return this._cleanupFn;
  }

  public get frameFn(): OnRenderFrame {
    return this._frameFn;
  }

  public get entryPath(): string {
    return this._entryPath;
  }

  public get config(): AppConfig | null {
    if (!this._config) {
      console.warn('[DEV] Config not loaded!');
    }

    return this._config;
  }
}

export async function startDevServer(
  entryPath: string | null | undefined = null
): Promise<DevServer> {
  entryPath ||= process.argv[2] || process.env.FLYING_ENTRY || '';

  if (!entryPath) {
    throw new Error(
      '[FLYING] Entry file path required. Pass it as argv[2], set FLYING_ENTRY, or pass it to startDevServer().'
    );
  }

  console.log('Starting dev server...');

  const exists = await Bun.file(entryPath).exists();

  if (!exists) {
    throw new Error(`[FLYING] Entry file not found: ${entryPath}`);
  }

  const server = new DevServer(path.resolve(entryPath));
  await server.start();

  return server;
}
