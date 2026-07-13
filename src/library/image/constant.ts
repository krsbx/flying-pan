import { FFIType, type FFIFunction } from 'bun:ffi';

export const StbImageDefinition = {
  // stbi_load_from_memory
  stbi_load_from_memory: {
    args: [
      FFIType.ptr,
      FFIType.i32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
    ],
    returns: FFIType.ptr,
  },
  // stbi_load_from_callbacks
  stbi_load_from_callbacks: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
    ],
    returns: FFIType.ptr,
  },
  // stbi_load
  stbi_load: {
    args: [FFIType.cstring, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.i32],
    returns: FFIType.ptr,
  },
  // stbi_load_from_file
  stbi_load_from_file: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.i32],
    returns: FFIType.ptr,
  },
  // stbi_load_gif_from_memory
  stbi_load_gif_from_memory: {
    args: [
      FFIType.ptr,
      FFIType.i32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
    ],
    returns: FFIType.ptr,
  },
  // stbi_load_16_from_memory
  stbi_load_16_from_memory: {
    args: [
      FFIType.ptr,
      FFIType.i32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
    ],
    returns: FFIType.ptr,
  },
  // stbi_load_16_from_callbacks
  stbi_load_16_from_callbacks: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
    ],
    returns: FFIType.ptr,
  },
  // stbi_load_16
  stbi_load_16: {
    args: [FFIType.cstring, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.i32],
    returns: FFIType.ptr,
  },
  // stbi_load_from_file_16
  stbi_load_from_file_16: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.i32],
    returns: FFIType.ptr,
  },
  // stbi_loadf_from_memory
  stbi_loadf_from_memory: {
    args: [
      FFIType.ptr,
      FFIType.i32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
    ],
    returns: FFIType.ptr,
  },
  // stbi_loadf_from_callbacks
  stbi_loadf_from_callbacks: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.i32,
    ],
    returns: FFIType.ptr,
  },
  // stbi_loadf
  stbi_loadf: {
    args: [FFIType.cstring, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.i32],
    returns: FFIType.ptr,
  },
  // stbi_loadf_from_file
  stbi_loadf_from_file: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.i32],
    returns: FFIType.ptr,
  },
  // stbi_hdr_to_ldr_gamma
  stbi_hdr_to_ldr_gamma: {
    args: [FFIType.f32],
    returns: FFIType.void,
  },
  // stbi_hdr_to_ldr_scale
  stbi_hdr_to_ldr_scale: {
    args: [FFIType.f32],
    returns: FFIType.void,
  },
  // stbi_ldr_to_hdr_gamma
  stbi_ldr_to_hdr_gamma: {
    args: [FFIType.f32],
    returns: FFIType.void,
  },
  // stbi_ldr_to_hdr_scale
  stbi_ldr_to_hdr_scale: {
    args: [FFIType.f32],
    returns: FFIType.void,
  },
  // stbi_is_hdr_from_callbacks
  stbi_is_hdr_from_callbacks: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbi_is_hdr_from_memory
  stbi_is_hdr_from_memory: {
    args: [FFIType.ptr, FFIType.i32],
    returns: FFIType.i32,
  },
  // stbi_is_hdr
  stbi_is_hdr: {
    args: [FFIType.cstring],
    returns: FFIType.i32,
  },
  // stbi_is_hdr_from_file
  stbi_is_hdr_from_file: {
    args: [FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbi_failure_reason
  stbi_failure_reason: {
    args: [],
    returns: FFIType.cstring,
  },
  // stbi_image_free
  stbi_image_free: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // stbi_info_from_memory
  stbi_info_from_memory: {
    args: [FFIType.ptr, FFIType.i32, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbi_info_from_callbacks
  stbi_info_from_callbacks: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbi_is_16_bit_from_memory
  stbi_is_16_bit_from_memory: {
    args: [FFIType.ptr, FFIType.i32],
    returns: FFIType.i32,
  },
  // stbi_is_16_bit_from_callbacks
  stbi_is_16_bit_from_callbacks: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbi_info
  stbi_info: {
    args: [FFIType.cstring, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbi_info_from_file
  stbi_info_from_file: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbi_is_16_bit
  stbi_is_16_bit: {
    args: [FFIType.cstring],
    returns: FFIType.i32,
  },
  // stbi_is_16_bit_from_file
  stbi_is_16_bit_from_file: {
    args: [FFIType.ptr],
    returns: FFIType.i32,
  },
  // stbi_set_unpremultiply_on_load
  stbi_set_unpremultiply_on_load: {
    args: [FFIType.i32],
    returns: FFIType.void,
  },
  // stbi_convert_iphone_png_to_rgb
  stbi_convert_iphone_png_to_rgb: {
    args: [FFIType.i32],
    returns: FFIType.void,
  },
  // stbi_set_flip_vertically_on_load
  stbi_set_flip_vertically_on_load: {
    args: [FFIType.i32],
    returns: FFIType.void,
  },
  // stbi_set_unpremultiply_on_load_thread
  stbi_set_unpremultiply_on_load_thread: {
    args: [FFIType.i32],
    returns: FFIType.void,
  },
  // stbi_convert_iphone_png_to_rgb_thread
  stbi_convert_iphone_png_to_rgb_thread: {
    args: [FFIType.i32],
    returns: FFIType.void,
  },
  // stbi_set_flip_vertically_on_load_thread
  stbi_set_flip_vertically_on_load_thread: {
    args: [FFIType.i32],
    returns: FFIType.void,
  },
  // stbi_zlib_decode_malloc_guesssize
  stbi_zlib_decode_malloc_guesssize: {
    args: [FFIType.cstring, FFIType.i32, FFIType.i32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // stbi_zlib_decode_malloc_guesssize_headerflag
  stbi_zlib_decode_malloc_guesssize_headerflag: {
    args: [FFIType.cstring, FFIType.i32, FFIType.i32, FFIType.ptr, FFIType.i32],
    returns: FFIType.ptr,
  },
  // stbi_zlib_decode_malloc
  stbi_zlib_decode_malloc: {
    args: [FFIType.cstring, FFIType.i32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // stbi_zlib_decode_buffer
  stbi_zlib_decode_buffer: {
    args: [FFIType.ptr, FFIType.i32, FFIType.cstring, FFIType.i32],
    returns: FFIType.i32,
  },
  // stbi_zlib_decode_noheader_malloc
  stbi_zlib_decode_noheader_malloc: {
    args: [FFIType.cstring, FFIType.i32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // stbi_zlib_decode_noheader_buffer
  stbi_zlib_decode_noheader_buffer: {
    args: [FFIType.ptr, FFIType.i32, FFIType.cstring, FFIType.i32],
    returns: FFIType.i32,
  },
} satisfies Record<string, FFIFunction>;
