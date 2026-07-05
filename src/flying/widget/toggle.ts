import type {
  ClickEvent,
  ClickEventHandler,
  InteractionProps,
} from '@flying/interactions';
import { WidgetType } from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';
import { Metrics, Palette } from './styles';

export interface ToggleProps extends WidgetProps, InteractionProps {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
  knobStyle?: ViewStyle;
}

function createToggleClickHandler(props: ToggleProps): ClickEventHandler {
  return (event: ClickEvent) => {
    if (props.disabled) return;

    const { node, stateStore } = event;

    if (props.value !== undefined) {
      props.onChange?.(!props.value);
      return;
    }

    const current = stateStore.stateFor<boolean>({
      stableId: node.stableId,
      initial: props.defaultValue ?? false,
    });

    const next = !current;

    stateStore.setState({ stableId: node.stableId, value: next });
    props.onChange?.(next);
  };
}

export function Toggle(props: ToggleProps): WidgetDescriptor {
  const {
    value,
    defaultValue,
    onChange,
    disabled,
    onPointerDown,
    onPointerUp,
    onPointerMove,
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
    knobStyle,
    ...rest
  } = props;

  return {
    type: WidgetType.Toggle,
    props: {
      value,
      defaultValue,
      onChange,
      disabled,
      knobStyle: {
        backgroundColor: Palette.surface,
        ...knobStyle,
        _disabled: {
          opacity: 0.5,
          ...knobStyle?._disabled,
        },
      },
      ...rest,
    },
    style: {
      width: 48,
      height: 24,
      borderRadius: 24,
      borderWidth: Metrics.borderWidth,
      borderColor: Palette.border,
      focusable: !disabled,
      backgroundColor: Palette.surfaceActive,
      ...style,
      _checked: {
        backgroundColor: Palette.accent,
        borderColor: Palette.accent,
        ...style?._checked,
      },
      _focus: {
        borderColor: Palette.borderFocus,
        ...style?._focus,
      },
      _disabled: {
        opacity: 0.5,
        ...style?._disabled,
      },
    },
    onClick: createToggleClickHandler({
      value,
      defaultValue,
      onChange,
      disabled,
    }),
    onPointerDown,
    onPointerUp,
    onPointerMove,
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
