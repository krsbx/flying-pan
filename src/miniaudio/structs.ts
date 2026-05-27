import { BaseStruct } from '@utility/base-struct';
import type { Pointer } from 'bun:ffi';

export class ma_resampler_config extends BaseStruct {
  public static override readonly BYTE_SIZE = 56;

  public get format(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── channels (offset 8, unsigned int) ───
  public get channels(): number {
    return this.$view.getUint32(8, true);
  }
  public set channels(value: number) {
    this.$view.setUint32(8, value, true);
  }

  // ─── sampleRateIn (offset 12, unsigned int) ───
  public get sampleRateIn(): number {
    return this.$view.getUint32(12, true);
  }
  public set sampleRateIn(value: number) {
    this.$view.setUint32(12, value, true);
  }

  // ─── sampleRateOut (offset 16, unsigned int) ───
  public get sampleRateOut(): number {
    return this.$view.getUint32(16, true);
  }
  public set sampleRateOut(value: number) {
    this.$view.setUint32(16, value, true);
  }

  public get algorithm(): Pointer {
    return (this.$address + 24) as unknown as Pointer;
  }

  // ─── pBackendVTable (offset 32, ma_resampling_backend_vtable) ───
  public get pBackendVTable(): Pointer {
    return Number(this.$view.getBigInt64(32, true)) as Pointer;
  }
  public set pBackendVTable(value: Pointer) {
    this.$view.setBigInt64(32, BigInt(value), true);
  }

  // ─── pBackendUserData (offset 40, void) ───
  public get pBackendUserData(): Pointer {
    return Number(this.$view.getBigInt64(40, true)) as Pointer;
  }
  public set pBackendUserData(value: Pointer) {
    this.$view.setBigInt64(40, BigInt(value), true);
  }

  public get linear(): Pointer {
    return (this.$address + 48) as unknown as Pointer;
  }
}

export class ma_paged_audio_buffer_page extends BaseStruct {
  public static override readonly BYTE_SIZE = 24;

  // ─── pNext (offset 0, ma_paged_audio_buffer_page) ───
  public get pNext(): Pointer {
    return Number(this.$view.getBigInt64(0, true)) as Pointer;
  }
  public set pNext(value: Pointer) {
    this.$view.setBigInt64(0, BigInt(value), true);
  }

  // ─── sizeInFrames (offset 8, unsigned long long) ───
  public get sizeInFrames(): bigint {
    return this.$view.getBigUint64(8, true);
  }
  public set sizeInFrames(value: bigint) {
    this.$view.setBigUint64(8, value, true);
  }

  public get pAudioData(): Pointer {
    return (this.$address + 16) as unknown as Pointer;
  }
}

export class ma_job extends BaseStruct {
  public static override readonly BYTE_SIZE = 32;

  public get toc(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── next (offset 8, unsigned long long) ───
  public get next(): bigint {
    return this.$view.getBigUint64(8, true);
  }
  public set next(value: bigint) {
    this.$view.setBigUint64(8, value, true);
  }

  // ─── order (offset 16, unsigned int) ───
  public get order(): number {
    return this.$view.getUint32(16, true);
  }
  public set order(value: number) {
    this.$view.setUint32(16, value, true);
  }

  public get data(): Pointer {
    return (this.$address + 24) as unknown as Pointer;
  }
}

export class ma_device_config extends BaseStruct {
  public static override readonly BYTE_SIZE = 144;

  public get deviceType(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── sampleRate (offset 8, unsigned int) ───
  public get sampleRate(): number {
    return this.$view.getUint32(8, true);
  }
  public set sampleRate(value: number) {
    this.$view.setUint32(8, value, true);
  }

  // ─── periodSizeInFrames (offset 12, unsigned int) ───
  public get periodSizeInFrames(): number {
    return this.$view.getUint32(12, true);
  }
  public set periodSizeInFrames(value: number) {
    this.$view.setUint32(12, value, true);
  }

  // ─── periodSizeInMilliseconds (offset 16, unsigned int) ───
  public get periodSizeInMilliseconds(): number {
    return this.$view.getUint32(16, true);
  }
  public set periodSizeInMilliseconds(value: number) {
    this.$view.setUint32(16, value, true);
  }

  // ─── periods (offset 20, unsigned int) ───
  public get periods(): number {
    return this.$view.getUint32(20, true);
  }
  public set periods(value: number) {
    this.$view.setUint32(20, value, true);
  }

  public get performanceProfile(): Pointer {
    return (this.$address + 24) as unknown as Pointer;
  }

  // ─── noPreSilencedOutputBuffer (offset 32, unsigned char) ───
  public get noPreSilencedOutputBuffer(): number {
    return this.$view.getUint8(32);
  }
  public set noPreSilencedOutputBuffer(value: number) {
    this.$view.setUint8(32, value);
  }

  // ─── noClip (offset 33, unsigned char) ───
  public get noClip(): number {
    return this.$view.getUint8(33);
  }
  public set noClip(value: number) {
    this.$view.setUint8(33, value);
  }

  // ─── noDisableDenormals (offset 34, unsigned char) ───
  public get noDisableDenormals(): number {
    return this.$view.getUint8(34);
  }
  public set noDisableDenormals(value: number) {
    this.$view.setUint8(34, value);
  }

  // ─── noFixedSizedCallback (offset 35, unsigned char) ───
  public get noFixedSizedCallback(): number {
    return this.$view.getUint8(35);
  }
  public set noFixedSizedCallback(value: number) {
    this.$view.setUint8(35, value);
  }

  public get dataCallback(): Pointer {
    return (this.$address + 40) as unknown as Pointer;
  }

  public get notificationCallback(): Pointer {
    return (this.$address + 48) as unknown as Pointer;
  }

  public get stopCallback(): Pointer {
    return (this.$address + 56) as unknown as Pointer;
  }

  // ─── pUserData (offset 64, void) ───
  public get pUserData(): Pointer {
    return Number(this.$view.getBigInt64(64, true)) as Pointer;
  }
  public set pUserData(value: Pointer) {
    this.$view.setBigInt64(64, BigInt(value), true);
  }

  public get resampling(): ma_resampler_config {
    return ma_resampler_config.fromPointer((this.$address + 72) as Pointer);
  }

  public get playback(): Pointer {
    return (this.$address + 80) as unknown as Pointer;
  }

  public get capture(): Pointer {
    return (this.$address + 88) as unknown as Pointer;
  }

  public get wasapi(): Pointer {
    return (this.$address + 96) as unknown as Pointer;
  }

  public get alsa(): Pointer {
    return (this.$address + 104) as unknown as Pointer;
  }

  public get pulse(): Pointer {
    return (this.$address + 112) as unknown as Pointer;
  }

  public get coreaudio(): Pointer {
    return (this.$address + 120) as unknown as Pointer;
  }

  public get opensl(): Pointer {
    return (this.$address + 128) as unknown as Pointer;
  }

  public get aaudio(): Pointer {
    return (this.$address + 136) as unknown as Pointer;
  }
}

export class ma_backend_callbacks extends BaseStruct {
  public static override readonly BYTE_SIZE = 104;

