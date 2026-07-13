// =============================================================================
// flying-pan — Public API
// =============================================================================

// App — App class, AppConfig, FontConfig, Window, WindowManager,
// InputManager, FontManager, AudioManager, Monitor, MonitorManager
export * from './app';

// Widgets — all widget factories + their Props types:
//   View, Flex, Button, Label, TextInput, Checkbox, Radio, RadioGroup,
//   Toggle, List, Image, ProgressBar, CircularProgress, Meter,
//   SliderBar, CircularSlider, RangeSliderBar
//
// Also pulls in (via ./flying/widget barrel):
//   - Constants/enums: WidgetType, FlexDirection, FlexJustify, FlexAlign,
//     FlexWrap, Overflow, Position, TextAlign, ProgressBarOrientation,
//     ProgressDirection, ProgressType, CircularProgressDirection,
//     ProgressValueType, RangeHandle, PointerEvents, SizeUnit, SpacingType
//   - Style types: WidgetDescriptor, WidgetProps, ViewStyle, TextStyle,
//     TextInputStyle, PseudoStateStyle, Background, BoxShadow, LinearGradient,
//     GradientStop, Spacing, Rect, etc.
//   - Palette + Metrics
//   - Utility: resolveSize, resolveSpacing, layoutConstraints
export * from './widget';

// Interactions — event types (PointerEvent, ClickEvent, KeyEvent, CharEvent,
// FocusEvent, LifecycleEvent, UpdateEvent), handler types, InteractionProps,
// hitTest
export * from './interactions';

// Layout — LayoutNode (referenced in event handler signatures)
export type { LayoutNode } from './layout';

// Shared types — coordinates, sizes, colors
export type {
  Coordinate2D,
  Coordinate3D,
  FrameBufferSize,
  Resolution,
  RGBA,
  Size,
  ValidColor,
} from './types';
