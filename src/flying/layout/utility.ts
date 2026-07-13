import { resolveSize } from '@flying/widget';
import { clamp } from '@utility/common';
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

  const crossAxisSize = options.isRow
    ? options.contentHeight
    : options.contentWidth;

  let totalMainSize = totalGaps;

  // Fused: main-axis clamp + cross-axis calc/clamp + totalMainSize accumulation
  for (const m of options.measurements) {
    const style = m.widget.style;

    const mainMargin = options.isRow
      ? m.margin.left + m.margin.right
      : m.margin.top + m.margin.bottom;
    const crossMargin = options.isRow
      ? m.margin.top + m.margin.bottom
      : m.margin.left + m.margin.right;

    const minWidth =
      style?.minWidth != null
        ? resolveSize(style.minWidth, options.contentWidth)
        : null;
    const maxWidth =
      style?.maxWidth != null
        ? resolveSize(style.maxWidth, options.contentWidth)
        : null;

    const minHeight =
      style?.minHeight != null
        ? resolveSize(style.minHeight, options.contentHeight)
        : null;
    const maxHeight =
      style?.maxHeight != null
        ? resolveSize(style.maxHeight, options.contentHeight)
        : null;

    // Main-axis clamp
    if (options.isRow) {
      m.width = clamp({
        value: m.width,
        min: minWidth,
        max: maxWidth,
      });
    } else {
      m.height = clamp({
        value: m.height,
        min: minHeight,
        max: maxHeight,
      });
    }

    // Cross-axis fill + clamp
    const crossSize = crossAxisSize - crossMargin;

    if (options.isRow) {
      if (!m.height) {
        m.height = crossSize;
      }

      m.height = clamp({
        value: m.height,
        min: minHeight,
        max: maxHeight,
      });
    } else {
      if (!m.width) {
        m.width = crossSize;
      }

      m.width = clamp({
        value: m.width,
        min: minWidth,
        max: maxWidth,
      });
    }

    // Accumulate final main-axis size (post-clamp)
    totalMainSize += options.isRow
      ? m.width + mainMargin
      : m.height + mainMargin;
  }

  return {
    crossAxisSize,
    mainAxisSize,
    totalGaps,
    totalMainSize,
  };
}
