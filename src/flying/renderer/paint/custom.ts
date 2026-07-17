import type { CustomProps } from '@/flying/widget';
import type { Window } from '@flying/app';
import type { PaintOptions } from './types';

export function paintCustom(window: Window, options: PaintOptions): void {
  const { renderer, layout } = options;
  const props = layout.widget.props as CustomProps;

  if (!props.paint) return;

  props.paint({ window, renderer, ...layout });
}
