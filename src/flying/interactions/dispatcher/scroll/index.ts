import { hitTest } from '@flying/interactions';
import type { LayoutNode } from '@flying/layout';
import type { Coordinate2D } from '@flying/types';
import { Overflow } from '@flying/widget';
import { clamp } from '@utility/common';
import { BaseDispatcher } from '../base';
import type { DispatcherConfig, DispatchOptions } from '../types';

const VELOCITY_ALPHA = 0.35;
const FRICTION = 0.97;
const VELOCITY_THRESHOLD = 0.3;
const FRAME_MS = 1000 / 60;

export class ScrollDispatcher extends BaseDispatcher {
  protected offsets: Map<number, Coordinate2D>;
  protected velocities: Map<number, Coordinate2D>;
  protected lastTime: number;

  public constructor(options: DispatcherConfig) {
    super(options);
    this.offsets = new Map();
    this.velocities = new Map();
    this.lastTime = 0;
  }

  public dispatch(options: DispatchOptions): void {
    const { layout, layoutIndex, treeChanged, time } = options;
    const input = this.input;

    // 1. Compute framerate-normalized delta time
    const dt = this.lastTime > 0 ? time - this.lastTime : FRAME_MS;
    this.lastTime = time;
    const dtNorm = clamp({ value: dt / FRAME_MS, min: 0, max: 4 });

    // 2. Drop orphan offsets + velocities (scrollable widgets that unmounted)
    if (treeChanged && this.offsets.size > 0) {
      for (const stableId of this.offsets.keys()) {
        if (!layoutIndex.has(stableId)) {
          this.offsets.delete(stableId);
          this.velocities.delete(stableId);
        }
      }
    }

    const delta = input.scrollDelta;
    const hasInput = delta.x !== 0 || delta.y !== 0;

    if (hasInput) {
      this.handleActiveScroll(layout, delta);
    } else {
      this.coast(layoutIndex, dtNorm);
    }
  }

  protected handleActiveScroll(layout: LayoutNode, delta: Coordinate2D): void {
    const input = this.input;
    const position = input.mousePosition;
    const hit = hitTest({ node: layout, x: position.x, y: position.y });

    if (!hit) return;

    const target = this.nearestScrollableAncestor(layout, hit);

    if (!target) return;

    const current = this.offset(target);
    const { contentWidth, contentHeight } = this.measureContent(target);

    const maxScrollX = Math.max(0, contentWidth - target.width);
    const maxScrollY = Math.max(0, contentHeight - target.height);

    // GLFW: positive y = scroll up; browsers: positive = down. Negate y so
    // wheel-down (GLFW negative) grows the offset — matches browser feel.
    const nextX = clamp({
      value: current.x + delta.x,
      min: 0,
      max: maxScrollX,
    });
    const nextY = clamp({
      value: current.y - delta.y,
      min: 0,
      max: maxScrollY,
    });

    this.offsets.set(target.stableId, { x: nextX, y: nextY });

    // Track velocity via EMA (y negated to offset-space)
    const vel = this.velocities.get(target.stableId) ?? { x: 0, y: 0 };
    const alpha = VELOCITY_ALPHA;

    vel.x = vel.x * (1 - alpha) + delta.x * alpha;
    vel.y = vel.y * (1 - alpha) + -delta.y * alpha;

    // Zero velocity on clamped axis — hit the edge while scrolling
    if (nextX === current.x) vel.x = 0;
    if (nextY === current.y) vel.y = 0;

    this.velocities.set(target.stableId, vel);
  }

  protected coast(layoutIndex: Map<number, LayoutNode>, dtNorm: number): void {
    if (this.velocities.size === 0) return;

    const friction = Math.pow(FRICTION, dtNorm);

    for (const [stableId, vel] of this.velocities) {
      const target = layoutIndex.get(stableId);

      if (!target) {
        this.velocities.delete(stableId);
        continue;
      }

      const current = this.offsets.get(stableId) ?? { x: 0, y: 0 };
      const { contentWidth, contentHeight } = this.measureContent(target);

      const maxScrollX = Math.max(0, contentWidth - target.width);
      const maxScrollY = Math.max(0, contentHeight - target.height);

      const nextX = clamp({
        value: current.x + vel.x * dtNorm,
        min: 0,
        max: maxScrollX,
      });
      const nextY = clamp({
        value: current.y + vel.y * dtNorm,
        min: 0,
        max: maxScrollY,
      });

      this.offsets.set(stableId, { x: nextX, y: nextY });

      // Zero velocity on clamped axis
      if (nextX <= 0 || nextX >= maxScrollX) vel.x = 0;
      if (nextY <= 0 || nextY >= maxScrollY) vel.y = 0;

      // Decay
      vel.x *= friction;
      vel.y *= friction;

      // Stop when both axes below threshold
      if (
        Math.abs(vel.x) < VELOCITY_THRESHOLD &&
        Math.abs(vel.y) < VELOCITY_THRESHOLD
      ) {
        this.velocities.delete(stableId);
      }
    }
  }

  public offset(node: LayoutNode): Coordinate2D {
    return this.offsets.get(node.stableId) ?? { x: 0, y: 0 };
  }

  public reset(): void {
    this.offsets.clear();
    this.velocities.clear();
  }

  protected measureContent(node: LayoutNode): {
    contentWidth: number;
    contentHeight: number;
  } {
    let maxX = node.x;
    let maxY = node.y;

    for (const child of node.children) {
      maxX = Math.max(maxX, child.x + child.width);
      maxY = Math.max(maxY, child.y + child.height);
    }

    return {
      contentWidth: Math.max(0, maxX - node.x),
      contentHeight: Math.max(0, maxY - node.y),
    };
  }

  protected isScrollable(node: LayoutNode): boolean {
    const overflow = node.widget.style?.overflow;
    return overflow === Overflow.Scroll || overflow === Overflow.Auto;
  }

  protected nearestScrollableAncestor(
    root: LayoutNode,
    target: LayoutNode
  ): LayoutNode | null {
    const path: LayoutNode[] = [];

    if (!this.findPath(root, target, path)) return null;

    for (let i = path.length - 1; i >= 0; i--) {
      const node = path[i];

      if (node && this.isScrollable(node)) return node;
    }

    return null;
  }
}
