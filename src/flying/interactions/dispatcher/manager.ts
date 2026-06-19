import type { InputManager } from '@flying/app';
import { FocusDispatcher } from './focus';
import { PointerDispatcher } from './pointer';
import type { DispatchOptions } from './types';

export class InteractionManager {
  public readonly pointer: PointerDispatcher;
  public readonly focus: FocusDispatcher;

  public constructor(input: InputManager | null) {
    this.pointer = new PointerDispatcher(input);
    this.focus = new FocusDispatcher(input);
  }

  public dispatch(options: DispatchOptions): void {
    this.pointer.dispatch(options);
    this.focus.dispatch(options);
  }

  public reset(): void {
    this.pointer.reset();
    this.focus.reset();
  }
}
