import type { LayoutNode } from '@flying/layout';

export function buildLayoutIndex(root: LayoutNode): Map<number, LayoutNode> {
  const index = new Map<number, LayoutNode>();

  function walk(node: LayoutNode): void {
    index.set(node.stableId, node);

    for (const child of node.children) {
      walk(child);
    }
  }

  walk(root);

  return index;
}
