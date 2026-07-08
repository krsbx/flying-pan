import type { InteractionProps } from '../../interactions';
import { ROOT_FONT_SIZE, WidgetType } from '../constant';
import type { WidgetProps } from '../styles';
import { Metrics, Palette } from '../styles';
import type { TextInputStyle, WidgetDescriptor } from '../styles/types';
import { createTextInputKeyHanlder } from './handler';
import { createTextInputPointerHandler } from './pointer';

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
  anchor: number;
  scrollX: number;
}

export function TextInput(props: TextInputProps): WidgetDescriptor {
  const {
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
    ...rest
  } = props;

  const internalProps = {
    onChange,
    disabled,
    style,
    ...rest,
  };

  const keyHandler = createTextInputKeyHanlder(internalProps);
  const pointerHandler = createTextInputPointerHandler(internalProps);

  return {
    type: WidgetType.TextInput,
    props: internalProps,
    style: {
      padding: Metrics.defaultPadding,
      borderRadius: Metrics.inputRadius,
      borderWidth: Metrics.borderWidth,
      borderColor: Palette.border,
      backgroundColor: Palette.surface,
      color: Palette.text,
      fontSize: ROOT_FONT_SIZE,
      placeholderColor: Palette.textMuted,
      caretColor: Palette.text,
      selectionColor: Palette.selection,
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
      _disabled: {
        opacity: 0.5,
        ...style?._disabled,
      },
    },
    onChar: (event) => {
      keyHandler.onChar(event);
      userOnChar?.(event);
    },
    onKeyDown: (event) => {
      keyHandler.onKeyDown(event);
      userOnKeyDown?.(event);
    },
    onPointerDown: (event) => {
      pointerHandler.onPointerDown(event);
      onPointerDown?.(event);
    },
    onPointerUp,
    onPointerMove: (event) => {
      pointerHandler.onPointerMove(event);
      onPointerMove?.(event);
    },
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
