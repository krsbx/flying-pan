import type { StateStore } from '@flying/state';
import type { WidgetDescriptor } from '@flying/widget';
import type { Key, ReconciledNode } from '../types.ts';
import type {
  GetStableId,
  ReconcileChildrenOptions,
  ReconcileNodeOptions,
  UnmountNodeOptions,
} from './types';
import type { ReconcileOptions } from './types.ts';

export class Reconciler implements GetStableId {
  protected readonly stateStore: StateStore;
  protected prevTree: ReconciledNode | null;
  protected nextId; // 0 reserved for "not reconciled"
  protected stableIdByWidget: Map<WidgetDescriptor, number>;
  protected _changed: boolean;

  public constructor(stateStore: StateStore) {
    this.stateStore = stateStore;
    this.prevTree = null;
    this.nextId = 1;
    this.stableIdByWidget = new Map();
    this._changed = false;
  }

  public reconcile(options: ReconcileOptions): ReconciledNode {
    const { window, next } = options;

    if (next === this.prevTree?.widget) {
      this._changed = false;
      return this.prevTree;
    }

    this._changed = true;
    this.stableIdByWidget.clear();

    const result = this.reconcileNode({
      prev: this.prevTree,
      next,
      window,
    });

    this.prevTree = result;

    return result;
  }

  public get changed(): boolean {
    return this._changed;
  }

  public reset(): void {
    this.prevTree = null;
    this.nextId = 1;
    this._changed = false;
    this.stableIdByWidget.clear();
  }

  public getStableId = (widget: WidgetDescriptor): number => {
    if (widget._virtualStableId != null) return widget._virtualStableId;

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
    const children = this.reconcileChildren({
      prevChildren,
      nextChildren,
      window,
    });

    return {
      widget: next,
      stableId,
      children,
    };
  }

  protected reconcileChildren(
    options: ReconcileChildrenOptions
  ): ReconciledNode[] {
    const { prevChildren, nextChildren, window } = options;

    // 1. Partition prev children into keyed + unkeyed
    const prevKeyed = new Map<Key, ReconciledNode>();
    const prevUnkeyed: ReconciledNode[] = [];

    for (const p of prevChildren) {
      const key = p.widget.key;

      if (key !== undefined) {
        prevKeyed.set(key, p);
      } else {
        prevUnkeyed.push(p);
      }
    }

    // 2. Track consumption for cleanup
    const consumedKeys = new Set<Key>();
    let unkeyedCursor = 0;

    const children: ReconciledNode[] = [];

    // 3. Iterate next children in declaration order
    for (const nextChild of nextChildren) {
      const key = nextChild.key;

      if (key !== undefined) {
        // Keyed child — match by key across siblings
        const prevNode = prevKeyed.get(key) ?? null;
        consumedKeys.add(key);

        children.push(
          this.reconcileNode({
            prev: prevNode,
            next: nextChild,
            window,
          })
        );
      } else {
        // Unkeyed child — match by position against prevUnkeyed
        const prevNode = prevUnkeyed[unkeyedCursor] ?? null;
        unkeyedCursor++;

        children.push(
          this.reconcileNode({
            prev: prevNode,
            next: nextChild,
            window,
          })
        );
      }
    }

    // 4. Unmount unconsumed prev nodes
    for (const [key, prevNode] of prevKeyed) {
      if (!consumedKeys.has(key)) {
        this.unmountNode({ node: prevNode, window });
      }
    }

    for (let i = unkeyedCursor; i < prevUnkeyed.length; i++) {
      const prevNode = prevUnkeyed[i];
      if (prevNode) {
        this.unmountNode({ node: prevNode, window });
      }
    }

    return children;
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
