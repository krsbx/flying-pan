import type { LabelProps } from '../widget';
import {
  FlexAlign,
  FlexJustify,
  SpacingType,
  WidgetType,
} from '../widget/constant';
import { resolveSpacing, type TextStyle } from '../widget/styles';
import type {
  CalculateMainContentSizeOptions,
  CalculateMainContentSizeResult,
  ChildMeasurements,
  MeasureChildsComponentOptions,
  UpdateChildMeasurementsOptions,
  UpdateChildMeasurementsResult,
} from './types';

export function measureChildsComponent(
  options: MeasureChildsComponentOptions
): ChildMeasurements[] {
  const measurements: ChildMeasurements[] = [];

  for (const child of options.children) {
    const margin = resolveSpacing(child.style?.[SpacingType.Margin]);
    const flex = child.style?.flex ?? 0;

    let width = child.style?.width ?? 0;
    let height = child.style?.height ?? 0;

    if (child.type === WidgetType.Label && options.textMeasurer) {
      const text = (child.props as LabelProps)?.text ?? '';
      const fontSize = (child.style as TextStyle)?.fontSize ?? 16;

      const measured = options.textMeasurer.measureText({ fontSize, text });

      if (!width) width = measured.width;
      if (!height) height = measured.height;
    }

    measurements.push({
      widget: child,
      flex,
      margin,
      height,
      width,
    });
  }

  return measurements;
}

export function updateChildMeasurements(
  options: UpdateChildMeasurementsOptions
): UpdateChildMeasurementsResult {
  const totalGaps =
    options.measurements.length > 1
      ? options.gap * (options.measurements.length - 1)
      : 0;
  const mainAxisSize = options.isRow
    ? options.contentWidth
    : options.contentHeight;
  let fixedMainSize = totalGaps;
  let totalFlex = 0;

  for (const m of options.measurements) {
    const mainMargin = options.isRow
      ? m.margin.left + m.margin.right
      : m.margin.top + m.margin.bottom;
    const mainSize = options.isRow ? m.width : m.height;

    if (m.flex > 0) {
      totalFlex += m.flex;
    } else {
      fixedMainSize += mainSize + mainMargin;
    }
  }

  const flexUnit =
    totalFlex > 0 ? (mainAxisSize - fixedMainSize) / totalFlex : 0;

  for (const m of options.measurements) {
    if (!m.flex) continue;

    const mainMargin = options.isRow
      ? m.margin.left + m.margin.right
      : m.margin.top + m.margin.bottom;
    const size = m.flex * flexUnit - mainMargin;

    if (options.isRow) {
      m.width = size;
    } else {
      m.height = size;
    }
  }

  const crossAxisSize = options.isRow
    ? options.contentHeight
    : options.contentWidth;

  for (const m of options.measurements) {
    const crossMargin = options.isRow
      ? m.margin.top + m.margin.bottom
      : m.margin.left + m.margin.right;
    const size = crossAxisSize - crossMargin;

    if (options.isRow) {
      if (!m.height) {
        m.height = size;
      }
    } else {
      if (!m.width) {
        m.width = size;
      }
    }
  }

  return {
    crossAxisSize,
    mainAxisSize,
    totalGaps,
  };
}

export function calculateMainContentSize(
  options: CalculateMainContentSizeOptions
): CalculateMainContentSizeResult {
  let mainPos = options.isRow ? options.padding.left : options.padding.top;
  const justifyItems = options.style.justifyContent ?? FlexJustify.Start;
  const alignItems = options.style.alignItems ?? FlexAlign.Stretch;

  let totalMainSize = options.totalGaps;

  for (const m of options.measurements) {
    totalMainSize += options.isRow
      ? m.width + m.margin.left + m.margin.right
      : m.height + m.margin.top + m.margin.bottom;
  }

  const freeSpace = options.mainAxisSize - totalMainSize;
  let spaceBetweenGap = 0;
  let spaceEvenlyGap = 0;

  switch (justifyItems) {
    case FlexJustify.Center:
      mainPos += freeSpace / 2;
      break;

    case FlexJustify.End:
      mainPos += freeSpace;
      break;

    case FlexJustify.SpaceBetween:
      if (options.measurements.length > 1) {
        spaceBetweenGap = freeSpace / (options.measurements.length - 1);
      }
      break;

    case FlexJustify.SpaceEvenly:
      spaceEvenlyGap = freeSpace / (options.measurements.length + 1);
      mainPos += spaceEvenlyGap;
      break;
  }

  return {
    spaceBetweenGap,
    spaceEvenlyGap,
    alignItems,
    justifyItems,
    mainPos,
  };
}
