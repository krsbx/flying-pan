import { stringToCString } from '@utility/common';
import type { CString, Pointer } from 'bun:ffi';
import type { Image } from './index';

export function stbi_load_from_memory(
  this: Image,
  options: {
    buffer: Pointer | NodeJS.TypedArray | null;
    len: number;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    channels_in_file: Pointer | NodeJS.TypedArray | null;
    desired_channels: number;
  }
): Pointer | null {
  return this.symbols.stbi_load_from_memory(
    options.buffer,
    options.len,
    options.x,
    options.y,
    options.channels_in_file,
    options.desired_channels
  ) as Pointer | null;
}

export function stbi_load_from_callbacks(
  this: Image,
  options: {
    clbk: Pointer | NodeJS.TypedArray | null;
    user: Pointer | NodeJS.TypedArray | null;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    channels_in_file: Pointer | NodeJS.TypedArray | null;
    desired_channels: number;
  }
): Pointer | null {
  return this.symbols.stbi_load_from_callbacks(
    options.clbk,
    options.user,
    options.x,
    options.y,
    options.channels_in_file,
    options.desired_channels
  ) as Pointer | null;
}

export function stbi_load(
  this: Image,
  options: {
    filename: string;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    channels_in_file: Pointer | NodeJS.TypedArray | null;
    desired_channels: number;
  }
): Pointer | null {
  return this.symbols.stbi_load(
    stringToCString(options.filename).ptr,
    options.x,
    options.y,
    options.channels_in_file,
    options.desired_channels
  ) as Pointer | null;
}

export function stbi_load_from_file(
  this: Image,
  options: {
    f: Pointer | NodeJS.TypedArray | null;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    channels_in_file: Pointer | NodeJS.TypedArray | null;
    desired_channels: number;
  }
): Pointer | null {
  return this.symbols.stbi_load_from_file(
    options.f,
    options.x,
    options.y,
    options.channels_in_file,
    options.desired_channels
  ) as Pointer | null;
}

export function stbi_load_gif_from_memory(
  this: Image,
  options: {
    buffer: Pointer | NodeJS.TypedArray | null;
    len: number;
    delays: Pointer | NodeJS.TypedArray | null;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    z: Pointer | NodeJS.TypedArray | null;
    comp: Pointer | NodeJS.TypedArray | null;
    req_comp: number;
  }
): Pointer | null {
  return this.symbols.stbi_load_gif_from_memory(
    options.buffer,
    options.len,
    options.delays,
    options.x,
    options.y,
    options.z,
    options.comp,
    options.req_comp
  ) as Pointer | null;
}

export function stbi_load_16_from_memory(
  this: Image,
  options: {
    buffer: Pointer | NodeJS.TypedArray | null;
    len: number;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    channels_in_file: Pointer | NodeJS.TypedArray | null;
    desired_channels: number;
  }
): Pointer | null {
  return this.symbols.stbi_load_16_from_memory(
    options.buffer,
    options.len,
    options.x,
    options.y,
    options.channels_in_file,
    options.desired_channels
  ) as Pointer | null;
}

export function stbi_load_16_from_callbacks(
  this: Image,
  options: {
    clbk: Pointer | NodeJS.TypedArray | null;
    user: Pointer | NodeJS.TypedArray | null;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    channels_in_file: Pointer | NodeJS.TypedArray | null;
    desired_channels: number;
  }
): Pointer | null {
  return this.symbols.stbi_load_16_from_callbacks(
    options.clbk,
    options.user,
    options.x,
    options.y,
    options.channels_in_file,
    options.desired_channels
  ) as Pointer | null;
}

export function stbi_load_16(
  this: Image,
  options: {
    filename: string;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    channels_in_file: Pointer | NodeJS.TypedArray | null;
    desired_channels: number;
  }
): Pointer | null {
  return this.symbols.stbi_load_16(
    stringToCString(options.filename).ptr,
    options.x,
    options.y,
    options.channels_in_file,
    options.desired_channels
  ) as Pointer | null;
}

export function stbi_load_from_file_16(
  this: Image,
  options: {
    f: Pointer | NodeJS.TypedArray | null;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    channels_in_file: Pointer | NodeJS.TypedArray | null;
    desired_channels: number;
  }
): Pointer | null {
  return this.symbols.stbi_load_from_file_16(
    options.f,
    options.x,
    options.y,
    options.channels_in_file,
    options.desired_channels
  ) as Pointer | null;
}

export function stbi_loadf_from_memory(
  this: Image,
  options: {
    buffer: Pointer | NodeJS.TypedArray | null;
    len: number;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    channels_in_file: Pointer | NodeJS.TypedArray | null;
    desired_channels: number;
  }
): Pointer | null {
  return this.symbols.stbi_loadf_from_memory(
    options.buffer,
    options.len,
    options.x,
    options.y,
    options.channels_in_file,
    options.desired_channels
  ) as Pointer | null;
}

