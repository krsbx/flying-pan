import type { GLFWmonitorfun } from '@/glfw/types';
import type { TypedJSCallback } from '@/utility/callback';
import type { Monitor } from '../monitor';
import type { MonitorEvent } from './constant';

export interface OnMonitorConnected {
  (monitor: Monitor): void;
}

export interface OnMonitorDisconnected {
  (monitor: Monitor): void;
}

export interface MonitorEventCallbackRegistries {
  [MonitorEvent.Connected]: Set<OnMonitorConnected>;
  [MonitorEvent.Disconnected]: Set<OnMonitorDisconnected>;
  callback: TypedJSCallback<GLFWmonitorfun>;
}

export type MonitorManagerSubscriptionMap = {
  [MonitorEvent.Connected]: OnMonitorConnected;
  [MonitorEvent.Disconnected]: OnMonitorDisconnected;
};