  public get onContextInit(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  public get onContextUninit(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }

  public get onContextEnumerateDevices(): Pointer {
    return (this.$address + 16) as unknown as Pointer;
  }

  public get onContextGetDeviceInfo(): Pointer {
    return (this.$address + 24) as unknown as Pointer;
  }

  public get onDeviceInit(): Pointer {
    return (this.$address + 32) as unknown as Pointer;
  }

  public get onDeviceUninit(): Pointer {
    return (this.$address + 40) as unknown as Pointer;
  }

  public get onDeviceStart(): Pointer {
    return (this.$address + 48) as unknown as Pointer;
  }

  public get onDeviceStop(): Pointer {
    return (this.$address + 56) as unknown as Pointer;
  }

  public get onDeviceRead(): Pointer {
    return (this.$address + 64) as unknown as Pointer;
  }

  public get onDeviceWrite(): Pointer {
    return (this.$address + 72) as unknown as Pointer;
  }

  public get onDeviceDataLoop(): Pointer {
    return (this.$address + 80) as unknown as Pointer;
  }

  public get onDeviceDataLoopWakeup(): Pointer {
    return (this.$address + 88) as unknown as Pointer;
  }

  public get onDeviceGetInfo(): Pointer {
    return (this.$address + 96) as unknown as Pointer;
  }
}

export class ma_context_config extends BaseStruct {
  public static override readonly BYTE_SIZE = 88;

  // ─── pLog (offset 0, ma_log) ───
  public get pLog(): Pointer {
    return Number(this.$view.getBigInt64(0, true)) as Pointer;
  }
  public set pLog(value: Pointer) {
    this.$view.setBigInt64(0, BigInt(value), true);
  }

  public get threadPriority(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }

  // ─── threadStackSize (offset 16, unsigned long) ───
  public get threadStackSize(): number {
    return this.$view.getUint32(16, true);
  }
  public set threadStackSize(value: number) {
    this.$view.setUint32(16, value, true);
  }

  // ─── pUserData (offset 24, void) ───
  public get pUserData(): Pointer {
    return Number(this.$view.getBigInt64(24, true)) as Pointer;
  }
  public set pUserData(value: Pointer) {
    this.$view.setBigInt64(24, BigInt(value), true);
  }

  public get allocationCallbacks(): Pointer {
    return (this.$address + 32) as unknown as Pointer;
  }

  public get dsound(): Pointer {
    return (this.$address + 40) as unknown as Pointer;
  }

  public get alsa(): Pointer {
    return (this.$address + 48) as unknown as Pointer;
  }

  public get pulse(): Pointer {
    return (this.$address + 56) as unknown as Pointer;
  }

  public get coreaudio(): Pointer {
    return (this.$address + 64) as unknown as Pointer;
  }

  public get jack(): Pointer {
    return (this.$address + 72) as unknown as Pointer;
  }

  public get custom(): ma_backend_callbacks {
    return ma_backend_callbacks.fromPointer((this.$address + 80) as Pointer);
  }
}

export class ma_context extends BaseStruct {
  public static override readonly BYTE_SIZE = 104;

  public get callbacks(): ma_backend_callbacks {
    return ma_backend_callbacks.fromPointer((this.$address + 0) as Pointer);
  }

  public get backend(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }

  // ─── pLog (offset 16, ma_log) ───
  public get pLog(): Pointer {
    return Number(this.$view.getBigInt64(16, true)) as Pointer;
  }
  public set pLog(value: Pointer) {
    this.$view.setBigInt64(16, BigInt(value), true);
  }

  public get log(): Pointer {
    return (this.$address + 24) as unknown as Pointer;
  }

  public get threadPriority(): Pointer {
    return (this.$address + 32) as unknown as Pointer;
  }

  // ─── threadStackSize (offset 40, unsigned long) ───
  public get threadStackSize(): number {
    return this.$view.getUint32(40, true);
  }
  public set threadStackSize(value: number) {
    this.$view.setUint32(40, value, true);
  }

  // ─── pUserData (offset 48, void) ───
  public get pUserData(): Pointer {
    return Number(this.$view.getBigInt64(48, true)) as Pointer;
  }
  public set pUserData(value: Pointer) {
    this.$view.setBigInt64(48, BigInt(value), true);
  }

  public get allocationCallbacks(): Pointer {
    return (this.$address + 56) as unknown as Pointer;
  }

  public get deviceEnumLock(): Pointer {
    return (this.$address + 64) as unknown as Pointer;
  }

  public get deviceInfoLock(): Pointer {
    return (this.$address + 72) as unknown as Pointer;
  }

  // ─── deviceInfoCapacity (offset 80, unsigned int) ───
  public get deviceInfoCapacity(): number {
    return this.$view.getUint32(80, true);
  }
  public set deviceInfoCapacity(value: number) {
    this.$view.setUint32(80, value, true);
  }

  // ─── playbackDeviceInfoCount (offset 84, unsigned int) ───
  public get playbackDeviceInfoCount(): number {
    return this.$view.getUint32(84, true);
  }
  public set playbackDeviceInfoCount(value: number) {
    this.$view.setUint32(84, value, true);
  }

  // ─── captureDeviceInfoCount (offset 88, unsigned int) ───
  public get captureDeviceInfoCount(): number {
    return this.$view.getUint32(88, true);
  }
  public set captureDeviceInfoCount(value: number) {
    this.$view.setUint32(88, value, true);
  }

