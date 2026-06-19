import type { Pointer } from 'bun:ffi';

export type ma_int8 = number;

export type ma_uint8 = number;

export type ma_int16 = number;

export type ma_uint16 = number;

export type ma_int32 = number;

export type ma_uint32 = number;

export type ma_int64 = bigint;

export type ma_uint64 = bigint;

export type ma_uintptr = bigint;

export type ma_bool8 = number;

export type ma_bool32 = number;

export type ma_float = number;

export type ma_double = number;

export type ma_handle = Pointer;

export type ma_ptr = Pointer;

export type ma_proc = () => Pointer | null;

export type ma_pthread_t = Pointer;

export type ma_pthread_mutex_t = Pointer;

export type ma_pthread_cond_t = Pointer;

export type ma_wchar_win32 = number;

export type ma_log_level = number;

export type ma_context = Pointer;

export type ma_device = Pointer;

export type ma_channel = number;

export type _ma_channel_position = number;

export type ma_result = number;

export type ma_stream_format = number;

export type ma_stream_layout = number;

export type ma_dither_mode = number;

export type ma_format = number;

export type ma_standard_sample_rate = number;

export type ma_channel_mix_mode = number;

export type ma_standard_channel_map = number;

export type ma_performance_profile = number;

export type ma_allocation_callbacks = Pointer;

export type ma_lcg = Pointer;

export type ma_spinlock = number;

export type ma_thread_priority = number;

export type ma_thread = Pointer;

export type ma_mutex = Pointer;

export type ma_event = Pointer;

export type ma_semaphore = Pointer;

export type ma_log_callback_proc = (
  arg0: Pointer,
  arg1: Pointer,
  arg2: string
) => Pointer | null;

export type ma_log_callback = Pointer;

export type ma_log = Pointer;

export type ma_biquad_coefficient = Pointer;

export type ma_biquad_config = Pointer;

export type ma_biquad = Pointer;

export type ma_lpf1_config = Pointer;

export type ma_lpf2_config = Pointer;

export type ma_lpf1 = Pointer;

export type ma_lpf2 = Pointer;

export type ma_lpf_config = Pointer;

export type ma_lpf = Pointer;

export type ma_hpf1_config = Pointer;

export type ma_hpf2_config = Pointer;

export type ma_hpf1 = Pointer;

export type ma_hpf2 = Pointer;

export type ma_hpf_config = Pointer;

export type ma_hpf = Pointer;

export type ma_bpf2_config = Pointer;

export type ma_bpf2 = Pointer;

export type ma_bpf_config = Pointer;

export type ma_bpf = Pointer;

export type ma_notch2_config = Pointer;

export type ma_notch_config = Pointer;

export type ma_notch2 = Pointer;

export type ma_peak2_config = Pointer;

export type ma_peak_config = Pointer;

export type ma_peak2 = Pointer;

export type ma_loshelf2_config = Pointer;

export type ma_loshelf_config = Pointer;

export type ma_loshelf2 = Pointer;

export type ma_hishelf2_config = Pointer;

export type ma_hishelf_config = Pointer;

export type ma_hishelf2 = Pointer;

export type ma_delay_config = Pointer;

export type ma_delay = Pointer;

export type ma_gainer_config = Pointer;

export type ma_gainer = Pointer;

export type ma_pan_mode = number;

export type ma_panner_config = Pointer;

export type ma_panner = Pointer;

export type ma_fader_config = Pointer;

export type ma_fader = Pointer;

export type ma_vec3f = Pointer;

export type ma_atomic_vec3f = Pointer;

export type ma_attenuation_model = number;

export type ma_positioning = number;

export type ma_handedness = number;

export type ma_spatializer_listener_config = Pointer;

export type ma_spatializer_listener = Pointer;

export type ma_spatializer_config = Pointer;

export type ma_spatializer = Pointer;

export type ma_linear_resampler_config = Pointer;

export type ma_linear_resampler = Pointer;

export type ma_resampler_config = Pointer;

export type ma_resampling_backend = void;

export type ma_resampling_backend_vtable = Pointer;

export type ma_resample_algorithm = number;

export type ma_resampler = Pointer;

