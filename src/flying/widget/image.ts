import type { InteractionProps } from '@/flying/interactions/types';
import { WidgetType } from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface ImageProps extends WidgetProps, InteractionProps {
  src: string;
  width?: number;
  height?: number;
  style?: ViewStyle;
}

export function Image(props: ImageProps): WidgetDescriptor {
  const {
    onPointerDown,
    onPointerUp,
    onClick,
    onPointerEnter,
    onPointerLeave,
    style,
    ...rest
  } = props;

  return {
    type: WidgetType.Image,
    props: rest,
    style,
    onPointerDown,
    onPointerUp,
    onClick,
    onPointerEnter,
    onPointerLeave,
  };
}
