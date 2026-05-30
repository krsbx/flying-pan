// Window Essential
// Focus, Close, Resize, Framebuffer, Position

// Window Input
// Hover, Mouse, Cursor, Scroll, Key, Char, Drop

// Window Utility
// Minimize, Maximize, Refresh, Scaling

export const WindowEvent = {
  Position: 'position',
  Resize: 'resize',
  Close: 'close',
  Focus: 'focus',
  Minimize: 'minimize',
  Maximize: 'maximize',
  FrameBuffer: 'frame_buffer',
  Refresh: 'refresh',
  Scaling: 'scaling',
} as const;

export type WindowEvent = (typeof WindowEvent)[keyof typeof WindowEvent];

export const InputEvent = {
  Hover: 'hover',
  Mouse: 'mouse',
  Cursor: 'cursor',
  Scroll: 'scroll',
  Key: 'key',
  Char: 'char',
  Drop: 'drop',
} as const;

export type InputEvent = (typeof InputEvent)[keyof typeof InputEvent];
