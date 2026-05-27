import { WidgetType, type FlexDirection } from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface FlexProps extends WidgetProps {
  direction: FlexDirection;
  gap?: number;
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
  style?: ViewStyle;
  children?: WidgetDescriptor[];
}

export function Flex(props: FlexProps): WidgetDescriptor {
  const { children, ...rest } = props;

  return {
    type: WidgetType.Flex,
    props: rest,
    style: {
      flexDirection: props.direction,
      gap: props.gap,
      justifyContent: props.justifyContent,
      alignItems: props.alignItems,
      ...props.style,
    },
    children,
  };
}
