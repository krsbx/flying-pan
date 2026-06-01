export const MonitorEvent = {
  Connected: 'connected',
  Disconnected: 'disconnected',
} as const;

export type MonitorEvent = (typeof MonitorEvent)[keyof typeof MonitorEvent];
