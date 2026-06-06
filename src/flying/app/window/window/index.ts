import type { Coordinate2D, FrameBufferSize, Resolution } from '@/flying/types';
import type { GLFW } from '@/glfw';
import { TypedJSCallback } from '@/utility/callback';
import { CStruct } from '@/utility/cstruct';
import { FVector2, Vector2 } from '@/utility/vectors';
import { FFIType, type Pointer } from 'bun:ffi';
import type { Color } from '../../../renderer/color';
import { InputEvent, WindowEvent } from './constant';
import type {
  CallbackRegistries,
  InputEventCallbackRegistries,
  WindowEventCallbackRegistries,
  WindowSubscriptionMap,
} from './types';

export interface WindowOptions {
  width: number;
  height: number;
  title: string;

  /** Active window identifier - Default use {title} */
  identifier?: string | null;
  backgroundColor?: Color | (string & {}) | null;
  share?: Window | Pointer | null;
}

export class Window {
  public readonly gl: GLFW;
  public $address: Pointer | null;
  protected _size: Resolution;
  protected _position: Coordinate2D;
  protected _mousePosition: Coordinate2D;
  protected _title: string;
  protected _identifier: string;
  protected _fnRegistries: CallbackRegistries;
  public backgroundColor: string;

  protected _isFocused: boolean;
  protected _isHovered: boolean;
  protected _isMaximized: boolean;
  protected _isMinimized: boolean;
  protected _frameBuffer: FrameBufferSize;
  protected _contentScale: Coordinate2D;

  public constructor(options: WindowOptions & { gl: GLFW }) {
    this.gl = options.gl;

    this.$address = this.gl.glfwCreateWindow({
      height: options.height,
      width: options.width,
      title: options.title,
      monitor: null,
      share: options.share
        ? options.share instanceof Window
          ? options.share.$address
          : options.share
        : null,
    });

    if (!this.$address) {
      throw new Error('Failed to initialize window!');
    }

    this._title = options.title;
    this._identifier = options.identifier || options.title;
    this.backgroundColor = options.backgroundColor || '#1a1a2e';
    this._position = this.getPosition();
    this._mousePosition = this.getMousePosition();
    this._frameBuffer = this.getFrameBuffer();
    this._contentScale = this.getContentScale();
    this._size = {
      height: options.height,
      width: options.width,
    };

    this._isFocused = false;
    this._isHovered = false;
    this._isMaximized = false;
    this._isMinimized = false;

    this._fnRegistries = this.createCallbacksRegistries();

    this.registerCallbacks();
  }

  protected getPosition(): Coordinate2D {
    const posVec = new Vector2();

    this.gl.glfwGetWindowPos({
      window: this.$address,
      xpos: posVec.xRef,
      ypos: posVec.yRef,
    });

    return {
      x: posVec.x,
      y: posVec.y,
    };
  }

  protected getMousePosition(): Coordinate2D {
    const posVec = new FVector2();

    this.gl.glfwGetCursorPos({
      window: this.$address,
      xpos: posVec.xRef,
      ypos: posVec.yRef,
    });

    return {
      x: posVec.x,
      y: posVec.y,
    };
  }

  protected getFrameBuffer(): FrameBufferSize {
    const sizeVec = new Vector2();

    this.gl.glfwGetFramebufferSize({
      window: this.$address,
      width: sizeVec.xRef,
      height: sizeVec.yRef,
    });

    return {
      width: sizeVec.x,
      height: sizeVec.y,
    };
  }

  protected getContentScale(): Coordinate2D {
    const scaleVec = new FVector2();

    this.gl.glfwGetWindowContentScale({
      window: this.$address,
      xscale: scaleVec.xRef,
      yscale: scaleVec.yRef,
    });

    return {
      x: scaleVec.x,
      y: scaleVec.y,
    };
  }

  protected createCallbacksRegistries(): CallbackRegistries {
    return {
      ...this.createWindowCallbackRegistries(),
      ...this.createInputCallbackRegistries(),
    };
  }

