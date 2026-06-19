import type { InteractionProps } from '@flying/interactions';
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
    onPointerMove,
    onClick,
    onPointerEnter,
    onPointerLeave,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    style,
    ...rest
  } = props;

  return {
    type: WidgetType.Image,
    props: rest,
    style,
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
  };
}
