import type {
  CharEvent,
  CharEventHandler,
  KeyEvent,
  KeyEventHandler,
} from '@/flying/interactions';
import {
  GLFW_KEY_BACKSPACE,
  GLFW_KEY_DELETE,
  GLFW_KEY_END,
  GLFW_KEY_HOME,
  GLFW_KEY_LEFT,
  GLFW_KEY_RIGHT,
} from '@glfw/enums';
import type { TextInputProps, TextInputState } from '.';

export function createTextInputCharHandler(
  props: TextInputProps
): CharEventHandler {
  return (event: CharEvent) => {
    if (props.disabled) return;

    const { node, stateStore } = event;

    if (props.value !== undefined) {
      props.onChange?.(props.value);
      return;
    }

    const state = stateStore.stateFor<TextInputState>({
      stableId: node.stableId,
      initial: {
        value: props.defaultValue ?? '',
        caret: (props.defaultValue ?? '').length,
      },
    });

    const text = String.fromCodePoint(event.codepoint);
    const nextValue =
      state.value.slice(0, state.caret) + text + state.value.slice(state.caret);

    const next: TextInputState = {
      value: nextValue,
      caret: state.caret + text.length,
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

    const { node, stateStore } = event;

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
      initial: {
        value: props.defaultValue ?? '',
        caret: (props.defaultValue ?? '').length,
      },
    });

    let next: TextInputState = state;

    switch (event.key) {
      case GLFW_KEY_BACKSPACE:
        if (state.caret > 0) {
          next = {
            value:
              state.value.slice(0, state.caret - 1) +
              state.value.slice(state.caret),
            caret: state.caret - 1,
          };
        }
        break;

      case GLFW_KEY_DELETE:
        if (state.caret < state.value.length) {
          next = {
            value:
              state.value.slice(0, state.caret) +
              state.value.slice(state.caret + 1),
            caret: state.caret,
          };
        }
        break;

      case GLFW_KEY_LEFT:
        if (state.caret > 0) next = { ...state, caret: state.caret - 1 };
        break;

      case GLFW_KEY_RIGHT:
        if (state.caret < state.value.length)
          next = { ...state, caret: state.caret + 1 };
        break;

      case GLFW_KEY_HOME:
        next = { ...state, caret: 0 };
        break;

      case GLFW_KEY_END:
        next = { ...state, caret: state.value.length };
        break;
    }

    if (next !== state) {
      stateStore.setState({ stableId: node.stableId, value: next });

      if (next.value !== state.value) props.onChange?.(next.value);
    }
  };
}