  // ─── pDeviceInfos (offset 96, ma_device_info) ───
  public get pDeviceInfos(): Pointer {
    return Number(this.$view.getBigInt64(96, true)) as Pointer;
  }
  public set pDeviceInfos(value: Pointer) {
    this.$view.setBigInt64(96, BigInt(value), true);
  }
}

export class ma_device extends BaseStruct {
  public static override readonly BYTE_SIZE = 160;

  // ─── pContext (offset 0, ma_context) ───
  public get pContext(): Pointer {
    return Number(this.$view.getBigInt64(0, true)) as Pointer;
  }
  public set pContext(value: Pointer) {
    this.$view.setBigInt64(0, BigInt(value), true);
  }

  public get type(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }

  // ─── sampleRate (offset 16, unsigned int) ───
  public get sampleRate(): number {
    return this.$view.getUint32(16, true);
  }
  public set sampleRate(value: number) {
    this.$view.setUint32(16, value, true);
  }

  public get state(): Pointer {
    return (this.$address + 24) as unknown as Pointer;
  }

  public get onData(): Pointer {
    return (this.$address + 32) as unknown as Pointer;
  }

  public get onNotification(): Pointer {
    return (this.$address + 40) as unknown as Pointer;
  }

  public get onStop(): Pointer {
    return (this.$address + 48) as unknown as Pointer;
  }

  // ─── pUserData (offset 56, void) ───
  public get pUserData(): Pointer {
    return Number(this.$view.getBigInt64(56, true)) as Pointer;
  }
  public set pUserData(value: Pointer) {
    this.$view.setBigInt64(56, BigInt(value), true);
  }

  public get startStopLock(): Pointer {
    return (this.$address + 64) as unknown as Pointer;
  }

  public get wakeupEvent(): Pointer {
    return (this.$address + 72) as unknown as Pointer;
  }

  public get startEvent(): Pointer {
    return (this.$address + 80) as unknown as Pointer;
  }

  public get stopEvent(): Pointer {
    return (this.$address + 88) as unknown as Pointer;
  }

  // ─── thread (offset 96, struct _opaque_pthread_t) ───
  public get thread(): Pointer {
    return Number(this.$view.getBigInt64(96, true)) as Pointer;
  }
  public set thread(value: Pointer) {
    this.$view.setBigInt64(96, BigInt(value), true);
  }

  public get workResult(): Pointer {
    return (this.$address + 104) as unknown as Pointer;
  }

  // ─── isOwnerOfContext (offset 112, unsigned char) ───
  public get isOwnerOfContext(): number {
    return this.$view.getUint8(112);
  }
  public set isOwnerOfContext(value: number) {
    this.$view.setUint8(112, value);
  }

  // ─── noPreSilencedOutputBuffer (offset 113, unsigned char) ───
  public get noPreSilencedOutputBuffer(): number {
    return this.$view.getUint8(113);
  }
  public set noPreSilencedOutputBuffer(value: number) {
    this.$view.setUint8(113, value);
  }

  // ─── noClip (offset 114, unsigned char) ───
  public get noClip(): number {
    return this.$view.getUint8(114);
  }
  public set noClip(value: number) {
    this.$view.setUint8(114, value);
  }

  // ─── noDisableDenormals (offset 115, unsigned char) ───
  public get noDisableDenormals(): number {
    return this.$view.getUint8(115);
  }
  public set noDisableDenormals(value: number) {
    this.$view.setUint8(115, value);
  }

  // ─── noFixedSizedCallback (offset 116, unsigned char) ───
  public get noFixedSizedCallback(): number {
    return this.$view.getUint8(116);
  }
  public set noFixedSizedCallback(value: number) {
    this.$view.setUint8(116, value);
  }

  public get masterVolumeFactor(): Pointer {
    return (this.$address + 120) as unknown as Pointer;
  }

  public get duplexRB(): Pointer {
    return (this.$address + 128) as unknown as Pointer;
  }

  public get resampling(): Pointer {
    return (this.$address + 136) as unknown as Pointer;
  }

  public get playback(): Pointer {
    return (this.$address + 144) as unknown as Pointer;
  }

  public get capture(): Pointer {
    return (this.$address + 152) as unknown as Pointer;
  }
}

export class ma_decoder extends BaseStruct {
  public static override readonly BYTE_SIZE = 144;

  public get ds(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── pBackend (offset 8, ma_data_source) ───
  public get pBackend(): Pointer {
    return Number(this.$view.getBigInt64(8, true)) as Pointer;
  }
  public set pBackend(value: Pointer) {
    this.$view.setBigInt64(8, BigInt(value), true);
  }

  // ─── pBackendVTable (offset 16, ma_decoding_backend_vtable) ───
  public get pBackendVTable(): Pointer {
    return Number(this.$view.getBigInt64(16, true)) as Pointer;
  }

  // ─── pBackendUserData (offset 24, void) ───
  public get pBackendUserData(): Pointer {
    return Number(this.$view.getBigInt64(24, true)) as Pointer;
  }
  public set pBackendUserData(value: Pointer) {
    this.$view.setBigInt64(24, BigInt(value), true);
  }

  public get onRead(): Pointer {
    return (this.$address + 32) as unknown as Pointer;
  }

  public get onSeek(): Pointer {
    return (this.$address + 40) as unknown as Pointer;
  }

  public get onTell(): Pointer {
    return (this.$address + 48) as unknown as Pointer;
  }

  // ─── pUserData (offset 56, void) ───
  public get pUserData(): Pointer {
    return Number(this.$view.getBigInt64(56, true)) as Pointer;
  }
  public set pUserData(value: Pointer) {
    this.$view.setBigInt64(56, BigInt(value), true);
  }

  // ─── readPointerInPCMFrames (offset 64, unsigned long long) ───
  public get readPointerInPCMFrames(): bigint {
    return this.$view.getBigUint64(64, true);
  }
  public set readPointerInPCMFrames(value: bigint) {
    this.$view.setBigUint64(64, value, true);
  }

  public get outputFormat(): Pointer {
    return (this.$address + 72) as unknown as Pointer;
  }

  // ─── outputChannels (offset 80, unsigned int) ───
  public get outputChannels(): number {
    return this.$view.getUint32(80, true);
  }
  public set outputChannels(value: number) {
    this.$view.setUint32(80, value, true);
  }

  // ─── outputSampleRate (offset 84, unsigned int) ───
  public get outputSampleRate(): number {
    return this.$view.getUint32(84, true);
  }
  public set outputSampleRate(value: number) {
    this.$view.setUint32(84, value, true);
  }

  public get converter(): Pointer {
    return (this.$address + 88) as unknown as Pointer;
  }

  // ─── pInputCache (offset 96, void) ───
  public get pInputCache(): Pointer {
    return Number(this.$view.getBigInt64(96, true)) as Pointer;
  }
  public set pInputCache(value: Pointer) {
    this.$view.setBigInt64(96, BigInt(value), true);
  }

  // ─── inputCacheCap (offset 104, unsigned long long) ───
  public get inputCacheCap(): bigint {
    return this.$view.getBigUint64(104, true);
  }
  public set inputCacheCap(value: bigint) {
    this.$view.setBigUint64(104, value, true);
  }

  // ─── inputCacheConsumed (offset 112, unsigned long long) ───
  public get inputCacheConsumed(): bigint {
    return this.$view.getBigUint64(112, true);
  }
  public set inputCacheConsumed(value: bigint) {
    this.$view.setBigUint64(112, value, true);
  }

  // ─── inputCacheRemaining (offset 120, unsigned long long) ───
  public get inputCacheRemaining(): bigint {
    return this.$view.getBigUint64(120, true);
  }
  public set inputCacheRemaining(value: bigint) {
    this.$view.setBigUint64(120, value, true);
  }

  public get allocationCallbacks(): Pointer {
    return (this.$address + 128) as unknown as Pointer;
  }

  public get data(): Pointer {
    return (this.$address + 136) as unknown as Pointer;
  }
}

export class ma_encoder extends BaseStruct {
  public static override readonly BYTE_SIZE = 72;

