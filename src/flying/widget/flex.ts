import type { InteractionProps } from '@flying/interactions';
import { WidgetType, type FlexDirection } from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface FlexProps extends WidgetProps, InteractionProps {
  direction: FlexDirection;
  gap?: number;
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
  style?: ViewStyle;
  children?: WidgetDescriptor[];
}

export function Flex(props: FlexProps): WidgetDescriptor {
  const {
    children,
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
    ...rest
  } = props;

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
  };
}
