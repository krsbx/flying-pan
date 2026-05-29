import type { TypedJSCallback } from '@utility/callback';
import { stringToCString } from '@utility/common';
import type { CString, Pointer } from 'bun:ffi';
import type { MiniAudio } from './index';
import type {
  ma_data_source_get_next_proc,
  ma_decoder_read_proc,
  ma_decoder_seek_proc,
  ma_encoder_seek_proc,
  ma_encoder_write_proc,
  ma_enum_devices_callback_proc,
  ma_log_callback_proc,
  ma_sound_end_proc,
} from './types';

export function ma_version(
  this: MiniAudio,
  options: {
    pMajor: Pointer | NodeJS.TypedArray | null;
    pMinor: Pointer | NodeJS.TypedArray | null;
    pRevision: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_version(options.pMajor, options.pMinor, options.pRevision);
}

export function ma_version_string(this: MiniAudio): CString {
  return this.symbols.ma_version_string() as CString;
}

export function ma_log_callback_init(
  this: MiniAudio,
  options: {
    onLog: TypedJSCallback<ma_log_callback_proc>;
    pUserData: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_log_callback_init(
    options.onLog,
    options.pUserData
  ) as Pointer | null;
}

export function ma_log_init(
  this: MiniAudio,
  options: {
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pLog: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_log_init(
    options.pAllocationCallbacks,
    options.pLog
  ) as Pointer | null;
}

export function ma_log_uninit(
  this: MiniAudio,
  options: {
    pLog: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_log_uninit(options.pLog);
}

export function ma_log_register_callback(
  this: MiniAudio,
  options: {
    pLog: Pointer | NodeJS.TypedArray | null;
    callback: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_log_register_callback(
    options.pLog,
    options.callback
  ) as Pointer | null;
}

export function ma_log_unregister_callback(
  this: MiniAudio,
  options: {
    pLog: Pointer | NodeJS.TypedArray | null;
    callback: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_log_unregister_callback(
    options.pLog,
    options.callback
  ) as Pointer | null;
}

export function ma_log_post(
  this: MiniAudio,
  options: {
    pLog: Pointer | NodeJS.TypedArray | null;
    level: number;
    pMessage: string;
  }
): Pointer | null {
  return this.symbols.ma_log_post(
    options.pLog,
    options.level,
    stringToCString(options.pMessage).ptr
  ) as Pointer | null;
}

export function ma_log_postv(
  this: MiniAudio,
  options: {
    pLog: Pointer | NodeJS.TypedArray | null;
    level: number;
    pFormat: string;
    args: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_log_postv(
    options.pLog,
    options.level,
    stringToCString(options.pFormat).ptr,
    options.args
  ) as Pointer | null;
}

export function ma_log_postf(
  this: MiniAudio,
  options: {
    pLog: Pointer | NodeJS.TypedArray | null;
    level: number;
    pFormat: string;
  }
): Pointer | null {
  return this.symbols.ma_log_postf(
    options.pLog,
    options.level,
    stringToCString(options.pFormat).ptr
  ) as Pointer | null;
}

export function ma_biquad_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    b0: number;
    b1: number;
    b2: number;
    a0: number;
    a1: number;
    a2: number;
  }
): Pointer | null {
  return this.symbols.ma_biquad_config_init(
    options.format,
    options.channels,
    options.b0,
    options.b1,
    options.b2,
    options.a0,
    options.a1,
    options.a2
  ) as Pointer | null;
}

export function ma_biquad_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_biquad_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_biquad_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pBQ: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_biquad_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pBQ
  ) as Pointer | null;
}

export function ma_biquad_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pBQ: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_biquad_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pBQ
  ) as Pointer | null;
}

export function ma_biquad_uninit(
  this: MiniAudio,
  options: {
    pBQ: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_biquad_uninit(options.pBQ, options.pAllocationCallbacks);
}

export function ma_biquad_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pBQ: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_biquad_reinit(
    options.pConfig,
    options.pBQ
  ) as Pointer | null;
}

export function ma_biquad_clear_cache(
  this: MiniAudio,
  options: {
    pBQ: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_biquad_clear_cache(options.pBQ) as Pointer | null;
}

export function ma_biquad_process_pcm_frames(
  this: MiniAudio,
  options: {
    pBQ: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_biquad_process_pcm_frames(
    options.pBQ,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_biquad_get_latency(
  this: MiniAudio,
  options: {
    pBQ: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_biquad_get_latency(options.pBQ) as Pointer | null;
}

export function ma_lpf1_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
    cutoffFrequency: number;
  }
): Pointer | null {
  return this.symbols.ma_lpf1_config_init(
    options.format,
    options.channels,
    options.sampleRate,
    options.cutoffFrequency
  ) as Pointer | null;
}

export function ma_lpf2_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
    cutoffFrequency: number;
    q: number;
  }
): Pointer | null {
  return this.symbols.ma_lpf2_config_init(
    options.format,
    options.channels,
    options.sampleRate,
    options.cutoffFrequency,
    options.q
  ) as Pointer | null;
}

export function ma_lpf1_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf1_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_lpf1_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pLPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf1_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pLPF
  ) as Pointer | null;
}

export function ma_lpf1_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pLPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf1_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pLPF
  ) as Pointer | null;
}

export function ma_lpf1_uninit(
  this: MiniAudio,
  options: {
    pLPF: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_lpf1_uninit(options.pLPF, options.pAllocationCallbacks);
}

export function ma_lpf1_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pLPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf1_reinit(
    options.pConfig,
    options.pLPF
  ) as Pointer | null;
}

export function ma_lpf1_clear_cache(
  this: MiniAudio,
  options: {
    pLPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf1_clear_cache(options.pLPF) as Pointer | null;
}

export function ma_lpf1_process_pcm_frames(
  this: MiniAudio,
  options: {
    pLPF: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_lpf1_process_pcm_frames(
    options.pLPF,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_lpf1_get_latency(
  this: MiniAudio,
  options: {
    pLPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf1_get_latency(options.pLPF) as Pointer | null;
}

export function ma_lpf2_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf2_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_lpf2_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pHPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf2_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pHPF
  ) as Pointer | null;
}

export function ma_lpf2_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pLPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf2_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pLPF
  ) as Pointer | null;
}

export function ma_lpf2_uninit(
  this: MiniAudio,
  options: {
    pLPF: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_lpf2_uninit(options.pLPF, options.pAllocationCallbacks);
}

export function ma_lpf2_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pLPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf2_reinit(
    options.pConfig,
    options.pLPF
  ) as Pointer | null;
}

export function ma_lpf2_clear_cache(
  this: MiniAudio,
  options: {
    pLPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf2_clear_cache(options.pLPF) as Pointer | null;
}

export function ma_lpf2_process_pcm_frames(
  this: MiniAudio,
  options: {
    pLPF: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_lpf2_process_pcm_frames(
    options.pLPF,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_lpf2_get_latency(
  this: MiniAudio,
  options: {
    pLPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf2_get_latency(options.pLPF) as Pointer | null;
}

export function ma_lpf_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
    cutoffFrequency: number;
    order: number;
  }
): Pointer | null {
  return this.symbols.ma_lpf_config_init(
    options.format,
    options.channels,
    options.sampleRate,
    options.cutoffFrequency,
    options.order
  ) as Pointer | null;
}

export function ma_lpf_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_lpf_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pLPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pLPF
  ) as Pointer | null;
}

export function ma_lpf_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pLPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pLPF
  ) as Pointer | null;
}

export function ma_lpf_uninit(
  this: MiniAudio,
  options: {
    pLPF: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_lpf_uninit(options.pLPF, options.pAllocationCallbacks);
}

export function ma_lpf_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pLPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf_reinit(
    options.pConfig,
    options.pLPF
  ) as Pointer | null;
}

export function ma_lpf_clear_cache(
  this: MiniAudio,
  options: {
    pLPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf_clear_cache(options.pLPF) as Pointer | null;
}

export function ma_lpf_process_pcm_frames(
  this: MiniAudio,
  options: {
    pLPF: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_lpf_process_pcm_frames(
    options.pLPF,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_lpf_get_latency(
  this: MiniAudio,
  options: {
    pLPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf_get_latency(options.pLPF) as Pointer | null;
}

export function ma_hpf1_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
    cutoffFrequency: number;
  }
): Pointer | null {
  return this.symbols.ma_hpf1_config_init(
    options.format,
    options.channels,
    options.sampleRate,
    options.cutoffFrequency
  ) as Pointer | null;
}

export function ma_hpf2_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
    cutoffFrequency: number;
    q: number;
  }
): Pointer | null {
  return this.symbols.ma_hpf2_config_init(
    options.format,
    options.channels,
    options.sampleRate,
    options.cutoffFrequency,
    options.q
  ) as Pointer | null;
}

export function ma_hpf1_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf1_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_hpf1_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pLPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf1_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pLPF
  ) as Pointer | null;
}

export function ma_hpf1_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pHPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf1_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pHPF
  ) as Pointer | null;
}

export function ma_hpf1_uninit(
  this: MiniAudio,
  options: {
    pHPF: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_hpf1_uninit(options.pHPF, options.pAllocationCallbacks);
}

export function ma_hpf1_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf1_reinit(
    options.pConfig,
    options.pHPF
  ) as Pointer | null;
}

export function ma_hpf1_process_pcm_frames(
  this: MiniAudio,
  options: {
    pHPF: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_hpf1_process_pcm_frames(
    options.pHPF,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_hpf1_get_latency(
  this: MiniAudio,
  options: {
    pHPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf1_get_latency(options.pHPF) as Pointer | null;
}

export function ma_hpf2_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf2_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_hpf2_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pHPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf2_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pHPF
  ) as Pointer | null;
}

export function ma_hpf2_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pHPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf2_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pHPF
  ) as Pointer | null;
}

export function ma_hpf2_uninit(
  this: MiniAudio,
  options: {
    pHPF: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_hpf2_uninit(options.pHPF, options.pAllocationCallbacks);
}

export function ma_hpf2_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf2_reinit(
    options.pConfig,
    options.pHPF
  ) as Pointer | null;
}

export function ma_hpf2_process_pcm_frames(
  this: MiniAudio,
  options: {
    pHPF: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_hpf2_process_pcm_frames(
    options.pHPF,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_hpf2_get_latency(
  this: MiniAudio,
  options: {
    pHPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf2_get_latency(options.pHPF) as Pointer | null;
}

export function ma_hpf_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
    cutoffFrequency: number;
    order: number;
  }
): Pointer | null {
  return this.symbols.ma_hpf_config_init(
    options.format,
    options.channels,
    options.sampleRate,
    options.cutoffFrequency,
    options.order
  ) as Pointer | null;
}

export function ma_hpf_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_hpf_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pLPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pLPF
  ) as Pointer | null;
}

export function ma_hpf_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pHPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pHPF
  ) as Pointer | null;
}

export function ma_hpf_uninit(
  this: MiniAudio,
  options: {
    pHPF: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_hpf_uninit(options.pHPF, options.pAllocationCallbacks);
}

export function ma_hpf_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf_reinit(
    options.pConfig,
    options.pHPF
  ) as Pointer | null;
}

export function ma_hpf_process_pcm_frames(
  this: MiniAudio,
  options: {
    pHPF: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_hpf_process_pcm_frames(
    options.pHPF,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_hpf_get_latency(
  this: MiniAudio,
  options: {
    pHPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf_get_latency(options.pHPF) as Pointer | null;
}

export function ma_bpf2_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
    cutoffFrequency: number;
    q: number;
  }
): Pointer | null {
  return this.symbols.ma_bpf2_config_init(
    options.format,
    options.channels,
    options.sampleRate,
    options.cutoffFrequency,
    options.q
  ) as Pointer | null;
}

export function ma_bpf2_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_bpf2_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_bpf2_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pBPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_bpf2_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pBPF
  ) as Pointer | null;
}

export function ma_bpf2_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pBPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_bpf2_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pBPF
  ) as Pointer | null;
}

export function ma_bpf2_uninit(
  this: MiniAudio,
  options: {
    pBPF: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_bpf2_uninit(options.pBPF, options.pAllocationCallbacks);
}

export function ma_bpf2_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pBPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_bpf2_reinit(
    options.pConfig,
    options.pBPF
  ) as Pointer | null;
}

export function ma_bpf2_process_pcm_frames(
  this: MiniAudio,
  options: {
    pBPF: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_bpf2_process_pcm_frames(
    options.pBPF,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_bpf2_get_latency(
  this: MiniAudio,
  options: {
    pBPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_bpf2_get_latency(options.pBPF) as Pointer | null;
}

export function ma_bpf_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
    cutoffFrequency: number;
    order: number;
  }
): Pointer | null {
  return this.symbols.ma_bpf_config_init(
    options.format,
    options.channels,
    options.sampleRate,
    options.cutoffFrequency,
    options.order
  ) as Pointer | null;
}

export function ma_bpf_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_bpf_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_bpf_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pBPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_bpf_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pBPF
  ) as Pointer | null;
}

export function ma_bpf_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pBPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_bpf_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pBPF
  ) as Pointer | null;
}

export function ma_bpf_uninit(
  this: MiniAudio,
  options: {
    pBPF: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_bpf_uninit(options.pBPF, options.pAllocationCallbacks);
}

export function ma_bpf_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pBPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_bpf_reinit(
    options.pConfig,
    options.pBPF
  ) as Pointer | null;
}

export function ma_bpf_process_pcm_frames(
  this: MiniAudio,
  options: {
    pBPF: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_bpf_process_pcm_frames(
    options.pBPF,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_bpf_get_latency(
  this: MiniAudio,
  options: {
    pBPF: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_bpf_get_latency(options.pBPF) as Pointer | null;
}

export function ma_notch2_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
    q: number;
    frequency: number;
  }
): Pointer | null {
  return this.symbols.ma_notch2_config_init(
    options.format,
    options.channels,
    options.sampleRate,
    options.q,
    options.frequency
  ) as Pointer | null;
}

export function ma_notch2_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_notch2_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_notch2_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pFilter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_notch2_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pFilter
  ) as Pointer | null;
}

export function ma_notch2_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pFilter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_notch2_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pFilter
  ) as Pointer | null;
}

export function ma_notch2_uninit(
  this: MiniAudio,
  options: {
    pFilter: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_notch2_uninit(options.pFilter, options.pAllocationCallbacks);
}

export function ma_notch2_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pFilter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_notch2_reinit(
    options.pConfig,
    options.pFilter
  ) as Pointer | null;
}

export function ma_notch2_process_pcm_frames(
  this: MiniAudio,
  options: {
    pFilter: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_notch2_process_pcm_frames(
    options.pFilter,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_notch2_get_latency(
  this: MiniAudio,
  options: {
    pFilter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_notch2_get_latency(options.pFilter) as Pointer | null;
}

export function ma_peak2_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
    gainDB: number;
    q: number;
    frequency: number;
  }
): Pointer | null {
  return this.symbols.ma_peak2_config_init(
    options.format,
    options.channels,
    options.sampleRate,
    options.gainDB,
    options.q,
    options.frequency
  ) as Pointer | null;
}

export function ma_peak2_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_peak2_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_peak2_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pFilter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_peak2_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pFilter
  ) as Pointer | null;
}

export function ma_peak2_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pFilter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_peak2_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pFilter
  ) as Pointer | null;
}

export function ma_peak2_uninit(
  this: MiniAudio,
  options: {
    pFilter: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_peak2_uninit(options.pFilter, options.pAllocationCallbacks);
}

export function ma_peak2_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pFilter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_peak2_reinit(
    options.pConfig,
    options.pFilter
  ) as Pointer | null;
}

export function ma_peak2_process_pcm_frames(
  this: MiniAudio,
  options: {
    pFilter: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_peak2_process_pcm_frames(
    options.pFilter,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_peak2_get_latency(
  this: MiniAudio,
  options: {
    pFilter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_peak2_get_latency(options.pFilter) as Pointer | null;
}

export function ma_loshelf2_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
    gainDB: number;
    shelfSlope: number;
    frequency: number;
  }
): Pointer | null {
  return this.symbols.ma_loshelf2_config_init(
    options.format,
    options.channels,
    options.sampleRate,
    options.gainDB,
    options.shelfSlope,
    options.frequency
  ) as Pointer | null;
}

export function ma_loshelf2_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_loshelf2_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_loshelf2_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pFilter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_loshelf2_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pFilter
  ) as Pointer | null;
}

export function ma_loshelf2_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pFilter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_loshelf2_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pFilter
  ) as Pointer | null;
}

export function ma_loshelf2_uninit(
  this: MiniAudio,
  options: {
    pFilter: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_loshelf2_uninit(
    options.pFilter,
    options.pAllocationCallbacks
  );
}

export function ma_loshelf2_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pFilter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_loshelf2_reinit(
    options.pConfig,
    options.pFilter
  ) as Pointer | null;
}

export function ma_loshelf2_process_pcm_frames(
  this: MiniAudio,
  options: {
    pFilter: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_loshelf2_process_pcm_frames(
    options.pFilter,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_loshelf2_get_latency(
  this: MiniAudio,
  options: {
    pFilter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_loshelf2_get_latency(
    options.pFilter
  ) as Pointer | null;
}

export function ma_hishelf2_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
    gainDB: number;
    shelfSlope: number;
    frequency: number;
  }
): Pointer | null {
  return this.symbols.ma_hishelf2_config_init(
    options.format,
    options.channels,
    options.sampleRate,
    options.gainDB,
    options.shelfSlope,
    options.frequency
  ) as Pointer | null;
}

export function ma_hishelf2_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hishelf2_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_hishelf2_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pFilter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hishelf2_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pFilter
  ) as Pointer | null;
}

export function ma_hishelf2_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pFilter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hishelf2_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pFilter
  ) as Pointer | null;
}

export function ma_hishelf2_uninit(
  this: MiniAudio,
  options: {
    pFilter: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_hishelf2_uninit(
    options.pFilter,
    options.pAllocationCallbacks
  );
}

export function ma_hishelf2_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pFilter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hishelf2_reinit(
    options.pConfig,
    options.pFilter
  ) as Pointer | null;
}

