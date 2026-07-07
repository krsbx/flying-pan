import { FocusDispatcher } from './focus';
import { PointerDispatcher } from './pointer';
import { ScrollDispatcher } from './scroll';
import type { DispatcherConfig, DispatchOptions } from './types';

export class InteractionManager {
  public readonly pointer: PointerDispatcher;
  public readonly focus: FocusDispatcher;
  public readonly scroll: ScrollDispatcher;

  public constructor(options: DispatcherConfig) {
    this.pointer = new PointerDispatcher(options);
    this.focus = new FocusDispatcher(options);
    this.scroll = new ScrollDispatcher(options);
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
