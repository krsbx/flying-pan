import type { InteractionProps } from '../../interactions';
import { WidgetType } from '../constant';
import type { WidgetProps } from '../styles';
import { Metrics, Palette } from '../styles';
import type { TextInputStyle, WidgetDescriptor } from '../styles/types';
import {
  createTextInputCharHandler,
  createTextInputKeyHandler,
} from './handler';

export interface TextInputProps extends WidgetProps, InteractionProps {
  font: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  style?: TextInputStyle;
}

export interface TextInputState {
  value: string;
  caret: number;
}

export function TextInput(props: TextInputProps): WidgetDescriptor {
  const {
    value,
    defaultValue,
    placeholder,
    onChange,
    disabled,
    onChar: userOnChar,
    onKeyDown: userOnKeyDown,
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onClick,
    onPointerEnter,
    onPointerLeave,
    onKeyUp,
    onFocus,
    onBlur,
    key,
    onMount,
    onUnmount,
    onUpdate,
    style,
    font,
    ...rest
  } = props;

  const internalProps = {
    value,
    defaultValue,
    placeholder,
    onChange,
    disabled,
    font,
    style,
  };

  return {
    type: WidgetType.TextInput,
    props: { value, defaultValue, placeholder, disabled, font, ...rest },
    style: {
      padding: Metrics.defaultPadding,
      borderRadius: Metrics.inputRadius,
      borderWidth: Metrics.borderWidth,
      borderColor: Palette.border,
      backgroundColor: Palette.surface,
      color: Palette.text,
      focusable: !disabled,
      ...style,
      _focus: {
        borderColor: Palette.borderFocus,
        ...style?._focus,
      },
      _disabled: {
        opacity: 0.5,
        ...style?._disabled,
      },
    },
    onChar: (event) => {
      createTextInputCharHandler(internalProps)(event);
      userOnChar?.(event);
    },
    onKeyDown: (event) => {
      createTextInputKeyHandler(internalProps)(event);
      userOnKeyDown?.(event);
    },
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onClick,
    onPointerEnter,
    onPointerLeave,
    onKeyUp,
    onFocus,
    onBlur,
    key,
    onMount,
    onUnmount,
    onUpdate,
  };
}
