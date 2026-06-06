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
  DistributeChildOptions,
  MeasureChildsComponentOptions,
  UpdateChildMeasurementsOptions,
  UpdateChildMeasurementsResult,
} from './types';

function clamp(options: { value: number; min?: number; max?: number }): number {
  const { value, min, max } = options;

  return Math.min(Math.max(value, min ?? 0), max ?? Infinity);
}

export function measureChildsComponent(
  options: MeasureChildsComponentOptions
): ChildMeasurements[] {
  const measurements: ChildMeasurements[] = [];

  for (const child of options.children) {
    const margin = resolveSpacing(child.style?.[SpacingType.Margin]);
    const flex = child.style?.flexGrow ?? child.style?.flex ?? 0;
    const flexShrink = child.style?.flexShrink ?? (child.style?.flex ? 1 : 0);

    let width = child.style?.width ?? 0;
    let height = child.style?.height ?? 0;

    if (child.type === WidgetType.Label) {
      const style = child.style as TextStyle;
      const fontAtlas = options.fontManager.get(style.font);

      const text = (child.props as LabelProps)?.text ?? '';
      const fontSize = style?.fontSize ?? 16;
      const letterSpacing = style?.letterSpacing;
      const lineHeight = style?.lineHeight;

      const measured = fontAtlas.measureText({
        text,
        fontSize,
        letterSpacing,
        lineHeight,
      });

      if (!width) width = measured.width;
      if (!height) height = measured.height;
    }

    // Clamp to min/max constraints
    width = clamp({
      value: width,
      min: child.style?.minWidth,
      max: child.style?.maxWidth,
    });
    height = clamp({
      value: height,
      min: child.style?.minHeight,
      max: child.style?.maxHeight,
    });

    measurements.push({
      widget: child,
      flex,
      flexShrink,
      margin,
      height,
      width,
    });
  }

  return measurements;
}

function distributeShrinking(options: DistributeChildOptions) {
  let totalShrink = 0;

  for (const m of options.measurements) {
    if (m.flexShrink > 0) {
      totalShrink += m.flexShrink;
    }
  }

  if (totalShrink > 0) {
    const overflow = -options.freeSpace;

    for (const m of options.measurements) {
      if (m.flexShrink <= 0) continue;

      const mainMargin = options.isRow
        ? m.margin.left + m.margin.right
        : m.margin.top + m.margin.bottom;
      const shrinkAmount = (m.flexShrink / totalShrink) * overflow - mainMargin;

      if (options.isRow) {
        m.width = Math.max(0, m.width - shrinkAmount);
      } else {
        m.height = Math.max(0, m.height - shrinkAmount);
      }
    }
  }
}

function distributeFreeSpace(options: DistributeChildOptions) {
  const flexUnit = options.freeSpace / options.totalFlex;

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

  const freeSpace = mainAxisSize - fixedMainSize;

  // If free space is negative and items can shrink, distribute shrinking
  if (freeSpace < 0) {
    distributeShrinking({
      measurements: options.measurements,
      totalFlex,
      freeSpace,
      isRow: options.isRow,
    });
  } else if (totalFlex > 0) {
    // Distribute free space to flex items
    distributeFreeSpace({
      measurements: options.measurements,
      totalFlex,
      freeSpace,
      isRow: options.isRow,
    });
  }

  // Clamp main-axis sizes to min/max
  for (const m of options.measurements) {
    const style = m.widget.style;

    if (options.isRow) {
      m.width = clamp({
        value: m.width,
        min: style?.minWidth,
        max: style?.maxWidth,
      });
    } else {
      m.height = clamp({
        value: m.height,
        min: style?.minHeight,
        max: style?.maxHeight,
      });
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
    const style = m.widget.style;

    if (options.isRow) {
      if (!m.height) {
        m.height = size;
      }

      m.height = clamp({
        value: m.height,
        min: style?.minHeight,
        max: style?.maxHeight,
      });
    } else {
      if (!m.width) {
        m.width = size;
      }

      m.width = clamp({
        value: m.width,
        min: style?.minWidth,
        max: style?.maxWidth,
      });
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
