import { stringToCString } from '@utility/common';
import type { CString, Pointer } from 'bun:ffi';
import type { TrueType } from './index';

export function stbtt_BakeFontBitmap(
  this: TrueType,
  options: {
    data: Pointer | NodeJS.TypedArray | null;
    offset: number;
    pixel_height: number;
    pixels: Pointer | NodeJS.TypedArray | null;
    pw: number;
    ph: number;
    first_char: number;
    num_chars: number;
    chardata: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbtt_BakeFontBitmap(
    options.data,
    options.offset,
    options.pixel_height,
    options.pixels,
    options.pw,
    options.ph,
    options.first_char,
    options.num_chars,
    options.chardata
  ) as number;
}

export function stbtt_GetBakedQuad(
  this: TrueType,
  options: {
    chardata: Pointer | NodeJS.TypedArray | null;
    pw: number;
    ph: number;
    char_index: number;
    xpos: Pointer | NodeJS.TypedArray | null;
    ypos: Pointer | NodeJS.TypedArray | null;
    q: Pointer | NodeJS.TypedArray | null;
    opengl_fillrule: number;
  }
): void {
  this.symbols.stbtt_GetBakedQuad(
    options.chardata,
    options.pw,
    options.ph,
    options.char_index,
    options.xpos,
    options.ypos,
    options.q,
    options.opengl_fillrule
  );
}

export function stbtt_GetScaledFontVMetrics(
  this: TrueType,
  options: {
    fontdata: Pointer | NodeJS.TypedArray | null;
    index: number;
    size: number;
    ascent: Pointer | NodeJS.TypedArray | null;
    descent: Pointer | NodeJS.TypedArray | null;
    lineGap: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.stbtt_GetScaledFontVMetrics(
    options.fontdata,
    options.index,
    options.size,
    options.ascent,
    options.descent,
    options.lineGap
  );
}

export function stbtt_PackBegin(
  this: TrueType,
  options: {
    spc: Pointer | NodeJS.TypedArray | null;
    pixels: Pointer | NodeJS.TypedArray | null;
    width: number;
    height: number;
    stride_in_bytes: number;
    padding: number;
    alloc_context: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbtt_PackBegin(
    options.spc,
    options.pixels,
    options.width,
    options.height,
    options.stride_in_bytes,
    options.padding,
    options.alloc_context
  ) as number;
}

export function stbtt_PackEnd(
  this: TrueType,
  options: {
    spc: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.stbtt_PackEnd(options.spc);
}

export function stbtt_PackFontRange(
  this: TrueType,
  options: {
    spc: Pointer | NodeJS.TypedArray | null;
    fontdata: Pointer | NodeJS.TypedArray | null;
    font_index: number;
    font_size: number;
    first_unicode_char_in_range: number;
    num_chars_in_range: number;
    chardata_for_range: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbtt_PackFontRange(
    options.spc,
    options.fontdata,
    options.font_index,
    options.font_size,
    options.first_unicode_char_in_range,
    options.num_chars_in_range,
    options.chardata_for_range
  ) as number;
}

export function stbtt_PackFontRanges(
  this: TrueType,
  options: {
    spc: Pointer | NodeJS.TypedArray | null;
    fontdata: Pointer | NodeJS.TypedArray | null;
    font_index: number;
    ranges: Pointer | NodeJS.TypedArray | null;
    num_ranges: number;
  }
): number {
  return this.symbols.stbtt_PackFontRanges(
    options.spc,
    options.fontdata,
    options.font_index,
    options.ranges,
    options.num_ranges
  ) as number;
}

export function stbtt_PackSetOversampling(
  this: TrueType,
  options: {
    spc: Pointer | NodeJS.TypedArray | null;
    h_oversample: number;
    v_oversample: number;
  }
): void {
  this.symbols.stbtt_PackSetOversampling(
    options.spc,
    options.h_oversample,
    options.v_oversample
  );
}

export function stbtt_PackSetSkipMissingCodepoints(
  this: TrueType,
  options: {
    spc: Pointer | NodeJS.TypedArray | null;
    skip: number;
  }
): void {
  this.symbols.stbtt_PackSetSkipMissingCodepoints(options.spc, options.skip);
}

export function stbtt_GetPackedQuad(
  this: TrueType,
  options: {
    chardata: Pointer | NodeJS.TypedArray | null;
    pw: number;
    ph: number;
    char_index: number;
    xpos: Pointer | NodeJS.TypedArray | null;
    ypos: Pointer | NodeJS.TypedArray | null;
    q: Pointer | NodeJS.TypedArray | null;
    align_to_integer: number;
  }
): void {
  this.symbols.stbtt_GetPackedQuad(
    options.chardata,
    options.pw,
    options.ph,
    options.char_index,
    options.xpos,
    options.ypos,
    options.q,
    options.align_to_integer
  );
}

export function stbtt_PackFontRangesGatherRects(
  this: TrueType,
  options: {
    spc: Pointer | NodeJS.TypedArray | null;
    info: Pointer | NodeJS.TypedArray | null;
    ranges: Pointer | NodeJS.TypedArray | null;
    num_ranges: number;
    rects: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbtt_PackFontRangesGatherRects(
    options.spc,
    options.info,
    options.ranges,
    options.num_ranges,
    options.rects
  ) as number;
}

export function stbtt_PackFontRangesPackRects(
  this: TrueType,
  options: {
    spc: Pointer | NodeJS.TypedArray | null;
    rects: Pointer | NodeJS.TypedArray | null;
    num_rects: number;
  }
): void {
  this.symbols.stbtt_PackFontRangesPackRects(
    options.spc,
    options.rects,
    options.num_rects
  );
}

export function stbtt_PackFontRangesRenderIntoRects(
  this: TrueType,
  options: {
    spc: Pointer | NodeJS.TypedArray | null;
    info: Pointer | NodeJS.TypedArray | null;
    ranges: Pointer | NodeJS.TypedArray | null;
    num_ranges: number;
    rects: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbtt_PackFontRangesRenderIntoRects(
    options.spc,
    options.info,
    options.ranges,
    options.num_ranges,
    options.rects
  ) as number;
}

export function stbtt_GetNumberOfFonts(
  this: TrueType,
  options: {
    data: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbtt_GetNumberOfFonts(options.data) as number;
}

export function stbtt_GetFontOffsetForIndex(
  this: TrueType,
  options: {
    data: Pointer | NodeJS.TypedArray | null;
    index: number;
  }
): number {
  return this.symbols.stbtt_GetFontOffsetForIndex(
    options.data,
    options.index
  ) as number;
}

export function stbtt_InitFont(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    data: Pointer | NodeJS.TypedArray | null;
    offset: number;
  }
): number {
  return this.symbols.stbtt_InitFont(
    options.info,
    options.data,
    options.offset
  ) as number;
}

export function stbtt_FindGlyphIndex(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    unicode_codepoint: number;
  }
): number {
  return this.symbols.stbtt_FindGlyphIndex(
    options.info,
    options.unicode_codepoint
  ) as number;
}

export function stbtt_ScaleForPixelHeight(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    pixels: number;
  }
): number {
  return this.symbols.stbtt_ScaleForPixelHeight(
    options.info,
    options.pixels
  ) as number;
}

export function stbtt_ScaleForMappingEmToPixels(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    pixels: number;
  }
): number {
  return this.symbols.stbtt_ScaleForMappingEmToPixels(
    options.info,
    options.pixels
  ) as number;
}

export function stbtt_GetFontVMetrics(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    ascent: Pointer | NodeJS.TypedArray | null;
    descent: Pointer | NodeJS.TypedArray | null;
    lineGap: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.stbtt_GetFontVMetrics(
    options.info,
    options.ascent,
    options.descent,
    options.lineGap
  );
}

export function stbtt_GetFontVMetricsOS2(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    typoAscent: Pointer | NodeJS.TypedArray | null;
    typoDescent: Pointer | NodeJS.TypedArray | null;
    typoLineGap: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbtt_GetFontVMetricsOS2(
    options.info,
    options.typoAscent,
    options.typoDescent,
    options.typoLineGap
  ) as number;
}

export function stbtt_GetFontBoundingBox(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    x0: Pointer | NodeJS.TypedArray | null;
    y0: Pointer | NodeJS.TypedArray | null;
    x1: Pointer | NodeJS.TypedArray | null;
    y1: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.stbtt_GetFontBoundingBox(
    options.info,
    options.x0,
    options.y0,
    options.x1,
    options.y1
  );
}

export function stbtt_GetCodepointHMetrics(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    codepoint: number;
    advanceWidth: Pointer | NodeJS.TypedArray | null;
    leftSideBearing: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.stbtt_GetCodepointHMetrics(
    options.info,
    options.codepoint,
    options.advanceWidth,
    options.leftSideBearing
  );
}

export function stbtt_GetCodepointKernAdvance(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    ch1: number;
    ch2: number;
  }
): number {
  return this.symbols.stbtt_GetCodepointKernAdvance(
    options.info,
    options.ch1,
    options.ch2
  ) as number;
}

export function stbtt_GetCodepointBox(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    codepoint: number;
    x0: Pointer | NodeJS.TypedArray | null;
    y0: Pointer | NodeJS.TypedArray | null;
    x1: Pointer | NodeJS.TypedArray | null;
    y1: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbtt_GetCodepointBox(
    options.info,
    options.codepoint,
    options.x0,
    options.y0,
    options.x1,
    options.y1
  ) as number;
}

export function stbtt_GetGlyphHMetrics(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    glyph_index: number;
    advanceWidth: Pointer | NodeJS.TypedArray | null;
    leftSideBearing: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.stbtt_GetGlyphHMetrics(
    options.info,
    options.glyph_index,
    options.advanceWidth,
    options.leftSideBearing
  );
}

export function stbtt_GetGlyphKernAdvance(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    glyph1: number;
    glyph2: number;
  }
): number {
  return this.symbols.stbtt_GetGlyphKernAdvance(
    options.info,
    options.glyph1,
    options.glyph2
  ) as number;
}

export function stbtt_GetGlyphBox(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    glyph_index: number;
    x0: Pointer | NodeJS.TypedArray | null;
    y0: Pointer | NodeJS.TypedArray | null;
    x1: Pointer | NodeJS.TypedArray | null;
    y1: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbtt_GetGlyphBox(
    options.info,
    options.glyph_index,
    options.x0,
    options.y0,
    options.x1,
    options.y1
  ) as number;
}

export function stbtt_GetKerningTableLength(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbtt_GetKerningTableLength(options.info) as number;
}

export function stbtt_GetKerningTable(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    table: Pointer | NodeJS.TypedArray | null;
    table_length: number;
  }
): number {
  return this.symbols.stbtt_GetKerningTable(
    options.info,
    options.table,
    options.table_length
  ) as number;
}

export function stbtt_IsGlyphEmpty(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    glyph_index: number;
  }
): number {
  return this.symbols.stbtt_IsGlyphEmpty(
    options.info,
    options.glyph_index
  ) as number;
}

