import { FFIType, type FFIFunction } from 'bun:ffi';

export const GLFWDefinition = {
  // glAccum
  glAccum: {
    args: [FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // glAlphaFunc
  glAlphaFunc: {
    args: [FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // glAreTexturesResident
  glAreTexturesResident: {
    args: [FFIType.i32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glArrayElement
  glArrayElement: {
    args: [FFIType.i32],
    returns: FFIType.void,
  },
  // glBegin
  glBegin: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glBindTexture
  glBindTexture: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glBitmap
  glBitmap: {
    args: [
      FFIType.i32,
      FFIType.i32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glBlendColor
  glBlendColor: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glBlendEquation
  glBlendEquation: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glBlendEquationSeparate
  glBlendEquationSeparate: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glBlendFunc
  glBlendFunc: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glCallList
  glCallList: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glCallLists
  glCallLists: {
    args: [FFIType.i32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glClear
  glClear: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glClearAccum
  glClearAccum: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glClearColor
  glClearColor: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glClearDepth
  glClearDepth: {
    args: [FFIType.f64],
    returns: FFIType.void,
  },
  // glClearIndex
  glClearIndex: {
    args: [FFIType.f32],
    returns: FFIType.void,
  },
  // glClearStencil
  glClearStencil: {
    args: [FFIType.i32],
    returns: FFIType.void,
  },
  // glClipPlane
  glClipPlane: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glColor3b
  glColor3b: {
    args: [FFIType.i8, FFIType.i8, FFIType.i8],
    returns: FFIType.void,
  },
  // glColor3bv
  glColor3bv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glColor3d
  glColor3d: {
    args: [FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glColor3dv
  glColor3dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glColor3f
  glColor3f: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glColor3fv
  glColor3fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glColor3i
  glColor3i: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glColor3iv
  glColor3iv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glColor3s
  glColor3s: {
    args: [FFIType.i16, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glColor3sv
  glColor3sv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glColor3ub
  glColor3ub: {
    args: [FFIType.u8, FFIType.u8, FFIType.u8],
    returns: FFIType.void,
  },
  // glColor3ubv
  glColor3ubv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glColor3ui
  glColor3ui: {
    args: [FFIType.u32, FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glColor3uiv
  glColor3uiv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glColor3us
  glColor3us: {
    args: [FFIType.u16, FFIType.u16, FFIType.u16],
    returns: FFIType.void,
  },
  // glColor3usv
  glColor3usv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glColor4b
  glColor4b: {
    args: [FFIType.i8, FFIType.i8, FFIType.i8, FFIType.i8],
    returns: FFIType.void,
  },
  // glColor4bv
  glColor4bv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glColor4d
  glColor4d: {
    args: [FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glColor4dv
  glColor4dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glColor4f
  glColor4f: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glColor4fv
  glColor4fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glColor4i
  glColor4i: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glColor4iv
  glColor4iv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glColor4s
  glColor4s: {
    args: [FFIType.i16, FFIType.i16, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glColor4sv
  glColor4sv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glColor4ub
  glColor4ub: {
    args: [FFIType.u8, FFIType.u8, FFIType.u8, FFIType.u8],
    returns: FFIType.void,
  },
  // glColor4ubv
  glColor4ubv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glColor4ui
  glColor4ui: {
    args: [FFIType.u32, FFIType.u32, FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glColor4uiv
  glColor4uiv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glColor4us
  glColor4us: {
    args: [FFIType.u16, FFIType.u16, FFIType.u16, FFIType.u16],
    returns: FFIType.void,
  },
  // glColor4usv
  glColor4usv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glColorMask
  glColorMask: {
    args: [FFIType.u8, FFIType.u8, FFIType.u8, FFIType.u8],
    returns: FFIType.void,
  },
  // glColorMaterial
  glColorMaterial: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glColorPointer
  glColorPointer: {
    args: [FFIType.i32, FFIType.u32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glColorSubTable
  glColorSubTable: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glColorTable
  glColorTable: {
    args: [
      FFIType.u32,
      FFIType.u32,
      FFIType.i32,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glColorTableParameterfv
  glColorTableParameterfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glColorTableParameteriv
  glColorTableParameteriv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glConvolutionFilter1D
  glConvolutionFilter1D: {
    args: [
      FFIType.u32,
      FFIType.u32,
      FFIType.i32,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glConvolutionFilter2D
  glConvolutionFilter2D: {
    args: [
      FFIType.u32,
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glConvolutionParameterf
  glConvolutionParameterf: {
    args: [FFIType.u32, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // glConvolutionParameterfv
  glConvolutionParameterfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glConvolutionParameteri
  glConvolutionParameteri: {
    args: [FFIType.u32, FFIType.u32, FFIType.i32],
    returns: FFIType.void,
  },
  // glConvolutionParameteriv
  glConvolutionParameteriv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glCopyColorSubTable
  glCopyColorSubTable: {
    args: [FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glCopyColorTable
  glCopyColorTable: {
    args: [FFIType.u32, FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glCopyConvolutionFilter1D
  glCopyConvolutionFilter1D: {
    args: [FFIType.u32, FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glCopyConvolutionFilter2D
  glCopyConvolutionFilter2D: {
    args: [
      FFIType.u32,
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
    ],
    returns: FFIType.void,
  },
  // glCopyPixels
  glCopyPixels: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.u32],
    returns: FFIType.void,
  },
  // glCopyTexImage1D
  glCopyTexImage1D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
    ],
    returns: FFIType.void,
  },
  // glCopyTexImage2D
  glCopyTexImage2D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
    ],
    returns: FFIType.void,
  },
  // glCopyTexSubImage1D
  glCopyTexSubImage1D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
    ],
    returns: FFIType.void,
  },
  // glCopyTexSubImage2D
  glCopyTexSubImage2D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
    ],
    returns: FFIType.void,
  },
  // glCopyTexSubImage3D
  glCopyTexSubImage3D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
    ],
    returns: FFIType.void,
  },
  // glCullFace
  glCullFace: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glDeleteLists
  glDeleteLists: {
    args: [FFIType.u32, FFIType.i32],
    returns: FFIType.void,
  },
  // glDeleteTextures
  glDeleteTextures: {
    args: [FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glDepthFunc
  glDepthFunc: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glDepthMask
  glDepthMask: {
    args: [FFIType.u8],
    returns: FFIType.void,
  },
  // glDepthRange
  glDepthRange: {
    args: [FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glDisable
  glDisable: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glDisableClientState
  glDisableClientState: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glDrawArrays
  glDrawArrays: {
    args: [FFIType.u32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glDrawBuffer
  glDrawBuffer: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glDrawElements
  glDrawElements: {
    args: [FFIType.u32, FFIType.i32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glDrawPixels
  glDrawPixels: {
    args: [FFIType.i32, FFIType.i32, FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glDrawRangeElements
  glDrawRangeElements: {
    args: [
      FFIType.u32,
      FFIType.u32,
      FFIType.u32,
      FFIType.i32,
      FFIType.u32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glEdgeFlag
  glEdgeFlag: {
    args: [FFIType.u8],
    returns: FFIType.void,
  },
  // glEdgeFlagPointer
  glEdgeFlagPointer: {
    args: [FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glEdgeFlagv
  glEdgeFlagv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glEnable
  glEnable: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glEnableClientState
  glEnableClientState: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glEnd
  glEnd: {
    args: [],
    returns: FFIType.void,
  },
  // glEndList
  glEndList: {
    args: [],
    returns: FFIType.void,
  },
  // glEvalCoord1d
  glEvalCoord1d: {
    args: [FFIType.f64],
    returns: FFIType.void,
  },
  // glEvalCoord1dv
  glEvalCoord1dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glEvalCoord1f
  glEvalCoord1f: {
    args: [FFIType.f32],
    returns: FFIType.void,
  },
  // glEvalCoord1fv
  glEvalCoord1fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glEvalCoord2d
  glEvalCoord2d: {
    args: [FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glEvalCoord2dv
  glEvalCoord2dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glEvalCoord2f
  glEvalCoord2f: {
    args: [FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glEvalCoord2fv
  glEvalCoord2fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glEvalMesh1
  glEvalMesh1: {
    args: [FFIType.u32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glEvalMesh2
  glEvalMesh2: {
    args: [FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glEvalPoint1
  glEvalPoint1: {
    args: [FFIType.i32],
    returns: FFIType.void,
  },
  // glEvalPoint2
  glEvalPoint2: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glFeedbackBuffer
  glFeedbackBuffer: {
    args: [FFIType.i32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glFinish
  glFinish: {
    args: [],
    returns: FFIType.void,
  },
  // glFlush
  glFlush: {
    args: [],
    returns: FFIType.void,
  },
  // glFogf
  glFogf: {
    args: [FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // glFogfv
  glFogfv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glFogi
  glFogi: {
    args: [FFIType.u32, FFIType.i32],
    returns: FFIType.void,
  },
  // glFogiv
  glFogiv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glFrontFace
  glFrontFace: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glFrustum
  glFrustum: {
    args: [
      FFIType.f64,
      FFIType.f64,
      FFIType.f64,
      FFIType.f64,
      FFIType.f64,
      FFIType.f64,
    ],
    returns: FFIType.void,
  },
  // glGenLists
  glGenLists: {
    args: [FFIType.i32],
    returns: FFIType.ptr,
  },
  // glGenTextures
  glGenTextures: {
    args: [FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetBooleanv
  glGetBooleanv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetClipPlane
  glGetClipPlane: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetColorTable
  glGetColorTable: {
    args: [FFIType.u32, FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetColorTableParameterfv
  glGetColorTableParameterfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetColorTableParameteriv
  glGetColorTableParameteriv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetConvolutionFilter
  glGetConvolutionFilter: {
    args: [FFIType.u32, FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetConvolutionParameterfv
  glGetConvolutionParameterfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetConvolutionParameteriv
  glGetConvolutionParameteriv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetDoublev
  glGetDoublev: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetError
  glGetError: {
    args: [],
    returns: FFIType.ptr,
  },
  // glGetFloatv
  glGetFloatv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetHistogram
  glGetHistogram: {
    args: [FFIType.u32, FFIType.u8, FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetHistogramParameterfv
  glGetHistogramParameterfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetHistogramParameteriv
  glGetHistogramParameteriv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetIntegerv
  glGetIntegerv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetLightfv
  glGetLightfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetLightiv
  glGetLightiv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetMapdv
  glGetMapdv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetMapfv
  glGetMapfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetMapiv
  glGetMapiv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetMaterialfv
  glGetMaterialfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetMaterialiv
  glGetMaterialiv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetMinmax
  glGetMinmax: {
    args: [FFIType.u32, FFIType.u8, FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetMinmaxParameterfv
  glGetMinmaxParameterfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetMinmaxParameteriv
  glGetMinmaxParameteriv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetPixelMapfv
  glGetPixelMapfv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetPixelMapuiv
  glGetPixelMapuiv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetPixelMapusv
  glGetPixelMapusv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetPointerv
  glGetPointerv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetPolygonStipple
  glGetPolygonStipple: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetSeparableFilter
  glGetSeparableFilter: {
    args: [
      FFIType.u32,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glGetString
  glGetString: {
    args: [FFIType.u32],
    returns: FFIType.ptr,
  },
  // glGetTexEnvfv
  glGetTexEnvfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetTexEnviv
  glGetTexEnviv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetTexGendv
  glGetTexGendv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetTexGenfv
  glGetTexGenfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetTexGeniv
  glGetTexGeniv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetTexImage
  glGetTexImage: {
    args: [FFIType.u32, FFIType.i32, FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetTexLevelParameterfv
  glGetTexLevelParameterfv: {
    args: [FFIType.u32, FFIType.i32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetTexLevelParameteriv
  glGetTexLevelParameteriv: {
    args: [FFIType.u32, FFIType.i32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetTexParameterfv
  glGetTexParameterfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetTexParameteriv
  glGetTexParameteriv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glHint
  glHint: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glHistogram
  glHistogram: {
    args: [FFIType.u32, FFIType.i32, FFIType.u32, FFIType.u8],
    returns: FFIType.void,
  },
  // glIndexMask
  glIndexMask: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glIndexPointer
  glIndexPointer: {
    args: [FFIType.u32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glIndexd
  glIndexd: {
    args: [FFIType.f64],
    returns: FFIType.void,
  },
  // glIndexdv
  glIndexdv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glIndexf
  glIndexf: {
    args: [FFIType.f32],
    returns: FFIType.void,
  },
  // glIndexfv
  glIndexfv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glIndexi
  glIndexi: {
    args: [FFIType.i32],
    returns: FFIType.void,
  },
  // glIndexiv
  glIndexiv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glIndexs
  glIndexs: {
    args: [FFIType.i16],
    returns: FFIType.void,
  },
  // glIndexsv
  glIndexsv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glIndexub
  glIndexub: {
    args: [FFIType.u8],
    returns: FFIType.void,
  },
  // glIndexubv
  glIndexubv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glInitNames
  glInitNames: {
    args: [],
    returns: FFIType.void,
  },
  // glInterleavedArrays
  glInterleavedArrays: {
    args: [FFIType.u32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glIsEnabled
  glIsEnabled: {
    args: [FFIType.u32],
    returns: FFIType.ptr,
  },
  // glIsList
  glIsList: {
    args: [FFIType.u32],
    returns: FFIType.ptr,
  },
  // glIsTexture
  glIsTexture: {
    args: [FFIType.u32],
    returns: FFIType.ptr,
  },
  // glLightModelf
  glLightModelf: {
    args: [FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // glLightModelfv
  glLightModelfv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glLightModeli
  glLightModeli: {
    args: [FFIType.u32, FFIType.i32],
    returns: FFIType.void,
  },
  // glLightModeliv
  glLightModeliv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glLightf
  glLightf: {
    args: [FFIType.u32, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // glLightfv
  glLightfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glLighti
  glLighti: {
    args: [FFIType.u32, FFIType.u32, FFIType.i32],
    returns: FFIType.void,
  },
  // glLightiv
  glLightiv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glLineStipple
  glLineStipple: {
    args: [FFIType.i32, FFIType.u16],
    returns: FFIType.void,
  },
  // glLineWidth
  glLineWidth: {
    args: [FFIType.f32],
    returns: FFIType.void,
  },
  // glListBase
  glListBase: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glLoadIdentity
  glLoadIdentity: {
    args: [],
    returns: FFIType.void,
  },
  // glLoadMatrixd
  glLoadMatrixd: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glLoadMatrixf
  glLoadMatrixf: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glLoadName
  glLoadName: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glLogicOp
  glLogicOp: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glMap1d
  glMap1d: {
    args: [
      FFIType.u32,
      FFIType.f64,
      FFIType.f64,
      FFIType.i32,
      FFIType.i32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glMap1f
  glMap1f: {
    args: [
      FFIType.u32,
      FFIType.f32,
      FFIType.f32,
      FFIType.i32,
      FFIType.i32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glMap2d
  glMap2d: {
    args: [
      FFIType.u32,
      FFIType.f64,
      FFIType.f64,
      FFIType.i32,
      FFIType.i32,
      FFIType.f64,
      FFIType.f64,
      FFIType.i32,
      FFIType.i32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glMap2f
  glMap2f: {
    args: [
      FFIType.u32,
      FFIType.f32,
      FFIType.f32,
      FFIType.i32,
      FFIType.i32,
      FFIType.f32,
      FFIType.f32,
      FFIType.i32,
      FFIType.i32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glMapGrid1d
  glMapGrid1d: {
    args: [FFIType.i32, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glMapGrid1f
  glMapGrid1f: {
    args: [FFIType.i32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glMapGrid2d
  glMapGrid2d: {
    args: [
      FFIType.i32,
      FFIType.f64,
      FFIType.f64,
      FFIType.i32,
      FFIType.f64,
      FFIType.f64,
    ],
    returns: FFIType.void,
  },
  // glMapGrid2f
  glMapGrid2f: {
    args: [
      FFIType.i32,
      FFIType.f32,
      FFIType.f32,
      FFIType.i32,
      FFIType.f32,
      FFIType.f32,
    ],
    returns: FFIType.void,
  },
  // glMaterialf
  glMaterialf: {
    args: [FFIType.u32, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // glMaterialfv
  glMaterialfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMateriali
  glMateriali: {
    args: [FFIType.u32, FFIType.u32, FFIType.i32],
    returns: FFIType.void,
  },
  // glMaterialiv
  glMaterialiv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMatrixMode
  glMatrixMode: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glMinmax
  glMinmax: {
    args: [FFIType.u32, FFIType.u32, FFIType.u8],
    returns: FFIType.void,
  },
  // glMultMatrixd
  glMultMatrixd: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultMatrixf
  glMultMatrixf: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glNewList
  glNewList: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glNormal3b
  glNormal3b: {
    args: [FFIType.i8, FFIType.i8, FFIType.i8],
    returns: FFIType.void,
  },
  // glNormal3bv
  glNormal3bv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glNormal3d
  glNormal3d: {
    args: [FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glNormal3dv
  glNormal3dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glNormal3f
  glNormal3f: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glNormal3fv
  glNormal3fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glNormal3i
  glNormal3i: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glNormal3iv
  glNormal3iv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glNormal3s
  glNormal3s: {
    args: [FFIType.i16, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glNormal3sv
  glNormal3sv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glNormalPointer
  glNormalPointer: {
    args: [FFIType.u32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glOrtho
  glOrtho: {
    args: [
      FFIType.f64,
      FFIType.f64,
      FFIType.f64,
      FFIType.f64,
      FFIType.f64,
      FFIType.f64,
    ],
    returns: FFIType.void,
  },
  // glPassThrough
  glPassThrough: {
    args: [FFIType.f32],
    returns: FFIType.void,
  },
  // glPixelMapfv
  glPixelMapfv: {
    args: [FFIType.u32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glPixelMapuiv
  glPixelMapuiv: {
    args: [FFIType.u32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glPixelMapusv
  glPixelMapusv: {
    args: [FFIType.u32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glPixelStoref
  glPixelStoref: {
    args: [FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // glPixelStorei
  glPixelStorei: {
    args: [FFIType.u32, FFIType.i32],
    returns: FFIType.void,
  },
  // glPixelTransferf
  glPixelTransferf: {
    args: [FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // glPixelTransferi
  glPixelTransferi: {
    args: [FFIType.u32, FFIType.i32],
    returns: FFIType.void,
  },
  // glPixelZoom
  glPixelZoom: {
    args: [FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glPointSize
  glPointSize: {
    args: [FFIType.f32],
    returns: FFIType.void,
  },
  // glPolygonMode
  glPolygonMode: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glPolygonOffset
  glPolygonOffset: {
    args: [FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glPolygonStipple
  glPolygonStipple: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glPopAttrib
  glPopAttrib: {
    args: [],
    returns: FFIType.void,
  },
  // glPopClientAttrib
  glPopClientAttrib: {
    args: [],
    returns: FFIType.void,
  },
  // glPopMatrix
  glPopMatrix: {
    args: [],
    returns: FFIType.void,
  },
  // glPopName
  glPopName: {
    args: [],
    returns: FFIType.void,
  },
  // glPrioritizeTextures
  glPrioritizeTextures: {
    args: [FFIType.i32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glPushAttrib
  glPushAttrib: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glPushClientAttrib
  glPushClientAttrib: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glPushMatrix
  glPushMatrix: {
    args: [],
    returns: FFIType.void,
  },
  // glPushName
  glPushName: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glRasterPos2d
  glRasterPos2d: {
    args: [FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glRasterPos2dv
  glRasterPos2dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glRasterPos2f
  glRasterPos2f: {
    args: [FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glRasterPos2fv
  glRasterPos2fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glRasterPos2i
  glRasterPos2i: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glRasterPos2iv
  glRasterPos2iv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glRasterPos2s
  glRasterPos2s: {
    args: [FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glRasterPos2sv
  glRasterPos2sv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glRasterPos3d
  glRasterPos3d: {
    args: [FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glRasterPos3dv
  glRasterPos3dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glRasterPos3f
  glRasterPos3f: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glRasterPos3fv
  glRasterPos3fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glRasterPos3i
  glRasterPos3i: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glRasterPos3iv
  glRasterPos3iv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glRasterPos3s
  glRasterPos3s: {
    args: [FFIType.i16, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glRasterPos3sv
  glRasterPos3sv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glRasterPos4d
  glRasterPos4d: {
    args: [FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glRasterPos4dv
  glRasterPos4dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glRasterPos4f
  glRasterPos4f: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glRasterPos4fv
  glRasterPos4fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glRasterPos4i
  glRasterPos4i: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glRasterPos4iv
  glRasterPos4iv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glRasterPos4s
  glRasterPos4s: {
    args: [FFIType.i16, FFIType.i16, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glRasterPos4sv
  glRasterPos4sv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glReadBuffer
  glReadBuffer: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glReadPixels
  glReadPixels: {
    args: [
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glRectd
  glRectd: {
    args: [FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glRectdv
  glRectdv: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glRectf
  glRectf: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glRectfv
  glRectfv: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glRecti
  glRecti: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glRectiv
  glRectiv: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glRects
  glRects: {
    args: [FFIType.i16, FFIType.i16, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glRectsv
  glRectsv: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glRenderMode
  glRenderMode: {
    args: [FFIType.u32],
    returns: FFIType.ptr,
  },
  // glResetHistogram
  glResetHistogram: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glResetMinmax
  glResetMinmax: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glRotated
  glRotated: {
    args: [FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glRotatef
  glRotatef: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glScaled
  glScaled: {
    args: [FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glScalef
  glScalef: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glScissor
  glScissor: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glSelectBuffer
  glSelectBuffer: {
    args: [FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glSeparableFilter2D
  glSeparableFilter2D: {
    args: [
      FFIType.u32,
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glShadeModel
  glShadeModel: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glStencilFunc
  glStencilFunc: {
    args: [FFIType.u32, FFIType.i32, FFIType.u32],
    returns: FFIType.void,
  },
  // glStencilMask
  glStencilMask: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glStencilOp
  glStencilOp: {
    args: [FFIType.u32, FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glTexCoord1d
  glTexCoord1d: {
    args: [FFIType.f64],
    returns: FFIType.void,
  },
  // glTexCoord1dv
  glTexCoord1dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexCoord1f
  glTexCoord1f: {
    args: [FFIType.f32],
    returns: FFIType.void,
  },
  // glTexCoord1fv
  glTexCoord1fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexCoord1i
  glTexCoord1i: {
    args: [FFIType.i32],
    returns: FFIType.void,
  },
  // glTexCoord1iv
  glTexCoord1iv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexCoord1s
  glTexCoord1s: {
    args: [FFIType.i16],
    returns: FFIType.void,
  },
  // glTexCoord1sv
  glTexCoord1sv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexCoord2d
  glTexCoord2d: {
    args: [FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glTexCoord2dv
  glTexCoord2dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexCoord2f
  glTexCoord2f: {
    args: [FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glTexCoord2fv
  glTexCoord2fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexCoord2i
  glTexCoord2i: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glTexCoord2iv
  glTexCoord2iv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexCoord2s
  glTexCoord2s: {
    args: [FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glTexCoord2sv
  glTexCoord2sv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexCoord3d
  glTexCoord3d: {
    args: [FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glTexCoord3dv
  glTexCoord3dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexCoord3f
  glTexCoord3f: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glTexCoord3fv
  glTexCoord3fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexCoord3i
  glTexCoord3i: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glTexCoord3iv
  glTexCoord3iv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexCoord3s
  glTexCoord3s: {
    args: [FFIType.i16, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glTexCoord3sv
  glTexCoord3sv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexCoord4d
  glTexCoord4d: {
    args: [FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glTexCoord4dv
  glTexCoord4dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexCoord4f
  glTexCoord4f: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glTexCoord4fv
  glTexCoord4fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexCoord4i
  glTexCoord4i: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glTexCoord4iv
  glTexCoord4iv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexCoord4s
  glTexCoord4s: {
    args: [FFIType.i16, FFIType.i16, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glTexCoord4sv
  glTexCoord4sv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexCoordPointer
  glTexCoordPointer: {
    args: [FFIType.i32, FFIType.u32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexEnvf
  glTexEnvf: {
    args: [FFIType.u32, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // glTexEnvfv
  glTexEnvfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexEnvi
  glTexEnvi: {
    args: [FFIType.u32, FFIType.u32, FFIType.i32],
    returns: FFIType.void,
  },
  // glTexEnviv
  glTexEnviv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexGend
  glTexGend: {
    args: [FFIType.u32, FFIType.u32, FFIType.f64],
    returns: FFIType.void,
  },
  // glTexGendv
  glTexGendv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexGenf
  glTexGenf: {
    args: [FFIType.u32, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // glTexGenfv
  glTexGenfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexGeni
  glTexGeni: {
    args: [FFIType.u32, FFIType.u32, FFIType.i32],
    returns: FFIType.void,
  },
  // glTexGeniv
  glTexGeniv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexImage1D
  glTexImage1D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glTexImage2D
  glTexImage2D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glTexImage3D
  glTexImage3D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glTexParameterf
  glTexParameterf: {
    args: [FFIType.u32, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // glTexParameterfv
  glTexParameterfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexParameteri
  glTexParameteri: {
    args: [FFIType.u32, FFIType.u32, FFIType.i32],
    returns: FFIType.void,
  },
  // glTexParameteriv
  glTexParameteriv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glTexSubImage1D
  glTexSubImage1D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glTexSubImage2D
  glTexSubImage2D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glTexSubImage3D
  glTexSubImage3D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glTranslated
  glTranslated: {
    args: [FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glTranslatef
  glTranslatef: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glVertex2d
  glVertex2d: {
    args: [FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glVertex2dv
  glVertex2dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertex2f
  glVertex2f: {
    args: [FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glVertex2fv
  glVertex2fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertex2i
  glVertex2i: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glVertex2iv
  glVertex2iv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertex2s
  glVertex2s: {
    args: [FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glVertex2sv
  glVertex2sv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertex3d
  glVertex3d: {
    args: [FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glVertex3dv
  glVertex3dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertex3f
  glVertex3f: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glVertex3fv
  glVertex3fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertex3i
  glVertex3i: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glVertex3iv
  glVertex3iv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertex3s
  glVertex3s: {
    args: [FFIType.i16, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glVertex3sv
  glVertex3sv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertex4d
  glVertex4d: {
    args: [FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glVertex4dv
  glVertex4dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertex4f
  glVertex4f: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glVertex4fv
  glVertex4fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertex4i
  glVertex4i: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glVertex4iv
  glVertex4iv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertex4s
  glVertex4s: {
    args: [FFIType.i16, FFIType.i16, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glVertex4sv
  glVertex4sv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexPointer
  glVertexPointer: {
    args: [FFIType.i32, FFIType.u32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glViewport
  glViewport: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glSampleCoverage
  glSampleCoverage: {
    args: [FFIType.f32, FFIType.u8],
    returns: FFIType.void,
  },
  // glLoadTransposeMatrixf
  glLoadTransposeMatrixf: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glLoadTransposeMatrixd
  glLoadTransposeMatrixd: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultTransposeMatrixf
  glMultTransposeMatrixf: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultTransposeMatrixd
  glMultTransposeMatrixd: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glCompressedTexImage3D
  glCompressedTexImage3D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glCompressedTexImage2D
  glCompressedTexImage2D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glCompressedTexImage1D
  glCompressedTexImage1D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glCompressedTexSubImage3D
  glCompressedTexSubImage3D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.u32,
      FFIType.i32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glCompressedTexSubImage2D
  glCompressedTexSubImage2D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.u32,
      FFIType.i32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glCompressedTexSubImage1D
  glCompressedTexSubImage1D: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.u32,
      FFIType.i32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glGetCompressedTexImage
  glGetCompressedTexImage: {
    args: [FFIType.u32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glActiveTexture
  glActiveTexture: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glClientActiveTexture
  glClientActiveTexture: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glMultiTexCoord1d
  glMultiTexCoord1d: {
    args: [FFIType.u32, FFIType.f64],
    returns: FFIType.void,
  },
  // glMultiTexCoord1dv
  glMultiTexCoord1dv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultiTexCoord1f
  glMultiTexCoord1f: {
    args: [FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // glMultiTexCoord1fv
  glMultiTexCoord1fv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultiTexCoord1i
  glMultiTexCoord1i: {
    args: [FFIType.u32, FFIType.i32],
    returns: FFIType.void,
  },
  // glMultiTexCoord1iv
  glMultiTexCoord1iv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultiTexCoord1s
  glMultiTexCoord1s: {
    args: [FFIType.u32, FFIType.i16],
    returns: FFIType.void,
  },
  // glMultiTexCoord1sv
  glMultiTexCoord1sv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultiTexCoord2d
  glMultiTexCoord2d: {
    args: [FFIType.u32, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glMultiTexCoord2dv
  glMultiTexCoord2dv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultiTexCoord2f
  glMultiTexCoord2f: {
    args: [FFIType.u32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glMultiTexCoord2fv
  glMultiTexCoord2fv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultiTexCoord2i
  glMultiTexCoord2i: {
    args: [FFIType.u32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glMultiTexCoord2iv
  glMultiTexCoord2iv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultiTexCoord2s
  glMultiTexCoord2s: {
    args: [FFIType.u32, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glMultiTexCoord2sv
  glMultiTexCoord2sv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultiTexCoord3d
  glMultiTexCoord3d: {
    args: [FFIType.u32, FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glMultiTexCoord3dv
  glMultiTexCoord3dv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultiTexCoord3f
  glMultiTexCoord3f: {
    args: [FFIType.u32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glMultiTexCoord3fv
  glMultiTexCoord3fv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultiTexCoord3i
  glMultiTexCoord3i: {
    args: [FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glMultiTexCoord3iv
  glMultiTexCoord3iv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultiTexCoord3s
  glMultiTexCoord3s: {
    args: [FFIType.u32, FFIType.i16, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glMultiTexCoord3sv
  glMultiTexCoord3sv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultiTexCoord4d
  glMultiTexCoord4d: {
    args: [FFIType.u32, FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glMultiTexCoord4dv
  glMultiTexCoord4dv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultiTexCoord4f
  glMultiTexCoord4f: {
    args: [FFIType.u32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glMultiTexCoord4fv
  glMultiTexCoord4fv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultiTexCoord4i
  glMultiTexCoord4i: {
    args: [FFIType.u32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glMultiTexCoord4iv
  glMultiTexCoord4iv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMultiTexCoord4s
  glMultiTexCoord4s: {
    args: [FFIType.u32, FFIType.i16, FFIType.i16, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glMultiTexCoord4sv
  glMultiTexCoord4sv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glFogCoordf
  glFogCoordf: {
    args: [FFIType.f32],
    returns: FFIType.void,
  },
  // glFogCoordfv
  glFogCoordfv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glFogCoordd
  glFogCoordd: {
    args: [FFIType.f64],
    returns: FFIType.void,
  },
  // glFogCoorddv
  glFogCoorddv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glFogCoordPointer
  glFogCoordPointer: {
    args: [FFIType.u32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glSecondaryColor3b
  glSecondaryColor3b: {
    args: [FFIType.i8, FFIType.i8, FFIType.i8],
    returns: FFIType.void,
  },
  // glSecondaryColor3bv
  glSecondaryColor3bv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glSecondaryColor3d
  glSecondaryColor3d: {
    args: [FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glSecondaryColor3dv
  glSecondaryColor3dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glSecondaryColor3f
  glSecondaryColor3f: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glSecondaryColor3fv
  glSecondaryColor3fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glSecondaryColor3i
  glSecondaryColor3i: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glSecondaryColor3iv
  glSecondaryColor3iv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glSecondaryColor3s
  glSecondaryColor3s: {
    args: [FFIType.i16, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glSecondaryColor3sv
  glSecondaryColor3sv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glSecondaryColor3ub
  glSecondaryColor3ub: {
    args: [FFIType.u8, FFIType.u8, FFIType.u8],
    returns: FFIType.void,
  },
  // glSecondaryColor3ubv
  glSecondaryColor3ubv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glSecondaryColor3ui
  glSecondaryColor3ui: {
    args: [FFIType.u32, FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glSecondaryColor3uiv
  glSecondaryColor3uiv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glSecondaryColor3us
  glSecondaryColor3us: {
    args: [FFIType.u16, FFIType.u16, FFIType.u16],
    returns: FFIType.void,
  },
  // glSecondaryColor3usv
  glSecondaryColor3usv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glSecondaryColorPointer
  glSecondaryColorPointer: {
    args: [FFIType.i32, FFIType.u32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glPointParameterf
  glPointParameterf: {
    args: [FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // glPointParameterfv
  glPointParameterfv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glPointParameteri
  glPointParameteri: {
    args: [FFIType.u32, FFIType.i32],
    returns: FFIType.void,
  },
  // glPointParameteriv
  glPointParameteriv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glBlendFuncSeparate
  glBlendFuncSeparate: {
    args: [FFIType.u32, FFIType.u32, FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glMultiDrawArrays
  glMultiDrawArrays: {
    args: [FFIType.u32, FFIType.ptr, FFIType.ptr, FFIType.i32],
    returns: FFIType.void,
  },
  // glMultiDrawElements
  glMultiDrawElements: {
    args: [FFIType.u32, FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.i32],
    returns: FFIType.void,
  },
  // glWindowPos2d
  glWindowPos2d: {
    args: [FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glWindowPos2dv
  glWindowPos2dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glWindowPos2f
  glWindowPos2f: {
    args: [FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glWindowPos2fv
  glWindowPos2fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glWindowPos2i
  glWindowPos2i: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glWindowPos2iv
  glWindowPos2iv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glWindowPos2s
  glWindowPos2s: {
    args: [FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glWindowPos2sv
  glWindowPos2sv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glWindowPos3d
  glWindowPos3d: {
    args: [FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glWindowPos3dv
  glWindowPos3dv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glWindowPos3f
  glWindowPos3f: {
    args: [FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glWindowPos3fv
  glWindowPos3fv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glWindowPos3i
  glWindowPos3i: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glWindowPos3iv
  glWindowPos3iv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glWindowPos3s
  glWindowPos3s: {
    args: [FFIType.i16, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glWindowPos3sv
  glWindowPos3sv: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glGenQueries
  glGenQueries: {
    args: [FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glDeleteQueries
  glDeleteQueries: {
    args: [FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glIsQuery
  glIsQuery: {
    args: [FFIType.u32],
    returns: FFIType.ptr,
  },
  // glBeginQuery
  glBeginQuery: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glEndQuery
  glEndQuery: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glGetQueryiv
  glGetQueryiv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetQueryObjectiv
  glGetQueryObjectiv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetQueryObjectuiv
  glGetQueryObjectuiv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glBindBuffer
  glBindBuffer: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glDeleteBuffers
  glDeleteBuffers: {
    args: [FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGenBuffers
  glGenBuffers: {
    args: [FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glIsBuffer
  glIsBuffer: {
    args: [FFIType.u32],
    returns: FFIType.ptr,
  },
  // glBufferData
  glBufferData: {
    args: [FFIType.u32, FFIType.i32, FFIType.ptr, FFIType.u32],
    returns: FFIType.void,
  },
  // glBufferSubData
  glBufferSubData: {
    args: [FFIType.u32, FFIType.i32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetBufferSubData
  glGetBufferSubData: {
    args: [FFIType.u32, FFIType.i32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glMapBuffer
  glMapBuffer: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.ptr,
  },
  // glUnmapBuffer
  glUnmapBuffer: {
    args: [FFIType.u32],
    returns: FFIType.ptr,
  },
  // glGetBufferParameteriv
  glGetBufferParameteriv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetBufferPointerv
  glGetBufferPointerv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glDrawBuffers
  glDrawBuffers: {
    args: [FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib1d
  glVertexAttrib1d: {
    args: [FFIType.u32, FFIType.f64],
    returns: FFIType.void,
  },
  // glVertexAttrib1dv
  glVertexAttrib1dv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib1f
  glVertexAttrib1f: {
    args: [FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // glVertexAttrib1fv
  glVertexAttrib1fv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib1s
  glVertexAttrib1s: {
    args: [FFIType.u32, FFIType.i16],
    returns: FFIType.void,
  },
  // glVertexAttrib1sv
  glVertexAttrib1sv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib2d
  glVertexAttrib2d: {
    args: [FFIType.u32, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glVertexAttrib2dv
  glVertexAttrib2dv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib2f
  glVertexAttrib2f: {
    args: [FFIType.u32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glVertexAttrib2fv
  glVertexAttrib2fv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib2s
  glVertexAttrib2s: {
    args: [FFIType.u32, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glVertexAttrib2sv
  glVertexAttrib2sv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib3d
  glVertexAttrib3d: {
    args: [FFIType.u32, FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glVertexAttrib3dv
  glVertexAttrib3dv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib3f
  glVertexAttrib3f: {
    args: [FFIType.u32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glVertexAttrib3fv
  glVertexAttrib3fv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib3s
  glVertexAttrib3s: {
    args: [FFIType.u32, FFIType.i16, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glVertexAttrib3sv
  glVertexAttrib3sv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib4Nbv
  glVertexAttrib4Nbv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib4Niv
  glVertexAttrib4Niv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib4Nsv
  glVertexAttrib4Nsv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib4Nub
  glVertexAttrib4Nub: {
    args: [FFIType.u32, FFIType.u8, FFIType.u8, FFIType.u8, FFIType.u8],
    returns: FFIType.void,
  },
  // glVertexAttrib4Nubv
  glVertexAttrib4Nubv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib4Nuiv
  glVertexAttrib4Nuiv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib4Nusv
  glVertexAttrib4Nusv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib4bv
  glVertexAttrib4bv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib4d
  glVertexAttrib4d: {
    args: [FFIType.u32, FFIType.f64, FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glVertexAttrib4dv
  glVertexAttrib4dv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib4f
  glVertexAttrib4f: {
    args: [FFIType.u32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glVertexAttrib4fv
  glVertexAttrib4fv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib4iv
  glVertexAttrib4iv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib4s
  glVertexAttrib4s: {
    args: [FFIType.u32, FFIType.i16, FFIType.i16, FFIType.i16, FFIType.i16],
    returns: FFIType.void,
  },
  // glVertexAttrib4sv
  glVertexAttrib4sv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib4ubv
  glVertexAttrib4ubv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib4uiv
  glVertexAttrib4uiv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttrib4usv
  glVertexAttrib4usv: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glVertexAttribPointer
  glVertexAttribPointer: {
    args: [
      FFIType.u32,
      FFIType.i32,
      FFIType.u32,
      FFIType.u8,
      FFIType.i32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glEnableVertexAttribArray
  glEnableVertexAttribArray: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glDisableVertexAttribArray
  glDisableVertexAttribArray: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glGetVertexAttribdv
  glGetVertexAttribdv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetVertexAttribfv
  glGetVertexAttribfv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetVertexAttribiv
  glGetVertexAttribiv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetVertexAttribPointerv
  glGetVertexAttribPointerv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glDeleteShader
  glDeleteShader: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glDetachShader
  glDetachShader: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glCreateShader
  glCreateShader: {
    args: [FFIType.u32],
    returns: FFIType.ptr,
  },
  // glShaderSource
  glShaderSource: {
    args: [FFIType.u32, FFIType.i32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glCompileShader
  glCompileShader: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glCreateProgram
  glCreateProgram: {
    args: [],
    returns: FFIType.ptr,
  },
  // glAttachShader
  glAttachShader: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glLinkProgram
  glLinkProgram: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glUseProgram
  glUseProgram: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glDeleteProgram
  glDeleteProgram: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glValidateProgram
  glValidateProgram: {
    args: [FFIType.u32],
    returns: FFIType.void,
  },
  // glUniform1f
  glUniform1f: {
    args: [FFIType.i32, FFIType.f32],
    returns: FFIType.void,
  },
  // glUniform2f
  glUniform2f: {
    args: [FFIType.i32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glUniform3f
  glUniform3f: {
    args: [FFIType.i32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glUniform4f
  glUniform4f: {
    args: [FFIType.i32, FFIType.f32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // glUniform1i
  glUniform1i: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glUniform2i
  glUniform2i: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glUniform3i
  glUniform3i: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glUniform4i
  glUniform4i: {
    args: [FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glUniform1fv
  glUniform1fv: {
    args: [FFIType.i32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glUniform2fv
  glUniform2fv: {
    args: [FFIType.i32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glUniform3fv
  glUniform3fv: {
    args: [FFIType.i32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glUniform4fv
  glUniform4fv: {
    args: [FFIType.i32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glUniform1iv
  glUniform1iv: {
    args: [FFIType.i32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glUniform2iv
  glUniform2iv: {
    args: [FFIType.i32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glUniform3iv
  glUniform3iv: {
    args: [FFIType.i32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glUniform4iv
  glUniform4iv: {
    args: [FFIType.i32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glUniformMatrix2fv
  glUniformMatrix2fv: {
    args: [FFIType.i32, FFIType.i32, FFIType.u8, FFIType.ptr],
    returns: FFIType.void,
  },
  // glUniformMatrix3fv
  glUniformMatrix3fv: {
    args: [FFIType.i32, FFIType.i32, FFIType.u8, FFIType.ptr],
    returns: FFIType.void,
  },
  // glUniformMatrix4fv
  glUniformMatrix4fv: {
    args: [FFIType.i32, FFIType.i32, FFIType.u8, FFIType.ptr],
    returns: FFIType.void,
  },
  // glIsShader
  glIsShader: {
    args: [FFIType.u32],
    returns: FFIType.ptr,
  },
  // glIsProgram
  glIsProgram: {
    args: [FFIType.u32],
    returns: FFIType.ptr,
  },
  // glGetShaderiv
  glGetShaderiv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetProgramiv
  glGetProgramiv: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetAttachedShaders
  glGetAttachedShaders: {
    args: [FFIType.u32, FFIType.i32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetShaderInfoLog
  glGetShaderInfoLog: {
    args: [FFIType.u32, FFIType.i32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetProgramInfoLog
  glGetProgramInfoLog: {
    args: [FFIType.u32, FFIType.i32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetUniformLocation
  glGetUniformLocation: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glGetActiveUniform
  glGetActiveUniform: {
    args: [
      FFIType.u32,
      FFIType.u32,
      FFIType.i32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glGetUniformfv
  glGetUniformfv: {
    args: [FFIType.u32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetUniformiv
  glGetUniformiv: {
    args: [FFIType.u32, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetShaderSource
  glGetShaderSource: {
    args: [FFIType.u32, FFIType.i32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glBindAttribLocation
  glBindAttribLocation: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glGetActiveAttrib
  glGetActiveAttrib: {
    args: [
      FFIType.u32,
      FFIType.u32,
      FFIType.i32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // glGetAttribLocation
  glGetAttribLocation: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glStencilFuncSeparate
  glStencilFuncSeparate: {
    args: [FFIType.u32, FFIType.u32, FFIType.i32, FFIType.u32],
    returns: FFIType.void,
  },
  // glStencilOpSeparate
  glStencilOpSeparate: {
    args: [FFIType.u32, FFIType.u32, FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glStencilMaskSeparate
  glStencilMaskSeparate: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // glUniformMatrix2x3fv
  glUniformMatrix2x3fv: {
    args: [FFIType.i32, FFIType.i32, FFIType.u8, FFIType.ptr],
    returns: FFIType.void,
  },
  // glUniformMatrix3x2fv
  glUniformMatrix3x2fv: {
    args: [FFIType.i32, FFIType.i32, FFIType.u8, FFIType.ptr],
    returns: FFIType.void,
  },
  // glUniformMatrix2x4fv
  glUniformMatrix2x4fv: {
    args: [FFIType.i32, FFIType.i32, FFIType.u8, FFIType.ptr],
    returns: FFIType.void,
  },
  // glUniformMatrix4x2fv
  glUniformMatrix4x2fv: {
    args: [FFIType.i32, FFIType.i32, FFIType.u8, FFIType.ptr],
    returns: FFIType.void,
  },
  // glUniformMatrix3x4fv
  glUniformMatrix3x4fv: {
    args: [FFIType.i32, FFIType.i32, FFIType.u8, FFIType.ptr],
    returns: FFIType.void,
  },
  // glUniformMatrix4x3fv
  glUniformMatrix4x3fv: {
    args: [FFIType.i32, FFIType.i32, FFIType.u8, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwInit
  glfwInit: {
    args: [],
    returns: FFIType.i32,
  },
  // glfwTerminate
  glfwTerminate: {
    args: [],
    returns: FFIType.void,
  },
  // glfwInitHint
  glfwInitHint: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glfwInitAllocator
  glfwInitAllocator: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwGetVersion
  glfwGetVersion: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwGetVersionString
  glfwGetVersionString: {
    args: [],
    returns: FFIType.cstring,
  },
  // glfwGetError
  glfwGetError: {
    args: [FFIType.ptr],
    returns: FFIType.i32,
  },
  // glfwSetErrorCallback
  glfwSetErrorCallback: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwGetPlatform
  glfwGetPlatform: {
    args: [],
    returns: FFIType.i32,
  },
  // glfwPlatformSupported
  glfwPlatformSupported: {
    args: [FFIType.i32],
    returns: FFIType.i32,
  },
  // glfwGetMonitors
  glfwGetMonitors: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwGetPrimaryMonitor
  glfwGetPrimaryMonitor: {
    args: [],
    returns: FFIType.ptr,
  },
  // glfwGetMonitorPos
  glfwGetMonitorPos: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwGetMonitorWorkarea
  glfwGetMonitorWorkarea: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwGetMonitorPhysicalSize
  glfwGetMonitorPhysicalSize: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwGetMonitorContentScale
  glfwGetMonitorContentScale: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwGetMonitorName
  glfwGetMonitorName: {
    args: [FFIType.ptr],
    returns: FFIType.cstring,
  },
  // glfwSetMonitorUserPointer
  glfwSetMonitorUserPointer: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwGetMonitorUserPointer
  glfwGetMonitorUserPointer: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetMonitorCallback
  glfwSetMonitorCallback: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwGetVideoModes
  glfwGetVideoModes: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwGetVideoMode
  glfwGetVideoMode: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetGamma
  glfwSetGamma: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // glfwGetGammaRamp
  glfwGetGammaRamp: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetGammaRamp
  glfwSetGammaRamp: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwDefaultWindowHints
  glfwDefaultWindowHints: {
    args: [],
    returns: FFIType.void,
  },
  // glfwWindowHint
  glfwWindowHint: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glfwWindowHintString
  glfwWindowHintString: {
    args: [FFIType.i32, FFIType.cstring],
    returns: FFIType.void,
  },
  // glfwCreateWindow
  glfwCreateWindow: {
    args: [FFIType.i32, FFIType.i32, FFIType.cstring, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwDestroyWindow
  glfwDestroyWindow: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwWindowShouldClose
  glfwWindowShouldClose: {
    args: [FFIType.ptr],
    returns: FFIType.i32,
  },
  // glfwSetWindowShouldClose
  glfwSetWindowShouldClose: {
    args: [FFIType.ptr, FFIType.i32],
    returns: FFIType.void,
  },
  // glfwGetWindowTitle
  glfwGetWindowTitle: {
    args: [FFIType.ptr],
    returns: FFIType.cstring,
  },
  // glfwSetWindowTitle
  glfwSetWindowTitle: {
    args: [FFIType.ptr, FFIType.cstring],
    returns: FFIType.void,
  },
  // glfwSetWindowIcon
  glfwSetWindowIcon: {
    args: [FFIType.ptr, FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwGetWindowPos
  glfwGetWindowPos: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwSetWindowPos
  glfwSetWindowPos: {
    args: [FFIType.ptr, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glfwGetWindowSize
  glfwGetWindowSize: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwSetWindowSizeLimits
  glfwSetWindowSizeLimits: {
    args: [FFIType.ptr, FFIType.i32, FFIType.i32, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glfwSetWindowAspectRatio
  glfwSetWindowAspectRatio: {
    args: [FFIType.ptr, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glfwSetWindowSize
  glfwSetWindowSize: {
    args: [FFIType.ptr, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glfwGetFramebufferSize
  glfwGetFramebufferSize: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwGetWindowFrameSize
  glfwGetWindowFrameSize: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwGetWindowContentScale
  glfwGetWindowContentScale: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwGetWindowOpacity
  glfwGetWindowOpacity: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // glfwSetWindowOpacity
  glfwSetWindowOpacity: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // glfwIconifyWindow
  glfwIconifyWindow: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwRestoreWindow
  glfwRestoreWindow: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwMaximizeWindow
  glfwMaximizeWindow: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwShowWindow
  glfwShowWindow: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwHideWindow
  glfwHideWindow: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwFocusWindow
  glfwFocusWindow: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwRequestWindowAttention
  glfwRequestWindowAttention: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwGetWindowMonitor
  glfwGetWindowMonitor: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetWindowMonitor
  glfwSetWindowMonitor: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
    ],
    returns: FFIType.void,
  },
  // glfwGetWindowAttrib
  glfwGetWindowAttrib: {
    args: [FFIType.ptr, FFIType.i32],
    returns: FFIType.i32,
  },
  // glfwSetWindowAttrib
  glfwSetWindowAttrib: {
    args: [FFIType.ptr, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glfwSetWindowUserPointer
  glfwSetWindowUserPointer: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwGetWindowUserPointer
  glfwGetWindowUserPointer: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetWindowPosCallback
  glfwSetWindowPosCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetWindowSizeCallback
  glfwSetWindowSizeCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetWindowCloseCallback
  glfwSetWindowCloseCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetWindowRefreshCallback
  glfwSetWindowRefreshCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetWindowFocusCallback
  glfwSetWindowFocusCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetWindowIconifyCallback
  glfwSetWindowIconifyCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetWindowMaximizeCallback
  glfwSetWindowMaximizeCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetFramebufferSizeCallback
  glfwSetFramebufferSizeCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetWindowContentScaleCallback
  glfwSetWindowContentScaleCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwPollEvents
  glfwPollEvents: {
    args: [],
    returns: FFIType.void,
  },
  // glfwWaitEvents
  glfwWaitEvents: {
    args: [],
    returns: FFIType.void,
  },
  // glfwWaitEventsTimeout
  glfwWaitEventsTimeout: {
    args: [FFIType.f64],
    returns: FFIType.void,
  },
  // glfwPostEmptyEvent
  glfwPostEmptyEvent: {
    args: [],
    returns: FFIType.void,
  },
  // glfwGetInputMode
  glfwGetInputMode: {
    args: [FFIType.ptr, FFIType.i32],
    returns: FFIType.i32,
  },
  // glfwSetInputMode
  glfwSetInputMode: {
    args: [FFIType.ptr, FFIType.i32, FFIType.i32],
    returns: FFIType.void,
  },
  // glfwRawMouseMotionSupported
  glfwRawMouseMotionSupported: {
    args: [],
    returns: FFIType.i32,
  },
  // glfwGetKeyName
  glfwGetKeyName: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.cstring,
  },
  // glfwGetKeyScancode
  glfwGetKeyScancode: {
    args: [FFIType.i32],
    returns: FFIType.i32,
  },
  // glfwGetKey
  glfwGetKey: {
    args: [FFIType.ptr, FFIType.i32],
    returns: FFIType.i32,
  },
  // glfwGetMouseButton
  glfwGetMouseButton: {
    args: [FFIType.ptr, FFIType.i32],
    returns: FFIType.i32,
  },
  // glfwGetCursorPos
  glfwGetCursorPos: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwSetCursorPos
  glfwSetCursorPos: {
    args: [FFIType.ptr, FFIType.f64, FFIType.f64],
    returns: FFIType.void,
  },
  // glfwCreateCursor
  glfwCreateCursor: {
    args: [FFIType.ptr, FFIType.i32, FFIType.i32],
    returns: FFIType.ptr,
  },
  // glfwCreateStandardCursor
  glfwCreateStandardCursor: {
    args: [FFIType.i32],
    returns: FFIType.ptr,
  },
  // glfwDestroyCursor
  glfwDestroyCursor: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwSetCursor
  glfwSetCursor: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwSetKeyCallback
  glfwSetKeyCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetCharCallback
  glfwSetCharCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetCharModsCallback
  glfwSetCharModsCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetMouseButtonCallback
  glfwSetMouseButtonCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetCursorPosCallback
  glfwSetCursorPosCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetCursorEnterCallback
  glfwSetCursorEnterCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetScrollCallback
  glfwSetScrollCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwSetDropCallback
  glfwSetDropCallback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwJoystickPresent
  glfwJoystickPresent: {
    args: [FFIType.i32],
    returns: FFIType.i32,
  },
  // glfwGetJoystickAxes
  glfwGetJoystickAxes: {
    args: [FFIType.i32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwGetJoystickButtons
  glfwGetJoystickButtons: {
    args: [FFIType.i32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwGetJoystickHats
  glfwGetJoystickHats: {
    args: [FFIType.i32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwGetJoystickName
  glfwGetJoystickName: {
    args: [FFIType.i32],
    returns: FFIType.cstring,
  },
  // glfwGetJoystickGUID
  glfwGetJoystickGUID: {
    args: [FFIType.i32],
    returns: FFIType.cstring,
  },
  // glfwSetJoystickUserPointer
  glfwSetJoystickUserPointer: {
    args: [FFIType.i32, FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwGetJoystickUserPointer
  glfwGetJoystickUserPointer: {
    args: [FFIType.i32],
    returns: FFIType.ptr,
  },
  // glfwJoystickIsGamepad
  glfwJoystickIsGamepad: {
    args: [FFIType.i32],
    returns: FFIType.i32,
  },
  // glfwSetJoystickCallback
  glfwSetJoystickCallback: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // glfwUpdateGamepadMappings
  glfwUpdateGamepadMappings: {
    args: [FFIType.cstring],
    returns: FFIType.i32,
  },
  // glfwGetGamepadName
  glfwGetGamepadName: {
    args: [FFIType.i32],
    returns: FFIType.cstring,
  },
  // glfwGetGamepadState
  glfwGetGamepadState: {
    args: [FFIType.i32, FFIType.ptr],
    returns: FFIType.i32,
  },
  // glfwSetClipboardString
  glfwSetClipboardString: {
    args: [FFIType.ptr, FFIType.cstring],
    returns: FFIType.void,
  },
  // glfwGetClipboardString
  glfwGetClipboardString: {
    args: [FFIType.ptr],
    returns: FFIType.cstring,
  },
  // glfwGetTime
  glfwGetTime: {
    args: [],
    returns: FFIType.f64,
  },
  // glfwSetTime
  glfwSetTime: {
    args: [FFIType.f64],
    returns: FFIType.void,
  },
  // glfwGetTimerValue
  glfwGetTimerValue: {
    args: [],
    returns: FFIType.ptr,
  },
  // glfwGetTimerFrequency
  glfwGetTimerFrequency: {
    args: [],
    returns: FFIType.ptr,
  },
  // glfwMakeContextCurrent
  glfwMakeContextCurrent: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwGetCurrentContext
  glfwGetCurrentContext: {
    args: [],
    returns: FFIType.ptr,
  },
  // glfwSwapBuffers
  glfwSwapBuffers: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // glfwSwapInterval
  glfwSwapInterval: {
    args: [FFIType.i32],
    returns: FFIType.void,
  },
  // glfwExtensionSupported
  glfwExtensionSupported: {
    args: [FFIType.cstring],
    returns: FFIType.i32,
  },
  // glfwGetProcAddress
  glfwGetProcAddress: {
    args: [FFIType.cstring],
    returns: FFIType.ptr,
  },
  // glfwVulkanSupported
  glfwVulkanSupported: {
    args: [],
    returns: FFIType.i32,
  },
  // glfwGetRequiredInstanceExtensions
  glfwGetRequiredInstanceExtensions: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
} satisfies Record<string, FFIFunction>;
