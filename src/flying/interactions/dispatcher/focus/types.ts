import type { InputManager, Window } from '@/flying/app';
import type { LayoutNode } from '@/flying/layout';

export interface HandleTabOptions {
  window: Window;
  layout: LayoutNode;
  input: InputManager;
}

export interface HandleClickOptions {
  window: Window;
  layout: LayoutNode;
  input: InputManager;
}

export interface MoveFocusOptions {
  window: Window;
  layout: LayoutNode;
  target: LayoutNode;
}

export interface RouteKeysOptions {
  window: Window;
  node: LayoutNode;
  input: InputManager;
}

export interface ApplyPendingBlurFocusOptions {
  window: Window;
  layout: LayoutNode;
}
