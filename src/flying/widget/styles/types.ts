import type {
  ClickEventHandler,
  FocusEventHandler,
  KeyEventHandler,
  PointerEventHandler,
} from '@flying/interactions';
import type { ValidColor } from '@flying/types';
import type {
  FlexAlign,
  FlexDirection,
  FlexJustify,
  FlexWrap,
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

// Properties that actually take effect when applied via _hover / _focus.
export interface PseudoStateStyle {
  backgroundColor?: ValidColor;
  borderColor?: ValidColor;
  borderWidth?: number;
  borderRadius?: number;
  opacity?: number;
}

// Extended pseudo-state for text widgets — paint reads these from the
// resolved style when rendering a Label, so they respond to hover/focus.
export interface TextPseudoStateStyle extends PseudoStateStyle {
  color?: ValidColor;
  letterSpacing?: number;
  lineHeight?: number;
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

  _focus?: PseudoStateStyle;
  _hover?: PseudoStateStyle;
}

export interface TextStyle extends ViewStyle {
  fontSize?: number;
  color?: ValidColor;
  textAlign?: TextAlign;
  lineHeight?: number;
  letterSpacing?: number;
  font: string;
  _focus?: TextPseudoStateStyle;
  _hover?: TextPseudoStateStyle;
}

export type WidgetProps = Record<string, unknown>;

export interface WidgetDescriptor {
  type: WidgetType;
  props: WidgetProps;
  style?: ViewStyle;
  children?: WidgetDescriptor[];
  onPointerDown?: PointerEventHandler;
  onPointerUp?: PointerEventHandler;
  onPointerMove?: PointerEventHandler;
  onClick?: ClickEventHandler;
  onPointerEnter?: PointerEventHandler;
  onPointerLeave?: PointerEventHandler;
  onKeyDown?: KeyEventHandler;
  onKeyUp?: KeyEventHandler;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
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