  public get config(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  public get onWrite(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }

  public get onSeek(): Pointer {
    return (this.$address + 16) as unknown as Pointer;
  }

  public get onInit(): Pointer {
    return (this.$address + 24) as unknown as Pointer;
  }

  public get onUninit(): Pointer {
    return (this.$address + 32) as unknown as Pointer;
  }

  public get onWritePCMFrames(): Pointer {
    return (this.$address + 40) as unknown as Pointer;
  }

  // ─── pUserData (offset 48, void) ───
  public get pUserData(): Pointer {
    return Number(this.$view.getBigInt64(48, true)) as Pointer;
  }
  public set pUserData(value: Pointer) {
    this.$view.setBigInt64(48, BigInt(value), true);
  }

  // ─── pInternalEncoder (offset 56, void) ───
  public get pInternalEncoder(): Pointer {
    return Number(this.$view.getBigInt64(56, true)) as Pointer;
  }
  public set pInternalEncoder(value: Pointer) {
    this.$view.setBigInt64(56, BigInt(value), true);
  }

  public get data(): Pointer {
    return (this.$address + 64) as unknown as Pointer;
  }
}

export class ma_resource_manager_data_buffer_node extends BaseStruct {
  public static override readonly BYTE_SIZE = 64;

  // ─── hashedName32 (offset 0, unsigned int) ───
  public get hashedName32(): number {
    return this.$view.getUint32(0, true);
  }
  public set hashedName32(value: number) {
    this.$view.setUint32(0, value, true);
  }

  // ─── refCount (offset 4, unsigned int) ───
  public get refCount(): number {
    return this.$view.getUint32(4, true);
  }
  public set refCount(value: number) {
    this.$view.setUint32(4, value, true);
  }

  public get result(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }

  // ─── executionCounter (offset 16, unsigned int) ───
  public get executionCounter(): number {
    return this.$view.getUint32(16, true);
  }
  public set executionCounter(value: number) {
    this.$view.setUint32(16, value, true);
  }

  // ─── executionPointer (offset 20, unsigned int) ───
  public get executionPointer(): number {
    return this.$view.getUint32(20, true);
  }
  public set executionPointer(value: number) {
    this.$view.setUint32(20, value, true);
  }

  // ─── isDataOwnedByResourceManager (offset 24, unsigned int) ───
  public get isDataOwnedByResourceManager(): number {
    return this.$view.getUint32(24, true);
  }
  public set isDataOwnedByResourceManager(value: number) {
    this.$view.setUint32(24, value, true);
  }

  public get data(): Pointer {
    return (this.$address + 32) as unknown as Pointer;
  }

  // ─── pParent (offset 40, ma_resource_manager_data_buffer_node) ───
  public get pParent(): Pointer {
    return Number(this.$view.getBigInt64(40, true)) as Pointer;
  }
  public set pParent(value: Pointer) {
    this.$view.setBigInt64(40, BigInt(value), true);
  }

  // ─── pChildLo (offset 48, ma_resource_manager_data_buffer_node) ───
  public get pChildLo(): Pointer {
    return Number(this.$view.getBigInt64(48, true)) as Pointer;
  }
  public set pChildLo(value: Pointer) {
    this.$view.setBigInt64(48, BigInt(value), true);
  }

  // ─── pChildHi (offset 56, ma_resource_manager_data_buffer_node) ───
  public get pChildHi(): Pointer {
    return Number(this.$view.getBigInt64(56, true)) as Pointer;
  }
  public set pChildHi(value: Pointer) {
    this.$view.setBigInt64(56, BigInt(value), true);
  }
}

export class ma_resource_manager_data_buffer extends BaseStruct {
  public static override readonly BYTE_SIZE = 88;

