import type { InteractionProps } from '@flying/interactions';
import { WidgetType } from './constant';
import type { TextStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface LabelProps extends WidgetProps, InteractionProps {
  text: string;
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
    style,
    ...rest
  } = props;

  return {
    type: WidgetType.Label,
    props: rest,
    style,
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onClick,
    onPointerEnter,
    onPointerLeave,
  };
}

export interface TextProps extends WidgetProps {
  content: string;
  style?: TextStyle;
}

export function Text(props: TextProps): WidgetDescriptor {
  return Label({ ...props, text: props.content });
}
