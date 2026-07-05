import type { InteractionProps } from '@flying/interactions';
import { WidgetType } from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface ButtonProps extends WidgetProps, InteractionProps {
  style?: ViewStyle;
  children?: WidgetDescriptor[];
  disabled?: boolean;
}

export function Button(props: ButtonProps): WidgetDescriptor {
  const {
    children,
    disabled = false,
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
    style,
    ...rest
  } = props;

  return {
    type: WidgetType.Button,
    props: rest,
    style: {
      focusable: !disabled,
      ...style,
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
    key,
    onMount,
    onUnmount,
    onUpdate,
  };
}