  public get ds(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── pResourceManager (offset 8, ma_resource_manager) ───
  public get pResourceManager(): Pointer {
    return Number(this.$view.getBigInt64(8, true)) as Pointer;
  }
  public set pResourceManager(value: Pointer) {
    this.$view.setBigInt64(8, BigInt(value), true);
  }

  // ─── pNode (offset 16, ma_resource_manager_data_buffer_node) ───
  public get pNode(): Pointer {
    return Number(this.$view.getBigInt64(16, true)) as Pointer;
  }
  public set pNode(value: Pointer) {
    this.$view.setBigInt64(16, BigInt(value), true);
  }

  // ─── flags (offset 24, unsigned int) ───
  public get flags(): number {
    return this.$view.getUint32(24, true);
  }
  public set flags(value: number) {
    this.$view.setUint32(24, value, true);
  }

  // ─── executionCounter (offset 28, unsigned int) ───
  public get executionCounter(): number {
    return this.$view.getUint32(28, true);
  }
  public set executionCounter(value: number) {
    this.$view.setUint32(28, value, true);
  }

  // ─── executionPointer (offset 32, unsigned int) ───
  public get executionPointer(): number {
    return this.$view.getUint32(32, true);
  }
  public set executionPointer(value: number) {
    this.$view.setUint32(32, value, true);
  }

  // ─── seekTargetInPCMFrames (offset 40, unsigned long long) ───
  public get seekTargetInPCMFrames(): bigint {
    return this.$view.getBigUint64(40, true);
  }
  public set seekTargetInPCMFrames(value: bigint) {
    this.$view.setBigUint64(40, value, true);
  }

  // ─── seekToCursorOnNextRead (offset 48, unsigned int) ───
  public get seekToCursorOnNextRead(): number {
    return this.$view.getUint32(48, true);
  }
  public set seekToCursorOnNextRead(value: number) {
    this.$view.setUint32(48, value, true);
  }

  public get result(): Pointer {
    return (this.$address + 56) as unknown as Pointer;
  }

  // ─── isLooping (offset 64, unsigned int) ───
  public get isLooping(): number {
    return this.$view.getUint32(64, true);
  }
  public set isLooping(value: number) {
    this.$view.setUint32(64, value, true);
  }

  public get isConnectorInitialized(): Pointer {
    return (this.$address + 72) as unknown as Pointer;
  }

  public get connector(): Pointer {
    return (this.$address + 80) as unknown as Pointer;
  }
}

export class ma_resource_manager_data_stream extends BaseStruct {
  public static override readonly BYTE_SIZE = 144;

  public get ds(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── pResourceManager (offset 8, ma_resource_manager) ───
  public get pResourceManager(): Pointer {
    return Number(this.$view.getBigInt64(8, true)) as Pointer;
  }
  public set pResourceManager(value: Pointer) {
    this.$view.setBigInt64(8, BigInt(value), true);
  }

  // ─── flags (offset 16, unsigned int) ───
  public get flags(): number {
    return this.$view.getUint32(16, true);
  }
  public set flags(value: number) {
    this.$view.setUint32(16, value, true);
  }

  public get decoder(): ma_decoder {
    return ma_decoder.fromPointer((this.$address + 24) as Pointer);
  }

  // ─── isDecoderInitialized (offset 32, unsigned int) ───
  public get isDecoderInitialized(): number {
    return this.$view.getUint32(32, true);
  }
  public set isDecoderInitialized(value: number) {
    this.$view.setUint32(32, value, true);
  }

  // ─── totalLengthInPCMFrames (offset 40, unsigned long long) ───
  public get totalLengthInPCMFrames(): bigint {
    return this.$view.getBigUint64(40, true);
  }
  public set totalLengthInPCMFrames(value: bigint) {
    this.$view.setBigUint64(40, value, true);
  }

  // ─── relativeCursor (offset 48, unsigned int) ───
  public get relativeCursor(): number {
    return this.$view.getUint32(48, true);
  }
  public set relativeCursor(value: number) {
    this.$view.setUint32(48, value, true);
  }

  // ─── absoluteCursor (offset 56, unsigned long long) ───
  public get absoluteCursor(): bigint {
    return this.$view.getBigUint64(56, true);
  }
  public set absoluteCursor(value: bigint) {
    this.$view.setBigUint64(56, value, true);
  }

  // ─── currentPageIndex (offset 64, unsigned int) ───
  public get currentPageIndex(): number {
    return this.$view.getUint32(64, true);
  }
  public set currentPageIndex(value: number) {
    this.$view.setUint32(64, value, true);
  }

  // ─── executionCounter (offset 68, unsigned int) ───
  public get executionCounter(): number {
    return this.$view.getUint32(68, true);
  }
  public set executionCounter(value: number) {
    this.$view.setUint32(68, value, true);
  }

  // ─── executionPointer (offset 72, unsigned int) ───
  public get executionPointer(): number {
    return this.$view.getUint32(72, true);
  }
  public set executionPointer(value: number) {
    this.$view.setUint32(72, value, true);
  }

  // ─── isLooping (offset 76, unsigned int) ───
  public get isLooping(): number {
    return this.$view.getUint32(76, true);
  }
  public set isLooping(value: number) {
    this.$view.setUint32(76, value, true);
  }

  // ─── pPageData (offset 80, void) ───
  public get pPageData(): Pointer {
    return Number(this.$view.getBigInt64(80, true)) as Pointer;
  }
  public set pPageData(value: Pointer) {
    this.$view.setBigInt64(80, BigInt(value), true);
  }

  public get pageFrameCount(): Pointer {
    return (this.$address + 88) as unknown as Pointer;
  }

  public get result(): Pointer {
    return (this.$address + 104) as unknown as Pointer;
  }

  // ─── isDecoderAtEnd (offset 112, unsigned int) ───
  public get isDecoderAtEnd(): number {
    return this.$view.getUint32(112, true);
  }
  public set isDecoderAtEnd(value: number) {
    this.$view.setUint32(112, value, true);
  }

  public get isPageValid(): Pointer {
    return (this.$address + 120) as unknown as Pointer;
  }

  // ─── seekCounter (offset 136, unsigned int) ───
  public get seekCounter(): number {
    return this.$view.getUint32(136, true);
  }
  public set seekCounter(value: number) {
    this.$view.setUint32(136, value, true);
  }
}

export class ma_resource_manager_data_source extends BaseStruct {
  public static override readonly BYTE_SIZE = 24;

  public get backend(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── flags (offset 8, unsigned int) ───
  public get flags(): number {
    return this.$view.getUint32(8, true);
  }
  public set flags(value: number) {
    this.$view.setUint32(8, value, true);
  }

  // ─── executionCounter (offset 12, unsigned int) ───
  public get executionCounter(): number {
    return this.$view.getUint32(12, true);
  }
  public set executionCounter(value: number) {
    this.$view.setUint32(12, value, true);
  }

  // ─── executionPointer (offset 16, unsigned int) ───
  public get executionPointer(): number {
    return this.$view.getUint32(16, true);
  }
  public set executionPointer(value: number) {
    this.$view.setUint32(16, value, true);
  }
}

export class ma_resource_manager extends BaseStruct {
  public static override readonly BYTE_SIZE = 560;

