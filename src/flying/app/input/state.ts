import type { Position } from './types';

export class InputState {
  public keys: Set<number>;
  public mouseButtons: Set<number>;
  public mousePosition: Position;
  public scrollDelta: Position;
  public modifiers: number;

  public constructor() {
    this.keys = new Set();
    this.mouseButtons = new Set();
    this.mousePosition = { x: 0, y: 0 };
    this.scrollDelta = { x: 0, y: 0 };
    this.modifiers = 0;
  }
}
