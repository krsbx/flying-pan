import { WidgetType } from './constant';
import type { TextStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface LabelProps extends WidgetProps {
  text: string;
  style?: TextStyle;
}

export function Label(props: LabelProps): WidgetDescriptor {
  return {
    type: WidgetType.Label,
    props,
    style: props.style,
  };
}

export interface TextProps extends WidgetProps {
  content: string;
  style?: TextStyle;
}

export function Text(props: TextProps): WidgetDescriptor {
  return Label({ ...props, text: props.content });
}
