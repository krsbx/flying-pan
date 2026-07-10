import type { InteractionProps } from '@flying/interactions';
import { CircularProgressDirection, WidgetType } from '../constant';
import type { WidgetDescriptor, WidgetProps } from '../styles';
import { Metrics, Palette } from '../styles';
import {
  DEFAULT_SIZE,
  DEFAULT_START_ANGLE,
  DEFAULT_SWEEP,
  DEFAULT_THICKNESS,
  HANDLE_SIZE,
} from './constant';
import {
  createCircularSliderClickHandler,
  createSliderKeyHandler,
} from './handler';
import { createCircularSliderPointerHandler } from './pointer';
import type { SliderProps } from './types';

export interface CircularSliderProps
  extends SliderProps, WidgetProps, InteractionProps {
  /** Diameter in px. Widget is size × size. Default 48. */
  size?: number;

  /** Ring thickness as fraction of radius (0–1). >= 1 renders as pie. Default 0.15. */
  thickness?: number;

  /** Starting angle in radians. Default -π/2 (top / 12 o'clock). */
  startAngle?: number;

  /** Arc length in radians. Default 2π (full circle). 1.5π = 270° with gap. */
  sweep?: number;

  /** Rotation direction. Default clockwise. */
  direction?: CircularProgressDirection;
}

export function CircularSlider(props: CircularSliderProps): WidgetDescriptor {
  const {
    value,
    defaultValue,
    min,
    max,
    step,
    onChange,
    disabled,
    size,
    thickness,
    startAngle,
    sweep,
    direction,
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

  const resolvedSize = size ?? DEFAULT_SIZE;

  const internalProps = {
    value,
    defaultValue,
    min,
    max,
    step,
    onChange,
    disabled,
    size: resolvedSize,
    thickness: thickness ?? DEFAULT_THICKNESS,
    startAngle: startAngle ?? DEFAULT_START_ANGLE,
    sweep: sweep ?? DEFAULT_SWEEP,
    direction: direction ?? CircularProgressDirection.Clockwise,
  };

  const clickHandler = createCircularSliderClickHandler(internalProps);
  const keyHandler = createSliderKeyHandler(internalProps);
  const pointerHandler = createCircularSliderPointerHandler(internalProps);

  return {
    type: WidgetType.CircularSlider,
    props: {
      ...internalProps,
      trackStyle: {
        backgroundColor: Palette.surfaceActive,
        ...trackStyle,
        _disabled: {
          opacity: 0.5,
          ...trackStyle?._disabled,
        },
      },
      filledStyle: {
        backgroundColor: Palette.accent,
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
      width: resolvedSize,
      height: resolvedSize,
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
