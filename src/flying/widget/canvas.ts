import type { CanvasContext } from '../renderer/context';
import { WidgetType } from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface CanvasDrawOptions {
  ctx: CanvasContext;
}

export interface CanvasProps
  extends Omit<WidgetDescriptor, 'type' | 'props' | 'children'>, WidgetProps {
  style?: ViewStyle;
  font?: string;
  draw: (options: CanvasDrawOptions) => void;
}

export function Canvas(props: CanvasProps): WidgetDescriptor {
  const {
    style,
    font,
    draw,
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onClick,
    onPointerEnter,
    onPointerLeave,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    key,
    onMount,
    onUnmount,
    onUpdate,
    ...rest
  } = props;

  return {
    type: WidgetType.Canvas,
    props: { ...rest, font, draw },
    style,
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onClick,
    onPointerEnter,
    onPointerLeave,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    key,
    onMount,
    onUnmount,
    onUpdate,
  };
}
