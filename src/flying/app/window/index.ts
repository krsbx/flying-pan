import type { GLFW } from '@/glfw';
import { TypedJSCallback } from '@/utility/callback';
import { Vector2 } from '@/utility/vectors';
import { FFIType, type Pointer } from 'bun:ffi';
import type { Color } from '../../renderer/color';
import { WindowEvent } from './constant';
import type {
  CallbackRegistries,
  OnCursorPosition,
  OnWindowClose,
  OnWindowFocus,
  OnWindowHover,
  OnWindowMaximize,
  OnWindowMinimize,
  OnWindowPosition,
  OnWindowResized,
  Position,
  WidthHeight,
  WindowCallback,
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

  public constructor(options: WindowOptions & { gl: GLFW }) {
    this.gl = options.gl;

    this.$address = this.gl.glfwCreateWindow({
      height: options.height,
      width: options.width,
      title: options.title,
      monitor: null,
      share: null,
    });
    this._title = options.title;
    this._identifier = options.identifier || options.title;
    this.backgroundColor = options.backgroundColor || '#1a1a2e';
    this._position = this.getPosition();
    this._mousePosition = this.getMousePosition();
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
    const posVec = new Vector2();

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

  protected createCallbacksRegistries(): CallbackRegistries {
    if (!this.$address) {
      throw new Error('Failed to initialize window!');
    }

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
            registry.fns.forEach((fn) => (shouldClose = fn()));

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
      [WindowEvent.Hover]: {
        callback: new TypedJSCallback(
          (_, hovered) => {
            this._isHovered = Boolean(hovered);

            const registry = this._fnRegistries[WindowEvent.Hover];
            registry.fns.forEach((fn) => fn(this._isHovered));
          },
          {
            args: [FFIType.ptr, FFIType.i32],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
      [WindowEvent.Cursor]: {
        callback: new TypedJSCallback(
          (_, x, y) => {
            this._mousePosition = { x, y };

            const registry = this._fnRegistries[WindowEvent.Cursor];
            registry.fns.forEach((fn) => fn(this._mousePosition));
          },
          {
            args: [FFIType.ptr, FFIType.i32, FFIType.i32],
            returns: FFIType.ptr,
          }
        ),
        fns: new Set(),
      },
    };
  }

  protected registerCallbacks() {
    this.gl.glfwSetWindowPosCallback({
      window: this.$address,
      callback: this._fnRegistries[WindowEvent.Position].callback,
    });

    this.gl.glfwSetWindowSizeCallback({
      window: this.$address,
      callback: this._fnRegistries[WindowEvent.Resize].callback,
    });

    this.gl.glfwSetWindowCloseCallback({
      window: this.$address,
      callback: this._fnRegistries[WindowEvent.Close].callback,
    });

    this.gl.glfwSetWindowFocusCallback({
      window: this.$address,
      callback: this._fnRegistries[WindowEvent.Focus].callback,
    });

    this.gl.glfwSetWindowIconifyCallback({
      window: this.$address,
      callback: this._fnRegistries[WindowEvent.Minimize].callback,
    });

    this.gl.glfwSetWindowMaximizeCallback({
      window: this.$address,
      callback: this._fnRegistries[WindowEvent.Maximize].callback,
    });

    this.gl.glfwSetCursorEnterCallback({
      window: this.$address,
      callback: this._fnRegistries[WindowEvent.Hover].callback,
    });

    this.gl.glfwSetCursorPosCallback({
      window: this.$address,
      callback: this._fnRegistries[WindowEvent.Cursor].callback,
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

  public on(type: typeof WindowEvent.Position, fn: OnWindowPosition): void;
  public on(type: typeof WindowEvent.Resize, fn: OnWindowResized): void;
  public on(type: typeof WindowEvent.Close, fn: OnWindowClose): void;
  public on(type: typeof WindowEvent.Minimize, fn: OnWindowMinimize): void;
  public on(type: typeof WindowEvent.Maximize, fn: OnWindowMaximize): void;
  public on(type: typeof WindowEvent.Focus, fn: OnWindowFocus): void;
  public on(type: typeof WindowEvent.Hover, fn: OnWindowHover): void;
  public on(type: typeof WindowEvent.Cursor, fn: OnCursorPosition): void;
  public on(type: WindowEvent, fn: WindowCallback) {
    this._fnRegistries[type].fns.add(fn as never);
  }
}
