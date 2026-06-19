import { clamp } from '@/utility/common';
import type { ImageProps, LabelProps } from '@flying/widget';
import {
  FlexAlign,
  FlexJustify,
  Position,
  resolveSize,
  resolveSpacing,
  SpacingType,
  WidgetType,
  type TextStyle,
} from '@flying/widget';
import type {
  CalculateMainContentSizeOptions,
  CalculateMainContentSizeResult,
  ChildMeasurements,
  MeasureChildsComponentOptions,
  MeasureChildsComponentResult,
  WrapLine,
  WrapMeasurementsOptions,
} from './types';

export function measureChildsComponent(
  options: MeasureChildsComponentOptions
): MeasureChildsComponentResult {
  const { parentWidth, parentHeight, textureManager } = options;
  const flow: ChildMeasurements[] = [];
  const absolute: ChildMeasurements[] = [];

  for (const child of options.children) {
    const margin = resolveSpacing(
      child.style?.[SpacingType.Margin],
      parentWidth
    );
    const isAbsolute = child.style?.position === Position.Absolute;
    const flexValue = child.style?.flexGrow ?? child.style?.flex ?? 0;
    const flexShrinkValue =
      child.style?.flexShrink ?? (child.style?.flex ? 1 : 0);

    const flex = isAbsolute ? 0 : flexValue;
    const flexShrink = isAbsolute ? 0 : flexShrinkValue;

    let width = resolveSize(child.style?.width, parentWidth);
    let height = resolveSize(child.style?.height, parentHeight);

    if (child.type === WidgetType.Image && !width && !height) {
      const props = child.props as ImageProps;
      const info = textureManager?.info?.(props.src);

      if (info) {
        width ||= props.width || info.width;
        height ||= props.height || info.height;
      }
    }

    if (child.type === WidgetType.Label) {
      const style = child.style as TextStyle;
      const fontAtlas = options.fontManager.get(style.font);

      const text = (child.props as LabelProps).text;
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
      min:
        child.style?.minWidth != null
          ? resolveSize(child.style.minWidth, parentWidth)
          : null,
      max:
        child.style?.maxWidth != null
          ? resolveSize(child.style.maxWidth, parentWidth)
          : null,
    });
    height = clamp({
      value: height,
      min:
        child.style?.minHeight != null
          ? resolveSize(child.style.minHeight, parentHeight)
          : null,
      max:
        child.style?.maxHeight != null
          ? resolveSize(child.style.maxHeight, parentHeight)
          : null,
    });

    const measurement: ChildMeasurements = {
      widget: child,
      flex,
      flexShrink,
      margin,
      height,
      width,
    };

    if (isAbsolute) {
      absolute.push(measurement);
    } else {
      flow.push(measurement);
    }
  }

  return { flow, absolute };
}

export function wrapMeasurements(options: WrapMeasurementsOptions) {
  const lines: WrapLine[] = [];
  let currentLine: ChildMeasurements[] = [];
  let currentMain = 0;

  for (const m of options.measurements) {
    const mainSize = options.isRow ? m.width : m.height;
    const mainMargin = options.isRow
      ? m.margin.left + m.margin.right
      : m.margin.top + m.margin.bottom;
    const spaceRequired = mainSize + mainMargin;
    const gapRequired = currentLine.length > 0 ? options.gap : 0;

    if (
      currentLine.length > 0 &&
      currentMain + gapRequired + spaceRequired > options.mainAxisSize
    ) {
      lines.push({ measurements: currentLine, crossSize: 0 });
      currentLine = [];
      currentMain = 0;
    }

    currentLine.push(m);
    currentMain += spaceRequired + gapRequired;
  }

  if (currentLine.length > 0) {
    lines.push({ measurements: currentLine, crossSize: 0 });
  }

  for (const line of lines) {
    line.crossSize = Math.max(
      ...line.measurements.map((m) => {
        const margin = options.isRow
          ? m.margin.top + m.margin.bottom
          : m.margin.left + m.margin.right;

        return options.isRow ? m.height + margin : m.width + margin;
      })
    );
  }

  return lines;
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
