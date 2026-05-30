export const WindowEvent = {
  Position: 'position',
  Resize: 'resize',
  Close: 'close',
  Focus: 'focus',
  Minimize: 'minimize',
  Maximize: 'maximize',
  Hover: 'hover',
  Cursor: 'cursor',
} as const;

export type WindowEvent = (typeof WindowEvent)[keyof typeof WindowEvent];
