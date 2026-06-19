import type { Vector2 } from '@vectors';

export interface ImageInfoOptions {
  path: string;
  vector2: Vector2;
  channel: number;
}

export class ImageInfo {
  public readonly path: string;
  public readonly vector2: Vector2;
  public readonly channel: number;
  public readonly channelRef: Int32Array;

  public constructor(options: ImageInfoOptions) {
    this.path = options.path;
    this.vector2 = options.vector2;
    this.channel = options.channel;
    this.channelRef = new Int32Array([this.channel]);
  }

  public get width() {
    return this.vector2.x;
  }

  public get height() {
    return this.vector2.y;
  }
}
