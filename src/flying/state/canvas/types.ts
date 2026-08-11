import type { ValidColor } from '@flying/types';

export interface CanvasStateNodeValue {
  fillStyle: ValidColor;
  strokeStyle: ValidColor;
  lineWidth: number;
  globalAlpha: number;
  font: string | null;
  fontSize: number;
}
