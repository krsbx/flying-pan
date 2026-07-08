import type {
  CharEvent,
  CharEventHandler,
  KeyEvent,
  KeyEventHandler,
} from '@flying/interactions';
import { type TextInputProps, type TextInputState } from '@flying/widget';
import {
  GLFW_KEY_BACKSPACE,
  GLFW_KEY_DELETE,
  GLFW_KEY_END,
  GLFW_KEY_HOME,
  GLFW_KEY_LEFT,
  GLFW_KEY_RIGHT,
} from '@glfw/enums';
import { makeTextInputState, measureTextInputScrollX } from './state';

export function createTextInputCharHandler(
  props: TextInputProps
): CharEventHandler {
  return (event: CharEvent) => {
    if (props.disabled) return;

    const { node, stateStore, ctx } = event;

    const state = stateStore.stateFor<TextInputState>({
      stableId: node.stableId,
      initial: makeTextInputState(props),
    });
    const value = props.value ?? state.value;

    const text = String.fromCodePoint(event.codepoint);
    const nextValue =
      value.slice(0, state.caret) + text + value.slice(state.caret);
    const nextCaret = state.caret + text.length;

    const scrollX = measureTextInputScrollX({
      ctx,
      props,
      node,
      value: nextValue,
      caret: nextCaret,
      currentScrollX: state.scrollX,
    });

    const next: TextInputState = {
      ...state,
      value: nextValue,
      caret: nextCaret,
      anchor: nextCaret,
      scrollX,
    };

    stateStore.setState({ stableId: node.stableId, value: next });
    props.onChange?.(nextValue);
  };
}

export function createTextInputKeyHandler(
  props: TextInputProps
): KeyEventHandler {
  return (event: KeyEvent) => {
    if (props.disabled) return;

    const { node, stateStore, ctx } = event;

    const state = stateStore.stateFor<TextInputState>({
      stableId: node.stableId,
      initial: makeTextInputState(props),
    });
    const value = props.value ?? state.value;

    let next: TextInputState = state;

    switch (event.key) {
      case GLFW_KEY_BACKSPACE:
        if (state.caret > 0) {
          next = {
            ...state,
            value: value.slice(0, state.caret - 1) + value.slice(state.caret),
            caret: state.caret - 1,
            anchor: state.caret - 1,
          };
        }
        break;

      case GLFW_KEY_DELETE:
        if (state.caret < value.length) {
          next = {
            ...state,
            value: value.slice(0, state.caret) + value.slice(state.caret + 1),
          };
        }
        break;

      case GLFW_KEY_LEFT:
        if (state.caret > 0)
          next = { ...state, caret: state.caret - 1, anchor: state.caret - 1 };
        break;

      case GLFW_KEY_RIGHT:
        if (state.caret < value.length)
          next = { ...state, caret: state.caret + 1, anchor: state.caret + 1 };
        break;

      case GLFW_KEY_HOME:
        next = { ...state, caret: 0, anchor: 0 };
        break;

      case GLFW_KEY_END:
        next = {
          ...state,
          caret: value.length,
          anchor: value.length,
        };
        break;
    }

    if (next !== state) {
      const scrollX = measureTextInputScrollX({
        ctx,
        props,
        node,
        value: next.value,
        caret: next.caret,
        currentScrollX: state.scrollX,
      });
      const finalized: TextInputState = { ...next, scrollX };

      stateStore.setState({ stableId: node.stableId, value: finalized });

      if (finalized.value !== value) props.onChange?.(finalized.value);
    }
  };
}
