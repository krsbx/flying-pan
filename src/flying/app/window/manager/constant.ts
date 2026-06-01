export const WindowManagerEvent = {
  Created: 'created',
  Destroyed: 'destroyed',
  ActiveChanged: 'active_changed',
} as const;

export type WindowManagerEvent =
  (typeof WindowManagerEvent)[keyof typeof WindowManagerEvent];
