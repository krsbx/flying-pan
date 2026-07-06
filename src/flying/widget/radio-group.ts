import type { ClickEvent } from '@flying/interactions';
import { WidgetType, type FlexDirection } from './constant';
import { Flex } from './flex';
import { Label } from './label';
import type { RadioProps } from './radio';
import type { ViewStyle, WidgetDescriptor, WidgetProps } from './styles';

export interface RadioGroupProps extends WidgetProps {
  value?: string;
  defaultValue?: string;
  name?: string;
  onChange?: (value: string) => void;
  direction?: FlexDirection;
  gap?: number;
  style?: ViewStyle;
  children?: WidgetDescriptor[];
}

function deriveGroupName(children: WidgetDescriptor[] = []): string {
  const values = children
    .filter((c) => c.type === WidgetType.Radio)
    .map((c) => (c.props as RadioProps).value);

  return `__radio::${values.join('|')}`;
}

export function RadioGroup(props: RadioGroupProps): WidgetDescriptor {
  const isControlled = props.value !== undefined;

  if (!isControlled && props.name === undefined) {
    props.name = deriveGroupName(props.children);
  }

  const resolvedDefault = props.defaultValue ?? '';

  const augmented = (props.children ?? []).map((child) => {
    if (child.type !== WidgetType.Radio) return child;

    const radioProps = child.props as RadioProps;
    const { label, labelStyle, font, ...radioOnly } = radioProps;

    const isDisabled = radioProps.disabled === true;

    const selected = isControlled
      ? radioProps.value === props.value
      : undefined;

    const innerRadio: WidgetDescriptor = {
      ...child,
      props: {
        ...radioOnly,
        selected,
        name: isControlled ? undefined : props.name,
        groupDefaultValue: isControlled ? undefined : resolvedDefault,
      },
      onClick: (event: ClickEvent) => {
        radioProps.onClick?.(event);

        if (isDisabled) return;

        if (isControlled) {
          if (radioProps.value !== props.value) {
            props.onChange?.(radioProps.value);
          }

          return;
        }

        const current = event.stateStore.stateForByName<string>({
          name: props.name!,
          initial: resolvedDefault,
        });

        if (current !== radioProps.value) {
          event.stateStore.setStateByName({
            name: props.name!,
            value: radioProps.value,
          });

          props.onChange?.(radioProps.value);
        }
      },
    };

    if (label === undefined) return innerRadio;

    const labelWidget: WidgetDescriptor =
      typeof label === 'string'
        ? Label({
            text: label,
            font: font!,
            style: labelStyle,
          })
        : label;

    return Flex({
      direction: 'row',
      gap: 8,
      alignItems: 'center',
      children: [innerRadio, labelWidget],
    });
  });

  return Flex({
    direction: props.direction ?? 'column',
    gap: props.gap,
    style: props.style,
    children: augmented,
  });
}
