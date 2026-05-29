import type { TypedJSCallback } from '@utility/callback';
import { stringToCString } from '@utility/common';
import type { CString, Pointer } from 'bun:ffi';
import type { GLFW } from './index';
import type {
  GLFWcharfun,
  GLFWcharmodsfun,
  GLFWcursorenterfun,
  GLFWcursorposfun,
  GLFWdropfun,
  GLFWerrorfun,
  GLFWframebuffersizefun,
  GLFWjoystickfun,
  GLFWkeyfun,
  GLFWmonitorfun,
  GLFWmousebuttonfun,
  GLFWscrollfun,
  GLFWwindowclosefun,
  GLFWwindowcontentscalefun,
  GLFWwindowfocusfun,
  GLFWwindowiconifyfun,
  GLFWwindowmaximizefun,
  GLFWwindowposfun,
  GLFWwindowrefreshfun,
  GLFWwindowsizefun,
} from './types';

export function glAccum(
  this: GLFW,
  options: {
    op: number;
    value: number;
  }
): void {
  this.symbols.glAccum(options.op, options.value);
}

export function glAlphaFunc(
  this: GLFW,
  options: {
    func: number;
    ref: number;
  }
): void {
  this.symbols.glAlphaFunc(options.func, options.ref);
}

export function glAreTexturesResident(
  this: GLFW,
  options: {
    n: number;
    textures: Pointer | NodeJS.TypedArray | null;
    residences: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.glAreTexturesResident(
    options.n,
    options.textures,
    options.residences
  ) as Pointer | null;
}

export function glArrayElement(
  this: GLFW,
  options: {
    i: number;
  }
): void {
  this.symbols.glArrayElement(options.i);
}

export function glBegin(
  this: GLFW,
  options: {
    mode: number;
  }
): void {
  this.symbols.glBegin(options.mode);
}

export function glBindTexture(
  this: GLFW,
  options: {
    target: number;
    texture: number;
  }
): void {
  this.symbols.glBindTexture(options.target, options.texture);
}

export function glBitmap(
  this: GLFW,
  options: {
    width: number;
    height: number;
    xorig: number;
    yorig: number;
    xmove: number;
    ymove: number;
    bitmap: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glBitmap(
    options.width,
    options.height,
    options.xorig,
    options.yorig,
    options.xmove,
    options.ymove,
    options.bitmap
  );
}

export function glBlendColor(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }
): void {
  this.symbols.glBlendColor(
    options.red,
    options.green,
    options.blue,
    options.alpha
  );
}

export function glBlendEquation(
  this: GLFW,
  options: {
    mode: number;
  }
): void {
  this.symbols.glBlendEquation(options.mode);
}

export function glBlendEquationSeparate(
  this: GLFW,
  options: {
    modeRGB: number;
    modeAlpha: number;
  }
): void {
  this.symbols.glBlendEquationSeparate(options.modeRGB, options.modeAlpha);
}

export function glBlendFunc(
  this: GLFW,
  options: {
    sfactor: number;
    dfactor: number;
  }
): void {
  this.symbols.glBlendFunc(options.sfactor, options.dfactor);
}

export function glCallList(
  this: GLFW,
  options: {
    list: number;
  }
): void {
  this.symbols.glCallList(options.list);
}

export function glCallLists(
  this: GLFW,
  options: {
    n: number;
    type: number;
    lists: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glCallLists(options.n, options.type, options.lists);
}

export function glClear(
  this: GLFW,
  options: {
    mask: number;
  }
): void {
  this.symbols.glClear(options.mask);
}

export function glClearAccum(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }
): void {
  this.symbols.glClearAccum(
    options.red,
    options.green,
    options.blue,
    options.alpha
  );
}

export function glClearColor(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }
): void {
  this.symbols.glClearColor(
    options.red,
    options.green,
    options.blue,
    options.alpha
  );
}

export function glClearDepth(
  this: GLFW,
  options: {
    depth: number;
  }
): void {
  this.symbols.glClearDepth(options.depth);
}

export function glClearIndex(
  this: GLFW,
  options: {
    c: number;
  }
): void {
  this.symbols.glClearIndex(options.c);
}

export function glClearStencil(
  this: GLFW,
  options: {
    s: number;
  }
): void {
  this.symbols.glClearStencil(options.s);
}

export function glClipPlane(
  this: GLFW,
  options: {
    plane: number;
    equation: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glClipPlane(options.plane, options.equation);
}

export function glColor3b(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
  }
): void {
  this.symbols.glColor3b(options.red, options.green, options.blue);
}

export function glColor3bv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColor3bv(options.v);
}

export function glColor3d(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
  }
): void {
  this.symbols.glColor3d(options.red, options.green, options.blue);
}

export function glColor3dv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColor3dv(options.v);
}

export function glColor3f(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
  }
): void {
  this.symbols.glColor3f(options.red, options.green, options.blue);
}

export function glColor3fv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColor3fv(options.v);
}

export function glColor3i(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
  }
): void {
  this.symbols.glColor3i(options.red, options.green, options.blue);
}

export function glColor3iv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColor3iv(options.v);
}

export function glColor3s(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
  }
): void {
  this.symbols.glColor3s(options.red, options.green, options.blue);
}

export function glColor3sv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColor3sv(options.v);
}

export function glColor3ub(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
  }
): void {
  this.symbols.glColor3ub(options.red, options.green, options.blue);
}

export function glColor3ubv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColor3ubv(options.v);
}

export function glColor3ui(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
  }
): void {
  this.symbols.glColor3ui(options.red, options.green, options.blue);
}

export function glColor3uiv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColor3uiv(options.v);
}

export function glColor3us(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
  }
): void {
  this.symbols.glColor3us(options.red, options.green, options.blue);
}

export function glColor3usv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColor3usv(options.v);
}

export function glColor4b(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }
): void {
  this.symbols.glColor4b(
    options.red,
    options.green,
    options.blue,
    options.alpha
  );
}

export function glColor4bv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColor4bv(options.v);
}

export function glColor4d(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }
): void {
  this.symbols.glColor4d(
    options.red,
    options.green,
    options.blue,
    options.alpha
  );
}

export function glColor4dv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColor4dv(options.v);
}

export function glColor4f(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }
): void {
  this.symbols.glColor4f(
    options.red,
    options.green,
    options.blue,
    options.alpha
  );
}

export function glColor4fv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColor4fv(options.v);
}

export function glColor4i(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }
): void {
  this.symbols.glColor4i(
    options.red,
    options.green,
    options.blue,
    options.alpha
  );
}

export function glColor4iv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColor4iv(options.v);
}

export function glColor4s(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }
): void {
  this.symbols.glColor4s(
    options.red,
    options.green,
    options.blue,
    options.alpha
  );
}

export function glColor4sv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColor4sv(options.v);
}

export function glColor4ub(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }
): void {
  this.symbols.glColor4ub(
    options.red,
    options.green,
    options.blue,
    options.alpha
  );
}

export function glColor4ubv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColor4ubv(options.v);
}

export function glColor4ui(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }
): void {
  this.symbols.glColor4ui(
    options.red,
    options.green,
    options.blue,
    options.alpha
  );
}

export function glColor4uiv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColor4uiv(options.v);
}

export function glColor4us(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }
): void {
  this.symbols.glColor4us(
    options.red,
    options.green,
    options.blue,
    options.alpha
  );
}

export function glColor4usv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColor4usv(options.v);
}

export function glColorMask(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }
): void {
  this.symbols.glColorMask(
    options.red,
    options.green,
    options.blue,
    options.alpha
  );
}

export function glColorMaterial(
  this: GLFW,
  options: {
    face: number;
    mode: number;
  }
): void {
  this.symbols.glColorMaterial(options.face, options.mode);
}

export function glColorPointer(
  this: GLFW,
  options: {
    size: number;
    type: number;
    stride: number;
    pointer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColorPointer(
    options.size,
    options.type,
    options.stride,
    options.pointer
  );
}

export function glColorSubTable(
  this: GLFW,
  options: {
    target: number;
    start: number;
    count: number;
    format: number;
    type: number;
    data: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColorSubTable(
    options.target,
    options.start,
    options.count,
    options.format,
    options.type,
    options.data
  );
}

export function glColorTable(
  this: GLFW,
  options: {
    target: number;
    internalformat: number;
    width: number;
    format: number;
    type: number;
    table: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColorTable(
    options.target,
    options.internalformat,
    options.width,
    options.format,
    options.type,
    options.table
  );
}

export function glColorTableParameterfv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColorTableParameterfv(
    options.target,
    options.pname,
    options.params
  );
}

export function glColorTableParameteriv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glColorTableParameteriv(
    options.target,
    options.pname,
    options.params
  );
}

export function glConvolutionFilter1D(
  this: GLFW,
  options: {
    target: number;
    internalformat: number;
    width: number;
    format: number;
    type: number;
    image: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glConvolutionFilter1D(
    options.target,
    options.internalformat,
    options.width,
    options.format,
    options.type,
    options.image
  );
}

export function glConvolutionFilter2D(
  this: GLFW,
  options: {
    target: number;
    internalformat: number;
    width: number;
    height: number;
    format: number;
    type: number;
    image: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glConvolutionFilter2D(
    options.target,
    options.internalformat,
    options.width,
    options.height,
    options.format,
    options.type,
    options.image
  );
}

export function glConvolutionParameterf(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: number;
  }
): void {
  this.symbols.glConvolutionParameterf(
    options.target,
    options.pname,
    options.params
  );
}

export function glConvolutionParameterfv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glConvolutionParameterfv(
    options.target,
    options.pname,
    options.params
  );
}

export function glConvolutionParameteri(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: number;
  }
): void {
  this.symbols.glConvolutionParameteri(
    options.target,
    options.pname,
    options.params
  );
}

export function glConvolutionParameteriv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glConvolutionParameteriv(
    options.target,
    options.pname,
    options.params
  );
}

export function glCopyColorSubTable(
  this: GLFW,
  options: {
    target: number;
    start: number;
    x: number;
    y: number;
    width: number;
  }
): void {
  this.symbols.glCopyColorSubTable(
    options.target,
    options.start,
    options.x,
    options.y,
    options.width
  );
}

export function glCopyColorTable(
  this: GLFW,
  options: {
    target: number;
    internalformat: number;
    x: number;
    y: number;
    width: number;
  }
): void {
  this.symbols.glCopyColorTable(
    options.target,
    options.internalformat,
    options.x,
    options.y,
    options.width
  );
}

export function glCopyConvolutionFilter1D(
  this: GLFW,
  options: {
    target: number;
    internalformat: number;
    x: number;
    y: number;
    width: number;
  }
): void {
  this.symbols.glCopyConvolutionFilter1D(
    options.target,
    options.internalformat,
    options.x,
    options.y,
    options.width
  );
}

export function glCopyConvolutionFilter2D(
  this: GLFW,
  options: {
    target: number;
    internalformat: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }
): void {
  this.symbols.glCopyConvolutionFilter2D(
    options.target,
    options.internalformat,
    options.x,
    options.y,
    options.width,
    options.height
  );
}

export function glCopyPixels(
  this: GLFW,
  options: {
    x: number;
    y: number;
    width: number;
    height: number;
    type: number;
  }
): void {
  this.symbols.glCopyPixels(
    options.x,
    options.y,
    options.width,
    options.height,
    options.type
  );
}

export function glCopyTexImage1D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    internalformat: number;
    x: number;
    y: number;
    width: number;
    border: number;
  }
): void {
  this.symbols.glCopyTexImage1D(
    options.target,
    options.level,
    options.internalformat,
    options.x,
    options.y,
    options.width,
    options.border
  );
}

export function glCopyTexImage2D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    internalformat: number;
    x: number;
    y: number;
    width: number;
    height: number;
    border: number;
  }
): void {
  this.symbols.glCopyTexImage2D(
    options.target,
    options.level,
    options.internalformat,
    options.x,
    options.y,
    options.width,
    options.height,
    options.border
  );
}

export function glCopyTexSubImage1D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    xoffset: number;
    x: number;
    y: number;
    width: number;
  }
): void {
  this.symbols.glCopyTexSubImage1D(
    options.target,
    options.level,
    options.xoffset,
    options.x,
    options.y,
    options.width
  );
}

export function glCopyTexSubImage2D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    xoffset: number;
    yoffset: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }
): void {
  this.symbols.glCopyTexSubImage2D(
    options.target,
    options.level,
    options.xoffset,
    options.yoffset,
    options.x,
    options.y,
    options.width,
    options.height
  );
}

export function glCopyTexSubImage3D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    xoffset: number;
    yoffset: number;
    zoffset: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }
): void {
  this.symbols.glCopyTexSubImage3D(
    options.target,
    options.level,
    options.xoffset,
    options.yoffset,
    options.zoffset,
    options.x,
    options.y,
    options.width,
    options.height
  );
}

export function glCullFace(
  this: GLFW,
  options: {
    mode: number;
  }
): void {
  this.symbols.glCullFace(options.mode);
}

export function glDeleteLists(
  this: GLFW,
  options: {
    list: number;
    range: number;
  }
): void {
  this.symbols.glDeleteLists(options.list, options.range);
}

