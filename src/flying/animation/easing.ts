import { EasingName } from './constant';

export const easings: Record<EasingName, (t: number) => number> = {
  [EasingName.Linear]: (t) => t,
  [EasingName.Ease]: (t) => 1 - Math.pow(1 - t, 3),
  [EasingName.EaseIn]: (t) => t * t * t,
  [EasingName.EaseOut]: (t) => 1 - (1 - t) * (1 - t),
  [EasingName.EaseInOut]: (t) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
};
