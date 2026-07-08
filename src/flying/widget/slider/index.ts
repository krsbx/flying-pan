import type { InteractionProps } from '@flying/interactions';
import { SliderOrientation, WidgetType } from '../constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from '../styles';
import { Metrics, Palette } from '../styles';
import { HANDLE_SIZE, TRACK_THICKNESS } from './constant';
import {
  createSliderBarClickHandler,
  createSliderBarKeyHandler,
} from './handler';
import { createSliderBarPointerHandler } from './pointer';

export interface SliderBarProps extends WidgetProps, InteractionProps {
  /** Controlled value. When set, the widget is controlled — parent must update. */
  value?: number;

  /** Uncontrolled initial value. Used only on first paint. */
  defaultValue?: number;

  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  orientation?: SliderOrientation;
  style?: ViewStyle;
  trackStyle?: ViewStyle;
  filledStyle?: ViewStyle;
  handleStyle?: ViewStyle;
}

export function SliderBar(props: SliderBarProps): WidgetDescriptor {
  const {
    value,
    defaultValue,
    min,
    max,
    step,
    onChange,
    disabled,
    orientation,
    onClick,
    onKeyDown,
    onPointerDown,
    onPointerUp,
    onPointerMove,
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
    trackStyle,
    filledStyle,
    handleStyle,
    ...rest
  } = props;

  const internalProps = {
    value,
    defaultValue,
    min,
    max,
    step,
    onChange,
    disabled,
    orientation,
  };

  const pointerHandler = createSliderBarPointerHandler(internalProps);
  const clickHandler = createSliderBarClickHandler(internalProps);
  const keyHandler = createSliderBarKeyHandler(internalProps);

  const isHorizontal = orientation === SliderOrientation.Horizontal;

  return {
    type: WidgetType.SliderBar,
    props: {
      ...internalProps,
      trackStyle: {
        backgroundColor: Palette.surfaceActive,
        borderRadius: TRACK_THICKNESS / 2,
        ...trackStyle,
        _disabled: {
          opacity: 0.5,
          ...trackStyle?._disabled,
        },
      },
      filledStyle: {
        backgroundColor: Palette.accent,
        borderRadius: TRACK_THICKNESS / 2,
        ...filledStyle,
        _disabled: {
          opacity: 0.5,
          ...filledStyle?._disabled,
        },
      },
      handleStyle: {
        backgroundColor: Palette.surface,
        borderWidth: Metrics.borderWidth,
        borderColor: Palette.border,
        borderRadius: HANDLE_SIZE / 2,
        ...handleStyle,
        _disabled: {
          opacity: 0.5,
          ...handleStyle?._disabled,
        },
      },
      ...rest,
    },
    style: {
      width: isHorizontal ? 200 : 24,
      height: isHorizontal ? 24 : 200,
      focusable: !disabled,
      backgroundColor: 'transparent',
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
    onClick: (event) => {
      clickHandler(event);
      onClick?.(event);
    },
    onKeyDown: (event) => {
      keyHandler(event);
      onKeyDown?.(event);
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
