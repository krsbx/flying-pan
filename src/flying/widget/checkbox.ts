import type {
  ClickEvent,
  ClickEventHandler,
  InteractionProps,
} from '@flying/interactions';
import { WidgetType } from './constant';
import { Metrics, Palette } from './styles';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface CheckboxProps extends WidgetProps, InteractionProps {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
  tickStyle?: ViewStyle;
  tickSize?: number;
}

function createCheckboxClickHandler(props: CheckboxProps): ClickEventHandler {
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

export function Checkbox(props: CheckboxProps): WidgetDescriptor {
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
    tickStyle,
    ...rest
  } = props;

  return {
    type: WidgetType.Checkbox,
    props: {
      value,
      defaultValue,
      onChange,
      disabled,
      tickStyle: {
        backgroundColor: Palette.textOnAccent,
        ...tickStyle,
        _disabled: {
          opacity: 0.5,
          ...tickStyle?._disabled,
        },
      },
      ...rest,
    },
    style: {
      width: Metrics.controlSize,
      height: Metrics.controlSize,
      borderRadius: Metrics.controlRadius,
      borderWidth: Metrics.borderWidth,
      borderColor: Palette.border,
      backgroundColor: Palette.surface,
      focusable: !disabled,
      ...style,
      _checked: {
        borderColor: Palette.accent,
        backgroundColor: Palette.accent,
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
    onClick: createCheckboxClickHandler({
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
