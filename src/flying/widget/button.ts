import type { InteractionProps } from '@flying/interactions';
import { WidgetType } from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface ButtonProps extends WidgetProps, InteractionProps {
  style?: ViewStyle;
  children?: WidgetDescriptor[];
}

export function Button(props: ButtonProps): WidgetDescriptor {
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
    style,
    ...rest
  } = props;

  return {
    type: WidgetType.Button,
    props: rest,
    style,
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
