import type { InteractionProps } from '@flying/interactions';
import { WidgetType } from './constant';
import type { TextStyle, WidgetDescriptor, WidgetProps } from './styles';
import { Palette } from './styles';

export interface LabelProps extends WidgetProps, InteractionProps {
  text: string;
  font: string;
  style?: TextStyle;
}

export function Label(props: LabelProps): WidgetDescriptor {
  const {
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
    type: WidgetType.Label,
    props: rest,
    style: {
      color: Palette.text,
      ...style,
    },
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

export interface TextProps extends WidgetProps, InteractionProps {
  content: string;
  font: string;
  style?: TextStyle;
}

export function Text(props: TextProps): WidgetDescriptor {
  return Label({ ...props, text: props.content });
}
