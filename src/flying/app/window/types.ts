import type {
  GLFWcharfun,
  GLFWcursorenterfun,
  GLFWcursorposfun,
  GLFWdropfun,
  GLFWframebuffersizefun,
  GLFWkeyfun,
  GLFWmousebuttonfun,
  GLFWscrollfun,
  GLFWwindowclosefun,
  GLFWwindowcontentscalefun,
  GLFWwindowfocusfun,
  GLFWwindowiconifyfun,
  GLFWwindowmaximizefun,
  GLFWwindowposfun,
  GLFWwindowrefreshfun,
  GLFWwindowsizefun,
} from '@/glfw/types';
import type { TypedJSCallback } from '@/utility/callback';
import type { InputEvent, WindowEvent } from './constant';

export interface Position {
  x: number;
  y: number;
}

export interface WidthHeight {
  width: number;
  height: number;
}

export interface BaseInput {
  action: number;
  mods: number;
}

export interface MouseAction extends BaseInput {
  button: number;
}

export interface KeyAction extends BaseInput {
  key: number;
  scancode: number;
}

// #region WindowEvent
export interface OnWindowPosition {
  (position: Position): void;
}

export interface OnWindowResized {
  (size: WidthHeight): void;
}

export interface OnWindowClose {
  (): boolean;
}

export interface OnWindowFocus {
  (isFocus: boolean): void;
}

export interface OnWindowMinimize {
  (isMinimize: boolean): void;
}

export interface OnWindowMaximize {
  (isMaximize: boolean): void;
}

export interface OnWindowFrameBuffer {
  (size: WidthHeight): void;
}

export interface OnWindowRefresh {
  (): void;
}

export interface OnWindowScale {
  (scale: Position): void;
}
// #endregion WindowEvent

// #region InputEvent
export interface OnWindowHover {
  (isHovered: boolean): void;
}

export interface OnMouseButton {
  (value: MouseAction): void;
}

export interface OnMouseScroll {
  (offsets: Position): void;
}

export interface OnCursorPosition {
  (position: Position): void;
}

export interface OnKeyButton {
  (value: KeyAction): void;
}

export interface OnCharButton {
  (codepoint: number): void;
}

export interface OnDropFile {
  (paths: string[]): void;
}
// #endregion InputEvent

export type WindowCallback =
  // #region WindowEvent
  | OnWindowPosition
  | OnWindowResized
  | OnWindowClose
  | OnWindowFocus
  | OnWindowMinimize
  | OnWindowMaximize
  | OnWindowFrameBuffer
  | OnWindowRefresh
  | OnWindowScale
  // #endregion WindowEvent
  //
  // #region InputEvent
  | OnWindowHover
  | OnMouseButton
  | OnCursorPosition
  | OnMouseScroll
  | OnKeyButton
  | OnCharButton
  | OnDropFile;
// #endregion InputEvent

export type WindowEventCallbackRegistries = {
  [WindowEvent.Position]: {
    callback: TypedJSCallback<GLFWwindowposfun>;
    fns: Set<OnWindowPosition>;
  };
  [WindowEvent.Resize]: {
    callback: TypedJSCallback<GLFWwindowsizefun>;
    fns: Set<OnWindowResized>;
  };
  [WindowEvent.Close]: {
    callback: TypedJSCallback<GLFWwindowclosefun>;
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
  [WindowEvent.FrameBuffer]: {
    callback: TypedJSCallback<GLFWframebuffersizefun>;
    fns: Set<OnWindowFrameBuffer>;
  };
  [WindowEvent.Refresh]: {
    callback: TypedJSCallback<GLFWwindowrefreshfun>;
    fns: Set<OnWindowRefresh>;
  };
  [WindowEvent.Scaling]: {
    callback: TypedJSCallback<GLFWwindowcontentscalefun>;
    fns: Set<OnWindowScale>;
  };
};

export type InputEventCallbackRegistries = {
  [InputEvent.Hover]: {
    callback: TypedJSCallback<GLFWcursorenterfun>;
    fns: Set<OnWindowHover>;
  };
  [InputEvent.Mouse]: {
    callback: TypedJSCallback<GLFWmousebuttonfun>;
    fns: Set<OnMouseButton>;
  };
  [InputEvent.Scroll]: {
    callback: TypedJSCallback<GLFWscrollfun>;
    fns: Set<OnMouseScroll>;
  };
  [InputEvent.Cursor]: {
    callback: TypedJSCallback<GLFWcursorposfun>;
    fns: Set<OnCursorPosition>;
  };
  [InputEvent.Key]: {
    callback: TypedJSCallback<GLFWkeyfun>;
    fns: Set<OnKeyButton>;
  };
  [InputEvent.Char]: {
    callback: TypedJSCallback<GLFWcharfun>;
    fns: Set<OnCharButton>;
  };
  [InputEvent.Drop]: {
    callback: TypedJSCallback<GLFWdropfun>;
    fns: Set<OnDropFile>;
  };
};

export type CallbackRegistries = WindowEventCallbackRegistries &
  InputEventCallbackRegistries;

export type WindowSubscriptionMap = {
  [WindowEvent.Position]: OnWindowPosition;
  [WindowEvent.Resize]: OnWindowResized;
  [WindowEvent.Close]: OnWindowClose;
  [WindowEvent.Focus]: OnWindowFocus;
  [WindowEvent.Minimize]: OnWindowMinimize;
  [WindowEvent.Maximize]: OnWindowMaximize;
  [WindowEvent.FrameBuffer]: OnWindowFrameBuffer;
  [WindowEvent.Refresh]: OnWindowRefresh;
  [WindowEvent.Scaling]: OnWindowScale;
  [InputEvent.Hover]: OnWindowHover;
  [InputEvent.Mouse]: OnMouseButton;
  [InputEvent.Cursor]: OnCursorPosition;
  [InputEvent.Scroll]: OnMouseScroll;
  [InputEvent.Key]: OnKeyButton;
  [InputEvent.Char]: OnCharButton;
  [InputEvent.Drop]: OnDropFile;
};
