import { FFIType, type FFIFunction } from 'bun:ffi';

export const MiniAudioDefinition = {
  // ma_version
  ma_version: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_version_string
  ma_version_string: {
    args: [],
    returns: FFIType.cstring,
  },
  // ma_log_callback_init
  ma_log_callback_init: {
    args: [FFIType.function, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_log_init
  ma_log_init: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_log_uninit
  ma_log_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_log_register_callback
  ma_log_register_callback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_log_unregister_callback
  ma_log_unregister_callback: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_log_post
  ma_log_post: {
    args: [FFIType.ptr, FFIType.u32, FFIType.cstring],
    returns: FFIType.ptr,
  },
  // ma_log_postv
  ma_log_postv: {
    args: [FFIType.ptr, FFIType.u32, FFIType.cstring, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_log_postf
  ma_log_postf: {
    args: [FFIType.ptr, FFIType.u32, FFIType.cstring],
    returns: FFIType.ptr,
  },
  // ma_biquad_config_init
  ma_biquad_config_init: {
    args: [
      FFIType.ptr,
      FFIType.u32,
      FFIType.f64,
      FFIType.f64,
      FFIType.f64,
      FFIType.f64,
      FFIType.f64,
      FFIType.f64,
    ],
    returns: FFIType.ptr,
  },
  // ma_biquad_get_heap_size
  ma_biquad_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_biquad_init_preallocated
  ma_biquad_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_biquad_init
  ma_biquad_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_biquad_uninit
  ma_biquad_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_biquad_reinit
  ma_biquad_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_biquad_clear_cache
  ma_biquad_clear_cache: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_biquad_process_pcm_frames
  ma_biquad_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_biquad_get_latency
  ma_biquad_get_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf1_config_init
  ma_lpf1_config_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_lpf2_config_init
  ma_lpf2_config_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.f64, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_lpf1_get_heap_size
  ma_lpf1_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf1_init_preallocated
  ma_lpf1_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf1_init
  ma_lpf1_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf1_uninit
  ma_lpf1_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_lpf1_reinit
  ma_lpf1_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf1_clear_cache
  ma_lpf1_clear_cache: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf1_process_pcm_frames
  ma_lpf1_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_lpf1_get_latency
  ma_lpf1_get_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf2_get_heap_size
  ma_lpf2_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf2_init_preallocated
  ma_lpf2_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf2_init
  ma_lpf2_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf2_uninit
  ma_lpf2_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_lpf2_reinit
  ma_lpf2_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf2_clear_cache
  ma_lpf2_clear_cache: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf2_process_pcm_frames
  ma_lpf2_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_lpf2_get_latency
  ma_lpf2_get_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf_config_init
  ma_lpf_config_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.f64, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_lpf_get_heap_size
  ma_lpf_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf_init_preallocated
  ma_lpf_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf_init
  ma_lpf_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf_uninit
  ma_lpf_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_lpf_reinit
  ma_lpf_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf_clear_cache
  ma_lpf_clear_cache: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf_process_pcm_frames
  ma_lpf_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_lpf_get_latency
  ma_lpf_get_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf1_config_init
  ma_hpf1_config_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_hpf2_config_init
  ma_hpf2_config_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.f64, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_hpf1_get_heap_size
  ma_hpf1_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf1_init_preallocated
  ma_hpf1_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf1_init
  ma_hpf1_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf1_uninit
  ma_hpf1_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_hpf1_reinit
  ma_hpf1_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf1_process_pcm_frames
  ma_hpf1_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_hpf1_get_latency
  ma_hpf1_get_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf2_get_heap_size
  ma_hpf2_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf2_init_preallocated
  ma_hpf2_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf2_init
  ma_hpf2_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf2_uninit
  ma_hpf2_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_hpf2_reinit
  ma_hpf2_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf2_process_pcm_frames
  ma_hpf2_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_hpf2_get_latency
  ma_hpf2_get_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf_config_init
  ma_hpf_config_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.f64, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_hpf_get_heap_size
  ma_hpf_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf_init_preallocated
  ma_hpf_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf_init
  ma_hpf_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf_uninit
  ma_hpf_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_hpf_reinit
  ma_hpf_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf_process_pcm_frames
  ma_hpf_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_hpf_get_latency
  ma_hpf_get_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_bpf2_config_init
  ma_bpf2_config_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.f64, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_bpf2_get_heap_size
  ma_bpf2_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_bpf2_init_preallocated
  ma_bpf2_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_bpf2_init
  ma_bpf2_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_bpf2_uninit
  ma_bpf2_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_bpf2_reinit
  ma_bpf2_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_bpf2_process_pcm_frames
  ma_bpf2_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_bpf2_get_latency
  ma_bpf2_get_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_bpf_config_init
  ma_bpf_config_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.f64, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_bpf_get_heap_size
  ma_bpf_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_bpf_init_preallocated
  ma_bpf_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_bpf_init
  ma_bpf_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_bpf_uninit
  ma_bpf_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_bpf_reinit
  ma_bpf_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_bpf_process_pcm_frames
  ma_bpf_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_bpf_get_latency
  ma_bpf_get_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_notch2_config_init
  ma_notch2_config_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.f64, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_notch2_get_heap_size
  ma_notch2_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_notch2_init_preallocated
  ma_notch2_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_notch2_init
  ma_notch2_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_notch2_uninit
  ma_notch2_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_notch2_reinit
  ma_notch2_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_notch2_process_pcm_frames
  ma_notch2_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_notch2_get_latency
  ma_notch2_get_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_peak2_config_init
  ma_peak2_config_init: {
    args: [
      FFIType.ptr,
      FFIType.u32,
      FFIType.u32,
      FFIType.f64,
      FFIType.f64,
      FFIType.f64,
    ],
    returns: FFIType.ptr,
  },
  // ma_peak2_get_heap_size
  ma_peak2_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_peak2_init_preallocated
  ma_peak2_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_peak2_init
  ma_peak2_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_peak2_uninit
  ma_peak2_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_peak2_reinit
  ma_peak2_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_peak2_process_pcm_frames
  ma_peak2_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_peak2_get_latency
  ma_peak2_get_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_loshelf2_config_init
  ma_loshelf2_config_init: {
    args: [
      FFIType.ptr,
      FFIType.u32,
      FFIType.u32,
      FFIType.f64,
      FFIType.f64,
      FFIType.f64,
    ],
    returns: FFIType.ptr,
  },
  // ma_loshelf2_get_heap_size
  ma_loshelf2_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_loshelf2_init_preallocated
  ma_loshelf2_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_loshelf2_init
  ma_loshelf2_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_loshelf2_uninit
  ma_loshelf2_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_loshelf2_reinit
  ma_loshelf2_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_loshelf2_process_pcm_frames
  ma_loshelf2_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_loshelf2_get_latency
  ma_loshelf2_get_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hishelf2_config_init
  ma_hishelf2_config_init: {
    args: [
      FFIType.ptr,
      FFIType.u32,
      FFIType.u32,
      FFIType.f64,
      FFIType.f64,
      FFIType.f64,
    ],
    returns: FFIType.ptr,
  },
  // ma_hishelf2_get_heap_size
  ma_hishelf2_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hishelf2_init_preallocated
  ma_hishelf2_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hishelf2_init
  ma_hishelf2_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hishelf2_uninit
  ma_hishelf2_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_hishelf2_reinit
  ma_hishelf2_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hishelf2_process_pcm_frames
  ma_hishelf2_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_hishelf2_get_latency
  ma_hishelf2_get_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_delay_config_init
  ma_delay_config_init: {
    args: [FFIType.u32, FFIType.u32, FFIType.u32, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_delay_init
  ma_delay_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_delay_uninit
  ma_delay_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_delay_process_pcm_frames
  ma_delay_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_delay_set_wet
  ma_delay_set_wet: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_delay_get_wet
  ma_delay_get_wet: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_delay_set_dry
  ma_delay_set_dry: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_delay_get_dry
  ma_delay_get_dry: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_delay_set_decay
  ma_delay_set_decay: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_delay_get_decay
  ma_delay_get_decay: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_gainer_config_init
  ma_gainer_config_init: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_gainer_get_heap_size
  ma_gainer_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_gainer_init_preallocated
  ma_gainer_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_gainer_init
  ma_gainer_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_gainer_uninit
  ma_gainer_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_gainer_process_pcm_frames
  ma_gainer_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_gainer_set_gain
  ma_gainer_set_gain: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_gainer_set_gains
  ma_gainer_set_gains: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_gainer_set_master_volume
  ma_gainer_set_master_volume: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_gainer_get_master_volume
  ma_gainer_get_master_volume: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_panner_config_init
  ma_panner_config_init: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_panner_init
  ma_panner_init: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_panner_process_pcm_frames
  ma_panner_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_panner_set_mode
  ma_panner_set_mode: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_panner_get_mode
  ma_panner_get_mode: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_panner_set_pan
  ma_panner_set_pan: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_panner_get_pan
  ma_panner_get_pan: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_fader_config_init
  ma_fader_config_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_fader_init
  ma_fader_init: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_fader_process_pcm_frames
  ma_fader_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_fader_get_data_format
  ma_fader_get_data_format: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_fader_set_fade
  ma_fader_set_fade: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_fader_set_fade_ex
  ma_fader_set_fade_ex: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.u64, FFIType.i64],
    returns: FFIType.void,
  },
  // ma_fader_get_current_volume
  ma_fader_get_current_volume: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_spatializer_listener_config_init
  ma_spatializer_listener_config_init: {
    args: [FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_spatializer_listener_get_heap_size
  ma_spatializer_listener_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_listener_init_preallocated
  ma_spatializer_listener_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_listener_init
  ma_spatializer_listener_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_listener_uninit
  ma_spatializer_listener_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_spatializer_listener_get_channel_map
  ma_spatializer_listener_get_channel_map: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_listener_set_cone
  ma_spatializer_listener_set_cone: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_listener_get_cone
  ma_spatializer_listener_get_cone: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_spatializer_listener_set_position
  ma_spatializer_listener_set_position: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_listener_get_position
  ma_spatializer_listener_get_position: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_listener_set_direction
  ma_spatializer_listener_set_direction: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_listener_get_direction
  ma_spatializer_listener_get_direction: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_listener_set_velocity
  ma_spatializer_listener_set_velocity: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_listener_get_velocity
  ma_spatializer_listener_get_velocity: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_listener_set_speed_of_sound
  ma_spatializer_listener_set_speed_of_sound: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_listener_get_speed_of_sound
  ma_spatializer_listener_get_speed_of_sound: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_spatializer_listener_set_world_up
  ma_spatializer_listener_set_world_up: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_listener_get_world_up
  ma_spatializer_listener_get_world_up: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_listener_set_enabled
  ma_spatializer_listener_set_enabled: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.void,
  },
  // ma_spatializer_listener_is_enabled
  ma_spatializer_listener_is_enabled: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_config_init
  ma_spatializer_config_init: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_spatializer_get_heap_size
  ma_spatializer_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_init_preallocated
  ma_spatializer_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_init
  ma_spatializer_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_uninit
  ma_spatializer_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_spatializer_process_pcm_frames
  ma_spatializer_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_spatializer_set_master_volume
  ma_spatializer_set_master_volume: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_spatializer_get_master_volume
  ma_spatializer_get_master_volume: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_get_input_channels
  ma_spatializer_get_input_channels: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_get_output_channels
  ma_spatializer_get_output_channels: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_set_attenuation_model
  ma_spatializer_set_attenuation_model: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_spatializer_get_attenuation_model
  ma_spatializer_get_attenuation_model: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_set_positioning
  ma_spatializer_set_positioning: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_spatializer_get_positioning
  ma_spatializer_get_positioning: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_set_rolloff
  ma_spatializer_set_rolloff: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_get_rolloff
  ma_spatializer_get_rolloff: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_spatializer_set_min_gain
  ma_spatializer_set_min_gain: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_get_min_gain
  ma_spatializer_get_min_gain: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_spatializer_set_max_gain
  ma_spatializer_set_max_gain: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_get_max_gain
  ma_spatializer_get_max_gain: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_spatializer_set_min_distance
  ma_spatializer_set_min_distance: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_get_min_distance
  ma_spatializer_get_min_distance: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_spatializer_set_max_distance
  ma_spatializer_set_max_distance: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_get_max_distance
  ma_spatializer_get_max_distance: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_spatializer_set_cone
  ma_spatializer_set_cone: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_get_cone
  ma_spatializer_get_cone: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_spatializer_set_doppler_factor
  ma_spatializer_set_doppler_factor: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_get_doppler_factor
  ma_spatializer_get_doppler_factor: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_spatializer_set_directional_attenuation_factor
  ma_spatializer_set_directional_attenuation_factor: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_get_directional_attenuation_factor
  ma_spatializer_get_directional_attenuation_factor: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_spatializer_set_position
  ma_spatializer_set_position: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_get_position
  ma_spatializer_get_position: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_set_direction
  ma_spatializer_set_direction: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_get_direction
  ma_spatializer_get_direction: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_set_velocity
  ma_spatializer_set_velocity: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_spatializer_get_velocity
  ma_spatializer_get_velocity: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spatializer_get_relative_position_and_direction
  ma_spatializer_get_relative_position_and_direction: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_linear_resampler_config_init
  ma_linear_resampler_config_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_linear_resampler_get_heap_size
  ma_linear_resampler_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_linear_resampler_init_preallocated
  ma_linear_resampler_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_linear_resampler_init
  ma_linear_resampler_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_linear_resampler_uninit
  ma_linear_resampler_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_linear_resampler_process_pcm_frames
  ma_linear_resampler_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_linear_resampler_set_rate
  ma_linear_resampler_set_rate: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_linear_resampler_set_rate_ratio
  ma_linear_resampler_set_rate_ratio: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_linear_resampler_get_input_latency
  ma_linear_resampler_get_input_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_linear_resampler_get_output_latency
  ma_linear_resampler_get_output_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_linear_resampler_get_required_input_frame_count
  ma_linear_resampler_get_required_input_frame_count: {
    args: [FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_linear_resampler_get_expected_output_frame_count
  ma_linear_resampler_get_expected_output_frame_count: {
    args: [FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_linear_resampler_reset
  ma_linear_resampler_reset: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resampler_config_init
  ma_resampler_config_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resampler_get_heap_size
  ma_resampler_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resampler_init_preallocated
  ma_resampler_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resampler_init
  ma_resampler_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resampler_uninit
  ma_resampler_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_resampler_process_pcm_frames
  ma_resampler_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resampler_set_rate
  ma_resampler_set_rate: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_resampler_set_rate_ratio
  ma_resampler_set_rate_ratio: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_resampler_get_input_latency
  ma_resampler_get_input_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resampler_get_output_latency
  ma_resampler_get_output_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resampler_get_required_input_frame_count
  ma_resampler_get_required_input_frame_count: {
    args: [FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resampler_get_expected_output_frame_count
  ma_resampler_get_expected_output_frame_count: {
    args: [FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resampler_reset
  ma_resampler_reset: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_channel_converter_config_init
  ma_channel_converter_config_init: {
    args: [
      FFIType.ptr,
      FFIType.u32,
      FFIType.ptr,
      FFIType.u32,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.ptr,
  },
  // ma_channel_converter_get_heap_size
  ma_channel_converter_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_channel_converter_init_preallocated
  ma_channel_converter_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_channel_converter_init
  ma_channel_converter_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_channel_converter_uninit
  ma_channel_converter_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_channel_converter_process_pcm_frames
  ma_channel_converter_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_channel_converter_get_input_channel_map
  ma_channel_converter_get_input_channel_map: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_channel_converter_get_output_channel_map
  ma_channel_converter_get_output_channel_map: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_data_converter_config_init_default
  ma_data_converter_config_init_default: {
    args: [],
    returns: FFIType.ptr,
  },
  // ma_data_converter_config_init
  ma_data_converter_config_init: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.u32,
      FFIType.u32,
      FFIType.u32,
      FFIType.u32,
    ],
    returns: FFIType.ptr,
  },
  // ma_data_converter_get_heap_size
  ma_data_converter_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_converter_init_preallocated
  ma_data_converter_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_converter_init
  ma_data_converter_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_converter_uninit
  ma_data_converter_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_data_converter_process_pcm_frames
  ma_data_converter_process_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_converter_set_rate
  ma_data_converter_set_rate: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_data_converter_set_rate_ratio
  ma_data_converter_set_rate_ratio: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_data_converter_get_input_latency
  ma_data_converter_get_input_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_converter_get_output_latency
  ma_data_converter_get_output_latency: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_converter_get_required_input_frame_count
  ma_data_converter_get_required_input_frame_count: {
    args: [FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_converter_get_expected_output_frame_count
  ma_data_converter_get_expected_output_frame_count: {
    args: [FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_converter_get_input_channel_map
  ma_data_converter_get_input_channel_map: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_data_converter_get_output_channel_map
  ma_data_converter_get_output_channel_map: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_data_converter_reset
  ma_data_converter_reset: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_pcm_u8_to_s16
  ma_pcm_u8_to_s16: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_u8_to_s24
  ma_pcm_u8_to_s24: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_u8_to_s32
  ma_pcm_u8_to_s32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_u8_to_f32
  ma_pcm_u8_to_f32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_s16_to_u8
  ma_pcm_s16_to_u8: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_s16_to_s24
  ma_pcm_s16_to_s24: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_s16_to_s32
  ma_pcm_s16_to_s32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_s16_to_f32
  ma_pcm_s16_to_f32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_s24_to_u8
  ma_pcm_s24_to_u8: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_s24_to_s16
  ma_pcm_s24_to_s16: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_s24_to_s32
  ma_pcm_s24_to_s32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_s24_to_f32
  ma_pcm_s24_to_f32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_s32_to_u8
  ma_pcm_s32_to_u8: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_s32_to_s16
  ma_pcm_s32_to_s16: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_s32_to_s24
  ma_pcm_s32_to_s24: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_s32_to_f32
  ma_pcm_s32_to_f32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_f32_to_u8
  ma_pcm_f32_to_u8: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_f32_to_s16
  ma_pcm_f32_to_s16: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_f32_to_s24
  ma_pcm_f32_to_s24: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_f32_to_s32
  ma_pcm_f32_to_s32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_convert
  ma_pcm_convert: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.u64,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // ma_convert_pcm_frames_format
  ma_convert_pcm_frames_format: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.u64,
      FFIType.u32,
      FFIType.ptr,
    ],
    returns: FFIType.void,
  },
  // ma_deinterleave_pcm_frames
  ma_deinterleave_pcm_frames: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u64, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_interleave_pcm_frames
  ma_interleave_pcm_frames: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u64, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_channel_map_get_channel
  ma_channel_map_get_channel: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_channel_map_init_blank
  ma_channel_map_init_blank: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.void,
  },
  // ma_channel_map_init_standard
  ma_channel_map_init_standard: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // ma_channel_map_copy
  ma_channel_map_copy: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u32],
    returns: FFIType.void,
  },
  // ma_channel_map_copy_or_default
  ma_channel_map_copy_or_default: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.u32],
    returns: FFIType.void,
  },
  // ma_channel_map_is_valid
  ma_channel_map_is_valid: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_channel_map_is_equal
  ma_channel_map_is_equal: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_channel_map_is_blank
  ma_channel_map_is_blank: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_channel_map_contains_channel_position
  ma_channel_map_contains_channel_position: {
    args: [FFIType.u32, FFIType.ptr, FFIType.u8],
    returns: FFIType.ptr,
  },
  // ma_channel_map_find_channel_position
  ma_channel_map_find_channel_position: {
    args: [FFIType.u32, FFIType.ptr, FFIType.u8, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_channel_map_to_string
  ma_channel_map_to_string: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.u32],
    returns: FFIType.u64,
  },
  // ma_channel_position_to_string
  ma_channel_position_to_string: {
    args: [FFIType.u8],
    returns: FFIType.cstring,
  },
  // ma_convert_frames
  ma_convert_frames: {
    args: [
      FFIType.ptr,
      FFIType.u64,
      FFIType.ptr,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
      FFIType.u64,
      FFIType.ptr,
      FFIType.u32,
      FFIType.u32,
    ],
    returns: FFIType.ptr,
  },
  // ma_convert_frames_ex
  ma_convert_frames_ex: {
    args: [FFIType.ptr, FFIType.u64, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_config_init
  ma_data_source_config_init: {
    args: [],
    returns: FFIType.ptr,
  },
  // ma_data_source_init
  ma_data_source_init: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_uninit
  ma_data_source_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_data_source_read_pcm_frames
  ma_data_source_read_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_seek_pcm_frames
  ma_data_source_seek_pcm_frames: {
    args: [FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_seek_to_pcm_frame
  ma_data_source_seek_to_pcm_frame: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_data_source_seek_seconds
  ma_data_source_seek_seconds: {
    args: [FFIType.ptr, FFIType.f32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_seek_to_second
  ma_data_source_seek_to_second: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_data_source_get_data_format
  ma_data_source_get_data_format: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.u32,
    ],
    returns: FFIType.ptr,
  },
  // ma_data_source_get_cursor_in_pcm_frames
  ma_data_source_get_cursor_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_get_length_in_pcm_frames
  ma_data_source_get_length_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_get_cursor_in_seconds
  ma_data_source_get_cursor_in_seconds: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_get_length_in_seconds
  ma_data_source_get_length_in_seconds: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_set_looping
  ma_data_source_set_looping: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_data_source_is_looping
  ma_data_source_is_looping: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_set_range_in_pcm_frames
  ma_data_source_set_range_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.u64, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_data_source_get_range_in_pcm_frames
  ma_data_source_get_range_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_data_source_set_loop_point_in_pcm_frames
  ma_data_source_set_loop_point_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.u64, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_data_source_get_loop_point_in_pcm_frames
  ma_data_source_get_loop_point_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_data_source_set_current
  ma_data_source_set_current: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_get_current
  ma_data_source_get_current: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_set_next
  ma_data_source_set_next: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_get_next
  ma_data_source_get_next: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_set_next_callback
  ma_data_source_set_next_callback: {
    args: [FFIType.ptr, FFIType.function],
    returns: FFIType.ptr,
  },
  // ma_data_source_get_next_callback
  ma_data_source_get_next_callback: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_ref_init
  ma_audio_buffer_ref_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_ref_uninit
  ma_audio_buffer_ref_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_audio_buffer_ref_set_data
  ma_audio_buffer_ref_set_data: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_ref_read_pcm_frames
  ma_audio_buffer_ref_read_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_ref_seek_to_pcm_frame
  ma_audio_buffer_ref_seek_to_pcm_frame: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_ref_map
  ma_audio_buffer_ref_map: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_ref_unmap
  ma_audio_buffer_ref_unmap: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_ref_at_end
  ma_audio_buffer_ref_at_end: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_ref_get_cursor_in_pcm_frames
  ma_audio_buffer_ref_get_cursor_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_ref_get_length_in_pcm_frames
  ma_audio_buffer_ref_get_length_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_ref_get_available_frames
  ma_audio_buffer_ref_get_available_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_config_init
  ma_audio_buffer_config_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u64, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_init
  ma_audio_buffer_init: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_init_copy
  ma_audio_buffer_init_copy: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_alloc_and_init
  ma_audio_buffer_alloc_and_init: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_uninit
  ma_audio_buffer_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_audio_buffer_uninit_and_free
  ma_audio_buffer_uninit_and_free: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_audio_buffer_read_pcm_frames
  ma_audio_buffer_read_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_seek_to_pcm_frame
  ma_audio_buffer_seek_to_pcm_frame: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_map
  ma_audio_buffer_map: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_unmap
  ma_audio_buffer_unmap: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_at_end
  ma_audio_buffer_at_end: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_get_cursor_in_pcm_frames
  ma_audio_buffer_get_cursor_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_get_length_in_pcm_frames
  ma_audio_buffer_get_length_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_audio_buffer_get_available_frames
  ma_audio_buffer_get_available_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_paged_audio_buffer_data_init
  ma_paged_audio_buffer_data_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_paged_audio_buffer_data_uninit
  ma_paged_audio_buffer_data_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_paged_audio_buffer_data_get_head
  ma_paged_audio_buffer_data_get_head: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_paged_audio_buffer_data_get_tail
  ma_paged_audio_buffer_data_get_tail: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_paged_audio_buffer_data_get_length_in_pcm_frames
  ma_paged_audio_buffer_data_get_length_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_paged_audio_buffer_data_allocate_page
  ma_paged_audio_buffer_data_allocate_page: {
    args: [FFIType.ptr, FFIType.u64, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_paged_audio_buffer_data_free_page
  ma_paged_audio_buffer_data_free_page: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_paged_audio_buffer_data_append_page
  ma_paged_audio_buffer_data_append_page: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_paged_audio_buffer_data_allocate_and_append_page
  ma_paged_audio_buffer_data_allocate_and_append_page: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_paged_audio_buffer_config_init
  ma_paged_audio_buffer_config_init: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_paged_audio_buffer_init
  ma_paged_audio_buffer_init: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_paged_audio_buffer_uninit
  ma_paged_audio_buffer_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_paged_audio_buffer_read_pcm_frames
  ma_paged_audio_buffer_read_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_paged_audio_buffer_seek_to_pcm_frame
  ma_paged_audio_buffer_seek_to_pcm_frame: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_paged_audio_buffer_get_cursor_in_pcm_frames
  ma_paged_audio_buffer_get_cursor_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_paged_audio_buffer_get_length_in_pcm_frames
  ma_paged_audio_buffer_get_length_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_rb_init_ex
  ma_rb_init_ex: {
    args: [
      FFIType.u32,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.ptr,
  },
  // ma_rb_init
  ma_rb_init: {
    args: [FFIType.u32, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_rb_uninit
  ma_rb_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_rb_reset
  ma_rb_reset: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_rb_acquire_read
  ma_rb_acquire_read: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_rb_commit_read
  ma_rb_commit_read: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_rb_acquire_write
  ma_rb_acquire_write: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_rb_commit_write
  ma_rb_commit_write: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_rb_seek_read
  ma_rb_seek_read: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_rb_seek_write
  ma_rb_seek_write: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_rb_pointer_distance
  ma_rb_pointer_distance: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_rb_available_read
  ma_rb_available_read: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_rb_available_write
  ma_rb_available_write: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_rb_get_subbuffer_size
  ma_rb_get_subbuffer_size: {
    args: [FFIType.ptr],
    returns: FFIType.u64,
  },
  // ma_rb_get_subbuffer_stride
  ma_rb_get_subbuffer_stride: {
    args: [FFIType.ptr],
    returns: FFIType.u64,
  },
  // ma_rb_get_subbuffer_offset
  ma_rb_get_subbuffer_offset: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.u64,
  },
  // ma_rb_get_subbuffer_ptr
  ma_rb_get_subbuffer_ptr: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_init_ex
  ma_pcm_rb_init_ex: {
    args: [
      FFIType.ptr,
      FFIType.u32,
      FFIType.u32,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_init
  ma_pcm_rb_init: {
    args: [
      FFIType.ptr,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_uninit
  ma_pcm_rb_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_rb_reset
  ma_pcm_rb_reset: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pcm_rb_acquire_read
  ma_pcm_rb_acquire_read: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_commit_read
  ma_pcm_rb_commit_read: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_acquire_write
  ma_pcm_rb_acquire_write: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_commit_write
  ma_pcm_rb_commit_write: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_seek_read
  ma_pcm_rb_seek_read: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_seek_write
  ma_pcm_rb_seek_write: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_pointer_distance
  ma_pcm_rb_pointer_distance: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_available_read
  ma_pcm_rb_available_read: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_available_write
  ma_pcm_rb_available_write: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_get_subbuffer_size
  ma_pcm_rb_get_subbuffer_size: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_get_subbuffer_stride
  ma_pcm_rb_get_subbuffer_stride: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_get_subbuffer_offset
  ma_pcm_rb_get_subbuffer_offset: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_get_subbuffer_ptr
  ma_pcm_rb_get_subbuffer_ptr: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_get_format
  ma_pcm_rb_get_format: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_get_channels
  ma_pcm_rb_get_channels: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_get_sample_rate
  ma_pcm_rb_get_sample_rate: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_pcm_rb_set_sample_rate
  ma_pcm_rb_set_sample_rate: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.void,
  },
  // ma_duplex_rb_init
  ma_duplex_rb_init: {
    args: [
      FFIType.ptr,
      FFIType.u32,
      FFIType.u32,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.ptr,
  },
  // ma_duplex_rb_uninit
  ma_duplex_rb_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_result_description
  ma_result_description: {
    args: [FFIType.ptr],
    returns: FFIType.cstring,
  },
  // ma_malloc
  ma_malloc: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_calloc
  ma_calloc: {
    args: [FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_realloc
  ma_realloc: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_free
  ma_free: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_aligned_malloc
  ma_aligned_malloc: {
    args: [FFIType.u32, FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_aligned_free
  ma_aligned_free: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_get_format_name
  ma_get_format_name: {
    args: [FFIType.ptr],
    returns: FFIType.cstring,
  },
  // ma_blend_f32
  ma_blend_f32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.f32, FFIType.u32],
    returns: FFIType.void,
  },
  // ma_get_bytes_per_sample
  ma_get_bytes_per_sample: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_log_level_to_string
  ma_log_level_to_string: {
    args: [FFIType.u32],
    returns: FFIType.cstring,
  },
  // ma_spinlock_lock
  ma_spinlock_lock: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spinlock_lock_noyield
  ma_spinlock_lock_noyield: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_spinlock_unlock
  ma_spinlock_unlock: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_mutex_init
  ma_mutex_init: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_mutex_uninit
  ma_mutex_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_mutex_lock
  ma_mutex_lock: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_mutex_unlock
  ma_mutex_unlock: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_event_init
  ma_event_init: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_event_uninit
  ma_event_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_event_wait
  ma_event_wait: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_event_signal
  ma_event_signal: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_semaphore_init
  ma_semaphore_init: {
    args: [FFIType.i32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_semaphore_uninit
  ma_semaphore_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_semaphore_wait
  ma_semaphore_wait: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_semaphore_release
  ma_semaphore_release: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_fence_init
  ma_fence_init: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_fence_uninit
  ma_fence_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_fence_acquire
  ma_fence_acquire: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_fence_release
  ma_fence_release: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_fence_wait
  ma_fence_wait: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_async_notification_signal
  ma_async_notification_signal: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_async_notification_poll_init
  ma_async_notification_poll_init: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_async_notification_poll_is_signalled
  ma_async_notification_poll_is_signalled: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_async_notification_event_init
  ma_async_notification_event_init: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_async_notification_event_uninit
  ma_async_notification_event_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_async_notification_event_wait
  ma_async_notification_event_wait: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_async_notification_event_signal
  ma_async_notification_event_signal: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_slot_allocator_config_init
  ma_slot_allocator_config_init: {
    args: [FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_slot_allocator_get_heap_size
  ma_slot_allocator_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_slot_allocator_init_preallocated
  ma_slot_allocator_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_slot_allocator_init
  ma_slot_allocator_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_slot_allocator_uninit
  ma_slot_allocator_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_slot_allocator_alloc
  ma_slot_allocator_alloc: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_slot_allocator_free
  ma_slot_allocator_free: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_job_init
  ma_job_init: {
    args: [FFIType.u16],
    returns: FFIType.ptr,
  },
  // ma_job_process
  ma_job_process: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_job_queue_config_init
  ma_job_queue_config_init: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_job_queue_get_heap_size
  ma_job_queue_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_job_queue_init_preallocated
  ma_job_queue_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_job_queue_init
  ma_job_queue_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_job_queue_uninit
  ma_job_queue_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_job_queue_post
  ma_job_queue_post: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_job_queue_next
  ma_job_queue_next: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_job_thread_config_init
  ma_device_job_thread_config_init: {
    args: [],
    returns: FFIType.ptr,
  },
  // ma_device_job_thread_init
  ma_device_job_thread_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_job_thread_uninit
  ma_device_job_thread_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_device_job_thread_post
  ma_device_job_thread_post: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_job_thread_next
  ma_device_job_thread_next: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_id_equal
  ma_device_id_equal: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_context_config_init
  ma_context_config_init: {
    args: [],
    returns: FFIType.ptr,
  },
  // ma_context_init
  ma_context_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_context_uninit
  ma_context_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_context_sizeof
  ma_context_sizeof: {
    args: [],
    returns: FFIType.u64,
  },
  // ma_context_get_log
  ma_context_get_log: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_context_enumerate_devices
  ma_context_enumerate_devices: {
    args: [FFIType.ptr, FFIType.function, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_context_get_devices
  ma_context_get_devices: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_context_get_device_info
  ma_context_get_device_info: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_context_is_loopback_supported
  ma_context_is_loopback_supported: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_config_init
  ma_device_config_init: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_init
  ma_device_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_init_ex
  ma_device_init_ex: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_uninit
  ma_device_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_device_get_context
  ma_device_get_context: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_get_log
  ma_device_get_log: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_get_info
  ma_device_get_info: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_get_name
  ma_device_get_name: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_start
  ma_device_start: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_stop
  ma_device_stop: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_is_started
  ma_device_is_started: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_get_state
  ma_device_get_state: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_post_init
  ma_device_post_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_set_master_volume
  ma_device_set_master_volume: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_device_get_master_volume
  ma_device_get_master_volume: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_set_master_volume_db
  ma_device_set_master_volume_db: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_device_get_master_volume_db
  ma_device_get_master_volume_db: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_device_handle_backend_data_callback
  ma_device_handle_backend_data_callback: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_calculate_buffer_size_in_frames_from_descriptor
  ma_calculate_buffer_size_in_frames_from_descriptor: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_get_backend_name
  ma_get_backend_name: {
    args: [FFIType.ptr],
    returns: FFIType.cstring,
  },
  // ma_get_backend_from_name
  ma_get_backend_from_name: {
    args: [FFIType.cstring, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_is_backend_enabled
  ma_is_backend_enabled: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_get_enabled_backends
  ma_get_enabled_backends: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_is_loopback_supported
  ma_is_loopback_supported: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_calculate_buffer_size_in_milliseconds_from_frames
  ma_calculate_buffer_size_in_milliseconds_from_frames: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_calculate_buffer_size_in_frames_from_milliseconds
  ma_calculate_buffer_size_in_frames_from_milliseconds: {
    args: [FFIType.u32, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_copy_pcm_frames
  ma_copy_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr, FFIType.u32],
    returns: FFIType.void,
  },
  // ma_silence_pcm_frames
  ma_silence_pcm_frames: {
    args: [FFIType.ptr, FFIType.u64, FFIType.ptr, FFIType.u32],
    returns: FFIType.void,
  },
  // ma_offset_pcm_frames_ptr
  ma_offset_pcm_frames_ptr: {
    args: [FFIType.ptr, FFIType.u64, FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_offset_pcm_frames_const_ptr
  ma_offset_pcm_frames_const_ptr: {
    args: [FFIType.ptr, FFIType.u64, FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_clip_samples_u8
  ma_clip_samples_u8: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_clip_samples_s16
  ma_clip_samples_s16: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_clip_samples_s24
  ma_clip_samples_s24: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_clip_samples_s32
  ma_clip_samples_s32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_clip_samples_f32
  ma_clip_samples_f32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_clip_pcm_frames
  ma_clip_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr, FFIType.u32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_factor_u8
  ma_copy_and_apply_volume_factor_u8: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_factor_s16
  ma_copy_and_apply_volume_factor_s16: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_factor_s24
  ma_copy_and_apply_volume_factor_s24: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_factor_s32
  ma_copy_and_apply_volume_factor_s32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_factor_f32
  ma_copy_and_apply_volume_factor_f32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_apply_volume_factor_u8
  ma_apply_volume_factor_u8: {
    args: [FFIType.ptr, FFIType.u64, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_apply_volume_factor_s16
  ma_apply_volume_factor_s16: {
    args: [FFIType.ptr, FFIType.u64, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_apply_volume_factor_s24
  ma_apply_volume_factor_s24: {
    args: [FFIType.ptr, FFIType.u64, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_apply_volume_factor_s32
  ma_apply_volume_factor_s32: {
    args: [FFIType.ptr, FFIType.u64, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_apply_volume_factor_f32
  ma_apply_volume_factor_f32: {
    args: [FFIType.ptr, FFIType.u64, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_factor_pcm_frames_u8
  ma_copy_and_apply_volume_factor_pcm_frames_u8: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_factor_pcm_frames_s16
  ma_copy_and_apply_volume_factor_pcm_frames_s16: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_factor_pcm_frames_s24
  ma_copy_and_apply_volume_factor_pcm_frames_s24: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_factor_pcm_frames_s32
  ma_copy_and_apply_volume_factor_pcm_frames_s32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_factor_pcm_frames_f32
  ma_copy_and_apply_volume_factor_pcm_frames_f32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_factor_pcm_frames
  ma_copy_and_apply_volume_factor_pcm_frames: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.u64,
      FFIType.ptr,
      FFIType.u32,
      FFIType.f32,
    ],
    returns: FFIType.void,
  },
  // ma_apply_volume_factor_pcm_frames_u8
  ma_apply_volume_factor_pcm_frames_u8: {
    args: [FFIType.ptr, FFIType.u64, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_apply_volume_factor_pcm_frames_s16
  ma_apply_volume_factor_pcm_frames_s16: {
    args: [FFIType.ptr, FFIType.u64, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_apply_volume_factor_pcm_frames_s24
  ma_apply_volume_factor_pcm_frames_s24: {
    args: [FFIType.ptr, FFIType.u64, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_apply_volume_factor_pcm_frames_s32
  ma_apply_volume_factor_pcm_frames_s32: {
    args: [FFIType.ptr, FFIType.u64, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_apply_volume_factor_pcm_frames_f32
  ma_apply_volume_factor_pcm_frames_f32: {
    args: [FFIType.ptr, FFIType.u64, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_apply_volume_factor_pcm_frames
  ma_apply_volume_factor_pcm_frames: {
    args: [FFIType.ptr, FFIType.u64, FFIType.ptr, FFIType.u32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_factor_per_channel_f32
  ma_copy_and_apply_volume_factor_per_channel_f32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.u32, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_and_clip_samples_u8
  ma_copy_and_apply_volume_and_clip_samples_u8: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_and_clip_samples_s16
  ma_copy_and_apply_volume_and_clip_samples_s16: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_and_clip_samples_s24
  ma_copy_and_apply_volume_and_clip_samples_s24: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_and_clip_samples_s32
  ma_copy_and_apply_volume_and_clip_samples_s32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_and_clip_samples_f32
  ma_copy_and_apply_volume_and_clip_samples_f32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_copy_and_apply_volume_and_clip_pcm_frames
  ma_copy_and_apply_volume_and_clip_pcm_frames: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.u64,
      FFIType.ptr,
      FFIType.u32,
      FFIType.f32,
    ],
    returns: FFIType.void,
  },
  // ma_volume_linear_to_db
  ma_volume_linear_to_db: {
    args: [FFIType.f32],
    returns: FFIType.f32,
  },
  // ma_volume_db_to_linear
  ma_volume_db_to_linear: {
    args: [FFIType.f32],
    returns: FFIType.f32,
  },
  // ma_mix_pcm_frames_f32
  ma_mix_pcm_frames_f32: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.u32, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_vfs_open
  ma_vfs_open: {
    args: [FFIType.ptr, FFIType.cstring, FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_vfs_open_w
  ma_vfs_open_w: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_vfs_close
  ma_vfs_close: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_vfs_read
  ma_vfs_read: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_vfs_write
  ma_vfs_write: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u32, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_vfs_seek
  ma_vfs_seek: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.i64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_vfs_tell
  ma_vfs_tell: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_vfs_info
  ma_vfs_info: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_vfs_open_and_read_file
  ma_vfs_open_and_read_file: {
    args: [FFIType.ptr, FFIType.cstring, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_default_vfs_init
  ma_default_vfs_init: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_decoding_backend_config_init
  ma_decoding_backend_config_init: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_decoder_config_init
  ma_decoder_config_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_decoder_config_init_default
  ma_decoder_config_init_default: {
    args: [],
    returns: FFIType.ptr,
  },
  // ma_decoder_init
  ma_decoder_init: {
    args: [
      FFIType.function,
      FFIType.function,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.ptr,
  },
  // ma_decoder_init_memory
  ma_decoder_init_memory: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_decoder_init_vfs
  ma_decoder_init_vfs: {
    args: [FFIType.ptr, FFIType.cstring, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_decoder_init_vfs_w
  ma_decoder_init_vfs_w: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_decoder_init_file
  ma_decoder_init_file: {
    args: [FFIType.cstring, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_decoder_init_file_w
  ma_decoder_init_file_w: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_decoder_uninit
  ma_decoder_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_decoder_read_pcm_frames
  ma_decoder_read_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_decoder_seek_to_pcm_frame
  ma_decoder_seek_to_pcm_frame: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_decoder_get_data_format
  ma_decoder_get_data_format: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.u32,
    ],
    returns: FFIType.ptr,
  },
  // ma_decoder_get_cursor_in_pcm_frames
  ma_decoder_get_cursor_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_decoder_get_length_in_pcm_frames
  ma_decoder_get_length_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_decoder_get_available_frames
  ma_decoder_get_available_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_decode_from_vfs
  ma_decode_from_vfs: {
    args: [FFIType.ptr, FFIType.cstring, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_decode_file
  ma_decode_file: {
    args: [FFIType.cstring, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_decode_memory
  ma_decode_memory: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_encoder_config_init
  ma_encoder_config_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u32, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_encoder_init
  ma_encoder_init: {
    args: [
      FFIType.function,
      FFIType.function,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.ptr,
  },
  // ma_encoder_init_vfs
  ma_encoder_init_vfs: {
    args: [FFIType.ptr, FFIType.cstring, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_encoder_init_vfs_w
  ma_encoder_init_vfs_w: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_encoder_init_file
  ma_encoder_init_file: {
    args: [FFIType.cstring, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_encoder_init_file_w
  ma_encoder_init_file_w: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_encoder_uninit
  ma_encoder_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_encoder_write_pcm_frames
  ma_encoder_write_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_waveform_config_init
  ma_waveform_config_init: {
    args: [
      FFIType.ptr,
      FFIType.u32,
      FFIType.u32,
      FFIType.ptr,
      FFIType.f64,
      FFIType.f64,
    ],
    returns: FFIType.ptr,
  },
  // ma_waveform_init
  ma_waveform_init: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_waveform_uninit
  ma_waveform_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_waveform_read_pcm_frames
  ma_waveform_read_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_waveform_seek_to_pcm_frame
  ma_waveform_seek_to_pcm_frame: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_waveform_set_amplitude
  ma_waveform_set_amplitude: {
    args: [FFIType.ptr, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_waveform_set_frequency
  ma_waveform_set_frequency: {
    args: [FFIType.ptr, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_waveform_set_type
  ma_waveform_set_type: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_waveform_set_sample_rate
  ma_waveform_set_sample_rate: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_pulsewave_config_init
  ma_pulsewave_config_init: {
    args: [
      FFIType.ptr,
      FFIType.u32,
      FFIType.u32,
      FFIType.f64,
      FFIType.f64,
      FFIType.f64,
    ],
    returns: FFIType.ptr,
  },
  // ma_pulsewave_init
  ma_pulsewave_init: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_pulsewave_uninit
  ma_pulsewave_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_pulsewave_read_pcm_frames
  ma_pulsewave_read_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_pulsewave_seek_to_pcm_frame
  ma_pulsewave_seek_to_pcm_frame: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_pulsewave_set_amplitude
  ma_pulsewave_set_amplitude: {
    args: [FFIType.ptr, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_pulsewave_set_frequency
  ma_pulsewave_set_frequency: {
    args: [FFIType.ptr, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_pulsewave_set_sample_rate
  ma_pulsewave_set_sample_rate: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_pulsewave_set_duty_cycle
  ma_pulsewave_set_duty_cycle: {
    args: [FFIType.ptr, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_noise_config_init
  ma_noise_config_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.i32, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_noise_get_heap_size
  ma_noise_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_noise_init_preallocated
  ma_noise_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_noise_init
  ma_noise_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_noise_uninit
  ma_noise_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_noise_read_pcm_frames
  ma_noise_read_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_noise_set_amplitude
  ma_noise_set_amplitude: {
    args: [FFIType.ptr, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_noise_set_seed
  ma_noise_set_seed: {
    args: [FFIType.ptr, FFIType.i32],
    returns: FFIType.ptr,
  },
  // ma_noise_set_type
  ma_noise_set_type: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_pipeline_notifications_init
  ma_resource_manager_pipeline_notifications_init: {
    args: [],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_source_config_init
  ma_resource_manager_data_source_config_init: {
    args: [],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_config_init
  ma_resource_manager_config_init: {
    args: [],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_init
  ma_resource_manager_init: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_uninit
  ma_resource_manager_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_resource_manager_get_log
  ma_resource_manager_get_log: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_register_file
  ma_resource_manager_register_file: {
    args: [FFIType.ptr, FFIType.cstring, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_register_file_w
  ma_resource_manager_register_file_w: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_register_decoded_data
  ma_resource_manager_register_decoded_data: {
    args: [
      FFIType.ptr,
      FFIType.cstring,
      FFIType.ptr,
      FFIType.u64,
      FFIType.ptr,
      FFIType.u32,
      FFIType.u32,
    ],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_register_decoded_data_w
  ma_resource_manager_register_decoded_data_w: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.u64,
      FFIType.ptr,
      FFIType.u32,
      FFIType.u32,
    ],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_register_encoded_data
  ma_resource_manager_register_encoded_data: {
    args: [FFIType.ptr, FFIType.cstring, FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_register_encoded_data_w
  ma_resource_manager_register_encoded_data_w: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_unregister_file
  ma_resource_manager_unregister_file: {
    args: [FFIType.ptr, FFIType.cstring],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_unregister_file_w
  ma_resource_manager_unregister_file_w: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_unregister_data
  ma_resource_manager_unregister_data: {
    args: [FFIType.ptr, FFIType.cstring],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_unregister_data_w
  ma_resource_manager_unregister_data_w: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_buffer_init_ex
  ma_resource_manager_data_buffer_init_ex: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_buffer_init
  ma_resource_manager_data_buffer_init: {
    args: [FFIType.ptr, FFIType.cstring, FFIType.u32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_buffer_init_w
  ma_resource_manager_data_buffer_init_w: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_buffer_init_copy
  ma_resource_manager_data_buffer_init_copy: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_buffer_uninit
  ma_resource_manager_data_buffer_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_buffer_read_pcm_frames
  ma_resource_manager_data_buffer_read_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_buffer_seek_to_pcm_frame
  ma_resource_manager_data_buffer_seek_to_pcm_frame: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_buffer_get_data_format
  ma_resource_manager_data_buffer_get_data_format: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.u32,
    ],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_buffer_get_cursor_in_pcm_frames
  ma_resource_manager_data_buffer_get_cursor_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_buffer_get_length_in_pcm_frames
  ma_resource_manager_data_buffer_get_length_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_buffer_result
  ma_resource_manager_data_buffer_result: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_buffer_set_looping
  ma_resource_manager_data_buffer_set_looping: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_buffer_is_looping
  ma_resource_manager_data_buffer_is_looping: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_buffer_get_available_frames
  ma_resource_manager_data_buffer_get_available_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_stream_init_ex
  ma_resource_manager_data_stream_init_ex: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_stream_init
  ma_resource_manager_data_stream_init: {
    args: [FFIType.ptr, FFIType.cstring, FFIType.u32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_stream_init_w
  ma_resource_manager_data_stream_init_w: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_stream_uninit
  ma_resource_manager_data_stream_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_stream_read_pcm_frames
  ma_resource_manager_data_stream_read_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_stream_seek_to_pcm_frame
  ma_resource_manager_data_stream_seek_to_pcm_frame: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_stream_get_data_format
  ma_resource_manager_data_stream_get_data_format: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.u32,
    ],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_stream_get_cursor_in_pcm_frames
  ma_resource_manager_data_stream_get_cursor_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_stream_get_length_in_pcm_frames
  ma_resource_manager_data_stream_get_length_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_stream_result
  ma_resource_manager_data_stream_result: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_stream_set_looping
  ma_resource_manager_data_stream_set_looping: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_stream_is_looping
  ma_resource_manager_data_stream_is_looping: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_stream_get_available_frames
  ma_resource_manager_data_stream_get_available_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_source_init_ex
  ma_resource_manager_data_source_init_ex: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_source_init
  ma_resource_manager_data_source_init: {
    args: [FFIType.ptr, FFIType.cstring, FFIType.u32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_source_init_w
  ma_resource_manager_data_source_init_w: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_source_init_copy
  ma_resource_manager_data_source_init_copy: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_source_uninit
  ma_resource_manager_data_source_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_source_read_pcm_frames
  ma_resource_manager_data_source_read_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_source_seek_to_pcm_frame
  ma_resource_manager_data_source_seek_to_pcm_frame: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_source_get_data_format
  ma_resource_manager_data_source_get_data_format: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.u32,
    ],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_source_get_cursor_in_pcm_frames
  ma_resource_manager_data_source_get_cursor_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_source_get_length_in_pcm_frames
  ma_resource_manager_data_source_get_length_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_source_result
  ma_resource_manager_data_source_result: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_source_set_looping
  ma_resource_manager_data_source_set_looping: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_source_is_looping
  ma_resource_manager_data_source_is_looping: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_data_source_get_available_frames
  ma_resource_manager_data_source_get_available_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_post_job
  ma_resource_manager_post_job: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_post_job_quit
  ma_resource_manager_post_job_quit: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_next_job
  ma_resource_manager_next_job: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_process_job
  ma_resource_manager_process_job: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_resource_manager_process_next_job
  ma_resource_manager_process_next_job: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_config_init
  ma_node_config_init: {
    args: [],
    returns: FFIType.ptr,
  },
  // ma_node_get_heap_size
  ma_node_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_init_preallocated
  ma_node_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_init
  ma_node_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_uninit
  ma_node_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_node_get_node_graph
  ma_node_get_node_graph: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_get_input_bus_count
  ma_node_get_input_bus_count: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_get_output_bus_count
  ma_node_get_output_bus_count: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_get_input_channels
  ma_node_get_input_channels: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_node_get_output_channels
  ma_node_get_output_channels: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_node_attach_output_bus
  ma_node_attach_output_bus: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_node_detach_output_bus
  ma_node_detach_output_bus: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_node_detach_all_output_buses
  ma_node_detach_all_output_buses: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_set_output_bus_volume
  ma_node_set_output_bus_volume: {
    args: [FFIType.ptr, FFIType.u32, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_node_get_output_bus_volume
  ma_node_get_output_bus_volume: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.f32,
  },
  // ma_node_set_state
  ma_node_set_state: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_get_state
  ma_node_get_state: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_set_state_time
  ma_node_set_state_time: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_node_get_state_time
  ma_node_get_state_time: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_get_state_by_time
  ma_node_get_state_by_time: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_node_get_state_by_time_range
  ma_node_get_state_by_time_range: {
    args: [FFIType.ptr, FFIType.u64, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_node_get_time
  ma_node_get_time: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_set_time
  ma_node_set_time: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_node_graph_config_init
  ma_node_graph_config_init: {
    args: [FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_node_graph_init
  ma_node_graph_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_graph_uninit
  ma_node_graph_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_node_graph_get_endpoint
  ma_node_graph_get_endpoint: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_graph_read_pcm_frames
  ma_node_graph_read_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_graph_get_channels
  ma_node_graph_get_channels: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_graph_get_time
  ma_node_graph_get_time: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_node_graph_set_time
  ma_node_graph_set_time: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_node_graph_get_processing_size_in_frames
  ma_node_graph_get_processing_size_in_frames: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_node_config_init
  ma_data_source_node_config_init: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_node_init
  ma_data_source_node_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_data_source_node_uninit
  ma_data_source_node_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_data_source_node_set_looping
  ma_data_source_node_set_looping: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_data_source_node_is_looping
  ma_data_source_node_is_looping: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_splitter_node_config_init
  ma_splitter_node_config_init: {
    args: [FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_splitter_node_init
  ma_splitter_node_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_splitter_node_uninit
  ma_splitter_node_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_biquad_node_config_init
  ma_biquad_node_config_init: {
    args: [
      FFIType.u32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
      FFIType.f32,
    ],
    returns: FFIType.ptr,
  },
  // ma_biquad_node_init
  ma_biquad_node_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_biquad_node_reinit
  ma_biquad_node_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_biquad_node_uninit
  ma_biquad_node_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_lpf_node_config_init
  ma_lpf_node_config_init: {
    args: [FFIType.u32, FFIType.u32, FFIType.f64, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_lpf_node_init
  ma_lpf_node_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf_node_reinit
  ma_lpf_node_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_lpf_node_uninit
  ma_lpf_node_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_hpf_node_config_init
  ma_hpf_node_config_init: {
    args: [FFIType.u32, FFIType.u32, FFIType.f64, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_hpf_node_init
  ma_hpf_node_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf_node_reinit
  ma_hpf_node_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hpf_node_uninit
  ma_hpf_node_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_bpf_node_config_init
  ma_bpf_node_config_init: {
    args: [FFIType.u32, FFIType.u32, FFIType.f64, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_bpf_node_init
  ma_bpf_node_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_bpf_node_reinit
  ma_bpf_node_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_bpf_node_uninit
  ma_bpf_node_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_notch_node_config_init
  ma_notch_node_config_init: {
    args: [FFIType.u32, FFIType.u32, FFIType.f64, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_notch_node_init
  ma_notch_node_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_notch_node_reinit
  ma_notch_node_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_notch_node_uninit
  ma_notch_node_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_peak_node_config_init
  ma_peak_node_config_init: {
    args: [FFIType.u32, FFIType.u32, FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_peak_node_init
  ma_peak_node_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_peak_node_reinit
  ma_peak_node_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_peak_node_uninit
  ma_peak_node_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_loshelf_node_config_init
  ma_loshelf_node_config_init: {
    args: [FFIType.u32, FFIType.u32, FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_loshelf_node_init
  ma_loshelf_node_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_loshelf_node_reinit
  ma_loshelf_node_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_loshelf_node_uninit
  ma_loshelf_node_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_hishelf_node_config_init
  ma_hishelf_node_config_init: {
    args: [FFIType.u32, FFIType.u32, FFIType.f64, FFIType.f64, FFIType.f64],
    returns: FFIType.ptr,
  },
  // ma_hishelf_node_init
  ma_hishelf_node_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hishelf_node_reinit
  ma_hishelf_node_reinit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_hishelf_node_uninit
  ma_hishelf_node_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_delay_node_config_init
  ma_delay_node_config_init: {
    args: [FFIType.u32, FFIType.u32, FFIType.u32, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_delay_node_init
  ma_delay_node_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_delay_node_uninit
  ma_delay_node_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_delay_node_set_wet
  ma_delay_node_set_wet: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_delay_node_get_wet
  ma_delay_node_get_wet: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_delay_node_set_dry
  ma_delay_node_set_dry: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_delay_node_get_dry
  ma_delay_node_get_dry: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_delay_node_set_decay
  ma_delay_node_set_decay: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_delay_node_get_decay
  ma_delay_node_get_decay: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_engine_node_config_init
  ma_engine_node_config_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_engine_node_get_heap_size
  ma_engine_node_get_heap_size: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_node_init_preallocated
  ma_engine_node_init_preallocated: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_node_init
  ma_engine_node_init: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_node_uninit
  ma_engine_node_uninit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_sound_config_init
  ma_sound_config_init: {
    args: [],
    returns: FFIType.ptr,
  },
  // ma_sound_config_init_2
  ma_sound_config_init_2: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_config_init
  ma_sound_group_config_init: {
    args: [],
    returns: FFIType.ptr,
  },
  // ma_sound_group_config_init_2
  ma_sound_group_config_init_2: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_config_init
  ma_engine_config_init: {
    args: [],
    returns: FFIType.ptr,
  },
  // ma_engine_init
  ma_engine_init: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_uninit
  ma_engine_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_engine_read_pcm_frames
  ma_engine_read_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u64, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_get_node_graph
  ma_engine_get_node_graph: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_get_resource_manager
  ma_engine_get_resource_manager: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_get_device
  ma_engine_get_device: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_get_log
  ma_engine_get_log: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_get_endpoint
  ma_engine_get_endpoint: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_get_time_in_pcm_frames
  ma_engine_get_time_in_pcm_frames: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_get_time_in_milliseconds
  ma_engine_get_time_in_milliseconds: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_set_time_in_pcm_frames
  ma_engine_set_time_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_engine_set_time_in_milliseconds
  ma_engine_set_time_in_milliseconds: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_engine_get_time
  ma_engine_get_time: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_set_time
  ma_engine_set_time: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_engine_get_channels
  ma_engine_get_channels: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_get_sample_rate
  ma_engine_get_sample_rate: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_start
  ma_engine_start: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_stop
  ma_engine_stop: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_set_volume
  ma_engine_set_volume: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_engine_get_volume
  ma_engine_get_volume: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_engine_set_gain_db
  ma_engine_set_gain_db: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_engine_get_gain_db
  ma_engine_get_gain_db: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_engine_get_listener_count
  ma_engine_get_listener_count: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_engine_find_closest_listener
  ma_engine_find_closest_listener: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_engine_listener_set_position
  ma_engine_listener_set_position: {
    args: [FFIType.ptr, FFIType.u32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_engine_listener_get_position
  ma_engine_listener_get_position: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_engine_listener_set_direction
  ma_engine_listener_set_direction: {
    args: [FFIType.ptr, FFIType.u32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_engine_listener_get_direction
  ma_engine_listener_get_direction: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_engine_listener_set_velocity
  ma_engine_listener_set_velocity: {
    args: [FFIType.ptr, FFIType.u32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_engine_listener_get_velocity
  ma_engine_listener_get_velocity: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_engine_listener_set_cone
  ma_engine_listener_set_cone: {
    args: [FFIType.ptr, FFIType.u32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_engine_listener_get_cone
  ma_engine_listener_get_cone: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_engine_listener_set_world_up
  ma_engine_listener_set_world_up: {
    args: [FFIType.ptr, FFIType.u32, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_engine_listener_get_world_up
  ma_engine_listener_get_world_up: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_engine_listener_set_enabled
  ma_engine_listener_set_enabled: {
    args: [FFIType.ptr, FFIType.u32, FFIType.u32],
    returns: FFIType.void,
  },
  // ma_engine_listener_is_enabled
  ma_engine_listener_is_enabled: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_engine_play_sound_ex
  ma_engine_play_sound_ex: {
    args: [FFIType.ptr, FFIType.cstring, FFIType.ptr, FFIType.u32],
    returns: FFIType.ptr,
  },
  // ma_engine_play_sound
  ma_engine_play_sound: {
    args: [FFIType.ptr, FFIType.cstring, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_init_from_file
  ma_sound_init_from_file: {
    args: [
      FFIType.ptr,
      FFIType.cstring,
      FFIType.u32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.ptr,
  },
  // ma_sound_init_from_file_w
  ma_sound_init_from_file_w: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.u32,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
    ],
    returns: FFIType.ptr,
  },
  // ma_sound_init_copy
  ma_sound_init_copy: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_init_from_data_source
  ma_sound_init_from_data_source: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_init_ex
  ma_sound_init_ex: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_uninit
  ma_sound_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_sound_get_engine
  ma_sound_get_engine: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_get_data_source
  ma_sound_get_data_source: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_start
  ma_sound_start: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_stop
  ma_sound_stop: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_stop_with_fade_in_pcm_frames
  ma_sound_stop_with_fade_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_sound_stop_with_fade_in_milliseconds
  ma_sound_stop_with_fade_in_milliseconds: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_sound_reset_start_time
  ma_sound_reset_start_time: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_sound_reset_stop_time
  ma_sound_reset_stop_time: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_sound_reset_fade
  ma_sound_reset_fade: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_sound_reset_stop_time_and_fade
  ma_sound_reset_stop_time_and_fade: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_sound_set_volume
  ma_sound_set_volume: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_get_volume
  ma_sound_get_volume: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_set_pan
  ma_sound_set_pan: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_get_pan
  ma_sound_get_pan: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_set_pan_mode
  ma_sound_set_pan_mode: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_sound_get_pan_mode
  ma_sound_get_pan_mode: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_set_pitch
  ma_sound_set_pitch: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_get_pitch
  ma_sound_get_pitch: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_set_spatialization_enabled
  ma_sound_set_spatialization_enabled: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.void,
  },
  // ma_sound_is_spatialization_enabled
  ma_sound_is_spatialization_enabled: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_set_pinned_listener_index
  ma_sound_set_pinned_listener_index: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.void,
  },
  // ma_sound_get_pinned_listener_index
  ma_sound_get_pinned_listener_index: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_get_listener_index
  ma_sound_get_listener_index: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_get_direction_to_listener
  ma_sound_get_direction_to_listener: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_set_position
  ma_sound_set_position: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_get_position
  ma_sound_get_position: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_set_direction
  ma_sound_set_direction: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_get_direction
  ma_sound_get_direction: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_set_velocity
  ma_sound_set_velocity: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_get_velocity
  ma_sound_get_velocity: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_set_attenuation_model
  ma_sound_set_attenuation_model: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_sound_get_attenuation_model
  ma_sound_get_attenuation_model: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_set_positioning
  ma_sound_set_positioning: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_sound_get_positioning
  ma_sound_get_positioning: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_set_rolloff
  ma_sound_set_rolloff: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_get_rolloff
  ma_sound_get_rolloff: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_set_min_gain
  ma_sound_set_min_gain: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_get_min_gain
  ma_sound_get_min_gain: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_set_max_gain
  ma_sound_set_max_gain: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_get_max_gain
  ma_sound_get_max_gain: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_set_min_distance
  ma_sound_set_min_distance: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_get_min_distance
  ma_sound_get_min_distance: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_set_max_distance
  ma_sound_set_max_distance: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_get_max_distance
  ma_sound_get_max_distance: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_set_cone
  ma_sound_set_cone: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_get_cone
  ma_sound_get_cone: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_sound_set_doppler_factor
  ma_sound_set_doppler_factor: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_get_doppler_factor
  ma_sound_get_doppler_factor: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_set_directional_attenuation_factor
  ma_sound_set_directional_attenuation_factor: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_get_directional_attenuation_factor
  ma_sound_get_directional_attenuation_factor: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_set_fade_in_pcm_frames
  ma_sound_set_fade_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_sound_set_fade_in_milliseconds
  ma_sound_set_fade_in_milliseconds: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_sound_set_fade_start_in_pcm_frames
  ma_sound_set_fade_start_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.u64, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_sound_set_fade_start_in_milliseconds
  ma_sound_set_fade_start_in_milliseconds: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.u64, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_sound_get_current_fade_volume
  ma_sound_get_current_fade_volume: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_set_start_time_in_pcm_frames
  ma_sound_set_start_time_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_sound_set_start_time_in_milliseconds
  ma_sound_set_start_time_in_milliseconds: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_sound_set_stop_time_in_pcm_frames
  ma_sound_set_stop_time_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_sound_set_stop_time_in_milliseconds
  ma_sound_set_stop_time_in_milliseconds: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_sound_set_stop_time_with_fade_in_pcm_frames
  ma_sound_set_stop_time_with_fade_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.u64, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_sound_set_stop_time_with_fade_in_milliseconds
  ma_sound_set_stop_time_with_fade_in_milliseconds: {
    args: [FFIType.ptr, FFIType.u64, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_sound_is_playing
  ma_sound_is_playing: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_get_time_in_pcm_frames
  ma_sound_get_time_in_pcm_frames: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_get_time_in_milliseconds
  ma_sound_get_time_in_milliseconds: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_set_looping
  ma_sound_set_looping: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.void,
  },
  // ma_sound_is_looping
  ma_sound_is_looping: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_at_end
  ma_sound_at_end: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_seek_to_pcm_frame
  ma_sound_seek_to_pcm_frame: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.ptr,
  },
  // ma_sound_seek_to_second
  ma_sound_seek_to_second: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.ptr,
  },
  // ma_sound_get_data_format
  ma_sound_get_data_format: {
    args: [
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.ptr,
      FFIType.u32,
    ],
    returns: FFIType.ptr,
  },
  // ma_sound_get_cursor_in_pcm_frames
  ma_sound_get_cursor_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_get_length_in_pcm_frames
  ma_sound_get_length_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_get_cursor_in_seconds
  ma_sound_get_cursor_in_seconds: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_get_length_in_seconds
  ma_sound_get_length_in_seconds: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_set_end_callback
  ma_sound_set_end_callback: {
    args: [FFIType.ptr, FFIType.function, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_init
  ma_sound_group_init: {
    args: [FFIType.ptr, FFIType.u32, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_init_ex
  ma_sound_group_init_ex: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_uninit
  ma_sound_group_uninit: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_sound_group_get_engine
  ma_sound_group_get_engine: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_start
  ma_sound_group_start: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_stop
  ma_sound_group_stop: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_set_volume
  ma_sound_group_set_volume: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_group_get_volume
  ma_sound_group_get_volume: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_group_set_pan
  ma_sound_group_set_pan: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_group_get_pan
  ma_sound_group_get_pan: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_group_set_pan_mode
  ma_sound_group_set_pan_mode: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_sound_group_get_pan_mode
  ma_sound_group_get_pan_mode: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_set_pitch
  ma_sound_group_set_pitch: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_group_get_pitch
  ma_sound_group_get_pitch: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_group_set_spatialization_enabled
  ma_sound_group_set_spatialization_enabled: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.void,
  },
  // ma_sound_group_is_spatialization_enabled
  ma_sound_group_is_spatialization_enabled: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_set_pinned_listener_index
  ma_sound_group_set_pinned_listener_index: {
    args: [FFIType.ptr, FFIType.u32],
    returns: FFIType.void,
  },
  // ma_sound_group_get_pinned_listener_index
  ma_sound_group_get_pinned_listener_index: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_get_listener_index
  ma_sound_group_get_listener_index: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_get_direction_to_listener
  ma_sound_group_get_direction_to_listener: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_set_position
  ma_sound_group_set_position: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_group_get_position
  ma_sound_group_get_position: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_set_direction
  ma_sound_group_set_direction: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_group_get_direction
  ma_sound_group_get_direction: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_set_velocity
  ma_sound_group_set_velocity: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_group_get_velocity
  ma_sound_group_get_velocity: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_set_attenuation_model
  ma_sound_group_set_attenuation_model: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_sound_group_get_attenuation_model
  ma_sound_group_get_attenuation_model: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_set_positioning
  ma_sound_group_set_positioning: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_sound_group_get_positioning
  ma_sound_group_get_positioning: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_set_rolloff
  ma_sound_group_set_rolloff: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_group_get_rolloff
  ma_sound_group_get_rolloff: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_group_set_min_gain
  ma_sound_group_set_min_gain: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_group_get_min_gain
  ma_sound_group_get_min_gain: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_group_set_max_gain
  ma_sound_group_set_max_gain: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_group_get_max_gain
  ma_sound_group_get_max_gain: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_group_set_min_distance
  ma_sound_group_set_min_distance: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_group_get_min_distance
  ma_sound_group_get_min_distance: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_group_set_max_distance
  ma_sound_group_set_max_distance: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_group_get_max_distance
  ma_sound_group_get_max_distance: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_group_set_cone
  ma_sound_group_set_cone: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_group_get_cone
  ma_sound_group_get_cone: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void,
  },
  // ma_sound_group_set_doppler_factor
  ma_sound_group_set_doppler_factor: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_group_get_doppler_factor
  ma_sound_group_get_doppler_factor: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_group_set_directional_attenuation_factor
  ma_sound_group_set_directional_attenuation_factor: {
    args: [FFIType.ptr, FFIType.f32],
    returns: FFIType.void,
  },
  // ma_sound_group_get_directional_attenuation_factor
  ma_sound_group_get_directional_attenuation_factor: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_group_set_fade_in_pcm_frames
  ma_sound_group_set_fade_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_sound_group_set_fade_in_milliseconds
  ma_sound_group_set_fade_in_milliseconds: {
    args: [FFIType.ptr, FFIType.f32, FFIType.f32, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_sound_group_get_current_fade_volume
  ma_sound_group_get_current_fade_volume: {
    args: [FFIType.ptr],
    returns: FFIType.f32,
  },
  // ma_sound_group_set_start_time_in_pcm_frames
  ma_sound_group_set_start_time_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_sound_group_set_start_time_in_milliseconds
  ma_sound_group_set_start_time_in_milliseconds: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_sound_group_set_stop_time_in_pcm_frames
  ma_sound_group_set_stop_time_in_pcm_frames: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_sound_group_set_stop_time_in_milliseconds
  ma_sound_group_set_stop_time_in_milliseconds: {
    args: [FFIType.ptr, FFIType.u64],
    returns: FFIType.void,
  },
  // ma_sound_group_is_playing
  ma_sound_group_is_playing: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  // ma_sound_group_get_time_in_pcm_frames
  ma_sound_group_get_time_in_pcm_frames: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
} satisfies Record<string, FFIFunction>;
