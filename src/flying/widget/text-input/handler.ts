import type {
  CharEvent,
  CharEventHandler,
  KeyEvent,
  KeyEventHandler,
} from '@/flying/interactions';
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

    if (props.value !== undefined) {
      props.onChange?.(props.value);
      return;
    }

    const state = stateStore.stateFor<TextInputState>({
      stableId: node.stableId,
      initial: makeTextInputState(props),
    });

    const text = String.fromCodePoint(event.codepoint);
    const nextValue =
      state.value.slice(0, state.caret) + text + state.value.slice(state.caret);
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

    if (props.value) {
      if (event.key === GLFW_KEY_BACKSPACE && props.value.length > 0) {
        props.onChange?.(props.value.slice(0, -1));
      } else if (event.key === GLFW_KEY_DELETE && props.value.length > 0) {
        props.onChange?.(props.value.slice(1));
      }
      return;
    }

    const state = stateStore.stateFor<TextInputState>({
      stableId: node.stableId,
      initial: makeTextInputState(props),
    });

    let next: TextInputState = state;

    switch (event.key) {
      case GLFW_KEY_BACKSPACE:
        if (state.caret > 0) {
          next = {
            ...state,
            value:
              state.value.slice(0, state.caret - 1) +
              state.value.slice(state.caret),
            caret: state.caret - 1,
            anchor: state.caret - 1,
          };
        }
        break;

      case GLFW_KEY_DELETE:
        if (state.caret < state.value.length) {
          next = {
            ...state,
            value:
              state.value.slice(0, state.caret) +
              state.value.slice(state.caret + 1),
          };
        }
        break;

      case GLFW_KEY_LEFT:
        if (state.caret > 0)
          next = { ...state, caret: state.caret - 1, anchor: state.caret - 1 };
        break;

      case GLFW_KEY_RIGHT:
        if (state.caret < state.value.length)
          next = { ...state, caret: state.caret + 1, anchor: state.caret + 1 };
        break;

      case GLFW_KEY_HOME:
        next = { ...state, caret: 0, anchor: 0 };
        break;

      case GLFW_KEY_END:
        next = {
          ...state,
          caret: state.value.length,
          anchor: state.value.length,
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

      if (finalized.value !== state.value) props.onChange?.(finalized.value);
    }
  };
}
