import type { InputManager } from '@/flying/app';
import { GLFW_MOUSE_BUTTON_LEFT } from '@/glfw/enums';
import type { LayoutNode } from '../../layout';
import type { PointerEvent } from '../event/types';
import { hitTest } from '../utility/hit-test';
import type { DispatchOptions, PointerEventOptions } from './types';

export class PointerDispatcher {
  public input: InputManager | null;

  protected hoveredNode: LayoutNode | null;
  protected pressedNode: LayoutNode | null;

  public constructor(input: InputManager | null) {
    this.input = input;
    this.hoveredNode = null;
    this.pressedNode = null;
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

    if (hit !== this.hoveredNode) {
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

    // --- Pointer down ---

    if (input.isButtonPressed(GLFW_MOUSE_BUTTON_LEFT)) {
      hit?.widget.onPointerDown?.({
        window,
        node: hit,
        position,
        modifiers,
      });

      this.pressedNode = hit;
    }

    // --- Pointer up + click ---

    if (input.isButtonReleased(GLFW_MOUSE_BUTTON_LEFT)) {
      hit?.widget?.onPointerUp?.({
        window,
        node: hit,
        position,
        modifiers,
      });

      // Click = pointer down and up on the same widget
      if (hit && this.sameWidget(hit, this.pressedNode)) {
        hit.widget.onClick?.({
          window,
          node: hit,
          position,
          button: GLFW_MOUSE_BUTTON_LEFT,
          modifiers,
          count: 1,
        });
      }

      this.pressedNode = null;
    }
  }

  public reset(): void {
    this.hoveredNode = null;
    this.pressedNode = null;
  }

  protected sameWidget(a: LayoutNode | null, b: LayoutNode | null): boolean {
    return a !== null && b !== null && a.widget === b.widget;
  }

  protected fireEnter(options: PointerEventOptions): void {
    if (!this.assertNode(options)) return;

    options.node.widget.onPointerEnter?.(options);
  }

  protected fireLeave(options: PointerEventOptions): void {
    if (!this.assertNode(options)) return;

    options.node.widget.onPointerLeave?.(options);
  }

  protected assertInput(input: InputManager | null): asserts input {
    if (input) return;

    throw new Error('InputManager is required');
  }

  protected assertNode(options: PointerEventOptions): options is PointerEvent {
    return options.node !== null;
  }
}