export type ma_channel_conversion_path = number;

export type ma_mono_expansion_mode = number;

export type ma_channel_converter_config = Pointer;

export type ma_channel_converter = Pointer;

export type ma_data_converter_config = Pointer;

export type ma_data_converter_execution_path = number;

export type ma_data_converter = Pointer;

export type ma_data_source = void;

export type ma_data_source_vtable = Pointer;

export type ma_data_source_get_next_proc = (arg0: Pointer) => Pointer;

export type ma_data_source_config = Pointer;

export type ma_data_source_base = Pointer;

export type ma_audio_buffer_ref = Pointer;

export type ma_audio_buffer_config = Pointer;

export type ma_audio_buffer = Pointer;

export type ma_paged_audio_buffer_page = Pointer;

export type ma_paged_audio_buffer_data = Pointer;

export type ma_paged_audio_buffer_config = Pointer;

export type ma_paged_audio_buffer = Pointer;

export type ma_rb = Pointer;

export type ma_pcm_rb = Pointer;

export type ma_duplex_rb = Pointer;

export type ma_fence = Pointer;

export type ma_async_notification = void;

export type ma_async_notification_callbacks = Pointer;

export type ma_async_notification_poll = Pointer;

export type ma_async_notification_event = Pointer;

export type ma_slot_allocator_config = Pointer;

export type ma_slot_allocator_group = Pointer;

export type ma_slot_allocator = Pointer;

export type ma_job = Pointer;

export type ma_job_proc = (arg0: Pointer) => Pointer;

export type ma_job_type = number;

export type ma_job_queue_flags = number;

export type ma_job_queue_config = Pointer;

export type ma_job_queue = Pointer;

export type ma_device_state = number;

export type ma_backend = number;

export type ma_device_job_thread_config = Pointer;

export type ma_device_job_thread = Pointer;

export type ma_device_notification_type = number;

export type ma_device_notification = Pointer;

export type ma_device_notification_proc = (arg0: Pointer) => Pointer | null;

export type ma_device_data_proc = (
  arg0: Pointer,
  arg1: Pointer,
  arg2: Pointer,
  arg3: Pointer
) => Pointer | null;

export type ma_stop_proc = (arg0: Pointer) => Pointer | null;

export type ma_device_type = number;

export type ma_share_mode = number;

export type ma_ios_session_category = number;

export type ma_ios_session_category_option = number;

export type ma_opensl_stream_type = number;

export type ma_opensl_recording_preset = number;

export type ma_wasapi_usage = number;

export type ma_aaudio_usage = number;

export type ma_aaudio_content_type = number;

export type ma_aaudio_input_preset = number;

export type ma_aaudio_allowed_capture_policy = number;

export type ma_timer = Pointer;

export type ma_device_id = Pointer;

export type ma_context_config = Pointer;

export type ma_device_config = Pointer;

export type ma_backend_callbacks = Pointer;

export type ma_device_info = Pointer;

export type ma_enum_devices_callback_proc = (
  arg0: Pointer,
  arg1: Pointer,
  arg2: Pointer,
  arg3: Pointer
) => Pointer;

export type ma_device_descriptor = Pointer;

export type ma_context_command__wasapi = Pointer;

export type ma_vfs = void;

export type ma_vfs_file = Pointer;

export type ma_open_mode_flags = number;

export type ma_seek_origin = number;

export type ma_file_info = Pointer;

export type ma_vfs_callbacks = Pointer;

export type ma_default_vfs = Pointer;

export type ma_read_proc = (
  arg0: Pointer,
  arg1: Pointer,
  arg2: bigint,
  arg3: Pointer
) => Pointer;

export type ma_seek_proc = (
  arg0: Pointer,
  arg1: Pointer,
  arg2: Pointer
) => Pointer;

export type ma_tell_proc = (arg0: Pointer, arg1: Pointer) => Pointer;

export type ma_encoding_format = number;

export type ma_decoder = Pointer;

export type ma_decoding_backend_config = Pointer;

export type ma_decoding_backend_vtable = Pointer;

export type ma_decoder_read_proc = (
  arg0: Pointer,
  arg1: Pointer,
  arg2: bigint,
  arg3: Pointer
) => Pointer;

