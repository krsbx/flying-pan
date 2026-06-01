import type { Window } from '../window';
import type { WindowManagerEvent } from './constant';

export interface OnWindowCreated {
  (window: Window): void;
}

export interface OnWindowDestroyed {
  (window: Window): void;
}

export interface OnActiveWindowChanged {
  (from: Window | null, to: Window): void;
}

export interface WindowManagerCallbackRegistries {
  [WindowManagerEvent.Created]: Set<OnWindowCreated>;
  [WindowManagerEvent.Destroyed]: Set<OnWindowDestroyed>;
  [WindowManagerEvent.ActiveChanged]: Set<OnActiveWindowChanged>;
}

export interface WindowManagerCallbackRegistries {
  [WindowManagerEvent.Created]: Set<OnWindowCreated>;
  [WindowManagerEvent.Destroyed]: Set<OnWindowDestroyed>;
  [WindowManagerEvent.ActiveChanged]: Set<OnActiveWindowChanged>;
}

export type WindowManagerSubscriptionMap = {
  [WindowManagerEvent.Created]: OnWindowCreated;
  [WindowManagerEvent.Destroyed]: OnWindowDestroyed;
  [WindowManagerEvent.ActiveChanged]: OnActiveWindowChanged;
};