export function glDeleteTextures(
  this: GLFW,
  options: {
    n: number;
    textures: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glDeleteTextures(options.n, options.textures);
}

export function glDepthFunc(
  this: GLFW,
  options: {
    func: number;
  }
): void {
  this.symbols.glDepthFunc(options.func);
}

export function glDepthMask(
  this: GLFW,
  options: {
    flag: number;
  }
): void {
  this.symbols.glDepthMask(options.flag);
}

export function glDepthRange(
  this: GLFW,
  options: {
    zNear: number;
    zFar: number;
  }
): void {
  this.symbols.glDepthRange(options.zNear, options.zFar);
}

export function glDisable(
  this: GLFW,
  options: {
    cap: number;
  }
): void {
  this.symbols.glDisable(options.cap);
}

export function glDisableClientState(
  this: GLFW,
  options: {
    array: number;
  }
): void {
  this.symbols.glDisableClientState(options.array);
}

export function glDrawArrays(
  this: GLFW,
  options: {
    mode: number;
    first: number;
    count: number;
  }
): void {
  this.symbols.glDrawArrays(options.mode, options.first, options.count);
}

export function glDrawBuffer(
  this: GLFW,
  options: {
    mode: number;
  }
): void {
  this.symbols.glDrawBuffer(options.mode);
}

export function glDrawElements(
  this: GLFW,
  options: {
    mode: number;
    count: number;
    type: number;
    indices: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glDrawElements(
    options.mode,
    options.count,
    options.type,
    options.indices
  );
}

export function glDrawPixels(
  this: GLFW,
  options: {
    width: number;
    height: number;
    format: number;
    type: number;
    pixels: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glDrawPixels(
    options.width,
    options.height,
    options.format,
    options.type,
    options.pixels
  );
}

export function glDrawRangeElements(
  this: GLFW,
  options: {
    mode: number;
    start: number;
    end: number;
    count: number;
    type: number;
    indices: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glDrawRangeElements(
    options.mode,
    options.start,
    options.end,
    options.count,
    options.type,
    options.indices
  );
}

export function glEdgeFlag(
  this: GLFW,
  options: {
    flag: number;
  }
): void {
  this.symbols.glEdgeFlag(options.flag);
}

export function glEdgeFlagPointer(
  this: GLFW,
  options: {
    stride: number;
    pointer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glEdgeFlagPointer(options.stride, options.pointer);
}

export function glEdgeFlagv(
  this: GLFW,
  options: {
    flag: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glEdgeFlagv(options.flag);
}

export function glEnable(
  this: GLFW,
  options: {
    cap: number;
  }
): void {
  this.symbols.glEnable(options.cap);
}

export function glEnableClientState(
  this: GLFW,
  options: {
    array: number;
  }
): void {
  this.symbols.glEnableClientState(options.array);
}

export function glEnd(this: GLFW): void {
  this.symbols.glEnd();
}

export function glEndList(this: GLFW): void {
  this.symbols.glEndList();
}

export function glEvalCoord1d(
  this: GLFW,
  options: {
    u: number;
  }
): void {
  this.symbols.glEvalCoord1d(options.u);
}

export function glEvalCoord1dv(
  this: GLFW,
  options: {
    u: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glEvalCoord1dv(options.u);
}

export function glEvalCoord1f(
  this: GLFW,
  options: {
    u: number;
  }
): void {
  this.symbols.glEvalCoord1f(options.u);
}

export function glEvalCoord1fv(
  this: GLFW,
  options: {
    u: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glEvalCoord1fv(options.u);
}

export function glEvalCoord2d(
  this: GLFW,
  options: {
    u: number;
    v: number;
  }
): void {
  this.symbols.glEvalCoord2d(options.u, options.v);
}

export function glEvalCoord2dv(
  this: GLFW,
  options: {
    u: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glEvalCoord2dv(options.u);
}

export function glEvalCoord2f(
  this: GLFW,
  options: {
    u: number;
    v: number;
  }
): void {
  this.symbols.glEvalCoord2f(options.u, options.v);
}

export function glEvalCoord2fv(
  this: GLFW,
  options: {
    u: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glEvalCoord2fv(options.u);
}

export function glEvalMesh1(
  this: GLFW,
  options: {
    mode: number;
    i1: number;
    i2: number;
  }
): void {
  this.symbols.glEvalMesh1(options.mode, options.i1, options.i2);
}

export function glEvalMesh2(
  this: GLFW,
  options: {
    mode: number;
    i1: number;
    i2: number;
    j1: number;
    j2: number;
  }
): void {
  this.symbols.glEvalMesh2(
    options.mode,
    options.i1,
    options.i2,
    options.j1,
    options.j2
  );
}

export function glEvalPoint1(
  this: GLFW,
  options: {
    i: number;
  }
): void {
  this.symbols.glEvalPoint1(options.i);
}

export function glEvalPoint2(
  this: GLFW,
  options: {
    i: number;
    j: number;
  }
): void {
  this.symbols.glEvalPoint2(options.i, options.j);
}

export function glFeedbackBuffer(
  this: GLFW,
  options: {
    size: number;
    type: number;
    buffer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glFeedbackBuffer(options.size, options.type, options.buffer);
}

export function glFinish(this: GLFW): void {
  this.symbols.glFinish();
}

export function glFlush(this: GLFW): void {
  this.symbols.glFlush();
}

export function glFogf(
  this: GLFW,
  options: {
    pname: number;
    param: number;
  }
): void {
  this.symbols.glFogf(options.pname, options.param);
}

export function glFogfv(
  this: GLFW,
  options: {
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glFogfv(options.pname, options.params);
}

export function glFogi(
  this: GLFW,
  options: {
    pname: number;
    param: number;
  }
): void {
  this.symbols.glFogi(options.pname, options.param);
}

export function glFogiv(
  this: GLFW,
  options: {
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glFogiv(options.pname, options.params);
}

export function glFrontFace(
  this: GLFW,
  options: {
    mode: number;
  }
): void {
  this.symbols.glFrontFace(options.mode);
}

export function glFrustum(
  this: GLFW,
  options: {
    left: number;
    right: number;
    bottom: number;
    top: number;
    zNear: number;
    zFar: number;
  }
): void {
  this.symbols.glFrustum(
    options.left,
    options.right,
    options.bottom,
    options.top,
    options.zNear,
    options.zFar
  );
}

export function glGenLists(
  this: GLFW,
  options: {
    range: number;
  }
): Pointer | null {
  return this.symbols.glGenLists(options.range) as Pointer | null;
}

export function glGenTextures(
  this: GLFW,
  options: {
    n: number;
    textures: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGenTextures(options.n, options.textures);
}

export function glGetBooleanv(
  this: GLFW,
  options: {
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetBooleanv(options.pname, options.params);
}

export function glGetClipPlane(
  this: GLFW,
  options: {
    plane: number;
    equation: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetClipPlane(options.plane, options.equation);
}

export function glGetColorTable(
  this: GLFW,
  options: {
    target: number;
    format: number;
    type: number;
    table: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetColorTable(
    options.target,
    options.format,
    options.type,
    options.table
  );
}

export function glGetColorTableParameterfv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetColorTableParameterfv(
    options.target,
    options.pname,
    options.params
  );
}

export function glGetColorTableParameteriv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetColorTableParameteriv(
    options.target,
    options.pname,
    options.params
  );
}

export function glGetConvolutionFilter(
  this: GLFW,
  options: {
    target: number;
    format: number;
    type: number;
    image: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetConvolutionFilter(
    options.target,
    options.format,
    options.type,
    options.image
  );
}

export function glGetConvolutionParameterfv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetConvolutionParameterfv(
    options.target,
    options.pname,
    options.params
  );
}

export function glGetConvolutionParameteriv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetConvolutionParameteriv(
    options.target,
    options.pname,
    options.params
  );
}

export function glGetDoublev(
  this: GLFW,
  options: {
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetDoublev(options.pname, options.params);
}

export function glGetError(this: GLFW): Pointer | null {
  return this.symbols.glGetError() as Pointer | null;
}

export function glGetFloatv(
  this: GLFW,
  options: {
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetFloatv(options.pname, options.params);
}

export function glGetHistogram(
  this: GLFW,
  options: {
    target: number;
    reset: number;
    format: number;
    type: number;
    values: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetHistogram(
    options.target,
    options.reset,
    options.format,
    options.type,
    options.values
  );
}

export function glGetHistogramParameterfv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetHistogramParameterfv(
    options.target,
    options.pname,
    options.params
  );
}

export function glGetHistogramParameteriv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetHistogramParameteriv(
    options.target,
    options.pname,
    options.params
  );
}

export function glGetIntegerv(
  this: GLFW,
  options: {
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetIntegerv(options.pname, options.params);
}

export function glGetLightfv(
  this: GLFW,
  options: {
    light: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetLightfv(options.light, options.pname, options.params);
}

export function glGetLightiv(
  this: GLFW,
  options: {
    light: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetLightiv(options.light, options.pname, options.params);
}

export function glGetMapdv(
  this: GLFW,
  options: {
    target: number;
    query: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetMapdv(options.target, options.query, options.v);
}

export function glGetMapfv(
  this: GLFW,
  options: {
    target: number;
    query: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetMapfv(options.target, options.query, options.v);
}

export function glGetMapiv(
  this: GLFW,
  options: {
    target: number;
    query: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetMapiv(options.target, options.query, options.v);
}

export function glGetMaterialfv(
  this: GLFW,
  options: {
    face: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetMaterialfv(options.face, options.pname, options.params);
}

export function glGetMaterialiv(
  this: GLFW,
  options: {
    face: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetMaterialiv(options.face, options.pname, options.params);
}

export function glGetMinmax(
  this: GLFW,
  options: {
    target: number;
    reset: number;
    format: number;
    type: number;
    values: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetMinmax(
    options.target,
    options.reset,
    options.format,
    options.type,
    options.values
  );
}

export function glGetMinmaxParameterfv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetMinmaxParameterfv(
    options.target,
    options.pname,
    options.params
  );
}

export function glGetMinmaxParameteriv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetMinmaxParameteriv(
    options.target,
    options.pname,
    options.params
  );
}

export function glGetPixelMapfv(
  this: GLFW,
  options: {
    map: number;
    values: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetPixelMapfv(options.map, options.values);
}

export function glGetPixelMapuiv(
  this: GLFW,
  options: {
    map: number;
    values: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetPixelMapuiv(options.map, options.values);
}

export function glGetPixelMapusv(
  this: GLFW,
  options: {
    map: number;
    values: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetPixelMapusv(options.map, options.values);
}

export function glGetPointerv(
  this: GLFW,
  options: {
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetPointerv(options.pname, options.params);
}

export function glGetPolygonStipple(
  this: GLFW,
  options: {
    mask: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetPolygonStipple(options.mask);
}

export function glGetSeparableFilter(
  this: GLFW,
  options: {
    target: number;
    format: number;
    type: number;
    row: Pointer | NodeJS.TypedArray | null;
    column: Pointer | NodeJS.TypedArray | null;
    span: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetSeparableFilter(
    options.target,
    options.format,
    options.type,
    options.row,
    options.column,
    options.span
  );
}

export function glGetString(
  this: GLFW,
  options: {
    name: number;
  }
): Pointer | null {
  return this.symbols.glGetString(options.name) as Pointer | null;
}

export function glGetTexEnvfv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetTexEnvfv(options.target, options.pname, options.params);
}

export function glGetTexEnviv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetTexEnviv(options.target, options.pname, options.params);
}

export function glGetTexGendv(
  this: GLFW,
  options: {
    coord: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetTexGendv(options.coord, options.pname, options.params);
}

export function glGetTexGenfv(
  this: GLFW,
  options: {
    coord: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetTexGenfv(options.coord, options.pname, options.params);
}

export function glGetTexGeniv(
  this: GLFW,
  options: {
    coord: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetTexGeniv(options.coord, options.pname, options.params);
}

export function glGetTexImage(
  this: GLFW,
  options: {
    target: number;
    level: number;
    format: number;
    type: number;
    pixels: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetTexImage(
    options.target,
    options.level,
    options.format,
    options.type,
    options.pixels
  );
}

export function glGetTexLevelParameterfv(
  this: GLFW,
  options: {
    target: number;
    level: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetTexLevelParameterfv(
    options.target,
    options.level,
    options.pname,
    options.params
  );
}

export function glGetTexLevelParameteriv(
  this: GLFW,
  options: {
    target: number;
    level: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetTexLevelParameteriv(
    options.target,
    options.level,
    options.pname,
    options.params
  );
}

export function glGetTexParameterfv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetTexParameterfv(
    options.target,
    options.pname,
    options.params
  );
}

export function glGetTexParameteriv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetTexParameteriv(
    options.target,
    options.pname,
    options.params
  );
}

export function glHint(
  this: GLFW,
  options: {
    target: number;
    mode: number;
  }
): void {
  this.symbols.glHint(options.target, options.mode);
}

export function glHistogram(
  this: GLFW,
  options: {
    target: number;
    width: number;
    internalformat: number;
    sink: number;
  }
): void {
  this.symbols.glHistogram(
    options.target,
    options.width,
    options.internalformat,
    options.sink
  );
}

export function glIndexMask(
  this: GLFW,
  options: {
    mask: number;
  }
): void {
  this.symbols.glIndexMask(options.mask);
}

export function glIndexPointer(
  this: GLFW,
  options: {
    type: number;
    stride: number;
    pointer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glIndexPointer(options.type, options.stride, options.pointer);
}

export function glIndexd(
  this: GLFW,
  options: {
    c: number;
  }
): void {
  this.symbols.glIndexd(options.c);
}

export function glIndexdv(
  this: GLFW,
  options: {
    c: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glIndexdv(options.c);
}

export function glIndexf(
  this: GLFW,
  options: {
    c: number;
  }
): void {
  this.symbols.glIndexf(options.c);
}

export function glIndexfv(
  this: GLFW,
  options: {
    c: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glIndexfv(options.c);
}

export function glIndexi(
  this: GLFW,
  options: {
    c: number;
  }
): void {
  this.symbols.glIndexi(options.c);
}

export function glIndexiv(
  this: GLFW,
  options: {
    c: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glIndexiv(options.c);
}

export function glIndexs(
  this: GLFW,
  options: {
    c: number;
  }
): void {
  this.symbols.glIndexs(options.c);
}

export function glIndexsv(
  this: GLFW,
  options: {
    c: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glIndexsv(options.c);
}

export function glIndexub(
  this: GLFW,
  options: {
    c: number;
  }
): void {
  this.symbols.glIndexub(options.c);
}

export function glIndexubv(
  this: GLFW,
  options: {
    c: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glIndexubv(options.c);
}

export function glInitNames(this: GLFW): void {
  this.symbols.glInitNames();
}

export function glInterleavedArrays(
  this: GLFW,
  options: {
    format: number;
    stride: number;
    pointer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glInterleavedArrays(
    options.format,
    options.stride,
    options.pointer
  );
}

export function glIsEnabled(
  this: GLFW,
  options: {
    cap: number;
  }
): Pointer | null {
  return this.symbols.glIsEnabled(options.cap) as Pointer | null;
}

export function glIsList(
  this: GLFW,
  options: {
    list: number;
  }
): Pointer | null {
  return this.symbols.glIsList(options.list) as Pointer | null;
}

export function glIsTexture(
  this: GLFW,
  options: {
    texture: number;
  }
): Pointer | null {
  return this.symbols.glIsTexture(options.texture) as Pointer | null;
}

export function glLightModelf(
  this: GLFW,
  options: {
    pname: number;
    param: number;
  }
): void {
  this.symbols.glLightModelf(options.pname, options.param);
}

export function glLightModelfv(
  this: GLFW,
  options: {
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glLightModelfv(options.pname, options.params);
}

export function glLightModeli(
  this: GLFW,
  options: {
    pname: number;
    param: number;
  }
): void {
  this.symbols.glLightModeli(options.pname, options.param);
}

export function glLightModeliv(
  this: GLFW,
  options: {
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glLightModeliv(options.pname, options.params);
}

export function glLightf(
  this: GLFW,
  options: {
    light: number;
    pname: number;
    param: number;
  }
): void {
  this.symbols.glLightf(options.light, options.pname, options.param);
}

export function glLightfv(
  this: GLFW,
  options: {
    light: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glLightfv(options.light, options.pname, options.params);
}

export function glLighti(
  this: GLFW,
  options: {
    light: number;
    pname: number;
    param: number;
  }
): void {
  this.symbols.glLighti(options.light, options.pname, options.param);
}

export function glLightiv(
  this: GLFW,
  options: {
    light: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glLightiv(options.light, options.pname, options.params);
}

export function glLineStipple(
  this: GLFW,
  options: {
    factor: number;
    pattern: number;
  }
): void {
  this.symbols.glLineStipple(options.factor, options.pattern);
}

export function glLineWidth(
  this: GLFW,
  options: {
    width: number;
  }
): void {
  this.symbols.glLineWidth(options.width);
}

export function glListBase(
  this: GLFW,
  options: {
    base: number;
  }
): void {
  this.symbols.glListBase(options.base);
}

export function glLoadIdentity(this: GLFW): void {
  this.symbols.glLoadIdentity();
}

export function glLoadMatrixd(
  this: GLFW,
  options: {
    m: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glLoadMatrixd(options.m);
}

export function glLoadMatrixf(
  this: GLFW,
  options: {
    m: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glLoadMatrixf(options.m);
}

export function glLoadName(
  this: GLFW,
  options: {
    name: number;
  }
): void {
  this.symbols.glLoadName(options.name);
}

export function glLogicOp(
  this: GLFW,
  options: {
    opcode: number;
  }
): void {
  this.symbols.glLogicOp(options.opcode);
}

export function glMap1d(
  this: GLFW,
  options: {
    target: number;
    u1: number;
    u2: number;
    stride: number;
    order: number;
    points: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMap1d(
    options.target,
    options.u1,
    options.u2,
    options.stride,
    options.order,
    options.points
  );
}

export function glMap1f(
  this: GLFW,
  options: {
    target: number;
    u1: number;
    u2: number;
    stride: number;
    order: number;
    points: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMap1f(
    options.target,
    options.u1,
    options.u2,
    options.stride,
    options.order,
    options.points
  );
}

export function glMap2d(
  this: GLFW,
  options: {
    target: number;
    u1: number;
    u2: number;
    ustride: number;
    uorder: number;
    v1: number;
    v2: number;
    vstride: number;
    vorder: number;
    points: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMap2d(
    options.target,
    options.u1,
    options.u2,
    options.ustride,
    options.uorder,
    options.v1,
    options.v2,
    options.vstride,
    options.vorder,
    options.points
  );
}

export function glMap2f(
  this: GLFW,
  options: {
    target: number;
    u1: number;
    u2: number;
    ustride: number;
    uorder: number;
    v1: number;
    v2: number;
    vstride: number;
    vorder: number;
    points: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMap2f(
    options.target,
    options.u1,
    options.u2,
    options.ustride,
    options.uorder,
    options.v1,
    options.v2,
    options.vstride,
    options.vorder,
    options.points
  );
}

export function glMapGrid1d(
  this: GLFW,
  options: {
    un: number;
    u1: number;
    u2: number;
  }
): void {
  this.symbols.glMapGrid1d(options.un, options.u1, options.u2);
}

export function glMapGrid1f(
  this: GLFW,
  options: {
    un: number;
    u1: number;
    u2: number;
  }
): void {
  this.symbols.glMapGrid1f(options.un, options.u1, options.u2);
}

export function glMapGrid2d(
  this: GLFW,
  options: {
    un: number;
    u1: number;
    u2: number;
    vn: number;
    v1: number;
    v2: number;
  }
): void {
  this.symbols.glMapGrid2d(
    options.un,
    options.u1,
    options.u2,
    options.vn,
    options.v1,
    options.v2
  );
}

export function glMapGrid2f(
  this: GLFW,
  options: {
    un: number;
    u1: number;
    u2: number;
    vn: number;
    v1: number;
    v2: number;
  }
): void {
  this.symbols.glMapGrid2f(
    options.un,
    options.u1,
    options.u2,
    options.vn,
    options.v1,
    options.v2
  );
}

export function glMaterialf(
  this: GLFW,
  options: {
    face: number;
    pname: number;
    param: number;
  }
): void {
  this.symbols.glMaterialf(options.face, options.pname, options.param);
}

export function glMaterialfv(
  this: GLFW,
  options: {
    face: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMaterialfv(options.face, options.pname, options.params);
}

export function glMateriali(
  this: GLFW,
  options: {
    face: number;
    pname: number;
    param: number;
  }
): void {
  this.symbols.glMateriali(options.face, options.pname, options.param);
}

export function glMaterialiv(
  this: GLFW,
  options: {
    face: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMaterialiv(options.face, options.pname, options.params);
}

export function glMatrixMode(
  this: GLFW,
  options: {
    mode: number;
  }
): void {
  this.symbols.glMatrixMode(options.mode);
}

export function glMinmax(
  this: GLFW,
  options: {
    target: number;
    internalformat: number;
    sink: number;
  }
): void {
  this.symbols.glMinmax(options.target, options.internalformat, options.sink);
}

export function glMultMatrixd(
  this: GLFW,
  options: {
    m: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultMatrixd(options.m);
}

export function glMultMatrixf(
  this: GLFW,
  options: {
    m: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultMatrixf(options.m);
}

export function glNewList(
  this: GLFW,
  options: {
    list: number;
    mode: number;
  }
): void {
  this.symbols.glNewList(options.list, options.mode);
}

export function glNormal3b(
  this: GLFW,
  options: {
    nx: number;
    ny: number;
    nz: number;
  }
): void {
  this.symbols.glNormal3b(options.nx, options.ny, options.nz);
}

export function glNormal3bv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glNormal3bv(options.v);
}

export function glNormal3d(
  this: GLFW,
  options: {
    nx: number;
    ny: number;
    nz: number;
  }
): void {
  this.symbols.glNormal3d(options.nx, options.ny, options.nz);
}

export function glNormal3dv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glNormal3dv(options.v);
}

export function glNormal3f(
  this: GLFW,
  options: {
    nx: number;
    ny: number;
    nz: number;
  }
): void {
  this.symbols.glNormal3f(options.nx, options.ny, options.nz);
}

export function glNormal3fv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glNormal3fv(options.v);
}

export function glNormal3i(
  this: GLFW,
  options: {
    nx: number;
    ny: number;
    nz: number;
  }
): void {
  this.symbols.glNormal3i(options.nx, options.ny, options.nz);
}

export function glNormal3iv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glNormal3iv(options.v);
}

export function glNormal3s(
  this: GLFW,
  options: {
    nx: number;
    ny: number;
    nz: number;
  }
): void {
  this.symbols.glNormal3s(options.nx, options.ny, options.nz);
}

export function glNormal3sv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glNormal3sv(options.v);
}

export function glNormalPointer(
  this: GLFW,
  options: {
    type: number;
    stride: number;
    pointer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glNormalPointer(options.type, options.stride, options.pointer);
}

export function glOrtho(
  this: GLFW,
  options: {
    left: number;
    right: number;
    bottom: number;
    top: number;
    zNear: number;
    zFar: number;
  }
): void {
  this.symbols.glOrtho(
    options.left,
    options.right,
    options.bottom,
    options.top,
    options.zNear,
    options.zFar
  );
}

export function glPassThrough(
  this: GLFW,
  options: {
    token: number;
  }
): void {
  this.symbols.glPassThrough(options.token);
}

export function glPixelMapfv(
  this: GLFW,
  options: {
    map: number;
    mapsize: number;
    values: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glPixelMapfv(options.map, options.mapsize, options.values);
}

export function glPixelMapuiv(
  this: GLFW,
  options: {
    map: number;
    mapsize: number;
    values: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glPixelMapuiv(options.map, options.mapsize, options.values);
}

export function glPixelMapusv(
  this: GLFW,
  options: {
    map: number;
    mapsize: number;
    values: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glPixelMapusv(options.map, options.mapsize, options.values);
}

export function glPixelStoref(
  this: GLFW,
  options: {
    pname: number;
    param: number;
  }
): void {
  this.symbols.glPixelStoref(options.pname, options.param);
}

export function glPixelStorei(
  this: GLFW,
  options: {
    pname: number;
    param: number;
  }
): void {
  this.symbols.glPixelStorei(options.pname, options.param);
}

export function glPixelTransferf(
  this: GLFW,
  options: {
    pname: number;
    param: number;
  }
): void {
  this.symbols.glPixelTransferf(options.pname, options.param);
}

export function glPixelTransferi(
  this: GLFW,
  options: {
    pname: number;
    param: number;
  }
): void {
  this.symbols.glPixelTransferi(options.pname, options.param);
}

export function glPixelZoom(
  this: GLFW,
  options: {
    xfactor: number;
    yfactor: number;
  }
): void {
  this.symbols.glPixelZoom(options.xfactor, options.yfactor);
}

export function glPointSize(
  this: GLFW,
  options: {
    size: number;
  }
): void {
  this.symbols.glPointSize(options.size);
}

export function glPolygonMode(
  this: GLFW,
  options: {
    face: number;
    mode: number;
  }
): void {
  this.symbols.glPolygonMode(options.face, options.mode);
}

export function glPolygonOffset(
  this: GLFW,
  options: {
    factor: number;
    units: number;
  }
): void {
  this.symbols.glPolygonOffset(options.factor, options.units);
}

export function glPolygonStipple(
  this: GLFW,
  options: {
    mask: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glPolygonStipple(options.mask);
}

export function glPopAttrib(this: GLFW): void {
  this.symbols.glPopAttrib();
}

export function glPopClientAttrib(this: GLFW): void {
  this.symbols.glPopClientAttrib();
}

export function glPopMatrix(this: GLFW): void {
  this.symbols.glPopMatrix();
}

export function glPopName(this: GLFW): void {
  this.symbols.glPopName();
}

export function glPrioritizeTextures(
  this: GLFW,
  options: {
    n: number;
    textures: Pointer | NodeJS.TypedArray | null;
    priorities: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glPrioritizeTextures(
    options.n,
    options.textures,
    options.priorities
  );
}

export function glPushAttrib(
  this: GLFW,
  options: {
    mask: number;
  }
): void {
  this.symbols.glPushAttrib(options.mask);
}

export function glPushClientAttrib(
  this: GLFW,
  options: {
    mask: number;
  }
): void {
  this.symbols.glPushClientAttrib(options.mask);
}

export function glPushMatrix(this: GLFW): void {
  this.symbols.glPushMatrix();
}

export function glPushName(
  this: GLFW,
  options: {
    name: number;
  }
): void {
  this.symbols.glPushName(options.name);
}

export function glRasterPos2d(
  this: GLFW,
  options: {
    x: number;
    y: number;
  }
): void {
  this.symbols.glRasterPos2d(options.x, options.y);
}

export function glRasterPos2dv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glRasterPos2dv(options.v);
}

export function glRasterPos2f(
  this: GLFW,
  options: {
    x: number;
    y: number;
  }
): void {
  this.symbols.glRasterPos2f(options.x, options.y);
}

export function glRasterPos2fv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glRasterPos2fv(options.v);
}

export function glRasterPos2i(
  this: GLFW,
  options: {
    x: number;
    y: number;
  }
): void {
  this.symbols.glRasterPos2i(options.x, options.y);
}

export function glRasterPos2iv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glRasterPos2iv(options.v);
}

export function glRasterPos2s(
  this: GLFW,
  options: {
    x: number;
    y: number;
  }
): void {
  this.symbols.glRasterPos2s(options.x, options.y);
}

export function glRasterPos2sv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glRasterPos2sv(options.v);
}

export function glRasterPos3d(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glRasterPos3d(options.x, options.y, options.z);
}

export function glRasterPos3dv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glRasterPos3dv(options.v);
}

export function glRasterPos3f(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glRasterPos3f(options.x, options.y, options.z);
}

export function glRasterPos3fv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glRasterPos3fv(options.v);
}

export function glRasterPos3i(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glRasterPos3i(options.x, options.y, options.z);
}

export function glRasterPos3iv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glRasterPos3iv(options.v);
}

export function glRasterPos3s(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glRasterPos3s(options.x, options.y, options.z);
}

export function glRasterPos3sv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glRasterPos3sv(options.v);
}

export function glRasterPos4d(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
    w: number;
  }
): void {
  this.symbols.glRasterPos4d(options.x, options.y, options.z, options.w);
}

export function glRasterPos4dv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glRasterPos4dv(options.v);
}

export function glRasterPos4f(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
    w: number;
  }
): void {
  this.symbols.glRasterPos4f(options.x, options.y, options.z, options.w);
}

export function glRasterPos4fv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glRasterPos4fv(options.v);
}

export function glRasterPos4i(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
    w: number;
  }
): void {
  this.symbols.glRasterPos4i(options.x, options.y, options.z, options.w);
}

export function glRasterPos4iv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glRasterPos4iv(options.v);
}

export function glRasterPos4s(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
    w: number;
  }
): void {
  this.symbols.glRasterPos4s(options.x, options.y, options.z, options.w);
}

export function glRasterPos4sv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glRasterPos4sv(options.v);
}

export function glReadBuffer(
  this: GLFW,
  options: {
    mode: number;
  }
): void {
  this.symbols.glReadBuffer(options.mode);
}

export function glReadPixels(
  this: GLFW,
  options: {
    x: number;
    y: number;
    width: number;
    height: number;
    format: number;
    type: number;
    pixels: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glReadPixels(
    options.x,
    options.y,
    options.width,
    options.height,
    options.format,
    options.type,
    options.pixels
  );
}

export function glRectd(
  this: GLFW,
  options: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }
): void {
  this.symbols.glRectd(options.x1, options.y1, options.x2, options.y2);
}

export function glRectdv(
  this: GLFW,
  options: {
    v1: Pointer | NodeJS.TypedArray | null;
    v2: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glRectdv(options.v1, options.v2);
}

export function glRectf(
  this: GLFW,
  options: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }
): void {
  this.symbols.glRectf(options.x1, options.y1, options.x2, options.y2);
}

export function glRectfv(
  this: GLFW,
  options: {
    v1: Pointer | NodeJS.TypedArray | null;
    v2: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glRectfv(options.v1, options.v2);
}

export function glRecti(
  this: GLFW,
  options: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }
): void {
  this.symbols.glRecti(options.x1, options.y1, options.x2, options.y2);
}

export function glRectiv(
  this: GLFW,
  options: {
    v1: Pointer | NodeJS.TypedArray | null;
    v2: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glRectiv(options.v1, options.v2);
}

export function glRects(
  this: GLFW,
  options: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }
): void {
  this.symbols.glRects(options.x1, options.y1, options.x2, options.y2);
}

export function glRectsv(
  this: GLFW,
  options: {
    v1: Pointer | NodeJS.TypedArray | null;
    v2: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glRectsv(options.v1, options.v2);
}

export function glRenderMode(
  this: GLFW,
  options: {
    mode: number;
  }
): Pointer | null {
  return this.symbols.glRenderMode(options.mode) as Pointer | null;
}

export function glResetHistogram(
  this: GLFW,
  options: {
    target: number;
  }
): void {
  this.symbols.glResetHistogram(options.target);
}

export function glResetMinmax(
  this: GLFW,
  options: {
    target: number;
  }
): void {
  this.symbols.glResetMinmax(options.target);
}

export function glRotated(
  this: GLFW,
  options: {
    angle: number;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glRotated(options.angle, options.x, options.y, options.z);
}

export function glRotatef(
  this: GLFW,
  options: {
    angle: number;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glRotatef(options.angle, options.x, options.y, options.z);
}

export function glScaled(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glScaled(options.x, options.y, options.z);
}

export function glScalef(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glScalef(options.x, options.y, options.z);
}

export function glScissor(
  this: GLFW,
  options: {
    x: number;
    y: number;
    width: number;
    height: number;
  }
): void {
  this.symbols.glScissor(options.x, options.y, options.width, options.height);
}

export function glSelectBuffer(
  this: GLFW,
  options: {
    size: number;
    buffer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glSelectBuffer(options.size, options.buffer);
}

export function glSeparableFilter2D(
  this: GLFW,
  options: {
    target: number;
    internalformat: number;
    width: number;
    height: number;
    format: number;
    type: number;
    row: Pointer | NodeJS.TypedArray | null;
    column: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glSeparableFilter2D(
    options.target,
    options.internalformat,
    options.width,
    options.height,
    options.format,
    options.type,
    options.row,
    options.column
  );
}

export function glShadeModel(
  this: GLFW,
  options: {
    mode: number;
  }
): void {
  this.symbols.glShadeModel(options.mode);
}

export function glStencilFunc(
  this: GLFW,
  options: {
    func: number;
    ref: number;
    mask: number;
  }
): void {
  this.symbols.glStencilFunc(options.func, options.ref, options.mask);
}

export function glStencilMask(
  this: GLFW,
  options: {
    mask: number;
  }
): void {
  this.symbols.glStencilMask(options.mask);
}

export function glStencilOp(
  this: GLFW,
  options: {
    fail: number;
    zfail: number;
    zpass: number;
  }
): void {
  this.symbols.glStencilOp(options.fail, options.zfail, options.zpass);
}

export function glTexCoord1d(
  this: GLFW,
  options: {
    s: number;
  }
): void {
  this.symbols.glTexCoord1d(options.s);
}

export function glTexCoord1dv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoord1dv(options.v);
}

export function glTexCoord1f(
  this: GLFW,
  options: {
    s: number;
  }
): void {
  this.symbols.glTexCoord1f(options.s);
}

export function glTexCoord1fv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoord1fv(options.v);
}

export function glTexCoord1i(
  this: GLFW,
  options: {
    s: number;
  }
): void {
  this.symbols.glTexCoord1i(options.s);
}

export function glTexCoord1iv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoord1iv(options.v);
}

export function glTexCoord1s(
  this: GLFW,
  options: {
    s: number;
  }
): void {
  this.symbols.glTexCoord1s(options.s);
}

export function glTexCoord1sv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoord1sv(options.v);
}

export function glTexCoord2d(
  this: GLFW,
  options: {
    s: number;
    t: number;
  }
): void {
  this.symbols.glTexCoord2d(options.s, options.t);
}

export function glTexCoord2dv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoord2dv(options.v);
}

export function glTexCoord2f(
  this: GLFW,
  options: {
    s: number;
    t: number;
  }
): void {
  this.symbols.glTexCoord2f(options.s, options.t);
}

export function glTexCoord2fv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoord2fv(options.v);
}

export function glTexCoord2i(
  this: GLFW,
  options: {
    s: number;
    t: number;
  }
): void {
  this.symbols.glTexCoord2i(options.s, options.t);
}

export function glTexCoord2iv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoord2iv(options.v);
}

export function glTexCoord2s(
  this: GLFW,
  options: {
    s: number;
    t: number;
  }
): void {
  this.symbols.glTexCoord2s(options.s, options.t);
}

export function glTexCoord2sv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoord2sv(options.v);
}

export function glTexCoord3d(
  this: GLFW,
  options: {
    s: number;
    t: number;
    r: number;
  }
): void {
  this.symbols.glTexCoord3d(options.s, options.t, options.r);
}

export function glTexCoord3dv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoord3dv(options.v);
}

export function glTexCoord3f(
  this: GLFW,
  options: {
    s: number;
    t: number;
    r: number;
  }
): void {
  this.symbols.glTexCoord3f(options.s, options.t, options.r);
}

export function glTexCoord3fv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoord3fv(options.v);
}

export function glTexCoord3i(
  this: GLFW,
  options: {
    s: number;
    t: number;
    r: number;
  }
): void {
  this.symbols.glTexCoord3i(options.s, options.t, options.r);
}

export function glTexCoord3iv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoord3iv(options.v);
}

export function glTexCoord3s(
  this: GLFW,
  options: {
    s: number;
    t: number;
    r: number;
  }
): void {
  this.symbols.glTexCoord3s(options.s, options.t, options.r);
}

export function glTexCoord3sv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoord3sv(options.v);
}

export function glTexCoord4d(
  this: GLFW,
  options: {
    s: number;
    t: number;
    r: number;
    q: number;
  }
): void {
  this.symbols.glTexCoord4d(options.s, options.t, options.r, options.q);
}

export function glTexCoord4dv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoord4dv(options.v);
}

export function glTexCoord4f(
  this: GLFW,
  options: {
    s: number;
    t: number;
    r: number;
    q: number;
  }
): void {
  this.symbols.glTexCoord4f(options.s, options.t, options.r, options.q);
}

export function glTexCoord4fv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoord4fv(options.v);
}

export function glTexCoord4i(
  this: GLFW,
  options: {
    s: number;
    t: number;
    r: number;
    q: number;
  }
): void {
  this.symbols.glTexCoord4i(options.s, options.t, options.r, options.q);
}

export function glTexCoord4iv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoord4iv(options.v);
}

export function glTexCoord4s(
  this: GLFW,
  options: {
    s: number;
    t: number;
    r: number;
    q: number;
  }
): void {
  this.symbols.glTexCoord4s(options.s, options.t, options.r, options.q);
}

export function glTexCoord4sv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoord4sv(options.v);
}

export function glTexCoordPointer(
  this: GLFW,
  options: {
    size: number;
    type: number;
    stride: number;
    pointer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexCoordPointer(
    options.size,
    options.type,
    options.stride,
    options.pointer
  );
}

export function glTexEnvf(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    param: number;
  }
): void {
  this.symbols.glTexEnvf(options.target, options.pname, options.param);
}

export function glTexEnvfv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexEnvfv(options.target, options.pname, options.params);
}

export function glTexEnvi(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    param: number;
  }
): void {
  this.symbols.glTexEnvi(options.target, options.pname, options.param);
}

export function glTexEnviv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexEnviv(options.target, options.pname, options.params);
}

export function glTexGend(
  this: GLFW,
  options: {
    coord: number;
    pname: number;
    param: number;
  }
): void {
  this.symbols.glTexGend(options.coord, options.pname, options.param);
}

export function glTexGendv(
  this: GLFW,
  options: {
    coord: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexGendv(options.coord, options.pname, options.params);
}

export function glTexGenf(
  this: GLFW,
  options: {
    coord: number;
    pname: number;
    param: number;
  }
): void {
  this.symbols.glTexGenf(options.coord, options.pname, options.param);
}

export function glTexGenfv(
  this: GLFW,
  options: {
    coord: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexGenfv(options.coord, options.pname, options.params);
}

export function glTexGeni(
  this: GLFW,
  options: {
    coord: number;
    pname: number;
    param: number;
  }
): void {
  this.symbols.glTexGeni(options.coord, options.pname, options.param);
}

export function glTexGeniv(
  this: GLFW,
  options: {
    coord: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexGeniv(options.coord, options.pname, options.params);
}

export function glTexImage1D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    internalformat: number;
    width: number;
    border: number;
    format: number;
    type: number;
    pixels: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexImage1D(
    options.target,
    options.level,
    options.internalformat,
    options.width,
    options.border,
    options.format,
    options.type,
    options.pixels
  );
}

export function glTexImage2D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    internalformat: number;
    width: number;
    height: number;
    border: number;
    format: number;
    type: number;
    pixels: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexImage2D(
    options.target,
    options.level,
    options.internalformat,
    options.width,
    options.height,
    options.border,
    options.format,
    options.type,
    options.pixels
  );
}

export function glTexImage3D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    internalformat: number;
    width: number;
    height: number;
    depth: number;
    border: number;
    format: number;
    type: number;
    pixels: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexImage3D(
    options.target,
    options.level,
    options.internalformat,
    options.width,
    options.height,
    options.depth,
    options.border,
    options.format,
    options.type,
    options.pixels
  );
}

export function glTexParameterf(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    param: number;
  }
): void {
  this.symbols.glTexParameterf(options.target, options.pname, options.param);
}

export function glTexParameterfv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexParameterfv(options.target, options.pname, options.params);
}

export function glTexParameteri(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    param: number;
  }
): void {
  this.symbols.glTexParameteri(options.target, options.pname, options.param);
}

export function glTexParameteriv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexParameteriv(options.target, options.pname, options.params);
}

export function glTexSubImage1D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    xoffset: number;
    width: number;
    format: number;
    type: number;
    pixels: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexSubImage1D(
    options.target,
    options.level,
    options.xoffset,
    options.width,
    options.format,
    options.type,
    options.pixels
  );
}

export function glTexSubImage2D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    xoffset: number;
    yoffset: number;
    width: number;
    height: number;
    format: number;
    type: number;
    pixels: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexSubImage2D(
    options.target,
    options.level,
    options.xoffset,
    options.yoffset,
    options.width,
    options.height,
    options.format,
    options.type,
    options.pixels
  );
}

export function glTexSubImage3D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    xoffset: number;
    yoffset: number;
    zoffset: number;
    width: number;
    height: number;
    depth: number;
    format: number;
    type: number;
    pixels: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glTexSubImage3D(
    options.target,
    options.level,
    options.xoffset,
    options.yoffset,
    options.zoffset,
    options.width,
    options.height,
    options.depth,
    options.format,
    options.type,
    options.pixels
  );
}

export function glTranslated(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glTranslated(options.x, options.y, options.z);
}

export function glTranslatef(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glTranslatef(options.x, options.y, options.z);
}

export function glVertex2d(
  this: GLFW,
  options: {
    x: number;
    y: number;
  }
): void {
  this.symbols.glVertex2d(options.x, options.y);
}

export function glVertex2dv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertex2dv(options.v);
}

export function glVertex2f(
  this: GLFW,
  options: {
    x: number;
    y: number;
  }
): void {
  this.symbols.glVertex2f(options.x, options.y);
}

export function glVertex2fv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertex2fv(options.v);
}

export function glVertex2i(
  this: GLFW,
  options: {
    x: number;
    y: number;
  }
): void {
  this.symbols.glVertex2i(options.x, options.y);
}

export function glVertex2iv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertex2iv(options.v);
}

export function glVertex2s(
  this: GLFW,
  options: {
    x: number;
    y: number;
  }
): void {
  this.symbols.glVertex2s(options.x, options.y);
}

export function glVertex2sv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertex2sv(options.v);
}

export function glVertex3d(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glVertex3d(options.x, options.y, options.z);
}

export function glVertex3dv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertex3dv(options.v);
}

export function glVertex3f(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glVertex3f(options.x, options.y, options.z);
}

export function glVertex3fv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertex3fv(options.v);
}

export function glVertex3i(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glVertex3i(options.x, options.y, options.z);
}

export function glVertex3iv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertex3iv(options.v);
}

export function glVertex3s(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glVertex3s(options.x, options.y, options.z);
}

export function glVertex3sv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertex3sv(options.v);
}

export function glVertex4d(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
    w: number;
  }
): void {
  this.symbols.glVertex4d(options.x, options.y, options.z, options.w);
}

export function glVertex4dv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertex4dv(options.v);
}

export function glVertex4f(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
    w: number;
  }
): void {
  this.symbols.glVertex4f(options.x, options.y, options.z, options.w);
}

export function glVertex4fv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertex4fv(options.v);
}

export function glVertex4i(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
    w: number;
  }
): void {
  this.symbols.glVertex4i(options.x, options.y, options.z, options.w);
}

export function glVertex4iv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertex4iv(options.v);
}

export function glVertex4s(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
    w: number;
  }
): void {
  this.symbols.glVertex4s(options.x, options.y, options.z, options.w);
}