export type ma_decoder_seek_proc = (
  arg0: Pointer,
  arg1: Pointer,
  arg2: Pointer
) => Pointer;

export type ma_decoder_tell_proc = (arg0: Pointer, arg1: Pointer) => Pointer;

export type ma_decoder_config = Pointer;

export type ma_encoder = Pointer;

export type ma_encoder_write_proc = (
  arg0: Pointer,
  arg1: Pointer,
  arg2: bigint,
  arg3: Pointer
) => Pointer;

export type ma_encoder_seek_proc = (
  arg0: Pointer,
  arg1: Pointer,
  arg2: Pointer
) => Pointer;

export type ma_encoder_init_proc = (arg0: Pointer) => Pointer;

export type ma_encoder_uninit_proc = (arg0: Pointer) => Pointer | null;

export type ma_encoder_write_pcm_frames_proc = (
  arg0: Pointer,
  arg1: Pointer,
  arg2: Pointer,
  arg3: Pointer
) => Pointer;

export type ma_encoder_config = Pointer;

export type ma_waveform_type = number;

export type ma_waveform_config = Pointer;

export type ma_waveform = Pointer;

export type ma_pulsewave_config = Pointer;

export type ma_pulsewave = Pointer;

export type ma_noise_type = number;

export type ma_noise_config = Pointer;

export type ma_noise = Pointer;

export type ma_resource_manager = Pointer;

export type ma_resource_manager_data_buffer_node = Pointer;

export type ma_resource_manager_data_buffer = Pointer;

export type ma_resource_manager_data_stream = Pointer;

export type ma_resource_manager_data_source = Pointer;

export type ma_resource_manager_data_source_flags = number;

export type ma_resource_manager_pipeline_stage_notification = Pointer;

export type ma_resource_manager_pipeline_notifications = Pointer;

export type ma_resource_manager_flags = number;

export type ma_resource_manager_data_source_config = Pointer;

export type ma_resource_manager_data_supply_type = number;

export type ma_resource_manager_data_supply = Pointer;

export type ma_resource_manager_config = Pointer;

export type ma_stack = Pointer;

export type ma_node_graph = Pointer;

export type ma_node = void;

export type ma_node_flags = number;

export type ma_node_state = number;

export type ma_node_vtable = Pointer;

export type ma_node_config = Pointer;

export type ma_node_output_bus = Pointer;

export type ma_node_input_bus = Pointer;

export type ma_node_base = Pointer;

export type ma_node_graph_config = Pointer;

export type ma_data_source_node_config = Pointer;

export type ma_data_source_node = Pointer;

export type ma_splitter_node_config = Pointer;

export type ma_splitter_node = Pointer;

export type ma_biquad_node_config = Pointer;

export type ma_biquad_node = Pointer;

export type ma_lpf_node_config = Pointer;

export type ma_lpf_node = Pointer;

export type ma_hpf_node_config = Pointer;

export type ma_hpf_node = Pointer;

export type ma_bpf_node_config = Pointer;

export type ma_bpf_node = Pointer;

export type ma_notch_node_config = Pointer;

export type ma_notch_node = Pointer;

export type ma_peak_node_config = Pointer;

export type ma_peak_node = Pointer;

export type ma_loshelf_node_config = Pointer;

export type ma_loshelf_node = Pointer;

export type ma_hishelf_node_config = Pointer;

export type ma_hishelf_node = Pointer;

export type ma_delay_node_config = Pointer;

export type ma_delay_node = Pointer;

export type ma_engine = Pointer;

export type ma_sound = Pointer;

export type ma_sound_flags = number;

export type ma_engine_node_type = number;

export type ma_engine_node_config = Pointer;

export type ma_engine_node = Pointer;

export type ma_sound_end_proc = (
  arg0: Pointer,
  arg1: Pointer
) => Pointer | null;

export type ma_sound_config = Pointer;

export type ma_sound_inlined = Pointer;

export type ma_sound_group_config = Pointer;

export type ma_engine_process_proc = (
  arg0: Pointer,
  arg1: Pointer,
  arg2: Pointer
) => Pointer | null;

export type ma_engine_config = Pointer;
