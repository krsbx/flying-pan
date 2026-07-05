import type { InteractionProps } from '@flying/interactions';
import type { ValidColor } from '../types';
import { WidgetType } from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';
import { Metrics, Palette } from './styles';

export interface RadioProps extends WidgetProps, InteractionProps {
  value: string;
  selected?: boolean;
  label?: string | WidgetDescriptor;
  /** Label color. */
  labelColor?: ValidColor;
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
    labelColor,
    font,
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
      labelColor,
      font,
      disabled,
      dotStyle: {
        backgroundColor: Palette.accent,
        ...dotStyle,
        _disabled: {
          opacity: 0.5,
          ...dotStyle?._disabled,
        },
      },
      dotSize,
      name,
      groupDefaultValue,
      ...rest,
    },
    style: {
      width: Metrics.controlSize,
      height: Metrics.controlSize,
      borderRadius: Metrics.controlSize / 2,
      borderWidth: Metrics.borderWidth,
      borderColor: Palette.border,
      focusable: !disabled,
      backgroundColor: Palette.surface,
      ...style,
      _checked: {
        borderColor: Palette.accent,
        ...style?._checked,
      },
      _focus: {
        borderColor: Palette.borderFocus,
        ...style?._focus,
      },
      _disabled: {
        opacity: 0.5,
        ...style?._disabled,
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
