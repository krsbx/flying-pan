import type { Rect } from '@flying/widget';
import type { GLFW } from '@glfw';
import type { Window, WindowManager } from '../../app';
import type { Coordinate2D, Resolution } from '../../types';
import { BatchManager, type GLLike } from '../batch';
import { Color, parseColor } from '../color';
import {
  GL_BLEND,
  GL_COLOR_BUFFER_BIT,
  GL_MODELVIEW,
  GL_ONE_MINUS_SRC_ALPHA,
  GL_PROJECTION,
  GL_SCISSOR_TEST,
  GL_SRC_ALPHA,
} from '../constant';
import {
  drawArc,
  drawGradientRect,
  drawRect,
  drawRing,
  drawShadow,
  drawText,
  drawTexture,
} from '../painters';
import type {
  DrawArcOptions,
  DrawGradientRectOptions,
  DrawRectOptions,
  DrawRingOptions,
  DrawShadowOptions,
  DrawTextOptions,
  DrawTextureOptions,
} from './types';
import { intersectRects } from './utility';

export interface RendererOptions {
  gl: GLFW;
  windowManager: WindowManager;
  useBatching?: boolean;
}

export class Renderer {
  public readonly gl: GLFW;
  public readonly windowManager: WindowManager;
  protected clipStack: Rect[];
  protected batch: BatchManager | null;

  public constructor(options: RendererOptions) {
    this.gl = options.gl;
    this.windowManager = options.windowManager;
    this.clipStack = [];
    this.batch = options.useBatching ? new BatchManager() : null;
  }

  protected get drawCtx(): GLLike {
    return this.batch ?? this.gl;
  }

  // Wrap the function to ensure the context is set correctly
  protected wrap<T, U extends () => T>(window: Window, fn: U) {
    const currentContext = this.gl.glfwGetCurrentContext();
    const isNotSameContext = currentContext !== window.$address;

    if (isNotSameContext) {
      this.gl.glfwMakeContextCurrent({ window: window.$address });
    }

    fn();

    if (isNotSameContext) {
      this.gl.glfwMakeContextCurrent({ window: currentContext });
    }
  }

  // -------------------------------------------------------------------------
  // Lifecycle
  // -------------------------------------------------------------------------

  public init(window: Window): void {
    this.wrap(window, () => {
      const { frameBuffer, size, $address } = window;

      this.gl.glViewport({
        x: 0,
        y: 0,
        ...frameBuffer,
      });
      this.gl.glfwSetWindowSize({
        window: $address,
        ...size,
      });

      // Set up 2D projection: web-style (0,0) = top-left, y-down
      // Maps pixel coords to NDC: (0,0)→(-1,1), (width,height)→(1,-1)
      this.gl.glMatrixMode({ mode: GL_PROJECTION });
      this.gl.glLoadIdentity();
      this.gl.glTranslatef({ x: -1, y: 1, z: 0 });
      this.gl.glScalef({ x: 2 / size.width, y: -2 / size.height, z: 1 });
      this.gl.glMatrixMode({ mode: GL_MODELVIEW });
      this.gl.glLoadIdentity();

      // Enable alpha blending
      this.gl.glEnable({ cap: GL_BLEND });
      this.gl.glBlendFunc({
        sfactor: GL_SRC_ALPHA,
        dfactor: GL_ONE_MINUS_SRC_ALPHA,
      });
    });
  }

  public resize(window: Window, options: Resolution): void {
    window.size = {
      height: options.height,
      width: options.width,
    };

    this.init(window);
  }

  public clear(window: Window, color: Color | (string & {})): void {
    this.wrap(window, () => {
      const rgba = parseColor(color);

      this.gl.glClearColor(rgba);
      this.gl.glClear({ mask: GL_COLOR_BUFFER_BIT });
    });
  }

  public flush(window: Window): void {
    this.wrap(window, () => {
      this.batch?.flush(this.gl);

      this.gl.glFlush();
      this.gl.glfwSwapBuffers({ window: window.$address });
    });
  }

  public pushClip(window: Window, rect: Rect): void {
    this.wrap(window, () => {
      this.batch?.flush(this.gl);

      const current = this.clipStack[this.clipStack.length - 1];
      const intersected = current ? intersectRects(current, rect) : rect;

      this.clipStack.push(intersected);
      this.applyScissor(window, intersected);
    });
  }

  public popClip(window: Window): void {
    this.wrap(window, () => {
      this.batch?.flush(this.gl);

      this.clipStack.pop();

      const top = this.clipStack[this.clipStack.length - 1];

      if (top) {
        this.applyScissor(window, top);
      } else {
        this.gl.glDisable({ cap: GL_SCISSOR_TEST });
      }
    });
  }

  protected applyScissor(window: Window, rect: Rect): void {
    const { frameBuffer, size } = window;
    const scaleX = frameBuffer.width / size.width;
    const scaleY = frameBuffer.height / size.height;

    this.gl.glEnable({ cap: GL_SCISSOR_TEST });
    this.gl.glScissor({
      x: rect.x * scaleX,
      y: (size.height - rect.y - rect.height) * scaleY,
      width: rect.width * scaleX,
      height: rect.height * scaleY,
    });
  }

  public pushTranslate(window: Window, offset: Coordinate2D): void {
    this.wrap(window, () => {
      this.batch?.flush(this.gl);
      this.gl.glPushMatrix();
      this.gl.glTranslatef({ x: offset.x, y: offset.y, z: 0 });
    });
  }

  public popTranslate(window: Window): void {
    this.wrap(window, () => {
      this.batch?.flush(this.gl);
      this.gl.glPopMatrix();
    });
  }

  public drawRect(window: Window, options: DrawRectOptions): void {
    this.wrap(window, () => drawRect(this.drawCtx, options));
  }

  public drawGradientRect(
    window: Window,
    options: DrawGradientRectOptions
  ): void {
    this.wrap(window, () => drawGradientRect(this.drawCtx, options));
  }

  public drawShadow(window: Window, options: DrawShadowOptions): void {
    this.wrap(window, () => drawShadow(this.drawCtx, options));
  }

  public drawRing(window: Window, options: DrawRingOptions): void {
    this.wrap(window, () => drawRing(this.drawCtx, options));
  }

  public drawArc(window: Window, options: DrawArcOptions): void {
    this.wrap(window, () => drawArc(this.drawCtx, options));
  }

  public drawText(window: Window, options: DrawTextOptions): void {
    this.wrap(window, () => drawText(this.drawCtx, options));
  }

  public drawTexture(window: Window, options: DrawTextureOptions): void {
    this.wrap(window, () => drawTexture(this.drawCtx, options));
  }
}