export function glVertex4sv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertex4sv(options.v);
}

export function glVertexPointer(
  this: GLFW,
  options: {
    size: number;
    type: number;
    stride: number;
    pointer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexPointer(
    options.size,
    options.type,
    options.stride,
    options.pointer
  );
}

export function glViewport(
  this: GLFW,
  options: {
    x: number;
    y: number;
    width: number;
    height: number;
  }
): void {
  this.symbols.glViewport(options.x, options.y, options.width, options.height);
}

export function glSampleCoverage(
  this: GLFW,
  options: {
    value: number;
    invert: number;
  }
): void {
  this.symbols.glSampleCoverage(options.value, options.invert);
}

export function glLoadTransposeMatrixf(
  this: GLFW,
  options: {
    m: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glLoadTransposeMatrixf(options.m);
}

export function glLoadTransposeMatrixd(
  this: GLFW,
  options: {
    m: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glLoadTransposeMatrixd(options.m);
}

export function glMultTransposeMatrixf(
  this: GLFW,
  options: {
    m: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultTransposeMatrixf(options.m);
}

export function glMultTransposeMatrixd(
  this: GLFW,
  options: {
    m: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultTransposeMatrixd(options.m);
}

export function glCompressedTexImage3D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    internalformat: number;
    width: number;
    height: number;
    depth: number;
    border: number;
    imageSize: number;
    data: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glCompressedTexImage3D(
    options.target,
    options.level,
    options.internalformat,
    options.width,
    options.height,
    options.depth,
    options.border,
    options.imageSize,
    options.data
  );
}

export function glCompressedTexImage2D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    internalformat: number;
    width: number;
    height: number;
    border: number;
    imageSize: number;
    data: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glCompressedTexImage2D(
    options.target,
    options.level,
    options.internalformat,
    options.width,
    options.height,
    options.border,
    options.imageSize,
    options.data
  );
}

export function glCompressedTexImage1D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    internalformat: number;
    width: number;
    border: number;
    imageSize: number;
    data: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glCompressedTexImage1D(
    options.target,
    options.level,
    options.internalformat,
    options.width,
    options.border,
    options.imageSize,
    options.data
  );
}

export function glCompressedTexSubImage3D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    xoffset: number;
    yoffset: number;
    zoffset: number;
    width: number;
    height: number;
    depth: number;
    format: number;
    imageSize: number;
    data: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glCompressedTexSubImage3D(
    options.target,
    options.level,
    options.xoffset,
    options.yoffset,
    options.zoffset,
    options.width,
    options.height,
    options.depth,
    options.format,
    options.imageSize,
    options.data
  );
}

export function glCompressedTexSubImage2D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    xoffset: number;
    yoffset: number;
    width: number;
    height: number;
    format: number;
    imageSize: number;
    data: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glCompressedTexSubImage2D(
    options.target,
    options.level,
    options.xoffset,
    options.yoffset,
    options.width,
    options.height,
    options.format,
    options.imageSize,
    options.data
  );
}

