import type { GLFW } from '@/glfw';
import type { Pointer } from 'bun:ffi';
import { Window, type WindowOptions } from '../window';
import { WindowEvent } from '../window/constant';
import { WindowManagerEvent } from './constant';
import type {
  WindowManagerCallbackRegistries,
  WindowManagerSubscriptionMap,
} from './types';

export class WindowManager {
  public readonly gl: GLFW;
  protected readonly _windows: Map<string | Pointer, Window>;
  protected readonly _windowsSet: Set<Window>;
  protected _fnRegistries: WindowManagerCallbackRegistries;
  protected _active: Window | null;

  public constructor(gl: GLFW) {
    this.gl = gl;
    this._windows = new Map();
    this._windowsSet = new Set();
    this._fnRegistries = {
      created: new Set(),
      destroyed: new Set(),
      active_changed: new Set(),
    };
    this._active = null;
  }

  protected resolve(arg0: Window | Pointer | string): Window {
    if (arg0 instanceof Window) return arg0;

    const window = this._windows.get(arg0);

    if (!window) throw new Error('[WindowManager] Window not found!');

    return window;
  }

  public create(options: WindowOptions) {
    const window = new Window({ ...options, gl: this.gl });

    if (!window.$address) {
      throw new Error('Failed to create a new GLFW window!');
    }

    // Trigger onCreated event
    this._fnRegistries[WindowManagerEvent.Created].forEach((fn) => fn(window));

    this._windowsSet.add(window);
    this._windows.set(options.identifier || options.title, window);
    this._windows.set(window.$address, window);

    // Change the active window to the newly created one
    this.setActive(window);

    // Auto switch the active window on focus
    window.on(WindowEvent.Focus, (focused) => {
      if (!focused) return;

      this.setActive(window);
    });

    return window;
  }

  public focus(window: Window): void;
  public focus(pointer: Pointer): void;
  public focus(identifier: string): void;
  public focus(arg0: Window | Pointer | string) {
    const window = this.resolve(arg0);

    // Restore the window if its minimized
    if (window.isMinimized) {
      window.maximize();
    }

    // Focus the window/Bring the window to the front
    this.gl.glfwFocusWindow({ window: window.$address });
    // Change the active window
    this.setActive(window);
  }

  public close(window: Window): void;
  public close(pointer: Pointer): void;
  public close(identifier: string): void;
  public close(arg0: Window | Pointer | string) {
    const window = this.resolve(arg0);

    this.gl.glfwSetWindowShouldClose({
      window: window.$address,
      value: Number(true),
    });
  }

  public destroy(window: Window): void;
  public destroy(pointer: Pointer): void;
  public destroy(identifier: string): void;
  public destroy(arg0: Window | Pointer | string) {
    const window = this.resolve(arg0);

    if (!window.$address || !window.identifier) {
      throw new Error('[WindowManager] Invalid window identifier/pointer!');
    }

    // Trigger onDestroyed event
    this._fnRegistries[WindowManagerEvent.Destroyed].forEach((fn) =>
      fn(window)
    );

    this.gl.glfwDestroyWindow({ window: window.$address });

    this._windowsSet.delete(window);
    this._windows.delete(window.$address);
    this._windows.delete(window.identifier);
  }

  public get(address: Pointer): Window | null;
  public get(identifier: string): Window | null;
  public get(arg0: Pointer | string) {
    return this._windows.get(arg0) || null;
  }

  public forEach(fn: (window: Window) => void) {
    this.all.forEach(fn);
  }

  public get all() {
    return [...this._windowsSet.values()];
  }

  public get active() {
    return this._active;
  }

  public get count() {
    return this._windowsSet.size;
  }

  public get isEmpty() {
    return this.count === 0;
  }

  public setActive(window: Window): void;
  public setActive(pointer: Pointer): void;
  public setActive(identifier: string): void;
  public setActive(arg0: Window | Pointer | string) {
    const window = this.resolve(arg0);

    if (window.isMinimized) return;

    // Trigger the onActiveChanged event
    this._fnRegistries[WindowManagerEvent.ActiveChanged].forEach((fn) =>
      fn(this._active, window)
    );

    this._active = window;

    this.gl.glfwMakeContextCurrent({ window: window.$address });
  }

  public cleanUp(): void {
    for (const window of this.all) {
      if (this.gl.glfwWindowShouldClose({ window: window.$address })) {
        this.destroy(window);
      }
    }
  }

  public on<
    T extends keyof WindowManagerSubscriptionMap,
    U extends WindowManagerSubscriptionMap[T],
  >(type: T, fn: U) {
    this._fnRegistries[type].add(fn as never);
  }

  public off<
    T extends keyof WindowManagerSubscriptionMap,
    U extends WindowManagerSubscriptionMap[T],
  >(type: T, fn: U) {
    this._fnRegistries[type].delete(fn as never);
  }
}
