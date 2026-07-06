import type { InteractionProps } from '@flying/interactions';
import { WidgetType } from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';
import { Metrics, Palette } from './styles';

export interface ButtonProps extends WidgetProps, InteractionProps {
  style?: ViewStyle;
  children?: WidgetDescriptor[];
  disabled?: boolean;
}

export function Button(props: ButtonProps): WidgetDescriptor {
  const {
    children,
    disabled,
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
      padding: Metrics.defaultPadding,
      borderRadius: Metrics.buttonRadius,
      borderWidth: Metrics.borderWidth,
      borderColor: Palette.border,
      backgroundColor: Palette.surface,
      focusable: !disabled,
      ...style,
      _hover: {
        backgroundColor: Palette.surfaceHover,
        ...style?._hover,
      },
      _focus: {
        borderColor: Palette.borderFocus,
        ...style?._focus,
      },
      _active: {
        backgroundColor: Palette.surfaceActive,
        ...style?._active,
      },
      _disabled: {
        opacity: 0.5,
        ...style?._disabled,
      },
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
