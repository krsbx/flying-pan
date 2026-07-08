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
  GLFW_MOD_SHIFT,
} from '@glfw/enums';
import {
  makeTextInputState,
  measureTextInputScrollX,
  selectionRange,
} from './state';

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
    // Replace any active selection; otherwise insert at the caret.
    const range = selectionRange(state);
    const insertAt = range?.start ?? state.caret;
    const replaceUntil = range?.end ?? state.caret;
    const nextValue =
      value.slice(0, insertAt) + text + value.slice(replaceUntil);
    const nextCaret = insertAt + text.length;

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
    let nextValue = value;

    const shift = (event.modifiers & GLFW_MOD_SHIFT) !== 0;
    const range = selectionRange(state);

    let caret = state.caret;
    let anchor = state.anchor;

    switch (event.key) {
      case GLFW_KEY_BACKSPACE:
        if (range) {
          nextValue = value.slice(0, range.start) + value.slice(range.end);
          caret = range.start;
          anchor = caret;
        } else if (state.caret > 0) {
          nextValue =
            value.slice(0, state.caret - 1) + value.slice(state.caret);
          caret = state.caret - 1;
          anchor = caret;
        }
        break;

      case GLFW_KEY_DELETE:
        if (range) {
          nextValue = value.slice(0, range.start) + value.slice(range.end);
          caret = range.start;
          anchor = caret;
        } else if (state.caret < value.length) {
          nextValue =
            value.slice(0, state.caret) + value.slice(state.caret + 1);
        }
        break;

      case GLFW_KEY_LEFT: {
        const withinLimit = state.caret > 0;
        caret = withinLimit ? state.caret - 1 : state.caret;
        anchor = shift ? state.anchor : caret;
        break;
      }

      case GLFW_KEY_RIGHT: {
        const withinLimit = state.caret < value.length;

        caret = withinLimit ? state.caret + 1 : state.caret;
        anchor = shift ? state.anchor : caret;
        break;
      }

      case GLFW_KEY_HOME: {
        if (state.caret === 0 && state.anchor === 0) break;

        caret = 0;
        anchor = shift ? state.anchor : 0;
        break;
      }

      case GLFW_KEY_END: {
        caret = value.length;
        anchor = shift ? state.anchor : caret;
        break;
      }
    }

    const next =
      state.value === nextValue &&
      state.caret === caret &&
      state.anchor === anchor
        ? state
        : {
            ...state,
            value: nextValue,
            caret,
            anchor,
          };

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
