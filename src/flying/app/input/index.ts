import type { Coordinate2D } from '@flying/types';
import {
  GLFW_MOD_ALT,
  GLFW_MOD_CONTROL,
  GLFW_MOD_SHIFT,
  GLFW_PRESS,
  GLFW_REPEAT,
} from '@glfw/enums';
import type { Window } from '../window';
import { InputEvent } from '../window/window/constant';
import type { KeyAction, MouseAction } from '../window/window/types';
import { InputState } from './state';
import type { WindowCallbackMap } from './types';

export class InputManager {
  public readonly events = [
    InputEvent.Key,
    InputEvent.MousePress,
    InputEvent.CursorPosition,
    InputEvent.MouseScroll,
  ] satisfies InputEvent[];
  protected _current: InputState;
  protected _previous: InputState;
  protected _registered: Set<Window>;
  protected _bindings: Map<Window, WindowCallbackMap>;

  public constructor() {
    this._current = new InputState();
    this._previous = new InputState();
    this._registered = new Set();
    this._bindings = new Map();
  }

  protected onKey = ({ key, action, mods }: KeyAction): void => {
    this._current.modifiers = mods;

    if (action === GLFW_PRESS) {
      this._current.keys.add(key);
    } else if (action === GLFW_REPEAT) {
      this._current.keys.add(key);
      this._current.repeatedKeys.add(key);
    } else {
      this._current.keys.delete(key);
    }
  };

  protected onMousePress = ({ action, button, mods }: MouseAction): void => {
    this._current.modifiers = mods;

    if (action === GLFW_PRESS) {
      this._current.mouseButtons.add(button);
    } else {
      this._current.mouseButtons.delete(button);
    }
  };

  protected onCursorPosition = (position: Coordinate2D): void => {
    this._current.mousePosition = position;
  };

  protected onMouseScroll = (delta: Coordinate2D): void => {
    this._current.scrollDelta.x += delta.x;
    this._current.scrollDelta.y += delta.y;
  };

  public update(): void {
    this._previous.keys = new Set(this._current.keys);
    this._previous.repeatedKeys = new Set(this._current.repeatedKeys);
    this._previous.mouseButtons = new Set(this._current.mouseButtons);
    this._previous.mousePosition = { ...this._current.mousePosition };
    this._previous.modifiers = this._current.modifiers;
    this._previous.scrollDelta = { ...this._current.scrollDelta };

    this._current.scrollDelta = { x: 0, y: 0 };
    this._current.repeatedKeys = new Set();
  }

  protected createBindings(): WindowCallbackMap {
    return {
      [InputEvent.Key]: this.onKey,
      [InputEvent.MousePress]: this.onMousePress,
      [InputEvent.CursorPosition]: this.onCursorPosition,
      [InputEvent.MouseScroll]: this.onMouseScroll,
    };
  }

  public register(window: Window): void {
    if (this._registered.has(window)) return;

    const bindings = this.createBindings();

    this.events.forEach((event) => window.on(event, bindings[event]));

    this._registered.add(window);
    this._bindings.set(window, bindings);
  }

  public unregister(window: Window): void {
    if (!this._registered.has(window)) return;

    const bindings = this._bindings.get(window);

    if (bindings) {
      this.events.forEach((event) => window.off(event, bindings[event]));
    }

    this._registered.delete(window);
    this._bindings.delete(window);
  }

  public isKeyDown(key: number): boolean {
    return this._current.keys.has(key);
  }

  public isKeyPressed(key: number): boolean {
    return this._current.keys.has(key) && !this._previous.keys.has(key);
  }

  public isKeyReleased(key: number): boolean {
    return !this._current.keys.has(key) && this._previous.keys.has(key);
  }

  public isKeyRepeated(key: number): boolean {
    return this._current.repeatedKeys.has(key);
  }

  public isMouseDown(button: number): boolean {
    return this._current.mouseButtons.has(button);
  }

  public isButtonPressed(button: number): boolean {
    return (
      this._current.mouseButtons.has(button) &&
      !this._previous.mouseButtons.has(button)
    );
  }

  public isButtonReleased(button: number): boolean {
    return (
      !this._current.mouseButtons.has(button) &&
      this._previous.mouseButtons.has(button)
    );
  }

  public get mousePosition(): Coordinate2D {
    return this._current.mousePosition;
  }

  public get scrollDelta(): Coordinate2D {
    return this._current.scrollDelta;
  }

  public get isShiftDown(): boolean {
    return !!(this._current.modifiers & GLFW_MOD_SHIFT);
  }

  public get isControlDown(): boolean {
    return !!(this._current.modifiers & GLFW_MOD_CONTROL);
  }

  public get isAltDown(): boolean {
    return !!(this._current.modifiers & GLFW_MOD_ALT);
  }

  public get current(): InputState {
    return this._current;
  }

  public get previous(): InputState {
    return this._previous;
  }
}
