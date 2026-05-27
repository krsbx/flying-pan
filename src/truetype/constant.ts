import { FFIType, type FFIFunction } from 'bun:ffi';

export const TrueTypeDefinition = {
  // stbtt_BakeFontBitmap
  stbtt_BakeFontBitmap: {
    args: [
      FFIType.ptr,
      FFIType.i32,
      FFIType.f32,
      FFIType.ptr,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.ptr,
    ],
    returns: FFIType.i32,
  },
  // stbtt_GetBakedQuad
  stbtt_GetBakedQuad: {
    args: [
      FFIType.ptr,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
    ],
    returns: FFIType.void,
  },
  // stbtt_GetScaledFontVMetrics
  stbtt_GetScaledFontVMetrics: {
    args: [
      FFIType.ptr,
      FFIType.i32,
      FFIType.f32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // stbtt_PackBegin
  stbtt_PackBegin: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.ptr,
    ],
    returns: FFIType.i32,
  },
  // stbtt_PackEnd
  stbtt_PackEnd: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // stbtt_PackFontRange
  stbtt_PackFontRange: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
      FFIType.f32,
      FFIType.i32,
      FFIType.i32,
      FFIType.ptr,
    ],
    returns: FFIType.i32,
  },
  // stbtt_PackFontRanges
  stbtt_PackFontRanges: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.i32, FFIType.ptr, FFIType.i32],
    returns: FFIType.i32,
  },
  // stbtt_PackSetOversampling
  stbtt_PackSetOversampling: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // stbtt_PackSetSkipMissingCodepoints
  stbtt_PackSetSkipMissingCodepoints: {
    args: [FFIType.ptr, FFIType.i32],
    returns: FFIType.void,
  },
  // stbtt_GetPackedQuad
  stbtt_GetPackedQuad: {
    args: [
      FFIType.ptr,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
    ],
    returns: FFIType.void,
  },
  // stbtt_PackFontRangesGatherRects
  stbtt_PackFontRangesGatherRects: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.i32, FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbtt_PackFontRangesPackRects
  stbtt_PackFontRangesPackRects: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.i32],
    returns: FFIType.void,
  },
  // stbtt_PackFontRangesRenderIntoRects
  stbtt_PackFontRangesRenderIntoRects: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.i32, FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbtt_GetNumberOfFonts
  stbtt_GetNumberOfFonts: {
    args: [FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbtt_GetFontOffsetForIndex
  stbtt_GetFontOffsetForIndex: {
    args: [FFIType.ptr, FFIType.i32],
    returns: FFIType.i32,
  },
  // stbtt_InitFont
  stbtt_InitFont: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.i32],
    returns: FFIType.i32,
  },
  // stbtt_FindGlyphIndex
  stbtt_FindGlyphIndex: {
    args: [FFIType.ptr, FFIType.i32],
    returns: FFIType.i32,
  },
  // stbtt_ScaleForPixelHeight
  stbtt_ScaleForPixelHeight: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.f32,
  },
  // stbtt_ScaleForMappingEmToPixels
  stbtt_ScaleForMappingEmToPixels: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.f32,
  },
  // stbtt_GetFontVMetrics
  stbtt_GetFontVMetrics: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // stbtt_GetFontVMetricsOS2
  stbtt_GetFontVMetricsOS2: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbtt_GetFontBoundingBox
  stbtt_GetFontBoundingBox: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // stbtt_GetCodepointHMetrics
  stbtt_GetCodepointHMetrics: {
    args: [FFIType.ptr, FFIType.i32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // stbtt_GetCodepointKernAdvance
  stbtt_GetCodepointKernAdvance: {
    args: [FFIType.ptr, FFIType.i32, FFIType.i32],
    returns: FFIType.i32,
  },
  // stbtt_GetCodepointBox
  stbtt_GetCodepointBox: {
    args: [
      FFIType.ptr,
      FFIType.i32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.i32,
  },
  // stbtt_GetGlyphHMetrics
  stbtt_GetGlyphHMetrics: {
    args: [FFIType.ptr, FFIType.i32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // stbtt_GetGlyphKernAdvance
  stbtt_GetGlyphKernAdvance: {
    args: [FFIType.ptr, FFIType.i32, FFIType.i32],
    returns: FFIType.i32,
  },
  // stbtt_GetGlyphBox
  stbtt_GetGlyphBox: {
    args: [
      FFIType.ptr,
      FFIType.i32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.i32,
  },
  // stbtt_GetKerningTableLength
  stbtt_GetKerningTableLength: {
    args: [FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbtt_GetKerningTable
  stbtt_GetKerningTable: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.i32],
    returns: FFIType.i32,
  },
  // stbtt_IsGlyphEmpty
  stbtt_IsGlyphEmpty: {
    args: [FFIType.ptr, FFIType.i32],
    returns: FFIType.i32,
  },
  // stbtt_GetCodepointShape
  stbtt_GetCodepointShape: {
    args: [FFIType.ptr, FFIType.i32, FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbtt_GetGlyphShape
  stbtt_GetGlyphShape: {
    args: [FFIType.ptr, FFIType.i32, FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbtt_FreeShape
  stbtt_FreeShape: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // stbtt_FindSVGDoc
  stbtt_FindSVGDoc: {
    args: [FFIType.ptr, FFIType.i32],
    returns: FFIType.ptr,
  },
  // stbtt_GetCodepointSVG
  stbtt_GetCodepointSVG: {
    args: [FFIType.ptr, FFIType.i32, FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbtt_GetGlyphSVG
  stbtt_GetGlyphSVG: {
    args: [FFIType.ptr, FFIType.i32, FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbtt_FreeBitmap
  stbtt_FreeBitmap: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // stbtt_GetCodepointBitmap
  stbtt_GetCodepointBitmap: {
    args: [
      FFIType.ptr,
      FFIType.f32,
      FFIType.f32,
      FFIType.i32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.ptr,
  },
  // stbtt_GetCodepointBitmapSubpixel
  stbtt_GetCodepointBitmapSubpixel: {
    args: [
      FFIType.ptr,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.i32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.ptr,
  },
  // stbtt_MakeCodepointBitmap
  stbtt_MakeCodepointBitmap: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.f32,
      FFIType.f32,
      FFIType.i32,
    ],
    returns: FFIType.void,
  },
  // stbtt_MakeCodepointBitmapSubpixel
  stbtt_MakeCodepointBitmapSubpixel: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.i32,
    ],
    returns: FFIType.void,
  },
  // stbtt_MakeCodepointBitmapSubpixelPrefilter
  stbtt_MakeCodepointBitmapSubpixelPrefilter: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.i32,
      FFIType.i32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
    ],
    returns: FFIType.void,
  },
  // stbtt_GetCodepointBitmapBox
  stbtt_GetCodepointBitmapBox: {
    args: [
      FFIType.ptr,
      FFIType.i32,
      FFIType.f32,
      FFIType.f32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // stbtt_GetCodepointBitmapBoxSubpixel
  stbtt_GetCodepointBitmapBoxSubpixel: {
    args: [
      FFIType.ptr,
      FFIType.i32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // stbtt_GetGlyphBitmap
  stbtt_GetGlyphBitmap: {
    args: [
      FFIType.ptr,
      FFIType.f32,
      FFIType.f32,
      FFIType.i32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.ptr,
  },
  // stbtt_GetGlyphBitmapSubpixel
  stbtt_GetGlyphBitmapSubpixel: {
    args: [
      FFIType.ptr,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.i32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.ptr,
  },
  // stbtt_MakeGlyphBitmap
  stbtt_MakeGlyphBitmap: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.f32,
      FFIType.f32,
      FFIType.i32,
    ],
    returns: FFIType.void,
  },
  // stbtt_MakeGlyphBitmapSubpixel
  stbtt_MakeGlyphBitmapSubpixel: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.i32,
    ],
    returns: FFIType.void,
  },
  // stbtt_MakeGlyphBitmapSubpixelPrefilter
  stbtt_MakeGlyphBitmapSubpixelPrefilter: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.i32,
      FFIType.i32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
    ],
    returns: FFIType.void,
  },
  // stbtt_GetGlyphBitmapBox
  stbtt_GetGlyphBitmapBox: {
    args: [
      FFIType.ptr,
      FFIType.i32,
      FFIType.f32,
      FFIType.f32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // stbtt_GetGlyphBitmapBoxSubpixel
  stbtt_GetGlyphBitmapBoxSubpixel: {
    args: [
      FFIType.ptr,
      FFIType.i32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // stbtt_Rasterize
  stbtt_Rasterize: {
    args: [
      FFIType.ptr,
      FFIType.f32,
      FFIType.ptr,
      FFIType.i32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // stbtt_FreeSDF
  stbtt_FreeSDF: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // stbtt_GetGlyphSDF
  stbtt_GetGlyphSDF: {
    args: [
      FFIType.ptr,
      FFIType.f32,
      FFIType.i32,
      FFIType.i32,
      FFIType.u8,
      FFIType.f32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.ptr,
  },
  // stbtt_GetCodepointSDF
  stbtt_GetCodepointSDF: {
    args: [
      FFIType.ptr,
      FFIType.f32,
      FFIType.i32,
      FFIType.i32,
      FFIType.u8,
      FFIType.f32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.ptr,
  },
  // stbtt_FindMatchingFont
  stbtt_FindMatchingFont: {
    args: [FFIType.ptr, FFIType.cstring, FFIType.i32],
    returns: FFIType.i32,
  },
  // stbtt_CompareUTF8toUTF16_bigendian
  stbtt_CompareUTF8toUTF16_bigendian: {
    args: [FFIType.cstring, FFIType.i32, FFIType.cstring, FFIType.i32],
    returns: FFIType.i32,
  },
  // stbtt_GetFontNameString
  stbtt_GetFontNameString: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
      FFIType.i32,
    ],
    returns: FFIType.cstring,
  },
} satisfies Record<string, FFIFunction>;