export function ma_hishelf2_process_pcm_frames(
  this: MiniAudio,
  options: {
    pFilter: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_hishelf2_process_pcm_frames(
    options.pFilter,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_hishelf2_get_latency(
  this: MiniAudio,
  options: {
    pFilter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hishelf2_get_latency(
    options.pFilter
  ) as Pointer | null;
}

export function ma_delay_config_init(
  this: MiniAudio,
  options: {
    channels: number;
    sampleRate: number;
    delayInFrames: number;
    decay: number;
  }
): Pointer | null {
  return this.symbols.ma_delay_config_init(
    options.channels,
    options.sampleRate,
    options.delayInFrames,
    options.decay
  ) as Pointer | null;
}

export function ma_delay_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pDelay: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_delay_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pDelay
  ) as Pointer | null;
}

export function ma_delay_uninit(
  this: MiniAudio,
  options: {
    pDelay: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_delay_uninit(options.pDelay, options.pAllocationCallbacks);
}

export function ma_delay_process_pcm_frames(
  this: MiniAudio,
  options: {
    pDelay: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: number;
  }
): Pointer | null {
  return this.symbols.ma_delay_process_pcm_frames(
    options.pDelay,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_delay_set_wet(
  this: MiniAudio,
  options: {
    pDelay: Pointer | NodeJS.TypedArray | null;
    value: number;
  }
): void {
  this.symbols.ma_delay_set_wet(options.pDelay, options.value);
}

export function ma_delay_get_wet(
  this: MiniAudio,
  options: {
    pDelay: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_delay_get_wet(options.pDelay) as number;
}

export function ma_delay_set_dry(
  this: MiniAudio,
  options: {
    pDelay: Pointer | NodeJS.TypedArray | null;
    value: number;
  }
): void {
  this.symbols.ma_delay_set_dry(options.pDelay, options.value);
}

export function ma_delay_get_dry(
  this: MiniAudio,
  options: {
    pDelay: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_delay_get_dry(options.pDelay) as number;
}

export function ma_delay_set_decay(
  this: MiniAudio,
  options: {
    pDelay: Pointer | NodeJS.TypedArray | null;
    value: number;
  }
): void {
  this.symbols.ma_delay_set_decay(options.pDelay, options.value);
}

export function ma_delay_get_decay(
  this: MiniAudio,
  options: {
    pDelay: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_delay_get_decay(options.pDelay) as number;
}

export function ma_gainer_config_init(
  this: MiniAudio,
  options: {
    channels: number;
    smoothTimeInFrames: number;
  }
): Pointer | null {
  return this.symbols.ma_gainer_config_init(
    options.channels,
    options.smoothTimeInFrames
  ) as Pointer | null;
}

export function ma_gainer_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_gainer_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_gainer_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pGainer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_gainer_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pGainer
  ) as Pointer | null;
}

export function ma_gainer_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pGainer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_gainer_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pGainer
  ) as Pointer | null;
}

export function ma_gainer_uninit(
  this: MiniAudio,
  options: {
    pGainer: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_gainer_uninit(options.pGainer, options.pAllocationCallbacks);
}

export function ma_gainer_process_pcm_frames(
  this: MiniAudio,
  options: {
    pGainer: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_gainer_process_pcm_frames(
    options.pGainer,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_gainer_set_gain(
  this: MiniAudio,
  options: {
    pGainer: Pointer | NodeJS.TypedArray | null;
    newGain: number;
  }
): Pointer | null {
  return this.symbols.ma_gainer_set_gain(
    options.pGainer,
    options.newGain
  ) as Pointer | null;
}

export function ma_gainer_set_gains(
  this: MiniAudio,
  options: {
    pGainer: Pointer | NodeJS.TypedArray | null;
    pNewGains: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_gainer_set_gains(
    options.pGainer,
    options.pNewGains
  ) as Pointer | null;
}

export function ma_gainer_set_master_volume(
  this: MiniAudio,
  options: {
    pGainer: Pointer | NodeJS.TypedArray | null;
    volume: number;
  }
): Pointer | null {
  return this.symbols.ma_gainer_set_master_volume(
    options.pGainer,
    options.volume
  ) as Pointer | null;
}

export function ma_gainer_get_master_volume(
  this: MiniAudio,
  options: {
    pGainer: Pointer | NodeJS.TypedArray | null;
    pVolume: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_gainer_get_master_volume(
    options.pGainer,
    options.pVolume
  ) as Pointer | null;
}

export function ma_panner_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
  }
): Pointer | null {
  return this.symbols.ma_panner_config_init(
    options.format,
    options.channels
  ) as Pointer | null;
}

export function ma_panner_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pPanner: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_panner_init(
    options.pConfig,
    options.pPanner
  ) as Pointer | null;
}

export function ma_panner_process_pcm_frames(
  this: MiniAudio,
  options: {
    pPanner: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_panner_process_pcm_frames(
    options.pPanner,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_panner_set_mode(
  this: MiniAudio,
  options: {
    pPanner: Pointer | NodeJS.TypedArray | null;
    mode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_panner_set_mode(options.pPanner, options.mode);
}

export function ma_panner_get_mode(
  this: MiniAudio,
  options: {
    pPanner: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_panner_get_mode(options.pPanner) as Pointer | null;
}

export function ma_panner_set_pan(
  this: MiniAudio,
  options: {
    pPanner: Pointer | NodeJS.TypedArray | null;
    pan: number;
  }
): void {
  this.symbols.ma_panner_set_pan(options.pPanner, options.pan);
}

export function ma_panner_get_pan(
  this: MiniAudio,
  options: {
    pPanner: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_panner_get_pan(options.pPanner) as number;
}

export function ma_fader_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
  }
): Pointer | null {
  return this.symbols.ma_fader_config_init(
    options.format,
    options.channels,
    options.sampleRate
  ) as Pointer | null;
}

export function ma_fader_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pFader: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_fader_init(
    options.pConfig,
    options.pFader
  ) as Pointer | null;
}

export function ma_fader_process_pcm_frames(
  this: MiniAudio,
  options: {
    pFader: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_fader_process_pcm_frames(
    options.pFader,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_fader_get_data_format(
  this: MiniAudio,
  options: {
    pFader: Pointer | NodeJS.TypedArray | null;
    pFormat: Pointer | NodeJS.TypedArray | null;
    pChannels: Pointer | NodeJS.TypedArray | null;
    pSampleRate: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_fader_get_data_format(
    options.pFader,
    options.pFormat,
    options.pChannels,
    options.pSampleRate
  );
}

export function ma_fader_set_fade(
  this: MiniAudio,
  options: {
    pFader: Pointer | NodeJS.TypedArray | null;
    volumeBeg: number;
    volumeEnd: number;
    lengthInFrames: bigint;
  }
): void {
  this.symbols.ma_fader_set_fade(
    options.pFader,
    options.volumeBeg,
    options.volumeEnd,
    options.lengthInFrames
  );
}

export function ma_fader_set_fade_ex(
  this: MiniAudio,
  options: {
    pFader: Pointer | NodeJS.TypedArray | null;
    volumeBeg: number;
    volumeEnd: number;
    lengthInFrames: bigint;
    startOffsetInFrames: bigint;
  }
): void {
  this.symbols.ma_fader_set_fade_ex(
    options.pFader,
    options.volumeBeg,
    options.volumeEnd,
    options.lengthInFrames,
    options.startOffsetInFrames
  );
}

export function ma_fader_get_current_volume(
  this: MiniAudio,
  options: {
    pFader: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_fader_get_current_volume(options.pFader) as number;
}

export function ma_spatializer_listener_config_init(
  this: MiniAudio,
  options: {
    channelsOut: number;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_listener_config_init(
    options.channelsOut
  ) as Pointer | null;
}

export function ma_spatializer_listener_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_listener_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_spatializer_listener_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pListener: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_listener_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pListener
  ) as Pointer | null;
}

export function ma_spatializer_listener_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pListener: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_listener_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pListener
  ) as Pointer | null;
}

export function ma_spatializer_listener_uninit(
  this: MiniAudio,
  options: {
    pListener: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_spatializer_listener_uninit(
    options.pListener,
    options.pAllocationCallbacks
  );
}

export function ma_spatializer_listener_get_channel_map(
  this: MiniAudio,
  options: {
    pListener: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_listener_get_channel_map(
    options.pListener
  ) as Pointer | null;
}

export function ma_spatializer_listener_set_cone(
  this: MiniAudio,
  options: {
    pListener: Pointer | NodeJS.TypedArray | null;
    innerAngleInRadians: number;
    outerAngleInRadians: number;
    outerGain: number;
  }
): void {
  this.symbols.ma_spatializer_listener_set_cone(
    options.pListener,
    options.innerAngleInRadians,
    options.outerAngleInRadians,
    options.outerGain
  );
}

export function ma_spatializer_listener_get_cone(
  this: MiniAudio,
  options: {
    pListener: Pointer | NodeJS.TypedArray | null;
    pInnerAngleInRadians: Pointer | NodeJS.TypedArray | null;
    pOuterAngleInRadians: Pointer | NodeJS.TypedArray | null;
    pOuterGain: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_spatializer_listener_get_cone(
    options.pListener,
    options.pInnerAngleInRadians,
    options.pOuterAngleInRadians,
    options.pOuterGain
  );
}

export function ma_spatializer_listener_set_position(
  this: MiniAudio,
  options: {
    pListener: Pointer | NodeJS.TypedArray | null;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_spatializer_listener_set_position(
    options.pListener,
    options.x,
    options.y,
    options.z
  );
}

export function ma_spatializer_listener_get_position(
  this: MiniAudio,
  options: {
    pListener: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_listener_get_position(
    options.pListener
  ) as Pointer | null;
}

export function ma_spatializer_listener_set_direction(
  this: MiniAudio,
  options: {
    pListener: Pointer | NodeJS.TypedArray | null;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_spatializer_listener_set_direction(
    options.pListener,
    options.x,
    options.y,
    options.z
  );
}

export function ma_spatializer_listener_get_direction(
  this: MiniAudio,
  options: {
    pListener: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_listener_get_direction(
    options.pListener
  ) as Pointer | null;
}

export function ma_spatializer_listener_set_velocity(
  this: MiniAudio,
  options: {
    pListener: Pointer | NodeJS.TypedArray | null;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_spatializer_listener_set_velocity(
    options.pListener,
    options.x,
    options.y,
    options.z
  );
}

export function ma_spatializer_listener_get_velocity(
  this: MiniAudio,
  options: {
    pListener: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_listener_get_velocity(
    options.pListener
  ) as Pointer | null;
}

export function ma_spatializer_listener_set_speed_of_sound(
  this: MiniAudio,
  options: {
    pListener: Pointer | NodeJS.TypedArray | null;
    speedOfSound: number;
  }
): void {
  this.symbols.ma_spatializer_listener_set_speed_of_sound(
    options.pListener,
    options.speedOfSound
  );
}

export function ma_spatializer_listener_get_speed_of_sound(
  this: MiniAudio,
  options: {
    pListener: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_spatializer_listener_get_speed_of_sound(
    options.pListener
  ) as number;
}

export function ma_spatializer_listener_set_world_up(
  this: MiniAudio,
  options: {
    pListener: Pointer | NodeJS.TypedArray | null;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_spatializer_listener_set_world_up(
    options.pListener,
    options.x,
    options.y,
    options.z
  );
}

export function ma_spatializer_listener_get_world_up(
  this: MiniAudio,
  options: {
    pListener: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_listener_get_world_up(
    options.pListener
  ) as Pointer | null;
}

export function ma_spatializer_listener_set_enabled(
  this: MiniAudio,
  options: {
    pListener: Pointer | NodeJS.TypedArray | null;
    isEnabled: number;
  }
): void {
  this.symbols.ma_spatializer_listener_set_enabled(
    options.pListener,
    options.isEnabled
  );
}

export function ma_spatializer_listener_is_enabled(
  this: MiniAudio,
  options: {
    pListener: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_listener_is_enabled(
    options.pListener
  ) as Pointer | null;
}

export function ma_spatializer_config_init(
  this: MiniAudio,
  options: {
    channelsIn: number;
    channelsOut: number;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_config_init(
    options.channelsIn,
    options.channelsOut
  ) as Pointer | null;
}

export function ma_spatializer_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_spatializer_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pSpatializer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pSpatializer
  ) as Pointer | null;
}

export function ma_spatializer_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pSpatializer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pSpatializer
  ) as Pointer | null;
}

export function ma_spatializer_uninit(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_spatializer_uninit(
    options.pSpatializer,
    options.pAllocationCallbacks
  );
}

export function ma_spatializer_process_pcm_frames(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    pListener: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_process_pcm_frames(
    options.pSpatializer,
    options.pListener,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_spatializer_set_master_volume(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    volume: number;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_set_master_volume(
    options.pSpatializer,
    options.volume
  ) as Pointer | null;
}

export function ma_spatializer_get_master_volume(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    pVolume: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_get_master_volume(
    options.pSpatializer,
    options.pVolume
  ) as Pointer | null;
}

export function ma_spatializer_get_input_channels(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_get_input_channels(
    options.pSpatializer
  ) as Pointer | null;
}

export function ma_spatializer_get_output_channels(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_get_output_channels(
    options.pSpatializer
  ) as Pointer | null;
}

export function ma_spatializer_set_attenuation_model(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    attenuationModel: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_spatializer_set_attenuation_model(
    options.pSpatializer,
    options.attenuationModel
  );
}

export function ma_spatializer_get_attenuation_model(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_get_attenuation_model(
    options.pSpatializer
  ) as Pointer | null;
}

export function ma_spatializer_set_positioning(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    positioning: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_spatializer_set_positioning(
    options.pSpatializer,
    options.positioning
  );
}

export function ma_spatializer_get_positioning(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_get_positioning(
    options.pSpatializer
  ) as Pointer | null;
}

export function ma_spatializer_set_rolloff(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    rolloff: number;
  }
): void {
  this.symbols.ma_spatializer_set_rolloff(
    options.pSpatializer,
    options.rolloff
  );
}

export function ma_spatializer_get_rolloff(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_spatializer_get_rolloff(
    options.pSpatializer
  ) as number;
}

export function ma_spatializer_set_min_gain(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    minGain: number;
  }
): void {
  this.symbols.ma_spatializer_set_min_gain(
    options.pSpatializer,
    options.minGain
  );
}

export function ma_spatializer_get_min_gain(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_spatializer_get_min_gain(
    options.pSpatializer
  ) as number;
}

export function ma_spatializer_set_max_gain(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    maxGain: number;
  }
): void {
  this.symbols.ma_spatializer_set_max_gain(
    options.pSpatializer,
    options.maxGain
  );
}

export function ma_spatializer_get_max_gain(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_spatializer_get_max_gain(
    options.pSpatializer
  ) as number;
}

export function ma_spatializer_set_min_distance(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    minDistance: number;
  }
): void {
  this.symbols.ma_spatializer_set_min_distance(
    options.pSpatializer,
    options.minDistance
  );
}

export function ma_spatializer_get_min_distance(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_spatializer_get_min_distance(
    options.pSpatializer
  ) as number;
}

export function ma_spatializer_set_max_distance(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    maxDistance: number;
  }
): void {
  this.symbols.ma_spatializer_set_max_distance(
    options.pSpatializer,
    options.maxDistance
  );
}

export function ma_spatializer_get_max_distance(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_spatializer_get_max_distance(
    options.pSpatializer
  ) as number;
}

export function ma_spatializer_set_cone(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    innerAngleInRadians: number;
    outerAngleInRadians: number;
    outerGain: number;
  }
): void {
  this.symbols.ma_spatializer_set_cone(
    options.pSpatializer,
    options.innerAngleInRadians,
    options.outerAngleInRadians,
    options.outerGain
  );
}

export function ma_spatializer_get_cone(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    pInnerAngleInRadians: Pointer | NodeJS.TypedArray | null;
    pOuterAngleInRadians: Pointer | NodeJS.TypedArray | null;
    pOuterGain: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_spatializer_get_cone(
    options.pSpatializer,
    options.pInnerAngleInRadians,
    options.pOuterAngleInRadians,
    options.pOuterGain
  );
}

export function ma_spatializer_set_doppler_factor(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    dopplerFactor: number;
  }
): void {
  this.symbols.ma_spatializer_set_doppler_factor(
    options.pSpatializer,
    options.dopplerFactor
  );
}

export function ma_spatializer_get_doppler_factor(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_spatializer_get_doppler_factor(
    options.pSpatializer
  ) as number;
}

export function ma_spatializer_set_directional_attenuation_factor(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    directionalAttenuationFactor: number;
  }
): void {
  this.symbols.ma_spatializer_set_directional_attenuation_factor(
    options.pSpatializer,
    options.directionalAttenuationFactor
  );
}

export function ma_spatializer_get_directional_attenuation_factor(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_spatializer_get_directional_attenuation_factor(
    options.pSpatializer
  ) as number;
}

export function ma_spatializer_set_position(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_spatializer_set_position(
    options.pSpatializer,
    options.x,
    options.y,
    options.z
  );
}

export function ma_spatializer_get_position(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_get_position(
    options.pSpatializer
  ) as Pointer | null;
}

export function ma_spatializer_set_direction(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_spatializer_set_direction(
    options.pSpatializer,
    options.x,
    options.y,
    options.z
  );
}

export function ma_spatializer_get_direction(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_get_direction(
    options.pSpatializer
  ) as Pointer | null;
}

export function ma_spatializer_set_velocity(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_spatializer_set_velocity(
    options.pSpatializer,
    options.x,
    options.y,
    options.z
  );
}

export function ma_spatializer_get_velocity(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spatializer_get_velocity(
    options.pSpatializer
  ) as Pointer | null;
}

export function ma_spatializer_get_relative_position_and_direction(
  this: MiniAudio,
  options: {
    pSpatializer: Pointer | NodeJS.TypedArray | null;
    pListener: Pointer | NodeJS.TypedArray | null;
    pRelativePos: Pointer | NodeJS.TypedArray | null;
    pRelativeDir: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_spatializer_get_relative_position_and_direction(
    options.pSpatializer,
    options.pListener,
    options.pRelativePos,
    options.pRelativeDir
  );
}

export function ma_linear_resampler_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRateIn: number;
    sampleRateOut: number;
  }
): Pointer | null {
  return this.symbols.ma_linear_resampler_config_init(
    options.format,
    options.channels,
    options.sampleRateIn,
    options.sampleRateOut
  ) as Pointer | null;
}

export function ma_linear_resampler_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_linear_resampler_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_linear_resampler_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pResampler: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_linear_resampler_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pResampler
  ) as Pointer | null;
}

export function ma_linear_resampler_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pResampler: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_linear_resampler_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pResampler
  ) as Pointer | null;
}

export function ma_linear_resampler_uninit(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_linear_resampler_uninit(
    options.pResampler,
    options.pAllocationCallbacks
  );
}

export function ma_linear_resampler_process_pcm_frames(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    pFrameCountIn: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFrameCountOut: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_linear_resampler_process_pcm_frames(
    options.pResampler,
    options.pFramesIn,
    options.pFrameCountIn,
    options.pFramesOut,
    options.pFrameCountOut
  ) as Pointer | null;
}

export function ma_linear_resampler_set_rate(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
    sampleRateIn: number;
    sampleRateOut: number;
  }
): Pointer | null {
  return this.symbols.ma_linear_resampler_set_rate(
    options.pResampler,
    options.sampleRateIn,
    options.sampleRateOut
  ) as Pointer | null;
}

export function ma_linear_resampler_set_rate_ratio(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
    ratioInOut: number;
  }
): Pointer | null {
  return this.symbols.ma_linear_resampler_set_rate_ratio(
    options.pResampler,
    options.ratioInOut
  ) as Pointer | null;
}

export function ma_linear_resampler_get_input_latency(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_linear_resampler_get_input_latency(
    options.pResampler
  ) as Pointer | null;
}

export function ma_linear_resampler_get_output_latency(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_linear_resampler_get_output_latency(
    options.pResampler
  ) as Pointer | null;
}

export function ma_linear_resampler_get_required_input_frame_count(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
    outputFrameCount: bigint;
    pInputFrameCount: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_linear_resampler_get_required_input_frame_count(
    options.pResampler,
    options.outputFrameCount,
    options.pInputFrameCount
  ) as Pointer | null;
}

export function ma_linear_resampler_get_expected_output_frame_count(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
    inputFrameCount: bigint;
    pOutputFrameCount: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_linear_resampler_get_expected_output_frame_count(
    options.pResampler,
    options.inputFrameCount,
    options.pOutputFrameCount
  ) as Pointer | null;
}

export function ma_linear_resampler_reset(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_linear_resampler_reset(
    options.pResampler
  ) as Pointer | null;
}

export function ma_resampler_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRateIn: number;
    sampleRateOut: number;
    algorithm: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resampler_config_init(
    options.format,
    options.channels,
    options.sampleRateIn,
    options.sampleRateOut,
    options.algorithm
  ) as Pointer | null;
}

export function ma_resampler_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resampler_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_resampler_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pResampler: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resampler_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pResampler
  ) as Pointer | null;
}

export function ma_resampler_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pResampler: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resampler_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pResampler
  ) as Pointer | null;
}

export function ma_resampler_uninit(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_resampler_uninit(
    options.pResampler,
    options.pAllocationCallbacks
  );
}

export function ma_resampler_process_pcm_frames(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    pFrameCountIn: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFrameCountOut: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resampler_process_pcm_frames(
    options.pResampler,
    options.pFramesIn,
    options.pFrameCountIn,
    options.pFramesOut,
    options.pFrameCountOut
  ) as Pointer | null;
}

export function ma_resampler_set_rate(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
    sampleRateIn: number;
    sampleRateOut: number;
  }
): Pointer | null {
  return this.symbols.ma_resampler_set_rate(
    options.pResampler,
    options.sampleRateIn,
    options.sampleRateOut
  ) as Pointer | null;
}

export function ma_resampler_set_rate_ratio(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
    ratio: number;
  }
): Pointer | null {
  return this.symbols.ma_resampler_set_rate_ratio(
    options.pResampler,
    options.ratio
  ) as Pointer | null;
}

export function ma_resampler_get_input_latency(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resampler_get_input_latency(
    options.pResampler
  ) as Pointer | null;
}

export function ma_resampler_get_output_latency(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resampler_get_output_latency(
    options.pResampler
  ) as Pointer | null;
}

export function ma_resampler_get_required_input_frame_count(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
    outputFrameCount: bigint;
    pInputFrameCount: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resampler_get_required_input_frame_count(
    options.pResampler,
    options.outputFrameCount,
    options.pInputFrameCount
  ) as Pointer | null;
}

export function ma_resampler_get_expected_output_frame_count(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
    inputFrameCount: bigint;
    pOutputFrameCount: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resampler_get_expected_output_frame_count(
    options.pResampler,
    options.inputFrameCount,
    options.pOutputFrameCount
  ) as Pointer | null;
}

export function ma_resampler_reset(
  this: MiniAudio,
  options: {
    pResampler: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resampler_reset(options.pResampler) as Pointer | null;
}

export function ma_channel_converter_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channelsIn: number;
    pChannelMapIn: Pointer | NodeJS.TypedArray | null;
    channelsOut: number;
    pChannelMapOut: Pointer | NodeJS.TypedArray | null;
    mixingMode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_channel_converter_config_init(
    options.format,
    options.channelsIn,
    options.pChannelMapIn,
    options.channelsOut,
    options.pChannelMapOut,
    options.mixingMode
  ) as Pointer | null;
}

export function ma_channel_converter_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_channel_converter_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_channel_converter_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pConverter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_channel_converter_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pConverter
  ) as Pointer | null;
}

export function ma_channel_converter_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pConverter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_channel_converter_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pConverter
  ) as Pointer | null;
}

export function ma_channel_converter_uninit(
  this: MiniAudio,
  options: {
    pConverter: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_channel_converter_uninit(
    options.pConverter,
    options.pAllocationCallbacks
  );
}

export function ma_channel_converter_process_pcm_frames(
  this: MiniAudio,
  options: {
    pConverter: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_channel_converter_process_pcm_frames(
    options.pConverter,
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount
  ) as Pointer | null;
}

export function ma_channel_converter_get_input_channel_map(
  this: MiniAudio,
  options: {
    pConverter: Pointer | NodeJS.TypedArray | null;
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channelMapCap: number;
  }
): Pointer | null {
  return this.symbols.ma_channel_converter_get_input_channel_map(
    options.pConverter,
    options.pChannelMap,
    options.channelMapCap
  ) as Pointer | null;
}

export function ma_channel_converter_get_output_channel_map(
  this: MiniAudio,
  options: {
    pConverter: Pointer | NodeJS.TypedArray | null;
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channelMapCap: number;
  }
): Pointer | null {
  return this.symbols.ma_channel_converter_get_output_channel_map(
    options.pConverter,
    options.pChannelMap,
    options.channelMapCap
  ) as Pointer | null;
}

export function ma_data_converter_config_init_default(
  this: MiniAudio
): Pointer | null {
  return this.symbols.ma_data_converter_config_init_default() as Pointer | null;
}

export function ma_data_converter_config_init(
  this: MiniAudio,
  options: {
    formatIn: Pointer | NodeJS.TypedArray | null;
    formatOut: Pointer | NodeJS.TypedArray | null;
    channelsIn: number;
    channelsOut: number;
    sampleRateIn: number;
    sampleRateOut: number;
  }
): Pointer | null {
  return this.symbols.ma_data_converter_config_init(
    options.formatIn,
    options.formatOut,
    options.channelsIn,
    options.channelsOut,
    options.sampleRateIn,
    options.sampleRateOut
  ) as Pointer | null;
}

export function ma_data_converter_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_converter_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_data_converter_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pConverter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_converter_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pConverter
  ) as Pointer | null;
}

export function ma_data_converter_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pConverter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_converter_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pConverter
  ) as Pointer | null;
}

