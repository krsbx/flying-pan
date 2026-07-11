import type { AnimatableProperty, EasingName } from './constant';

export interface TransitionConfig {
  /** Which property to animate. Default: 'all' */
  property?: AnimatableProperty | 'all';
  /** Duration in milliseconds */
  duration: number;
  /** Easing curve name. Default: 'ease' */
  easing?: EasingName;
}

export type Transition = TransitionConfig | TransitionConfig[];

export interface ActiveTransition {
  from: string | number;
  to: string | number;
  startTime: number;
  duration: number;
  easing: EasingName;
}
