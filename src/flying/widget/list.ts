import { FlexDirection, Overflow, WidgetType } from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface ListProps
  extends WidgetProps, Omit<WidgetDescriptor, 'type' | 'props' | 'children'> {
  itemCount: number;
  /** Row height, will be use on vertical list */
  rowHeight: number;
  renderItem: (index: number) => WidgetDescriptor;
  /** Extra items rendered above and below the viewport. @default 3 */
  overscan?: number;
  style?: ViewStyle;
}

export function List(props: ListProps): WidgetDescriptor {
  const {
    itemCount,
    rowHeight,
    renderItem,
    overscan = 3,
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
  } = props;

  return {
    type: WidgetType.List,
    props: { itemCount, rowHeight, renderItem, overscan },
    style: {
      flexDirection: FlexDirection.Column,
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
