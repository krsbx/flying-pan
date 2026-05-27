import { WidgetType } from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface ViewProps extends WidgetProps {
  style?: ViewStyle;
  children?: WidgetDescriptor[];
}

export function View(props: ViewProps): WidgetDescriptor {
  const { children, ...rest } = props;

  return {
    type: WidgetType.View,
    props: rest,
    style: props.style,
    children,
  };
}
