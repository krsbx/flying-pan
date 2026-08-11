import type { ValidColor } from '@/flying/types';
import type { CanvasStateNodeValue } from './types';

export class CanvasStateNode implements CanvasStateNodeValue {
  public readonly fillStyle: ValidColor;
  public readonly strokeStyle: ValidColor;
  public readonly lineWidth: number;
  public readonly globalAlpha: number;
  public readonly font: string | null;
  public readonly fontSize: number;

  public constructor(value: CanvasStateNodeValue) {
    this.fillStyle = value.fillStyle;
    this.strokeStyle = value.strokeStyle;
    this.lineWidth = value.lineWidth;
    this.globalAlpha = value.globalAlpha;
    this.font = value.font;
    this.fontSize = value.fontSize;
  }
}
