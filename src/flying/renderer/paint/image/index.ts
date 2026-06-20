import type { Window } from '@/flying/app';
import type { ImageProps, ViewStyle } from '@/flying/widget';
import type { PaintOptions } from '../types';

export function paintImage(
  window: Window,
  options: PaintOptions & { style: ViewStyle }
) {
  const { renderer, ctx, layout, style } = options;
  const { widget, x, y, width, height } = layout;
  const src = (widget.props as ImageProps).src;
  const texture = ctx.textureManager?.get?.(src);

  if (texture) {
    renderer.drawTexture(window, {
      texture,
      x,
      y,
      width,
      height,
      opacity: style.opacity,
    });
  }
}
