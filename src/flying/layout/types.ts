import type { FontManager } from '../app/fonts/manager';
import type { Coordinate2D, Size } from '../types';
import type { FlexAlign, FlexJustify } from '../widget/constant';
import type {
  ResolvedSpacing,
  ViewStyle,
  WidgetDescriptor,
} from '../widget/styles';

export interface LayoutNode extends Coordinate2D, Size {
  widget: WidgetDescriptor;
  children: LayoutNode[];
}

export interface LayoutFlexOptions extends Coordinate2D {
  node: WidgetDescriptor;
  availableWidth: number;
  availableHeight: number;
  fontManager: FontManager;
}

export interface ChildMeasurements extends Size {
  widget: WidgetDescriptor;
  flex: number;
  flexShrink: number;
  margin: ResolvedSpacing;
}

export interface MeasureChildsComponentOptions {
  children: WidgetDescriptor[];
  fontManager: FontManager;
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
