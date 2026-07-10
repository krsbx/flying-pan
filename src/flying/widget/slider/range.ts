import type { InteractionProps } from '@flying/interactions';
import { ProgressBarOrientation, WidgetType } from '../constant';
import type { WidgetDescriptor, WidgetProps } from '../styles';
import { Metrics, Palette } from '../styles';
import { HANDLE_SIZE, TRACK_THICKNESS } from './constant';
import { createRangeSliderKeyHandler } from './handler';
import { createRangeSliderBarPointerHandler } from './pointer';
import type { RangeSliderProps } from './types';

export interface RangeSliderBarProps
  extends RangeSliderProps, WidgetProps, InteractionProps {
  orientation?: ProgressBarOrientation;
}

export function RangeSliderBar(props: RangeSliderBarProps): WidgetDescriptor {
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

  const pointerHandler = createRangeSliderBarPointerHandler(internalProps);
  const keyHandler = createRangeSliderKeyHandler(internalProps);

  const isHorizontal = orientation === ProgressBarOrientation.Horizontal;

  return {
    type: WidgetType.RangeSlider,
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
    onClick,
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