export function glCompressedTexSubImage1D(
  this: GLFW,
  options: {
    target: number;
    level: number;
    xoffset: number;
    width: number;
    format: number;
    imageSize: number;
    data: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glCompressedTexSubImage1D(
    options.target,
    options.level,
    options.xoffset,
    options.width,
    options.format,
    options.imageSize,
    options.data
  );
}

export function glGetCompressedTexImage(
  this: GLFW,
  options: {
    target: number;
    lod: number;
    img: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetCompressedTexImage(
    options.target,
    options.lod,
    options.img
  );
}

export function glActiveTexture(
  this: GLFW,
  options: {
    texture: number;
  }
): void {
  this.symbols.glActiveTexture(options.texture);
}

export function glClientActiveTexture(
  this: GLFW,
  options: {
    texture: number;
  }
): void {
  this.symbols.glClientActiveTexture(options.texture);
}

export function glMultiTexCoord1d(
  this: GLFW,
  options: {
    target: number;
    s: number;
  }
): void {
  this.symbols.glMultiTexCoord1d(options.target, options.s);
}

export function glMultiTexCoord1dv(
  this: GLFW,
  options: {
    target: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultiTexCoord1dv(options.target, options.v);
}

export function glMultiTexCoord1f(
  this: GLFW,
  options: {
    target: number;
    s: number;
  }
): void {
  this.symbols.glMultiTexCoord1f(options.target, options.s);
}

export function glMultiTexCoord1fv(
  this: GLFW,
  options: {
    target: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultiTexCoord1fv(options.target, options.v);
}

export function glMultiTexCoord1i(
  this: GLFW,
  options: {
    target: number;
    s: number;
  }
): void {
  this.symbols.glMultiTexCoord1i(options.target, options.s);
}

export function glMultiTexCoord1iv(
  this: GLFW,
  options: {
    target: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultiTexCoord1iv(options.target, options.v);
}

export function glMultiTexCoord1s(
  this: GLFW,
  options: {
    target: number;
    s: number;
  }
): void {
  this.symbols.glMultiTexCoord1s(options.target, options.s);
}

export function glMultiTexCoord1sv(
  this: GLFW,
  options: {
    target: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultiTexCoord1sv(options.target, options.v);
}

export function glMultiTexCoord2d(
  this: GLFW,
  options: {
    target: number;
    s: number;
    t: number;
  }
): void {
  this.symbols.glMultiTexCoord2d(options.target, options.s, options.t);
}

export function glMultiTexCoord2dv(
  this: GLFW,
  options: {
    target: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultiTexCoord2dv(options.target, options.v);
}

export function glMultiTexCoord2f(
  this: GLFW,
  options: {
    target: number;
    s: number;
    t: number;
  }
): void {
  this.symbols.glMultiTexCoord2f(options.target, options.s, options.t);
}

export function glMultiTexCoord2fv(
  this: GLFW,
  options: {
    target: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultiTexCoord2fv(options.target, options.v);
}

export function glMultiTexCoord2i(
  this: GLFW,
  options: {
    target: number;
    s: number;
    t: number;
  }
): void {
  this.symbols.glMultiTexCoord2i(options.target, options.s, options.t);
}

export function glMultiTexCoord2iv(
  this: GLFW,
  options: {
    target: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultiTexCoord2iv(options.target, options.v);
}

export function glMultiTexCoord2s(
  this: GLFW,
  options: {
    target: number;
    s: number;
    t: number;
  }
): void {
  this.symbols.glMultiTexCoord2s(options.target, options.s, options.t);
}

export function glMultiTexCoord2sv(
  this: GLFW,
  options: {
    target: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultiTexCoord2sv(options.target, options.v);
}

export function glMultiTexCoord3d(
  this: GLFW,
  options: {
    target: number;
    s: number;
    t: number;
    r: number;
  }
): void {
  this.symbols.glMultiTexCoord3d(
    options.target,
    options.s,
    options.t,
    options.r
  );
}

export function glMultiTexCoord3dv(
  this: GLFW,
  options: {
    target: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultiTexCoord3dv(options.target, options.v);
}

export function glMultiTexCoord3f(
  this: GLFW,
  options: {
    target: number;
    s: number;
    t: number;
    r: number;
  }
): void {
  this.symbols.glMultiTexCoord3f(
    options.target,
    options.s,
    options.t,
    options.r
  );
}

export function glMultiTexCoord3fv(
  this: GLFW,
  options: {
    target: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultiTexCoord3fv(options.target, options.v);
}

export function glMultiTexCoord3i(
  this: GLFW,
  options: {
    target: number;
    s: number;
    t: number;
    r: number;
  }
): void {
  this.symbols.glMultiTexCoord3i(
    options.target,
    options.s,
    options.t,
    options.r
  );
}

export function glMultiTexCoord3iv(
  this: GLFW,
  options: {
    target: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultiTexCoord3iv(options.target, options.v);
}

export function glMultiTexCoord3s(
  this: GLFW,
  options: {
    target: number;
    s: number;
    t: number;
    r: number;
  }
): void {
  this.symbols.glMultiTexCoord3s(
    options.target,
    options.s,
    options.t,
    options.r
  );
}

export function glMultiTexCoord3sv(
  this: GLFW,
  options: {
    target: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultiTexCoord3sv(options.target, options.v);
}

export function glMultiTexCoord4d(
  this: GLFW,
  options: {
    target: number;
    s: number;
    t: number;
    r: number;
    q: number;
  }
): void {
  this.symbols.glMultiTexCoord4d(
    options.target,
    options.s,
    options.t,
    options.r,
    options.q
  );
}

export function glMultiTexCoord4dv(
  this: GLFW,
  options: {
    target: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultiTexCoord4dv(options.target, options.v);
}

export function glMultiTexCoord4f(
  this: GLFW,
  options: {
    target: number;
    s: number;
    t: number;
    r: number;
    q: number;
  }
): void {
  this.symbols.glMultiTexCoord4f(
    options.target,
    options.s,
    options.t,
    options.r,
    options.q
  );
}

export function glMultiTexCoord4fv(
  this: GLFW,
  options: {
    target: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultiTexCoord4fv(options.target, options.v);
}

export function glMultiTexCoord4i(
  this: GLFW,
  options: {
    target: number;
    s: number;
    t: number;
    r: number;
    q: number;
  }
): void {
  this.symbols.glMultiTexCoord4i(
    options.target,
    options.s,
    options.t,
    options.r,
    options.q
  );
}

export function glMultiTexCoord4iv(
  this: GLFW,
  options: {
    target: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultiTexCoord4iv(options.target, options.v);
}

export function glMultiTexCoord4s(
  this: GLFW,
  options: {
    target: number;
    s: number;
    t: number;
    r: number;
    q: number;
  }
): void {
  this.symbols.glMultiTexCoord4s(
    options.target,
    options.s,
    options.t,
    options.r,
    options.q
  );
}

export function glMultiTexCoord4sv(
  this: GLFW,
  options: {
    target: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glMultiTexCoord4sv(options.target, options.v);
}

export function glFogCoordf(
  this: GLFW,
  options: {
    coord: number;
  }
): void {
  this.symbols.glFogCoordf(options.coord);
}

export function glFogCoordfv(
  this: GLFW,
  options: {
    coord: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glFogCoordfv(options.coord);
}

export function glFogCoordd(
  this: GLFW,
  options: {
    coord: number;
  }
): void {
  this.symbols.glFogCoordd(options.coord);
}

export function glFogCoorddv(
  this: GLFW,
  options: {
    coord: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glFogCoorddv(options.coord);
}

export function glFogCoordPointer(
  this: GLFW,
  options: {
    type: number;
    stride: number;
    pointer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glFogCoordPointer(options.type, options.stride, options.pointer);
}

export function glSecondaryColor3b(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
  }
): void {
  this.symbols.glSecondaryColor3b(options.red, options.green, options.blue);
}

export function glSecondaryColor3bv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glSecondaryColor3bv(options.v);
}

export function glSecondaryColor3d(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
  }
): void {
  this.symbols.glSecondaryColor3d(options.red, options.green, options.blue);
}

export function glSecondaryColor3dv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glSecondaryColor3dv(options.v);
}

export function glSecondaryColor3f(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
  }
): void {
  this.symbols.glSecondaryColor3f(options.red, options.green, options.blue);
}

export function glSecondaryColor3fv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glSecondaryColor3fv(options.v);
}

export function glSecondaryColor3i(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
  }
): void {
  this.symbols.glSecondaryColor3i(options.red, options.green, options.blue);
}

export function glSecondaryColor3iv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glSecondaryColor3iv(options.v);
}

export function glSecondaryColor3s(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
  }
): void {
  this.symbols.glSecondaryColor3s(options.red, options.green, options.blue);
}

export function glSecondaryColor3sv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glSecondaryColor3sv(options.v);
}

export function glSecondaryColor3ub(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
  }
): void {
  this.symbols.glSecondaryColor3ub(options.red, options.green, options.blue);
}

export function glSecondaryColor3ubv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glSecondaryColor3ubv(options.v);
}

export function glSecondaryColor3ui(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
  }
): void {
  this.symbols.glSecondaryColor3ui(options.red, options.green, options.blue);
}

export function glSecondaryColor3uiv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glSecondaryColor3uiv(options.v);
}

export function glSecondaryColor3us(
  this: GLFW,
  options: {
    red: number;
    green: number;
    blue: number;
  }
): void {
  this.symbols.glSecondaryColor3us(options.red, options.green, options.blue);
}

export function glSecondaryColor3usv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glSecondaryColor3usv(options.v);
}

export function glSecondaryColorPointer(
  this: GLFW,
  options: {
    size: number;
    type: number;
    stride: number;
    pointer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glSecondaryColorPointer(
    options.size,
    options.type,
    options.stride,
    options.pointer
  );
}

export function glPointParameterf(
  this: GLFW,
  options: {
    pname: number;
    param: number;
  }
): void {
  this.symbols.glPointParameterf(options.pname, options.param);
}

export function glPointParameterfv(
  this: GLFW,
  options: {
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glPointParameterfv(options.pname, options.params);
}

export function glPointParameteri(
  this: GLFW,
  options: {
    pname: number;
    param: number;
  }
): void {
  this.symbols.glPointParameteri(options.pname, options.param);
}

export function glPointParameteriv(
  this: GLFW,
  options: {
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glPointParameteriv(options.pname, options.params);
}

export function glBlendFuncSeparate(
  this: GLFW,
  options: {
    srcRGB: number;
    dstRGB: number;
    srcAlpha: number;
    dstAlpha: number;
  }
): void {
  this.symbols.glBlendFuncSeparate(
    options.srcRGB,
    options.dstRGB,
    options.srcAlpha,
    options.dstAlpha
  );
}

export function glMultiDrawArrays(
  this: GLFW,
  options: {
    mode: number;
    first: Pointer | NodeJS.TypedArray | null;
    count: Pointer | NodeJS.TypedArray | null;
    primcount: number;
  }
): void {
  this.symbols.glMultiDrawArrays(
    options.mode,
    options.first,
    options.count,
    options.primcount
  );
}

export function glMultiDrawElements(
  this: GLFW,
  options: {
    mode: number;
    count: Pointer | NodeJS.TypedArray | null;
    type: number;
    indices: Pointer | NodeJS.TypedArray | null;
    primcount: number;
  }
): void {
  this.symbols.glMultiDrawElements(
    options.mode,
    options.count,
    options.type,
    options.indices,
    options.primcount
  );
}

export function glWindowPos2d(
  this: GLFW,
  options: {
    x: number;
    y: number;
  }
): void {
  this.symbols.glWindowPos2d(options.x, options.y);
}

export function glWindowPos2dv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glWindowPos2dv(options.v);
}

export function glWindowPos2f(
  this: GLFW,
  options: {
    x: number;
    y: number;
  }
): void {
  this.symbols.glWindowPos2f(options.x, options.y);
}

export function glWindowPos2fv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glWindowPos2fv(options.v);
}

export function glWindowPos2i(
  this: GLFW,
  options: {
    x: number;
    y: number;
  }
): void {
  this.symbols.glWindowPos2i(options.x, options.y);
}

export function glWindowPos2iv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glWindowPos2iv(options.v);
}

export function glWindowPos2s(
  this: GLFW,
  options: {
    x: number;
    y: number;
  }
): void {
  this.symbols.glWindowPos2s(options.x, options.y);
}

export function glWindowPos2sv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glWindowPos2sv(options.v);
}

export function glWindowPos3d(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glWindowPos3d(options.x, options.y, options.z);
}

export function glWindowPos3dv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glWindowPos3dv(options.v);
}

export function glWindowPos3f(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glWindowPos3f(options.x, options.y, options.z);
}

export function glWindowPos3fv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glWindowPos3fv(options.v);
}

export function glWindowPos3i(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glWindowPos3i(options.x, options.y, options.z);
}

export function glWindowPos3iv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glWindowPos3iv(options.v);
}

export function glWindowPos3s(
  this: GLFW,
  options: {
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glWindowPos3s(options.x, options.y, options.z);
}

export function glWindowPos3sv(
  this: GLFW,
  options: {
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glWindowPos3sv(options.v);
}

export function glGenQueries(
  this: GLFW,
  options: {
    n: number;
    ids: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGenQueries(options.n, options.ids);
}

export function glDeleteQueries(
  this: GLFW,
  options: {
    n: number;
    ids: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glDeleteQueries(options.n, options.ids);
}

export function glIsQuery(
  this: GLFW,
  options: {
    id: number;
  }
): Pointer | null {
  return this.symbols.glIsQuery(options.id) as Pointer | null;
}

export function glBeginQuery(
  this: GLFW,
  options: {
    target: number;
    id: number;
  }
): void {
  this.symbols.glBeginQuery(options.target, options.id);
}

export function glEndQuery(
  this: GLFW,
  options: {
    target: number;
  }
): void {
  this.symbols.glEndQuery(options.target);
}

export function glGetQueryiv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetQueryiv(options.target, options.pname, options.params);
}

export function glGetQueryObjectiv(
  this: GLFW,
  options: {
    id: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetQueryObjectiv(options.id, options.pname, options.params);
}

export function glGetQueryObjectuiv(
  this: GLFW,
  options: {
    id: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetQueryObjectuiv(options.id, options.pname, options.params);
}

export function glBindBuffer(
  this: GLFW,
  options: {
    target: number;
    buffer: number;
  }
): void {
  this.symbols.glBindBuffer(options.target, options.buffer);
}

export function glDeleteBuffers(
  this: GLFW,
  options: {
    n: number;
    buffers: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glDeleteBuffers(options.n, options.buffers);
}

export function glGenBuffers(
  this: GLFW,
  options: {
    n: number;
    buffers: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGenBuffers(options.n, options.buffers);
}

export function glIsBuffer(
  this: GLFW,
  options: {
    buffer: number;
  }
): Pointer | null {
  return this.symbols.glIsBuffer(options.buffer) as Pointer | null;
}

export function glBufferData(
  this: GLFW,
  options: {
    target: number;
    size: number;
    data: Pointer | NodeJS.TypedArray | null;
    usage: number;
  }
): void {
  this.symbols.glBufferData(
    options.target,
    options.size,
    options.data,
    options.usage
  );
}

export function glBufferSubData(
  this: GLFW,
  options: {
    target: number;
    offset: number;
    size: number;
    data: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glBufferSubData(
    options.target,
    options.offset,
    options.size,
    options.data
  );
}

export function glGetBufferSubData(
  this: GLFW,
  options: {
    target: number;
    offset: number;
    size: number;
    data: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetBufferSubData(
    options.target,
    options.offset,
    options.size,
    options.data
  );
}

export function glMapBuffer(
  this: GLFW,
  options: {
    target: number;
    access: number;
  }
): Pointer | null {
  return this.symbols.glMapBuffer(
    options.target,
    options.access
  ) as Pointer | null;
}

export function glUnmapBuffer(
  this: GLFW,
  options: {
    target: number;
  }
): Pointer | null {
  return this.symbols.glUnmapBuffer(options.target) as Pointer | null;
}

export function glGetBufferParameteriv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetBufferParameteriv(
    options.target,
    options.pname,
    options.params
  );
}

export function glGetBufferPointerv(
  this: GLFW,
  options: {
    target: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetBufferPointerv(
    options.target,
    options.pname,
    options.params
  );
}

export function glDrawBuffers(
  this: GLFW,
  options: {
    n: number;
    bufs: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glDrawBuffers(options.n, options.bufs);
}

export function glVertexAttrib1d(
  this: GLFW,
  options: {
    index: number;
    x: number;
  }
): void {
  this.symbols.glVertexAttrib1d(options.index, options.x);
}

export function glVertexAttrib1dv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib1dv(options.index, options.v);
}

export function glVertexAttrib1f(
  this: GLFW,
  options: {
    index: number;
    x: number;
  }
): void {
  this.symbols.glVertexAttrib1f(options.index, options.x);
}

export function glVertexAttrib1fv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib1fv(options.index, options.v);
}

export function glVertexAttrib1s(
  this: GLFW,
  options: {
    index: number;
    x: number;
  }
): void {
  this.symbols.glVertexAttrib1s(options.index, options.x);
}

export function glVertexAttrib1sv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib1sv(options.index, options.v);
}

export function glVertexAttrib2d(
  this: GLFW,
  options: {
    index: number;
    x: number;
    y: number;
  }
): void {
  this.symbols.glVertexAttrib2d(options.index, options.x, options.y);
}

export function glVertexAttrib2dv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib2dv(options.index, options.v);
}

export function glVertexAttrib2f(
  this: GLFW,
  options: {
    index: number;
    x: number;
    y: number;
  }
): void {
  this.symbols.glVertexAttrib2f(options.index, options.x, options.y);
}

export function glVertexAttrib2fv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib2fv(options.index, options.v);
}

export function glVertexAttrib2s(
  this: GLFW,
  options: {
    index: number;
    x: number;
    y: number;
  }
): void {
  this.symbols.glVertexAttrib2s(options.index, options.x, options.y);
}

export function glVertexAttrib2sv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib2sv(options.index, options.v);
}

export function glVertexAttrib3d(
  this: GLFW,
  options: {
    index: number;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glVertexAttrib3d(options.index, options.x, options.y, options.z);
}

export function glVertexAttrib3dv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib3dv(options.index, options.v);
}

export function glVertexAttrib3f(
  this: GLFW,
  options: {
    index: number;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glVertexAttrib3f(options.index, options.x, options.y, options.z);
}

export function glVertexAttrib3fv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib3fv(options.index, options.v);
}

export function glVertexAttrib3s(
  this: GLFW,
  options: {
    index: number;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.glVertexAttrib3s(options.index, options.x, options.y, options.z);
}

export function glVertexAttrib3sv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib3sv(options.index, options.v);
}

export function glVertexAttrib4Nbv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib4Nbv(options.index, options.v);
}

export function glVertexAttrib4Niv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib4Niv(options.index, options.v);
}

export function glVertexAttrib4Nsv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib4Nsv(options.index, options.v);
}

export function glVertexAttrib4Nub(
  this: GLFW,
  options: {
    index: number;
    x: number;
    y: number;
    z: number;
    w: number;
  }
): void {
  this.symbols.glVertexAttrib4Nub(
    options.index,
    options.x,
    options.y,
    options.z,
    options.w
  );
}

export function glVertexAttrib4Nubv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib4Nubv(options.index, options.v);
}

export function glVertexAttrib4Nuiv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib4Nuiv(options.index, options.v);
}

export function glVertexAttrib4Nusv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib4Nusv(options.index, options.v);
}