  public get config(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── pRootDataBufferNode (offset 8, ma_resource_manager_data_buffer_node) ───
  public get pRootDataBufferNode(): Pointer {
    return Number(this.$view.getBigInt64(8, true)) as Pointer;
  }
  public set pRootDataBufferNode(value: Pointer) {
    this.$view.setBigInt64(8, BigInt(value), true);
  }

  public get dataBufferBSTLock(): Pointer {
    return (this.$address + 16) as unknown as Pointer;
  }

  public get jobThreads(): Pointer {
    return (this.$address + 24) as unknown as Pointer;
  }

  public get jobQueue(): Pointer {
    return (this.$address + 536) as unknown as Pointer;
  }

  public get defaultVFS(): Pointer {
    return (this.$address + 544) as unknown as Pointer;
  }

  public get log(): Pointer {
    return (this.$address + 552) as unknown as Pointer;
  }
}

export class ma_node_output_bus extends BaseStruct {
  public static override readonly BYTE_SIZE = 56;

  // ─── pNode (offset 0, ma_node) ───
  public get pNode(): Pointer {
    return Number(this.$view.getBigInt64(0, true)) as Pointer;
  }
  public set pNode(value: Pointer) {
    this.$view.setBigInt64(0, BigInt(value), true);
  }

  // ─── outputBusIndex (offset 8, unsigned char) ───
  public get outputBusIndex(): number {
    return this.$view.getUint8(8);
  }
  public set outputBusIndex(value: number) {
    this.$view.setUint8(8, value);
  }

  // ─── channels (offset 9, unsigned char) ───
  public get channels(): number {
    return this.$view.getUint8(9);
  }
  public set channels(value: number) {
    this.$view.setUint8(9, value);
  }

  // ─── inputNodeInputBusIndex (offset 10, unsigned char) ───
  public get inputNodeInputBusIndex(): number {
    return this.$view.getUint8(10);
  }
  public set inputNodeInputBusIndex(value: number) {
    this.$view.setUint8(10, value);
  }

  // ─── flags (offset 12, unsigned int) ───
  public get flags(): number {
    return this.$view.getUint32(12, true);
  }
  public set flags(value: number) {
    this.$view.setUint32(12, value, true);
  }

  // ─── refCount (offset 16, unsigned int) ───
  public get refCount(): number {
    return this.$view.getUint32(16, true);
  }
  public set refCount(value: number) {
    this.$view.setUint32(16, value, true);
  }

  // ─── isAttached (offset 20, unsigned int) ───
  public get isAttached(): number {
    return this.$view.getUint32(20, true);
  }
  public set isAttached(value: number) {
    this.$view.setUint32(20, value, true);
  }

  // ─── lock (offset 24, unsigned int) ───
  public get lock(): number {
    return this.$view.getUint32(24, true);
  }
  public set lock(value: number) {
    this.$view.setUint32(24, value, true);
  }

  // ─── volume (offset 28, float) ───
  public get volume(): number {
    return this.$view.getFloat32(28, true);
  }
  public set volume(value: number) {
    this.$view.setFloat32(28, value, true);
  }

  // ─── pNext (offset 32, ma_node_output_bus) ───
  public get pNext(): Pointer {
    return Number(this.$view.getBigInt64(32, true)) as Pointer;
  }
  public set pNext(value: Pointer) {
    this.$view.setBigInt64(32, BigInt(value), true);
  }

  // ─── pPrev (offset 40, ma_node_output_bus) ───
  public get pPrev(): Pointer {
    return Number(this.$view.getBigInt64(40, true)) as Pointer;
  }
  public set pPrev(value: Pointer) {
    this.$view.setBigInt64(40, BigInt(value), true);
  }

  // ─── pInputNode (offset 48, ma_node) ───
  public get pInputNode(): Pointer {
    return Number(this.$view.getBigInt64(48, true)) as Pointer;
  }
  public set pInputNode(value: Pointer) {
    this.$view.setBigInt64(48, BigInt(value), true);
  }
}

export class ma_node_input_bus extends BaseStruct {
  public static override readonly BYTE_SIZE = 24;

  public get head(): ma_node_output_bus {
    return ma_node_output_bus.fromPointer((this.$address + 0) as Pointer);
  }

  // ─── nextCounter (offset 8, unsigned int) ───
  public get nextCounter(): number {
    return this.$view.getUint32(8, true);
  }
  public set nextCounter(value: number) {
    this.$view.setUint32(8, value, true);
  }

  // ─── lock (offset 12, unsigned int) ───
  public get lock(): number {
    return this.$view.getUint32(12, true);
  }
  public set lock(value: number) {
    this.$view.setUint32(12, value, true);
  }

  // ─── channels (offset 16, unsigned char) ───
  public get channels(): number {
    return this.$view.getUint8(16);
  }
  public set channels(value: number) {
    this.$view.setUint8(16, value);
  }
}

export class ma_node_base extends BaseStruct {
  public static override readonly BYTE_SIZE = 136;

  // ─── pNodeGraph (offset 0, ma_node_graph) ───
  public get pNodeGraph(): Pointer {
    return Number(this.$view.getBigInt64(0, true)) as Pointer;
  }
  public set pNodeGraph(value: Pointer) {
    this.$view.setBigInt64(0, BigInt(value), true);
  }

  // ─── vtable (offset 8, ma_node_vtable) ───
  public get vtable(): Pointer {
    return Number(this.$view.getBigInt64(8, true)) as Pointer;
  }

  // ─── inputBusCount (offset 16, unsigned int) ───
  public get inputBusCount(): number {
    return this.$view.getUint32(16, true);
  }
  public set inputBusCount(value: number) {
    this.$view.setUint32(16, value, true);
  }

  // ─── outputBusCount (offset 20, unsigned int) ───
  public get outputBusCount(): number {
    return this.$view.getUint32(20, true);
  }
  public set outputBusCount(value: number) {
    this.$view.setUint32(20, value, true);
  }

  // ─── pInputBuses (offset 24, ma_node_input_bus) ───
  public get pInputBuses(): Pointer {
    return Number(this.$view.getBigInt64(24, true)) as Pointer;
  }
  public set pInputBuses(value: Pointer) {
    this.$view.setBigInt64(24, BigInt(value), true);
  }

