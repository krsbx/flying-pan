import type { Coordinate2D } from '@/flying/types';

export class InputState {
  public keys: Set<number>;
  public mouseButtons: Set<number>;
  public mousePosition: Coordinate2D;
  public scrollDelta: Coordinate2D;
  public modifiers: number;

  public constructor() {
    this.keys = new Set();
    this.mouseButtons = new Set();
    this.mousePosition = { x: 0, y: 0 };
    this.scrollDelta = { x: 0, y: 0 };
    this.modifiers = 0;
  }
}