export function glVertexAttrib4bv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib4bv(options.index, options.v);
}

export function glVertexAttrib4d(
  this: GLFW,
  options: {
    index: number;
    x: number;
    y: number;
    z: number;
    w: number;
  }
): void {
  this.symbols.glVertexAttrib4d(
    options.index,
    options.x,
    options.y,
    options.z,
    options.w
  );
}

export function glVertexAttrib4dv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib4dv(options.index, options.v);
}

export function glVertexAttrib4f(
  this: GLFW,
  options: {
    index: number;
    x: number;
    y: number;
    z: number;
    w: number;
  }
): void {
  this.symbols.glVertexAttrib4f(
    options.index,
    options.x,
    options.y,
    options.z,
    options.w
  );
}

export function glVertexAttrib4fv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib4fv(options.index, options.v);
}

export function glVertexAttrib4iv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib4iv(options.index, options.v);
}

export function glVertexAttrib4s(
  this: GLFW,
  options: {
    index: number;
    x: number;
    y: number;
    z: number;
    w: number;
  }
): void {
  this.symbols.glVertexAttrib4s(
    options.index,
    options.x,
    options.y,
    options.z,
    options.w
  );
}

export function glVertexAttrib4sv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib4sv(options.index, options.v);
}

export function glVertexAttrib4ubv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib4ubv(options.index, options.v);
}

