import { WidgetType } from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface ImageProps extends WidgetProps {
  src: string;
  width?: number;
  height?: number;
  style?: ViewStyle;
}

export function Image(props: ImageProps): WidgetDescriptor {
  return {
    type: WidgetType.Image,
    props,
    style: props.style,
  };
}