export function stbtt_GetCodepointShape(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    unicode_codepoint: number;
    vertices: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbtt_GetCodepointShape(
    options.info,
    options.unicode_codepoint,
    options.vertices
  ) as number;
}

export function stbtt_GetGlyphShape(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    glyph_index: number;
    vertices: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbtt_GetGlyphShape(
    options.info,
    options.glyph_index,
    options.vertices
  ) as number;
}

export function stbtt_FreeShape(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    vertices: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.stbtt_FreeShape(options.info, options.vertices);
}

export function stbtt_FindSVGDoc(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    gl: number;
  }
): Pointer | null {
  return this.symbols.stbtt_FindSVGDoc(
    options.info,
    options.gl
  ) as Pointer | null;
}

export function stbtt_GetCodepointSVG(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    unicode_codepoint: number;
    svg: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbtt_GetCodepointSVG(
    options.info,
    options.unicode_codepoint,
    options.svg
  ) as number;
}

export function stbtt_GetGlyphSVG(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    gl: number;
    svg: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbtt_GetGlyphSVG(
    options.info,
    options.gl,
    options.svg
  ) as number;
}

export function stbtt_FreeBitmap(
  this: TrueType,
  options: {
    bitmap: Pointer | NodeJS.TypedArray | null;
    userdata: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.stbtt_FreeBitmap(options.bitmap, options.userdata);
}

export function stbtt_GetCodepointBitmap(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    scale_x: number;
    scale_y: number;
    codepoint: number;
    width: Pointer | NodeJS.TypedArray | null;
    height: Pointer | NodeJS.TypedArray | null;
    xoff: Pointer | NodeJS.TypedArray | null;
    yoff: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.stbtt_GetCodepointBitmap(
    options.info,
    options.scale_x,
    options.scale_y,
    options.codepoint,
    options.width,
    options.height,
    options.xoff,
    options.yoff
  ) as Pointer | null;
}

export function stbtt_GetCodepointBitmapSubpixel(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    scale_x: number;
    scale_y: number;
    shift_x: number;
    shift_y: number;
    codepoint: number;
    width: Pointer | NodeJS.TypedArray | null;
    height: Pointer | NodeJS.TypedArray | null;
    xoff: Pointer | NodeJS.TypedArray | null;
    yoff: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.stbtt_GetCodepointBitmapSubpixel(
    options.info,
    options.scale_x,
    options.scale_y,
    options.shift_x,
    options.shift_y,
    options.codepoint,
    options.width,
    options.height,
    options.xoff,
    options.yoff
  ) as Pointer | null;
}

export function stbtt_MakeCodepointBitmap(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    output: Pointer | NodeJS.TypedArray | null;
    out_w: number;
    out_h: number;
    out_stride: number;
    scale_x: number;
    scale_y: number;
    codepoint: number;
  }
): void {
  this.symbols.stbtt_MakeCodepointBitmap(
    options.info,
    options.output,
    options.out_w,
    options.out_h,
    options.out_stride,
    options.scale_x,
    options.scale_y,
    options.codepoint
  );
}

