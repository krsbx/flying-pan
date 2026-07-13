import type { PointerEvent, PointerEventHandler } from '@flying/interactions';
import { valueToRatio } from '@flying/utility/common';
import { GLFW_MOUSE_BUTTON_LEFT } from '@glfw/enums';
import { clamp } from '@utility/common';
import { ProgressBarOrientation, RangeHandle } from '../constant';
import type { SliderBarProps } from './bar';
import type { CircularSliderProps } from './circular';
import { DEFAULT_THICKNESS, HANDLE_SIZE } from './constant';
import type { RangeSliderBarProps } from './range';
import { makeRangeSliderState, makeSliderState } from './state';
import type { RangeSliderState } from './types';
import {
  isOnBarHandle,
  isOnCircularHandle,
  pointerToAngleValue,
  pointerToValue,
  resolveGeometry,
} from './utility';

export function createSliderBarPointerHandler(props: SliderBarProps): {
  onPointerDown: PointerEventHandler;
  onPointerMove: PointerEventHandler;
} {
  const isVertical = props.orientation === ProgressBarOrientation.Vertical;
  const min = props.min ?? 0;
  const max = props.max ?? 100;

  function applyValue(event: PointerEvent): void {
    if (props.disabled) return;

    const { node, stateStore, position } = event;

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

    // Controlled — parent must re-render with the new value.
    if (props.value !== undefined) {
      if (next === props.value) return;
      props.onChange?.(next);
      return;
    }

    // Uncontrolled — persist + notify, skipping no-op writes.
    const current = stateStore.stateFor<number>({
      stableId: node.stableId,
      initial: makeSliderState(props),
    });

    if (next === current) return;

    stateStore.setState({ stableId: node.stableId, value: next });
    props.onChange?.(next);
  }

  function readCurrent(event: PointerEvent): number {
    return (
      props.value ??
      event.stateStore.stateFor<number>({
        stableId: event.node.stableId,
        initial: makeSliderState(props),
      })
    );
  }

  return {
    onPointerDown: (event) => {
      if (props.disabled) return;

      const current = readCurrent(event);
      const ratio = valueToRatio({ value: current, min, max });

      // Track press → jump. Handle press → drag from current (no jump).
      if (
        !isOnBarHandle({
          position: event.position,
          node: event.node,
          ratio,
          isVertical,
        })
      ) {
        applyValue(event);
      }

      event.capturePointer?.();
    },
    onPointerMove: (event) => {
      if (!event.input.isMouseDown(GLFW_MOUSE_BUTTON_LEFT)) return;

      applyValue(event);
    },
  };
}

export function createCircularSliderPointerHandler(
  props: CircularSliderProps
): {
  onPointerDown: PointerEventHandler;
  onPointerMove: PointerEventHandler;
} {
  function applyValue(event: PointerEvent): void {
    if (props.disabled) return;

    const { node, stateStore, position } = event;
    const geo = resolveGeometry(props, node);

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
      if (next === props.value) return;
      props.onChange?.(next);
      return;
    }

    const current = stateStore.stateFor<number>({
      stableId: node.stableId,
      initial: makeSliderState(props),
    });

    if (next === current) return;

    stateStore.setState({ stableId: node.stableId, value: next });
    props.onChange?.(next);
  }

  function readCurrent(event: PointerEvent): number {
    return (
      props.value ??
      event.stateStore.stateFor<number>({
        stableId: event.node.stableId,
        initial: makeSliderState(props),
      })
    );
  }

  return {
    onPointerDown: (event) => {
      if (props.disabled) return;

      const { node, position } = event;
      const geo = resolveGeometry(props, node);
      const current = readCurrent(event);

      if (
        !isOnCircularHandle({
          position,
          geo,
          value: current,
          size: props.size ?? node.width,
          thickness: props.thickness ?? DEFAULT_THICKNESS,
        })
      ) {
        applyValue(event);
      }

      event.capturePointer?.();
    },
    onPointerMove: (event) => {
      if (!event.input.isMouseDown(GLFW_MOUSE_BUTTON_LEFT)) return;

      applyValue(event);
    },
  };
}

