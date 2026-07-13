import type { ViewStyle } from '@flying/widget';
import { AnimatableProperty, EasingName } from '../constant';
import { easings } from '../easing';
import { interpolate } from '../interpolate';
import type { ActiveTransition, Transition, TransitionConfig } from '../types';

const ALL_ANIMATABLE = Object.values(AnimatableProperty);

export class AnimationManager {
  /** key → property → ActiveTransition. Key = `${stableId}` or `${stableId}:${subKey}` */
  protected active: Map<string, Map<string, ActiveTransition>>;
  /** key → property → last displayed value (for change detection + first-snap) */
  protected lastValue: Map<string, Map<string, string | number>>;
  protected _time: number;

  public constructor() {
    this.active = new Map();
    this.lastValue = new Map();
    this._time = 0;
  }

  public tick(): void {
    this._time = performance.now();
    this.cull();
  }

  public get time(): number {
    return this._time;
  }

  public applyOverlay(
    stableId: number,
    resolved: ViewStyle,
    transition: Transition,
    subKey?: string
  ): ViewStyle {
    const key = subKey !== undefined ? `${stableId}:${subKey}` : `${stableId}`;
    const configs = Array.isArray(transition) ? transition : [transition];
    const now = this._time;

    let overlay = resolved;
    let dirty = false;

    for (const config of configs) {
      const props = this.resolveProps(config, resolved);

      for (const prop of props) {
        const target = resolved[prop as keyof ViewStyle] as
          | string
          | number
          | undefined;
        if (target === undefined) continue;

        let lvMap = this.lastValue.get(key);
        let aMap = this.active.get(key);

        if (!lvMap) {
          lvMap = new Map();
          this.lastValue.set(key, lvMap);
        }

        if (!aMap) {
          aMap = new Map();
          this.active.set(key, aMap);
        }

        const prev = lvMap.get(prop);

        // First time seeing this property — snap, no transition
        if (prev === undefined) {
          lvMap.set(prop, target);
          continue;
        }

        // No change — clean up any completed transition, nothing to override
        if (prev === target) {
          aMap.delete(prop);
          continue;
        }

        // Target changed — start or retarget transition
        let active = aMap.get(prop);

        if (!active || active.to !== target) {
          // Retarget from current displayed value
          const fromVal = active ? this.sampleAt(active, now) : prev;

          active = {
            from: fromVal,
            to: target,
            startTime: now,
            duration: config.duration,
            easing: config.easing ?? EasingName.Ease,
          };

          aMap.set(prop, active);
        }

        // Sample the transition at current time
        const value = this.sampleAt(active, now);
        lvMap.set(prop, value);

        // Cull if complete
        if ((now - active.startTime) / Math.max(1, active.duration) >= 1) {
          aMap.delete(prop);
        }

        // Override the resolved style if still in flight
        if (value !== target) {
          if (!dirty) {
            overlay = { ...resolved };
            dirty = true;
          }

          (overlay as Record<string, unknown>)[prop] = value;
        }
      }
    }

    return overlay;
  }

  public destroy(stableId: number): void {
    const prefix = `${stableId}`;
    const prefixColon = `${stableId}:`;

    for (const key of this.lastValue.keys()) {
      if (key === prefix || key.startsWith(prefixColon)) {
        this.lastValue.delete(key);
        this.active.delete(key);
      }
    }
  }

  protected resolveProps(
    config: TransitionConfig,
    resolved: ViewStyle
  ): AnimatableProperty[] {
    const prop = config.property ?? 'all';

    if (prop === 'all') {
      return ALL_ANIMATABLE.filter(
        (p) => resolved[p as keyof ViewStyle] !== undefined
      );
    }

    return [prop];
  }

  protected sampleAt(t: ActiveTransition, now: number): string | number {
    const raw = Math.min(
      1,
      Math.max(0, (now - t.startTime) / Math.max(1, t.duration))
    );

    const easingFn = easings[t.easing] ?? easings[EasingName.Ease];

    return interpolate(t.from, t.to, easingFn(raw));
  }

  protected cull(): void {
    // Safety cap — clear everything if too many orphaned entries
    if (this.active.size > 1000) {
      this.active.clear();
      this.lastValue.clear();
      return;
    }

    const now = this._time;

    for (const [, propMap] of this.active) {
      for (const [prop, t] of propMap) {
        if ((now - t.startTime) / Math.max(1, t.duration) >= 1) {
          propMap.delete(prop);
        }
      }
    }
  }
}
