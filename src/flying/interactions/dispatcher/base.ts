import type { InputManager } from '@/flying/app';
import type { LayoutNode } from '@/flying/layout';
import type { WidgetDescriptor } from '@/flying/widget';
import type { DispatchOptions } from './types';

export abstract class BaseDispatcher {
  public input: InputManager | null;

  public constructor(input: InputManager | null) {
    this.input = input;
  }

  public abstract dispatch(options: DispatchOptions): void;

  public abstract reset(): void;

  protected findPath(
    node: LayoutNode,
    target: LayoutNode,
    path: LayoutNode[]
  ): boolean {
    path.push(node);

    if (node === target) return true;

    for (const child of node.children) {
      if (this.findPath(child, target, path)) return true;
    }

    // Pop the last node, so the -2 index is the nearest ancestor
    path.pop();

    return false;
  }

  protected findNodeForWidget(
    node: LayoutNode,
    widget: WidgetDescriptor
  ): LayoutNode | null {
    if (node.widget === widget) return node;

    for (const child of node.children) {
      const found = this.findNodeForWidget(child, widget);

      if (found) return found;
    }

    return null;
  }

  protected sameWidget(a: LayoutNode | null, b: LayoutNode | null): boolean {
    return a !== null && b !== null && a.widget === b.widget;
  }

  protected assertInput(input: InputManager | null): asserts input {
    if (input) return;

    throw new Error('InputManager is required');
  }
}