  // ─── pOutputBuses (offset 32, ma_node_output_bus) ───
  public get pOutputBuses(): Pointer {
    return Number(this.$view.getBigInt64(32, true)) as Pointer;
  }
  public set pOutputBuses(value: Pointer) {
    this.$view.setBigInt64(32, BigInt(value), true);
  }

  // ─── pCachedData (offset 40, float) ───
  public get pCachedData(): Pointer {
    return Number(this.$view.getBigInt64(40, true)) as Pointer;
  }
  public set pCachedData(value: Pointer) {
    this.$view.setBigInt64(40, BigInt(value), true);
  }

  // ─── cachedDataCapInFramesPerBus (offset 48, unsigned short) ───
  public get cachedDataCapInFramesPerBus(): number {
    return this.$view.getUint16(48, true);
  }
  public set cachedDataCapInFramesPerBus(value: number) {
    this.$view.setUint16(48, value, true);
  }

  // ─── cachedFrameCountOut (offset 50, unsigned short) ───
  public get cachedFrameCountOut(): number {
    return this.$view.getUint16(50, true);
  }
  public set cachedFrameCountOut(value: number) {
    this.$view.setUint16(50, value, true);
  }

  // ─── cachedFrameCountIn (offset 52, unsigned short) ───
  public get cachedFrameCountIn(): number {
    return this.$view.getUint16(52, true);
  }
  public set cachedFrameCountIn(value: number) {
    this.$view.setUint16(52, value, true);
  }

  // ─── consumedFrameCountIn (offset 54, unsigned short) ───
  public get consumedFrameCountIn(): number {
    return this.$view.getUint16(54, true);
  }
  public set consumedFrameCountIn(value: number) {
    this.$view.setUint16(54, value, true);
  }

  public get state(): Pointer {
    return (this.$address + 56) as unknown as Pointer;
  }

  public get stateTimes(): Pointer {
    return (this.$address + 64) as unknown as Pointer;
  }

  // ─── localTime (offset 80, unsigned long long) ───
  public get localTime(): bigint {
    return this.$view.getBigUint64(80, true);
  }
  public set localTime(value: bigint) {
    this.$view.setBigUint64(80, value, true);
  }

  public get _inputBuses(): Pointer {
    return (this.$address + 88) as unknown as Pointer;
  }

  public get _outputBuses(): Pointer {
    return (this.$address + 104) as unknown as Pointer;
  }

  // ─── _pHeap (offset 120, void) ───
  public get _pHeap(): Pointer {
    return Number(this.$view.getBigInt64(120, true)) as Pointer;
  }
  public set _pHeap(value: Pointer) {
    this.$view.setBigInt64(120, BigInt(value), true);
  }

  // ─── _ownsHeap (offset 128, unsigned int) ───
  public get _ownsHeap(): number {
    return this.$view.getUint32(128, true);
  }
  public set _ownsHeap(value: number) {
    this.$view.setUint32(128, value, true);
  }
}

export class ma_node_graph extends BaseStruct {
  public static override readonly BYTE_SIZE = 48;

  public get base(): ma_node_base {
    return ma_node_base.fromPointer((this.$address + 0) as Pointer);
  }

  public get endpoint(): ma_node_base {
    return ma_node_base.fromPointer((this.$address + 8) as Pointer);
  }

  // ─── pProcessingCache (offset 16, float) ───
  public get pProcessingCache(): Pointer {
    return Number(this.$view.getBigInt64(16, true)) as Pointer;
  }
  public set pProcessingCache(value: Pointer) {
    this.$view.setBigInt64(16, BigInt(value), true);
  }

  // ─── processingCacheFramesRemaining (offset 24, unsigned int) ───
  public get processingCacheFramesRemaining(): number {
    return this.$view.getUint32(24, true);
  }
  public set processingCacheFramesRemaining(value: number) {
    this.$view.setUint32(24, value, true);
  }

  // ─── processingSizeInFrames (offset 28, unsigned int) ───
  public get processingSizeInFrames(): number {
    return this.$view.getUint32(28, true);
  }
  public set processingSizeInFrames(value: number) {
    this.$view.setUint32(28, value, true);
  }

  // ─── isReading (offset 32, unsigned int) ───
  public get isReading(): number {
    return this.$view.getUint32(32, true);
  }
  public set isReading(value: number) {
    this.$view.setUint32(32, value, true);
  }

  // ─── pPreMixStack (offset 40, ma_stack) ───
  public get pPreMixStack(): Pointer {
    return Number(this.$view.getBigInt64(40, true)) as Pointer;
  }
  public set pPreMixStack(value: Pointer) {
    this.$view.setBigInt64(40, BigInt(value), true);
  }
}

export class ma_sound extends BaseStruct {
  public static override readonly BYTE_SIZE = 80;

  public get engineNode(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── pDataSource (offset 8, ma_data_source) ───
  public get pDataSource(): Pointer {
    return Number(this.$view.getBigInt64(8, true)) as Pointer;
  }
  public set pDataSource(value: Pointer) {
    this.$view.setBigInt64(8, BigInt(value), true);
  }

  // ─── seekTarget (offset 16, unsigned long long) ───
  public get seekTarget(): bigint {
    return this.$view.getBigUint64(16, true);
  }
  public set seekTarget(value: bigint) {
    this.$view.setBigUint64(16, value, true);
  }

  // ─── atEnd (offset 24, unsigned int) ───
  public get atEnd(): number {
    return this.$view.getUint32(24, true);
  }
  public set atEnd(value: number) {
    this.$view.setUint32(24, value, true);
  }

  public get endCallback(): Pointer {
    return (this.$address + 32) as unknown as Pointer;
  }

  // ─── pEndCallbackUserData (offset 40, void) ───
  public get pEndCallbackUserData(): Pointer {
    return Number(this.$view.getBigInt64(40, true)) as Pointer;
  }
  public set pEndCallbackUserData(value: Pointer) {
    this.$view.setBigInt64(40, BigInt(value), true);
  }

  // ─── pProcessingCache (offset 48, float) ───
  public get pProcessingCache(): Pointer {
    return Number(this.$view.getBigInt64(48, true)) as Pointer;
  }
  public set pProcessingCache(value: Pointer) {
    this.$view.setBigInt64(48, BigInt(value), true);
  }

  // ─── processingCacheFramesRemaining (offset 56, unsigned int) ───
  public get processingCacheFramesRemaining(): number {
    return this.$view.getUint32(56, true);
  }
  public set processingCacheFramesRemaining(value: number) {
    this.$view.setUint32(56, value, true);
  }

  // ─── processingCacheCap (offset 60, unsigned int) ───
  public get processingCacheCap(): number {
    return this.$view.getUint32(60, true);
  }
  public set processingCacheCap(value: number) {
    this.$view.setUint32(60, value, true);
  }

  // ─── ownsDataSource (offset 64, unsigned char) ───
  public get ownsDataSource(): number {
    return this.$view.getUint8(64);
  }
  public set ownsDataSource(value: number) {
    this.$view.setUint8(64, value);
  }

  // ─── pResourceManagerDataSource (offset 72, ma_resource_manager_data_source) ───
  public get pResourceManagerDataSource(): Pointer {
    return Number(this.$view.getBigInt64(72, true)) as Pointer;
  }
  public set pResourceManagerDataSource(value: Pointer) {
    this.$view.setBigInt64(72, BigInt(value), true);
  }
}

export class ma_sound_inlined extends BaseStruct {
  public static override readonly BYTE_SIZE = 24;