export function glVertexAttrib4uiv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib4uiv(options.index, options.v);
}

export function glVertexAttrib4usv(
  this: GLFW,
  options: {
    index: number;
    v: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttrib4usv(options.index, options.v);
}

export function glVertexAttribPointer(
  this: GLFW,
  options: {
    index: number;
    size: number;
    type: number;
    normalized: number;
    stride: number;
    pointer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glVertexAttribPointer(
    options.index,
    options.size,
    options.type,
    options.normalized,
    options.stride,
    options.pointer
  );
}

export function glEnableVertexAttribArray(
  this: GLFW,
  options: {
    index: number;
  }
): void {
  this.symbols.glEnableVertexAttribArray(options.index);
}

export function glDisableVertexAttribArray(
  this: GLFW,
  options: {
    index: number;
  }
): void {
  this.symbols.glDisableVertexAttribArray(options.index);
}

export function glGetVertexAttribdv(
  this: GLFW,
  options: {
    index: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetVertexAttribdv(
    options.index,
    options.pname,
    options.params
  );
}

export function glGetVertexAttribfv(
  this: GLFW,
  options: {
    index: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetVertexAttribfv(
    options.index,
    options.pname,
    options.params
  );
}

export function glGetVertexAttribiv(
  this: GLFW,
  options: {
    index: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetVertexAttribiv(
    options.index,
    options.pname,
    options.params
  );
}

export function glGetVertexAttribPointerv(
  this: GLFW,
  options: {
    index: number;
    pname: number;
    pointer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetVertexAttribPointerv(
    options.index,
    options.pname,
    options.pointer
  );
}

export function glDeleteShader(
  this: GLFW,
  options: {
    shader: number;
  }
): void {
  this.symbols.glDeleteShader(options.shader);
}

export function glDetachShader(
  this: GLFW,
  options: {
    program: number;
    shader: number;
  }
): void {
  this.symbols.glDetachShader(options.program, options.shader);
}

export function glCreateShader(
  this: GLFW,
  options: {
    type: number;
  }
): Pointer | null {
  return this.symbols.glCreateShader(options.type) as Pointer | null;
}

export function glShaderSource(
  this: GLFW,
  options: {
    shader: number;
    count: number;
    string: Pointer | NodeJS.TypedArray | null;
    length: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glShaderSource(
    options.shader,
    options.count,
    options.string,
    options.length
  );
}

export function glCompileShader(
  this: GLFW,
  options: {
    shader: number;
  }
): void {
  this.symbols.glCompileShader(options.shader);
}

export function glCreateProgram(this: GLFW): Pointer | null {
  return this.symbols.glCreateProgram() as Pointer | null;
}

export function glAttachShader(
  this: GLFW,
  options: {
    program: number;
    shader: number;
  }
): void {
  this.symbols.glAttachShader(options.program, options.shader);
}

export function glLinkProgram(
  this: GLFW,
  options: {
    program: number;
  }
): void {
  this.symbols.glLinkProgram(options.program);
}

export function glUseProgram(
  this: GLFW,
  options: {
    program: number;
  }
): void {
  this.symbols.glUseProgram(options.program);
}

export function glDeleteProgram(
  this: GLFW,
  options: {
    program: number;
  }
): void {
  this.symbols.glDeleteProgram(options.program);
}

export function glValidateProgram(
  this: GLFW,
  options: {
    program: number;
  }
): void {
  this.symbols.glValidateProgram(options.program);
}

export function glUniform1f(
  this: GLFW,
  options: {
    location: number;
    v0: number;
  }
): void {
  this.symbols.glUniform1f(options.location, options.v0);
}

export function glUniform2f(
  this: GLFW,
  options: {
    location: number;
    v0: number;
    v1: number;
  }
): void {
  this.symbols.glUniform2f(options.location, options.v0, options.v1);
}

export function glUniform3f(
  this: GLFW,
  options: {
    location: number;
    v0: number;
    v1: number;
    v2: number;
  }
): void {
  this.symbols.glUniform3f(
    options.location,
    options.v0,
    options.v1,
    options.v2
  );
}

export function glUniform4f(
  this: GLFW,
  options: {
    location: number;
    v0: number;
    v1: number;
    v2: number;
    v3: number;
  }
): void {
  this.symbols.glUniform4f(
    options.location,
    options.v0,
    options.v1,
    options.v2,
    options.v3
  );
}

export function glUniform1i(
  this: GLFW,
  options: {
    location: number;
    v0: number;
  }
): void {
  this.symbols.glUniform1i(options.location, options.v0);
}

export function glUniform2i(
  this: GLFW,
  options: {
    location: number;
    v0: number;
    v1: number;
  }
): void {
  this.symbols.glUniform2i(options.location, options.v0, options.v1);
}

export function glUniform3i(
  this: GLFW,
  options: {
    location: number;
    v0: number;
    v1: number;
    v2: number;
  }
): void {
  this.symbols.glUniform3i(
    options.location,
    options.v0,
    options.v1,
    options.v2
  );
}

export function glUniform4i(
  this: GLFW,
  options: {
    location: number;
    v0: number;
    v1: number;
    v2: number;
    v3: number;
  }
): void {
  this.symbols.glUniform4i(
    options.location,
    options.v0,
    options.v1,
    options.v2,
    options.v3
  );
}

export function glUniform1fv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniform1fv(options.location, options.count, options.value);
}

export function glUniform2fv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniform2fv(options.location, options.count, options.value);
}

export function glUniform3fv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniform3fv(options.location, options.count, options.value);
}

export function glUniform4fv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniform4fv(options.location, options.count, options.value);
}

export function glUniform1iv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniform1iv(options.location, options.count, options.value);
}

export function glUniform2iv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniform2iv(options.location, options.count, options.value);
}

export function glUniform3iv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniform3iv(options.location, options.count, options.value);
}

