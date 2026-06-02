import type { GLFW } from '@/glfw';
import type { Window, WindowManager } from '../../app';
import type { FontAtlas } from '../../fonts';
import type { Coordinate2D, Resolution } from '../../types';
import { Color, parseColor } from '../color';
import {
  GL_BLEND,
  GL_COLOR_BUFFER_BIT,
  GL_MODELVIEW,
  GL_ONE_MINUS_SRC_ALPHA,
  GL_PROJECTION,
  GL_QUADS,
  GL_SRC_ALPHA,
  GL_TEXTURE_2D,
  GL_TRIANGLES,
} from '../constant';
import type {
  DrawCornerArcOptions,
  DrawRectGLOptions,
  DrawRectOptions,
  DrawRoundedRectOptions,
} from './types';

export interface RendererOptions {
  gl: GLFW;
  windowManager: WindowManager;
}

export class Renderer {
  public readonly gl: GLFW;
  public readonly windowManager: WindowManager;

  public constructor(options: RendererOptions) {
    this.gl = options.gl;
    this.windowManager = options.windowManager;
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

  public resize(window: Window, options: Resolution) {
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

  public drawRect(window: Window, options: DrawRectOptions) {
    this.wrap(window, () => {
      const rgba = parseColor(options.color);

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

  protected drawRectGL(options: DrawRectGLOptions) {
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

  protected drawRoundedRect(options: DrawRoundedRectOptions) {
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

  protected drawCornerArc(options: DrawCornerArcOptions) {
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

  public drawText(
    window: Window,
    options: Coordinate2D & {
      text: string;
      atlas: FontAtlas;
      color: Color | (string & {});
    }
  ) {
    this.wrap(window, () => {
      const rgba = parseColor(options.color);
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

  public flush(window: Window): void {
    this.gl.glFlush();
    this.gl.glfwSwapBuffers({ window: window.$address });
  }
}
