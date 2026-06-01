// Window Essential
// Focus, Close, Resize, Framebuffer, Position

// Window Input
// Hover, Mouse, Cursor, Scroll, Key, Char, Drop

// Window Utility
// Minimize, Maximize, Refresh, Scaling

export const WindowEvent = {
  PositionChange: 'position_change',
  Resized: 'resized',
  Close: 'close',
  Focus: 'focus',
  Minimized: 'minimize',
  Maximized: 'maximize',
  FrameBuffer: 'frame_buffer',
  Refresh: 'refresh',
  Scaling: 'scaling',
} as const;

export type WindowEvent = (typeof WindowEvent)[keyof typeof WindowEvent];

export const InputEvent = {
  Hover: 'hover',
  MousePress: 'mouse_press',
  CursorPosition: 'cursor_position',
  MouseScroll: 'mouse_scroll',
  Key: 'key',
  Char: 'char',
  Drop: 'drop',
} as const;

export type InputEvent = (typeof InputEvent)[keyof typeof InputEvent];
