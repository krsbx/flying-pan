import type { Rect } from '@/flying/widget';
import type { GLFW } from '@glfw';
import type { Window, WindowManager } from '../../app';
import type { Coordinate2D, Resolution, RGBA } from '../../types';
import { Color, parseColor } from '../color';
import {
  GL_BLEND,
  GL_COLOR_BUFFER_BIT,
  GL_MODELVIEW,
  GL_ONE_MINUS_SRC_ALPHA,
  GL_PROJECTION,
  GL_QUADS,
  GL_SCISSOR_TEST,
  GL_SRC_ALPHA,
  GL_TEXTURE_2D,
  GL_TRIANGLES,
} from '../constant';
import type {
  DrawCornerArcOptions,
  DrawRectGLOptions,
  DrawRectOptions,
  DrawRoundedRectOptions,
  DrawShadowOptions,
  DrawTextOptions,
  DrawTextureOptions,
} from './types';
import { intersectRects } from './utility';

export interface RendererOptions {
  gl: GLFW;
  windowManager: WindowManager;
}

export class Renderer {
  public readonly gl: GLFW;
  public readonly windowManager: WindowManager;
  protected clipStack: Rect[];

  public constructor(options: RendererOptions) {
    this.gl = options.gl;
    this.windowManager = options.windowManager;
    this.clipStack = [];
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

  public drawRect(window: Window, options: DrawRectOptions): void {
    this.wrap(window, () => {
      const rgba = parseColor(options.color);

      if (options.opacity !== undefined) {
        rgba.alpha *= options.opacity;
      }

      if (options.borderRadius && options.borderRadius > 0) {
        this.drawRoundedRect({
          ...options,
          radius: options.borderRadius,
          rgba,
        });
      } else {
        this.drawRectGL({ ...options, rgba });
      }
    });
  }

  public drawShadow(window: Window, options: DrawShadowOptions): void {
    const { x, y, width, height, shadow, borderRadius } = options;

    this.wrap(window, () => {
      const baseRgba = parseColor(shadow.color);
      const offsetX = shadow.x ?? 0;
      const offsetY = shadow.y ?? 0;
      const blur = shadow.blur ?? 0;
      const spread = shadow.spread ?? 0;
      const radius = borderRadius ?? 0;

      const layers = Math.max(1, Math.min(12, Math.round(blur / 2)));

      for (let i = layers; i >= 1; i--) {
        const t = (i - 1) / layers;
        const expand = spread + blur * t;
        const alpha = baseRgba.alpha * (1 - t) * (1 - t);

        if (alpha <= 0) continue;

        const layerRgba: RGBA = { ...baseRgba, alpha };

        if (radius > 0) {
          this.drawRoundedRect({
            x: x - expand + offsetX,
            y: y - expand + offsetY,
            width: width + expand * 2,
            height: height + expand * 2,
            radius: radius + expand,
            rgba: layerRgba,
          });
        } else {
          this.drawRectGL({
            x: x - expand + offsetX,
            y: y - expand + offsetY,
            width: width + expand * 2,
            height: height + expand * 2,
            rgba: layerRgba,
          });
        }
      }
    });
  }

  protected drawRectGL(options: DrawRectGLOptions): void {
    const { x, y, width, height, rgba } = options;

    this.gl.glColor4f(rgba);
    this.gl.glBegin({ mode: GL_QUADS });

    // Render on top-left
    this.gl.glVertex2f({ x: x, y: y });
    // Render on top-right
    this.gl.glVertex2f({ x: x + width, y: y });
    // Render on bottom-right
    this.gl.glVertex2f({ x: x + width, y: y + height });
    // Render on bottom-left
    this.gl.glVertex2f({ x: x, y: y + height });

    this.gl.glEnd();
  }

  protected drawRoundedRect(options: DrawRoundedRectOptions): void {
    const { x, y, width, height, rgba, radius } = options;

    // Clamp radius
    const maxRadius = Math.min(width, height) / 2;
    const r = Math.min(radius, maxRadius);

    this.gl.glColor4f(rgba);
    this.gl.glBegin({ mode: GL_QUADS });

    // Center rectangle (full width, reduced height)
    this.gl.glVertex2f({ x, y: y + r });
    this.gl.glVertex2f({ x: x + width, y: y + r });
    this.gl.glVertex2f({ x: x + width, y: y + height - r });
    this.gl.glVertex2f({ x, y: y + height - r });

    // Top rectangle
    this.gl.glVertex2f({ x: x + r, y });
    this.gl.glVertex2f({ x: x + width - r, y });
    this.gl.glVertex2f({ x: x + width - r, y: y + r });
    this.gl.glVertex2f({ x: x + r, y: y + r });

    // Bottom rectangle
    this.gl.glVertex2f({ x: x + r, y: y + height - r });
    this.gl.glVertex2f({ x: x + width - r, y: y + height - r });
    this.gl.glVertex2f({ x: x + width - r, y: y + height });
    this.gl.glVertex2f({ x: x + r, y: y + height });

    this.gl.glEnd();

    const segments = Math.max(4, Math.ceil(r / 2));

    // Top-left
    this.drawCornerArc({
      cx: x + r,
      cy: y + r,
      radius: r,
      startAngle: Math.PI,
      endAngle: Math.PI * 1.5,
      segments,
      rgba,
    });

    // Top-right
    this.drawCornerArc({
      cx: x + width - r,
      cy: y + r,
      radius: r,
      startAngle: Math.PI * 1.5,
      endAngle: Math.PI * 2,
      segments,
      rgba,
    });

    // Bottom-right
    this.drawCornerArc({
      cx: x + width - r,
      cy: y + height - r,
      radius: r,
      startAngle: 0,
      endAngle: Math.PI * 0.5,
      segments,
      rgba,
    });

    // Bottom-left
    this.drawCornerArc({
      cx: x + r,
      cy: y + height - r,
      radius: r,
      startAngle: Math.PI * 0.5,
      endAngle: Math.PI,
      segments,
      rgba,
    });
  }

  protected drawCornerArc(options: DrawCornerArcOptions): void {
    const { cx, cy, radius, startAngle, endAngle, segments, rgba } = options;
    const step = (endAngle - startAngle) / segments;

    this.gl.glColor4f(rgba);
    this.gl.glBegin({ mode: GL_TRIANGLES });

    for (let i = 0; i < segments; i++) {
      const a1 = startAngle + step * i;
      const a2 = a1 + step;

      this.gl.glVertex2f({ x: cx, y: cy });
      this.gl.glVertex2f({
        x: cx + Math.cos(a1) * radius,
        y: cy + Math.sin(a1) * radius,
      });
      this.gl.glVertex2f({
        x: cx + Math.cos(a2) * radius,
        y: cy + Math.sin(a2) * radius,
      });
    }

    this.gl.glEnd();
  }

  public drawText(window: Window, options: DrawTextOptions): void {
    this.wrap(window, () => {
      const rgba = parseColor(options.color);

      if (options.opacity !== undefined) {
        rgba.alpha *= options.opacity;
      }

      const quads = options.atlas.getQuads(options);

      // Enable texturing
      this.gl.glEnable({ cap: GL_TEXTURE_2D });
      this.gl.glBindTexture({
        target: GL_TEXTURE_2D,
        texture: options.atlas.textureId,
      });
      this.gl.glColor4f(rgba);

      this.gl.glBegin({ mode: GL_QUADS });

      for (const q of quads) {
        // Top-left
        this.gl.glTexCoord2f({ s: q.s0, t: q.t0 });
        this.gl.glVertex2f({ x: q.x0, y: q.y0 });
        // Bottom-left
        this.gl.glTexCoord2f({ s: q.s0, t: q.t1 });
        this.gl.glVertex2f({ x: q.x0, y: q.y1 });
        // Bottom-right
        this.gl.glTexCoord2f({ s: q.s1, t: q.t1 });
        this.gl.glVertex2f({ x: q.x1, y: q.y1 });
        // Top-right
        this.gl.glTexCoord2f({ s: q.s1, t: q.t0 });
        this.gl.glVertex2f({ x: q.x1, y: q.y0 });
      }

      this.gl.glEnd();

      // Disable texturing
      this.gl.glBindTexture({ target: GL_TEXTURE_2D, texture: 0 });
      this.gl.glDisable({ cap: GL_TEXTURE_2D });
    });
  }

  public drawTexture(window: Window, options: DrawTextureOptions): void {
    this.wrap(window, () => {
      const { texture, x, y, width, height, opacity } = options;

      // Enable texturing
      this.gl.glEnable({ cap: GL_TEXTURE_2D });
      this.gl.glBindTexture({ target: GL_TEXTURE_2D, texture: texture.id });
      this.gl.glColor4f({ red: 1, green: 1, blue: 1, alpha: opacity ?? 1 });

      this.gl.glBegin({ mode: GL_QUADS });

      // Top-left
      this.gl.glTexCoord2f({ s: 0, t: 0 });
      this.gl.glVertex2f({ x, y });
      // Bottom-left
      this.gl.glTexCoord2f({ s: 0, t: 1 });
      this.gl.glVertex2f({ x, y: y + height });
      // Bottom-right
      this.gl.glTexCoord2f({ s: 1, t: 1 });
      this.gl.glVertex2f({ x: x + width, y: y + height });
      // Top-right
      this.gl.glTexCoord2f({ s: 1, t: 0 });
      this.gl.glVertex2f({ x: x + width, y });

      this.gl.glEnd();

      // Disable texturing
      this.gl.glBindTexture({ target: GL_TEXTURE_2D, texture: 0 });
      this.gl.glDisable({ cap: GL_TEXTURE_2D });
    });
  }

  public flush(window: Window): void {
    this.gl.glFlush();
    this.gl.glfwSwapBuffers({ window: window.$address });
  }

  public pushClip(window: Window, rect: Rect): void {
    this.wrap(window, () => {
      const current = this.clipStack[this.clipStack.length - 1];
      const intersected = current ? intersectRects(current, rect) : rect;

      this.clipStack.push(intersected);
      this.applyScissor(window, intersected);
    });
  }

  public popClip(window: Window): void {
    this.wrap(window, () => {
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
      this.gl.glPushMatrix();
      this.gl.glTranslatef({ x: offset.x, y: offset.y, z: 0 });
    });
  }

  public popTranslate(window: Window): void {
    this.wrap(window, () => {
      this.gl.glPopMatrix();
    });
  }
}
