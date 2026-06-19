import type { InputManager } from '@/flying/app';
import type { LayoutNode } from '@/flying/layout';
import type { DispatchOptions } from './types';

export abstract class BaseDispatcher {
  public input: InputManager | null;

  public constructor(input: InputManager | null) {
    this.input = input;
  }

  public abstract dispatch(options: DispatchOptions): void;

  public abstract reset(): void;

  protected sameWidget(a: LayoutNode | null, b: LayoutNode | null): boolean {
    return a !== null && b !== null && a.widget === b.widget;
  }

  protected assertInput(input: InputManager | null): asserts input {
    if (input) return;

    throw new Error('InputManager is required');
  }
}
