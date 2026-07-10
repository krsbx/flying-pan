import type { InputManager } from '@flying/app';
import type { PointerEvent } from '@flying/interactions';
import { hitTest } from '@flying/interactions';
import {
  GLFW_MOUSE_BUTTON_LEFT,
  GLFW_MOUSE_BUTTON_MIDDLE,
  GLFW_MOUSE_BUTTON_RIGHT,
} from '@glfw/enums';
import { BaseDispatcher } from '../base';
import type { DispatcherConfig, DispatchOptions } from '../types';
import type { LastClick, PointerEventOptions } from './types';

const DOUBLE_CLICK_MS = 500;

const TRACKED_BUTTONS = [
  GLFW_MOUSE_BUTTON_LEFT,
  GLFW_MOUSE_BUTTON_RIGHT,
  GLFW_MOUSE_BUTTON_MIDDLE,
] as const;

export class PointerDispatcher extends BaseDispatcher {
  protected _hoveredStableId: number | null;
  protected _pressedStableId: number | null;
  protected _pressedButton: number | null;
  protected lastClick: LastClick | null;

  public constructor(options: DispatcherConfig) {
    super(options);

    this._hoveredStableId = null;
    this._pressedStableId = null;
    this._pressedButton = null;
    this.lastClick = null;
  }

  public dispatch(options: DispatchOptions): void {
    const { window, layout, layoutIndex, stateStore } = options;
    const { input, ctx } = this;

    const position = input.mousePosition;
    const modifiers = input.current.modifiers;

    const hit = hitTest({
      node: layout,
      x: position.x,
      y: position.y,
    });
    const hitId = hit?.stableId ?? null;

    // --- Hover enter / leave (compared by widget identity, not LayoutNode) ---

    const prevNode = this._hoveredStableId
      ? (layoutIndex.get(this._hoveredStableId) ?? null)
      : null;

    if (hitId !== this._hoveredStableId) {
      // Trigger leave previous node
      this.fireLeave({
        window,
        node: prevNode,
        position,
        modifiers,
        ctx,
        input,
      });

      // Press cancellation: if the pointer left the widget it was pressed on
      // while still held, cancel the press (matches HTML :active — no click
      // fires on the eventual release, and the pressed style releases now).
      if (
        this._pressedStableId &&
        this._pressedStableId === this._hoveredStableId
      ) {
        this._pressedStableId = null;
        this._pressedButton = null;
      }

      this._hoveredStableId = hitId;

      // Trigger enter new node
      this.fireEnter({
        window,
        node: hit,
        position,
        modifiers,
        ctx,
        input,
      });
    }

    // --- Pointer move ---

    if (this.hasMoved(input) && hit) {
      hit.widget.onPointerMove?.({
        window,
        node: hit,
        position,
        modifiers,
        stateStore,
        ctx,
        input,
      });
    }

    // --- Button events (down, up, click for each tracked button) ---
    for (const button of TRACKED_BUTTONS) {
      if (input.isButtonPressed(button)) {
        hit?.widget.onPointerDown?.({
          window,
          node: hit,
          position,
          modifiers,
          button,
          stateStore,
          ctx,
          input,
        });

        this._pressedStableId = hitId;
        this._pressedButton = button;
      }

      if (input.isButtonReleased(button)) {
        hit?.widget?.onPointerUp?.({
          window,
          node: hit,
          position,
          modifiers,
          button,
          stateStore,
          ctx,
          input,
        });

        // Click = pointer down and up on the same widget with the same button
        if (
          hit &&
          hitId &&
          hitId === this._pressedStableId &&
          button === this._pressedButton
        ) {
          const count = this.getClickCount(hitId, button);

          hit.widget.onClick?.({
            window,
            node: hit,
            position,
            button,
            modifiers,
            count,
            stateStore,
            ctx,
            input,
          });
        }

        if (button === this._pressedButton) {
          this._pressedStableId = null;
          this._pressedButton = null;
        }
      }
    }
  }

  public reset(): void {
    this._hoveredStableId = null;
    this._pressedStableId = null;
    this._pressedButton = null;
    this.lastClick = null;
  }

  protected hasMoved(input: InputManager): boolean {
    const position = input.current.mousePosition;
    const previousPosition = input.previous.mousePosition;

    return (
      position.x !== previousPosition.x || position.y !== previousPosition.y
    );
  }

  protected getClickCount(stableId: number, button: number): number {
    const now = performance.now();

    if (
      this.lastClick &&
      this.lastClick.stableId === stableId &&
      this.lastClick.button === button &&
      now - this.lastClick.time <= DOUBLE_CLICK_MS
    ) {
      this.lastClick.count++;
      this.lastClick.time = now;

      return this.lastClick.count;
    }

    this.lastClick = {
      stableId,
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

  public get hoveredStableId(): number | null {
    return this._hoveredStableId;
  }

  public get pressedStableId(): number | null {
    return this._pressedStableId;
  }

  public get pressedButton(): number | null {
    return this._pressedButton;
  }
}
