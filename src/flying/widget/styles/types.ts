import type { Transition } from '@flying/animation';
import type { InteractionProps } from '@flying/interactions';
import type { Coordinate2D, Size, ValidColor } from '@flying/types';
import type {
  FlexAlign,
  FlexDirection,
  FlexJustify,
  FlexWrap,
  GradientType,
  Overflow,
  PointerEvents,
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

export interface GradientStop {
  position: number;
  color: ValidColor;
}

export interface LinearGradient {
  type: typeof GradientType.Linear;
  angle?: number;
  stops: GradientStop[];
}

export type Background = LinearGradient;

// Properties that actually take effect when applied via _hover / _focus.
export interface PseudoStateStyle {
  backgroundColor?: ValidColor;
  background?: Background;
  borderColor?: ValidColor;
  borderWidth?: number;
  borderRadius?: number;
  opacity?: number;
  boxShadow?: BoxShadow | BoxShadow[];
}

// Extended pseudo-state for text widgets — paint reads these from the
// resolved style when rendering a Label, so they respond to hover/focus.
export interface TextPseudoStateStyle extends PseudoStateStyle {
  color?: ValidColor;
  letterSpacing?: number;
  lineHeight?: number;
}

// Drop shadow drawn behind a widget. Stacked layers approximate a Gaussian
// falloff via the existing rounded-rect primitive.
export interface BoxShadow {
  x?: number;
  y?: number;
  blur?: number;
  spread?: number;
  color: ValidColor;
}

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
  /** Linear-gradient fill. Wins over `backgroundColor` when both set. */
  background?: Background;
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

  // Interaction
  pointerEvents?: PointerEvents;
  focusable?: boolean;

  _active?: PseudoStateStyle;
  _focus?: PseudoStateStyle;
  _hover?: PseudoStateStyle;
  _checked?: PseudoStateStyle;
  _disabled?: PseudoStateStyle;

  overflow?: Overflow;

  boxShadow?: BoxShadow | BoxShadow[];

  /** Smoothly interpolate this style's animatable properties when they change. */
  transition?: Transition;
}

export interface TextStyle extends ViewStyle {
  fontSize?: number;
  color?: ValidColor;
  textAlign?: TextAlign;
  lineHeight?: number;
  letterSpacing?: number;

  _active?: TextPseudoStateStyle;
  _focus?: TextPseudoStateStyle;
  _hover?: TextPseudoStateStyle;
}

export interface TextInputStyle extends TextStyle {
  placeholderColor?: ValidColor;
  caretColor?: ValidColor;
  caretWidth?: number;
  selectionColor?: ValidColor;
}

export type WidgetProps = Record<string, unknown>;

export interface WidgetDescriptor extends InteractionProps {
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

export interface Rect extends Coordinate2D, Size {}