  public get sound(): ma_sound {
    return ma_sound.fromPointer((this.$address + 0) as Pointer);
  }

  // ─── pNext (offset 8, ma_sound_inlined) ───
  public get pNext(): Pointer {
    return Number(this.$view.getBigInt64(8, true)) as Pointer;
  }
  public set pNext(value: Pointer) {
    this.$view.setBigInt64(8, BigInt(value), true);
  }

  // ─── pPrev (offset 16, ma_sound_inlined) ───
  public get pPrev(): Pointer {
    return Number(this.$view.getBigInt64(16, true)) as Pointer;
  }
  public set pPrev(value: Pointer) {
    this.$view.setBigInt64(16, BigInt(value), true);
  }
}

export class ma_engine extends BaseStruct {
  public static override readonly BYTE_SIZE = 144;

  public get nodeGraph(): ma_node_graph {
    return ma_node_graph.fromPointer((this.$address + 0) as Pointer);
  }

  // ─── pResourceManager (offset 8, ma_resource_manager) ───
  public get pResourceManager(): Pointer {
    return Number(this.$view.getBigInt64(8, true)) as Pointer;
  }
  public set pResourceManager(value: Pointer) {
    this.$view.setBigInt64(8, BigInt(value), true);
  }

  // ─── pDevice (offset 16, ma_device) ───
  public get pDevice(): Pointer {
    return Number(this.$view.getBigInt64(16, true)) as Pointer;
  }
  public set pDevice(value: Pointer) {
    this.$view.setBigInt64(16, BigInt(value), true);
  }

  // ─── pLog (offset 24, ma_log) ───
  public get pLog(): Pointer {
    return Number(this.$view.getBigInt64(24, true)) as Pointer;
  }
  public set pLog(value: Pointer) {
    this.$view.setBigInt64(24, BigInt(value), true);
  }

  // ─── sampleRate (offset 32, unsigned int) ───
  public get sampleRate(): number {
    return this.$view.getUint32(32, true);
  }
  public set sampleRate(value: number) {
    this.$view.setUint32(32, value, true);
  }

  // ─── listenerCount (offset 36, unsigned int) ───
  public get listenerCount(): number {
    return this.$view.getUint32(36, true);
  }
  public set listenerCount(value: number) {
    this.$view.setUint32(36, value, true);
  }

  public get listeners(): Pointer {
    return (this.$address + 40) as unknown as Pointer;
  }

  public get allocationCallbacks(): Pointer {
    return (this.$address + 72) as unknown as Pointer;
  }

  // ─── ownsResourceManager (offset 80, unsigned char) ───
  public get ownsResourceManager(): number {
    return this.$view.getUint8(80);
  }
  public set ownsResourceManager(value: number) {
    this.$view.setUint8(80, value);
  }

  // ─── ownsDevice (offset 81, unsigned char) ───
  public get ownsDevice(): number {
    return this.$view.getUint8(81);
  }
  public set ownsDevice(value: number) {
    this.$view.setUint8(81, value);
  }

  // ─── inlinedSoundLock (offset 84, unsigned int) ───
  public get inlinedSoundLock(): number {
    return this.$view.getUint32(84, true);
  }
  public set inlinedSoundLock(value: number) {
    this.$view.setUint32(84, value, true);
  }

  // ─── pInlinedSoundHead (offset 88, ma_sound_inlined) ───
  public get pInlinedSoundHead(): Pointer {
    return Number(this.$view.getBigInt64(88, true)) as Pointer;
  }
  public set pInlinedSoundHead(value: Pointer) {
    this.$view.setBigInt64(88, BigInt(value), true);
  }

  // ─── inlinedSoundCount (offset 96, unsigned int) ───
  public get inlinedSoundCount(): number {
    return this.$view.getUint32(96, true);
  }
  public set inlinedSoundCount(value: number) {
    this.$view.setUint32(96, value, true);
  }

  // ─── gainSmoothTimeInFrames (offset 100, unsigned int) ───
  public get gainSmoothTimeInFrames(): number {
    return this.$view.getUint32(100, true);
  }
  public set gainSmoothTimeInFrames(value: number) {
    this.$view.setUint32(100, value, true);
  }

  // ─── defaultVolumeSmoothTimeInPCMFrames (offset 104, unsigned int) ───
  public get defaultVolumeSmoothTimeInPCMFrames(): number {
    return this.$view.getUint32(104, true);
  }
  public set defaultVolumeSmoothTimeInPCMFrames(value: number) {
    this.$view.setUint32(104, value, true);
  }

  public get monoExpansionMode(): Pointer {
    return (this.$address + 112) as unknown as Pointer;
  }

  public get onProcess(): Pointer {
    return (this.$address + 120) as unknown as Pointer;
  }

  // ─── pProcessUserData (offset 128, void) ───
  public get pProcessUserData(): Pointer {
    return Number(this.$view.getBigInt64(128, true)) as Pointer;
  }
  public set pProcessUserData(value: Pointer) {
    this.$view.setBigInt64(128, BigInt(value), true);
  }

  public get pitchResamplingConfig(): ma_resampler_config {
    return ma_resampler_config.fromPointer((this.$address + 136) as Pointer);
  }
}
