import { GLFW_CONNECTED, GLFW_DISCONNECTED } from '@/flying/renderer/constant';
import type { GLFW } from '@/glfw';
import { TypedJSCallback } from '@/utility/callback';
import { CStruct } from '@/utility/cstruct';
import { FFIType, type Pointer } from 'bun:ffi';
import { Monitor } from '../monitor';
import { MonitorEvent } from './constant';
import type {
  MonitorEventCallbackRegistries,
  MonitorManagerSubscriptionMap,
} from './types';

export class MonitorManager {
  public readonly gl: GLFW;
  protected readonly _monitors: Map<string | Pointer, Monitor>;
  protected readonly _monitorsSet: Set<Monitor>;
  protected _fnRegistries: MonitorEventCallbackRegistries;

  public constructor(gl: GLFW) {
    this.gl = gl;
    this._monitors = new Map();
    this._monitorsSet = new Set();

    this._fnRegistries = {
      [MonitorEvent.Connected]: new Set(),
      [MonitorEvent.Disconnected]: new Set(),
      callback: new TypedJSCallback(
        (monitorPtr, event) => {
          const registry = this._fnRegistries;

          if (event === GLFW_CONNECTED) {
            const monitor = new Monitor({ gl: this.gl, address: monitorPtr });

            registry[MonitorEvent.Connected].forEach((fn) => fn(monitor));

            this._monitors.set(monitorPtr, monitor);
            this._monitors.set(monitor.name, monitor);
            this._monitorsSet.add(monitor);
          } else if (event === GLFW_DISCONNECTED) {
            const monitor = this._monitors.get(monitorPtr);

            if (!monitor) return;

            registry[MonitorEvent.Disconnected].forEach((fn) => fn(monitor));

            this._monitors.delete(monitorPtr);
            this._monitors.delete(monitor.name);
            this._monitorsSet.delete(monitor);
          }
        },
        {
          args: [FFIType.ptr, FFIType.i32],
          returns: FFIType.ptr,
        }
      ),
    };

    this.gl.glfwSetMonitorCallback({ callback: this._fnRegistries.callback });

    this.populateMonitors();
  }

  protected getAllMonitors(): Monitor[] {
    const count = new CStruct({ length: CStruct.BYTE_SIZE.i32 });

    const listPtr = this.gl.glfwGetMonitors({
      count: count.$address,
    });

    if (!listPtr) return [];

    const monitorPtr = CStruct.readArrayPrimitive(
      listPtr,
      count.getValue(0, 'i32'),
      'ptr'
    );

    return monitorPtr.map((ptr) => new Monitor({ gl: this.gl, address: ptr }));
  }

  protected populateMonitors(): void {
    const monitors = this.getAllMonitors();

    for (const monitor of monitors) {
      this._monitors.set(monitor.$address!, monitor);
      this._monitors.set(monitor.name, monitor);
      this._monitorsSet.add(monitor);
    }
  }

  public get(address: Pointer): Monitor | null;
  public get(identifier: string): Monitor | null;
  public get(arg0: Pointer | string) {
    return this._monitors.get(arg0) || null;
  }

  public forEach(fn: (monitor: Monitor) => void): void {
    this.all.forEach(fn);
  }

  public get primary(): Monitor {
    const monitorPtr = this.gl.glfwGetPrimaryMonitor();

    if (!monitorPtr) {
      throw new Error('Primary monitor not found!');
    }

    // Use the one we already have instead of recreating the monitor object
    const monitor = this.get(monitorPtr);

    if (!monitor) {
      throw new Error('Primary monitor not found!');
    }

    return monitor;
  }

  public get all(): ReadonlySet<Monitor> {
    return this._monitorsSet;
  }

  public get count(): number {
    return this._monitorsSet.size;
  }

  public get isEmpty(): boolean {
    return this.count === 0;
  }

  public on<
    T extends keyof MonitorManagerSubscriptionMap,
    U extends MonitorManagerSubscriptionMap[T],
  >(event: T, fn: U): void {
    this._fnRegistries[event].add(fn);
  }

  public off<
    T extends keyof MonitorManagerSubscriptionMap,
    U extends MonitorManagerSubscriptionMap[T],
  >(event: T, fn: U): void {
    this._fnRegistries[event].delete(fn as never);
  }
}
