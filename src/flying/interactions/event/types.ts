import type { FontManager, InputManager, Window } from '@flying/app';
import type { LayoutNode } from '@flying/layout';
import type { Key } from '@flying/reconcile';
import type { StateStore } from '@flying/state';
import type { Coordinate2D } from '@flying/types';
import type { WidgetDescriptor } from '@flying/widget';
import type { GLFW } from '@glfw';

export interface EventContext {
  fontManager: FontManager;
  gl: GLFW;
}

export interface InteractionEvent {
  window: Window;
  node: LayoutNode;
  stateStore: StateStore;
  /** Font manager etc. — populated by dispatchers. */
  ctx: EventContext;
  /** Current input state (mouse buttons, keys, modifiers) — populated by dispatchers. */
  input: InputManager;
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

export interface CharEvent extends InteractionEvent {
  codepoint: number;
}

// #endregion

// #region Focus

/**
 * Fired on focus gain (onFocus) and focus loss (onBlur).
 * `relatedTarget` is the previously focused node (on focus) or the
 * newly focused node (on blur), if any.
 */
export interface FocusEvent extends InteractionEvent {
  relatedTarget?: LayoutNode | null;
}

// #endregion

// #region Lifecycle

/**
 * Fired on mount (widget enters the tree) and unmount (widget leaves).
 * Reconciler fires these during the reconcile pass, before layout —
 * there is no LayoutNode yet. Carries widget + stableId only.
 */
export interface LifecycleEvent {
  window: Window;
  widget: WidgetDescriptor;
  stableId: number;
}

/**
 * Fired on update (matched pair where the descriptor reference changed).
 * Under rebuild-per-frame usage this fires every frame on every matched
 * pair — spurious but harmless. Optimization deferred.
 */
export interface UpdateEvent extends LifecycleEvent {
  prev: WidgetDescriptor;
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

export interface CharEventHandler {
  (event: CharEvent): void;
}

export interface FocusEventHandler {
  (event: FocusEvent): void;
}

export interface LifecycleEventHandler {
  (event: LifecycleEvent): void;
}

export interface UpdateEventHandler {
  (event: UpdateEvent): void;
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
  onKeyDown?: KeyEventHandler;
  onKeyUp?: KeyEventHandler;
  onChar?: CharEventHandler;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;

  key?: Key;
  onMount?: LifecycleEventHandler;
  onUnmount?: LifecycleEventHandler;
  onUpdate?: UpdateEventHandler;
}

// #endregion
