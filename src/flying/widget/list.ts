import {
  FlexDirection,
  Overflow,
  ProgressBarOrientation,
  WidgetType,
} from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface ListProps
  extends WidgetProps, Omit<WidgetDescriptor, 'type' | 'props' | 'children'> {
  itemCount: number;
  itemSize: number;
  /** Orientation of the list @default "vertical" */
  orientation?: ProgressBarOrientation;
  renderItem: (index: number) => WidgetDescriptor;
  /** Extra items rendered above and below the viewport. @default 3 */
  overscan?: number;
  style?: ViewStyle;
}

export function List(props: ListProps): WidgetDescriptor {
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

  const orientation = props.orientation || ProgressBarOrientation.Vertical;
  const isHorizontal = orientation === ProgressBarOrientation.Horizontal;

  return {
    type: WidgetType.List,
    props: { ...rest, orientation },
    style: {
      flexDirection: isHorizontal ? FlexDirection.Row : FlexDirection.Column,
      overflow: Overflow.Scroll,
      width: '100%',
      height: '100%',
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
