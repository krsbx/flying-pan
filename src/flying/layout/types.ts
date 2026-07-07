import type {
  FlexAlign,
  FlexJustify,
  ResolvedSpacing,
  ViewStyle,
  WidgetDescriptor,
} from '@flying/widget';
import type { PaintContext } from '../renderer';
import type { Coordinate2D, Size } from '../types';

export type LayoutContext = PaintContext;

export interface LayoutNode extends Coordinate2D, Size {
  stableId: number;
  widget: WidgetDescriptor;
  children: LayoutNode[];
}

export interface LayoutFlexOptions extends Coordinate2D {
  node: WidgetDescriptor;
  availableWidth: number;
  availableHeight: number;
  ctx: LayoutContext;
}

export interface LayoutFlexFn {
  (options: LayoutFlexOptions): LayoutNode;
}

export interface ChildMeasurements extends Size {
  widget: WidgetDescriptor;
  flex: number;
  flexShrink: number;
  margin: ResolvedSpacing;
}

export interface MeasureChildsComponentOptions {
  children: WidgetDescriptor[];
  parentWidth: number;
  parentHeight: number;
  ctx: LayoutContext;
}

export interface MeasureChildsComponentResult {
  flow: ChildMeasurements[];
  absolute: ChildMeasurements[];
}

export interface WrapLine {
  measurements: ChildMeasurements[];
  crossSize: number;
}

export interface WrapMeasurementsOptions {
  measurements: ChildMeasurements[];
  mainAxisSize: number;
  isRow: boolean;
  gap: number;
}

export interface UpdateChildMeasurementsOptions {
  measurements: ChildMeasurements[];
  contentWidth: number;
  contentHeight: number;
  isRow: boolean;
  gap: number;
}

export interface UpdateChildMeasurementsResult {
  crossAxisSize: number;
  mainAxisSize: number;
  totalGaps: number;
}

export interface CalculateMainContentSizeOptions extends UpdateChildMeasurementsResult {
  measurements: ChildMeasurements[];
  padding: ResolvedSpacing;
  style: ViewStyle;
  isRow: boolean;
}

export interface CalculateMainContentSizeResult {
  spaceBetweenGap: number;
  spaceEvenlyGap: number;
  alignItems: FlexAlign;
  justifyItems: FlexJustify;
  mainPos: number;
}

export interface DistributeChildOptions {
  measurements: ChildMeasurements[];
  totalFlex: number;
  freeSpace: number;
  isRow: boolean;
}

export interface LayoutLineOptions {
  flow: ChildMeasurements[];
  style: ViewStyle;
  padding: ResolvedSpacing;
  isRow: boolean;
  gap: number;
  contentWidth: number;
  contentHeight: number;
  x: number;
  y: number;
  children: LayoutNode[];
  ctx: LayoutContext;
}

export interface PositionFlowChildrenOptions {
  measurements: ChildMeasurements[];
  alignItems: FlexAlign;
  isRow: boolean;
  padding: ResolvedSpacing;
  crossAxisSize: number;
  mainPos: number;
  spaceBetweenGap: number;
  spaceEvenlyGap: number;
  justifyItems: FlexJustify;
  x: number;
  y: number;
  gap: number;
  children: LayoutNode[];
  ctx: LayoutContext;
}

export interface PositionAbsoluteOptions {
  m: ChildMeasurements;
  padding: ResolvedSpacing;
  contentWidth: number;
  contentHeight: number;
  x: number;
  y: number;
  children: LayoutNode[];
  ctx: LayoutContext;
}