export function stbi_loadf_from_callbacks(
  this: Image,
  options: {
    clbk: Pointer | NodeJS.TypedArray | null;
    user: Pointer | NodeJS.TypedArray | null;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    channels_in_file: Pointer | NodeJS.TypedArray | null;
    desired_channels: number;
  }
): Pointer | null {
  return this.symbols.stbi_loadf_from_callbacks(
    options.clbk,
    options.user,
    options.x,
    options.y,
    options.channels_in_file,
    options.desired_channels
  ) as Pointer | null;
}

export function stbi_loadf(
  this: Image,
  options: {
    filename: string;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    channels_in_file: Pointer | NodeJS.TypedArray | null;
    desired_channels: number;
  }
): Pointer | null {
  return this.symbols.stbi_loadf(
    stringToCString(options.filename).ptr,
    options.x,
    options.y,
    options.channels_in_file,
    options.desired_channels
  ) as Pointer | null;
}

export function stbi_loadf_from_file(
  this: Image,
  options: {
    f: Pointer | NodeJS.TypedArray | null;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    channels_in_file: Pointer | NodeJS.TypedArray | null;
    desired_channels: number;
  }
): Pointer | null {
  return this.symbols.stbi_loadf_from_file(
    options.f,
    options.x,
    options.y,
    options.channels_in_file,
    options.desired_channels
  ) as Pointer | null;
}

export function stbi_hdr_to_ldr_gamma(
  this: Image,
  options: {
    gamma: number;
  }
): void {
  this.symbols.stbi_hdr_to_ldr_gamma(options.gamma);
}

export function stbi_hdr_to_ldr_scale(
  this: Image,
  options: {
    scale: number;
  }
): void {
  this.symbols.stbi_hdr_to_ldr_scale(options.scale);
}

export function stbi_ldr_to_hdr_gamma(
  this: Image,
  options: {
    gamma: number;
  }
): void {
  this.symbols.stbi_ldr_to_hdr_gamma(options.gamma);
}

export function stbi_ldr_to_hdr_scale(
  this: Image,
  options: {
    scale: number;
  }
): void {
  this.symbols.stbi_ldr_to_hdr_scale(options.scale);
}

