import { clamp } from '@/utility/common';
import { distributeFreeSpace, distributeShrinking } from './calculator';
import type {
  UpdateChildMeasurementsOptions,
  UpdateChildMeasurementsResult,
} from './types';

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
