import type { InputEvent } from '../window/window/constant';
import type {
  OnCursorPosition,
  OnKeyButton,
  OnMousePress,
  OnMouseScroll,
} from '../window/window/types';

export interface WindowCallbackMap {
  [InputEvent.Key]: OnKeyButton;
  [InputEvent.MousePress]: OnMousePress;
  [InputEvent.CursorPosition]: OnCursorPosition;
  [InputEvent.MouseScroll]: OnMouseScroll;
}
