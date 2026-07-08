import type { Window } from '@flying/app';
import {
  Palette,
  resolveSpacing,
  ROOT_FONT_SIZE,
  type TextInputProps,
  type TextInputState,
  type TextInputStyle,
} from '@flying/widget';
import { makeTextInputState } from '@flying/widget/text-input/state';
import type { PaintOptions } from '../types';

export function paintTextInput(
  window: Window,
  options: PaintOptions & { style: TextInputStyle; focused: boolean }
) {
  const { renderer, ctx, layout, style, focused } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as TextInputProps;

  const state: TextInputState =
    props.value !== undefined
      ? makeTextInputState(props)
      : ctx.stateStore.stateFor<TextInputState>({
          stableId: layout.stableId,
          initial: makeTextInputState(props),
        });

  const fontAtlas = ctx.fontManager.get(props.font);
  const padding = resolveSpacing(style.padding, width);
  const contentX = x + padding.left;

  const hasValue = state.value.length > 0;
  const text = hasValue ? state.value : (props.placeholder ?? '');

  const measured = text
    ? fontAtlas.measureText({
        text,
        fontSize: style.fontSize,
        letterSpacing: style.letterSpacing,
        lineHeight: style.lineHeight,
      })
    : { width: 0, height: style.fontSize ?? ROOT_FONT_SIZE };

  const contentY = y + (height - measured.height) / 2;

  renderer.pushClip(window, { x, y, width, height });

  if (text) {
    const color = !hasValue
      ? (style.placeholderColor ?? Palette.textMuted)
      : (style.color ?? Palette.text);

    renderer.drawText(window, {
      text: text,
      x: contentX - state.scrollX,
      y: contentY,
      color,
      atlas: fontAtlas,
      opacity: style.opacity,
      letterSpacing: style.letterSpacing,
      lineHeight: style.lineHeight,
      fontSize: style.fontSize,
    });
  }

  if (focused && props.value === undefined) {
    const blink = Math.floor(performance.now() / 500) % 2 === 0;
    if (blink) {
      const measured = fontAtlas.measureText({
        text: state.value.substring(0, state.caret),
        letterSpacing: style.letterSpacing,
        lineHeight: style.lineHeight,
        fontSize: style.fontSize,
      });

      renderer.drawRect(window, {
        x: contentX + measured.width - state.scrollX,
        y: contentY,
        width: style.caretWidth ?? 1,
        height: style.fontSize ?? measured.height ?? ROOT_FONT_SIZE,
        color: style.caretColor ?? style.color ?? Palette.text,
      });
    }
  }

  renderer.popClip(window);
}
