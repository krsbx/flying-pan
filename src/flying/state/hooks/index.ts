import type { StateStore } from '../state';
import type { UseWidgetStateOptions } from './types';

let currentStore: StateStore | null = null;

export function setCurrentStateStore(bag: StateStore | null): void {
  currentStore = bag;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useWidgetState<T = (() => any) | any>(
  options: UseWidgetStateOptions<T>
): T {
  const { node, initial } = options;

  if (!currentStore) {
    throw new Error('useWidgetState called outside App context');
  }

  return currentStore.stateFor<T>({
    stableId: node.stableId,
    initial,
  });
}
