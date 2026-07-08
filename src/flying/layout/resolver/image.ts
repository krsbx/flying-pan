import { type ImageProps } from '@flying/widget';
import type { ResolveWidgetSizeOptions } from './types';

export function resolveImageSize(options: ResolveWidgetSizeOptions): void {
  const props = options.widget.props as ImageProps;

  if (options.size.width || options.size.height) return;

  const info = options.ctx.textureManager?.info?.(props.src);

  if (info) {
    options.size.width ||= props.width || info.width;
    options.size.height ||= props.height || info.height;
  }
}
