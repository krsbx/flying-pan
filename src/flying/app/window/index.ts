import type { GLFW } from '@/glfw';
import { TypedJSCallback } from '@/utility/callback';
import { CStruct } from '@/utility/cstruct';
import { FVector2, Vector2 } from '@/utility/vectors';
import { FFIType, type Pointer } from 'bun:ffi';
import type { Color } from '../../renderer/color';
import { InputEvent, WindowEvent } from './constant';
import type {
  CallbackRegistries,
  InputEventCallbackRegistries,
  Position,
  WidthHeight,
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
}

export class Window {
  public readonly gl: GLFW;
  public $address: Pointer | null;
  protected _size: WidthHeight;
  protected _position: Position;
  protected _mousePosition: Position;
  protected _title: string;
  protected _identifier: string;
  protected _fnRegistries: CallbackRegistries;
  public backgroundColor: string;

  protected _isFocused: boolean;
  protected _isHovered: boolean;
  protected _isMaximized: boolean;
  protected _isMinimized: boolean;
  protected _frameBuffer: WidthHeight;
  protected _contentScale: Position;

  public constructor(options: WindowOptions & { gl: GLFW }) {
    this.gl = options.gl;

    this.$address = this.gl.glfwCreateWindow({
      height: options.height,
      width: options.width,
      title: options.title,
      monitor: null,
      share: null,
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

  protected getPosition(): Position {
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

  protected getMousePosition(): Position {
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

  protected getFrameBuffer(): WidthHeight {
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

  protected getContentScale(): Position {
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
      [WindowEvent.Position]: {
        callback: new TypedJSCallback(
          (_, x, y) => {
            this._position = { x, y };

            const registry = this._fnRegistries[WindowEvent.Position];
            registry.fns.forEach((fn) => fn(this._position));
          },
          {
            args: [FFIType.ptr, FFIType.i32, FFIType.i32],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [WindowEvent.Resize]: {
        callback: new TypedJSCallback(
          (_, width, height) => {
            this._size = { width, height };

            const registry = this._fnRegistries[WindowEvent.Resize];
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
      [WindowEvent.Minimize]: {
        callback: new TypedJSCallback(
          (_, minimized) => {
            this._isMinimized = Boolean(minimized);

            const registry = this._fnRegistries[WindowEvent.Minimize];
            registry.fns.forEach((fn) => fn(this._isMinimized));
          },
          {
            args: [FFIType.ptr, FFIType.i32],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [WindowEvent.Maximize]: {
        callback: new TypedJSCallback(
          (_, maximized) => {
            this._isMaximized = Boolean(maximized);

            const registry = this._fnRegistries[WindowEvent.Maximize];
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
      [InputEvent.Mouse]: {
        callback: new TypedJSCallback(
          (_, button, action, mods) => {
            const registry = this._fnRegistries[InputEvent.Mouse];
            registry.fns.forEach((fn) =>
              fn({
                action,
                button,
                mods,
              })
            );
          },
          {
            args: [FFIType.ptr, FFIType.i32, FFIType.i32, FFIType.i32],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [InputEvent.Scroll]: {
        callback: new TypedJSCallback(
          (_, x, y) => {
            const registry = this._fnRegistries[InputEvent.Scroll];
            registry.fns.forEach((fn) => fn({ x, y }));
          },
          {
            args: [FFIType.ptr, FFIType.double, FFIType.double],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [InputEvent.Cursor]: {
        callback: new TypedJSCallback(
          (_, x, y) => {
            this._mousePosition = { x, y };

            const registry = this._fnRegistries[InputEvent.Cursor];
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

  protected registerCallbacks() {
    const registries = [
      // #region WindowEvent
      [WindowEvent.Position, 'glfwSetWindowPosCallback'],
      [WindowEvent.Resize, 'glfwSetWindowSizeCallback'],
      [WindowEvent.Close, 'glfwSetWindowCloseCallback'],
      [WindowEvent.Focus, 'glfwSetWindowFocusCallback'],
      [WindowEvent.Minimize, 'glfwSetWindowIconifyCallback'],
      [WindowEvent.Maximize, 'glfwSetWindowMaximizeCallback'],
      [WindowEvent.FrameBuffer, 'glfwSetFramebufferSizeCallback'],
      [WindowEvent.Refresh, 'glfwSetWindowRefreshCallback'],
      [WindowEvent.Scaling, 'glfwSetWindowContentScaleCallback'],
      // #endregion WindowEvent

      // #region InputEvent
      [InputEvent.Hover, 'glfwSetCursorEnterCallback'],
      [InputEvent.Mouse, 'glfwSetMouseButtonCallback'],
      [InputEvent.Scroll, 'glfwSetScrollCallback'],
      [InputEvent.Cursor, 'glfwSetCursorPosCallback'],
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

  public get size() {
    return this._size;
  }

  public set size(value: WidthHeight) {
    this._size = value;

    this.gl.glfwSetWindowSize({
      window: this.$address,
      ...value,
    });
  }

  public get position() {
    return this._position;
  }

  public set position(value: Position) {
    this._position = value;

    this.gl.glfwSetWindowPos({
      window: this.$address,
      xpos: value.x,
      ypos: value.y,
    });
  }

  public get mousePosition() {
    return this._mousePosition;
  }

  public set mousePosition(value: Position) {
    this._mousePosition = value;

    this.gl.glfwSetCursorPos({
      window: this.$address,
      xpos: value.x,
      ypos: value.y,
    });
  }

  public get title() {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;

    this.gl.glfwSetWindowTitle({
      window: this.$address,
      title: this._title,
    });
  }

  public get isFocused() {
    return this._isFocused;
  }

  public get isHovered() {
    return this._isHovered;
  }

  public get isMaximized() {
    return this._isMaximized;
  }

  public get isMinimized() {
    return this._isMinimized;
  }

  public get frameBuffer() {
    return this._frameBuffer;
  }

  public get contentScale() {
    return this._contentScale;
  }

  public maximize() {
    this.gl.glfwMaximizeWindow({
      window: this.$address,
    });
  }

  public minimize() {
    this.gl.glfwIconifyWindow({
      window: this.$address,
    });
  }

  public on<
    T extends keyof WindowSubscriptionMap,
    U extends WindowSubscriptionMap[T],
  >(type: T, fn: U) {
    this._fnRegistries[type].fns.add(fn as never);
  }

  public off<
    T extends keyof WindowSubscriptionMap,
    U extends WindowSubscriptionMap[T],
  >(type: T, fn: U) {
    this._fnRegistries[type].fns.delete(fn as never);
  }
}