export function stbi_is_hdr_from_callbacks(
  this: Image,
  options: {
    clbk: Pointer | NodeJS.TypedArray | null;
    user: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbi_is_hdr_from_callbacks(
    options.clbk,
    options.user
  ) as number;
}

export function stbi_is_hdr_from_memory(
  this: Image,
  options: {
    buffer: Pointer | NodeJS.TypedArray | null;
    len: number;
  }
): number {
  return this.symbols.stbi_is_hdr_from_memory(
    options.buffer,
    options.len
  ) as number;
}

export function stbi_is_hdr(
  this: Image,
  options: {
    filename: string;
  }
): number {
  return this.symbols.stbi_is_hdr(
    stringToCString(options.filename).ptr
  ) as number;
}

export function stbi_is_hdr_from_file(
  this: Image,
  options: {
    f: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbi_is_hdr_from_file(options.f) as number;
}

export function stbi_failure_reason(this: Image): CString {
  return this.symbols.stbi_failure_reason() as CString;
}

export function stbi_image_free(
  this: Image,
  options: {
    retval_from_stbi_load: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.stbi_image_free(options.retval_from_stbi_load);
}

export function stbi_info_from_memory(
  this: Image,
  options: {
    buffer: Pointer | NodeJS.TypedArray | null;
    len: number;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    comp: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbi_info_from_memory(
    options.buffer,
    options.len,
    options.x,
    options.y,
    options.comp
  ) as number;
}

export function stbi_info_from_callbacks(
  this: Image,
  options: {
    clbk: Pointer | NodeJS.TypedArray | null;
    user: Pointer | NodeJS.TypedArray | null;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    comp: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbi_info_from_callbacks(
    options.clbk,
    options.user,
    options.x,
    options.y,
    options.comp
  ) as number;
}

export function stbi_is_16_bit_from_memory(
  this: Image,
  options: {
    buffer: Pointer | NodeJS.TypedArray | null;
    len: number;
  }
): number {
  return this.symbols.stbi_is_16_bit_from_memory(
    options.buffer,
    options.len
  ) as number;
}

export function stbi_is_16_bit_from_callbacks(
  this: Image,
  options: {
    clbk: Pointer | NodeJS.TypedArray | null;
    user: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbi_is_16_bit_from_callbacks(
    options.clbk,
    options.user
  ) as number;
}

export function stbi_info(
  this: Image,
  options: {
    filename: string;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    comp: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbi_info(
    stringToCString(options.filename).ptr,
    options.x,
    options.y,
    options.comp
  ) as number;
}

export function stbi_info_from_file(
  this: Image,
  options: {
    f: Pointer | NodeJS.TypedArray | null;
    x: Pointer | NodeJS.TypedArray | null;
    y: Pointer | NodeJS.TypedArray | null;
    comp: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbi_info_from_file(
    options.f,
    options.x,
    options.y,
    options.comp
  ) as number;
}

export function stbi_is_16_bit(
  this: Image,
  options: {
    filename: string;
  }
): number {
  return this.symbols.stbi_is_16_bit(
    stringToCString(options.filename).ptr
  ) as number;
}

export function stbi_is_16_bit_from_file(
  this: Image,
  options: {
    f: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.stbi_is_16_bit_from_file(options.f) as number;
}

export function stbi_set_unpremultiply_on_load(
  this: Image,
  options: {
    flag_true_if_should_unpremultiply: number;
  }
): void {
  this.symbols.stbi_set_unpremultiply_on_load(
    options.flag_true_if_should_unpremultiply
  );
}

export function stbi_convert_iphone_png_to_rgb(
  this: Image,
  options: {
    flag_true_if_should_convert: number;
  }
): void {
  this.symbols.stbi_convert_iphone_png_to_rgb(
    options.flag_true_if_should_convert
  );
}

export function stbi_set_flip_vertically_on_load(
  this: Image,
  options: {
    flag_true_if_should_flip: number;
  }
): void {
  this.symbols.stbi_set_flip_vertically_on_load(
    options.flag_true_if_should_flip
  );
}

export function stbi_set_unpremultiply_on_load_thread(
  this: Image,
  options: {
    flag_true_if_should_unpremultiply: number;
  }
): void {
  this.symbols.stbi_set_unpremultiply_on_load_thread(
    options.flag_true_if_should_unpremultiply
  );
}

export function stbi_convert_iphone_png_to_rgb_thread(
  this: Image,
  options: {
    flag_true_if_should_convert: number;
  }
): void {
  this.symbols.stbi_convert_iphone_png_to_rgb_thread(
    options.flag_true_if_should_convert
  );
}

export function stbi_set_flip_vertically_on_load_thread(
  this: Image,
  options: {
    flag_true_if_should_flip: number;
  }
): void {
  this.symbols.stbi_set_flip_vertically_on_load_thread(
    options.flag_true_if_should_flip
  );
}

export function stbi_zlib_decode_malloc_guesssize(
  this: Image,
  options: {
    buffer: string;
    len: number;
    initial_size: number;
    outlen: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.stbi_zlib_decode_malloc_guesssize(
    stringToCString(options.buffer).ptr,
    options.len,
    options.initial_size,
    options.outlen
  ) as Pointer | null;
}

export function stbi_zlib_decode_malloc_guesssize_headerflag(
  this: Image,
  options: {
    buffer: string;
    len: number;
    initial_size: number;
    outlen: Pointer | NodeJS.TypedArray | null;
    parse_header: number;
  }
): Pointer | null {
  return this.symbols.stbi_zlib_decode_malloc_guesssize_headerflag(
    stringToCString(options.buffer).ptr,
    options.len,
    options.initial_size,
    options.outlen,
    options.parse_header
  ) as Pointer | null;
}

export function stbi_zlib_decode_malloc(
  this: Image,
  options: {
    buffer: string;
    len: number;
    outlen: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.stbi_zlib_decode_malloc(
    stringToCString(options.buffer).ptr,
    options.len,
    options.outlen
  ) as Pointer | null;
}

export function stbi_zlib_decode_buffer(
  this: Image,
  options: {
    obuffer: Pointer | NodeJS.TypedArray | null;
    olen: number;
    ibuffer: string;
    ilen: number;
  }
): number {
  return this.symbols.stbi_zlib_decode_buffer(
    options.obuffer,
    options.olen,
    stringToCString(options.ibuffer).ptr,
    options.ilen
  ) as number;
}

export function stbi_zlib_decode_noheader_malloc(
  this: Image,
  options: {
    buffer: string;
    len: number;
    outlen: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.stbi_zlib_decode_noheader_malloc(
    stringToCString(options.buffer).ptr,
    options.len,
    options.outlen
  ) as Pointer | null;
}

export function stbi_zlib_decode_noheader_buffer(
  this: Image,
  options: {
    obuffer: Pointer | NodeJS.TypedArray | null;
    olen: number;
    ibuffer: string;
    ilen: number;
  }
): number {
  return this.symbols.stbi_zlib_decode_noheader_buffer(
    options.obuffer,
    options.olen,
    stringToCString(options.ibuffer).ptr,
    options.ilen
  ) as number;
}
