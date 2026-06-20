import type { Window } from '@/flying/app';
import type { CheckboxProps, ViewStyle } from '@/flying/widget';
import type { PaintOptions } from '../types';

const CHECK_COLOR = '#ffffff';

const CHECK_INSET = 0.5;

export function paintCheckbox(
  window: Window,
  options: PaintOptions & { style: ViewStyle }
) {
  const { renderer, ctx, layout, style } = options;
  const { widget, x, y, width, height } = layout;
  const props = widget.props as CheckboxProps;

  const current =
    props.value ??
    ctx.stateStore.stateFor({
      stableId: layout.stableId,
      initial: props.defaultValue ?? false,
    });

  if (!current) return;

  const markWidth = width * (props.tickSize ?? CHECK_INSET);
  const markHeight = height * (props.tickSize ?? CHECK_INSET);
  const markX = x + (width - markWidth) / 2;
  const markY = y + (height - markHeight) / 2;

  renderer.drawRect(window, {
    x: markX,
    y: markY,
    width: markWidth,
    height: markHeight,
    color: style.backgroundColor ?? CHECK_COLOR,
    opacity: style.opacity,
    borderRadius: style.borderRadius,
  });
}