export function stbtt_MakeCodepointBitmapSubpixel(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    output: Pointer | NodeJS.TypedArray | null;
    out_w: number;
    out_h: number;
    out_stride: number;
    scale_x: number;
    scale_y: number;
    shift_x: number;
    shift_y: number;
    codepoint: number;
  }
): void {
  this.symbols.stbtt_MakeCodepointBitmapSubpixel(
    options.info,
    options.output,
    options.out_w,
    options.out_h,
    options.out_stride,
    options.scale_x,
    options.scale_y,
    options.shift_x,
    options.shift_y,
    options.codepoint
  );
}

export function stbtt_MakeCodepointBitmapSubpixelPrefilter(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    output: Pointer | NodeJS.TypedArray | null;
    out_w: number;
    out_h: number;
    out_stride: number;
    scale_x: number;
    scale_y: number;
    shift_x: number;
    shift_y: number;
    oversample_x: number;
    oversample_y: number;
    sub_x: Pointer | NodeJS.TypedArray | null;
    sub_y: Pointer | NodeJS.TypedArray | null;
    codepoint: number;
  }
): void {
  this.symbols.stbtt_MakeCodepointBitmapSubpixelPrefilter(
    options.info,
    options.output,
    options.out_w,
    options.out_h,
    options.out_stride,
    options.scale_x,
    options.scale_y,
    options.shift_x,
    options.shift_y,
    options.oversample_x,
    options.oversample_y,
    options.sub_x,
    options.sub_y,
    options.codepoint
  );
}

