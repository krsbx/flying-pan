import type { InputManager } from '@flying/app';
import type { PointerEvent } from '@flying/interactions/event/types';
import { hitTest } from '@flying/interactions/utility/hit-test';
import type { LayoutNode } from '@flying/layout';
import type { Coordinate2D } from '@flying/types';
import type { WidgetDescriptor } from '@flying/widget';
import {
  GLFW_MOUSE_BUTTON_LEFT,
  GLFW_MOUSE_BUTTON_MIDDLE,
  GLFW_MOUSE_BUTTON_RIGHT,
} from '@glfw/enums';
import { BaseDispatcher } from '../base';
import type { DispatchOptions } from '../types';
import type { LastClick, PointerEventOptions } from './types';

const DOUBLE_CLICK_MS = 500;

const TRACKED_BUTTONS = [
  GLFW_MOUSE_BUTTON_LEFT,
  GLFW_MOUSE_BUTTON_RIGHT,
  GLFW_MOUSE_BUTTON_MIDDLE,
] as const;

export class PointerDispatcher extends BaseDispatcher {
  protected hoveredNode: LayoutNode | null;
  protected pressedNode: LayoutNode | null;
  protected pressedButton: number | null;
  protected previousPosition: Coordinate2D | null;
  protected lastClick: LastClick | null;

  public constructor(input: InputManager | null) {
    super(input);

    this.hoveredNode = null;
    this.pressedNode = null;
    this.pressedButton = null;
    this.previousPosition = null;
    this.lastClick = null;
  }

  public dispatch(options: DispatchOptions): void {
    const { window, layout } = options;

    const input = options.input ?? this.input;

    this.assertInput(input);

    const position = input.mousePosition;
    const modifiers = input.current.modifiers;

    const hit = hitTest({
      node: layout,
      x: position.x,
      y: position.y,
    });

    // --- Hover enter / leave (compared by widget identity, not LayoutNode) ---

    const hitWidget = hit?.widget ?? null;
    const prevWidget = this.hoveredNode?.widget ?? null;

    if (hitWidget !== prevWidget) {
      // Trigger leave previous node
      this.fireLeave({
        window,
        node: this.hoveredNode,
        position,
        modifiers,
      });

      this.hoveredNode = hit;

      // Trigger enter new node
      this.fireEnter({
        window,
        node: hit,
        position,
        modifiers,
      });
    }

    // --- Pointer move ---

    if (this.hasMoved(position) && hit) {
      hit.widget.onPointerMove?.({
        window,
        node: hit,
        position,
        modifiers,
      });
    }

    this.previousPosition = {
      x: position.x,
      y: position.y,
    };

    // --- Button events (down, up, click for each tracked button) ---
    for (const button of TRACKED_BUTTONS) {
      if (input.isButtonPressed(button)) {
        hit?.widget.onPointerDown?.({
          window,
          node: hit,
          position,
          modifiers,
          button,
        });

        this.pressedNode = hit;
        this.pressedButton = button;
      }

      if (input.isButtonReleased(button)) {
        hit?.widget?.onPointerUp?.({
          window,
          node: hit,
          position,
          modifiers,
          button,
        });

        // Click = pointer down and up on the same widget with the same button
        if (
          hit &&
          this.sameWidget(hit, this.pressedNode) &&
          button === this.pressedButton
        ) {
          const count = this.getClickCount(hit.widget, button);

          hit.widget.onClick?.({
            window,
            node: hit,
            position,
            button,
            modifiers,
            count,
          });
        }

        if (button === this.pressedButton) {
          this.pressedNode = null;
          this.pressedButton = null;
        }
      }
    }
  }

  public reset(): void {
    this.hoveredNode = null;
    this.pressedNode = null;
    this.pressedButton = null;
    this.previousPosition = null;
    this.lastClick = null;
  }

  protected hasMoved(position: Coordinate2D): boolean {
    if (!this.previousPosition) return false;

    return (
      position.x !== this.previousPosition.x ||
      position.y !== this.previousPosition.y
    );
  }

  protected getClickCount(widget: WidgetDescriptor, button: number): number {
    const now = performance.now();

    if (
      this.lastClick &&
      this.lastClick.widget === widget &&
      this.lastClick.button === button &&
      now - this.lastClick.time <= DOUBLE_CLICK_MS
    ) {
      this.lastClick.count++;
      this.lastClick.time = now;

      return this.lastClick.count;
    }

    this.lastClick = {
      widget,
      button,
      time: now,
      count: 1,
    };

    return 1;
  }

  protected fireEnter(options: PointerEventOptions): void {
    if (!this.assertNode(options)) return;

    options.node.widget.onPointerEnter?.(options);
  }

  protected fireLeave(options: PointerEventOptions): void {
    if (!this.assertNode(options)) return;

    options.node.widget.onPointerLeave?.(options);
  }

  protected assertNode(options: PointerEventOptions): options is PointerEvent {
    return options.node !== null;
  }
}
