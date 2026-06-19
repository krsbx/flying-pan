import type { InputManager } from '@flying/app';
import { hitTest } from '@flying/interactions/utility/hit-test';
import type { LayoutNode } from '@flying/layout';
import type { WidgetDescriptor } from '@flying/widget';
import { GLFW_KEY_TAB, GLFW_MOUSE_BUTTON_LEFT } from '@glfw/enums';
import { BaseDispatcher } from '../base';
import type { DispatchOptions } from '../types';
import type {
  HandleClickOptions,
  HandleTabOptions,
  MoveFocusOptions,
  RouteKeysOptions,
} from './types';

export class FocusDispatcher extends BaseDispatcher {
  protected focusedWidget: WidgetDescriptor | null;
  protected focusableNodes: LayoutNode[];

  public constructor(input: InputManager | null) {
    super(input);

    this.focusedWidget = null;
    this.focusableNodes = [];
  }

  public dispatch(options: DispatchOptions): void {
    const { window, layout } = options;
    const input = options.input ?? this.input;

    this.assertInput(input);

    // 1. Collect focusable nodes (tree order = tab order)
    this.focusableNodes = [];
    this.collectFocusable(layout);

    // 2. Validate current focus — blur if unmounted or no longer focusable
    if (this.focusedWidget) {
      const node = this.findNodeForWidget(layout, this.focusedWidget);
      const stillFocusable = node?.widget.style?.focusable === true;

      if (!node || !stillFocusable) {
        this.focusedWidget = null;
        node?.widget.onBlur?.({ window, node, relatedTarget: null });
      }
    }

    // 3. Tab cycling
    if (input.isKeyPressed(GLFW_KEY_TAB)) {
      this.handleTab({ window, layout, input });
    }

    // 4. Click-to-focus (nearest focusable ancestor of the hit target)
    if (input.isButtonPressed(GLFW_MOUSE_BUTTON_LEFT)) {
      this.handleClick({ window, layout, input });
    }

    // 5. Route key events to the (possibly newly) focused widget
    if (this.focusedWidget) {
      const node = this.findNodeForWidget(layout, this.focusedWidget);

      if (node) {
        this.routeKeys({ window, node, input });
      }
    }
  }

  public reset(): void {
    this.focusedWidget = null;
    this.focusableNodes = [];
  }

  protected handleTab(options: HandleTabOptions): void {
    const { window, layout, input } = options;

    const list = this.focusableNodes;

    if (list.length === 0) return;

    const shift = input.isShiftDown;
    const currentIdx = this.focusedWidget
      ? list.findIndex((n) => n.widget === this.focusedWidget)
      : -1;

    let nextIdx: number;

    if (currentIdx === -1) {
      nextIdx = shift ? list.length - 1 : 0;
    } else if (shift) {
      nextIdx = (currentIdx - 1 + list.length) % list.length;
    } else {
      nextIdx = (currentIdx + 1) % list.length;
    }

    const target = list[nextIdx];

    if (!target) return;

    this.moveFocus({ window, layout, target });
  }

  protected handleClick(options: HandleClickOptions): void {
    const { window, layout, input } = options;

    const position = input.mousePosition;
    const hit = hitTest({ node: layout, x: position.x, y: position.y });

    const target = hit ? this.nearestFocusableAncestor(layout, hit) : null;

    if (target) {
      this.moveFocus({ window, layout, target });
    } else if (this.focusedWidget) {
      // Clicked outside any focusable widget → blur current (HTML semantics)
      const oldNode = this.findNodeForWidget(layout, this.focusedWidget);

      this.focusedWidget = null;

      oldNode?.widget.onBlur?.({
        window,
        node: oldNode,
        relatedTarget: null,
      });
    }
  }

  protected moveFocus(options: MoveFocusOptions): void {
    const { window, layout, target } = options;

    if (this.focusedWidget === target.widget) return;

    const oldWidget = this.focusedWidget;
    const oldNode = oldWidget
      ? this.findNodeForWidget(layout, oldWidget)
      : null;

    this.focusedWidget = target.widget;

    if (oldNode) {
      oldNode.widget.onBlur?.({
        window,
        node: oldNode,
        relatedTarget: target,
      });
    }

    target.widget.onFocus?.({
      window,
      node: target,
      relatedTarget: oldNode ?? null,
    });
  }

  protected routeKeys(options: RouteKeysOptions): void {
    const { window, node, input } = options;

    const current = input.current.keys;
    const previous = input.previous.keys;
    const modifiers = input.current.modifiers;

    // Tab is intercepted for focus cycling and never forwarded.
    for (const key of current) {
      if (key === GLFW_KEY_TAB) continue;

      if (!previous.has(key)) {
        node.widget.onKeyDown?.({
          window,
          node,
          key,
          scancode: 0,
          modifiers,
          repeat: false,
        });
      }
    }

    for (const key of previous) {
      if (key === GLFW_KEY_TAB) continue;

      if (!current.has(key)) {
        node.widget.onKeyUp?.({
          window,
          node,
          key,
          scancode: 0,
          modifiers,
          repeat: false,
        });
      }
    }
  }

  protected collectFocusable(node: LayoutNode): void {
    if (node.widget.style?.focusable === true) {
      this.focusableNodes.push(node);
    }

    for (const child of node.children) {
      this.collectFocusable(child);
    }
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

  protected nearestFocusableAncestor(
    root: LayoutNode,
    target: LayoutNode
  ): LayoutNode | null {
    const path: LayoutNode[] = [];

    if (!this.findPath(root, target, path)) return null;

    for (let i = path.length - 1; i >= 0; i--) {
      const node = path[i];

      if (node && node.widget.style?.focusable) return node;
    }

    return null;
  }

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

    // Pop the last node, so the -2 index is the nearest focusable ancestor
    path.pop();

    return false;
  }
}