export function stbtt_GetCodepointBitmapBox(
  this: TrueType,
  options: {
    font: Pointer | NodeJS.TypedArray | null;
    codepoint: number;
    scale_x: number;
    scale_y: number;
    ix0: Pointer | NodeJS.TypedArray | null;
    iy0: Pointer | NodeJS.TypedArray | null;
    ix1: Pointer | NodeJS.TypedArray | null;
    iy1: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.stbtt_GetCodepointBitmapBox(
    options.font,
    options.codepoint,
    options.scale_x,
    options.scale_y,
    options.ix0,
    options.iy0,
    options.ix1,
    options.iy1
  );
}

export function stbtt_GetCodepointBitmapBoxSubpixel(
  this: TrueType,
  options: {
    font: Pointer | NodeJS.TypedArray | null;
    codepoint: number;
    scale_x: number;
    scale_y: number;
    shift_x: number;
    shift_y: number;
    ix0: Pointer | NodeJS.TypedArray | null;
    iy0: Pointer | NodeJS.TypedArray | null;
    ix1: Pointer | NodeJS.TypedArray | null;
    iy1: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.stbtt_GetCodepointBitmapBoxSubpixel(
    options.font,
    options.codepoint,
    options.scale_x,
    options.scale_y,
    options.shift_x,
    options.shift_y,
    options.ix0,
    options.iy0,
    options.ix1,
    options.iy1
  );
}

export function stbtt_GetGlyphBitmap(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    scale_x: number;
    scale_y: number;
    glyph: number;
    width: Pointer | NodeJS.TypedArray | null;
    height: Pointer | NodeJS.TypedArray | null;
    xoff: Pointer | NodeJS.TypedArray | null;
    yoff: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.stbtt_GetGlyphBitmap(
    options.info,
    options.scale_x,
    options.scale_y,
    options.glyph,
    options.width,
    options.height,
    options.xoff,
    options.yoff
  ) as Pointer | null;
}

export function stbtt_GetGlyphBitmapSubpixel(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    scale_x: number;
    scale_y: number;
    shift_x: number;
    shift_y: number;
    glyph: number;
    width: Pointer | NodeJS.TypedArray | null;
    height: Pointer | NodeJS.TypedArray | null;
    xoff: Pointer | NodeJS.TypedArray | null;
    yoff: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.stbtt_GetGlyphBitmapSubpixel(
    options.info,
    options.scale_x,
    options.scale_y,
    options.shift_x,
    options.shift_y,
    options.glyph,
    options.width,
    options.height,
    options.xoff,
    options.yoff
  ) as Pointer | null;
}

export function stbtt_MakeGlyphBitmap(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    output: Pointer | NodeJS.TypedArray | null;
    out_w: number;
    out_h: number;
    out_stride: number;
    scale_x: number;
    scale_y: number;
    glyph: number;
  }
): void {
  this.symbols.stbtt_MakeGlyphBitmap(
    options.info,
    options.output,
    options.out_w,
    options.out_h,
    options.out_stride,
    options.scale_x,
    options.scale_y,
    options.glyph
  );
}

export function stbtt_MakeGlyphBitmapSubpixel(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    output: Pointer | NodeJS.TypedArray | null;
    out_w: number;
    out_h: number;
    out_stride: number;
    scale_x: number;
    scale_y: number;
    shift_x: number;
    shift_y: number;
    glyph: number;
  }
): void {
  this.symbols.stbtt_MakeGlyphBitmapSubpixel(
    options.info,
    options.output,
    options.out_w,
    options.out_h,
    options.out_stride,
    options.scale_x,
    options.scale_y,
    options.shift_x,
    options.shift_y,
    options.glyph
  );
}

