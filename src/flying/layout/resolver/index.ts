import type { Resolution } from '@flying/types';
import { resolveSize, WidgetType } from '@flying/widget';
import { resolveImageSize } from './image';
import { resolveLabelSize } from './label';
import {
  resolveCircularProgressSize,
  resolveProgressBarSize,
} from './progress';
import { resolveTextInputSize } from './text-input';
import type { ResolveChildSizeOptions } from './types';

export function resolveChildSize(options: ResolveChildSizeOptions): Resolution {
  const { widget, parentHeight, parentWidth } = options;

  const size = {
    width: resolveSize(widget.style?.width, parentWidth),
    height: resolveSize(widget.style?.height, parentHeight),
  };

  switch (options.widget.type) {
    case WidgetType.Image:
      resolveImageSize({
        ...options,
        size,
      });
      break;

    case WidgetType.Label:
      resolveLabelSize({
        ...options,
        size,
      });
      break;

    case WidgetType.TextInput:
      resolveTextInputSize({
        ...options,
        size,
      });
      break;

    case WidgetType.ProgressBar:
      resolveProgressBarSize({
        ...options,
        size,
      });
      break;

    case WidgetType.CircularProgress:
      resolveCircularProgressSize({
        ...options,
        size,
      });
      break;

    default:
      break;
  }

  return size;
}
