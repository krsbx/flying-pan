import type { ValidColor } from '@/flying/types';
import type {
  FlexAlign,
  FlexDirection,
  FlexJustify,
  FlexWrap,
  Position,
  SizeUnit,
  TextAlign,
  WidgetType,
} from '../constant';

export type SizeInputWithUnit = {
  [K in keyof typeof SizeUnit]: `${number}${(typeof SizeUnit)[K]}`;
}[keyof typeof SizeUnit];

export type SizeInput = number | `${number}` | SizeInputWithUnit;

export interface Spacing {
  top: SizeInput;
  right: SizeInput;
  bottom: SizeInput;
  left: SizeInput;
}

export interface ResolvedSpacing {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type SpacingInput =
  | SizeInput
  | [SizeInput, SizeInput]
  | [SizeInput, SizeInput, SizeInput, SizeInput]
  | Spacing;

export interface ViewStyle {
  // Box model
  padding?: SpacingInput;
  margin?: SpacingInput;
  width?: SizeInput;
  height?: SizeInput;
  minWidth?: SizeInput;
  minHeight?: SizeInput;
  maxWidth?: SizeInput;
  maxHeight?: SizeInput;

  // Flexbox
  flexDirection?: FlexDirection;
  justifyContent?: FlexJustify;
  alignItems?: FlexAlign;
  alignSelf?: FlexAlign;
  gap?: SizeInput;
  flex?: number;
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: FlexWrap;

  // Visual
  backgroundColor?: ValidColor;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: ValidColor;
  opacity?: number;

  // Position
  position?: Position;
  x?: SizeInput;
  y?: SizeInput;
  top?: SizeInput;
  right?: SizeInput;
  bottom?: SizeInput;
  left?: SizeInput;
}

export interface TextStyle extends ViewStyle {
  fontSize?: number;
  color?: ValidColor;
  textAlign?: TextAlign;
  lineHeight?: number;
  letterSpacing?: number;
  font: string;
}

export type WidgetProps = Record<string, unknown>;

export interface WidgetDescriptor {
  type: WidgetType;
  props: WidgetProps;
  style?: ViewStyle;
  children?: WidgetDescriptor[];
}

export interface LayoutConstraintsOptions {
  width?: number | null;
  height?: number | null;
  parentWidth: number;
  parentHeight: number;
}

export interface LayoutConstraints {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
}