export function glUniform4iv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniform4iv(options.location, options.count, options.value);
}

export function glUniformMatrix2fv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    transpose: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniformMatrix2fv(
    options.location,
    options.count,
    options.transpose,
    options.value
  );
}

export function glUniformMatrix3fv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    transpose: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniformMatrix3fv(
    options.location,
    options.count,
    options.transpose,
    options.value
  );
}

export function glUniformMatrix4fv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    transpose: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniformMatrix4fv(
    options.location,
    options.count,
    options.transpose,
    options.value
  );
}

export function glIsShader(
  this: GLFW,
  options: {
    shader: number;
  }
): Pointer | null {
  return this.symbols.glIsShader(options.shader) as Pointer | null;
}

export function glIsProgram(
  this: GLFW,
  options: {
    program: number;
  }
): Pointer | null {
  return this.symbols.glIsProgram(options.program) as Pointer | null;
}

export function glGetShaderiv(
  this: GLFW,
  options: {
    shader: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetShaderiv(options.shader, options.pname, options.params);
}

export function glGetProgramiv(
  this: GLFW,
  options: {
    program: number;
    pname: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetProgramiv(options.program, options.pname, options.params);
}

export function glGetAttachedShaders(
  this: GLFW,
  options: {
    program: number;
    maxCount: number;
    count: Pointer | NodeJS.TypedArray | null;
    shaders: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetAttachedShaders(
    options.program,
    options.maxCount,
    options.count,
    options.shaders
  );
}

export function glGetShaderInfoLog(
  this: GLFW,
  options: {
    shader: number;
    bufSize: number;
    length: Pointer | NodeJS.TypedArray | null;
    infoLog: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetShaderInfoLog(
    options.shader,
    options.bufSize,
    options.length,
    options.infoLog
  );
}

export function glGetProgramInfoLog(
  this: GLFW,
  options: {
    program: number;
    bufSize: number;
    length: Pointer | NodeJS.TypedArray | null;
    infoLog: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetProgramInfoLog(
    options.program,
    options.bufSize,
    options.length,
    options.infoLog
  );
}

export function glGetUniformLocation(
  this: GLFW,
  options: {
    program: number;
    name: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.glGetUniformLocation(
    options.program,
    options.name
  ) as Pointer | null;
}

export function glGetActiveUniform(
  this: GLFW,
  options: {
    program: number;
    index: number;
    bufSize: number;
    length: Pointer | NodeJS.TypedArray | null;
    size: Pointer | NodeJS.TypedArray | null;
    type: Pointer | NodeJS.TypedArray | null;
    name: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetActiveUniform(
    options.program,
    options.index,
    options.bufSize,
    options.length,
    options.size,
    options.type,
    options.name
  );
}

export function glGetUniformfv(
  this: GLFW,
  options: {
    program: number;
    location: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetUniformfv(
    options.program,
    options.location,
    options.params
  );
}

export function glGetUniformiv(
  this: GLFW,
  options: {
    program: number;
    location: number;
    params: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetUniformiv(
    options.program,
    options.location,
    options.params
  );
}

export function glGetShaderSource(
  this: GLFW,
  options: {
    shader: number;
    bufSize: number;
    length: Pointer | NodeJS.TypedArray | null;
    source: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetShaderSource(
    options.shader,
    options.bufSize,
    options.length,
    options.source
  );
}

export function glBindAttribLocation(
  this: GLFW,
  options: {
    program: number;
    index: number;
    name: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glBindAttribLocation(
    options.program,
    options.index,
    options.name
  );
}

export function glGetActiveAttrib(
  this: GLFW,
  options: {
    program: number;
    index: number;
    bufSize: number;
    length: Pointer | NodeJS.TypedArray | null;
    size: Pointer | NodeJS.TypedArray | null;
    type: Pointer | NodeJS.TypedArray | null;
    name: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glGetActiveAttrib(
    options.program,
    options.index,
    options.bufSize,
    options.length,
    options.size,
    options.type,
    options.name
  );
}

export function glGetAttribLocation(
  this: GLFW,
  options: {
    program: number;
    name: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.glGetAttribLocation(
    options.program,
    options.name
  ) as Pointer | null;
}

export function glStencilFuncSeparate(
  this: GLFW,
  options: {
    face: number;
    func: number;
    ref: number;
    mask: number;
  }
): void {
  this.symbols.glStencilFuncSeparate(
    options.face,
    options.func,
    options.ref,
    options.mask
  );
}

export function glStencilOpSeparate(
  this: GLFW,
  options: {
    face: number;
    fail: number;
    zfail: number;
    zpass: number;
  }
): void {
  this.symbols.glStencilOpSeparate(
    options.face,
    options.fail,
    options.zfail,
    options.zpass
  );
}

export function glStencilMaskSeparate(
  this: GLFW,
  options: {
    face: number;
    mask: number;
  }
): void {
  this.symbols.glStencilMaskSeparate(options.face, options.mask);
}

export function glUniformMatrix2x3fv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    transpose: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniformMatrix2x3fv(
    options.location,
    options.count,
    options.transpose,
    options.value
  );
}

export function glUniformMatrix3x2fv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    transpose: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniformMatrix3x2fv(
    options.location,
    options.count,
    options.transpose,
    options.value
  );
}

export function glUniformMatrix2x4fv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    transpose: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniformMatrix2x4fv(
    options.location,
    options.count,
    options.transpose,
    options.value
  );
}

export function glUniformMatrix4x2fv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    transpose: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniformMatrix4x2fv(
    options.location,
    options.count,
    options.transpose,
    options.value
  );
}

export function glUniformMatrix3x4fv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    transpose: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniformMatrix3x4fv(
    options.location,
    options.count,
    options.transpose,
    options.value
  );
}

export function glUniformMatrix4x3fv(
  this: GLFW,
  options: {
    location: number;
    count: number;
    transpose: number;
    value: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glUniformMatrix4x3fv(
    options.location,
    options.count,
    options.transpose,
    options.value
  );
}

export function glfwInit(this: GLFW): number {
  return this.symbols.glfwInit() as number;
}

export function glfwTerminate(this: GLFW): void {
  this.symbols.glfwTerminate();
}

export function glfwInitHint(
  this: GLFW,
  options: {
    hint: number;
    value: number;
  }
): void {
  this.symbols.glfwInitHint(options.hint, options.value);
}

export function glfwInitAllocator(
  this: GLFW,
  options: {
    allocator: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwInitAllocator(options.allocator);
}

export function glfwGetVersion(
  this: GLFW,
  options: {
    major: Pointer | NodeJS.TypedArray | null;
    minor: Pointer | NodeJS.TypedArray | null;
    rev: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwGetVersion(options.major, options.minor, options.rev);
}

export function glfwGetVersionString(this: GLFW): CString {
  return this.symbols.glfwGetVersionString() as CString;
}

export function glfwGetError(
  this: GLFW,
  options: {
    description: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.glfwGetError(options.description) as number;
}

export function glfwSetErrorCallback(
  this: GLFW,
  options: {
    callback: TypedJSCallback<GLFWerrorfun>;
  }
): Pointer | null {
  return this.symbols.glfwSetErrorCallback(options.callback) as Pointer | null;
}

export function glfwGetPlatform(this: GLFW): number {
  return this.symbols.glfwGetPlatform() as number;
}

export function glfwPlatformSupported(
  this: GLFW,
  options: {
    platform: number;
  }
): number {
  return this.symbols.glfwPlatformSupported(options.platform) as number;
}

export function glfwGetMonitors(
  this: GLFW,
  options: {
    count: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.glfwGetMonitors(options.count) as Pointer | null;
}

export function glfwGetPrimaryMonitor(this: GLFW): Pointer | null {
  return this.symbols.glfwGetPrimaryMonitor() as Pointer | null;
}

export function glfwGetMonitorPos(
  this: GLFW,
  options: {
    monitor: Pointer | NodeJS.TypedArray | null;
    xpos: Pointer | NodeJS.TypedArray | null;
    ypos: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwGetMonitorPos(options.monitor, options.xpos, options.ypos);
}

export function glfwGetMonitorWorkarea(
  this: GLFW,
  options: {
    monitor: Pointer | NodeJS.TypedArray | null;
    xpos: Pointer | NodeJS.TypedArray | null;
    ypos: Pointer | NodeJS.TypedArray | null;
    width: Pointer | NodeJS.TypedArray | null;
    height: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwGetMonitorWorkarea(
    options.monitor,
    options.xpos,
    options.ypos,
    options.width,
    options.height
  );
}

export function glfwGetMonitorPhysicalSize(
  this: GLFW,
  options: {
    monitor: Pointer | NodeJS.TypedArray | null;
    widthMM: Pointer | NodeJS.TypedArray | null;
    heightMM: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwGetMonitorPhysicalSize(
    options.monitor,
    options.widthMM,
    options.heightMM
  );
}

export function glfwGetMonitorContentScale(
  this: GLFW,
  options: {
    monitor: Pointer | NodeJS.TypedArray | null;
    xscale: Pointer | NodeJS.TypedArray | null;
    yscale: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwGetMonitorContentScale(
    options.monitor,
    options.xscale,
    options.yscale
  );
}

export function glfwGetMonitorName(
  this: GLFW,
  options: {
    monitor: Pointer | NodeJS.TypedArray | null;
  }
): CString {
  return this.symbols.glfwGetMonitorName(options.monitor) as CString;
}

export function glfwSetMonitorUserPointer(
  this: GLFW,
  options: {
    monitor: Pointer | NodeJS.TypedArray | null;
    pointer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwSetMonitorUserPointer(options.monitor, options.pointer);
}

export function glfwGetMonitorUserPointer(
  this: GLFW,
  options: {
    monitor: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.glfwGetMonitorUserPointer(
    options.monitor
  ) as Pointer | null;
}

export function glfwSetMonitorCallback(
  this: GLFW,
  options: {
    callback: TypedJSCallback<GLFWmonitorfun>;
  }
): Pointer | null {
  return this.symbols.glfwSetMonitorCallback(
    options.callback
  ) as Pointer | null;
}

export function glfwGetVideoModes(
  this: GLFW,
  options: {
    monitor: Pointer | NodeJS.TypedArray | null;
    count: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.glfwGetVideoModes(
    options.monitor,
    options.count
  ) as Pointer | null;
}

export function glfwGetVideoMode(
  this: GLFW,
  options: {
    monitor: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.glfwGetVideoMode(options.monitor) as Pointer | null;
}

export function glfwSetGamma(
  this: GLFW,
  options: {
    monitor: Pointer | NodeJS.TypedArray | null;
    gamma: number;
  }
): void {
  this.symbols.glfwSetGamma(options.monitor, options.gamma);
}

export function glfwGetGammaRamp(
  this: GLFW,
  options: {
    monitor: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.glfwGetGammaRamp(options.monitor) as Pointer | null;
}

export function glfwSetGammaRamp(
  this: GLFW,
  options: {
    monitor: Pointer | NodeJS.TypedArray | null;
    ramp: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwSetGammaRamp(options.monitor, options.ramp);
}

export function glfwDefaultWindowHints(this: GLFW): void {
  this.symbols.glfwDefaultWindowHints();
}

export function glfwWindowHint(
  this: GLFW,
  options: {
    hint: number;
    value: number;
  }
): void {
  this.symbols.glfwWindowHint(options.hint, options.value);
}

export function glfwWindowHintString(
  this: GLFW,
  options: {
    hint: number;
    value: string;
  }
): void {
  this.symbols.glfwWindowHintString(
    options.hint,
    stringToCString(options.value).ptr
  );
}

export function glfwCreateWindow(
  this: GLFW,
  options: {
    width: number;
    height: number;
    title: string;
    monitor: Pointer | NodeJS.TypedArray | null;
    share: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.glfwCreateWindow(
    options.width,
    options.height,
    stringToCString(options.title).ptr,
    options.monitor,
    options.share
  ) as Pointer | null;
}

export function glfwDestroyWindow(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwDestroyWindow(options.window);
}

export function glfwWindowShouldClose(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.glfwWindowShouldClose(options.window) as number;
}

export function glfwSetWindowShouldClose(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    value: number;
  }
): void {
  this.symbols.glfwSetWindowShouldClose(options.window, options.value);
}

export function glfwGetWindowTitle(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
  }
): CString {
  return this.symbols.glfwGetWindowTitle(options.window) as CString;
}

export function glfwSetWindowTitle(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    title: string;
  }
): void {
  this.symbols.glfwSetWindowTitle(
    options.window,
    stringToCString(options.title).ptr
  );
}

export function glfwSetWindowIcon(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    count: number;
    images: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwSetWindowIcon(options.window, options.count, options.images);
}

export function glfwGetWindowPos(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    xpos: Pointer | NodeJS.TypedArray | null;
    ypos: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwGetWindowPos(options.window, options.xpos, options.ypos);
}

export function glfwSetWindowPos(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    xpos: number;
    ypos: number;
  }
): void {
  this.symbols.glfwSetWindowPos(options.window, options.xpos, options.ypos);
}

export function glfwGetWindowSize(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    width: Pointer | NodeJS.TypedArray | null;
    height: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwGetWindowSize(options.window, options.width, options.height);
}

export function glfwSetWindowSizeLimits(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    minwidth: number;
    minheight: number;
    maxwidth: number;
    maxheight: number;
  }
): void {
  this.symbols.glfwSetWindowSizeLimits(
    options.window,
    options.minwidth,
    options.minheight,
    options.maxwidth,
    options.maxheight
  );
}

export function glfwSetWindowAspectRatio(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    numer: number;
    denom: number;
  }
): void {
  this.symbols.glfwSetWindowAspectRatio(
    options.window,
    options.numer,
    options.denom
  );
}

export function glfwSetWindowSize(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    width: number;
    height: number;
  }
): void {
  this.symbols.glfwSetWindowSize(options.window, options.width, options.height);
}

export function glfwGetFramebufferSize(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    width: Pointer | NodeJS.TypedArray | null;
    height: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwGetFramebufferSize(
    options.window,
    options.width,
    options.height
  );
}

export function glfwGetWindowFrameSize(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    left: Pointer | NodeJS.TypedArray | null;
    top: Pointer | NodeJS.TypedArray | null;
    right: Pointer | NodeJS.TypedArray | null;
    bottom: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwGetWindowFrameSize(
    options.window,
    options.left,
    options.top,
    options.right,
    options.bottom
  );
}

export function glfwGetWindowContentScale(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    xscale: Pointer | NodeJS.TypedArray | null;
    yscale: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwGetWindowContentScale(
    options.window,
    options.xscale,
    options.yscale
  );
}

export function glfwGetWindowOpacity(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.glfwGetWindowOpacity(options.window) as number;
}

export function glfwSetWindowOpacity(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    opacity: number;
  }
): void {
  this.symbols.glfwSetWindowOpacity(options.window, options.opacity);
}

export function glfwIconifyWindow(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwIconifyWindow(options.window);
}

export function glfwRestoreWindow(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwRestoreWindow(options.window);
}

export function glfwMaximizeWindow(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwMaximizeWindow(options.window);
}

export function glfwShowWindow(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwShowWindow(options.window);
}

export function glfwHideWindow(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwHideWindow(options.window);
}

export function glfwFocusWindow(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwFocusWindow(options.window);
}

export function glfwRequestWindowAttention(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwRequestWindowAttention(options.window);
}

export function glfwGetWindowMonitor(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.glfwGetWindowMonitor(options.window) as Pointer | null;
}

export function glfwSetWindowMonitor(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    monitor: Pointer | NodeJS.TypedArray | null;
    xpos: number;
    ypos: number;
    width: number;
    height: number;
    refreshRate: number;
  }
): void {
  this.symbols.glfwSetWindowMonitor(
    options.window,
    options.monitor,
    options.xpos,
    options.ypos,
    options.width,
    options.height,
    options.refreshRate
  );
}

export function glfwGetWindowAttrib(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    attrib: number;
  }
): number {
  return this.symbols.glfwGetWindowAttrib(
    options.window,
    options.attrib
  ) as number;
}

export function glfwSetWindowAttrib(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    attrib: number;
    value: number;
  }
): void {
  this.symbols.glfwSetWindowAttrib(
    options.window,
    options.attrib,
    options.value
  );
}

export function glfwSetWindowUserPointer(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    pointer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwSetWindowUserPointer(options.window, options.pointer);
}

export function glfwGetWindowUserPointer(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.glfwGetWindowUserPointer(
    options.window
  ) as Pointer | null;
}

export function glfwSetWindowPosCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWwindowposfun>;
  }
): Pointer | null {
  return this.symbols.glfwSetWindowPosCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwSetWindowSizeCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWwindowsizefun>;
  }
): Pointer | null {
  return this.symbols.glfwSetWindowSizeCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwSetWindowCloseCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWwindowclosefun>;
  }
): Pointer | null {
  return this.symbols.glfwSetWindowCloseCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwSetWindowRefreshCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWwindowrefreshfun>;
  }
): Pointer | null {
  return this.symbols.glfwSetWindowRefreshCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwSetWindowFocusCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWwindowfocusfun>;
  }
): Pointer | null {
  return this.symbols.glfwSetWindowFocusCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwSetWindowIconifyCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWwindowiconifyfun>;
  }
): Pointer | null {
  return this.symbols.glfwSetWindowIconifyCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwSetWindowMaximizeCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWwindowmaximizefun>;
  }
): Pointer | null {
  return this.symbols.glfwSetWindowMaximizeCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwSetFramebufferSizeCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWframebuffersizefun>;
  }
): Pointer | null {
  return this.symbols.glfwSetFramebufferSizeCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwSetWindowContentScaleCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWwindowcontentscalefun>;
  }
): Pointer | null {
  return this.symbols.glfwSetWindowContentScaleCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwPollEvents(this: GLFW): void {
  this.symbols.glfwPollEvents();
}

export function glfwWaitEvents(this: GLFW): void {
  this.symbols.glfwWaitEvents();
}

export function glfwWaitEventsTimeout(
  this: GLFW,
  options: {
    timeout: number;
  }
): void {
  this.symbols.glfwWaitEventsTimeout(options.timeout);
}

export function glfwPostEmptyEvent(this: GLFW): void {
  this.symbols.glfwPostEmptyEvent();
}

export function glfwGetInputMode(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    mode: number;
  }
): number {
  return this.symbols.glfwGetInputMode(options.window, options.mode) as number;
}

export function glfwSetInputMode(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    mode: number;
    value: number;
  }
): void {
  this.symbols.glfwSetInputMode(options.window, options.mode, options.value);
}

export function glfwRawMouseMotionSupported(this: GLFW): number {
  return this.symbols.glfwRawMouseMotionSupported() as number;
}

export function glfwGetKeyName(
  this: GLFW,
  options: {
    key: number;
    scancode: number;
  }
): CString {
  return this.symbols.glfwGetKeyName(options.key, options.scancode) as CString;
}

export function glfwGetKeyScancode(
  this: GLFW,
  options: {
    key: number;
  }
): number {
  return this.symbols.glfwGetKeyScancode(options.key) as number;
}

export function glfwGetKey(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    key: number;
  }
): number {
  return this.symbols.glfwGetKey(options.window, options.key) as number;
}

export function glfwGetMouseButton(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    button: number;
  }
): number {
  return this.symbols.glfwGetMouseButton(
    options.window,
    options.button
  ) as number;
}

