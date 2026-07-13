import { hitTest } from '@flying/interactions';
import type { LayoutNode } from '@flying/layout';
import { WidgetType, type WidgetDescriptor } from '@flying/widget';
import {
  GLFW_KEY_ENTER,
  GLFW_KEY_SPACE,
  GLFW_KEY_TAB,
  GLFW_MOUSE_BUTTON_LEFT,
} from '@glfw/enums';
import { BaseDispatcher } from '../base';
import type { DispatcherConfig, DispatchOptions } from '../types';

export class FocusDispatcher extends BaseDispatcher {
  protected readonly activableWidgets: Set<WidgetType>;
  protected focusableNodes: LayoutNode[];
  protected _focusedStableId: number | null;
  protected _pendingFocusWidget: WidgetDescriptor | null;
  protected _pendingBlur: boolean;

  public constructor(options: DispatcherConfig) {
    super(options);

    this.activableWidgets = new Set([
      WidgetType.Button,
      WidgetType.Checkbox,
      WidgetType.Radio,
      WidgetType.Toggle,
    ]);
    this._focusedStableId = null;
    this.focusableNodes = [];
    this._pendingFocusWidget = null;
    this._pendingBlur = false;
  }

  public dispatch(options: DispatchOptions): void {
    const { window, layoutIndex, focusableNodes, stateStore } = options;
    const input = this.input;

    // 1. Read focusable nodes collected during layout (tree order = tab order)
    this.focusableNodes = focusableNodes;

    // 2. Validate current focus — blur if unmounted or no longer focusable
    if (this._focusedStableId) {
      const node = layoutIndex.get(this._focusedStableId) ?? null;
      const stillFocusable = node?.widget.style?.focusable === true;

      if (!node || !stillFocusable) {
        this._focusedStableId = null;
        node?.widget.onBlur?.({
          window,
          node,
          relatedTarget: null,
          stateStore: stateStore,
          ctx: this.ctx,
          input: this.input,
        });
      }
    }

    // 2.5. Apply pending blur/focus
    this.applyPendingBlurFocus(options);

    // 3. Tab cycling
    if (input.isKeyPressed(GLFW_KEY_TAB)) {
      this.handleTab(options);
    }

    // 4. Click-to-focus (nearest focusable ancestor of the hit target)
    if (input.isButtonPressed(GLFW_MOUSE_BUTTON_LEFT)) {
      this.handleClick(options);
    }

    // 5. Route key events to the (possibly newly) focused widget
    if (this._focusedStableId) {
      const node = layoutIndex.get(this._focusedStableId) ?? null;

      if (node) {
        this.routeKeys(node, options);
        this.routeChars(node, options);
      }
    }
  }

  public reset(): void {
    this._focusedStableId = null;
    this.focusableNodes = [];
    this._pendingFocusWidget = null;
    this._pendingBlur = false;
  }

  protected applyPendingBlurFocus(options: DispatchOptions) {
    const { window, layout, layoutIndex, stateStore } = options;

    if (this._pendingBlur) {
      this._pendingBlur = false;

      if (this._focusedStableId) {
        const oldNode = layoutIndex.get(this._focusedStableId) ?? null;

        this._focusedStableId = null;

        oldNode?.widget.onBlur?.({
          window,
          node: oldNode,
          relatedTarget: null,
          stateStore,
          ctx: this.ctx,
          input: this.input,
        });
      }
    }

    if (this._pendingFocusWidget) {
      const widget = this._pendingFocusWidget;

      this._pendingFocusWidget = null;

      const node = this.findNodeForWidget(layout, widget);

      if (node && node.widget.style?.focusable === true) {
        this.moveFocus(node, options);
      }
    }
  }

  protected handleTab(options: DispatchOptions): void {
    const list = this.focusableNodes;

    if (list.length === 0) return;

    const input = this.input;
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

    this.moveFocus(target, options);
  }

  protected handleClick(options: DispatchOptions): void {
    const { window, layout, layoutIndex, stateStore } = options;
    const input = this.input;

    const position = input.mousePosition;
    const hit = hitTest({
      node: layout,
      x: position.x,
      y: position.y,
      scrollOffset: options.scrollOffset,
    });

    const target = hit ? this.nearestFocusableAncestor(layout, hit) : null;

    if (target) {
      this.moveFocus(target, options);
    } else if (this._focusedStableId) {
      // Clicked outside any focusable widget → blur current (HTML semantics)
      const oldNode = layoutIndex.get(this._focusedStableId) ?? null;

      this._focusedStableId = null;

      oldNode?.widget.onBlur?.({
        window,
        node: oldNode,
        relatedTarget: null,
        stateStore,
        ctx: this.ctx,
        input: this.input,
      });
    }
  }

  protected moveFocus(node: LayoutNode, options: DispatchOptions): void {
    const { window, layoutIndex, stateStore } = options;

    if (this._focusedStableId === node.stableId) return;

    const oldStableId = this._focusedStableId;
    const oldNode =
      oldStableId !== null ? (layoutIndex.get(oldStableId) ?? null) : null;

    this._focusedStableId = node.stableId;

    if (oldNode) {
      oldNode.widget.onBlur?.({
        window,
        node: oldNode,
        relatedTarget: node,
        stateStore,
        ctx: this.ctx,
        input: this.input,
      });
    }

    node.widget.onFocus?.({
      window,
      node,
      relatedTarget: oldNode ?? null,
      stateStore,
      ctx: this.ctx,
      input: this.input,
    });
  }

  protected routeChars(node: LayoutNode, options: DispatchOptions): void {
    const { window, stateStore } = options;
    const input = this.input;

    for (const codepoint of input.current.chars) {
      node.widget.onChar?.({
        window,
        node,
        stateStore,
        codepoint,
        ctx: this.ctx,
        input: this.input,
      });
    }
  }

  protected routeKeys(node: LayoutNode, options: DispatchOptions): void {
    const { window, stateStore } = options;
    const input = this.input;

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
          stateStore,
          ctx: this.ctx,
          input: this.input,
        });

        // Activate focused widget on Enter / Space (HTML semantics).
        // Only on fresh press — auto-repeat must not re-trigger the click.
        // Synthesizes a ClickEvent so user handlers don't care about source.
        if (
          isFresh &&
          (key === GLFW_KEY_ENTER || key === GLFW_KEY_SPACE) &&
          this.activableWidgets.has(node.widget.type)
        ) {
          node.widget.onClick?.({
            window,
            node,
            position: input.mousePosition,
            button: GLFW_MOUSE_BUTTON_LEFT,
            modifiers,
            count: 1,
            stateStore,
            ctx: this.ctx,
            input: this.input,
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
          stateStore,
          ctx: this.ctx,
          input: this.input,
        });
      }
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
