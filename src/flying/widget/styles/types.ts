import type {
  FlexAlign,
  FlexDirection,
  FlexJustify,
  FlexWrap,
  FontWeight,
  TextAlign,
  WidgetType,
} from '../constant';

export interface Spacing {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type SpacingInput =
  | number
  | [number, number]
  | [number, number, number, number]
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
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
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
  color?: string;
  textAlign?: TextAlign;
  fontWeight?: FontWeight;
  lineHeight?: number;
  letterSpacing?: number;
}

export type WidgetProps = Record<string, unknown>;

export interface WidgetDescriptor {
  type: WidgetType;
  props: WidgetProps;
  style?: ViewStyle;
  children?: WidgetDescriptor[];
}