export function stbtt_MakeGlyphBitmapSubpixelPrefilter(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    output: Pointer | NodeJS.TypedArray | null;
    out_w: number;
    out_h: number;
    out_stride: number;
    scale_x: number;
    scale_y: number;
    shift_x: number;
    shift_y: number;
    oversample_x: number;
    oversample_y: number;
    sub_x: Pointer | NodeJS.TypedArray | null;
    sub_y: Pointer | NodeJS.TypedArray | null;
    glyph: number;
  }
): void {
  this.symbols.stbtt_MakeGlyphBitmapSubpixelPrefilter(
    options.info,
    options.output,
    options.out_w,
    options.out_h,
    options.out_stride,
    options.scale_x,
    options.scale_y,
    options.shift_x,
    options.shift_y,
    options.oversample_x,
    options.oversample_y,
    options.sub_x,
    options.sub_y,
    options.glyph
  );
}

export function stbtt_GetGlyphBitmapBox(
  this: TrueType,
  options: {
    font: Pointer | NodeJS.TypedArray | null;
    glyph: number;
    scale_x: number;
    scale_y: number;
    ix0: Pointer | NodeJS.TypedArray | null;
    iy0: Pointer | NodeJS.TypedArray | null;
    ix1: Pointer | NodeJS.TypedArray | null;
    iy1: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.stbtt_GetGlyphBitmapBox(
    options.font,
    options.glyph,
    options.scale_x,
    options.scale_y,
    options.ix0,
    options.iy0,
    options.ix1,
    options.iy1
  );
}

export function stbtt_GetGlyphBitmapBoxSubpixel(
  this: TrueType,
  options: {
    font: Pointer | NodeJS.TypedArray | null;
    glyph: number;
    scale_x: number;
    scale_y: number;
    shift_x: number;
    shift_y: number;
    ix0: Pointer | NodeJS.TypedArray | null;
    iy0: Pointer | NodeJS.TypedArray | null;
    ix1: Pointer | NodeJS.TypedArray | null;
    iy1: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.stbtt_GetGlyphBitmapBoxSubpixel(
    options.font,
    options.glyph,
    options.scale_x,
    options.scale_y,
    options.shift_x,
    options.shift_y,
    options.ix0,
    options.iy0,
    options.ix1,
    options.iy1
  );
}

export function stbtt_Rasterize(
  this: TrueType,
  options: {
    result: Pointer | NodeJS.TypedArray | null;
    flatness_in_pixels: number;
    vertices: Pointer | NodeJS.TypedArray | null;
    num_verts: number;
    scale_x: number;
    scale_y: number;
    shift_x: number;
    shift_y: number;
    x_off: number;
    y_off: number;
    invert: number;
    userdata: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.stbtt_Rasterize(
    options.result,
    options.flatness_in_pixels,
    options.vertices,
    options.num_verts,
    options.scale_x,
    options.scale_y,
    options.shift_x,
    options.shift_y,
    options.x_off,
    options.y_off,
    options.invert,
    options.userdata
  );
}

export function stbtt_FreeSDF(
  this: TrueType,
  options: {
    bitmap: Pointer | NodeJS.TypedArray | null;
    userdata: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.stbtt_FreeSDF(options.bitmap, options.userdata);
}

export function stbtt_GetGlyphSDF(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    scale: number;
    glyph: number;
    padding: number;
    onedge_value: number;
    pixel_dist_scale: number;
    width: Pointer | NodeJS.TypedArray | null;
    height: Pointer | NodeJS.TypedArray | null;
    xoff: Pointer | NodeJS.TypedArray | null;
    yoff: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.stbtt_GetGlyphSDF(
    options.info,
    options.scale,
    options.glyph,
    options.padding,
    options.onedge_value,
    options.pixel_dist_scale,
    options.width,
    options.height,
    options.xoff,
    options.yoff
  ) as Pointer | null;
}

export function stbtt_GetCodepointSDF(
  this: TrueType,
  options: {
    info: Pointer | NodeJS.TypedArray | null;
    scale: number;
    codepoint: number;
    padding: number;
    onedge_value: number;
    pixel_dist_scale: number;
    width: Pointer | NodeJS.TypedArray | null;
    height: Pointer | NodeJS.TypedArray | null;
    xoff: Pointer | NodeJS.TypedArray | null;
    yoff: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.stbtt_GetCodepointSDF(
    options.info,
    options.scale,
    options.codepoint,
    options.padding,
    options.onedge_value,
    options.pixel_dist_scale,
    options.width,
    options.height,
    options.xoff,
    options.yoff
  ) as Pointer | null;
}

export function stbtt_FindMatchingFont(
  this: TrueType,
  options: {
    fontdata: Pointer | NodeJS.TypedArray | null;
    name: string;
    flags: number;
  }
): number {
  return this.symbols.stbtt_FindMatchingFont(
    options.fontdata,
    stringToCString(options.name).ptr,
    options.flags
  ) as number;
}

export function stbtt_CompareUTF8toUTF16_bigendian(
  this: TrueType,
  options: {
    s1: string;
    len1: number;
    s2: string;
    len2: number;
  }
): number {
  return this.symbols.stbtt_CompareUTF8toUTF16_bigendian(
    stringToCString(options.s1).ptr,
    options.len1,
    stringToCString(options.s2).ptr,
    options.len2
  ) as number;
}

export function stbtt_GetFontNameString(
  this: TrueType,
  options: {
    font: Pointer | NodeJS.TypedArray | null;
    length: Pointer | NodeJS.TypedArray | null;
    platformID: number;
    encodingID: number;
    languageID: number;
    nameID: number;
  }
): CString {
  return this.symbols.stbtt_GetFontNameString(
    options.font,
    options.length,
    options.platformID,
    options.encodingID,
    options.languageID,
    options.nameID
  ) as CString;
}
