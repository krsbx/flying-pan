import type { Coordinate2D } from '@/flying/types';
import { clamp } from '@/utility/common';
import type { InputManager } from '@flying/app';
import { hitTest } from '@flying/interactions';
import type { LayoutNode } from '@flying/layout';
import { Overflow, type WidgetDescriptor } from '@flying/widget';
import { BaseDispatcher } from '../base';
import type { DispatchOptions } from '../types';

export class ScrollDispatcher extends BaseDispatcher {
  protected offsets: Map<WidgetDescriptor, Coordinate2D>;

  public constructor(input: InputManager | null) {
    super(input);
    this.offsets = new Map();
  }

  public dispatch(options: DispatchOptions): void {
    const { layout } = options;
    const input = options.input ?? this.input;

    this.assertInput(input);

    // 1. Drop orphan offsets (scrollable widgets that unmounted)
    if (this.offsets.size > 0) {
      for (const widget of this.offsets.keys()) {
        if (!this.findNodeForWidget(layout, widget)) {
          this.offsets.delete(widget);
        }
      }
    }

    const delta = input.scrollDelta;

    // 2. Nothing to do without scroll input this frame — offsets persist
    if (delta.x === 0 && delta.y === 0) return;

    // 3. Route scroll to the nearest scrollable ancestor of the hit target
    const position = input.mousePosition;
    const hit = hitTest({ node: layout, x: position.x, y: position.y });

    if (!hit) return;

    const target = this.nearestScrollableAncestor(layout, hit);

    if (!target) return;

    // 4. Clamp against content size (extent of direct children)
    const current = this.offset(target.widget);
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

    this.offsets.set(target.widget, { x: nextX, y: nextY });
  }

  public offset(widget: WidgetDescriptor): Coordinate2D {
    return this.offsets.get(widget) ?? { x: 0, y: 0 };
  }

  public reset(): void {
    this.offsets.clear();
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
