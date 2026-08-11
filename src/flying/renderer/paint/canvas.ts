import type { CanvasProps } from '@/flying/widget';
import type { Window } from '@flying/app';
import { CanvasContext } from '../context';
import type { PaintOptions } from './types';

export function paintCanvas(window: Window, options: PaintOptions): void {
  const { renderer, ctx, layout } = options;

  const props = layout.widget.props as CanvasProps;

  if (!props.draw) return;

  renderer.pushClip(window, {
    x: layout.screenX,
    y: layout.screenY,
    width: layout.width,
    height: layout.height,
  });

  renderer.pushTranslate(window, {
    x: layout.x,
    y: layout.y,
  });

  const canvasCtx = new CanvasContext({
    fontManager: ctx.fontManager,
    renderer,
    window,
  });

  if (props.font) {
    canvasCtx.font = props.font;
  }

  props.draw({ ctx: canvasCtx });

  renderer.popTranslate(window);
  renderer.popClip(window);
}
