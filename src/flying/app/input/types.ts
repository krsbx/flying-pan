import type { InputEvent } from '../window/window/constant';
import type {
  OnCharButton,
  OnCursorPosition,
  OnKeyButton,
  OnMousePress,
  OnMouseScroll,
} from '../window/window/types';

export interface WindowCallbackMap {
  [InputEvent.Key]: OnKeyButton;
  [InputEvent.Char]: OnCharButton;
  [InputEvent.MousePress]: OnMousePress;
  [InputEvent.CursorPosition]: OnCursorPosition;
  [InputEvent.MouseScroll]: OnMouseScroll;
}