export function createRangeSliderBarPointerHandler(
  props: RangeSliderBarProps
): {
  onPointerDown: PointerEventHandler;
  onPointerMove: PointerEventHandler;
} {
  const isVertical = props.orientation === ProgressBarOrientation.Vertical;
  const min = props.min ?? 0;
  const max = props.max ?? 100;

  function readState(event: PointerEvent): RangeSliderState {
    return event.stateStore.stateFor<RangeSliderState>({
      stableId: event.node.stableId,
      initial: makeRangeSliderState(props),
    });
  }

  function applyValue(event: PointerEvent): void {
    const { node, stateStore, position } = event;
    const state = readState(event);

    const raw = pointerToValue({
      coord: isVertical ? position.y : position.x,
      start: isVertical ? node.screenY : node.screenX,
      length: isVertical ? node.height : node.width,
      flip: isVertical,
      min,
      max,
      step: props.step,
    });

    let nextStart = state.start;
    let nextEnd = state.end;

    if (state.activeHandle === RangeHandle.Start) {
      nextStart = Math.min(raw, state.end);
    } else {
      nextEnd = Math.max(raw, state.start);
    }

    if (nextStart === state.start && nextEnd === state.end) return;

    if (props.value !== undefined) {
      props.onChange?.([nextStart, nextEnd]);
      return;
    }

    stateStore.setState({
      stableId: node.stableId,
      value: { ...state, start: nextStart, end: nextEnd },
    });

    props.onChange?.([nextStart, nextEnd]);
  }

  function pickNearestHandle(event: PointerEvent): RangeHandle {
    const { node, position } = event;
    const state = readState(event);

    const startRatio = valueToRatio({ value: state.start, min, max });
    const endRatio = valueToRatio({ value: state.end, min, max });

    const startPx = isVertical
      ? node.screenY +
        (1 - startRatio) * (node.height - HANDLE_SIZE) +
        HANDLE_SIZE / 2
      : node.screenX +
        startRatio * (node.width - HANDLE_SIZE) +
        HANDLE_SIZE / 2;

    const endPx = isVertical
      ? node.screenY +
        (1 - endRatio) * (node.height - HANDLE_SIZE) +
        HANDLE_SIZE / 2
      : node.screenX + endRatio * (node.width - HANDLE_SIZE) + HANDLE_SIZE / 2;

    const pointerPx = isVertical ? position.y : position.x;

    return Math.abs(pointerPx - startPx) <= Math.abs(pointerPx - endPx)
      ? RangeHandle.Start
      : RangeHandle.End;
  }

  return {
    onPointerDown: (event) => {
      if (props.disabled) return;

      const { node, stateStore, position } = event;
      const state = readState(event);

      const startRatio = valueToRatio({ value: state.start, min, max });
      const endRatio = valueToRatio({ value: state.end, min, max });

      const onStart = isOnBarHandle({
        position,
        node,
        ratio: startRatio,
        isVertical,
      });

      const onEnd = isOnBarHandle({
        position,
        node,
        ratio: endRatio,
        isVertical,
      });

      let activeHandle: RangeHandle;

      if (onStart) {
        activeHandle = RangeHandle.Start;
      } else if (onEnd) {
        activeHandle = RangeHandle.End;
      } else {
        activeHandle = pickNearestHandle(event);
      }

      stateStore.setState({
        stableId: node.stableId,
        value: { ...state, activeHandle },
      });

      // Only jump when pressing the track, not a handle.
      if (!onStart && !onEnd) {
        applyValue(event);
      }

      event.capturePointer?.();
    },
    onPointerMove: (event) => {
      if (!event.input.isMouseDown(GLFW_MOUSE_BUTTON_LEFT)) return;

      applyValue(event);
    },
  };
}
