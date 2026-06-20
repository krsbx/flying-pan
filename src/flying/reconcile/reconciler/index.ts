import type { StateStore } from '@/flying/state';
import type { WidgetDescriptor } from '@/flying/widget';
import type { ReconciledNode } from '../types.ts';
import type {
  GetStableId,
  ReconcileNodeOptions,
  UnmountNodeOptions,
} from './types';
import type { ReconcileOptions } from './types.ts';

export class Reconciler implements GetStableId {
  protected readonly stateStore: StateStore;
  protected prevTree: ReconciledNode | null;
  protected nextId; // 0 reserved for "not reconciled"
  protected stableIdByWidget: Map<WidgetDescriptor, number>;

  public constructor(stateStore: StateStore) {
    this.stateStore = stateStore;
    this.prevTree = null;
    this.nextId = 1;
    this.stableIdByWidget = new Map();
  }

  public reconcile(options: ReconcileOptions): ReconciledNode {
    const { window, next } = options;

    this.stableIdByWidget = new Map();

    const result = this.reconcileNode({
      prev: this.prevTree,
      next,
      window,
    });

    this.prevTree = result;

    return result;
  }

  public reset(): void {
    this.prevTree = null;
    this.nextId = 1;

    this.stableIdByWidget = new Map();
  }

  public getStableId = (widget: WidgetDescriptor): number => {
    return this.stableIdByWidget.get(widget) ?? 0;
  };

  protected reconcileNode(options: ReconcileNodeOptions): ReconciledNode {
    const { prev, next, window } = options;

    let stableId: number;

    if (prev && prev.widget.type === next.type) {
      stableId = prev.stableId;

      if (prev.widget !== next) {
        next.onUpdate?.({
          window,
          widget: next,
          stableId,
          prev: prev.widget,
        });
      }
    } else {
      // Type mismatch or new position — mount.
      // If prev existed, unmount immediately.
      if (prev) {
        this.unmountNode({ node: prev, window });
      }

      stableId = this.nextId++;

      next.onMount?.({
        window,
        widget: next,
        stableId,
      });
    }

    this.stableIdByWidget.set(next, stableId);

    const prevChildren = prev?.children ?? [];
    const nextChildren = next.children ?? [];
    const maxLength = Math.max(prevChildren.length, nextChildren.length);
    const children: ReconciledNode[] = [];

    for (let i = 0; i < maxLength; i++) {
      const prevChild = prevChildren[i] ?? null;
      const nextChild = nextChildren[i];

      if (nextChild) {
        children.push(
          this.reconcileNode({
            prev: prevChild,
            next: nextChild,
            window,
          })
        );
      } else if (prevChild) {
        this.unmountNode({
          node: prevChild,
          window,
        });
      }
    }

    return {
      widget: next,
      stableId,
      children,
    };
  }

  protected unmountNode(options: UnmountNodeOptions): void {
    const { node, window } = options;

    node.widget.onUnmount?.({
      window,
      widget: node.widget,
      stableId: node.stableId,
    });

    this.stateStore.destroy(node.stableId);

    // Recursively unmount children
    for (const child of node.children) {
      this.unmountNode({ node: child, window });
    }
  }
}
