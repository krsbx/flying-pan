import type { EventContext } from '@/flying/interactions';
import type { LayoutNode } from '@/flying/layout';
import { resolveSpacing, type TextInputStyle } from '../styles';
import type { TextInputProps, TextInputState } from './';

export function makeTextInputState(props: TextInputProps): TextInputState {
  const value = props.value ?? props.defaultValue ?? '';

  return {
    value,
    caret: value.length,
    anchor: value.length,
    scrollX: 0,
  };
}

export function recomputeTextInputScrollX(options: {
  caretX: number;
  currentScrollX: number;
  visibleWidth: number;
}): number {
  const { caretX, currentScrollX, visibleWidth } = options;

  if (caretX < currentScrollX) return caretX;
  if (caretX > currentScrollX + visibleWidth) return caretX - visibleWidth;

  return currentScrollX;
}

export function measureTextInputScrollX(options: {
  ctx: EventContext;
  props: TextInputProps;
  node: LayoutNode;
  value: string;
  caret: number;
  currentScrollX: number;
}): number {
  const { ctx, props, node, value, caret, currentScrollX } = options;

  const style = node.widget.style as TextInputStyle | undefined;

  if (!style) return currentScrollX;

  const fontAtlas = ctx.fontManager.get(props.font);
  const padding = resolveSpacing(style.padding, node.width);
  const visibleWidth = node.width - padding.left - padding.right;
  const caretX = fontAtlas.measureText({
    text: value.substring(0, caret),
    fontSize: style.fontSize,
    letterSpacing: style.letterSpacing,
  }).width;

  return recomputeTextInputScrollX({
    caretX,
    currentScrollX,
    visibleWidth,
  });
}
