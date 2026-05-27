import { WidgetType } from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface ButtonProps extends WidgetProps {
  onClick?: () => void;
  onHover?: (hovering: boolean) => void;
  style?: ViewStyle;
  children?: WidgetDescriptor[];
}

export function Button(props: ButtonProps): WidgetDescriptor {
  const { children, ...rest } = props;

  return {
    type: WidgetType.Button,
    props: rest,
    style: props.style,
    children,
  };
}
