import type {
  ClickEvent,
  ClickEventHandler,
  InteractionProps,
} from '@flying/interactions';
import { WidgetType } from './constant';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface ToggleProps extends WidgetProps, InteractionProps {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
  indicatorStyle?: ViewStyle;
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
    ...rest
  } = props;

  return {
    type: WidgetType.Toggle,
    props: { value, defaultValue, onChange, disabled, ...rest },
    style: {
      width: 48,
      height: 24,
      borderRadius: 32,
      borderWidth: 2,
      borderColor: '#9ca3af',
      focusable: !disabled,
      backgroundColor: '#ffffff',
      ...style,
      _checked: {
        backgroundColor: '#1a73e8',
        borderColor: '#1a73e8',
        ...style?._checked,
      },
      _focus: {
        borderColor: '#1a73e8',
        ...style?._focus,
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
