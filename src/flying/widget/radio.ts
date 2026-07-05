import type { InteractionProps } from '@flying/interactions';
import { WidgetType } from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface RadioProps extends WidgetProps, InteractionProps {
  value: string;
  selected?: boolean;
  label?: string | WidgetDescriptor;
  disabled?: boolean;
  name?: string;
  groupDefaultValue?: string;
  style?: ViewStyle;
  dotStyle?: ViewStyle;
  /** Required if `label` is a string */
  font?: string;
  dotSize?: number;
}

export function Radio(props: RadioProps): WidgetDescriptor {
  const {
    value,
    selected,
    label,
    disabled = false,
    dotStyle,
    dotSize,
    name,
    groupDefaultValue,
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
    type: WidgetType.Radio,
    props: {
      value,
      selected,
      label,
      disabled,
      dotStyle: {
        ...dotStyle,
        backgroundColor: '#1a73e8',
        ...style,
        _checked: {
          backgroundColor: '#1a73e8',
          ...style?._checked,
        },
        _focus: {
          backgroundColor: '#1a73e8',
          ...style?._focus,
        },
      },
      dotSize,
      name,
      groupDefaultValue,
      ...rest,
    },
    style: {
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: '#9ca3af',
      focusable: !disabled,
      backgroundColor: '#ffffff',
      ...style,
      _checked: {
        borderColor: '#1a73e8',
        ...style?._checked,
      },
      _focus: {
        borderColor: '#1a73e8',
        borderWidth: 2,
        ...style?._focus,
      },
    },
    onClick,
    onPointerDown,
    onPointerUp,
    onPointerMove,
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
