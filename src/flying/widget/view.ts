import { WidgetType } from './constant';
import type { ViewStyle, WidgetDescriptor } from './styles';

export interface ViewProps extends Omit<WidgetDescriptor, 'type' | 'props'> {
  style?: ViewStyle;
  children?: WidgetDescriptor[];
}

export function View(props: ViewProps): WidgetDescriptor {
  const {
    children,
    onPointerDown,
    onPointerUp,
    onClick,
    onPointerEnter,
    onPointerLeave,
    style,
    ...rest
  } = props;

  return {
    type: WidgetType.View,
    props: rest,
    style,
    children,
    onPointerDown,
    onPointerUp,
    onClick,
    onPointerEnter,
    onPointerLeave,
  };
}
