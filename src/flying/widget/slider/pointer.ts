import { GLFW_MOUSE_BUTTON_LEFT } from '@/library/glfw/enums';
import type { PointerEvent, PointerEventHandler } from '@flying/interactions';
import { clamp } from '@utility/common';
import type { SliderBarProps } from '.';
import { SliderOrientation } from '../constant';
import { makeSliderState } from './state';
import { pointerToValue } from './utility';

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