  protected createWindowCallbackRegistries(): WindowEventCallbackRegistries {
    return {
      [WindowEvent.PositionChange]: {
        callback: new TypedJSCallback(
          (_, x, y) => {
            this._position = { x, y };

            const registry = this._fnRegistries[WindowEvent.PositionChange];
            registry.fns.forEach((fn) => fn(this._position));
          },
          {
            args: [FFIType.ptr, FFIType.i32, FFIType.i32],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [WindowEvent.Resized]: {
        callback: new TypedJSCallback(
          (_, width, height) => {
            this._size = { width, height };

            const registry = this._fnRegistries[WindowEvent.Resized];
            registry.fns.forEach((fn) => fn(this._size));
          },
          {
            args: [FFIType.ptr, FFIType.i32, FFIType.i32],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [WindowEvent.Close]: {
        callback: new TypedJSCallback(
          () => {
            let shouldClose = true;

            const registry = this._fnRegistries[WindowEvent.Close];
            registry.fns.forEach((fn) => !fn() && (shouldClose = false));

            if (shouldClose) return;

            this.gl.glfwSetWindowShouldClose({
              window: this.$address,
              value: Number(shouldClose),
            });
          },
          {
            args: [FFIType.ptr],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [WindowEvent.Focus]: {
        callback: new TypedJSCallback(
          (_, focused) => {
            this._isFocused = Boolean(focused);

            const registry = this._fnRegistries[WindowEvent.Focus];
            registry.fns.forEach((fn) => fn(this._isFocused));
          },
          {
            args: [FFIType.ptr, FFIType.i32],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [WindowEvent.Minimized]: {
        callback: new TypedJSCallback(
          (_, minimized) => {
            this._isMinimized = Boolean(minimized);

            const registry = this._fnRegistries[WindowEvent.Minimized];
            registry.fns.forEach((fn) => fn(this._isMinimized));
          },
          {
            args: [FFIType.ptr, FFIType.i32],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [WindowEvent.Maximized]: {
        callback: new TypedJSCallback(
          (_, maximized) => {
            this._isMaximized = Boolean(maximized);

            const registry = this._fnRegistries[WindowEvent.Maximized];
            registry.fns.forEach((fn) => fn(this._isMaximized));
          },
          {
            args: [FFIType.ptr, FFIType.i32],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [WindowEvent.FrameBuffer]: {
        callback: new TypedJSCallback(
          (_, width, height) => {
            this._frameBuffer = { width, height };

            const registry = this._fnRegistries[WindowEvent.FrameBuffer];
            registry.fns.forEach((fn) => fn(this._frameBuffer));
          },
          {
            args: [FFIType.ptr, FFIType.i32, FFIType.i32],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [WindowEvent.Refresh]: {
        callback: new TypedJSCallback(
          () => {
            const registry = this._fnRegistries[WindowEvent.Refresh];
            registry.fns.forEach((fn) => fn());
          },
          {
            args: [FFIType.ptr],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [WindowEvent.Scaling]: {
        callback: new TypedJSCallback(
          (_, x, y) => {
            this._contentScale = { x, y };

            const registry = this._fnRegistries[WindowEvent.Scaling];
            registry.fns.forEach((fn) => fn(this._contentScale));
          },
          {
            args: [FFIType.ptr, FFIType.float, FFIType.float],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
    };
  }

  protected createInputCallbackRegistries(): InputEventCallbackRegistries {
    return {
      [InputEvent.Hover]: {
        callback: new TypedJSCallback(
          (_, hovered) => {
            this._isHovered = Boolean(hovered);

            const registry = this._fnRegistries[InputEvent.Hover];
            registry.fns.forEach((fn) => fn(this._isHovered));
          },
          {
            args: [FFIType.ptr, FFIType.i32],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [InputEvent.MousePress]: {
        callback: new TypedJSCallback(
          (_, button, action, mods) => {
            const registry = this._fnRegistries[InputEvent.MousePress];
            registry.fns.forEach((fn) => fn({ action, button, mods }));
          },
          {
            args: [FFIType.ptr, FFIType.i32, FFIType.i32, FFIType.i32],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [InputEvent.MouseScroll]: {
        callback: new TypedJSCallback(
          (_, x, y) => {
            const registry = this._fnRegistries[InputEvent.MouseScroll];
            registry.fns.forEach((fn) => fn({ x, y }));
          },
          {
            args: [FFIType.ptr, FFIType.double, FFIType.double],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [InputEvent.CursorPosition]: {
        callback: new TypedJSCallback(
          (_, x, y) => {
            this._mousePosition = { x, y };

            const registry = this._fnRegistries[InputEvent.CursorPosition];
            registry.fns.forEach((fn) => fn(this._mousePosition));
          },
          {
            args: [FFIType.ptr, FFIType.double, FFIType.double],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [InputEvent.Key]: {
        callback: new TypedJSCallback(
          (_, key, scancode, action, mods) => {
            const registry = this._fnRegistries[InputEvent.Key];
            registry.fns.forEach((fn) => fn({ key, scancode, action, mods }));
          },
          {
            args: [
              FFIType.ptr,
              FFIType.i32,
              FFIType.i32,
              FFIType.i32,
              FFIType.i32,
            ],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [InputEvent.Char]: {
        callback: new TypedJSCallback(
          (_, codepoint) => {
            const registry = this._fnRegistries[InputEvent.Char];
            registry.fns.forEach((fn) => fn(codepoint));
          },
          {
            args: [FFIType.ptr, FFIType.u32],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [InputEvent.Drop]: {
        callback: new TypedJSCallback(
          (_, count, pathPtr) => {
            const paths = CStruct.readArrayString(pathPtr, count);

            const registry = this._fnRegistries[InputEvent.Drop];
            registry.fns.forEach((fn) => fn(paths));
          },
          {
            args: [FFIType.ptr, FFIType.i32, FFIType.ptr],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
    };
  }

  protected registerCallbacks(): void {
    const registries = [
      // #region WindowEvent
      [WindowEvent.PositionChange, 'glfwSetWindowPosCallback'],
      [WindowEvent.Resized, 'glfwSetWindowSizeCallback'],
      [WindowEvent.Close, 'glfwSetWindowCloseCallback'],
      [WindowEvent.Focus, 'glfwSetWindowFocusCallback'],
      [WindowEvent.Minimized, 'glfwSetWindowIconifyCallback'],
      [WindowEvent.Maximized, 'glfwSetWindowMaximizeCallback'],
      [WindowEvent.FrameBuffer, 'glfwSetFramebufferSizeCallback'],
      [WindowEvent.Refresh, 'glfwSetWindowRefreshCallback'],
      [WindowEvent.Scaling, 'glfwSetWindowContentScaleCallback'],
      // #endregion WindowEvent

      // #region InputEvent
      [InputEvent.Hover, 'glfwSetCursorEnterCallback'],
      [InputEvent.MousePress, 'glfwSetMouseButtonCallback'],
      [InputEvent.MouseScroll, 'glfwSetScrollCallback'],
      [InputEvent.CursorPosition, 'glfwSetCursorPosCallback'],
      [InputEvent.Key, 'glfwSetKeyCallback'],
      [InputEvent.Char, 'glfwSetCharCallback'],
      [InputEvent.Drop, 'glfwSetDropCallback'],
      // #endregion InputEvent
    ] satisfies [WindowEvent | InputEvent, keyof GLFW][];

    registries.forEach(([event, method]) => {
      this.gl[method]({
        window: this.$address,
        callback: this._fnRegistries[event].callback,
      });
    });
  }

  public get size(): Resolution {
    return this._size;
  }

  public set size(value: Resolution) {
    this._size = value;

    this.gl.glfwSetWindowSize({
      window: this.$address,
      ...value,
    });
  }

  public get position(): Coordinate2D {
    return this._position;
  }

  public set position(value: Coordinate2D) {
    this._position = value;

    this.gl.glfwSetWindowPos({
      window: this.$address,
      xpos: value.x,
      ypos: value.y,
    });
  }

  public get mousePosition(): Coordinate2D {
    return this._mousePosition;
  }

  public set mousePosition(value: Coordinate2D) {
    this._mousePosition = value;

    this.gl.glfwSetCursorPos({
      window: this.$address,
      xpos: value.x,
      ypos: value.y,
    });
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;

    this.gl.glfwSetWindowTitle({
      window: this.$address,
      title: this._title,
    });
  }

  public get isFocused(): boolean {
    return this._isFocused;
  }

  public get isHovered(): boolean {
    return this._isHovered;
  }

  public get isMaximized(): boolean {
    return this._isMaximized;
  }

  public get isMinimized(): boolean {
    return this._isMinimized;
  }

  public get frameBuffer(): FrameBufferSize {
    return this._frameBuffer;
  }

  public get contentScale(): Coordinate2D {
    return this._contentScale;
  }

  public get identifier(): string {
    return this._identifier;
  }

  public close(): void {
    this.gl.glfwSetWindowShouldClose({
      window: this.$address,
      value: Number(true),
    });
  }

  public restore(): void {
    this.gl.glfwRestoreWindow({
      window: this.$address,
    });
  }

  public maximize(): void {
    this.gl.glfwMaximizeWindow({
      window: this.$address,
    });
  }

  public minimize(): void {
    this.gl.glfwIconifyWindow({
      window: this.$address,
    });
  }

  public on<
    T extends keyof WindowSubscriptionMap,
    U extends WindowSubscriptionMap[T],
  >(type: T, fn: U): void {
    this._fnRegistries[type].fns.add(fn as never);
  }

  public off<
    T extends keyof WindowSubscriptionMap,
    U extends WindowSubscriptionMap[T],
  >(type: T, fn: U): void {
    this._fnRegistries[type].fns.delete(fn as never);
  }
}