export function ma_data_converter_uninit(
  this: MiniAudio,
  options: {
    pConverter: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_data_converter_uninit(
    options.pConverter,
    options.pAllocationCallbacks
  );
}

export function ma_data_converter_process_pcm_frames(
  this: MiniAudio,
  options: {
    pConverter: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    pFrameCountIn: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFrameCountOut: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_converter_process_pcm_frames(
    options.pConverter,
    options.pFramesIn,
    options.pFrameCountIn,
    options.pFramesOut,
    options.pFrameCountOut
  ) as Pointer | null;
}

export function ma_data_converter_set_rate(
  this: MiniAudio,
  options: {
    pConverter: Pointer | NodeJS.TypedArray | null;
    sampleRateIn: number;
    sampleRateOut: number;
  }
): Pointer | null {
  return this.symbols.ma_data_converter_set_rate(
    options.pConverter,
    options.sampleRateIn,
    options.sampleRateOut
  ) as Pointer | null;
}

export function ma_data_converter_set_rate_ratio(
  this: MiniAudio,
  options: {
    pConverter: Pointer | NodeJS.TypedArray | null;
    ratioInOut: number;
  }
): Pointer | null {
  return this.symbols.ma_data_converter_set_rate_ratio(
    options.pConverter,
    options.ratioInOut
  ) as Pointer | null;
}

export function ma_data_converter_get_input_latency(
  this: MiniAudio,
  options: {
    pConverter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_converter_get_input_latency(
    options.pConverter
  ) as Pointer | null;
}

export function ma_data_converter_get_output_latency(
  this: MiniAudio,
  options: {
    pConverter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_converter_get_output_latency(
    options.pConverter
  ) as Pointer | null;
}

export function ma_data_converter_get_required_input_frame_count(
  this: MiniAudio,
  options: {
    pConverter: Pointer | NodeJS.TypedArray | null;
    outputFrameCount: bigint;
    pInputFrameCount: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_converter_get_required_input_frame_count(
    options.pConverter,
    options.outputFrameCount,
    options.pInputFrameCount
  ) as Pointer | null;
}

export function ma_data_converter_get_expected_output_frame_count(
  this: MiniAudio,
  options: {
    pConverter: Pointer | NodeJS.TypedArray | null;
    inputFrameCount: bigint;
    pOutputFrameCount: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_converter_get_expected_output_frame_count(
    options.pConverter,
    options.inputFrameCount,
    options.pOutputFrameCount
  ) as Pointer | null;
}

export function ma_data_converter_get_input_channel_map(
  this: MiniAudio,
  options: {
    pConverter: Pointer | NodeJS.TypedArray | null;
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channelMapCap: number;
  }
): Pointer | null {
  return this.symbols.ma_data_converter_get_input_channel_map(
    options.pConverter,
    options.pChannelMap,
    options.channelMapCap
  ) as Pointer | null;
}

export function ma_data_converter_get_output_channel_map(
  this: MiniAudio,
  options: {
    pConverter: Pointer | NodeJS.TypedArray | null;
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channelMapCap: number;
  }
): Pointer | null {
  return this.symbols.ma_data_converter_get_output_channel_map(
    options.pConverter,
    options.pChannelMap,
    options.channelMapCap
  ) as Pointer | null;
}

export function ma_data_converter_reset(
  this: MiniAudio,
  options: {
    pConverter: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_converter_reset(
    options.pConverter
  ) as Pointer | null;
}

export function ma_pcm_u8_to_s16(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_u8_to_s16(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_u8_to_s24(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_u8_to_s24(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_u8_to_s32(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_u8_to_s32(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_u8_to_f32(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_u8_to_f32(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_s16_to_u8(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_s16_to_u8(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_s16_to_s24(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_s16_to_s24(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_s16_to_s32(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_s16_to_s32(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_s16_to_f32(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_s16_to_f32(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_s24_to_u8(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_s24_to_u8(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_s24_to_s16(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_s24_to_s16(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_s24_to_s32(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_s24_to_s32(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_s24_to_f32(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_s24_to_f32(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_s32_to_u8(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_s32_to_u8(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_s32_to_s16(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_s32_to_s16(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_s32_to_s24(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_s32_to_s24(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_s32_to_f32(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_s32_to_f32(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_f32_to_u8(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_f32_to_u8(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_f32_to_s16(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_f32_to_s16(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_f32_to_s24(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_f32_to_s24(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_f32_to_s32(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_f32_to_s32(
    options.pOut,
    options.pIn,
    options.count,
    options.ditherMode
  );
}

export function ma_pcm_convert(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    formatOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    formatIn: Pointer | NodeJS.TypedArray | null;
    sampleCount: bigint;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_convert(
    options.pOut,
    options.formatOut,
    options.pIn,
    options.formatIn,
    options.sampleCount,
    options.ditherMode
  );
}

export function ma_convert_pcm_frames_format(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    formatOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    formatIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    channels: number;
    ditherMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_convert_pcm_frames_format(
    options.pOut,
    options.formatOut,
    options.pIn,
    options.formatIn,
    options.frameCount,
    options.channels,
    options.ditherMode
  );
}

export function ma_deinterleave_pcm_frames(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    frameCount: bigint;
    pInterleavedPCMFrames: Pointer | NodeJS.TypedArray | null;
    ppDeinterleavedPCMFrames: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_deinterleave_pcm_frames(
    options.format,
    options.channels,
    options.frameCount,
    options.pInterleavedPCMFrames,
    options.ppDeinterleavedPCMFrames
  );
}

export function ma_interleave_pcm_frames(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    frameCount: bigint;
    ppDeinterleavedPCMFrames: Pointer | NodeJS.TypedArray | null;
    pInterleavedPCMFrames: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_interleave_pcm_frames(
    options.format,
    options.channels,
    options.frameCount,
    options.ppDeinterleavedPCMFrames,
    options.pInterleavedPCMFrames
  );
}

export function ma_channel_map_get_channel(
  this: MiniAudio,
  options: {
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channelCount: number;
    channelIndex: number;
  }
): Pointer | null {
  return this.symbols.ma_channel_map_get_channel(
    options.pChannelMap,
    options.channelCount,
    options.channelIndex
  ) as Pointer | null;
}

export function ma_channel_map_init_blank(
  this: MiniAudio,
  options: {
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channels: number;
  }
): void {
  this.symbols.ma_channel_map_init_blank(options.pChannelMap, options.channels);
}

export function ma_channel_map_init_standard(
  this: MiniAudio,
  options: {
    standardChannelMap: Pointer | NodeJS.TypedArray | null;
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channelMapCap: number;
    channels: number;
  }
): void {
  this.symbols.ma_channel_map_init_standard(
    options.standardChannelMap,
    options.pChannelMap,
    options.channelMapCap,
    options.channels
  );
}

export function ma_channel_map_copy(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pIn: Pointer | NodeJS.TypedArray | null;
    channels: number;
  }
): void {
  this.symbols.ma_channel_map_copy(options.pOut, options.pIn, options.channels);
}

export function ma_channel_map_copy_or_default(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    channelMapCapOut: number;
    pIn: Pointer | NodeJS.TypedArray | null;
    channels: number;
  }
): void {
  this.symbols.ma_channel_map_copy_or_default(
    options.pOut,
    options.channelMapCapOut,
    options.pIn,
    options.channels
  );
}

export function ma_channel_map_is_valid(
  this: MiniAudio,
  options: {
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channels: number;
  }
): Pointer | null {
  return this.symbols.ma_channel_map_is_valid(
    options.pChannelMap,
    options.channels
  ) as Pointer | null;
}

export function ma_channel_map_is_equal(
  this: MiniAudio,
  options: {
    pChannelMapA: Pointer | NodeJS.TypedArray | null;
    pChannelMapB: Pointer | NodeJS.TypedArray | null;
    channels: number;
  }
): Pointer | null {
  return this.symbols.ma_channel_map_is_equal(
    options.pChannelMapA,
    options.pChannelMapB,
    options.channels
  ) as Pointer | null;
}

export function ma_channel_map_is_blank(
  this: MiniAudio,
  options: {
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channels: number;
  }
): Pointer | null {
  return this.symbols.ma_channel_map_is_blank(
    options.pChannelMap,
    options.channels
  ) as Pointer | null;
}

export function ma_channel_map_contains_channel_position(
  this: MiniAudio,
  options: {
    channels: number;
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channelPosition: number;
  }
): Pointer | null {
  return this.symbols.ma_channel_map_contains_channel_position(
    options.channels,
    options.pChannelMap,
    options.channelPosition
  ) as Pointer | null;
}

export function ma_channel_map_find_channel_position(
  this: MiniAudio,
  options: {
    channels: number;
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channelPosition: number;
    pChannelIndex: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_channel_map_find_channel_position(
    options.channels,
    options.pChannelMap,
    options.channelPosition,
    options.pChannelIndex
  ) as Pointer | null;
}

export function ma_channel_map_to_string(
  this: MiniAudio,
  options: {
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channels: number;
    pBufferOut: Pointer | NodeJS.TypedArray | null;
    bufferCap: number;
  }
): bigint {
  return this.symbols.ma_channel_map_to_string(
    options.pChannelMap,
    options.channels,
    options.pBufferOut,
    options.bufferCap
  ) as bigint;
}

export function ma_channel_position_to_string(
  this: MiniAudio,
  options: {
    channel: number;
  }
): CString {
  return this.symbols.ma_channel_position_to_string(options.channel) as CString;
}

export function ma_convert_frames(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    frameCountOut: bigint;
    formatOut: Pointer | NodeJS.TypedArray | null;
    channelsOut: number;
    sampleRateOut: number;
    pIn: Pointer | NodeJS.TypedArray | null;
    frameCountIn: bigint;
    formatIn: Pointer | NodeJS.TypedArray | null;
    channelsIn: number;
    sampleRateIn: number;
  }
): Pointer | null {
  return this.symbols.ma_convert_frames(
    options.pOut,
    options.frameCountOut,
    options.formatOut,
    options.channelsOut,
    options.sampleRateOut,
    options.pIn,
    options.frameCountIn,
    options.formatIn,
    options.channelsIn,
    options.sampleRateIn
  ) as Pointer | null;
}

export function ma_convert_frames_ex(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    frameCountOut: bigint;
    pIn: Pointer | NodeJS.TypedArray | null;
    frameCountIn: bigint;
    pConfig: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_convert_frames_ex(
    options.pOut,
    options.frameCountOut,
    options.pIn,
    options.frameCountIn,
    options.pConfig
  ) as Pointer | null;
}

export function ma_data_source_config_init(this: MiniAudio): Pointer | null {
  return this.symbols.ma_data_source_config_init() as Pointer | null;
}

export function ma_data_source_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pDataSource: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_init(
    options.pConfig,
    options.pDataSource
  ) as Pointer | null;
}

export function ma_data_source_uninit(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_data_source_uninit(options.pDataSource);
}

export function ma_data_source_read_pcm_frames(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    pFramesRead: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_read_pcm_frames(
    options.pDataSource,
    options.pFramesOut,
    options.frameCount,
    options.pFramesRead
  ) as Pointer | null;
}

export function ma_data_source_seek_pcm_frames(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    pFramesSeeked: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_seek_pcm_frames(
    options.pDataSource,
    options.frameCount,
    options.pFramesSeeked
  ) as Pointer | null;
}

export function ma_data_source_seek_to_pcm_frame(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    frameIndex: bigint;
  }
): Pointer | null {
  return this.symbols.ma_data_source_seek_to_pcm_frame(
    options.pDataSource,
    options.frameIndex
  ) as Pointer | null;
}

export function ma_data_source_seek_seconds(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    secondCount: number;
    pSecondsSeeked: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_seek_seconds(
    options.pDataSource,
    options.secondCount,
    options.pSecondsSeeked
  ) as Pointer | null;
}

export function ma_data_source_seek_to_second(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    seekPointInSeconds: number;
  }
): Pointer | null {
  return this.symbols.ma_data_source_seek_to_second(
    options.pDataSource,
    options.seekPointInSeconds
  ) as Pointer | null;
}

export function ma_data_source_get_data_format(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    pFormat: Pointer | NodeJS.TypedArray | null;
    pChannels: Pointer | NodeJS.TypedArray | null;
    pSampleRate: Pointer | NodeJS.TypedArray | null;
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channelMapCap: number;
  }
): Pointer | null {
  return this.symbols.ma_data_source_get_data_format(
    options.pDataSource,
    options.pFormat,
    options.pChannels,
    options.pSampleRate,
    options.pChannelMap,
    options.channelMapCap
  ) as Pointer | null;
}

export function ma_data_source_get_cursor_in_pcm_frames(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    pCursor: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_get_cursor_in_pcm_frames(
    options.pDataSource,
    options.pCursor
  ) as Pointer | null;
}

export function ma_data_source_get_length_in_pcm_frames(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    pLength: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_get_length_in_pcm_frames(
    options.pDataSource,
    options.pLength
  ) as Pointer | null;
}

export function ma_data_source_get_cursor_in_seconds(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    pCursor: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_get_cursor_in_seconds(
    options.pDataSource,
    options.pCursor
  ) as Pointer | null;
}

export function ma_data_source_get_length_in_seconds(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    pLength: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_get_length_in_seconds(
    options.pDataSource,
    options.pLength
  ) as Pointer | null;
}

export function ma_data_source_set_looping(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    isLooping: number;
  }
): Pointer | null {
  return this.symbols.ma_data_source_set_looping(
    options.pDataSource,
    options.isLooping
  ) as Pointer | null;
}

export function ma_data_source_is_looping(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_is_looping(
    options.pDataSource
  ) as Pointer | null;
}

export function ma_data_source_set_range_in_pcm_frames(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    rangeBegInFrames: bigint;
    rangeEndInFrames: bigint;
  }
): Pointer | null {
  return this.symbols.ma_data_source_set_range_in_pcm_frames(
    options.pDataSource,
    options.rangeBegInFrames,
    options.rangeEndInFrames
  ) as Pointer | null;
}

export function ma_data_source_get_range_in_pcm_frames(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    pRangeBegInFrames: Pointer | NodeJS.TypedArray | null;
    pRangeEndInFrames: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_data_source_get_range_in_pcm_frames(
    options.pDataSource,
    options.pRangeBegInFrames,
    options.pRangeEndInFrames
  );
}

export function ma_data_source_set_loop_point_in_pcm_frames(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    loopBegInFrames: bigint;
    loopEndInFrames: bigint;
  }
): Pointer | null {
  return this.symbols.ma_data_source_set_loop_point_in_pcm_frames(
    options.pDataSource,
    options.loopBegInFrames,
    options.loopEndInFrames
  ) as Pointer | null;
}

export function ma_data_source_get_loop_point_in_pcm_frames(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    pLoopBegInFrames: Pointer | NodeJS.TypedArray | null;
    pLoopEndInFrames: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_data_source_get_loop_point_in_pcm_frames(
    options.pDataSource,
    options.pLoopBegInFrames,
    options.pLoopEndInFrames
  );
}

export function ma_data_source_set_current(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    pCurrentDataSource: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_set_current(
    options.pDataSource,
    options.pCurrentDataSource
  ) as Pointer | null;
}

export function ma_data_source_get_current(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_get_current(
    options.pDataSource
  ) as Pointer | null;
}

export function ma_data_source_set_next(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    pNextDataSource: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_set_next(
    options.pDataSource,
    options.pNextDataSource
  ) as Pointer | null;
}

export function ma_data_source_get_next(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_get_next(
    options.pDataSource
  ) as Pointer | null;
}

export function ma_data_source_set_next_callback(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    onGetNext: TypedJSCallback<ma_data_source_get_next_proc>;
  }
): Pointer | null {
  return this.symbols.ma_data_source_set_next_callback(
    options.pDataSource,
    options.onGetNext
  ) as Pointer | null;
}

export function ma_data_source_get_next_callback(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_get_next_callback(
    options.pDataSource
  ) as Pointer | null;
}

export function ma_audio_buffer_ref_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    pData: Pointer | NodeJS.TypedArray | null;
    sizeInFrames: bigint;
    pAudioBufferRef: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_ref_init(
    options.format,
    options.channels,
    options.pData,
    options.sizeInFrames,
    options.pAudioBufferRef
  ) as Pointer | null;
}

export function ma_audio_buffer_ref_uninit(
  this: MiniAudio,
  options: {
    pAudioBufferRef: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_audio_buffer_ref_uninit(options.pAudioBufferRef);
}

export function ma_audio_buffer_ref_set_data(
  this: MiniAudio,
  options: {
    pAudioBufferRef: Pointer | NodeJS.TypedArray | null;
    pData: Pointer | NodeJS.TypedArray | null;
    sizeInFrames: bigint;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_ref_set_data(
    options.pAudioBufferRef,
    options.pData,
    options.sizeInFrames
  ) as Pointer | null;
}

export function ma_audio_buffer_ref_read_pcm_frames(
  this: MiniAudio,
  options: {
    pAudioBufferRef: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    loop: number;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_ref_read_pcm_frames(
    options.pAudioBufferRef,
    options.pFramesOut,
    options.frameCount,
    options.loop
  ) as Pointer | null;
}

export function ma_audio_buffer_ref_seek_to_pcm_frame(
  this: MiniAudio,
  options: {
    pAudioBufferRef: Pointer | NodeJS.TypedArray | null;
    frameIndex: bigint;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_ref_seek_to_pcm_frame(
    options.pAudioBufferRef,
    options.frameIndex
  ) as Pointer | null;
}

export function ma_audio_buffer_ref_map(
  this: MiniAudio,
  options: {
    pAudioBufferRef: Pointer | NodeJS.TypedArray | null;
    ppFramesOut: Pointer | NodeJS.TypedArray | null;
    pFrameCount: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_ref_map(
    options.pAudioBufferRef,
    options.ppFramesOut,
    options.pFrameCount
  ) as Pointer | null;
}

export function ma_audio_buffer_ref_unmap(
  this: MiniAudio,
  options: {
    pAudioBufferRef: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_ref_unmap(
    options.pAudioBufferRef,
    options.frameCount
  ) as Pointer | null;
}

export function ma_audio_buffer_ref_at_end(
  this: MiniAudio,
  options: {
    pAudioBufferRef: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_ref_at_end(
    options.pAudioBufferRef
  ) as Pointer | null;
}

export function ma_audio_buffer_ref_get_cursor_in_pcm_frames(
  this: MiniAudio,
  options: {
    pAudioBufferRef: Pointer | NodeJS.TypedArray | null;
    pCursor: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_ref_get_cursor_in_pcm_frames(
    options.pAudioBufferRef,
    options.pCursor
  ) as Pointer | null;
}

export function ma_audio_buffer_ref_get_length_in_pcm_frames(
  this: MiniAudio,
  options: {
    pAudioBufferRef: Pointer | NodeJS.TypedArray | null;
    pLength: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_ref_get_length_in_pcm_frames(
    options.pAudioBufferRef,
    options.pLength
  ) as Pointer | null;
}

export function ma_audio_buffer_ref_get_available_frames(
  this: MiniAudio,
  options: {
    pAudioBufferRef: Pointer | NodeJS.TypedArray | null;
    pAvailableFrames: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_ref_get_available_frames(
    options.pAudioBufferRef,
    options.pAvailableFrames
  ) as Pointer | null;
}

export function ma_audio_buffer_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sizeInFrames: bigint;
    pData: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_config_init(
    options.format,
    options.channels,
    options.sizeInFrames,
    options.pData,
    options.pAllocationCallbacks
  ) as Pointer | null;
}

export function ma_audio_buffer_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAudioBuffer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_init(
    options.pConfig,
    options.pAudioBuffer
  ) as Pointer | null;
}

export function ma_audio_buffer_init_copy(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAudioBuffer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_init_copy(
    options.pConfig,
    options.pAudioBuffer
  ) as Pointer | null;
}

export function ma_audio_buffer_alloc_and_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    ppAudioBuffer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_alloc_and_init(
    options.pConfig,
    options.ppAudioBuffer
  ) as Pointer | null;
}

export function ma_audio_buffer_uninit(
  this: MiniAudio,
  options: {
    pAudioBuffer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_audio_buffer_uninit(options.pAudioBuffer);
}

export function ma_audio_buffer_uninit_and_free(
  this: MiniAudio,
  options: {
    pAudioBuffer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_audio_buffer_uninit_and_free(options.pAudioBuffer);
}

export function ma_audio_buffer_read_pcm_frames(
  this: MiniAudio,
  options: {
    pAudioBuffer: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    loop: number;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_read_pcm_frames(
    options.pAudioBuffer,
    options.pFramesOut,
    options.frameCount,
    options.loop
  ) as Pointer | null;
}

export function ma_audio_buffer_seek_to_pcm_frame(
  this: MiniAudio,
  options: {
    pAudioBuffer: Pointer | NodeJS.TypedArray | null;
    frameIndex: bigint;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_seek_to_pcm_frame(
    options.pAudioBuffer,
    options.frameIndex
  ) as Pointer | null;
}

export function ma_audio_buffer_map(
  this: MiniAudio,
  options: {
    pAudioBuffer: Pointer | NodeJS.TypedArray | null;
    ppFramesOut: Pointer | NodeJS.TypedArray | null;
    pFrameCount: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_map(
    options.pAudioBuffer,
    options.ppFramesOut,
    options.pFrameCount
  ) as Pointer | null;
}

export function ma_audio_buffer_unmap(
  this: MiniAudio,
  options: {
    pAudioBuffer: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_unmap(
    options.pAudioBuffer,
    options.frameCount
  ) as Pointer | null;
}

export function ma_audio_buffer_at_end(
  this: MiniAudio,
  options: {
    pAudioBuffer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_at_end(
    options.pAudioBuffer
  ) as Pointer | null;
}

export function ma_audio_buffer_get_cursor_in_pcm_frames(
  this: MiniAudio,
  options: {
    pAudioBuffer: Pointer | NodeJS.TypedArray | null;
    pCursor: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_get_cursor_in_pcm_frames(
    options.pAudioBuffer,
    options.pCursor
  ) as Pointer | null;
}

export function ma_audio_buffer_get_length_in_pcm_frames(
  this: MiniAudio,
  options: {
    pAudioBuffer: Pointer | NodeJS.TypedArray | null;
    pLength: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_get_length_in_pcm_frames(
    options.pAudioBuffer,
    options.pLength
  ) as Pointer | null;
}

export function ma_audio_buffer_get_available_frames(
  this: MiniAudio,
  options: {
    pAudioBuffer: Pointer | NodeJS.TypedArray | null;
    pAvailableFrames: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_audio_buffer_get_available_frames(
    options.pAudioBuffer,
    options.pAvailableFrames
  ) as Pointer | null;
}

export function ma_paged_audio_buffer_data_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    pData: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_paged_audio_buffer_data_init(
    options.format,
    options.channels,
    options.pData
  ) as Pointer | null;
}

export function ma_paged_audio_buffer_data_uninit(
  this: MiniAudio,
  options: {
    pData: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_paged_audio_buffer_data_uninit(
    options.pData,
    options.pAllocationCallbacks
  );
}

export function ma_paged_audio_buffer_data_get_head(
  this: MiniAudio,
  options: {
    pData: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_paged_audio_buffer_data_get_head(
    options.pData
  ) as Pointer | null;
}

export function ma_paged_audio_buffer_data_get_tail(
  this: MiniAudio,
  options: {
    pData: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_paged_audio_buffer_data_get_tail(
    options.pData
  ) as Pointer | null;
}

export function ma_paged_audio_buffer_data_get_length_in_pcm_frames(
  this: MiniAudio,
  options: {
    pData: Pointer | NodeJS.TypedArray | null;
    pLength: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_paged_audio_buffer_data_get_length_in_pcm_frames(
    options.pData,
    options.pLength
  ) as Pointer | null;
}

export function ma_paged_audio_buffer_data_allocate_page(
  this: MiniAudio,
  options: {
    pData: Pointer | NodeJS.TypedArray | null;
    pageSizeInFrames: bigint;
    pInitialData: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    ppPage: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_paged_audio_buffer_data_allocate_page(
    options.pData,
    options.pageSizeInFrames,
    options.pInitialData,
    options.pAllocationCallbacks,
    options.ppPage
  ) as Pointer | null;
}

export function ma_paged_audio_buffer_data_free_page(
  this: MiniAudio,
  options: {
    pData: Pointer | NodeJS.TypedArray | null;
    pPage: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_paged_audio_buffer_data_free_page(
    options.pData,
    options.pPage,
    options.pAllocationCallbacks
  ) as Pointer | null;
}

export function ma_paged_audio_buffer_data_append_page(
  this: MiniAudio,
  options: {
    pData: Pointer | NodeJS.TypedArray | null;
    pPage: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_paged_audio_buffer_data_append_page(
    options.pData,
    options.pPage
  ) as Pointer | null;
}

export function ma_paged_audio_buffer_data_allocate_and_append_page(
  this: MiniAudio,
  options: {
    pData: Pointer | NodeJS.TypedArray | null;
    pageSizeInFrames: number;
    pInitialData: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_paged_audio_buffer_data_allocate_and_append_page(
    options.pData,
    options.pageSizeInFrames,
    options.pInitialData,
    options.pAllocationCallbacks
  ) as Pointer | null;
}

export function ma_paged_audio_buffer_config_init(
  this: MiniAudio,
  options: {
    pData: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_paged_audio_buffer_config_init(
    options.pData
  ) as Pointer | null;
}

export function ma_paged_audio_buffer_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pPagedAudioBuffer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_paged_audio_buffer_init(
    options.pConfig,
    options.pPagedAudioBuffer
  ) as Pointer | null;
}

export function ma_paged_audio_buffer_uninit(
  this: MiniAudio,
  options: {
    pPagedAudioBuffer: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_paged_audio_buffer_uninit(options.pPagedAudioBuffer);
}

export function ma_paged_audio_buffer_read_pcm_frames(
  this: MiniAudio,
  options: {
    pPagedAudioBuffer: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    pFramesRead: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_paged_audio_buffer_read_pcm_frames(
    options.pPagedAudioBuffer,
    options.pFramesOut,
    options.frameCount,
    options.pFramesRead
  ) as Pointer | null;
}

export function ma_paged_audio_buffer_seek_to_pcm_frame(
  this: MiniAudio,
  options: {
    pPagedAudioBuffer: Pointer | NodeJS.TypedArray | null;
    frameIndex: bigint;
  }
): Pointer | null {
  return this.symbols.ma_paged_audio_buffer_seek_to_pcm_frame(
    options.pPagedAudioBuffer,
    options.frameIndex
  ) as Pointer | null;
}

export function ma_paged_audio_buffer_get_cursor_in_pcm_frames(
  this: MiniAudio,
  options: {
    pPagedAudioBuffer: Pointer | NodeJS.TypedArray | null;
    pCursor: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_paged_audio_buffer_get_cursor_in_pcm_frames(
    options.pPagedAudioBuffer,
    options.pCursor
  ) as Pointer | null;
}

export function ma_paged_audio_buffer_get_length_in_pcm_frames(
  this: MiniAudio,
  options: {
    pPagedAudioBuffer: Pointer | NodeJS.TypedArray | null;
    pLength: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_paged_audio_buffer_get_length_in_pcm_frames(
    options.pPagedAudioBuffer,
    options.pLength
  ) as Pointer | null;
}

export function ma_rb_init_ex(
  this: MiniAudio,
  options: {
    subbufferSizeInBytes: number;
    subbufferCount: number;
    subbufferStrideInBytes: number;
    pOptionalPreallocatedBuffer: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_rb_init_ex(
    options.subbufferSizeInBytes,
    options.subbufferCount,
    options.subbufferStrideInBytes,
    options.pOptionalPreallocatedBuffer,
    options.pAllocationCallbacks,
    options.pRB
  ) as Pointer | null;
}

export function ma_rb_init(
  this: MiniAudio,
  options: {
    bufferSizeInBytes: number;
    pOptionalPreallocatedBuffer: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_rb_init(
    options.bufferSizeInBytes,
    options.pOptionalPreallocatedBuffer,
    options.pAllocationCallbacks,
    options.pRB
  ) as Pointer | null;
}

export function ma_rb_uninit(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_rb_uninit(options.pRB);
}

export function ma_rb_reset(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_rb_reset(options.pRB);
}

export function ma_rb_acquire_read(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    pSizeInBytes: Pointer | NodeJS.TypedArray | null;
    ppBufferOut: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_rb_acquire_read(
    options.pRB,
    options.pSizeInBytes,
    options.ppBufferOut
  ) as Pointer | null;
}

export function ma_rb_commit_read(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    sizeInBytes: number;
  }
): Pointer | null {
  return this.symbols.ma_rb_commit_read(
    options.pRB,
    options.sizeInBytes
  ) as Pointer | null;
}

export function ma_rb_acquire_write(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    pSizeInBytes: Pointer | NodeJS.TypedArray | null;
    ppBufferOut: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_rb_acquire_write(
    options.pRB,
    options.pSizeInBytes,
    options.ppBufferOut
  ) as Pointer | null;
}

export function ma_rb_commit_write(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    sizeInBytes: number;
  }
): Pointer | null {
  return this.symbols.ma_rb_commit_write(
    options.pRB,
    options.sizeInBytes
  ) as Pointer | null;
}

export function ma_rb_seek_read(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    offsetInBytes: number;
  }
): Pointer | null {
  return this.symbols.ma_rb_seek_read(
    options.pRB,
    options.offsetInBytes
  ) as Pointer | null;
}

export function ma_rb_seek_write(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    offsetInBytes: number;
  }
): Pointer | null {
  return this.symbols.ma_rb_seek_write(
    options.pRB,
    options.offsetInBytes
  ) as Pointer | null;
}

export function ma_rb_pointer_distance(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_rb_pointer_distance(options.pRB) as Pointer | null;
}

export function ma_rb_available_read(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_rb_available_read(options.pRB) as Pointer | null;
}

export function ma_rb_available_write(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_rb_available_write(options.pRB) as Pointer | null;
}

export function ma_rb_get_subbuffer_size(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): bigint {
  return this.symbols.ma_rb_get_subbuffer_size(options.pRB) as bigint;
}

export function ma_rb_get_subbuffer_stride(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): bigint {
  return this.symbols.ma_rb_get_subbuffer_stride(options.pRB) as bigint;
}

export function ma_rb_get_subbuffer_offset(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    subbufferIndex: number;
  }
): bigint {
  return this.symbols.ma_rb_get_subbuffer_offset(
    options.pRB,
    options.subbufferIndex
  ) as bigint;
}

export function ma_rb_get_subbuffer_ptr(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    subbufferIndex: number;
    pBuffer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_rb_get_subbuffer_ptr(
    options.pRB,
    options.subbufferIndex,
    options.pBuffer
  ) as Pointer | null;
}

export function ma_pcm_rb_init_ex(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    subbufferSizeInFrames: number;
    subbufferCount: number;
    subbufferStrideInFrames: number;
    pOptionalPreallocatedBuffer: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_init_ex(
    options.format,
    options.channels,
    options.subbufferSizeInFrames,
    options.subbufferCount,
    options.subbufferStrideInFrames,
    options.pOptionalPreallocatedBuffer,
    options.pAllocationCallbacks,
    options.pRB
  ) as Pointer | null;
}

export function ma_pcm_rb_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    bufferSizeInFrames: number;
    pOptionalPreallocatedBuffer: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_init(
    options.format,
    options.channels,
    options.bufferSizeInFrames,
    options.pOptionalPreallocatedBuffer,
    options.pAllocationCallbacks,
    options.pRB
  ) as Pointer | null;
}

export function ma_pcm_rb_uninit(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_rb_uninit(options.pRB);
}

export function ma_pcm_rb_reset(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pcm_rb_reset(options.pRB);
}

export function ma_pcm_rb_acquire_read(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    pSizeInFrames: Pointer | NodeJS.TypedArray | null;
    ppBufferOut: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_acquire_read(
    options.pRB,
    options.pSizeInFrames,
    options.ppBufferOut
  ) as Pointer | null;
}

export function ma_pcm_rb_commit_read(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    sizeInFrames: number;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_commit_read(
    options.pRB,
    options.sizeInFrames
  ) as Pointer | null;
}

export function ma_pcm_rb_acquire_write(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    pSizeInFrames: Pointer | NodeJS.TypedArray | null;
    ppBufferOut: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_acquire_write(
    options.pRB,
    options.pSizeInFrames,
    options.ppBufferOut
  ) as Pointer | null;
}

export function ma_pcm_rb_commit_write(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    sizeInFrames: number;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_commit_write(
    options.pRB,
    options.sizeInFrames
  ) as Pointer | null;
}

export function ma_pcm_rb_seek_read(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    offsetInFrames: number;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_seek_read(
    options.pRB,
    options.offsetInFrames
  ) as Pointer | null;
}

export function ma_pcm_rb_seek_write(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    offsetInFrames: number;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_seek_write(
    options.pRB,
    options.offsetInFrames
  ) as Pointer | null;
}

export function ma_pcm_rb_pointer_distance(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_pointer_distance(options.pRB) as Pointer | null;
}

export function ma_pcm_rb_available_read(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_available_read(options.pRB) as Pointer | null;
}

export function ma_pcm_rb_available_write(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_available_write(options.pRB) as Pointer | null;
}

export function ma_pcm_rb_get_subbuffer_size(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_get_subbuffer_size(
    options.pRB
  ) as Pointer | null;
}

export function ma_pcm_rb_get_subbuffer_stride(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_get_subbuffer_stride(
    options.pRB
  ) as Pointer | null;
}

export function ma_pcm_rb_get_subbuffer_offset(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    subbufferIndex: number;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_get_subbuffer_offset(
    options.pRB,
    options.subbufferIndex
  ) as Pointer | null;
}

export function ma_pcm_rb_get_subbuffer_ptr(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    subbufferIndex: number;
    pBuffer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_get_subbuffer_ptr(
    options.pRB,
    options.subbufferIndex,
    options.pBuffer
  ) as Pointer | null;
}

export function ma_pcm_rb_get_format(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_get_format(options.pRB) as Pointer | null;
}

export function ma_pcm_rb_get_channels(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_get_channels(options.pRB) as Pointer | null;
}

export function ma_pcm_rb_get_sample_rate(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_pcm_rb_get_sample_rate(options.pRB) as Pointer | null;
}

export function ma_pcm_rb_set_sample_rate(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
    sampleRate: number;
  }
): void {
  this.symbols.ma_pcm_rb_set_sample_rate(options.pRB, options.sampleRate);
}

export function ma_duplex_rb_init(
  this: MiniAudio,
  options: {
    captureFormat: Pointer | NodeJS.TypedArray | null;
    captureChannels: number;
    sampleRate: number;
    captureInternalSampleRate: number;
    captureInternalPeriodSizeInFrames: number;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_duplex_rb_init(
    options.captureFormat,
    options.captureChannels,
    options.sampleRate,
    options.captureInternalSampleRate,
    options.captureInternalPeriodSizeInFrames,
    options.pAllocationCallbacks,
    options.pRB
  ) as Pointer | null;
}

export function ma_duplex_rb_uninit(
  this: MiniAudio,
  options: {
    pRB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_duplex_rb_uninit(options.pRB) as Pointer | null;
}

export function ma_result_description(
  this: MiniAudio,
  options: {
    result: Pointer | NodeJS.TypedArray | null;
  }
): CString {
  return this.symbols.ma_result_description(options.result) as CString;
}

export function ma_malloc(
  this: MiniAudio,
  options: {
    sz: number;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_malloc(
    options.sz,
    options.pAllocationCallbacks
  ) as Pointer | null;
}

export function ma_calloc(
  this: MiniAudio,
  options: {
    sz: number;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_calloc(
    options.sz,
    options.pAllocationCallbacks
  ) as Pointer | null;
}

export function ma_realloc(
  this: MiniAudio,
  options: {
    p: Pointer | NodeJS.TypedArray | null;
    sz: number;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_realloc(
    options.p,
    options.sz,
    options.pAllocationCallbacks
  ) as Pointer | null;
}

export function ma_free(
  this: MiniAudio,
  options: {
    p: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_free(options.p, options.pAllocationCallbacks);
}

export function ma_aligned_malloc(
  this: MiniAudio,
  options: {
    sz: number;
    alignment: number;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_aligned_malloc(
    options.sz,
    options.alignment,
    options.pAllocationCallbacks
  ) as Pointer | null;
}

export function ma_aligned_free(
  this: MiniAudio,
  options: {
    p: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_aligned_free(options.p, options.pAllocationCallbacks);
}

export function ma_get_format_name(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
  }
): CString {
  return this.symbols.ma_get_format_name(options.format) as CString;
}

export function ma_blend_f32(
  this: MiniAudio,
  options: {
    pOut: Pointer | NodeJS.TypedArray | null;
    pInA: Pointer | NodeJS.TypedArray | null;
    pInB: Pointer | NodeJS.TypedArray | null;
    factor: number;
    channels: number;
  }
): void {
  this.symbols.ma_blend_f32(
    options.pOut,
    options.pInA,
    options.pInB,
    options.factor,
    options.channels
  );
}

export function ma_get_bytes_per_sample(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_get_bytes_per_sample(options.format) as Pointer | null;
}

export function ma_log_level_to_string(
  this: MiniAudio,
  options: {
    logLevel: number;
  }
): CString {
  return this.symbols.ma_log_level_to_string(options.logLevel) as CString;
}

export function ma_spinlock_lock(
  this: MiniAudio,
  options: {
    pSpinlock: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spinlock_lock(options.pSpinlock) as Pointer | null;
}

export function ma_spinlock_lock_noyield(
  this: MiniAudio,
  options: {
    pSpinlock: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spinlock_lock_noyield(
    options.pSpinlock
  ) as Pointer | null;
}

export function ma_spinlock_unlock(
  this: MiniAudio,
  options: {
    pSpinlock: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_spinlock_unlock(options.pSpinlock) as Pointer | null;
}

export function ma_mutex_init(
  this: MiniAudio,
  options: {
    pMutex: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_mutex_init(options.pMutex) as Pointer | null;
}

export function ma_mutex_uninit(
  this: MiniAudio,
  options: {
    pMutex: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_mutex_uninit(options.pMutex);
}

export function ma_mutex_lock(
  this: MiniAudio,
  options: {
    pMutex: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_mutex_lock(options.pMutex);
}

export function ma_mutex_unlock(
  this: MiniAudio,
  options: {
    pMutex: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_mutex_unlock(options.pMutex);
}

export function ma_event_init(
  this: MiniAudio,
  options: {
    pEvent: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_event_init(options.pEvent) as Pointer | null;
}

export function ma_event_uninit(
  this: MiniAudio,
  options: {
    pEvent: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_event_uninit(options.pEvent);
}

export function ma_event_wait(
  this: MiniAudio,
  options: {
    pEvent: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_event_wait(options.pEvent) as Pointer | null;
}

export function ma_event_signal(
  this: MiniAudio,
  options: {
    pEvent: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_event_signal(options.pEvent) as Pointer | null;
}

export function ma_semaphore_init(
  this: MiniAudio,
  options: {
    initialValue: number;
    pSemaphore: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_semaphore_init(
    options.initialValue,
    options.pSemaphore
  ) as Pointer | null;
}

export function ma_semaphore_uninit(
  this: MiniAudio,
  options: {
    pSemaphore: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_semaphore_uninit(options.pSemaphore);
}

export function ma_semaphore_wait(
  this: MiniAudio,
  options: {
    pSemaphore: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_semaphore_wait(options.pSemaphore) as Pointer | null;
}

export function ma_semaphore_release(
  this: MiniAudio,
  options: {
    pSemaphore: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_semaphore_release(
    options.pSemaphore
  ) as Pointer | null;
}

export function ma_fence_init(
  this: MiniAudio,
  options: {
    pFence: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_fence_init(options.pFence) as Pointer | null;
}

export function ma_fence_uninit(
  this: MiniAudio,
  options: {
    pFence: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_fence_uninit(options.pFence);
}

export function ma_fence_acquire(
  this: MiniAudio,
  options: {
    pFence: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_fence_acquire(options.pFence) as Pointer | null;
}

export function ma_fence_release(
  this: MiniAudio,
  options: {
    pFence: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_fence_release(options.pFence) as Pointer | null;
}

export function ma_fence_wait(
  this: MiniAudio,
  options: {
    pFence: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_fence_wait(options.pFence) as Pointer | null;
}

export function ma_async_notification_signal(
  this: MiniAudio,
  options: {
    pNotification: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_async_notification_signal(
    options.pNotification
  ) as Pointer | null;
}

export function ma_async_notification_poll_init(
  this: MiniAudio,
  options: {
    pNotificationPoll: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_async_notification_poll_init(
    options.pNotificationPoll
  ) as Pointer | null;
}

export function ma_async_notification_poll_is_signalled(
  this: MiniAudio,
  options: {
    pNotificationPoll: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_async_notification_poll_is_signalled(
    options.pNotificationPoll
  ) as Pointer | null;
}

export function ma_async_notification_event_init(
  this: MiniAudio,
  options: {
    pNotificationEvent: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_async_notification_event_init(
    options.pNotificationEvent
  ) as Pointer | null;
}

export function ma_async_notification_event_uninit(
  this: MiniAudio,
  options: {
    pNotificationEvent: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_async_notification_event_uninit(
    options.pNotificationEvent
  ) as Pointer | null;
}

export function ma_async_notification_event_wait(
  this: MiniAudio,
  options: {
    pNotificationEvent: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_async_notification_event_wait(
    options.pNotificationEvent
  ) as Pointer | null;
}

export function ma_async_notification_event_signal(
  this: MiniAudio,
  options: {
    pNotificationEvent: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_async_notification_event_signal(
    options.pNotificationEvent
  ) as Pointer | null;
}

export function ma_slot_allocator_config_init(
  this: MiniAudio,
  options: {
    capacity: number;
  }
): Pointer | null {
  return this.symbols.ma_slot_allocator_config_init(
    options.capacity
  ) as Pointer | null;
}

export function ma_slot_allocator_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_slot_allocator_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_slot_allocator_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pAllocator: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_slot_allocator_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pAllocator
  ) as Pointer | null;
}

export function ma_slot_allocator_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pAllocator: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_slot_allocator_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pAllocator
  ) as Pointer | null;
}

export function ma_slot_allocator_uninit(
  this: MiniAudio,
  options: {
    pAllocator: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_slot_allocator_uninit(
    options.pAllocator,
    options.pAllocationCallbacks
  );
}

export function ma_slot_allocator_alloc(
  this: MiniAudio,
  options: {
    pAllocator: Pointer | NodeJS.TypedArray | null;
    pSlot: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_slot_allocator_alloc(
    options.pAllocator,
    options.pSlot
  ) as Pointer | null;
}

export function ma_slot_allocator_free(
  this: MiniAudio,
  options: {
    pAllocator: Pointer | NodeJS.TypedArray | null;
    slot: bigint;
  }
): Pointer | null {
  return this.symbols.ma_slot_allocator_free(
    options.pAllocator,
    options.slot
  ) as Pointer | null;
}

export function ma_job_init(
  this: MiniAudio,
  options: {
    code: number;
  }
): Pointer | null {
  return this.symbols.ma_job_init(options.code) as Pointer | null;
}

export function ma_job_process(
  this: MiniAudio,
  options: {
    pJob: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_job_process(options.pJob) as Pointer | null;
}

export function ma_job_queue_config_init(
  this: MiniAudio,
  options: {
    flags: number;
    capacity: number;
  }
): Pointer | null {
  return this.symbols.ma_job_queue_config_init(
    options.flags,
    options.capacity
  ) as Pointer | null;
}

export function ma_job_queue_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_job_queue_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_job_queue_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pQueue: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_job_queue_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pQueue
  ) as Pointer | null;
}

export function ma_job_queue_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pQueue: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_job_queue_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pQueue
  ) as Pointer | null;
}

export function ma_job_queue_uninit(
  this: MiniAudio,
  options: {
    pQueue: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_job_queue_uninit(
    options.pQueue,
    options.pAllocationCallbacks
  );
}

export function ma_job_queue_post(
  this: MiniAudio,
  options: {
    pQueue: Pointer | NodeJS.TypedArray | null;
    pJob: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_job_queue_post(
    options.pQueue,
    options.pJob
  ) as Pointer | null;
}

export function ma_job_queue_next(
  this: MiniAudio,
  options: {
    pQueue: Pointer | NodeJS.TypedArray | null;
    pJob: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_job_queue_next(
    options.pQueue,
    options.pJob
  ) as Pointer | null;
}

export function ma_device_job_thread_config_init(
  this: MiniAudio
): Pointer | null {
  return this.symbols.ma_device_job_thread_config_init() as Pointer | null;
}

export function ma_device_job_thread_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pJobThread: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_job_thread_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pJobThread
  ) as Pointer | null;
}

export function ma_device_job_thread_uninit(
  this: MiniAudio,
  options: {
    pJobThread: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_device_job_thread_uninit(
    options.pJobThread,
    options.pAllocationCallbacks
  );
}

export function ma_device_job_thread_post(
  this: MiniAudio,
  options: {
    pJobThread: Pointer | NodeJS.TypedArray | null;
    pJob: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_job_thread_post(
    options.pJobThread,
    options.pJob
  ) as Pointer | null;
}

export function ma_device_job_thread_next(
  this: MiniAudio,
  options: {
    pJobThread: Pointer | NodeJS.TypedArray | null;
    pJob: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_job_thread_next(
    options.pJobThread,
    options.pJob
  ) as Pointer | null;
}

export function ma_device_id_equal(
  this: MiniAudio,
  options: {
    pA: Pointer | NodeJS.TypedArray | null;
    pB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_id_equal(
    options.pA,
    options.pB
  ) as Pointer | null;
}

export function ma_context_config_init(this: MiniAudio): Pointer | null {
  return this.symbols.ma_context_config_init() as Pointer | null;
}

export function ma_context_init(
  this: MiniAudio,
  options: {
    backends: Pointer | NodeJS.TypedArray | null;
    backendCount: number;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pContext: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_context_init(
    options.backends,
    options.backendCount,
    options.pConfig,
    options.pContext
  ) as Pointer | null;
}

export function ma_context_uninit(
  this: MiniAudio,
  options: {
    pContext: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_context_uninit(options.pContext) as Pointer | null;
}

export function ma_context_sizeof(this: MiniAudio): bigint {
  return this.symbols.ma_context_sizeof() as bigint;
}

export function ma_context_get_log(
  this: MiniAudio,
  options: {
    pContext: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_context_get_log(options.pContext) as Pointer | null;
}

export function ma_context_enumerate_devices(
  this: MiniAudio,
  options: {
    pContext: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<ma_enum_devices_callback_proc>;
    pUserData: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_context_enumerate_devices(
    options.pContext,
    options.callback,
    options.pUserData
  ) as Pointer | null;
}

export function ma_context_get_devices(
  this: MiniAudio,
  options: {
    pContext: Pointer | NodeJS.TypedArray | null;
    ppPlaybackDeviceInfos: Pointer | NodeJS.TypedArray | null;
    pPlaybackDeviceCount: Pointer | NodeJS.TypedArray | null;
    ppCaptureDeviceInfos: Pointer | NodeJS.TypedArray | null;
    pCaptureDeviceCount: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_context_get_devices(
    options.pContext,
    options.ppPlaybackDeviceInfos,
    options.pPlaybackDeviceCount,
    options.ppCaptureDeviceInfos,
    options.pCaptureDeviceCount
  ) as Pointer | null;
}

export function ma_context_get_device_info(
  this: MiniAudio,
  options: {
    pContext: Pointer | NodeJS.TypedArray | null;
    deviceType: Pointer | NodeJS.TypedArray | null;
    pDeviceID: Pointer | NodeJS.TypedArray | null;
    pDeviceInfo: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_context_get_device_info(
    options.pContext,
    options.deviceType,
    options.pDeviceID,
    options.pDeviceInfo
  ) as Pointer | null;
}

export function ma_context_is_loopback_supported(
  this: MiniAudio,
  options: {
    pContext: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_context_is_loopback_supported(
    options.pContext
  ) as Pointer | null;
}

export function ma_device_config_init(
  this: MiniAudio,
  options: {
    deviceType: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_config_init(
    options.deviceType
  ) as Pointer | null;
}

export function ma_device_init(
  this: MiniAudio,
  options: {
    pContext: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pDevice: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_init(
    options.pContext,
    options.pConfig,
    options.pDevice
  ) as Pointer | null;
}

export function ma_device_init_ex(
  this: MiniAudio,
  options: {
    backends: Pointer | NodeJS.TypedArray | null;
    backendCount: number;
    pContextConfig: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pDevice: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_init_ex(
    options.backends,
    options.backendCount,
    options.pContextConfig,
    options.pConfig,
    options.pDevice
  ) as Pointer | null;
}

export function ma_device_uninit(
  this: MiniAudio,
  options: {
    pDevice: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_device_uninit(options.pDevice);
}

export function ma_device_get_context(
  this: MiniAudio,
  options: {
    pDevice: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_get_context(options.pDevice) as Pointer | null;
}

export function ma_device_get_log(
  this: MiniAudio,
  options: {
    pDevice: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_get_log(options.pDevice) as Pointer | null;
}

export function ma_device_get_info(
  this: MiniAudio,
  options: {
    pDevice: Pointer | NodeJS.TypedArray | null;
    type: Pointer | NodeJS.TypedArray | null;
    pDeviceInfo: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_get_info(
    options.pDevice,
    options.type,
    options.pDeviceInfo
  ) as Pointer | null;
}

export function ma_device_get_name(
  this: MiniAudio,
  options: {
    pDevice: Pointer | NodeJS.TypedArray | null;
    type: Pointer | NodeJS.TypedArray | null;
    pName: Pointer | NodeJS.TypedArray | null;
    nameCap: number;
    pLengthNotIncludingNullTerminator: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_get_name(
    options.pDevice,
    options.type,
    options.pName,
    options.nameCap,
    options.pLengthNotIncludingNullTerminator
  ) as Pointer | null;
}

export function ma_device_start(
  this: MiniAudio,
  options: {
    pDevice: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_start(options.pDevice) as Pointer | null;
}

export function ma_device_stop(
  this: MiniAudio,
  options: {
    pDevice: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_stop(options.pDevice) as Pointer | null;
}

export function ma_device_is_started(
  this: MiniAudio,
  options: {
    pDevice: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_is_started(options.pDevice) as Pointer | null;
}

export function ma_device_get_state(
  this: MiniAudio,
  options: {
    pDevice: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_get_state(options.pDevice) as Pointer | null;
}

export function ma_device_post_init(
  this: MiniAudio,
  options: {
    pDevice: Pointer | NodeJS.TypedArray | null;
    deviceType: Pointer | NodeJS.TypedArray | null;
    pPlaybackDescriptor: Pointer | NodeJS.TypedArray | null;
    pCaptureDescriptor: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_post_init(
    options.pDevice,
    options.deviceType,
    options.pPlaybackDescriptor,
    options.pCaptureDescriptor
  ) as Pointer | null;
}

export function ma_device_set_master_volume(
  this: MiniAudio,
  options: {
    pDevice: Pointer | NodeJS.TypedArray | null;
    volume: number;
  }
): Pointer | null {
  return this.symbols.ma_device_set_master_volume(
    options.pDevice,
    options.volume
  ) as Pointer | null;
}

export function ma_device_get_master_volume(
  this: MiniAudio,
  options: {
    pDevice: Pointer | NodeJS.TypedArray | null;
    pVolume: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_get_master_volume(
    options.pDevice,
    options.pVolume
  ) as Pointer | null;
}

export function ma_device_set_master_volume_db(
  this: MiniAudio,
  options: {
    pDevice: Pointer | NodeJS.TypedArray | null;
    gainDB: number;
  }
): Pointer | null {
  return this.symbols.ma_device_set_master_volume_db(
    options.pDevice,
    options.gainDB
  ) as Pointer | null;
}

export function ma_device_get_master_volume_db(
  this: MiniAudio,
  options: {
    pDevice: Pointer | NodeJS.TypedArray | null;
    pGainDB: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_device_get_master_volume_db(
    options.pDevice,
    options.pGainDB
  ) as Pointer | null;
}

export function ma_device_handle_backend_data_callback(
  this: MiniAudio,
  options: {
    pDevice: Pointer | NodeJS.TypedArray | null;
    pOutput: Pointer | NodeJS.TypedArray | null;
    pInput: Pointer | NodeJS.TypedArray | null;
    frameCount: number;
  }
): Pointer | null {
  return this.symbols.ma_device_handle_backend_data_callback(
    options.pDevice,
    options.pOutput,
    options.pInput,
    options.frameCount
  ) as Pointer | null;
}

export function ma_calculate_buffer_size_in_frames_from_descriptor(
  this: MiniAudio,
  options: {
    pDescriptor: Pointer | NodeJS.TypedArray | null;
    nativeSampleRate: number;
    performanceProfile: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_calculate_buffer_size_in_frames_from_descriptor(
    options.pDescriptor,
    options.nativeSampleRate,
    options.performanceProfile
  ) as Pointer | null;
}

export function ma_get_backend_name(
  this: MiniAudio,
  options: {
    backend: Pointer | NodeJS.TypedArray | null;
  }
): CString {
  return this.symbols.ma_get_backend_name(options.backend) as CString;
}

export function ma_get_backend_from_name(
  this: MiniAudio,
  options: {
    pBackendName: string;
    pBackend: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_get_backend_from_name(
    stringToCString(options.pBackendName).ptr,
    options.pBackend
  ) as Pointer | null;
}

export function ma_is_backend_enabled(
  this: MiniAudio,
  options: {
    backend: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_is_backend_enabled(options.backend) as Pointer | null;
}

export function ma_get_enabled_backends(
  this: MiniAudio,
  options: {
    pBackends: Pointer | NodeJS.TypedArray | null;
    backendCap: number;
    pBackendCount: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_get_enabled_backends(
    options.pBackends,
    options.backendCap,
    options.pBackendCount
  ) as Pointer | null;
}

export function ma_is_loopback_supported(
  this: MiniAudio,
  options: {
    backend: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_is_loopback_supported(
    options.backend
  ) as Pointer | null;
}

export function ma_calculate_buffer_size_in_milliseconds_from_frames(
  this: MiniAudio,
  options: {
    bufferSizeInFrames: number;
    sampleRate: number;
  }
): Pointer | null {
  return this.symbols.ma_calculate_buffer_size_in_milliseconds_from_frames(
    options.bufferSizeInFrames,
    options.sampleRate
  ) as Pointer | null;
}

export function ma_calculate_buffer_size_in_frames_from_milliseconds(
  this: MiniAudio,
  options: {
    bufferSizeInMilliseconds: number;
    sampleRate: number;
  }
): Pointer | null {
  return this.symbols.ma_calculate_buffer_size_in_frames_from_milliseconds(
    options.bufferSizeInMilliseconds,
    options.sampleRate
  ) as Pointer | null;
}

export function ma_copy_pcm_frames(
  this: MiniAudio,
  options: {
    dst: Pointer | NodeJS.TypedArray | null;
    src: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
  }
): void {
  this.symbols.ma_copy_pcm_frames(
    options.dst,
    options.src,
    options.frameCount,
    options.format,
    options.channels
  );
}

export function ma_silence_pcm_frames(
  this: MiniAudio,
  options: {
    p: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
  }
): void {
  this.symbols.ma_silence_pcm_frames(
    options.p,
    options.frameCount,
    options.format,
    options.channels
  );
}

export function ma_offset_pcm_frames_ptr(
  this: MiniAudio,
  options: {
    p: Pointer | NodeJS.TypedArray | null;
    offsetInFrames: bigint;
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
  }
): Pointer | null {
  return this.symbols.ma_offset_pcm_frames_ptr(
    options.p,
    options.offsetInFrames,
    options.format,
    options.channels
  ) as Pointer | null;
}

export function ma_offset_pcm_frames_const_ptr(
  this: MiniAudio,
  options: {
    p: Pointer | NodeJS.TypedArray | null;
    offsetInFrames: bigint;
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
  }
): Pointer | null {
  return this.symbols.ma_offset_pcm_frames_const_ptr(
    options.p,
    options.offsetInFrames,
    options.format,
    options.channels
  ) as Pointer | null;
}

export function ma_clip_samples_u8(
  this: MiniAudio,
  options: {
    pDst: Pointer | NodeJS.TypedArray | null;
    pSrc: Pointer | NodeJS.TypedArray | null;
    count: bigint;
  }
): void {
  this.symbols.ma_clip_samples_u8(options.pDst, options.pSrc, options.count);
}

export function ma_clip_samples_s16(
  this: MiniAudio,
  options: {
    pDst: Pointer | NodeJS.TypedArray | null;
    pSrc: Pointer | NodeJS.TypedArray | null;
    count: bigint;
  }
): void {
  this.symbols.ma_clip_samples_s16(options.pDst, options.pSrc, options.count);
}

export function ma_clip_samples_s24(
  this: MiniAudio,
  options: {
    pDst: Pointer | NodeJS.TypedArray | null;
    pSrc: Pointer | NodeJS.TypedArray | null;
    count: bigint;
  }
): void {
  this.symbols.ma_clip_samples_s24(options.pDst, options.pSrc, options.count);
}

export function ma_clip_samples_s32(
  this: MiniAudio,
  options: {
    pDst: Pointer | NodeJS.TypedArray | null;
    pSrc: Pointer | NodeJS.TypedArray | null;
    count: bigint;
  }
): void {
  this.symbols.ma_clip_samples_s32(options.pDst, options.pSrc, options.count);
}

export function ma_clip_samples_f32(
  this: MiniAudio,
  options: {
    pDst: Pointer | NodeJS.TypedArray | null;
    pSrc: Pointer | NodeJS.TypedArray | null;
    count: bigint;
  }
): void {
  this.symbols.ma_clip_samples_f32(options.pDst, options.pSrc, options.count);
}

export function ma_clip_pcm_frames(
  this: MiniAudio,
  options: {
    pDst: Pointer | NodeJS.TypedArray | null;
    pSrc: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
  }
): void {
  this.symbols.ma_clip_pcm_frames(
    options.pDst,
    options.pSrc,
    options.frameCount,
    options.format,
    options.channels
  );
}

export function ma_copy_and_apply_volume_factor_u8(
  this: MiniAudio,
  options: {
    pSamplesOut: Pointer | NodeJS.TypedArray | null;
    pSamplesIn: Pointer | NodeJS.TypedArray | null;
    sampleCount: bigint;
    factor: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_factor_u8(
    options.pSamplesOut,
    options.pSamplesIn,
    options.sampleCount,
    options.factor
  );
}

export function ma_copy_and_apply_volume_factor_s16(
  this: MiniAudio,
  options: {
    pSamplesOut: Pointer | NodeJS.TypedArray | null;
    pSamplesIn: Pointer | NodeJS.TypedArray | null;
    sampleCount: bigint;
    factor: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_factor_s16(
    options.pSamplesOut,
    options.pSamplesIn,
    options.sampleCount,
    options.factor
  );
}

export function ma_copy_and_apply_volume_factor_s24(
  this: MiniAudio,
  options: {
    pSamplesOut: Pointer | NodeJS.TypedArray | null;
    pSamplesIn: Pointer | NodeJS.TypedArray | null;
    sampleCount: bigint;
    factor: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_factor_s24(
    options.pSamplesOut,
    options.pSamplesIn,
    options.sampleCount,
    options.factor
  );
}

export function ma_copy_and_apply_volume_factor_s32(
  this: MiniAudio,
  options: {
    pSamplesOut: Pointer | NodeJS.TypedArray | null;
    pSamplesIn: Pointer | NodeJS.TypedArray | null;
    sampleCount: bigint;
    factor: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_factor_s32(
    options.pSamplesOut,
    options.pSamplesIn,
    options.sampleCount,
    options.factor
  );
}

export function ma_copy_and_apply_volume_factor_f32(
  this: MiniAudio,
  options: {
    pSamplesOut: Pointer | NodeJS.TypedArray | null;
    pSamplesIn: Pointer | NodeJS.TypedArray | null;
    sampleCount: bigint;
    factor: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_factor_f32(
    options.pSamplesOut,
    options.pSamplesIn,
    options.sampleCount,
    options.factor
  );
}

export function ma_apply_volume_factor_u8(
  this: MiniAudio,
  options: {
    pSamples: Pointer | NodeJS.TypedArray | null;
    sampleCount: bigint;
    factor: number;
  }
): void {
  this.symbols.ma_apply_volume_factor_u8(
    options.pSamples,
    options.sampleCount,
    options.factor
  );
}

export function ma_apply_volume_factor_s16(
  this: MiniAudio,
  options: {
    pSamples: Pointer | NodeJS.TypedArray | null;
    sampleCount: bigint;
    factor: number;
  }
): void {
  this.symbols.ma_apply_volume_factor_s16(
    options.pSamples,
    options.sampleCount,
    options.factor
  );
}

export function ma_apply_volume_factor_s24(
  this: MiniAudio,
  options: {
    pSamples: Pointer | NodeJS.TypedArray | null;
    sampleCount: bigint;
    factor: number;
  }
): void {
  this.symbols.ma_apply_volume_factor_s24(
    options.pSamples,
    options.sampleCount,
    options.factor
  );
}

export function ma_apply_volume_factor_s32(
  this: MiniAudio,
  options: {
    pSamples: Pointer | NodeJS.TypedArray | null;
    sampleCount: bigint;
    factor: number;
  }
): void {
  this.symbols.ma_apply_volume_factor_s32(
    options.pSamples,
    options.sampleCount,
    options.factor
  );
}

export function ma_apply_volume_factor_f32(
  this: MiniAudio,
  options: {
    pSamples: Pointer | NodeJS.TypedArray | null;
    sampleCount: bigint;
    factor: number;
  }
): void {
  this.symbols.ma_apply_volume_factor_f32(
    options.pSamples,
    options.sampleCount,
    options.factor
  );
}

export function ma_copy_and_apply_volume_factor_pcm_frames_u8(
  this: MiniAudio,
  options: {
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    channels: number;
    factor: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_factor_pcm_frames_u8(
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount,
    options.channels,
    options.factor
  );
}

export function ma_copy_and_apply_volume_factor_pcm_frames_s16(
  this: MiniAudio,
  options: {
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    channels: number;
    factor: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_factor_pcm_frames_s16(
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount,
    options.channels,
    options.factor
  );
}

export function ma_copy_and_apply_volume_factor_pcm_frames_s24(
  this: MiniAudio,
  options: {
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    channels: number;
    factor: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_factor_pcm_frames_s24(
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount,
    options.channels,
    options.factor
  );
}

export function ma_copy_and_apply_volume_factor_pcm_frames_s32(
  this: MiniAudio,
  options: {
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    channels: number;
    factor: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_factor_pcm_frames_s32(
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount,
    options.channels,
    options.factor
  );
}

export function ma_copy_and_apply_volume_factor_pcm_frames_f32(
  this: MiniAudio,
  options: {
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    channels: number;
    factor: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_factor_pcm_frames_f32(
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount,
    options.channels,
    options.factor
  );
}

export function ma_copy_and_apply_volume_factor_pcm_frames(
  this: MiniAudio,
  options: {
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    factor: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_factor_pcm_frames(
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount,
    options.format,
    options.channels,
    options.factor
  );
}

export function ma_apply_volume_factor_pcm_frames_u8(
  this: MiniAudio,
  options: {
    pFrames: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    channels: number;
    factor: number;
  }
): void {
  this.symbols.ma_apply_volume_factor_pcm_frames_u8(
    options.pFrames,
    options.frameCount,
    options.channels,
    options.factor
  );
}

export function ma_apply_volume_factor_pcm_frames_s16(
  this: MiniAudio,
  options: {
    pFrames: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    channels: number;
    factor: number;
  }
): void {
  this.symbols.ma_apply_volume_factor_pcm_frames_s16(
    options.pFrames,
    options.frameCount,
    options.channels,
    options.factor
  );
}

export function ma_apply_volume_factor_pcm_frames_s24(
  this: MiniAudio,
  options: {
    pFrames: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    channels: number;
    factor: number;
  }
): void {
  this.symbols.ma_apply_volume_factor_pcm_frames_s24(
    options.pFrames,
    options.frameCount,
    options.channels,
    options.factor
  );
}

export function ma_apply_volume_factor_pcm_frames_s32(
  this: MiniAudio,
  options: {
    pFrames: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    channels: number;
    factor: number;
  }
): void {
  this.symbols.ma_apply_volume_factor_pcm_frames_s32(
    options.pFrames,
    options.frameCount,
    options.channels,
    options.factor
  );
}

export function ma_apply_volume_factor_pcm_frames_f32(
  this: MiniAudio,
  options: {
    pFrames: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    channels: number;
    factor: number;
  }
): void {
  this.symbols.ma_apply_volume_factor_pcm_frames_f32(
    options.pFrames,
    options.frameCount,
    options.channels,
    options.factor
  );
}

export function ma_apply_volume_factor_pcm_frames(
  this: MiniAudio,
  options: {
    pFrames: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    factor: number;
  }
): void {
  this.symbols.ma_apply_volume_factor_pcm_frames(
    options.pFrames,
    options.frameCount,
    options.format,
    options.channels,
    options.factor
  );
}

export function ma_copy_and_apply_volume_factor_per_channel_f32(
  this: MiniAudio,
  options: {
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    channels: number;
    pChannelGains: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_factor_per_channel_f32(
    options.pFramesOut,
    options.pFramesIn,
    options.frameCount,
    options.channels,
    options.pChannelGains
  );
}

export function ma_copy_and_apply_volume_and_clip_samples_u8(
  this: MiniAudio,
  options: {
    pDst: Pointer | NodeJS.TypedArray | null;
    pSrc: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    volume: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_and_clip_samples_u8(
    options.pDst,
    options.pSrc,
    options.count,
    options.volume
  );
}

export function ma_copy_and_apply_volume_and_clip_samples_s16(
  this: MiniAudio,
  options: {
    pDst: Pointer | NodeJS.TypedArray | null;
    pSrc: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    volume: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_and_clip_samples_s16(
    options.pDst,
    options.pSrc,
    options.count,
    options.volume
  );
}

export function ma_copy_and_apply_volume_and_clip_samples_s24(
  this: MiniAudio,
  options: {
    pDst: Pointer | NodeJS.TypedArray | null;
    pSrc: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    volume: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_and_clip_samples_s24(
    options.pDst,
    options.pSrc,
    options.count,
    options.volume
  );
}

export function ma_copy_and_apply_volume_and_clip_samples_s32(
  this: MiniAudio,
  options: {
    pDst: Pointer | NodeJS.TypedArray | null;
    pSrc: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    volume: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_and_clip_samples_s32(
    options.pDst,
    options.pSrc,
    options.count,
    options.volume
  );
}

export function ma_copy_and_apply_volume_and_clip_samples_f32(
  this: MiniAudio,
  options: {
    pDst: Pointer | NodeJS.TypedArray | null;
    pSrc: Pointer | NodeJS.TypedArray | null;
    count: bigint;
    volume: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_and_clip_samples_f32(
    options.pDst,
    options.pSrc,
    options.count,
    options.volume
  );
}

export function ma_copy_and_apply_volume_and_clip_pcm_frames(
  this: MiniAudio,
  options: {
    pDst: Pointer | NodeJS.TypedArray | null;
    pSrc: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    volume: number;
  }
): void {
  this.symbols.ma_copy_and_apply_volume_and_clip_pcm_frames(
    options.pDst,
    options.pSrc,
    options.frameCount,
    options.format,
    options.channels,
    options.volume
  );
}

export function ma_volume_linear_to_db(
  this: MiniAudio,
  options: {
    factor: number;
  }
): number {
  return this.symbols.ma_volume_linear_to_db(options.factor) as number;
}

export function ma_volume_db_to_linear(
  this: MiniAudio,
  options: {
    gain: number;
  }
): number {
  return this.symbols.ma_volume_db_to_linear(options.gain) as number;
}

export function ma_mix_pcm_frames_f32(
  this: MiniAudio,
  options: {
    pDst: Pointer | NodeJS.TypedArray | null;
    pSrc: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    channels: number;
    volume: number;
  }
): Pointer | null {
  return this.symbols.ma_mix_pcm_frames_f32(
    options.pDst,
    options.pSrc,
    options.frameCount,
    options.channels,
    options.volume
  ) as Pointer | null;
}

export function ma_vfs_open(
  this: MiniAudio,
  options: {
    pVFS: Pointer | NodeJS.TypedArray | null;
    pFilePath: string;
    openMode: number;
    pFile: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_vfs_open(
    options.pVFS,
    stringToCString(options.pFilePath).ptr,
    options.openMode,
    options.pFile
  ) as Pointer | null;
}

export function ma_vfs_open_w(
  this: MiniAudio,
  options: {
    pVFS: Pointer | NodeJS.TypedArray | null;
    pFilePath: Pointer | NodeJS.TypedArray | null;
    openMode: number;
    pFile: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_vfs_open_w(
    options.pVFS,
    options.pFilePath,
    options.openMode,
    options.pFile
  ) as Pointer | null;
}

export function ma_vfs_close(
  this: MiniAudio,
  options: {
    pVFS: Pointer | NodeJS.TypedArray | null;
    file: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_vfs_close(
    options.pVFS,
    options.file
  ) as Pointer | null;
}

export function ma_vfs_read(
  this: MiniAudio,
  options: {
    pVFS: Pointer | NodeJS.TypedArray | null;
    file: Pointer | NodeJS.TypedArray | null;
    pDst: Pointer | NodeJS.TypedArray | null;
    sizeInBytes: number;
    pBytesRead: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_vfs_read(
    options.pVFS,
    options.file,
    options.pDst,
    options.sizeInBytes,
    options.pBytesRead
  ) as Pointer | null;
}

export function ma_vfs_write(
  this: MiniAudio,
  options: {
    pVFS: Pointer | NodeJS.TypedArray | null;
    file: Pointer | NodeJS.TypedArray | null;
    pSrc: Pointer | NodeJS.TypedArray | null;
    sizeInBytes: number;
    pBytesWritten: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_vfs_write(
    options.pVFS,
    options.file,
    options.pSrc,
    options.sizeInBytes,
    options.pBytesWritten
  ) as Pointer | null;
}

export function ma_vfs_seek(
  this: MiniAudio,
  options: {
    pVFS: Pointer | NodeJS.TypedArray | null;
    file: Pointer | NodeJS.TypedArray | null;
    offset: bigint;
    origin: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_vfs_seek(
    options.pVFS,
    options.file,
    options.offset,
    options.origin
  ) as Pointer | null;
}

export function ma_vfs_tell(
  this: MiniAudio,
  options: {
    pVFS: Pointer | NodeJS.TypedArray | null;
    file: Pointer | NodeJS.TypedArray | null;
    pCursor: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_vfs_tell(
    options.pVFS,
    options.file,
    options.pCursor
  ) as Pointer | null;
}

export function ma_vfs_info(
  this: MiniAudio,
  options: {
    pVFS: Pointer | NodeJS.TypedArray | null;
    file: Pointer | NodeJS.TypedArray | null;
    pInfo: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_vfs_info(
    options.pVFS,
    options.file,
    options.pInfo
  ) as Pointer | null;
}

export function ma_vfs_open_and_read_file(
  this: MiniAudio,
  options: {
    pVFS: Pointer | NodeJS.TypedArray | null;
    pFilePath: string;
    ppData: Pointer | NodeJS.TypedArray | null;
    pSize: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_vfs_open_and_read_file(
    options.pVFS,
    stringToCString(options.pFilePath).ptr,
    options.ppData,
    options.pSize,
    options.pAllocationCallbacks
  ) as Pointer | null;
}

export function ma_default_vfs_init(
  this: MiniAudio,
  options: {
    pVFS: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_default_vfs_init(
    options.pVFS,
    options.pAllocationCallbacks
  ) as Pointer | null;
}

export function ma_decoding_backend_config_init(
  this: MiniAudio,
  options: {
    preferredFormat: Pointer | NodeJS.TypedArray | null;
    seekPointCount: number;
  }
): Pointer | null {
  return this.symbols.ma_decoding_backend_config_init(
    options.preferredFormat,
    options.seekPointCount
  ) as Pointer | null;
}

export function ma_decoder_config_init(
  this: MiniAudio,
  options: {
    outputFormat: Pointer | NodeJS.TypedArray | null;
    outputChannels: number;
    outputSampleRate: number;
  }
): Pointer | null {
  return this.symbols.ma_decoder_config_init(
    options.outputFormat,
    options.outputChannels,
    options.outputSampleRate
  ) as Pointer | null;
}

export function ma_decoder_config_init_default(
  this: MiniAudio
): Pointer | null {
  return this.symbols.ma_decoder_config_init_default() as Pointer | null;
}

export function ma_decoder_init(
  this: MiniAudio,
  options: {
    onRead: TypedJSCallback<ma_decoder_read_proc>;
    onSeek: TypedJSCallback<ma_decoder_seek_proc>;
    pUserData: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pDecoder: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_decoder_init(
    options.onRead,
    options.onSeek,
    options.pUserData,
    options.pConfig,
    options.pDecoder
  ) as Pointer | null;
}

export function ma_decoder_init_memory(
  this: MiniAudio,
  options: {
    pData: Pointer | NodeJS.TypedArray | null;
    dataSize: number;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pDecoder: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_decoder_init_memory(
    options.pData,
    options.dataSize,
    options.pConfig,
    options.pDecoder
  ) as Pointer | null;
}

export function ma_decoder_init_vfs(
  this: MiniAudio,
  options: {
    pVFS: Pointer | NodeJS.TypedArray | null;
    pFilePath: string;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pDecoder: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_decoder_init_vfs(
    options.pVFS,
    stringToCString(options.pFilePath).ptr,
    options.pConfig,
    options.pDecoder
  ) as Pointer | null;
}

export function ma_decoder_init_vfs_w(
  this: MiniAudio,
  options: {
    pVFS: Pointer | NodeJS.TypedArray | null;
    pFilePath: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pDecoder: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_decoder_init_vfs_w(
    options.pVFS,
    options.pFilePath,
    options.pConfig,
    options.pDecoder
  ) as Pointer | null;
}

export function ma_decoder_init_file(
  this: MiniAudio,
  options: {
    pFilePath: string;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pDecoder: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_decoder_init_file(
    stringToCString(options.pFilePath).ptr,
    options.pConfig,
    options.pDecoder
  ) as Pointer | null;
}

export function ma_decoder_init_file_w(
  this: MiniAudio,
  options: {
    pFilePath: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pDecoder: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_decoder_init_file_w(
    options.pFilePath,
    options.pConfig,
    options.pDecoder
  ) as Pointer | null;
}

export function ma_decoder_uninit(
  this: MiniAudio,
  options: {
    pDecoder: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_decoder_uninit(options.pDecoder) as Pointer | null;
}

export function ma_decoder_read_pcm_frames(
  this: MiniAudio,
  options: {
    pDecoder: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    pFramesRead: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_decoder_read_pcm_frames(
    options.pDecoder,
    options.pFramesOut,
    options.frameCount,
    options.pFramesRead
  ) as Pointer | null;
}

export function ma_decoder_seek_to_pcm_frame(
  this: MiniAudio,
  options: {
    pDecoder: Pointer | NodeJS.TypedArray | null;
    frameIndex: bigint;
  }
): Pointer | null {
  return this.symbols.ma_decoder_seek_to_pcm_frame(
    options.pDecoder,
    options.frameIndex
  ) as Pointer | null;
}

export function ma_decoder_get_data_format(
  this: MiniAudio,
  options: {
    pDecoder: Pointer | NodeJS.TypedArray | null;
    pFormat: Pointer | NodeJS.TypedArray | null;
    pChannels: Pointer | NodeJS.TypedArray | null;
    pSampleRate: Pointer | NodeJS.TypedArray | null;
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channelMapCap: number;
  }
): Pointer | null {
  return this.symbols.ma_decoder_get_data_format(
    options.pDecoder,
    options.pFormat,
    options.pChannels,
    options.pSampleRate,
    options.pChannelMap,
    options.channelMapCap
  ) as Pointer | null;
}

export function ma_decoder_get_cursor_in_pcm_frames(
  this: MiniAudio,
  options: {
    pDecoder: Pointer | NodeJS.TypedArray | null;
    pCursor: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_decoder_get_cursor_in_pcm_frames(
    options.pDecoder,
    options.pCursor
  ) as Pointer | null;
}

export function ma_decoder_get_length_in_pcm_frames(
  this: MiniAudio,
  options: {
    pDecoder: Pointer | NodeJS.TypedArray | null;
    pLength: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_decoder_get_length_in_pcm_frames(
    options.pDecoder,
    options.pLength
  ) as Pointer | null;
}

export function ma_decoder_get_available_frames(
  this: MiniAudio,
  options: {
    pDecoder: Pointer | NodeJS.TypedArray | null;
    pAvailableFrames: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_decoder_get_available_frames(
    options.pDecoder,
    options.pAvailableFrames
  ) as Pointer | null;
}

export function ma_decode_from_vfs(
  this: MiniAudio,
  options: {
    pVFS: Pointer | NodeJS.TypedArray | null;
    pFilePath: string;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pFrameCountOut: Pointer | NodeJS.TypedArray | null;
    ppPCMFramesOut: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_decode_from_vfs(
    options.pVFS,
    stringToCString(options.pFilePath).ptr,
    options.pConfig,
    options.pFrameCountOut,
    options.ppPCMFramesOut
  ) as Pointer | null;
}

export function ma_decode_file(
  this: MiniAudio,
  options: {
    pFilePath: string;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pFrameCountOut: Pointer | NodeJS.TypedArray | null;
    ppPCMFramesOut: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_decode_file(
    stringToCString(options.pFilePath).ptr,
    options.pConfig,
    options.pFrameCountOut,
    options.ppPCMFramesOut
  ) as Pointer | null;
}

export function ma_decode_memory(
  this: MiniAudio,
  options: {
    pData: Pointer | NodeJS.TypedArray | null;
    dataSize: number;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pFrameCountOut: Pointer | NodeJS.TypedArray | null;
    ppPCMFramesOut: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_decode_memory(
    options.pData,
    options.dataSize,
    options.pConfig,
    options.pFrameCountOut,
    options.ppPCMFramesOut
  ) as Pointer | null;
}

export function ma_encoder_config_init(
  this: MiniAudio,
  options: {
    encodingFormat: Pointer | NodeJS.TypedArray | null;
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
  }
): Pointer | null {
  return this.symbols.ma_encoder_config_init(
    options.encodingFormat,
    options.format,
    options.channels,
    options.sampleRate
  ) as Pointer | null;
}

export function ma_encoder_init(
  this: MiniAudio,
  options: {
    onWrite: TypedJSCallback<ma_encoder_write_proc>;
    onSeek: TypedJSCallback<ma_encoder_seek_proc>;
    pUserData: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pEncoder: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_encoder_init(
    options.onWrite,
    options.onSeek,
    options.pUserData,
    options.pConfig,
    options.pEncoder
  ) as Pointer | null;
}

export function ma_encoder_init_vfs(
  this: MiniAudio,
  options: {
    pVFS: Pointer | NodeJS.TypedArray | null;
    pFilePath: string;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pEncoder: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_encoder_init_vfs(
    options.pVFS,
    stringToCString(options.pFilePath).ptr,
    options.pConfig,
    options.pEncoder
  ) as Pointer | null;
}

export function ma_encoder_init_vfs_w(
  this: MiniAudio,
  options: {
    pVFS: Pointer | NodeJS.TypedArray | null;
    pFilePath: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pEncoder: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_encoder_init_vfs_w(
    options.pVFS,
    options.pFilePath,
    options.pConfig,
    options.pEncoder
  ) as Pointer | null;
}

export function ma_encoder_init_file(
  this: MiniAudio,
  options: {
    pFilePath: string;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pEncoder: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_encoder_init_file(
    stringToCString(options.pFilePath).ptr,
    options.pConfig,
    options.pEncoder
  ) as Pointer | null;
}

export function ma_encoder_init_file_w(
  this: MiniAudio,
  options: {
    pFilePath: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pEncoder: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_encoder_init_file_w(
    options.pFilePath,
    options.pConfig,
    options.pEncoder
  ) as Pointer | null;
}

export function ma_encoder_uninit(
  this: MiniAudio,
  options: {
    pEncoder: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_encoder_uninit(options.pEncoder);
}

export function ma_encoder_write_pcm_frames(
  this: MiniAudio,
  options: {
    pEncoder: Pointer | NodeJS.TypedArray | null;
    pFramesIn: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    pFramesWritten: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_encoder_write_pcm_frames(
    options.pEncoder,
    options.pFramesIn,
    options.frameCount,
    options.pFramesWritten
  ) as Pointer | null;
}

export function ma_waveform_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
    type: Pointer | NodeJS.TypedArray | null;
    amplitude: number;
    frequency: number;
  }
): Pointer | null {
  return this.symbols.ma_waveform_config_init(
    options.format,
    options.channels,
    options.sampleRate,
    options.type,
    options.amplitude,
    options.frequency
  ) as Pointer | null;
}

export function ma_waveform_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pWaveform: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_waveform_init(
    options.pConfig,
    options.pWaveform
  ) as Pointer | null;
}

export function ma_waveform_uninit(
  this: MiniAudio,
  options: {
    pWaveform: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_waveform_uninit(options.pWaveform);
}

export function ma_waveform_read_pcm_frames(
  this: MiniAudio,
  options: {
    pWaveform: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    pFramesRead: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_waveform_read_pcm_frames(
    options.pWaveform,
    options.pFramesOut,
    options.frameCount,
    options.pFramesRead
  ) as Pointer | null;
}

export function ma_waveform_seek_to_pcm_frame(
  this: MiniAudio,
  options: {
    pWaveform: Pointer | NodeJS.TypedArray | null;
    frameIndex: bigint;
  }
): Pointer | null {
  return this.symbols.ma_waveform_seek_to_pcm_frame(
    options.pWaveform,
    options.frameIndex
  ) as Pointer | null;
}

export function ma_waveform_set_amplitude(
  this: MiniAudio,
  options: {
    pWaveform: Pointer | NodeJS.TypedArray | null;
    amplitude: number;
  }
): Pointer | null {
  return this.symbols.ma_waveform_set_amplitude(
    options.pWaveform,
    options.amplitude
  ) as Pointer | null;
}

export function ma_waveform_set_frequency(
  this: MiniAudio,
  options: {
    pWaveform: Pointer | NodeJS.TypedArray | null;
    frequency: number;
  }
): Pointer | null {
  return this.symbols.ma_waveform_set_frequency(
    options.pWaveform,
    options.frequency
  ) as Pointer | null;
}

export function ma_waveform_set_type(
  this: MiniAudio,
  options: {
    pWaveform: Pointer | NodeJS.TypedArray | null;
    type: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_waveform_set_type(
    options.pWaveform,
    options.type
  ) as Pointer | null;
}

export function ma_waveform_set_sample_rate(
  this: MiniAudio,
  options: {
    pWaveform: Pointer | NodeJS.TypedArray | null;
    sampleRate: number;
  }
): Pointer | null {
  return this.symbols.ma_waveform_set_sample_rate(
    options.pWaveform,
    options.sampleRate
  ) as Pointer | null;
}

export function ma_pulsewave_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
    dutyCycle: number;
    amplitude: number;
    frequency: number;
  }
): Pointer | null {
  return this.symbols.ma_pulsewave_config_init(
    options.format,
    options.channels,
    options.sampleRate,
    options.dutyCycle,
    options.amplitude,
    options.frequency
  ) as Pointer | null;
}

export function ma_pulsewave_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pWaveform: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_pulsewave_init(
    options.pConfig,
    options.pWaveform
  ) as Pointer | null;
}

export function ma_pulsewave_uninit(
  this: MiniAudio,
  options: {
    pWaveform: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_pulsewave_uninit(options.pWaveform);
}

export function ma_pulsewave_read_pcm_frames(
  this: MiniAudio,
  options: {
    pWaveform: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    pFramesRead: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_pulsewave_read_pcm_frames(
    options.pWaveform,
    options.pFramesOut,
    options.frameCount,
    options.pFramesRead
  ) as Pointer | null;
}

export function ma_pulsewave_seek_to_pcm_frame(
  this: MiniAudio,
  options: {
    pWaveform: Pointer | NodeJS.TypedArray | null;
    frameIndex: bigint;
  }
): Pointer | null {
  return this.symbols.ma_pulsewave_seek_to_pcm_frame(
    options.pWaveform,
    options.frameIndex
  ) as Pointer | null;
}

export function ma_pulsewave_set_amplitude(
  this: MiniAudio,
  options: {
    pWaveform: Pointer | NodeJS.TypedArray | null;
    amplitude: number;
  }
): Pointer | null {
  return this.symbols.ma_pulsewave_set_amplitude(
    options.pWaveform,
    options.amplitude
  ) as Pointer | null;
}

export function ma_pulsewave_set_frequency(
  this: MiniAudio,
  options: {
    pWaveform: Pointer | NodeJS.TypedArray | null;
    frequency: number;
  }
): Pointer | null {
  return this.symbols.ma_pulsewave_set_frequency(
    options.pWaveform,
    options.frequency
  ) as Pointer | null;
}

export function ma_pulsewave_set_sample_rate(
  this: MiniAudio,
  options: {
    pWaveform: Pointer | NodeJS.TypedArray | null;
    sampleRate: number;
  }
): Pointer | null {
  return this.symbols.ma_pulsewave_set_sample_rate(
    options.pWaveform,
    options.sampleRate
  ) as Pointer | null;
}

export function ma_pulsewave_set_duty_cycle(
  this: MiniAudio,
  options: {
    pWaveform: Pointer | NodeJS.TypedArray | null;
    dutyCycle: number;
  }
): Pointer | null {
  return this.symbols.ma_pulsewave_set_duty_cycle(
    options.pWaveform,
    options.dutyCycle
  ) as Pointer | null;
}

export function ma_noise_config_init(
  this: MiniAudio,
  options: {
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    type: Pointer | NodeJS.TypedArray | null;
    seed: number;
    amplitude: number;
  }
): Pointer | null {
  return this.symbols.ma_noise_config_init(
    options.format,
    options.channels,
    options.type,
    options.seed,
    options.amplitude
  ) as Pointer | null;
}

export function ma_noise_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_noise_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_noise_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pNoise: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_noise_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pNoise
  ) as Pointer | null;
}

export function ma_noise_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pNoise: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_noise_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pNoise
  ) as Pointer | null;
}

export function ma_noise_uninit(
  this: MiniAudio,
  options: {
    pNoise: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_noise_uninit(options.pNoise, options.pAllocationCallbacks);
}

export function ma_noise_read_pcm_frames(
  this: MiniAudio,
  options: {
    pNoise: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    pFramesRead: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_noise_read_pcm_frames(
    options.pNoise,
    options.pFramesOut,
    options.frameCount,
    options.pFramesRead
  ) as Pointer | null;
}

export function ma_noise_set_amplitude(
  this: MiniAudio,
  options: {
    pNoise: Pointer | NodeJS.TypedArray | null;
    amplitude: number;
  }
): Pointer | null {
  return this.symbols.ma_noise_set_amplitude(
    options.pNoise,
    options.amplitude
  ) as Pointer | null;
}

export function ma_noise_set_seed(
  this: MiniAudio,
  options: {
    pNoise: Pointer | NodeJS.TypedArray | null;
    seed: number;
  }
): Pointer | null {
  return this.symbols.ma_noise_set_seed(
    options.pNoise,
    options.seed
  ) as Pointer | null;
}

export function ma_noise_set_type(
  this: MiniAudio,
  options: {
    pNoise: Pointer | NodeJS.TypedArray | null;
    type: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_noise_set_type(
    options.pNoise,
    options.type
  ) as Pointer | null;
}

export function ma_resource_manager_pipeline_notifications_init(
  this: MiniAudio
): Pointer | null {
  return this.symbols.ma_resource_manager_pipeline_notifications_init() as Pointer | null;
}

export function ma_resource_manager_data_source_config_init(
  this: MiniAudio
): Pointer | null {
  return this.symbols.ma_resource_manager_data_source_config_init() as Pointer | null;
}

export function ma_resource_manager_config_init(
  this: MiniAudio
): Pointer | null {
  return this.symbols.ma_resource_manager_config_init() as Pointer | null;
}

export function ma_resource_manager_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pResourceManager: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_init(
    options.pConfig,
    options.pResourceManager
  ) as Pointer | null;
}

export function ma_resource_manager_uninit(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_resource_manager_uninit(options.pResourceManager);
}

export function ma_resource_manager_get_log(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_get_log(
    options.pResourceManager
  ) as Pointer | null;
}

export function ma_resource_manager_register_file(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pFilePath: string;
    flags: number;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_register_file(
    options.pResourceManager,
    stringToCString(options.pFilePath).ptr,
    options.flags
  ) as Pointer | null;
}

export function ma_resource_manager_register_file_w(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pFilePath: Pointer | NodeJS.TypedArray | null;
    flags: number;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_register_file_w(
    options.pResourceManager,
    options.pFilePath,
    options.flags
  ) as Pointer | null;
}

export function ma_resource_manager_register_decoded_data(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pName: string;
    pData: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_register_decoded_data(
    options.pResourceManager,
    stringToCString(options.pName).ptr,
    options.pData,
    options.frameCount,
    options.format,
    options.channels,
    options.sampleRate
  ) as Pointer | null;
}

export function ma_resource_manager_register_decoded_data_w(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pName: Pointer | NodeJS.TypedArray | null;
    pData: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    format: Pointer | NodeJS.TypedArray | null;
    channels: number;
    sampleRate: number;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_register_decoded_data_w(
    options.pResourceManager,
    options.pName,
    options.pData,
    options.frameCount,
    options.format,
    options.channels,
    options.sampleRate
  ) as Pointer | null;
}

export function ma_resource_manager_register_encoded_data(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pName: string;
    pData: Pointer | NodeJS.TypedArray | null;
    sizeInBytes: number;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_register_encoded_data(
    options.pResourceManager,
    stringToCString(options.pName).ptr,
    options.pData,
    options.sizeInBytes
  ) as Pointer | null;
}

export function ma_resource_manager_register_encoded_data_w(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pName: Pointer | NodeJS.TypedArray | null;
    pData: Pointer | NodeJS.TypedArray | null;
    sizeInBytes: number;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_register_encoded_data_w(
    options.pResourceManager,
    options.pName,
    options.pData,
    options.sizeInBytes
  ) as Pointer | null;
}

export function ma_resource_manager_unregister_file(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pFilePath: string;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_unregister_file(
    options.pResourceManager,
    stringToCString(options.pFilePath).ptr
  ) as Pointer | null;
}

export function ma_resource_manager_unregister_file_w(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pFilePath: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_unregister_file_w(
    options.pResourceManager,
    options.pFilePath
  ) as Pointer | null;
}

export function ma_resource_manager_unregister_data(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pName: string;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_unregister_data(
    options.pResourceManager,
    stringToCString(options.pName).ptr
  ) as Pointer | null;
}

export function ma_resource_manager_unregister_data_w(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pName: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_unregister_data_w(
    options.pResourceManager,
    options.pName
  ) as Pointer | null;
}

export function ma_resource_manager_data_buffer_init_ex(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pDataBuffer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_buffer_init_ex(
    options.pResourceManager,
    options.pConfig,
    options.pDataBuffer
  ) as Pointer | null;
}

export function ma_resource_manager_data_buffer_init(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pFilePath: string;
    flags: number;
    pNotifications: Pointer | NodeJS.TypedArray | null;
    pDataBuffer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_buffer_init(
    options.pResourceManager,
    stringToCString(options.pFilePath).ptr,
    options.flags,
    options.pNotifications,
    options.pDataBuffer
  ) as Pointer | null;
}

export function ma_resource_manager_data_buffer_init_w(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pFilePath: Pointer | NodeJS.TypedArray | null;
    flags: number;
    pNotifications: Pointer | NodeJS.TypedArray | null;
    pDataBuffer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_buffer_init_w(
    options.pResourceManager,
    options.pFilePath,
    options.flags,
    options.pNotifications,
    options.pDataBuffer
  ) as Pointer | null;
}

export function ma_resource_manager_data_buffer_init_copy(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pExistingDataBuffer: Pointer | NodeJS.TypedArray | null;
    pDataBuffer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_buffer_init_copy(
    options.pResourceManager,
    options.pExistingDataBuffer,
    options.pDataBuffer
  ) as Pointer | null;
}

export function ma_resource_manager_data_buffer_uninit(
  this: MiniAudio,
  options: {
    pDataBuffer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_buffer_uninit(
    options.pDataBuffer
  ) as Pointer | null;
}

export function ma_resource_manager_data_buffer_read_pcm_frames(
  this: MiniAudio,
  options: {
    pDataBuffer: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    pFramesRead: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_buffer_read_pcm_frames(
    options.pDataBuffer,
    options.pFramesOut,
    options.frameCount,
    options.pFramesRead
  ) as Pointer | null;
}

export function ma_resource_manager_data_buffer_seek_to_pcm_frame(
  this: MiniAudio,
  options: {
    pDataBuffer: Pointer | NodeJS.TypedArray | null;
    frameIndex: bigint;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_buffer_seek_to_pcm_frame(
    options.pDataBuffer,
    options.frameIndex
  ) as Pointer | null;
}

export function ma_resource_manager_data_buffer_get_data_format(
  this: MiniAudio,
  options: {
    pDataBuffer: Pointer | NodeJS.TypedArray | null;
    pFormat: Pointer | NodeJS.TypedArray | null;
    pChannels: Pointer | NodeJS.TypedArray | null;
    pSampleRate: Pointer | NodeJS.TypedArray | null;
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channelMapCap: number;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_buffer_get_data_format(
    options.pDataBuffer,
    options.pFormat,
    options.pChannels,
    options.pSampleRate,
    options.pChannelMap,
    options.channelMapCap
  ) as Pointer | null;
}

export function ma_resource_manager_data_buffer_get_cursor_in_pcm_frames(
  this: MiniAudio,
  options: {
    pDataBuffer: Pointer | NodeJS.TypedArray | null;
    pCursor: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_buffer_get_cursor_in_pcm_frames(
    options.pDataBuffer,
    options.pCursor
  ) as Pointer | null;
}

export function ma_resource_manager_data_buffer_get_length_in_pcm_frames(
  this: MiniAudio,
  options: {
    pDataBuffer: Pointer | NodeJS.TypedArray | null;
    pLength: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_buffer_get_length_in_pcm_frames(
    options.pDataBuffer,
    options.pLength
  ) as Pointer | null;
}

export function ma_resource_manager_data_buffer_result(
  this: MiniAudio,
  options: {
    pDataBuffer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_buffer_result(
    options.pDataBuffer
  ) as Pointer | null;
}

export function ma_resource_manager_data_buffer_set_looping(
  this: MiniAudio,
  options: {
    pDataBuffer: Pointer | NodeJS.TypedArray | null;
    isLooping: number;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_buffer_set_looping(
    options.pDataBuffer,
    options.isLooping
  ) as Pointer | null;
}

export function ma_resource_manager_data_buffer_is_looping(
  this: MiniAudio,
  options: {
    pDataBuffer: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_buffer_is_looping(
    options.pDataBuffer
  ) as Pointer | null;
}

export function ma_resource_manager_data_buffer_get_available_frames(
  this: MiniAudio,
  options: {
    pDataBuffer: Pointer | NodeJS.TypedArray | null;
    pAvailableFrames: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_buffer_get_available_frames(
    options.pDataBuffer,
    options.pAvailableFrames
  ) as Pointer | null;
}

export function ma_resource_manager_data_stream_init_ex(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pDataStream: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_stream_init_ex(
    options.pResourceManager,
    options.pConfig,
    options.pDataStream
  ) as Pointer | null;
}

export function ma_resource_manager_data_stream_init(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pFilePath: string;
    flags: number;
    pNotifications: Pointer | NodeJS.TypedArray | null;
    pDataStream: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_stream_init(
    options.pResourceManager,
    stringToCString(options.pFilePath).ptr,
    options.flags,
    options.pNotifications,
    options.pDataStream
  ) as Pointer | null;
}

export function ma_resource_manager_data_stream_init_w(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pFilePath: Pointer | NodeJS.TypedArray | null;
    flags: number;
    pNotifications: Pointer | NodeJS.TypedArray | null;
    pDataStream: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_stream_init_w(
    options.pResourceManager,
    options.pFilePath,
    options.flags,
    options.pNotifications,
    options.pDataStream
  ) as Pointer | null;
}

export function ma_resource_manager_data_stream_uninit(
  this: MiniAudio,
  options: {
    pDataStream: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_stream_uninit(
    options.pDataStream
  ) as Pointer | null;
}

export function ma_resource_manager_data_stream_read_pcm_frames(
  this: MiniAudio,
  options: {
    pDataStream: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    pFramesRead: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_stream_read_pcm_frames(
    options.pDataStream,
    options.pFramesOut,
    options.frameCount,
    options.pFramesRead
  ) as Pointer | null;
}

export function ma_resource_manager_data_stream_seek_to_pcm_frame(
  this: MiniAudio,
  options: {
    pDataStream: Pointer | NodeJS.TypedArray | null;
    frameIndex: bigint;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_stream_seek_to_pcm_frame(
    options.pDataStream,
    options.frameIndex
  ) as Pointer | null;
}

export function ma_resource_manager_data_stream_get_data_format(
  this: MiniAudio,
  options: {
    pDataStream: Pointer | NodeJS.TypedArray | null;
    pFormat: Pointer | NodeJS.TypedArray | null;
    pChannels: Pointer | NodeJS.TypedArray | null;
    pSampleRate: Pointer | NodeJS.TypedArray | null;
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channelMapCap: number;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_stream_get_data_format(
    options.pDataStream,
    options.pFormat,
    options.pChannels,
    options.pSampleRate,
    options.pChannelMap,
    options.channelMapCap
  ) as Pointer | null;
}

export function ma_resource_manager_data_stream_get_cursor_in_pcm_frames(
  this: MiniAudio,
  options: {
    pDataStream: Pointer | NodeJS.TypedArray | null;
    pCursor: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_stream_get_cursor_in_pcm_frames(
    options.pDataStream,
    options.pCursor
  ) as Pointer | null;
}

export function ma_resource_manager_data_stream_get_length_in_pcm_frames(
  this: MiniAudio,
  options: {
    pDataStream: Pointer | NodeJS.TypedArray | null;
    pLength: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_stream_get_length_in_pcm_frames(
    options.pDataStream,
    options.pLength
  ) as Pointer | null;
}

export function ma_resource_manager_data_stream_result(
  this: MiniAudio,
  options: {
    pDataStream: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_stream_result(
    options.pDataStream
  ) as Pointer | null;
}

export function ma_resource_manager_data_stream_set_looping(
  this: MiniAudio,
  options: {
    pDataStream: Pointer | NodeJS.TypedArray | null;
    isLooping: number;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_stream_set_looping(
    options.pDataStream,
    options.isLooping
  ) as Pointer | null;
}

export function ma_resource_manager_data_stream_is_looping(
  this: MiniAudio,
  options: {
    pDataStream: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_stream_is_looping(
    options.pDataStream
  ) as Pointer | null;
}

export function ma_resource_manager_data_stream_get_available_frames(
  this: MiniAudio,
  options: {
    pDataStream: Pointer | NodeJS.TypedArray | null;
    pAvailableFrames: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_stream_get_available_frames(
    options.pDataStream,
    options.pAvailableFrames
  ) as Pointer | null;
}

export function ma_resource_manager_data_source_init_ex(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pDataSource: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_source_init_ex(
    options.pResourceManager,
    options.pConfig,
    options.pDataSource
  ) as Pointer | null;
}

export function ma_resource_manager_data_source_init(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pName: string;
    flags: number;
    pNotifications: Pointer | NodeJS.TypedArray | null;
    pDataSource: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_source_init(
    options.pResourceManager,
    stringToCString(options.pName).ptr,
    options.flags,
    options.pNotifications,
    options.pDataSource
  ) as Pointer | null;
}

export function ma_resource_manager_data_source_init_w(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pName: Pointer | NodeJS.TypedArray | null;
    flags: number;
    pNotifications: Pointer | NodeJS.TypedArray | null;
    pDataSource: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_source_init_w(
    options.pResourceManager,
    options.pName,
    options.flags,
    options.pNotifications,
    options.pDataSource
  ) as Pointer | null;
}

export function ma_resource_manager_data_source_init_copy(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pExistingDataSource: Pointer | NodeJS.TypedArray | null;
    pDataSource: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_source_init_copy(
    options.pResourceManager,
    options.pExistingDataSource,
    options.pDataSource
  ) as Pointer | null;
}

export function ma_resource_manager_data_source_uninit(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_source_uninit(
    options.pDataSource
  ) as Pointer | null;
}

export function ma_resource_manager_data_source_read_pcm_frames(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    pFramesRead: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_source_read_pcm_frames(
    options.pDataSource,
    options.pFramesOut,
    options.frameCount,
    options.pFramesRead
  ) as Pointer | null;
}

export function ma_resource_manager_data_source_seek_to_pcm_frame(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    frameIndex: bigint;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_source_seek_to_pcm_frame(
    options.pDataSource,
    options.frameIndex
  ) as Pointer | null;
}

export function ma_resource_manager_data_source_get_data_format(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    pFormat: Pointer | NodeJS.TypedArray | null;
    pChannels: Pointer | NodeJS.TypedArray | null;
    pSampleRate: Pointer | NodeJS.TypedArray | null;
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channelMapCap: number;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_source_get_data_format(
    options.pDataSource,
    options.pFormat,
    options.pChannels,
    options.pSampleRate,
    options.pChannelMap,
    options.channelMapCap
  ) as Pointer | null;
}

export function ma_resource_manager_data_source_get_cursor_in_pcm_frames(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    pCursor: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_source_get_cursor_in_pcm_frames(
    options.pDataSource,
    options.pCursor
  ) as Pointer | null;
}

export function ma_resource_manager_data_source_get_length_in_pcm_frames(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    pLength: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_source_get_length_in_pcm_frames(
    options.pDataSource,
    options.pLength
  ) as Pointer | null;
}

export function ma_resource_manager_data_source_result(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_source_result(
    options.pDataSource
  ) as Pointer | null;
}

export function ma_resource_manager_data_source_set_looping(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    isLooping: number;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_source_set_looping(
    options.pDataSource,
    options.isLooping
  ) as Pointer | null;
}

export function ma_resource_manager_data_source_is_looping(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_source_is_looping(
    options.pDataSource
  ) as Pointer | null;
}

export function ma_resource_manager_data_source_get_available_frames(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
    pAvailableFrames: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_data_source_get_available_frames(
    options.pDataSource,
    options.pAvailableFrames
  ) as Pointer | null;
}

export function ma_resource_manager_post_job(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pJob: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_post_job(
    options.pResourceManager,
    options.pJob
  ) as Pointer | null;
}

export function ma_resource_manager_post_job_quit(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_post_job_quit(
    options.pResourceManager
  ) as Pointer | null;
}

export function ma_resource_manager_next_job(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pJob: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_next_job(
    options.pResourceManager,
    options.pJob
  ) as Pointer | null;
}

export function ma_resource_manager_process_job(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
    pJob: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_process_job(
    options.pResourceManager,
    options.pJob
  ) as Pointer | null;
}

export function ma_resource_manager_process_next_job(
  this: MiniAudio,
  options: {
    pResourceManager: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_resource_manager_process_next_job(
    options.pResourceManager
  ) as Pointer | null;
}

export function ma_node_config_init(this: MiniAudio): Pointer | null {
  return this.symbols.ma_node_config_init() as Pointer | null;
}

export function ma_node_get_heap_size(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_get_heap_size(
    options.pNodeGraph,
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_node_init_preallocated(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_init_preallocated(
    options.pNodeGraph,
    options.pConfig,
    options.pHeap,
    options.pNode
  ) as Pointer | null;
}

export function ma_node_init(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_init(
    options.pNodeGraph,
    options.pConfig,
    options.pAllocationCallbacks,
    options.pNode
  ) as Pointer | null;
}

export function ma_node_uninit(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_node_uninit(options.pNode, options.pAllocationCallbacks);
}

export function ma_node_get_node_graph(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_get_node_graph(options.pNode) as Pointer | null;
}

export function ma_node_get_input_bus_count(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_get_input_bus_count(
    options.pNode
  ) as Pointer | null;
}

export function ma_node_get_output_bus_count(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_get_output_bus_count(
    options.pNode
  ) as Pointer | null;
}

export function ma_node_get_input_channels(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    inputBusIndex: number;
  }
): Pointer | null {
  return this.symbols.ma_node_get_input_channels(
    options.pNode,
    options.inputBusIndex
  ) as Pointer | null;
}

export function ma_node_get_output_channels(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    outputBusIndex: number;
  }
): Pointer | null {
  return this.symbols.ma_node_get_output_channels(
    options.pNode,
    options.outputBusIndex
  ) as Pointer | null;
}

export function ma_node_attach_output_bus(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    outputBusIndex: number;
    pOtherNode: Pointer | NodeJS.TypedArray | null;
    otherNodeInputBusIndex: number;
  }
): Pointer | null {
  return this.symbols.ma_node_attach_output_bus(
    options.pNode,
    options.outputBusIndex,
    options.pOtherNode,
    options.otherNodeInputBusIndex
  ) as Pointer | null;
}

export function ma_node_detach_output_bus(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    outputBusIndex: number;
  }
): Pointer | null {
  return this.symbols.ma_node_detach_output_bus(
    options.pNode,
    options.outputBusIndex
  ) as Pointer | null;
}

export function ma_node_detach_all_output_buses(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_detach_all_output_buses(
    options.pNode
  ) as Pointer | null;
}

export function ma_node_set_output_bus_volume(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    outputBusIndex: number;
    volume: number;
  }
): Pointer | null {
  return this.symbols.ma_node_set_output_bus_volume(
    options.pNode,
    options.outputBusIndex,
    options.volume
  ) as Pointer | null;
}

export function ma_node_get_output_bus_volume(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    outputBusIndex: number;
  }
): number {
  return this.symbols.ma_node_get_output_bus_volume(
    options.pNode,
    options.outputBusIndex
  ) as number;
}

export function ma_node_set_state(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    state: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_set_state(
    options.pNode,
    options.state
  ) as Pointer | null;
}

export function ma_node_get_state(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_get_state(options.pNode) as Pointer | null;
}

export function ma_node_set_state_time(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    state: Pointer | NodeJS.TypedArray | null;
    globalTime: bigint;
  }
): Pointer | null {
  return this.symbols.ma_node_set_state_time(
    options.pNode,
    options.state,
    options.globalTime
  ) as Pointer | null;
}

export function ma_node_get_state_time(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    state: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_get_state_time(
    options.pNode,
    options.state
  ) as Pointer | null;
}

export function ma_node_get_state_by_time(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    globalTime: bigint;
  }
): Pointer | null {
  return this.symbols.ma_node_get_state_by_time(
    options.pNode,
    options.globalTime
  ) as Pointer | null;
}

export function ma_node_get_state_by_time_range(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    globalTimeBeg: bigint;
    globalTimeEnd: bigint;
  }
): Pointer | null {
  return this.symbols.ma_node_get_state_by_time_range(
    options.pNode,
    options.globalTimeBeg,
    options.globalTimeEnd
  ) as Pointer | null;
}

export function ma_node_get_time(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_get_time(options.pNode) as Pointer | null;
}

export function ma_node_set_time(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    localTime: bigint;
  }
): Pointer | null {
  return this.symbols.ma_node_set_time(
    options.pNode,
    options.localTime
  ) as Pointer | null;
}

export function ma_node_graph_config_init(
  this: MiniAudio,
  options: {
    channels: number;
  }
): Pointer | null {
  return this.symbols.ma_node_graph_config_init(
    options.channels
  ) as Pointer | null;
}

export function ma_node_graph_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_graph_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pNodeGraph
  ) as Pointer | null;
}

export function ma_node_graph_uninit(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_node_graph_uninit(
    options.pNodeGraph,
    options.pAllocationCallbacks
  );
}

export function ma_node_graph_get_endpoint(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_graph_get_endpoint(
    options.pNodeGraph
  ) as Pointer | null;
}

export function ma_node_graph_read_pcm_frames(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    pFramesRead: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_graph_read_pcm_frames(
    options.pNodeGraph,
    options.pFramesOut,
    options.frameCount,
    options.pFramesRead
  ) as Pointer | null;
}

export function ma_node_graph_get_channels(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_graph_get_channels(
    options.pNodeGraph
  ) as Pointer | null;
}

export function ma_node_graph_get_time(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_graph_get_time(
    options.pNodeGraph
  ) as Pointer | null;
}

export function ma_node_graph_set_time(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    globalTime: bigint;
  }
): Pointer | null {
  return this.symbols.ma_node_graph_set_time(
    options.pNodeGraph,
    options.globalTime
  ) as Pointer | null;
}

export function ma_node_graph_get_processing_size_in_frames(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_node_graph_get_processing_size_in_frames(
    options.pNodeGraph
  ) as Pointer | null;
}

export function ma_data_source_node_config_init(
  this: MiniAudio,
  options: {
    pDataSource: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_node_config_init(
    options.pDataSource
  ) as Pointer | null;
}

export function ma_data_source_node_init(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pDataSourceNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_node_init(
    options.pNodeGraph,
    options.pConfig,
    options.pAllocationCallbacks,
    options.pDataSourceNode
  ) as Pointer | null;
}

export function ma_data_source_node_uninit(
  this: MiniAudio,
  options: {
    pDataSourceNode: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_data_source_node_uninit(
    options.pDataSourceNode,
    options.pAllocationCallbacks
  );
}

export function ma_data_source_node_set_looping(
  this: MiniAudio,
  options: {
    pDataSourceNode: Pointer | NodeJS.TypedArray | null;
    isLooping: number;
  }
): Pointer | null {
  return this.symbols.ma_data_source_node_set_looping(
    options.pDataSourceNode,
    options.isLooping
  ) as Pointer | null;
}

export function ma_data_source_node_is_looping(
  this: MiniAudio,
  options: {
    pDataSourceNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_data_source_node_is_looping(
    options.pDataSourceNode
  ) as Pointer | null;
}

export function ma_splitter_node_config_init(
  this: MiniAudio,
  options: {
    channels: number;
  }
): Pointer | null {
  return this.symbols.ma_splitter_node_config_init(
    options.channels
  ) as Pointer | null;
}

export function ma_splitter_node_init(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pSplitterNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_splitter_node_init(
    options.pNodeGraph,
    options.pConfig,
    options.pAllocationCallbacks,
    options.pSplitterNode
  ) as Pointer | null;
}

export function ma_splitter_node_uninit(
  this: MiniAudio,
  options: {
    pSplitterNode: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_splitter_node_uninit(
    options.pSplitterNode,
    options.pAllocationCallbacks
  );
}

export function ma_biquad_node_config_init(
  this: MiniAudio,
  options: {
    channels: number;
    b0: number;
    b1: number;
    b2: number;
    a0: number;
    a1: number;
    a2: number;
  }
): Pointer | null {
  return this.symbols.ma_biquad_node_config_init(
    options.channels,
    options.b0,
    options.b1,
    options.b2,
    options.a0,
    options.a1,
    options.a2
  ) as Pointer | null;
}

export function ma_biquad_node_init(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_biquad_node_init(
    options.pNodeGraph,
    options.pConfig,
    options.pAllocationCallbacks,
    options.pNode
  ) as Pointer | null;
}

export function ma_biquad_node_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_biquad_node_reinit(
    options.pConfig,
    options.pNode
  ) as Pointer | null;
}

export function ma_biquad_node_uninit(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_biquad_node_uninit(
    options.pNode,
    options.pAllocationCallbacks
  );
}

export function ma_lpf_node_config_init(
  this: MiniAudio,
  options: {
    channels: number;
    sampleRate: number;
    cutoffFrequency: number;
    order: number;
  }
): Pointer | null {
  return this.symbols.ma_lpf_node_config_init(
    options.channels,
    options.sampleRate,
    options.cutoffFrequency,
    options.order
  ) as Pointer | null;
}

export function ma_lpf_node_init(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf_node_init(
    options.pNodeGraph,
    options.pConfig,
    options.pAllocationCallbacks,
    options.pNode
  ) as Pointer | null;
}

export function ma_lpf_node_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_lpf_node_reinit(
    options.pConfig,
    options.pNode
  ) as Pointer | null;
}

export function ma_lpf_node_uninit(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_lpf_node_uninit(options.pNode, options.pAllocationCallbacks);
}

export function ma_hpf_node_config_init(
  this: MiniAudio,
  options: {
    channels: number;
    sampleRate: number;
    cutoffFrequency: number;
    order: number;
  }
): Pointer | null {
  return this.symbols.ma_hpf_node_config_init(
    options.channels,
    options.sampleRate,
    options.cutoffFrequency,
    options.order
  ) as Pointer | null;
}

export function ma_hpf_node_init(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf_node_init(
    options.pNodeGraph,
    options.pConfig,
    options.pAllocationCallbacks,
    options.pNode
  ) as Pointer | null;
}

export function ma_hpf_node_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hpf_node_reinit(
    options.pConfig,
    options.pNode
  ) as Pointer | null;
}

export function ma_hpf_node_uninit(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_hpf_node_uninit(options.pNode, options.pAllocationCallbacks);
}

export function ma_bpf_node_config_init(
  this: MiniAudio,
  options: {
    channels: number;
    sampleRate: number;
    cutoffFrequency: number;
    order: number;
  }
): Pointer | null {
  return this.symbols.ma_bpf_node_config_init(
    options.channels,
    options.sampleRate,
    options.cutoffFrequency,
    options.order
  ) as Pointer | null;
}

export function ma_bpf_node_init(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_bpf_node_init(
    options.pNodeGraph,
    options.pConfig,
    options.pAllocationCallbacks,
    options.pNode
  ) as Pointer | null;
}

export function ma_bpf_node_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_bpf_node_reinit(
    options.pConfig,
    options.pNode
  ) as Pointer | null;
}

export function ma_bpf_node_uninit(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_bpf_node_uninit(options.pNode, options.pAllocationCallbacks);
}

export function ma_notch_node_config_init(
  this: MiniAudio,
  options: {
    channels: number;
    sampleRate: number;
    q: number;
    frequency: number;
  }
): Pointer | null {
  return this.symbols.ma_notch_node_config_init(
    options.channels,
    options.sampleRate,
    options.q,
    options.frequency
  ) as Pointer | null;
}

export function ma_notch_node_init(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_notch_node_init(
    options.pNodeGraph,
    options.pConfig,
    options.pAllocationCallbacks,
    options.pNode
  ) as Pointer | null;
}

export function ma_notch_node_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_notch_node_reinit(
    options.pConfig,
    options.pNode
  ) as Pointer | null;
}

export function ma_notch_node_uninit(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_notch_node_uninit(
    options.pNode,
    options.pAllocationCallbacks
  );
}

export function ma_peak_node_config_init(
  this: MiniAudio,
  options: {
    channels: number;
    sampleRate: number;
    gainDB: number;
    q: number;
    frequency: number;
  }
): Pointer | null {
  return this.symbols.ma_peak_node_config_init(
    options.channels,
    options.sampleRate,
    options.gainDB,
    options.q,
    options.frequency
  ) as Pointer | null;
}

export function ma_peak_node_init(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_peak_node_init(
    options.pNodeGraph,
    options.pConfig,
    options.pAllocationCallbacks,
    options.pNode
  ) as Pointer | null;
}

export function ma_peak_node_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_peak_node_reinit(
    options.pConfig,
    options.pNode
  ) as Pointer | null;
}

export function ma_peak_node_uninit(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_peak_node_uninit(options.pNode, options.pAllocationCallbacks);
}

export function ma_loshelf_node_config_init(
  this: MiniAudio,
  options: {
    channels: number;
    sampleRate: number;
    gainDB: number;
    q: number;
    frequency: number;
  }
): Pointer | null {
  return this.symbols.ma_loshelf_node_config_init(
    options.channels,
    options.sampleRate,
    options.gainDB,
    options.q,
    options.frequency
  ) as Pointer | null;
}

export function ma_loshelf_node_init(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_loshelf_node_init(
    options.pNodeGraph,
    options.pConfig,
    options.pAllocationCallbacks,
    options.pNode
  ) as Pointer | null;
}

export function ma_loshelf_node_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_loshelf_node_reinit(
    options.pConfig,
    options.pNode
  ) as Pointer | null;
}

export function ma_loshelf_node_uninit(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_loshelf_node_uninit(
    options.pNode,
    options.pAllocationCallbacks
  );
}

export function ma_hishelf_node_config_init(
  this: MiniAudio,
  options: {
    channels: number;
    sampleRate: number;
    gainDB: number;
    q: number;
    frequency: number;
  }
): Pointer | null {
  return this.symbols.ma_hishelf_node_config_init(
    options.channels,
    options.sampleRate,
    options.gainDB,
    options.q,
    options.frequency
  ) as Pointer | null;
}

export function ma_hishelf_node_init(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hishelf_node_init(
    options.pNodeGraph,
    options.pConfig,
    options.pAllocationCallbacks,
    options.pNode
  ) as Pointer | null;
}

export function ma_hishelf_node_reinit(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_hishelf_node_reinit(
    options.pConfig,
    options.pNode
  ) as Pointer | null;
}

export function ma_hishelf_node_uninit(
  this: MiniAudio,
  options: {
    pNode: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_hishelf_node_uninit(
    options.pNode,
    options.pAllocationCallbacks
  );
}

export function ma_delay_node_config_init(
  this: MiniAudio,
  options: {
    channels: number;
    sampleRate: number;
    delayInFrames: number;
    decay: number;
  }
): Pointer | null {
  return this.symbols.ma_delay_node_config_init(
    options.channels,
    options.sampleRate,
    options.delayInFrames,
    options.decay
  ) as Pointer | null;
}

export function ma_delay_node_init(
  this: MiniAudio,
  options: {
    pNodeGraph: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pDelayNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_delay_node_init(
    options.pNodeGraph,
    options.pConfig,
    options.pAllocationCallbacks,
    options.pDelayNode
  ) as Pointer | null;
}

export function ma_delay_node_uninit(
  this: MiniAudio,
  options: {
    pDelayNode: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_delay_node_uninit(
    options.pDelayNode,
    options.pAllocationCallbacks
  );
}

export function ma_delay_node_set_wet(
  this: MiniAudio,
  options: {
    pDelayNode: Pointer | NodeJS.TypedArray | null;
    value: number;
  }
): void {
  this.symbols.ma_delay_node_set_wet(options.pDelayNode, options.value);
}

export function ma_delay_node_get_wet(
  this: MiniAudio,
  options: {
    pDelayNode: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_delay_node_get_wet(options.pDelayNode) as number;
}

export function ma_delay_node_set_dry(
  this: MiniAudio,
  options: {
    pDelayNode: Pointer | NodeJS.TypedArray | null;
    value: number;
  }
): void {
  this.symbols.ma_delay_node_set_dry(options.pDelayNode, options.value);
}

export function ma_delay_node_get_dry(
  this: MiniAudio,
  options: {
    pDelayNode: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_delay_node_get_dry(options.pDelayNode) as number;
}

export function ma_delay_node_set_decay(
  this: MiniAudio,
  options: {
    pDelayNode: Pointer | NodeJS.TypedArray | null;
    value: number;
  }
): void {
  this.symbols.ma_delay_node_set_decay(options.pDelayNode, options.value);
}

export function ma_delay_node_get_decay(
  this: MiniAudio,
  options: {
    pDelayNode: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_delay_node_get_decay(options.pDelayNode) as number;
}

export function ma_engine_node_config_init(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    type: Pointer | NodeJS.TypedArray | null;
    flags: number;
  }
): Pointer | null {
  return this.symbols.ma_engine_node_config_init(
    options.pEngine,
    options.type,
    options.flags
  ) as Pointer | null;
}

export function ma_engine_node_get_heap_size(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeapSizeInBytes: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_node_get_heap_size(
    options.pConfig,
    options.pHeapSizeInBytes
  ) as Pointer | null;
}

export function ma_engine_node_init_preallocated(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pHeap: Pointer | NodeJS.TypedArray | null;
    pEngineNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_node_init_preallocated(
    options.pConfig,
    options.pHeap,
    options.pEngineNode
  ) as Pointer | null;
}

export function ma_engine_node_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
    pEngineNode: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_node_init(
    options.pConfig,
    options.pAllocationCallbacks,
    options.pEngineNode
  ) as Pointer | null;
}

export function ma_engine_node_uninit(
  this: MiniAudio,
  options: {
    pEngineNode: Pointer | NodeJS.TypedArray | null;
    pAllocationCallbacks: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_engine_node_uninit(
    options.pEngineNode,
    options.pAllocationCallbacks
  );
}

export function ma_sound_config_init(this: MiniAudio): Pointer | null {
  return this.symbols.ma_sound_config_init() as Pointer | null;
}

export function ma_sound_config_init_2(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_config_init_2(options.pEngine) as Pointer | null;
}

export function ma_sound_group_config_init(this: MiniAudio): Pointer | null {
  return this.symbols.ma_sound_group_config_init() as Pointer | null;
}

export function ma_sound_group_config_init_2(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_config_init_2(
    options.pEngine
  ) as Pointer | null;
}

export function ma_engine_config_init(this: MiniAudio): Pointer | null {
  return this.symbols.ma_engine_config_init() as Pointer | null;
}

export function ma_engine_init(
  this: MiniAudio,
  options: {
    pConfig: Pointer | NodeJS.TypedArray | null;
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_init(
    options.pConfig,
    options.pEngine
  ) as Pointer | null;
}

export function ma_engine_uninit(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_engine_uninit(options.pEngine);
}

export function ma_engine_read_pcm_frames(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    pFramesOut: Pointer | NodeJS.TypedArray | null;
    frameCount: bigint;
    pFramesRead: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_read_pcm_frames(
    options.pEngine,
    options.pFramesOut,
    options.frameCount,
    options.pFramesRead
  ) as Pointer | null;
}

export function ma_engine_get_node_graph(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_get_node_graph(
    options.pEngine
  ) as Pointer | null;
}

export function ma_engine_get_resource_manager(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_get_resource_manager(
    options.pEngine
  ) as Pointer | null;
}

export function ma_engine_get_device(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_get_device(options.pEngine) as Pointer | null;
}

export function ma_engine_get_log(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_get_log(options.pEngine) as Pointer | null;
}

export function ma_engine_get_endpoint(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_get_endpoint(options.pEngine) as Pointer | null;
}

export function ma_engine_get_time_in_pcm_frames(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_get_time_in_pcm_frames(
    options.pEngine
  ) as Pointer | null;
}

export function ma_engine_get_time_in_milliseconds(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_get_time_in_milliseconds(
    options.pEngine
  ) as Pointer | null;
}

export function ma_engine_set_time_in_pcm_frames(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    globalTime: bigint;
  }
): Pointer | null {
  return this.symbols.ma_engine_set_time_in_pcm_frames(
    options.pEngine,
    options.globalTime
  ) as Pointer | null;
}

export function ma_engine_set_time_in_milliseconds(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    globalTime: bigint;
  }
): Pointer | null {
  return this.symbols.ma_engine_set_time_in_milliseconds(
    options.pEngine,
    options.globalTime
  ) as Pointer | null;
}

export function ma_engine_get_time(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_get_time(options.pEngine) as Pointer | null;
}

export function ma_engine_set_time(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    globalTime: bigint;
  }
): Pointer | null {
  return this.symbols.ma_engine_set_time(
    options.pEngine,
    options.globalTime
  ) as Pointer | null;
}

export function ma_engine_get_channels(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_get_channels(options.pEngine) as Pointer | null;
}

export function ma_engine_get_sample_rate(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_get_sample_rate(
    options.pEngine
  ) as Pointer | null;
}

export function ma_engine_start(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_start(options.pEngine) as Pointer | null;
}

export function ma_engine_stop(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_stop(options.pEngine) as Pointer | null;
}

export function ma_engine_set_volume(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    volume: number;
  }
): Pointer | null {
  return this.symbols.ma_engine_set_volume(
    options.pEngine,
    options.volume
  ) as Pointer | null;
}

export function ma_engine_get_volume(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_engine_get_volume(options.pEngine) as number;
}

export function ma_engine_set_gain_db(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    gainDB: number;
  }
): Pointer | null {
  return this.symbols.ma_engine_set_gain_db(
    options.pEngine,
    options.gainDB
  ) as Pointer | null;
}

export function ma_engine_get_gain_db(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_engine_get_gain_db(options.pEngine) as number;
}

export function ma_engine_get_listener_count(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_get_listener_count(
    options.pEngine
  ) as Pointer | null;
}

export function ma_engine_find_closest_listener(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    absolutePosX: number;
    absolutePosY: number;
    absolutePosZ: number;
  }
): Pointer | null {
  return this.symbols.ma_engine_find_closest_listener(
    options.pEngine,
    options.absolutePosX,
    options.absolutePosY,
    options.absolutePosZ
  ) as Pointer | null;
}

export function ma_engine_listener_set_position(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    listenerIndex: number;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_engine_listener_set_position(
    options.pEngine,
    options.listenerIndex,
    options.x,
    options.y,
    options.z
  );
}

export function ma_engine_listener_get_position(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    listenerIndex: number;
  }
): Pointer | null {
  return this.symbols.ma_engine_listener_get_position(
    options.pEngine,
    options.listenerIndex
  ) as Pointer | null;
}

export function ma_engine_listener_set_direction(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    listenerIndex: number;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_engine_listener_set_direction(
    options.pEngine,
    options.listenerIndex,
    options.x,
    options.y,
    options.z
  );
}

export function ma_engine_listener_get_direction(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    listenerIndex: number;
  }
): Pointer | null {
  return this.symbols.ma_engine_listener_get_direction(
    options.pEngine,
    options.listenerIndex
  ) as Pointer | null;
}

export function ma_engine_listener_set_velocity(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    listenerIndex: number;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_engine_listener_set_velocity(
    options.pEngine,
    options.listenerIndex,
    options.x,
    options.y,
    options.z
  );
}

export function ma_engine_listener_get_velocity(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    listenerIndex: number;
  }
): Pointer | null {
  return this.symbols.ma_engine_listener_get_velocity(
    options.pEngine,
    options.listenerIndex
  ) as Pointer | null;
}

export function ma_engine_listener_set_cone(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    listenerIndex: number;
    innerAngleInRadians: number;
    outerAngleInRadians: number;
    outerGain: number;
  }
): void {
  this.symbols.ma_engine_listener_set_cone(
    options.pEngine,
    options.listenerIndex,
    options.innerAngleInRadians,
    options.outerAngleInRadians,
    options.outerGain
  );
}

export function ma_engine_listener_get_cone(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    listenerIndex: number;
    pInnerAngleInRadians: Pointer | NodeJS.TypedArray | null;
    pOuterAngleInRadians: Pointer | NodeJS.TypedArray | null;
    pOuterGain: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_engine_listener_get_cone(
    options.pEngine,
    options.listenerIndex,
    options.pInnerAngleInRadians,
    options.pOuterAngleInRadians,
    options.pOuterGain
  );
}

export function ma_engine_listener_set_world_up(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    listenerIndex: number;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_engine_listener_set_world_up(
    options.pEngine,
    options.listenerIndex,
    options.x,
    options.y,
    options.z
  );
}

export function ma_engine_listener_get_world_up(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    listenerIndex: number;
  }
): Pointer | null {
  return this.symbols.ma_engine_listener_get_world_up(
    options.pEngine,
    options.listenerIndex
  ) as Pointer | null;
}

export function ma_engine_listener_set_enabled(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    listenerIndex: number;
    isEnabled: number;
  }
): void {
  this.symbols.ma_engine_listener_set_enabled(
    options.pEngine,
    options.listenerIndex,
    options.isEnabled
  );
}

export function ma_engine_listener_is_enabled(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    listenerIndex: number;
  }
): Pointer | null {
  return this.symbols.ma_engine_listener_is_enabled(
    options.pEngine,
    options.listenerIndex
  ) as Pointer | null;
}

export function ma_engine_play_sound_ex(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    pFilePath: string;
    pNode: Pointer | NodeJS.TypedArray | null;
    nodeInputBusIndex: number;
  }
): Pointer | null {
  return this.symbols.ma_engine_play_sound_ex(
    options.pEngine,
    stringToCString(options.pFilePath).ptr,
    options.pNode,
    options.nodeInputBusIndex
  ) as Pointer | null;
}

export function ma_engine_play_sound(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    pFilePath: string;
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_engine_play_sound(
    options.pEngine,
    stringToCString(options.pFilePath).ptr,
    options.pGroup
  ) as Pointer | null;
}

export function ma_sound_init_from_file(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    pFilePath: string;
    flags: number;
    pGroup: Pointer | NodeJS.TypedArray | null;
    pDoneFence: Pointer | NodeJS.TypedArray | null;
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_init_from_file(
    options.pEngine,
    stringToCString(options.pFilePath).ptr,
    options.flags,
    options.pGroup,
    options.pDoneFence,
    options.pSound
  ) as Pointer | null;
}

export function ma_sound_init_from_file_w(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    pFilePath: Pointer | NodeJS.TypedArray | null;
    flags: number;
    pGroup: Pointer | NodeJS.TypedArray | null;
    pDoneFence: Pointer | NodeJS.TypedArray | null;
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_init_from_file_w(
    options.pEngine,
    options.pFilePath,
    options.flags,
    options.pGroup,
    options.pDoneFence,
    options.pSound
  ) as Pointer | null;
}

export function ma_sound_init_copy(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    pExistingSound: Pointer | NodeJS.TypedArray | null;
    flags: number;
    pGroup: Pointer | NodeJS.TypedArray | null;
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_init_copy(
    options.pEngine,
    options.pExistingSound,
    options.flags,
    options.pGroup,
    options.pSound
  ) as Pointer | null;
}

export function ma_sound_init_from_data_source(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    pDataSource: Pointer | NodeJS.TypedArray | null;
    flags: number;
    pGroup: Pointer | NodeJS.TypedArray | null;
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_init_from_data_source(
    options.pEngine,
    options.pDataSource,
    options.flags,
    options.pGroup,
    options.pSound
  ) as Pointer | null;
}

export function ma_sound_init_ex(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_init_ex(
    options.pEngine,
    options.pConfig,
    options.pSound
  ) as Pointer | null;
}

export function ma_sound_uninit(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_sound_uninit(options.pSound);
}

export function ma_sound_get_engine(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_engine(options.pSound) as Pointer | null;
}

export function ma_sound_get_data_source(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_data_source(
    options.pSound
  ) as Pointer | null;
}

export function ma_sound_start(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_start(options.pSound) as Pointer | null;
}

export function ma_sound_stop(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_stop(options.pSound) as Pointer | null;
}

export function ma_sound_stop_with_fade_in_pcm_frames(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    fadeLengthInFrames: bigint;
  }
): Pointer | null {
  return this.symbols.ma_sound_stop_with_fade_in_pcm_frames(
    options.pSound,
    options.fadeLengthInFrames
  ) as Pointer | null;
}

export function ma_sound_stop_with_fade_in_milliseconds(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    fadeLengthInFrames: bigint;
  }
): Pointer | null {
  return this.symbols.ma_sound_stop_with_fade_in_milliseconds(
    options.pSound,
    options.fadeLengthInFrames
  ) as Pointer | null;
}

export function ma_sound_reset_start_time(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_sound_reset_start_time(options.pSound);
}

export function ma_sound_reset_stop_time(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_sound_reset_stop_time(options.pSound);
}

export function ma_sound_reset_fade(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_sound_reset_fade(options.pSound);
}

export function ma_sound_reset_stop_time_and_fade(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_sound_reset_stop_time_and_fade(options.pSound);
}

export function ma_sound_set_volume(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    volume: number;
  }
): void {
  this.symbols.ma_sound_set_volume(options.pSound, options.volume);
}

export function ma_sound_get_volume(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_get_volume(options.pSound) as number;
}

export function ma_sound_set_pan(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    pan: number;
  }
): void {
  this.symbols.ma_sound_set_pan(options.pSound, options.pan);
}

export function ma_sound_get_pan(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_get_pan(options.pSound) as number;
}

export function ma_sound_set_pan_mode(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    panMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_sound_set_pan_mode(options.pSound, options.panMode);
}

export function ma_sound_get_pan_mode(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_pan_mode(options.pSound) as Pointer | null;
}

export function ma_sound_set_pitch(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    pitch: number;
  }
): void {
  this.symbols.ma_sound_set_pitch(options.pSound, options.pitch);
}

export function ma_sound_get_pitch(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_get_pitch(options.pSound) as number;
}

export function ma_sound_set_spatialization_enabled(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    enabled: number;
  }
): void {
  this.symbols.ma_sound_set_spatialization_enabled(
    options.pSound,
    options.enabled
  );
}

export function ma_sound_is_spatialization_enabled(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_is_spatialization_enabled(
    options.pSound
  ) as Pointer | null;
}

export function ma_sound_set_pinned_listener_index(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    listenerIndex: number;
  }
): void {
  this.symbols.ma_sound_set_pinned_listener_index(
    options.pSound,
    options.listenerIndex
  );
}

export function ma_sound_get_pinned_listener_index(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_pinned_listener_index(
    options.pSound
  ) as Pointer | null;
}

export function ma_sound_get_listener_index(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_listener_index(
    options.pSound
  ) as Pointer | null;
}

export function ma_sound_get_direction_to_listener(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_direction_to_listener(
    options.pSound
  ) as Pointer | null;
}

export function ma_sound_set_position(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_sound_set_position(
    options.pSound,
    options.x,
    options.y,
    options.z
  );
}

export function ma_sound_get_position(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_position(options.pSound) as Pointer | null;
}

export function ma_sound_set_direction(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_sound_set_direction(
    options.pSound,
    options.x,
    options.y,
    options.z
  );
}

export function ma_sound_get_direction(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_direction(options.pSound) as Pointer | null;
}

export function ma_sound_set_velocity(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_sound_set_velocity(
    options.pSound,
    options.x,
    options.y,
    options.z
  );
}

export function ma_sound_get_velocity(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_velocity(options.pSound) as Pointer | null;
}

export function ma_sound_set_attenuation_model(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    attenuationModel: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_sound_set_attenuation_model(
    options.pSound,
    options.attenuationModel
  );
}

export function ma_sound_get_attenuation_model(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_attenuation_model(
    options.pSound
  ) as Pointer | null;
}

export function ma_sound_set_positioning(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    positioning: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_sound_set_positioning(options.pSound, options.positioning);
}

export function ma_sound_get_positioning(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_positioning(
    options.pSound
  ) as Pointer | null;
}

export function ma_sound_set_rolloff(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    rolloff: number;
  }
): void {
  this.symbols.ma_sound_set_rolloff(options.pSound, options.rolloff);
}

export function ma_sound_get_rolloff(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_get_rolloff(options.pSound) as number;
}

export function ma_sound_set_min_gain(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    minGain: number;
  }
): void {
  this.symbols.ma_sound_set_min_gain(options.pSound, options.minGain);
}

export function ma_sound_get_min_gain(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_get_min_gain(options.pSound) as number;
}

export function ma_sound_set_max_gain(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    maxGain: number;
  }
): void {
  this.symbols.ma_sound_set_max_gain(options.pSound, options.maxGain);
}

export function ma_sound_get_max_gain(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_get_max_gain(options.pSound) as number;
}

export function ma_sound_set_min_distance(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    minDistance: number;
  }
): void {
  this.symbols.ma_sound_set_min_distance(options.pSound, options.minDistance);
}

export function ma_sound_get_min_distance(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_get_min_distance(options.pSound) as number;
}

export function ma_sound_set_max_distance(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    maxDistance: number;
  }
): void {
  this.symbols.ma_sound_set_max_distance(options.pSound, options.maxDistance);
}

export function ma_sound_get_max_distance(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_get_max_distance(options.pSound) as number;
}

export function ma_sound_set_cone(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    innerAngleInRadians: number;
    outerAngleInRadians: number;
    outerGain: number;
  }
): void {
  this.symbols.ma_sound_set_cone(
    options.pSound,
    options.innerAngleInRadians,
    options.outerAngleInRadians,
    options.outerGain
  );
}

export function ma_sound_get_cone(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    pInnerAngleInRadians: Pointer | NodeJS.TypedArray | null;
    pOuterAngleInRadians: Pointer | NodeJS.TypedArray | null;
    pOuterGain: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_sound_get_cone(
    options.pSound,
    options.pInnerAngleInRadians,
    options.pOuterAngleInRadians,
    options.pOuterGain
  );
}

export function ma_sound_set_doppler_factor(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    dopplerFactor: number;
  }
): void {
  this.symbols.ma_sound_set_doppler_factor(
    options.pSound,
    options.dopplerFactor
  );
}

export function ma_sound_get_doppler_factor(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_get_doppler_factor(options.pSound) as number;
}

export function ma_sound_set_directional_attenuation_factor(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    directionalAttenuationFactor: number;
  }
): void {
  this.symbols.ma_sound_set_directional_attenuation_factor(
    options.pSound,
    options.directionalAttenuationFactor
  );
}

export function ma_sound_get_directional_attenuation_factor(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_get_directional_attenuation_factor(
    options.pSound
  ) as number;
}

export function ma_sound_set_fade_in_pcm_frames(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    volumeBeg: number;
    volumeEnd: number;
    fadeLengthInFrames: bigint;
  }
): void {
  this.symbols.ma_sound_set_fade_in_pcm_frames(
    options.pSound,
    options.volumeBeg,
    options.volumeEnd,
    options.fadeLengthInFrames
  );
}

export function ma_sound_set_fade_in_milliseconds(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    volumeBeg: number;
    volumeEnd: number;
    fadeLengthInMilliseconds: bigint;
  }
): void {
  this.symbols.ma_sound_set_fade_in_milliseconds(
    options.pSound,
    options.volumeBeg,
    options.volumeEnd,
    options.fadeLengthInMilliseconds
  );
}

export function ma_sound_set_fade_start_in_pcm_frames(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    volumeBeg: number;
    volumeEnd: number;
    fadeLengthInFrames: bigint;
    absoluteGlobalTimeInFrames: bigint;
  }
): void {
  this.symbols.ma_sound_set_fade_start_in_pcm_frames(
    options.pSound,
    options.volumeBeg,
    options.volumeEnd,
    options.fadeLengthInFrames,
    options.absoluteGlobalTimeInFrames
  );
}

export function ma_sound_set_fade_start_in_milliseconds(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    volumeBeg: number;
    volumeEnd: number;
    fadeLengthInMilliseconds: bigint;
    absoluteGlobalTimeInMilliseconds: bigint;
  }
): void {
  this.symbols.ma_sound_set_fade_start_in_milliseconds(
    options.pSound,
    options.volumeBeg,
    options.volumeEnd,
    options.fadeLengthInMilliseconds,
    options.absoluteGlobalTimeInMilliseconds
  );
}

export function ma_sound_get_current_fade_volume(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_get_current_fade_volume(
    options.pSound
  ) as number;
}

export function ma_sound_set_start_time_in_pcm_frames(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    absoluteGlobalTimeInFrames: bigint;
  }
): void {
  this.symbols.ma_sound_set_start_time_in_pcm_frames(
    options.pSound,
    options.absoluteGlobalTimeInFrames
  );
}

export function ma_sound_set_start_time_in_milliseconds(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    absoluteGlobalTimeInMilliseconds: bigint;
  }
): void {
  this.symbols.ma_sound_set_start_time_in_milliseconds(
    options.pSound,
    options.absoluteGlobalTimeInMilliseconds
  );
}

export function ma_sound_set_stop_time_in_pcm_frames(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    absoluteGlobalTimeInFrames: bigint;
  }
): void {
  this.symbols.ma_sound_set_stop_time_in_pcm_frames(
    options.pSound,
    options.absoluteGlobalTimeInFrames
  );
}

export function ma_sound_set_stop_time_in_milliseconds(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    absoluteGlobalTimeInMilliseconds: bigint;
  }
): void {
  this.symbols.ma_sound_set_stop_time_in_milliseconds(
    options.pSound,
    options.absoluteGlobalTimeInMilliseconds
  );
}

export function ma_sound_set_stop_time_with_fade_in_pcm_frames(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    stopAbsoluteGlobalTimeInFrames: bigint;
    fadeLengthInFrames: bigint;
  }
): void {
  this.symbols.ma_sound_set_stop_time_with_fade_in_pcm_frames(
    options.pSound,
    options.stopAbsoluteGlobalTimeInFrames,
    options.fadeLengthInFrames
  );
}

export function ma_sound_set_stop_time_with_fade_in_milliseconds(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    stopAbsoluteGlobalTimeInMilliseconds: bigint;
    fadeLengthInMilliseconds: bigint;
  }
): void {
  this.symbols.ma_sound_set_stop_time_with_fade_in_milliseconds(
    options.pSound,
    options.stopAbsoluteGlobalTimeInMilliseconds,
    options.fadeLengthInMilliseconds
  );
}

export function ma_sound_is_playing(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_is_playing(options.pSound) as Pointer | null;
}

export function ma_sound_get_time_in_pcm_frames(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_time_in_pcm_frames(
    options.pSound
  ) as Pointer | null;
}

export function ma_sound_get_time_in_milliseconds(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_time_in_milliseconds(
    options.pSound
  ) as Pointer | null;
}

export function ma_sound_set_looping(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    isLooping: number;
  }
): void {
  this.symbols.ma_sound_set_looping(options.pSound, options.isLooping);
}

export function ma_sound_is_looping(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_is_looping(options.pSound) as Pointer | null;
}

export function ma_sound_at_end(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_at_end(options.pSound) as Pointer | null;
}

export function ma_sound_seek_to_pcm_frame(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    frameIndex: bigint;
  }
): Pointer | null {
  return this.symbols.ma_sound_seek_to_pcm_frame(
    options.pSound,
    options.frameIndex
  ) as Pointer | null;
}

export function ma_sound_seek_to_second(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    seekPointInSeconds: number;
  }
): Pointer | null {
  return this.symbols.ma_sound_seek_to_second(
    options.pSound,
    options.seekPointInSeconds
  ) as Pointer | null;
}

export function ma_sound_get_data_format(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    pFormat: Pointer | NodeJS.TypedArray | null;
    pChannels: Pointer | NodeJS.TypedArray | null;
    pSampleRate: Pointer | NodeJS.TypedArray | null;
    pChannelMap: Pointer | NodeJS.TypedArray | null;
    channelMapCap: number;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_data_format(
    options.pSound,
    options.pFormat,
    options.pChannels,
    options.pSampleRate,
    options.pChannelMap,
    options.channelMapCap
  ) as Pointer | null;
}

export function ma_sound_get_cursor_in_pcm_frames(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    pCursor: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_cursor_in_pcm_frames(
    options.pSound,
    options.pCursor
  ) as Pointer | null;
}

export function ma_sound_get_length_in_pcm_frames(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    pLength: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_length_in_pcm_frames(
    options.pSound,
    options.pLength
  ) as Pointer | null;
}

export function ma_sound_get_cursor_in_seconds(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    pCursor: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_cursor_in_seconds(
    options.pSound,
    options.pCursor
  ) as Pointer | null;
}

export function ma_sound_get_length_in_seconds(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    pLength: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_get_length_in_seconds(
    options.pSound,
    options.pLength
  ) as Pointer | null;
}

export function ma_sound_set_end_callback(
  this: MiniAudio,
  options: {
    pSound: Pointer | NodeJS.TypedArray | null;
    callback: TypedJSCallback<ma_sound_end_proc>;
    pUserData: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_set_end_callback(
    options.pSound,
    options.callback,
    options.pUserData
  ) as Pointer | null;
}

export function ma_sound_group_init(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    flags: number;
    pParentGroup: Pointer | NodeJS.TypedArray | null;
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_init(
    options.pEngine,
    options.flags,
    options.pParentGroup,
    options.pGroup
  ) as Pointer | null;
}

export function ma_sound_group_init_ex(
  this: MiniAudio,
  options: {
    pEngine: Pointer | NodeJS.TypedArray | null;
    pConfig: Pointer | NodeJS.TypedArray | null;
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_init_ex(
    options.pEngine,
    options.pConfig,
    options.pGroup
  ) as Pointer | null;
}

export function ma_sound_group_uninit(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_sound_group_uninit(options.pGroup);
}

export function ma_sound_group_get_engine(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_get_engine(
    options.pGroup
  ) as Pointer | null;
}

export function ma_sound_group_start(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_start(options.pGroup) as Pointer | null;
}

export function ma_sound_group_stop(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_stop(options.pGroup) as Pointer | null;
}

export function ma_sound_group_set_volume(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    volume: number;
  }
): void {
  this.symbols.ma_sound_group_set_volume(options.pGroup, options.volume);
}

export function ma_sound_group_get_volume(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_group_get_volume(options.pGroup) as number;
}

export function ma_sound_group_set_pan(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    pan: number;
  }
): void {
  this.symbols.ma_sound_group_set_pan(options.pGroup, options.pan);
}

export function ma_sound_group_get_pan(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_group_get_pan(options.pGroup) as number;
}

export function ma_sound_group_set_pan_mode(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    panMode: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_sound_group_set_pan_mode(options.pGroup, options.panMode);
}

export function ma_sound_group_get_pan_mode(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_get_pan_mode(
    options.pGroup
  ) as Pointer | null;
}

export function ma_sound_group_set_pitch(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    pitch: number;
  }
): void {
  this.symbols.ma_sound_group_set_pitch(options.pGroup, options.pitch);
}

export function ma_sound_group_get_pitch(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_group_get_pitch(options.pGroup) as number;
}

export function ma_sound_group_set_spatialization_enabled(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    enabled: number;
  }
): void {
  this.symbols.ma_sound_group_set_spatialization_enabled(
    options.pGroup,
    options.enabled
  );
}

export function ma_sound_group_is_spatialization_enabled(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_is_spatialization_enabled(
    options.pGroup
  ) as Pointer | null;
}

export function ma_sound_group_set_pinned_listener_index(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    listenerIndex: number;
  }
): void {
  this.symbols.ma_sound_group_set_pinned_listener_index(
    options.pGroup,
    options.listenerIndex
  );
}

export function ma_sound_group_get_pinned_listener_index(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_get_pinned_listener_index(
    options.pGroup
  ) as Pointer | null;
}

export function ma_sound_group_get_listener_index(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_get_listener_index(
    options.pGroup
  ) as Pointer | null;
}

export function ma_sound_group_get_direction_to_listener(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_get_direction_to_listener(
    options.pGroup
  ) as Pointer | null;
}

export function ma_sound_group_set_position(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_sound_group_set_position(
    options.pGroup,
    options.x,
    options.y,
    options.z
  );
}

export function ma_sound_group_get_position(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_get_position(
    options.pGroup
  ) as Pointer | null;
}

export function ma_sound_group_set_direction(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_sound_group_set_direction(
    options.pGroup,
    options.x,
    options.y,
    options.z
  );
}

export function ma_sound_group_get_direction(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_get_direction(
    options.pGroup
  ) as Pointer | null;
}

export function ma_sound_group_set_velocity(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    x: number;
    y: number;
    z: number;
  }
): void {
  this.symbols.ma_sound_group_set_velocity(
    options.pGroup,
    options.x,
    options.y,
    options.z
  );
}

export function ma_sound_group_get_velocity(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_get_velocity(
    options.pGroup
  ) as Pointer | null;
}

export function ma_sound_group_set_attenuation_model(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    attenuationModel: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_sound_group_set_attenuation_model(
    options.pGroup,
    options.attenuationModel
  );
}

export function ma_sound_group_get_attenuation_model(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_get_attenuation_model(
    options.pGroup
  ) as Pointer | null;
}

export function ma_sound_group_set_positioning(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    positioning: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_sound_group_set_positioning(
    options.pGroup,
    options.positioning
  );
}

export function ma_sound_group_get_positioning(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_get_positioning(
    options.pGroup
  ) as Pointer | null;
}

export function ma_sound_group_set_rolloff(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    rolloff: number;
  }
): void {
  this.symbols.ma_sound_group_set_rolloff(options.pGroup, options.rolloff);
}

export function ma_sound_group_get_rolloff(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_group_get_rolloff(options.pGroup) as number;
}

export function ma_sound_group_set_min_gain(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    minGain: number;
  }
): void {
  this.symbols.ma_sound_group_set_min_gain(options.pGroup, options.minGain);
}

export function ma_sound_group_get_min_gain(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_group_get_min_gain(options.pGroup) as number;
}

export function ma_sound_group_set_max_gain(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    maxGain: number;
  }
): void {
  this.symbols.ma_sound_group_set_max_gain(options.pGroup, options.maxGain);
}

export function ma_sound_group_get_max_gain(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_group_get_max_gain(options.pGroup) as number;
}

export function ma_sound_group_set_min_distance(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    minDistance: number;
  }
): void {
  this.symbols.ma_sound_group_set_min_distance(
    options.pGroup,
    options.minDistance
  );
}

export function ma_sound_group_get_min_distance(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_group_get_min_distance(options.pGroup) as number;
}

export function ma_sound_group_set_max_distance(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    maxDistance: number;
  }
): void {
  this.symbols.ma_sound_group_set_max_distance(
    options.pGroup,
    options.maxDistance
  );
}

export function ma_sound_group_get_max_distance(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_group_get_max_distance(options.pGroup) as number;
}

export function ma_sound_group_set_cone(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    innerAngleInRadians: number;
    outerAngleInRadians: number;
    outerGain: number;
  }
): void {
  this.symbols.ma_sound_group_set_cone(
    options.pGroup,
    options.innerAngleInRadians,
    options.outerAngleInRadians,
    options.outerGain
  );
}

export function ma_sound_group_get_cone(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    pInnerAngleInRadians: Pointer | NodeJS.TypedArray | null;
    pOuterAngleInRadians: Pointer | NodeJS.TypedArray | null;
    pOuterGain: Pointer | NodeJS.TypedArray | null;
  }
): void {
  this.symbols.ma_sound_group_get_cone(
    options.pGroup,
    options.pInnerAngleInRadians,
    options.pOuterAngleInRadians,
    options.pOuterGain
  );
}

export function ma_sound_group_set_doppler_factor(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    dopplerFactor: number;
  }
): void {
  this.symbols.ma_sound_group_set_doppler_factor(
    options.pGroup,
    options.dopplerFactor
  );
}

export function ma_sound_group_get_doppler_factor(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_group_get_doppler_factor(
    options.pGroup
  ) as number;
}

export function ma_sound_group_set_directional_attenuation_factor(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    directionalAttenuationFactor: number;
  }
): void {
  this.symbols.ma_sound_group_set_directional_attenuation_factor(
    options.pGroup,
    options.directionalAttenuationFactor
  );
}

export function ma_sound_group_get_directional_attenuation_factor(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_group_get_directional_attenuation_factor(
    options.pGroup
  ) as number;
}

export function ma_sound_group_set_fade_in_pcm_frames(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    volumeBeg: number;
    volumeEnd: number;
    fadeLengthInFrames: bigint;
  }
): void {
  this.symbols.ma_sound_group_set_fade_in_pcm_frames(
    options.pGroup,
    options.volumeBeg,
    options.volumeEnd,
    options.fadeLengthInFrames
  );
}

export function ma_sound_group_set_fade_in_milliseconds(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    volumeBeg: number;
    volumeEnd: number;
    fadeLengthInMilliseconds: bigint;
  }
): void {
  this.symbols.ma_sound_group_set_fade_in_milliseconds(
    options.pGroup,
    options.volumeBeg,
    options.volumeEnd,
    options.fadeLengthInMilliseconds
  );
}

export function ma_sound_group_get_current_fade_volume(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): number {
  return this.symbols.ma_sound_group_get_current_fade_volume(
    options.pGroup
  ) as number;
}

export function ma_sound_group_set_start_time_in_pcm_frames(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    absoluteGlobalTimeInFrames: bigint;
  }
): void {
  this.symbols.ma_sound_group_set_start_time_in_pcm_frames(
    options.pGroup,
    options.absoluteGlobalTimeInFrames
  );
}

export function ma_sound_group_set_start_time_in_milliseconds(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    absoluteGlobalTimeInMilliseconds: bigint;
  }
): void {
  this.symbols.ma_sound_group_set_start_time_in_milliseconds(
    options.pGroup,
    options.absoluteGlobalTimeInMilliseconds
  );
}

export function ma_sound_group_set_stop_time_in_pcm_frames(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    absoluteGlobalTimeInFrames: bigint;
  }
): void {
  this.symbols.ma_sound_group_set_stop_time_in_pcm_frames(
    options.pGroup,
    options.absoluteGlobalTimeInFrames
  );
}

export function ma_sound_group_set_stop_time_in_milliseconds(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
    absoluteGlobalTimeInMilliseconds: bigint;
  }
): void {
  this.symbols.ma_sound_group_set_stop_time_in_milliseconds(
    options.pGroup,
    options.absoluteGlobalTimeInMilliseconds
  );
}

export function ma_sound_group_is_playing(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_is_playing(
    options.pGroup
  ) as Pointer | null;
}

export function ma_sound_group_get_time_in_pcm_frames(
  this: MiniAudio,
  options: {
    pGroup: Pointer | NodeJS.TypedArray | null;
  }
): Pointer | null {
  return this.symbols.ma_sound_group_get_time_in_pcm_frames(
    options.pGroup
  ) as Pointer | null;
}