export function glfwGetCursorPos(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    xpos: Pointer | NodeJS.TypedArray | null;
    ypos: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwGetCursorPos(options.window, options.xpos, options.ypos);
}

export function glfwSetCursorPos(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    xpos: number;
    ypos: number;
  }
): void {
  this.symbols.glfwSetCursorPos(options.window, options.xpos, options.ypos);
}

export function glfwCreateCursor(
  this: GLFW,
  options: {
    image: Pointer | NodeJS.TypedArray | null;
    xhot: number;
    yhot: number;
  }
): Pointer | null {
  return this.symbols.glfwCreateCursor(
    options.image,
    options.xhot,
    options.yhot
  ) as Pointer | null;
}

export function glfwCreateStandardCursor(
  this: GLFW,
  options: {
    shape: number;
  }
): Pointer | null {
  return this.symbols.glfwCreateStandardCursor(options.shape) as Pointer | null;
}

export function glfwDestroyCursor(
  this: GLFW,
  options: {
    cursor: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwDestroyCursor(options.cursor);
}

export function glfwSetCursor(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    cursor: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwSetCursor(options.window, options.cursor);
}

export function glfwSetKeyCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWkeyfun>;
  }
): Pointer | null {
  return this.symbols.glfwSetKeyCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwSetCharCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWcharfun>;
  }
): Pointer | null {
  return this.symbols.glfwSetCharCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwSetCharModsCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWcharmodsfun>;
  }
): Pointer | null {
  return this.symbols.glfwSetCharModsCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwSetMouseButtonCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWmousebuttonfun>;
  }
): Pointer | null {
  return this.symbols.glfwSetMouseButtonCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwSetCursorPosCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWcursorposfun>;
  }
): Pointer | null {
  return this.symbols.glfwSetCursorPosCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwSetCursorEnterCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWcursorenterfun>;
  }
): Pointer | null {
  return this.symbols.glfwSetCursorEnterCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwSetScrollCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWscrollfun>;
  }
): Pointer | null {
  return this.symbols.glfwSetScrollCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwSetDropCallback(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<GLFWdropfun>;
  }
): Pointer | null {
  return this.symbols.glfwSetDropCallback(
    options.window,
    options.callback
  ) as Pointer | null;
}

export function glfwJoystickPresent(
  this: GLFW,
  options: {
    jid: number;
  }
): number {
  return this.symbols.glfwJoystickPresent(options.jid) as number;
}

export function glfwGetJoystickAxes(
  this: GLFW,
  options: {
    jid: number;
    count: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.glfwGetJoystickAxes(
    options.jid,
    options.count
  ) as Pointer | null;
}

export function glfwGetJoystickButtons(
  this: GLFW,
  options: {
    jid: number;
    count: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.glfwGetJoystickButtons(
    options.jid,
    options.count
  ) as Pointer | null;
}

export function glfwGetJoystickHats(
  this: GLFW,
  options: {
    jid: number;
    count: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.glfwGetJoystickHats(
    options.jid,
    options.count
  ) as Pointer | null;
}

export function glfwGetJoystickName(
  this: GLFW,
  options: {
    jid: number;
  }
): CString {
  return this.symbols.glfwGetJoystickName(options.jid) as CString;
}

export function glfwGetJoystickGUID(
  this: GLFW,
  options: {
    jid: number;
  }
): CString {
  return this.symbols.glfwGetJoystickGUID(options.jid) as CString;
}

export function glfwSetJoystickUserPointer(
  this: GLFW,
  options: {
    jid: number;
    pointer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwSetJoystickUserPointer(options.jid, options.pointer);
}

export function glfwGetJoystickUserPointer(
  this: GLFW,
  options: {
    jid: number;
  }
): Pointer | null {
  return this.symbols.glfwGetJoystickUserPointer(options.jid) as Pointer | null;
}

export function glfwJoystickIsGamepad(
  this: GLFW,
  options: {
    jid: number;
  }
): number {
  return this.symbols.glfwJoystickIsGamepad(options.jid) as number;
}

export function glfwSetJoystickCallback(
  this: GLFW,
  options: {
    callback: TypedJSCallback<GLFWjoystickfun>;
  }
): Pointer | null {
  return this.symbols.glfwSetJoystickCallback(
    options.callback
  ) as Pointer | null;
}

export function glfwUpdateGamepadMappings(
  this: GLFW,
  options: {
    string: string;
  }
): number {
  return this.symbols.glfwUpdateGamepadMappings(
    stringToCString(options.string).ptr
  ) as number;
}

export function glfwGetGamepadName(
  this: GLFW,
  options: {
    jid: number;
  }
): CString {
  return this.symbols.glfwGetGamepadName(options.jid) as CString;
}

export function glfwGetGamepadState(
  this: GLFW,
  options: {
    jid: number;
    state: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.glfwGetGamepadState(options.jid, options.state) as number;
}

export function glfwSetClipboardString(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
    string: string;
  }
): void {
  this.symbols.glfwSetClipboardString(
    options.window,
    stringToCString(options.string).ptr
  );
}

export function glfwGetClipboardString(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
  }
): CString {
  return this.symbols.glfwGetClipboardString(options.window) as CString;
}

export function glfwGetTime(this: GLFW): number {
  return this.symbols.glfwGetTime() as number;
}

export function glfwSetTime(
  this: GLFW,
  options: {
    time: number;
  }
): void {
  this.symbols.glfwSetTime(options.time);
}

export function glfwGetTimerValue(this: GLFW): Pointer | null {
  return this.symbols.glfwGetTimerValue() as Pointer | null;
}

export function glfwGetTimerFrequency(this: GLFW): Pointer | null {
  return this.symbols.glfwGetTimerFrequency() as Pointer | null;
}

export function glfwMakeContextCurrent(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwMakeContextCurrent(options.window);
}

export function glfwGetCurrentContext(this: GLFW): Pointer | null {
  return this.symbols.glfwGetCurrentContext() as Pointer | null;
}

export function glfwSwapBuffers(
  this: GLFW,
  options: {
    window: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.glfwSwapBuffers(options.window);
}

export function glfwSwapInterval(
  this: GLFW,
  options: {
    interval: number;
  }
): void {
  this.symbols.glfwSwapInterval(options.interval);
}

export function glfwExtensionSupported(
  this: GLFW,
  options: {
    extension: string;
  }
): number {
  return this.symbols.glfwExtensionSupported(
    stringToCString(options.extension).ptr
  ) as number;
}

export function glfwGetProcAddress(
  this: GLFW,
  options: {
    procname: string;
  }
): Pointer | null {
  return this.symbols.glfwGetProcAddress(
    stringToCString(options.procname).ptr
  ) as Pointer | null;
}

export function glfwVulkanSupported(this: GLFW): number {
  return this.symbols.glfwVulkanSupported() as number;
}

export function glfwGetRequiredInstanceExtensions(
  this: GLFW,
  options: {
    count: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.glfwGetRequiredInstanceExtensions(
    options.count
  ) as Pointer | null;
}
