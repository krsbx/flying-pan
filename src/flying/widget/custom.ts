import type { CustomPaintOptions } from '../renderer/paint/types';
import { WidgetType } from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface CustomProps
  extends Omit<WidgetDescriptor, 'type' | 'props'>, WidgetProps {
  style?: ViewStyle;
  paint: (options: CustomPaintOptions) => void;
}

export function Custom(props: CustomProps): WidgetDescriptor {
  const {
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
    ...rest
  } = props;

  return {
    type: WidgetType.Custom,
    props: rest,
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
