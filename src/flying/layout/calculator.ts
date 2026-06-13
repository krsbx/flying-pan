import type { DistributeChildOptions } from './types';

export function distributeFreeSpace(options: DistributeChildOptions) {
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

export function distributeShrinking(options: DistributeChildOptions) {
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
