export const PathCommandType = {
  Move: 'move',
  Line: 'line',
  Quadratic: 'quadratic',
  Cubic: 'cubic',
  Arc: 'arc',
  Close: 'close',
} as const;

export type PathCommandType =
  (typeof PathCommandType)[keyof typeof PathCommandType];

export const FillRule = {
  EvenOdd: 'evenodd',
  NonZero: 'nonzero',
} as const;

export type FillRule = (typeof FillRule)[keyof typeof FillRule];
