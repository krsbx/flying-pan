import type { Window } from '@flying/app';
import {
  Overflow,
  WidgetType,
  type TextInputStyle,
  type TextStyle,
  type ViewStyle,
} from '@flying/widget';
import { paintCheckbox } from './checkbox';
import { paintImage } from './image';
import { paintProgressBar } from './progress';
import { paintRadio } from './radio';
import { paintText } from './text';
import { paintTextInput } from './text/input';
import { paintToggle } from './toggle';
import type { PaintOptions } from './types';
import {
  paintBorder,
  resolveStyle,
  resolveWidgetCheckedState,
} from './utility';

export function paint(window: Window, options: PaintOptions) {
  const { renderer, ctx, layout } = options;
  const { widget, x, y, width, height, children } = layout;
  const baseStyle = widget.style ?? ({} as ViewStyle);

  const stableId = layout.stableId;
  const hovered = ctx.interactionManager.pointer.hoveredStableId === stableId;
  const focused = ctx.interactionManager.focus.focusedStableId === stableId;
  const pressed = ctx.interactionManager.pointer.pressedStableId === stableId;
  const checked = resolveWidgetCheckedState({ widget, layout, ctx });
  const disabled = Boolean(widget.props.disabled);

  const style = resolveStyle({
    style: baseStyle,
    hovered,
    focused,
    pressed,
    checked,
    disabled,
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

  paintBorder(window, {
    x,
    y,
    width,
    height,
    style,
    renderer,
  });

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
        hovered,
        focused,
        pressed,
        disabled,
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
        hovered,
        focused,
        pressed,
        disabled,
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
        hovered,
        focused,
        pressed,
        disabled,
      });
      break;
    }

    case WidgetType.ProgressBar: {
      paintProgressBar(window, {
        ctx,
        layout,
        renderer,
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
