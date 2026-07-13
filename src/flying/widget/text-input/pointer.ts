import type { PointerEvent, PointerEventHandler } from '@flying/interactions';
import { resolveSpacing } from '@flying/widget';
import { GLFW_MOUSE_BUTTON_LEFT } from '@glfw/enums';
import type { TextInputStyle } from '../styles/types';
import type { TextInputProps, TextInputState } from './';
import { makeTextInputState, measureTextInputScrollX } from './state';

export function createTextInputPointerHandler(props: TextInputProps): {
  onPointerDown: PointerEventHandler;
  onPointerMove: PointerEventHandler;
} {
  function resolveCaret(event: PointerEvent): {
    state: TextInputState;
    caret: number;
    scrollX: number;
  } | null {
    if (props.disabled) return null;

    const { node, stateStore, ctx, position } = event;

    const fontAtlas = ctx.fontManager.get(props.font);
    const state = stateStore.stateFor<TextInputState>({
      stableId: node.stableId,
      initial: makeTextInputState(props),
    });
    const value = props.value ?? state.value;

    const style = node.widget.style as TextInputStyle | undefined;
    if (!style) return null;

    const padding = resolveSpacing(style.padding, node.width);
    const contentX = node.screenX + padding.left;
    const relX = position.x - contentX;

    const caret = fontAtlas.charIndexAtX({
      text: value,
      x: relX,
      fontSize: style.fontSize,
      letterSpacing: style.letterSpacing,
    });

    const scrollX = measureTextInputScrollX({
      ctx,
      props,
      node,
      value,
      caret,
      currentScrollX: state.scrollX,
    });

    return { state, caret, scrollX };
  }

  return {
    onPointerDown: (event: PointerEvent) => {
      const result = resolveCaret(event);

      if (!result) return;

      const { node, stateStore } = event;
      const { state, caret, scrollX } = result;

      stateStore.setState({
        stableId: node.stableId,
        value: { ...state, caret, anchor: caret, scrollX },
      });

      event.capturePointer?.();
    },
    onPointerMove: (event: PointerEvent) => {
      if (!event.input.isMouseDown(GLFW_MOUSE_BUTTON_LEFT)) return;

      const result = resolveCaret(event);

      if (!result) return;

      const { node, stateStore } = event;
      const { state, caret, scrollX } = result;

      stateStore.setState({
        stableId: node.stableId,
        value: { ...state, caret, scrollX },
      });
    },
  };
}
