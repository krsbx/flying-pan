import type { ToggleProps } from '@/flying/widget/toggle';
import type { Window } from '@flying/app';
import {
  Overflow,
  WidgetType,
  type CheckboxProps,
  type RadioProps,
  type TextInputStyle,
  type TextStyle,
  type ViewStyle,
} from '@flying/widget';
import { paintCheckbox } from './checkbox';
import { paintImage } from './image';
import { paintRadio } from './radio';
import { paintText } from './text';
import { paintTextInput } from './text/input';
import { paintToggle } from './toggle';
import type { PaintOptions } from './types';
import { resolveStyle } from './utility';

export function paint(window: Window, options: PaintOptions) {
  const { renderer, ctx, layout } = options;
  const { widget, x, y, width, height, children } = layout;
  const baseStyle = widget.style ?? ({} as ViewStyle);

  const stableId = layout.stableId;
  const hovered = ctx.interactionManager.pointer.hoveredStableId === stableId;
  const focused = ctx.interactionManager.focus.focusedStableId === stableId;
  const pressed = ctx.interactionManager.pointer.pressedStableId === stableId;

  let checked = false;

  if (widget.type === WidgetType.Radio) {
    const radioProps = widget.props as RadioProps;

    if (radioProps.selected !== undefined) {
      checked = radioProps.selected;
    } else if (radioProps.name !== undefined) {
      const current = ctx.stateStore.stateForByName<string>({
        name: radioProps.name,
        initial: radioProps.groupDefaultValue ?? '',
      });

      checked = current === radioProps.value;
    }
  } else if (widget.type === WidgetType.Checkbox) {
    const cbProps = widget.props as CheckboxProps;

    checked =
      cbProps.value ??
      ctx.stateStore.stateFor<boolean>({
        stableId: layout.stableId,
        initial: cbProps.defaultValue ?? false,
      });
  } else if (widget.type === WidgetType.Toggle) {
    const toggleProps = widget.props as ToggleProps;

    checked =
      toggleProps.value ??
      ctx.stateStore.stateFor<boolean>({
        stableId: layout.stableId,
        initial: toggleProps.defaultValue ?? false,
      });
  }

  const style = resolveStyle({
    style: baseStyle,
    hovered,
    focused,
    pressed,
    checked,
  });

  const borderRadius = style.borderRadius;
  const opacity = style.opacity;

  // Drop shadow first, so its rendered behind the requested
  if (style.boxShadow) {
    const shadows = Array.isArray(style.boxShadow)
      ? style.boxShadow
      : [style.boxShadow];

    for (const shadow of shadows) {
      renderer.drawShadow(window, {
        x,
        y,
        width,
        height,
        shadow,
        borderRadius,
      });
    }
  }

  // Render the border by drawing a rectangle with a bigger size as the requested
  if (style.borderWidth && style.borderColor) {
    renderer.drawRect(window, {
      x: x - style.borderWidth / 2,
      y: y - style.borderWidth / 2,
      width: width + style.borderWidth,
      height: height + style.borderWidth,
      color: style.borderColor,
      borderRadius,
      opacity,
    });
  }

  if (style.backgroundColor) {
    renderer.drawRect(window, {
      x,
      y,
      width,
      height,
      color: style.backgroundColor,
      borderRadius,
      opacity,
    });
  }

  switch (widget.type) {
    case WidgetType.Image: {
      paintImage(window, {
        ctx,
        layout,
        renderer,
        style,
      });
      break;
    }

    case WidgetType.Label: {
      paintText(window, {
        ctx,
        layout,
        renderer,
        style: style as TextStyle,
      });
      break;
    }

    case WidgetType.TextInput: {
      paintTextInput(window, {
        ctx,
        layout,
        renderer,
        style: style as TextInputStyle,
        focused,
      });
      break;
    }

    case WidgetType.Checkbox: {
      paintCheckbox(window, {
        ctx,
        layout,
        renderer,
        style,
        checked,
      });
      break;
    }

    case WidgetType.Radio: {
      paintRadio(window, {
        ctx,
        layout,
        renderer,
        style,
        checked,
      });
      break;
    }

    case WidgetType.Toggle: {
      paintToggle(window, {
        ctx,
        layout,
        renderer,
        style,
        checked,
      });
      break;
    }
  }

  const overflow = style.overflow;
  const isScrollable =
    overflow === Overflow.Scroll || overflow === Overflow.Auto;
  const shouldClip =
    (overflow === Overflow.Hidden || isScrollable) && children.length > 0;

  if (shouldClip) {
    renderer.pushClip(window, { x, y, width, height });
  }

  if (isScrollable && children.length > 0) {
    const offset = ctx.interactionManager.scroll.offset(layout);
    renderer.pushTranslate(window, { x: -offset.x, y: -offset.y });
  }

  for (const child of children) {
    paint(window, {
      renderer,
      layout: child,
      ctx,
    });
  }

  if (isScrollable && children.length > 0) {
    renderer.popTranslate(window);
  }

  if (shouldClip) {
    renderer.popClip(window);
  }
}
