import type {
  GLFWcursorenterfun,
  GLFWcursorposfun,
  GLFWwindowfocusfun,
  GLFWwindowiconifyfun,
  GLFWwindowmaximizefun,
  GLFWwindowposfun,
  GLFWwindowsizefun,
} from '@/glfw/types';
import type { TypedJSCallback } from '@/utility/callback';
import type { WindowEvent } from './constant';

export interface Position {
  x: number;
  y: number;
}

export interface WidthHeight {
  width: number;
  height: number;
}

export interface OnWindowPosition {
  (value: Position): void;
}

export interface OnWindowResized {
  (value: WidthHeight): void;
}

export interface OnWindowClose {
  (): boolean;
}

export interface OnWindowFocus {
  (value: boolean): void;
}

export interface OnWindowMinimize {
  (value: boolean): void;
}

export interface OnWindowMaximize {
  (value: boolean): void;
}

export interface OnWindowHover {
  (value: boolean): void;
}

export interface OnCursorPosition {
  (value: Position): void;
}

export type WindowCallback =
  | OnWindowPosition
  | OnWindowResized
  | OnWindowFocus
  | OnWindowMinimize
  | OnWindowMaximize
  | OnWindowHover
  | OnCursorPosition;

export type CallbackRegistries = {
  [WindowEvent.Position]: {
    callback: TypedJSCallback<GLFWwindowposfun>;
    fns: Set<OnWindowPosition>;
  };
  [WindowEvent.Resize]: {
    callback: TypedJSCallback<GLFWwindowsizefun>;
    fns: Set<OnWindowResized>;
  };
  [WindowEvent.Close]: {
    callback: TypedJSCallback<GLFWwindowsizefun>;
    fns: Set<OnWindowClose>;
  };
  [WindowEvent.Focus]: {
    callback: TypedJSCallback<GLFWwindowfocusfun>;
    fns: Set<OnWindowFocus>;
  };
  [WindowEvent.Minimize]: {
    callback: TypedJSCallback<GLFWwindowiconifyfun>;
    fns: Set<OnWindowMinimize>;
  };
  [WindowEvent.Maximize]: {
    callback: TypedJSCallback<GLFWwindowmaximizefun>;
    fns: Set<OnWindowMaximize>;
  };
  [WindowEvent.Hover]: {
    callback: TypedJSCallback<GLFWcursorenterfun>;
    fns: Set<OnWindowHover>;
  };
  [WindowEvent.Cursor]: {
    callback: TypedJSCallback<GLFWcursorposfun>;
    fns: Set<OnCursorPosition>;
  };
};
