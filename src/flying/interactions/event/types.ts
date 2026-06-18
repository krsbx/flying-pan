import type { Window } from '../../app';
import type { LayoutNode } from '../../layout';
import type { Coordinate2D } from '../../types';

/**
 * Base shape for every interaction event. Carries the hit-tested layout node
 * and the window the event originated from.
 */
export interface InteractionEvent {
  window: Window;
  node: LayoutNode;
}

// #region Pointer

/**
 * Fired on pointer down, up, move, enter, and leave.
 * `button` is set on down/up, omitted on enter/leave/move.
 */
export interface PointerEvent extends InteractionEvent {
  position: Coordinate2D;
  button?: number;
  modifiers: number;
}

/**
 * Fired when pointer down + up complete on the same widget (a click gesture).
 */
export interface ClickEvent extends InteractionEvent {
  position: Coordinate2D;
  button: number;
  modifiers: number;
  /** 1 = single click, 2 = double click, etc. */
  count: number;
}

// #endregion

// #region Keyboard

/**
 * Fired on key down and key up. `repeat` is true for auto-repeat while held.
 */
export interface KeyEvent extends InteractionEvent {
  key: number;
  scancode: number;
  modifiers: number;
  repeat: boolean;
}

// #endregion

// #region Focus

/**
 * Fired on focus gain (onFocus) and focus loss (onBlur).
 * `relatedTarget` is the previously focused node (on focus) or the
 * newly focused node (on blur), if any.
 */
export interface FocusEvent extends InteractionEvent {
  relatedTarget?: LayoutNode;
}

// #endregion

// #region Handlers

export interface PointerEventHandler {
  (event: PointerEvent): void;
}

export interface ClickEventHandler {
  (event: ClickEvent): void;
}

export interface KeyEventHandler {
  (event: KeyEvent): void;
}

export interface FocusEventHandler {
  (event: FocusEvent): void;
}

// #endregion

// #region Interaction props (for widget factories)

/**
 * Spread onto widget factory props so every widget can declare
 * pointer/click handlers that land on the `WidgetDescriptor`.
 */
export interface InteractionProps {
  onPointerDown?: PointerEventHandler;
  onPointerUp?: PointerEventHandler;
  onPointerMove?: PointerEventHandler;
  onClick?: ClickEventHandler;
  onPointerEnter?: PointerEventHandler;
  onPointerLeave?: PointerEventHandler;
}

// #endregion
