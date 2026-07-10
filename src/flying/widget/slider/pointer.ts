import type { PointerEvent, PointerEventHandler } from '@flying/interactions';
import { GLFW_MOUSE_BUTTON_LEFT } from '@glfw/enums';
import { clamp } from '@utility/common';
import { SliderOrientation } from '../constant';
import type { SliderBarProps } from './bar';
import type { CircularSliderProps } from './circular';
import { makeSliderState } from './state';
import {
  pointerToAngleValue,
  pointerToValue,
  resolveGeometry,
} from './utility';

export function createSliderBarPointerHandler(props: SliderBarProps): {
  onPointerDown: PointerEventHandler;
  onPointerMove: PointerEventHandler;
} {
  const isVertical = props.orientation === SliderOrientation.Vertical;
  const min = props.min ?? 0;
  const max = props.max ?? 100;

  function applyValue(event: PointerEvent): void {
    if (props.disabled) return;

    const { node, stateStore, position } = event;

    const raw = pointerToValue({
      coord: isVertical ? position.y : position.x,
      start: isVertical ? node.y : node.x,
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

  return {
    onPointerDown: (event) => applyValue(event),
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

  return {
    onPointerDown: (event) => applyValue(event),
    onPointerMove: (event) => {
      if (!event.input.isMouseDown(GLFW_MOUSE_BUTTON_LEFT)) return;

      applyValue(event);
    },
  };
}
