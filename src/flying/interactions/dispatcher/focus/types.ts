import type { InputManager } from '@/flying/app';
import type { LayoutNode } from '@/flying/layout';
import type { DispatchOptions } from '../types';

export interface HandleTabOptions extends DispatchOptions {
  input: InputManager;
}

export interface HandleClickOptions extends DispatchOptions {
  input: InputManager;
}

export interface MoveFocusOptions extends DispatchOptions {
  target: LayoutNode;
}

export interface RouteKeysOptions extends Omit<DispatchOptions, 'layout'> {
  node: LayoutNode;
  input: InputManager;
}
