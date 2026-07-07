import type { PointerEvent, PointerEventHandler } from '@/flying/interactions';
import { resolveSpacing } from '@flying/widget';
import type { TextInputStyle } from '../styles/types';
import type { TextInputProps, TextInputState } from './';

export function createTextInputPointerHandler(props: TextInputProps): {
  onPointerDown: PointerEventHandler;
} {
  return {
    onPointerDown: (event: PointerEvent) => {
      if (props.disabled) return;

      if (props.value !== undefined) return;

      const { node, stateStore, ctx, position } = event;

      const fontAtlas = ctx.fontManager.get(props.font);

      const state = stateStore.stateFor<TextInputState>({
        stableId: node.stableId,
        initial: {
          value: props.defaultValue ?? '',
          caret: (props.defaultValue ?? '').length,
        },
      });

      const style = node.widget.style as TextInputStyle | undefined;

      if (!style) return;

      const padding = resolveSpacing(style.padding, node.width);
      const contentX = node.x + padding.left;
      const relX = position.x - contentX;

      const caret = fontAtlas.charIndexAtX({
        text: state.value,
        x: relX,
        fontSize: style.fontSize,
        letterSpacing: style.letterSpacing,
      });

      stateStore.setState({
        stableId: node.stableId,
        value: { ...state, caret },
      });
    },
  };
}
