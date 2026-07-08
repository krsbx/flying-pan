import {
  ROOT_FONT_SIZE,
  type TextInputProps,
  type TextInputState,
  type TextInputStyle,
} from '@flying/widget';
import { makeTextInputState } from '@flying/widget/text-input/state';
import type { ResolveWidgetSizeOptions } from './types';

export function resolveTextInputSize(options: ResolveWidgetSizeOptions): void {
  const props = options.widget.props as TextInputProps;
  const style = options.widget.style as TextInputStyle;
  const fontAtlas = options.ctx.fontManager.get(props.font);

  const state = options.ctx.stateStore.stateFor<TextInputState>({
    stableId: options.ctx.getStableId(options.widget),
    initial: makeTextInputState(props),
  });
  const value = props.value ?? state.value;

  const text = value || (props.placeholder ?? '');

  if (!text) return;

  const measured = fontAtlas.measureText({
    text,
    fontSize: style.fontSize ?? ROOT_FONT_SIZE,
    letterSpacing: style.letterSpacing,
    lineHeight: style.lineHeight,
  });

  options.size.width ||= measured.width;
  options.size.height ||= measured.height;
}
