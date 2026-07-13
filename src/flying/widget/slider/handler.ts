import type {
  ClickEvent,
  ClickEventHandler,
  KeyEvent,
  KeyEventHandler,
} from '@flying/interactions';
import { valueToRatio } from '@flying/utility/common';
import {
  GLFW_KEY_DOWN,
  GLFW_KEY_END,
  GLFW_KEY_HOME,
  GLFW_KEY_LEFT,
  GLFW_KEY_RIGHT,
  GLFW_KEY_UP,
  GLFW_MOD_SHIFT,
} from '@glfw/enums';
import { clamp } from '@utility/common';
import { ProgressBarOrientation, RangeHandle } from '../constant';
import type { SliderBarProps } from './bar';
import type { CircularSliderProps } from './circular';
import { DEFAULT_THICKNESS } from './constant';
import { makeRangeSliderState, makeSliderState } from './state';
import type { RangeSliderProps, RangeSliderState, SliderProps } from './types';
import {
  isOnBarHandle,
  isOnCircularHandle,
  pointerToAngleValue,
  pointerToValue,
  resolveGeometry,
} from './utility';

export function createSliderBarClickHandler(
  props: SliderBarProps
): ClickEventHandler {
  return (event: ClickEvent) => {
    if (props.disabled) return;

    const { node, stateStore, position } = event;
    const min = props.min ?? 0;
    const max = props.max ?? 100;
    const isVertical = props.orientation === ProgressBarOrientation.Vertical;

    // Skip if click landed on the handle — handle clicks don't jump.
    const current =
      props.value ??
      stateStore.stateFor<number>({
        stableId: node.stableId,
        initial: props.defaultValue ?? min,
      });
    const ratio = valueToRatio({ value: current, min, max });

    if (isOnBarHandle({ position, node, ratio, isVertical })) return;

    const raw = pointerToValue({
      coord: isVertical ? position.y : position.x,
      start: isVertical ? node.screenY : node.screenX,
      length: isVertical ? node.height : node.width,
      flip: isVertical,
      min,
      max,
      step: props.step,
    });
    const next = clamp({ value: raw, min, max });

    if (props.value !== undefined) {
      props.onChange?.(next);
      return;
    }

    if (next === current) return;

    stateStore.setState({ stableId: node.stableId, value: next });
    props.onChange?.(next);
  };
}

export function createSliderKeyHandler(props: SliderProps): KeyEventHandler {
  return (event: KeyEvent) => {
    if (props.disabled) return;

    const { node, stateStore } = event;

    const min = props.min ?? 0;
    const max = props.max ?? 100;
    const step = props.step ?? 1;
    const shift = (event.modifiers & GLFW_MOD_SHIFT) !== 0;
    const delta = step * (shift ? 10 : 1);

    const current =
      props.value !== undefined
        ? props.value
        : stateStore.stateFor<number>({
            stableId: node.stableId,
            initial: makeSliderState(props),
          });

    let next: number;

    switch (event.key) {
      case GLFW_KEY_LEFT:
      case GLFW_KEY_DOWN:
        next = current - delta;
        break;

      case GLFW_KEY_RIGHT:
      case GLFW_KEY_UP:
        next = current + delta;
        break;

      case GLFW_KEY_HOME:
        next = min;
        break;

      case GLFW_KEY_END:
        next = max;
        break;

      default:
        return;
    }

    next = clamp({ value: next, min, max });

    if (next === current) return;

    if (props.value !== undefined) {
      props.onChange?.(next);
    } else {
      stateStore.setState({ stableId: node.stableId, value: next });
      props.onChange?.(next);
    }
  };
}

export function createCircularSliderClickHandler(
  props: CircularSliderProps
): ClickEventHandler {
  return (event: ClickEvent) => {
    if (props.disabled) return;

    const { node, stateStore, position } = event;
    const geo = resolveGeometry(props, node);

    // Skip if click landed on the handle — handle clicks don't jump.
    const current =
      props.value ??
      stateStore.stateFor<number>({
        stableId: node.stableId,
        initial: makeSliderState(props),
      });

    if (
      isOnCircularHandle({
        position,
        geo,
        value: current,
        size: props.size ?? node.width,
        thickness: props.thickness ?? DEFAULT_THICKNESS,
      })
    )
      return;

    const raw = pointerToAngleValue({
      pointerX: position.x,
      pointerY: position.y,
      cx: geo.cx,
      cy: geo.cy,
      startAngle: geo.startAngle,
      sweep: geo.sweep,
      direction: geo.direction,
      min: geo.min,
      max: geo.max,
      step: props.step,
    });
    const next = clamp({ value: raw, min: geo.min, max: geo.max });

    if (props.value !== undefined) {
      props.onChange?.(next);
      return;
    }

    if (next === current) return;

    stateStore.setState({ stableId: node.stableId, value: next });
    props.onChange?.(next);
  };
}

export function createRangeSliderKeyHandler(
  props: RangeSliderProps
): KeyEventHandler {
  return (event: KeyEvent) => {
    if (props.disabled) return;

    const { node, stateStore } = event;
    const min = props.min ?? 0;
    const max = props.max ?? 100;
    const step = props.step ?? 1;
    const shift = (event.modifiers & GLFW_MOD_SHIFT) !== 0;
    const delta = step * (shift ? 10 : 1);

    const state: RangeSliderState =
      props.value !== undefined
        ? {
            start: props.value[0],
            end: props.value[1],
            activeHandle: RangeHandle.End,
          }
        : stateStore.stateFor<RangeSliderState>({
            stableId: node.stableId,
            initial: makeRangeSliderState(props),
          });

    const isStart = state.activeHandle === RangeHandle.Start;
    const current = isStart ? state.start : state.end;

    let next: number;

    switch (event.key) {
      case GLFW_KEY_LEFT:
      case GLFW_KEY_DOWN:
        next = current - delta;
        break;

      case GLFW_KEY_RIGHT:
      case GLFW_KEY_UP:
        next = current + delta;
        break;

      case GLFW_KEY_HOME:
        next = min;
        break;

      case GLFW_KEY_END:
        next = max;
        break;

      default:
        return;
    }

    next = clamp({ value: next, min, max });
    next = isStart ? Math.min(next, state.end) : Math.max(next, state.start);

    if (next === current) return;

    const range: [number, number] = isStart
      ? [next, state.end]
      : [state.start, next];

    if (props.value !== undefined) {
      props.onChange?.(range);
    } else {
      stateStore.setState({
        stableId: node.stableId,
        value: { ...state, start: range[0], end: range[1] },
      });
      props.onChange?.(range);
    }
  };
}
