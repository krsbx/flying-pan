import type { InputManager } from '@flying/app';
import { FocusDispatcher } from './focus';
import { PointerDispatcher } from './pointer';
import { ScrollDispatcher } from './scroll';
import type { DispatchOptions } from './types';

export class InteractionManager {
  public readonly pointer: PointerDispatcher;
  public readonly focus: FocusDispatcher;
  public readonly scroll: ScrollDispatcher;

  public constructor(input: InputManager) {
    this.pointer = new PointerDispatcher(input);
    this.focus = new FocusDispatcher(input);
    this.scroll = new ScrollDispatcher(input);
  }

  public dispatch(options: DispatchOptions): void {
    this.pointer.dispatch(options);
    this.focus.dispatch(options);
    this.scroll.dispatch(options);
  }

  public reset(): void {
    this.pointer.reset();
    this.focus.reset();
    this.scroll.reset();
  }
}
