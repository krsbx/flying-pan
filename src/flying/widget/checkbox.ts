import type {
  ClickEvent,
  ClickEventHandler,
  InteractionProps,
} from '@flying/interactions';
import { WidgetType } from './constant';
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
    ...rest
  } = props;

  return {
    type: WidgetType.Checkbox,
    props: { value, defaultValue, onChange, disabled, ...rest },
    style: {
      focusable: !disabled,
      ...style,
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
