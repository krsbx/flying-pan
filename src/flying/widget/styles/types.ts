import type { ValidColor } from '@/flying/types';
import type {
  FlexAlign,
  FlexDirection,
  FlexJustify,
  FlexWrap,
  FontWeight,
  Position,
  SizeUnit,
  TextAlign,
  WidgetType,
} from '../constant';

export type SizeInputWithUnit = {
  [K in keyof typeof SizeUnit]: `${number}${(typeof SizeUnit)[K]}`;
}[keyof typeof SizeUnit];

export type SizeInput = number;
//  | SizeInputWithUnit;

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
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;

  // Flexbox
  flexDirection?: FlexDirection;
  justifyContent?: FlexJustify;
  alignItems?: FlexAlign;
  alignSelf?: FlexAlign;
  gap?: number;
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
  x?: number;
  y?: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface TextStyle extends ViewStyle {
  fontSize?: number;
  fontFamily?: string;
  color?: ValidColor;
  textAlign?: TextAlign;
  fontWeight?: FontWeight;
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
