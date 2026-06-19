import { positionFlowChildren } from './flow';
import { calculateMainContentSize, wrapMeasurements } from './measurement';
import type { LayoutFlexFn, LayoutLineOptions } from './types';
import { updateChildMeasurements } from './utility';

export function layoutSingleLine(
  options: LayoutLineOptions,
  layoutFlex: LayoutFlexFn
) {
  const {
    flow,
    style,
    padding,
    isRow,
    gap,
    contentWidth,
    contentHeight,
    x,
    y,
    fontManager,
    textureManager,
    children,
  } = options;

  const { crossAxisSize, mainAxisSize, totalGaps } = updateChildMeasurements({
    measurements: flow,
    contentHeight,
    contentWidth,
    isRow,
    gap,
  });

  const {
    alignItems,
    justifyItems,
    mainPos: calculatedMainPos,
    spaceBetweenGap,
    spaceEvenlyGap,
  } = calculateMainContentSize({
    crossAxisSize,
    mainAxisSize,
    measurements: flow,
    totalGaps,
    padding,
    style,
    isRow,
  });

  positionFlowChildren(
    {
      measurements: flow,
      alignItems,
      isRow,
      padding,
      crossAxisSize,
      mainPos: calculatedMainPos,
      spaceBetweenGap,
      spaceEvenlyGap,
      justifyItems,
      x,
      y,
      gap,
      fontManager,
      textureManager,
      children,
    },
    layoutFlex
  );
}

export function layoutWrap(
  options: LayoutLineOptions,
  layoutFlex: LayoutFlexFn
) {
  const {
    flow,
    style,
    padding,
    isRow,
    gap,
    contentWidth,
    contentHeight,
    x,
    y,
    fontManager,
    textureManager,
    children,
  } = options;

  const mainAxisSize = isRow ? contentWidth : contentHeight;

  const lines = wrapMeasurements({
    measurements: flow,
    mainAxisSize,
    gap,
    isRow,
  });

  let crossPos = isRow ? padding.top : padding.left;

  for (const line of lines) {
    updateChildMeasurements({
      measurements: line.measurements,
      contentHeight,
      contentWidth,
      isRow,
      gap,
    });

    const totalGaps =
      line.measurements.length > 1 ? gap * (line.measurements.length - 1) : 0;

    const {
      alignItems,
      justifyItems,
      mainPos,
      spaceBetweenGap,
      spaceEvenlyGap,
    } = calculateMainContentSize({
      crossAxisSize: isRow ? contentHeight : contentWidth,
      mainAxisSize,
      measurements: line.measurements,
      totalGaps,
      padding,
      style,
      isRow,
    });

    positionFlowChildren(
      {
        measurements: line.measurements,
        alignItems,
        isRow,
        padding: {
          ...padding,
          top: isRow ? crossPos : padding.top,
          left: isRow ? padding.left : crossPos,
        },
        crossAxisSize: isRow ? contentHeight : contentWidth,
        mainPos,
        spaceBetweenGap,
        spaceEvenlyGap,
        justifyItems,
        x,
        y,
        gap,
        fontManager,
        textureManager,
        children,
      },
      layoutFlex
    );

    crossPos += line.crossSize + gap;
  }
}
