import type { InputManager } from '@flying/app';
import { hitTest } from '@flying/interactions/utility/hit-test';
import type { LayoutNode } from '@flying/layout';
import { WidgetType, type WidgetDescriptor } from '@flying/widget';
import {
  GLFW_KEY_ENTER,
  GLFW_KEY_SPACE,
  GLFW_KEY_TAB,
  GLFW_MOUSE_BUTTON_LEFT,
} from '@glfw/enums';
import { BaseDispatcher } from '../base';
import type { DispatchOptions } from '../types';
import type {
  ApplyPendingBlurFocusOptions,
  HandleClickOptions,
  HandleTabOptions,
  MoveFocusOptions,
  RouteKeysOptions,
} from './types';

export class FocusDispatcher extends BaseDispatcher {
  protected focusableNodes: LayoutNode[];
  protected _focusedStableId: number | null;
  protected _pendingFocusWidget: WidgetDescriptor | null;
  protected _pendingBlur: boolean;

  public constructor(input: InputManager) {
    super(input);

    this._focusedStableId = null;
    this.focusableNodes = [];
    this._pendingFocusWidget = null;
    this._pendingBlur = false;
  }

  public dispatch(options: DispatchOptions): void {
    const { window, layout } = options;
    const input = options.input ?? this.input;

    this.assertInput(input);

    // 1. Collect focusable nodes (tree order = tab order)
    this.focusableNodes = [];
    this.collectFocusable(layout);

    // 2. Validate current focus — blur if unmounted or no longer focusable
    if (this._focusedStableId) {
      const node = this.findNodeByStableId(layout, this._focusedStableId);
      const stillFocusable = node?.widget.style?.focusable === true;

      if (!node || !stillFocusable) {
        this._focusedStableId = null;
        node?.widget.onBlur?.({ window, node, relatedTarget: null });
      }
    }

    // 2.5. Apply pending blur/focus
    this.applyPendingBlurFocus({ window, layout });

    // 3. Tab cycling
    if (input.isKeyPressed(GLFW_KEY_TAB)) {
      this.handleTab({ window, layout, input });
    }

    // 4. Click-to-focus (nearest focusable ancestor of the hit target)
    if (input.isButtonPressed(GLFW_MOUSE_BUTTON_LEFT)) {
      this.handleClick({ window, layout, input });
    }

    // 5. Route key events to the (possibly newly) focused widget
    if (this._focusedStableId) {
      const node = this.findNodeByStableId(layout, this._focusedStableId);

      if (node) {
        this.routeKeys({ window, node, input });
      }
    }
  }

  public reset(): void {
    this._focusedStableId = null;
    this.focusableNodes = [];
    this._pendingFocusWidget = null;
    this._pendingBlur = false;
  }

  protected applyPendingBlurFocus(options: ApplyPendingBlurFocusOptions) {
    const { window, layout } = options;

    if (this._pendingBlur) {
      this._pendingBlur = false;

      if (this._focusedStableId) {
        const oldNode = this.findNodeByStableId(layout, this._focusedStableId);

        this._focusedStableId = null;

        oldNode?.widget.onBlur?.({
          window,
          node: oldNode,
          relatedTarget: null,
        });
      }
    }

    if (this._pendingFocusWidget) {
      const widget = this._pendingFocusWidget;

      this._pendingFocusWidget = null;

      const node = this.findNodeForWidget(layout, widget);

      if (node && node.widget.style?.focusable === true) {
        this.moveFocus({ window, layout, target: node });
      }
    }
  }

  protected handleTab(options: HandleTabOptions): void {
    const { window, layout, input } = options;

    const list = this.focusableNodes;

    if (list.length === 0) return;

    const shift = input.isShiftDown;
    const currentIdx = this._focusedStableId
      ? list.findIndex((n) => n.stableId === this._focusedStableId)
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
    } else if (this._focusedStableId) {
      // Clicked outside any focusable widget → blur current (HTML semantics)
      const oldNode = this.findNodeByStableId(layout, this._focusedStableId);

      this._focusedStableId = null;

      oldNode?.widget.onBlur?.({
        window,
        node: oldNode,
        relatedTarget: null,
      });
    }
  }

  protected moveFocus(options: MoveFocusOptions): void {
    const { window, layout, target } = options;

    if (this._focusedStableId === target.stableId) return;

    const oldStableId = this._focusedStableId;
    const oldNode =
      oldStableId !== null
        ? this.findNodeByStableId(layout, oldStableId)
        : null;

    this._focusedStableId = target.stableId;

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

      const isFresh = !previous.has(key);
      const isRepeat = input.isKeyRepeated(key);

      if (isFresh || isRepeat) {
        node.widget.onKeyDown?.({
          window,
          node,
          key,
          scancode: 0,
          modifiers,
          repeat: isRepeat,
        });

        // Activate focused buttons on Enter / Space (HTML semantics).
        // Only on fresh press — auto-repeat must not re-trigger the click.
        // Synthesizes a ClickEvent so user handlers don't care about source.
        if (
          isFresh &&
          (key === GLFW_KEY_ENTER || key === GLFW_KEY_SPACE) &&
          node.widget.type === WidgetType.Button
        ) {
          node.widget.onClick?.({
            window,
            node,
            position: input.mousePosition,
            button: GLFW_MOUSE_BUTTON_LEFT,
            modifiers,
            count: 1,
          });
        }
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

  public focus(widget: WidgetDescriptor): void {
    this._pendingFocusWidget = widget;
    this._pendingBlur = false;
  }

  public blur(): void {
    this._pendingBlur = true;
    this._pendingFocusWidget = null;
  }

  public get focusedStableId(): number | null {
    return this._focusedStableId;
  }

  public get pendingFocusWidget(): WidgetDescriptor | null {
    return this._pendingFocusWidget;
  }

  public get pendingBlur(): boolean {
    return this._pendingBlur;
  }
}
