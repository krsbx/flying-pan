import { BaseStruct } from '@utility/base-struct';
import type { Pointer } from 'bun:ffi';

export class __darwin_pthread_handler_rec extends BaseStruct {
  public static override readonly BYTE_SIZE = 24;

  public get __routine(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── __arg (offset 8, void) ───
  public get __arg(): Pointer {
    return Number(this.$view.getBigInt64(8, true)) as Pointer;
  }
  public set __arg(value: Pointer) {
    this.$view.setBigInt64(8, BigInt(value), true);
  }

  // ─── __next (offset 16, struct __darwin_pthread_handler_rec) ───
  public get __next(): Pointer {
    return Number(this.$view.getBigInt64(16, true)) as Pointer;
  }
  public set __next(value: Pointer) {
    this.$view.setBigInt64(16, BigInt(value), true);
  }
}

export class _opaque_pthread_attr_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 64;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }
}

export class _opaque_pthread_cond_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 48;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }
}

export class _opaque_pthread_condattr_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 16;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }
}

export class _opaque_pthread_mutex_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 64;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }
}

export class _opaque_pthread_mutexattr_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 16;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }
}

export class _opaque_pthread_once_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 16;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }
}

export class _opaque_pthread_rwlock_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 200;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }
}

export class _opaque_pthread_rwlockattr_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 24;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }
}

export class _opaque_pthread_t extends BaseStruct {
  public static override readonly BYTE_SIZE = 8192;

  // ─── __sig (offset 0, long) ───
  public get __sig(): number {
    return this.$view.getInt32(0, true);
  }
  public set __sig(value: number) {
    this.$view.setInt32(0, value, true);
  }

  // ─── __cleanup_stack (offset 8, struct __darwin_pthread_handler_rec) ───
  public get __cleanup_stack(): Pointer {
    return Number(this.$view.getBigInt64(8, true)) as Pointer;
  }
  public set __cleanup_stack(value: Pointer) {
    this.$view.setBigInt64(8, BigInt(value), true);
  }

  public get __opaque(): Pointer {
    return (this.$address + 16) as unknown as Pointer;
  }
}

export class __sbuf extends BaseStruct {
  public static override readonly BYTE_SIZE = 16;

  // ─── _base (offset 0, unsigned char) ───
  public get _base(): Pointer {
    return Number(this.$view.getBigInt64(0, true)) as Pointer;
  }
  public set _base(value: Pointer) {
    this.$view.setBigInt64(0, BigInt(value), true);
  }

  // ─── _size (offset 8, int) ───
  public get _size(): number {
    return this.$view.getInt32(8, true);
  }
  public set _size(value: number) {
    this.$view.setInt32(8, value, true);
  }
}

export class __sFILE extends BaseStruct {
  public static override readonly BYTE_SIZE = 136;

  // ─── _p (offset 0, unsigned char) ───
  public get _p(): Pointer {
    return Number(this.$view.getBigInt64(0, true)) as Pointer;
  }
  public set _p(value: Pointer) {
    this.$view.setBigInt64(0, BigInt(value), true);
  }

  // ─── _r (offset 8, int) ───
  public get _r(): number {
    return this.$view.getInt32(8, true);
  }
  public set _r(value: number) {
    this.$view.setInt32(8, value, true);
  }

  // ─── _w (offset 12, int) ───
  public get _w(): number {
    return this.$view.getInt32(12, true);
  }
  public set _w(value: number) {
    this.$view.setInt32(12, value, true);
  }

  // ─── _flags (offset 16, short) ───
  public get _flags(): number {
    return this.$view.getInt16(16, true);
  }
  public set _flags(value: number) {
    this.$view.setInt16(16, value, true);
  }

  // ─── _file (offset 18, short) ───
  public get _file(): number {
    return this.$view.getInt16(18, true);
  }
  public set _file(value: number) {
    this.$view.setInt16(18, value, true);
  }

  public get _bf(): __sbuf {
    return __sbuf.fromPointer((this.$address + 24) as Pointer);
  }

  // ─── _lbfsize (offset 32, int) ───
  public get _lbfsize(): number {
    return this.$view.getInt32(32, true);
  }
  public set _lbfsize(value: number) {
    this.$view.setInt32(32, value, true);
  }

  // ─── _cookie (offset 40, void) ───
  public get _cookie(): Pointer {
    return Number(this.$view.getBigInt64(40, true)) as Pointer;
  }
  public set _cookie(value: Pointer) {
    this.$view.setBigInt64(40, BigInt(value), true);
  }

  public get _close(): Pointer {
    return (this.$address + 48) as unknown as Pointer;
  }

  public get _read(): Pointer {
    return (this.$address + 56) as unknown as Pointer;
  }

  public get _seek(): Pointer {
    return (this.$address + 64) as unknown as Pointer;
  }

  public get _write(): Pointer {
    return (this.$address + 72) as unknown as Pointer;
  }

  public get _ub(): __sbuf {
    return __sbuf.fromPointer((this.$address + 80) as Pointer);
  }

  // ─── _extra (offset 88, struct __sFILEX) ───
  public get _extra(): Pointer {
    return Number(this.$view.getBigInt64(88, true)) as Pointer;
  }
  public set _extra(value: Pointer) {
    this.$view.setBigInt64(88, BigInt(value), true);
  }

  // ─── _ur (offset 96, int) ───
  public get _ur(): number {
    return this.$view.getInt32(96, true);
  }
  public set _ur(value: number) {
    this.$view.setInt32(96, value, true);
  }

  public get _ubuf(): Pointer {
    return (this.$address + 102) as unknown as Pointer;
  }

  public get _nbuf(): Pointer {
    return (this.$address + 105) as unknown as Pointer;
  }

  public get _lb(): __sbuf {
    return __sbuf.fromPointer((this.$address + 112) as Pointer);
  }

  // ─── _blksize (offset 120, int) ───
  public get _blksize(): number {
    return this.$view.getInt32(120, true);
  }
  public set _blksize(value: number) {
    this.$view.setInt32(120, value, true);
  }

  // ─── _offset (offset 128, long long) ───
  public get _offset(): bigint {
    return this.$view.getBigInt64(128, true);
  }
  public set _offset(value: bigint) {
    this.$view.setBigInt64(128, value, true);
  }
}

export class sigval extends BaseStruct {
  public static override readonly BYTE_SIZE = 8;

  // ─── sival_int (offset 0, int) ───
  public get sival_int(): number {
    return this.$view.getInt32(0, true);
  }
  public set sival_int(value: number) {
    this.$view.setInt32(0, value, true);
  }

  // ─── sival_ptr (offset 0, void) ───
  public get sival_ptr(): Pointer {
    return Number(this.$view.getBigInt64(0, true)) as Pointer;
  }
  public set sival_ptr(value: Pointer) {
    this.$view.setBigInt64(0, BigInt(value), true);
  }
}

export class sigevent extends BaseStruct {
  public static override readonly BYTE_SIZE = 32;

  // ─── sigev_notify (offset 0, int) ───
  public get sigev_notify(): number {
    return this.$view.getInt32(0, true);
  }
  public set sigev_notify(value: number) {
    this.$view.setInt32(0, value, true);
  }

  // ─── sigev_signo (offset 4, int) ───
  public get sigev_signo(): number {
    return this.$view.getInt32(4, true);
  }
  public set sigev_signo(value: number) {
    this.$view.setInt32(4, value, true);
  }

  public get sigev_value(): sigval {
    return sigval.fromPointer((this.$address + 8) as Pointer);
  }

  public get sigev_notify_function(): Pointer {
    return (this.$address + 16) as unknown as Pointer;
  }

  // ─── sigev_notify_attributes (offset 24, pthread_attr_t) ───
  public get sigev_notify_attributes(): Pointer {
    return Number(this.$view.getBigInt64(24, true)) as Pointer;
  }
  public set sigev_notify_attributes(value: Pointer) {
    this.$view.setBigInt64(24, BigInt(value), true);
  }
}

export class __siginfo extends BaseStruct {
  public static override readonly BYTE_SIZE = 80;

  // ─── si_signo (offset 0, int) ───
  public get si_signo(): number {
    return this.$view.getInt32(0, true);
  }
  public set si_signo(value: number) {
    this.$view.setInt32(0, value, true);
  }

  // ─── si_errno (offset 4, int) ───
  public get si_errno(): number {
    return this.$view.getInt32(4, true);
  }
  public set si_errno(value: number) {
    this.$view.setInt32(4, value, true);
  }

  // ─── si_code (offset 8, int) ───
  public get si_code(): number {
    return this.$view.getInt32(8, true);
  }
  public set si_code(value: number) {
    this.$view.setInt32(8, value, true);
  }

  // ─── si_pid (offset 12, int) ───
  public get si_pid(): number {
    return this.$view.getInt32(12, true);
  }
  public set si_pid(value: number) {
    this.$view.setInt32(12, value, true);
  }

  // ─── si_uid (offset 16, unsigned int) ───
  public get si_uid(): number {
    return this.$view.getUint32(16, true);
  }
  public set si_uid(value: number) {
    this.$view.setUint32(16, value, true);
  }

  // ─── si_status (offset 20, int) ───
  public get si_status(): number {
    return this.$view.getInt32(20, true);
  }
  public set si_status(value: number) {
    this.$view.setInt32(20, value, true);
  }

  // ─── si_addr (offset 24, void) ───
  public get si_addr(): Pointer {
    return Number(this.$view.getBigInt64(24, true)) as Pointer;
  }
  public set si_addr(value: Pointer) {
    this.$view.setBigInt64(24, BigInt(value), true);
  }

  public get si_value(): sigval {
    return sigval.fromPointer((this.$address + 32) as Pointer);
  }

  // ─── si_band (offset 40, long) ───
  public get si_band(): number {
    return this.$view.getInt32(40, true);
  }
  public set si_band(value: number) {
    this.$view.setInt32(40, value, true);
  }

  public get __pad(): Pointer {
    return (this.$address + 48) as unknown as Pointer;
  }
}

export class __sigaction_u extends BaseStruct {
  public static override readonly BYTE_SIZE = 8;

  public get __sa_handler(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  public get __sa_sigaction(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }
}

export class __sigaction extends BaseStruct {
  public static override readonly BYTE_SIZE = 24;

  public get __sigaction_u(): __sigaction_u {
    return __sigaction_u.fromPointer((this.$address + 0) as Pointer);
  }

  public get sa_tramp(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }

  // ─── sa_mask (offset 16, unsigned int) ───
  public get sa_mask(): number {
    return this.$view.getUint32(16, true);
  }
  public set sa_mask(value: number) {
    this.$view.setUint32(16, value, true);
  }

  // ─── sa_flags (offset 20, int) ───
  public get sa_flags(): number {
    return this.$view.getInt32(20, true);
  }
  public set sa_flags(value: number) {
    this.$view.setInt32(20, value, true);
  }
}

export class sigaction extends BaseStruct {
  public static override readonly BYTE_SIZE = 16;

  public get __sigaction_u(): __sigaction_u {
    return __sigaction_u.fromPointer((this.$address + 0) as Pointer);
  }

  // ─── sa_mask (offset 8, unsigned int) ───
  public get sa_mask(): number {
    return this.$view.getUint32(8, true);
  }
  public set sa_mask(value: number) {
    this.$view.setUint32(8, value, true);
  }

  // ─── sa_flags (offset 12, int) ───
  public get sa_flags(): number {
    return this.$view.getInt32(12, true);
  }
  public set sa_flags(value: number) {
    this.$view.setInt32(12, value, true);
  }
}

export class sigvec extends BaseStruct {
  public static override readonly BYTE_SIZE = 16;

  public get sv_handler(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── sv_mask (offset 8, int) ───
  public get sv_mask(): number {
    return this.$view.getInt32(8, true);
  }
  public set sv_mask(value: number) {
    this.$view.setInt32(8, value, true);
  }

  // ─── sv_flags (offset 12, int) ───
  public get sv_flags(): number {
    return this.$view.getInt32(12, true);
  }
  public set sv_flags(value: number) {
    this.$view.setInt32(12, value, true);
  }
}

export class sigstack extends BaseStruct {
  public static override readonly BYTE_SIZE = 16;

  // ─── ss_sp (offset 0, char) ───
  public get ss_sp(): Pointer {
    return Number(this.$view.getBigInt64(0, true)) as Pointer;
  }
  public set ss_sp(value: Pointer) {
    this.$view.setBigInt64(0, BigInt(value), true);
  }

  // ─── ss_onstack (offset 8, int) ───
  public get ss_onstack(): number {
    return this.$view.getInt32(8, true);
  }
  public set ss_onstack(value: number) {
    this.$view.setInt32(8, value, true);
  }
}

export class rusage extends BaseStruct {
  public static override readonly BYTE_SIZE = 72;

  public get ru_utime(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  public get ru_stime(): Pointer {
    return (this.$address + 8) as unknown as Pointer;
  }

  // ─── ru_maxrss (offset 16, long) ───
  public get ru_maxrss(): number {
    return this.$view.getInt32(16, true);
  }
  public set ru_maxrss(value: number) {
    this.$view.setInt32(16, value, true);
  }

  // ─── ru_ixrss (offset 20, long) ───
  public get ru_ixrss(): number {
    return this.$view.getInt32(20, true);
  }
  public set ru_ixrss(value: number) {
    this.$view.setInt32(20, value, true);
  }

  // ─── ru_idrss (offset 24, long) ───
  public get ru_idrss(): number {
    return this.$view.getInt32(24, true);
  }
  public set ru_idrss(value: number) {
    this.$view.setInt32(24, value, true);
  }

  // ─── ru_isrss (offset 28, long) ───
  public get ru_isrss(): number {
    return this.$view.getInt32(28, true);
  }
  public set ru_isrss(value: number) {
    this.$view.setInt32(28, value, true);
  }

  // ─── ru_minflt (offset 32, long) ───
  public get ru_minflt(): number {
    return this.$view.getInt32(32, true);
  }
  public set ru_minflt(value: number) {
    this.$view.setInt32(32, value, true);
  }

  // ─── ru_majflt (offset 36, long) ───
  public get ru_majflt(): number {
    return this.$view.getInt32(36, true);
  }
  public set ru_majflt(value: number) {
    this.$view.setInt32(36, value, true);
  }

  // ─── ru_nswap (offset 40, long) ───
  public get ru_nswap(): number {
    return this.$view.getInt32(40, true);
  }
  public set ru_nswap(value: number) {
    this.$view.setInt32(40, value, true);
  }

  // ─── ru_inblock (offset 44, long) ───
  public get ru_inblock(): number {
    return this.$view.getInt32(44, true);
  }
  public set ru_inblock(value: number) {
    this.$view.setInt32(44, value, true);
  }

  // ─── ru_oublock (offset 48, long) ───
  public get ru_oublock(): number {
    return this.$view.getInt32(48, true);
  }
  public set ru_oublock(value: number) {
    this.$view.setInt32(48, value, true);
  }

  // ─── ru_msgsnd (offset 52, long) ───
  public get ru_msgsnd(): number {
    return this.$view.getInt32(52, true);
  }
  public set ru_msgsnd(value: number) {
    this.$view.setInt32(52, value, true);
  }

  // ─── ru_msgrcv (offset 56, long) ───
  public get ru_msgrcv(): number {
    return this.$view.getInt32(56, true);
  }
  public set ru_msgrcv(value: number) {
    this.$view.setInt32(56, value, true);
  }

  // ─── ru_nsignals (offset 60, long) ───
  public get ru_nsignals(): number {
    return this.$view.getInt32(60, true);
  }
  public set ru_nsignals(value: number) {
    this.$view.setInt32(60, value, true);
  }

  // ─── ru_nvcsw (offset 64, long) ───
  public get ru_nvcsw(): number {
    return this.$view.getInt32(64, true);
  }
  public set ru_nvcsw(value: number) {
    this.$view.setInt32(64, value, true);
  }

  // ─── ru_nivcsw (offset 68, long) ───
  public get ru_nivcsw(): number {
    return this.$view.getInt32(68, true);
  }
  public set ru_nivcsw(value: number) {
    this.$view.setInt32(68, value, true);
  }
}

export class rusage_info_v0 extends BaseStruct {
  public static override readonly BYTE_SIZE = 208;

  public get ri_uuid(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── ri_user_time (offset 128, unsigned long long) ───
  public get ri_user_time(): bigint {
    return this.$view.getBigUint64(128, true);
  }
  public set ri_user_time(value: bigint) {
    this.$view.setBigUint64(128, value, true);
  }

  // ─── ri_system_time (offset 136, unsigned long long) ───
  public get ri_system_time(): bigint {
    return this.$view.getBigUint64(136, true);
  }
  public set ri_system_time(value: bigint) {
    this.$view.setBigUint64(136, value, true);
  }

  // ─── ri_pkg_idle_wkups (offset 144, unsigned long long) ───
  public get ri_pkg_idle_wkups(): bigint {
    return this.$view.getBigUint64(144, true);
  }
  public set ri_pkg_idle_wkups(value: bigint) {
    this.$view.setBigUint64(144, value, true);
  }

  // ─── ri_interrupt_wkups (offset 152, unsigned long long) ───
  public get ri_interrupt_wkups(): bigint {
    return this.$view.getBigUint64(152, true);
  }
  public set ri_interrupt_wkups(value: bigint) {
    this.$view.setBigUint64(152, value, true);
  }

  // ─── ri_pageins (offset 160, unsigned long long) ───
  public get ri_pageins(): bigint {
    return this.$view.getBigUint64(160, true);
  }
  public set ri_pageins(value: bigint) {
    this.$view.setBigUint64(160, value, true);
  }

  // ─── ri_wired_size (offset 168, unsigned long long) ───
  public get ri_wired_size(): bigint {
    return this.$view.getBigUint64(168, true);
  }
  public set ri_wired_size(value: bigint) {
    this.$view.setBigUint64(168, value, true);
  }

  // ─── ri_resident_size (offset 176, unsigned long long) ───
  public get ri_resident_size(): bigint {
    return this.$view.getBigUint64(176, true);
  }
  public set ri_resident_size(value: bigint) {
    this.$view.setBigUint64(176, value, true);
  }

  // ─── ri_phys_footprint (offset 184, unsigned long long) ───
  public get ri_phys_footprint(): bigint {
    return this.$view.getBigUint64(184, true);
  }
  public set ri_phys_footprint(value: bigint) {
    this.$view.setBigUint64(184, value, true);
  }

  // ─── ri_proc_start_abstime (offset 192, unsigned long long) ───
  public get ri_proc_start_abstime(): bigint {
    return this.$view.getBigUint64(192, true);
  }
  public set ri_proc_start_abstime(value: bigint) {
    this.$view.setBigUint64(192, value, true);
  }

  // ─── ri_proc_exit_abstime (offset 200, unsigned long long) ───
  public get ri_proc_exit_abstime(): bigint {
    return this.$view.getBigUint64(200, true);
  }
  public set ri_proc_exit_abstime(value: bigint) {
    this.$view.setBigUint64(200, value, true);
  }
}

export class rusage_info_v1 extends BaseStruct {
  public static override readonly BYTE_SIZE = 256;

  public get ri_uuid(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── ri_user_time (offset 128, unsigned long long) ───
  public get ri_user_time(): bigint {
    return this.$view.getBigUint64(128, true);
  }
  public set ri_user_time(value: bigint) {
    this.$view.setBigUint64(128, value, true);
  }

  // ─── ri_system_time (offset 136, unsigned long long) ───
  public get ri_system_time(): bigint {
    return this.$view.getBigUint64(136, true);
  }
  public set ri_system_time(value: bigint) {
    this.$view.setBigUint64(136, value, true);
  }

  // ─── ri_pkg_idle_wkups (offset 144, unsigned long long) ───
  public get ri_pkg_idle_wkups(): bigint {
    return this.$view.getBigUint64(144, true);
  }
  public set ri_pkg_idle_wkups(value: bigint) {
    this.$view.setBigUint64(144, value, true);
  }

  // ─── ri_interrupt_wkups (offset 152, unsigned long long) ───
  public get ri_interrupt_wkups(): bigint {
    return this.$view.getBigUint64(152, true);
  }
  public set ri_interrupt_wkups(value: bigint) {
    this.$view.setBigUint64(152, value, true);
  }

  // ─── ri_pageins (offset 160, unsigned long long) ───
  public get ri_pageins(): bigint {
    return this.$view.getBigUint64(160, true);
  }
  public set ri_pageins(value: bigint) {
    this.$view.setBigUint64(160, value, true);
  }

  // ─── ri_wired_size (offset 168, unsigned long long) ───
  public get ri_wired_size(): bigint {
    return this.$view.getBigUint64(168, true);
  }
  public set ri_wired_size(value: bigint) {
    this.$view.setBigUint64(168, value, true);
  }

  // ─── ri_resident_size (offset 176, unsigned long long) ───
  public get ri_resident_size(): bigint {
    return this.$view.getBigUint64(176, true);
  }
  public set ri_resident_size(value: bigint) {
    this.$view.setBigUint64(176, value, true);
  }

  // ─── ri_phys_footprint (offset 184, unsigned long long) ───
  public get ri_phys_footprint(): bigint {
    return this.$view.getBigUint64(184, true);
  }
  public set ri_phys_footprint(value: bigint) {
    this.$view.setBigUint64(184, value, true);
  }

  // ─── ri_proc_start_abstime (offset 192, unsigned long long) ───
  public get ri_proc_start_abstime(): bigint {
    return this.$view.getBigUint64(192, true);
  }
  public set ri_proc_start_abstime(value: bigint) {
    this.$view.setBigUint64(192, value, true);
  }

  // ─── ri_proc_exit_abstime (offset 200, unsigned long long) ───
  public get ri_proc_exit_abstime(): bigint {
    return this.$view.getBigUint64(200, true);
  }
  public set ri_proc_exit_abstime(value: bigint) {
    this.$view.setBigUint64(200, value, true);
  }

  // ─── ri_child_user_time (offset 208, unsigned long long) ───
  public get ri_child_user_time(): bigint {
    return this.$view.getBigUint64(208, true);
  }
  public set ri_child_user_time(value: bigint) {
    this.$view.setBigUint64(208, value, true);
  }

  // ─── ri_child_system_time (offset 216, unsigned long long) ───
  public get ri_child_system_time(): bigint {
    return this.$view.getBigUint64(216, true);
  }
  public set ri_child_system_time(value: bigint) {
    this.$view.setBigUint64(216, value, true);
  }

  // ─── ri_child_pkg_idle_wkups (offset 224, unsigned long long) ───
  public get ri_child_pkg_idle_wkups(): bigint {
    return this.$view.getBigUint64(224, true);
  }
  public set ri_child_pkg_idle_wkups(value: bigint) {
    this.$view.setBigUint64(224, value, true);
  }

  // ─── ri_child_interrupt_wkups (offset 232, unsigned long long) ───
  public get ri_child_interrupt_wkups(): bigint {
    return this.$view.getBigUint64(232, true);
  }
  public set ri_child_interrupt_wkups(value: bigint) {
    this.$view.setBigUint64(232, value, true);
  }

  // ─── ri_child_pageins (offset 240, unsigned long long) ───
  public get ri_child_pageins(): bigint {
    return this.$view.getBigUint64(240, true);
  }
  public set ri_child_pageins(value: bigint) {
    this.$view.setBigUint64(240, value, true);
  }

  // ─── ri_child_elapsed_abstime (offset 248, unsigned long long) ───
  public get ri_child_elapsed_abstime(): bigint {
    return this.$view.getBigUint64(248, true);
  }
  public set ri_child_elapsed_abstime(value: bigint) {
    this.$view.setBigUint64(248, value, true);
  }
}

export class rusage_info_v2 extends BaseStruct {
  public static override readonly BYTE_SIZE = 272;

  public get ri_uuid(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── ri_user_time (offset 128, unsigned long long) ───
  public get ri_user_time(): bigint {
    return this.$view.getBigUint64(128, true);
  }
  public set ri_user_time(value: bigint) {
    this.$view.setBigUint64(128, value, true);
  }

  // ─── ri_system_time (offset 136, unsigned long long) ───
  public get ri_system_time(): bigint {
    return this.$view.getBigUint64(136, true);
  }
  public set ri_system_time(value: bigint) {
    this.$view.setBigUint64(136, value, true);
  }

  // ─── ri_pkg_idle_wkups (offset 144, unsigned long long) ───
  public get ri_pkg_idle_wkups(): bigint {
    return this.$view.getBigUint64(144, true);
  }
  public set ri_pkg_idle_wkups(value: bigint) {
    this.$view.setBigUint64(144, value, true);
  }

  // ─── ri_interrupt_wkups (offset 152, unsigned long long) ───
  public get ri_interrupt_wkups(): bigint {
    return this.$view.getBigUint64(152, true);
  }
  public set ri_interrupt_wkups(value: bigint) {
    this.$view.setBigUint64(152, value, true);
  }

  // ─── ri_pageins (offset 160, unsigned long long) ───
  public get ri_pageins(): bigint {
    return this.$view.getBigUint64(160, true);
  }
  public set ri_pageins(value: bigint) {
    this.$view.setBigUint64(160, value, true);
  }

  // ─── ri_wired_size (offset 168, unsigned long long) ───
  public get ri_wired_size(): bigint {
    return this.$view.getBigUint64(168, true);
  }
  public set ri_wired_size(value: bigint) {
    this.$view.setBigUint64(168, value, true);
  }

  // ─── ri_resident_size (offset 176, unsigned long long) ───
  public get ri_resident_size(): bigint {
    return this.$view.getBigUint64(176, true);
  }
  public set ri_resident_size(value: bigint) {
    this.$view.setBigUint64(176, value, true);
  }

  // ─── ri_phys_footprint (offset 184, unsigned long long) ───
  public get ri_phys_footprint(): bigint {
    return this.$view.getBigUint64(184, true);
  }
  public set ri_phys_footprint(value: bigint) {
    this.$view.setBigUint64(184, value, true);
  }

  // ─── ri_proc_start_abstime (offset 192, unsigned long long) ───
  public get ri_proc_start_abstime(): bigint {
    return this.$view.getBigUint64(192, true);
  }
  public set ri_proc_start_abstime(value: bigint) {
    this.$view.setBigUint64(192, value, true);
  }

  // ─── ri_proc_exit_abstime (offset 200, unsigned long long) ───
  public get ri_proc_exit_abstime(): bigint {
    return this.$view.getBigUint64(200, true);
  }
  public set ri_proc_exit_abstime(value: bigint) {
    this.$view.setBigUint64(200, value, true);
  }

  // ─── ri_child_user_time (offset 208, unsigned long long) ───
  public get ri_child_user_time(): bigint {
    return this.$view.getBigUint64(208, true);
  }
  public set ri_child_user_time(value: bigint) {
    this.$view.setBigUint64(208, value, true);
  }

  // ─── ri_child_system_time (offset 216, unsigned long long) ───
  public get ri_child_system_time(): bigint {
    return this.$view.getBigUint64(216, true);
  }
  public set ri_child_system_time(value: bigint) {
    this.$view.setBigUint64(216, value, true);
  }

  // ─── ri_child_pkg_idle_wkups (offset 224, unsigned long long) ───
  public get ri_child_pkg_idle_wkups(): bigint {
    return this.$view.getBigUint64(224, true);
  }
  public set ri_child_pkg_idle_wkups(value: bigint) {
    this.$view.setBigUint64(224, value, true);
  }

  // ─── ri_child_interrupt_wkups (offset 232, unsigned long long) ───
  public get ri_child_interrupt_wkups(): bigint {
    return this.$view.getBigUint64(232, true);
  }
  public set ri_child_interrupt_wkups(value: bigint) {
    this.$view.setBigUint64(232, value, true);
  }

  // ─── ri_child_pageins (offset 240, unsigned long long) ───
  public get ri_child_pageins(): bigint {
    return this.$view.getBigUint64(240, true);
  }
  public set ri_child_pageins(value: bigint) {
    this.$view.setBigUint64(240, value, true);
  }

  // ─── ri_child_elapsed_abstime (offset 248, unsigned long long) ───
  public get ri_child_elapsed_abstime(): bigint {
    return this.$view.getBigUint64(248, true);
  }
  public set ri_child_elapsed_abstime(value: bigint) {
    this.$view.setBigUint64(248, value, true);
  }

  // ─── ri_diskio_bytesread (offset 256, unsigned long long) ───
  public get ri_diskio_bytesread(): bigint {
    return this.$view.getBigUint64(256, true);
  }
  public set ri_diskio_bytesread(value: bigint) {
    this.$view.setBigUint64(256, value, true);
  }

  // ─── ri_diskio_byteswritten (offset 264, unsigned long long) ───
  public get ri_diskio_byteswritten(): bigint {
    return this.$view.getBigUint64(264, true);
  }
  public set ri_diskio_byteswritten(value: bigint) {
    this.$view.setBigUint64(264, value, true);
  }
}

export class rusage_info_v3 extends BaseStruct {
  public static override readonly BYTE_SIZE = 344;

  public get ri_uuid(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── ri_user_time (offset 128, unsigned long long) ───
  public get ri_user_time(): bigint {
    return this.$view.getBigUint64(128, true);
  }
  public set ri_user_time(value: bigint) {
    this.$view.setBigUint64(128, value, true);
  }

  // ─── ri_system_time (offset 136, unsigned long long) ───
  public get ri_system_time(): bigint {
    return this.$view.getBigUint64(136, true);
  }
  public set ri_system_time(value: bigint) {
    this.$view.setBigUint64(136, value, true);
  }

  // ─── ri_pkg_idle_wkups (offset 144, unsigned long long) ───
  public get ri_pkg_idle_wkups(): bigint {
    return this.$view.getBigUint64(144, true);
  }
  public set ri_pkg_idle_wkups(value: bigint) {
    this.$view.setBigUint64(144, value, true);
  }

  // ─── ri_interrupt_wkups (offset 152, unsigned long long) ───
  public get ri_interrupt_wkups(): bigint {
    return this.$view.getBigUint64(152, true);
  }
  public set ri_interrupt_wkups(value: bigint) {
    this.$view.setBigUint64(152, value, true);
  }

  // ─── ri_pageins (offset 160, unsigned long long) ───
  public get ri_pageins(): bigint {
    return this.$view.getBigUint64(160, true);
  }
  public set ri_pageins(value: bigint) {
    this.$view.setBigUint64(160, value, true);
  }

  // ─── ri_wired_size (offset 168, unsigned long long) ───
  public get ri_wired_size(): bigint {
    return this.$view.getBigUint64(168, true);
  }
  public set ri_wired_size(value: bigint) {
    this.$view.setBigUint64(168, value, true);
  }

  // ─── ri_resident_size (offset 176, unsigned long long) ───
  public get ri_resident_size(): bigint {
    return this.$view.getBigUint64(176, true);
  }
  public set ri_resident_size(value: bigint) {
    this.$view.setBigUint64(176, value, true);
  }

  // ─── ri_phys_footprint (offset 184, unsigned long long) ───
  public get ri_phys_footprint(): bigint {
    return this.$view.getBigUint64(184, true);
  }
  public set ri_phys_footprint(value: bigint) {
    this.$view.setBigUint64(184, value, true);
  }

  // ─── ri_proc_start_abstime (offset 192, unsigned long long) ───
  public get ri_proc_start_abstime(): bigint {
    return this.$view.getBigUint64(192, true);
  }
  public set ri_proc_start_abstime(value: bigint) {
    this.$view.setBigUint64(192, value, true);
  }

  // ─── ri_proc_exit_abstime (offset 200, unsigned long long) ───
  public get ri_proc_exit_abstime(): bigint {
    return this.$view.getBigUint64(200, true);
  }
  public set ri_proc_exit_abstime(value: bigint) {
    this.$view.setBigUint64(200, value, true);
  }

  // ─── ri_child_user_time (offset 208, unsigned long long) ───
  public get ri_child_user_time(): bigint {
    return this.$view.getBigUint64(208, true);
  }
  public set ri_child_user_time(value: bigint) {
    this.$view.setBigUint64(208, value, true);
  }

  // ─── ri_child_system_time (offset 216, unsigned long long) ───
  public get ri_child_system_time(): bigint {
    return this.$view.getBigUint64(216, true);
  }
  public set ri_child_system_time(value: bigint) {
    this.$view.setBigUint64(216, value, true);
  }

  // ─── ri_child_pkg_idle_wkups (offset 224, unsigned long long) ───
  public get ri_child_pkg_idle_wkups(): bigint {
    return this.$view.getBigUint64(224, true);
  }
  public set ri_child_pkg_idle_wkups(value: bigint) {
    this.$view.setBigUint64(224, value, true);
  }

  // ─── ri_child_interrupt_wkups (offset 232, unsigned long long) ───
  public get ri_child_interrupt_wkups(): bigint {
    return this.$view.getBigUint64(232, true);
  }
  public set ri_child_interrupt_wkups(value: bigint) {
    this.$view.setBigUint64(232, value, true);
  }

  // ─── ri_child_pageins (offset 240, unsigned long long) ───
  public get ri_child_pageins(): bigint {
    return this.$view.getBigUint64(240, true);
  }
  public set ri_child_pageins(value: bigint) {
    this.$view.setBigUint64(240, value, true);
  }

  // ─── ri_child_elapsed_abstime (offset 248, unsigned long long) ───
  public get ri_child_elapsed_abstime(): bigint {
    return this.$view.getBigUint64(248, true);
  }
  public set ri_child_elapsed_abstime(value: bigint) {
    this.$view.setBigUint64(248, value, true);
  }

  // ─── ri_diskio_bytesread (offset 256, unsigned long long) ───
  public get ri_diskio_bytesread(): bigint {
    return this.$view.getBigUint64(256, true);
  }
  public set ri_diskio_bytesread(value: bigint) {
    this.$view.setBigUint64(256, value, true);
  }

  // ─── ri_diskio_byteswritten (offset 264, unsigned long long) ───
  public get ri_diskio_byteswritten(): bigint {
    return this.$view.getBigUint64(264, true);
  }
  public set ri_diskio_byteswritten(value: bigint) {
    this.$view.setBigUint64(264, value, true);
  }

  // ─── ri_cpu_time_qos_default (offset 272, unsigned long long) ───
  public get ri_cpu_time_qos_default(): bigint {
    return this.$view.getBigUint64(272, true);
  }
  public set ri_cpu_time_qos_default(value: bigint) {
    this.$view.setBigUint64(272, value, true);
  }

  // ─── ri_cpu_time_qos_maintenance (offset 280, unsigned long long) ───
  public get ri_cpu_time_qos_maintenance(): bigint {
    return this.$view.getBigUint64(280, true);
  }
  public set ri_cpu_time_qos_maintenance(value: bigint) {
    this.$view.setBigUint64(280, value, true);
  }

  // ─── ri_cpu_time_qos_background (offset 288, unsigned long long) ───
  public get ri_cpu_time_qos_background(): bigint {
    return this.$view.getBigUint64(288, true);
  }
  public set ri_cpu_time_qos_background(value: bigint) {
    this.$view.setBigUint64(288, value, true);
  }

  // ─── ri_cpu_time_qos_utility (offset 296, unsigned long long) ───
  public get ri_cpu_time_qos_utility(): bigint {
    return this.$view.getBigUint64(296, true);
  }
  public set ri_cpu_time_qos_utility(value: bigint) {
    this.$view.setBigUint64(296, value, true);
  }

  // ─── ri_cpu_time_qos_legacy (offset 304, unsigned long long) ───
  public get ri_cpu_time_qos_legacy(): bigint {
    return this.$view.getBigUint64(304, true);
  }
  public set ri_cpu_time_qos_legacy(value: bigint) {
    this.$view.setBigUint64(304, value, true);
  }

  // ─── ri_cpu_time_qos_user_initiated (offset 312, unsigned long long) ───
  public get ri_cpu_time_qos_user_initiated(): bigint {
    return this.$view.getBigUint64(312, true);
  }
  public set ri_cpu_time_qos_user_initiated(value: bigint) {
    this.$view.setBigUint64(312, value, true);
  }

  // ─── ri_cpu_time_qos_user_interactive (offset 320, unsigned long long) ───
  public get ri_cpu_time_qos_user_interactive(): bigint {
    return this.$view.getBigUint64(320, true);
  }
  public set ri_cpu_time_qos_user_interactive(value: bigint) {
    this.$view.setBigUint64(320, value, true);
  }

  // ─── ri_billed_system_time (offset 328, unsigned long long) ───
  public get ri_billed_system_time(): bigint {
    return this.$view.getBigUint64(328, true);
  }
  public set ri_billed_system_time(value: bigint) {
    this.$view.setBigUint64(328, value, true);
  }

  // ─── ri_serviced_system_time (offset 336, unsigned long long) ───
  public get ri_serviced_system_time(): bigint {
    return this.$view.getBigUint64(336, true);
  }
  public set ri_serviced_system_time(value: bigint) {
    this.$view.setBigUint64(336, value, true);
  }
}

export class rusage_info_v4 extends BaseStruct {
  public static override readonly BYTE_SIZE = 408;

  public get ri_uuid(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── ri_user_time (offset 128, unsigned long long) ───
  public get ri_user_time(): bigint {
    return this.$view.getBigUint64(128, true);
  }
  public set ri_user_time(value: bigint) {
    this.$view.setBigUint64(128, value, true);
  }

  // ─── ri_system_time (offset 136, unsigned long long) ───
  public get ri_system_time(): bigint {
    return this.$view.getBigUint64(136, true);
  }
  public set ri_system_time(value: bigint) {
    this.$view.setBigUint64(136, value, true);
  }

  // ─── ri_pkg_idle_wkups (offset 144, unsigned long long) ───
  public get ri_pkg_idle_wkups(): bigint {
    return this.$view.getBigUint64(144, true);
  }
  public set ri_pkg_idle_wkups(value: bigint) {
    this.$view.setBigUint64(144, value, true);
  }

  // ─── ri_interrupt_wkups (offset 152, unsigned long long) ───
  public get ri_interrupt_wkups(): bigint {
    return this.$view.getBigUint64(152, true);
  }
  public set ri_interrupt_wkups(value: bigint) {
    this.$view.setBigUint64(152, value, true);
  }

  // ─── ri_pageins (offset 160, unsigned long long) ───
  public get ri_pageins(): bigint {
    return this.$view.getBigUint64(160, true);
  }
  public set ri_pageins(value: bigint) {
    this.$view.setBigUint64(160, value, true);
  }

  // ─── ri_wired_size (offset 168, unsigned long long) ───
  public get ri_wired_size(): bigint {
    return this.$view.getBigUint64(168, true);
  }
  public set ri_wired_size(value: bigint) {
    this.$view.setBigUint64(168, value, true);
  }

  // ─── ri_resident_size (offset 176, unsigned long long) ───
  public get ri_resident_size(): bigint {
    return this.$view.getBigUint64(176, true);
  }
  public set ri_resident_size(value: bigint) {
    this.$view.setBigUint64(176, value, true);
  }

  // ─── ri_phys_footprint (offset 184, unsigned long long) ───
  public get ri_phys_footprint(): bigint {
    return this.$view.getBigUint64(184, true);
  }
  public set ri_phys_footprint(value: bigint) {
    this.$view.setBigUint64(184, value, true);
  }

  // ─── ri_proc_start_abstime (offset 192, unsigned long long) ───
  public get ri_proc_start_abstime(): bigint {
    return this.$view.getBigUint64(192, true);
  }
  public set ri_proc_start_abstime(value: bigint) {
    this.$view.setBigUint64(192, value, true);
  }

  // ─── ri_proc_exit_abstime (offset 200, unsigned long long) ───
  public get ri_proc_exit_abstime(): bigint {
    return this.$view.getBigUint64(200, true);
  }
  public set ri_proc_exit_abstime(value: bigint) {
    this.$view.setBigUint64(200, value, true);
  }

  // ─── ri_child_user_time (offset 208, unsigned long long) ───
  public get ri_child_user_time(): bigint {
    return this.$view.getBigUint64(208, true);
  }
  public set ri_child_user_time(value: bigint) {
    this.$view.setBigUint64(208, value, true);
  }

  // ─── ri_child_system_time (offset 216, unsigned long long) ───
  public get ri_child_system_time(): bigint {
    return this.$view.getBigUint64(216, true);
  }
  public set ri_child_system_time(value: bigint) {
    this.$view.setBigUint64(216, value, true);
  }

  // ─── ri_child_pkg_idle_wkups (offset 224, unsigned long long) ───
  public get ri_child_pkg_idle_wkups(): bigint {
    return this.$view.getBigUint64(224, true);
  }
  public set ri_child_pkg_idle_wkups(value: bigint) {
    this.$view.setBigUint64(224, value, true);
  }

  // ─── ri_child_interrupt_wkups (offset 232, unsigned long long) ───
  public get ri_child_interrupt_wkups(): bigint {
    return this.$view.getBigUint64(232, true);
  }
  public set ri_child_interrupt_wkups(value: bigint) {
    this.$view.setBigUint64(232, value, true);
  }

  // ─── ri_child_pageins (offset 240, unsigned long long) ───
  public get ri_child_pageins(): bigint {
    return this.$view.getBigUint64(240, true);
  }
  public set ri_child_pageins(value: bigint) {
    this.$view.setBigUint64(240, value, true);
  }

  // ─── ri_child_elapsed_abstime (offset 248, unsigned long long) ───
  public get ri_child_elapsed_abstime(): bigint {
    return this.$view.getBigUint64(248, true);
  }
  public set ri_child_elapsed_abstime(value: bigint) {
    this.$view.setBigUint64(248, value, true);
  }

  // ─── ri_diskio_bytesread (offset 256, unsigned long long) ───
  public get ri_diskio_bytesread(): bigint {
    return this.$view.getBigUint64(256, true);
  }
  public set ri_diskio_bytesread(value: bigint) {
    this.$view.setBigUint64(256, value, true);
  }

  // ─── ri_diskio_byteswritten (offset 264, unsigned long long) ───
  public get ri_diskio_byteswritten(): bigint {
    return this.$view.getBigUint64(264, true);
  }
  public set ri_diskio_byteswritten(value: bigint) {
    this.$view.setBigUint64(264, value, true);
  }

  // ─── ri_cpu_time_qos_default (offset 272, unsigned long long) ───
  public get ri_cpu_time_qos_default(): bigint {
    return this.$view.getBigUint64(272, true);
  }
  public set ri_cpu_time_qos_default(value: bigint) {
    this.$view.setBigUint64(272, value, true);
  }

  // ─── ri_cpu_time_qos_maintenance (offset 280, unsigned long long) ───
  public get ri_cpu_time_qos_maintenance(): bigint {
    return this.$view.getBigUint64(280, true);
  }
  public set ri_cpu_time_qos_maintenance(value: bigint) {
    this.$view.setBigUint64(280, value, true);
  }

  // ─── ri_cpu_time_qos_background (offset 288, unsigned long long) ───
  public get ri_cpu_time_qos_background(): bigint {
    return this.$view.getBigUint64(288, true);
  }
  public set ri_cpu_time_qos_background(value: bigint) {
    this.$view.setBigUint64(288, value, true);
  }

  // ─── ri_cpu_time_qos_utility (offset 296, unsigned long long) ───
  public get ri_cpu_time_qos_utility(): bigint {
    return this.$view.getBigUint64(296, true);
  }
  public set ri_cpu_time_qos_utility(value: bigint) {
    this.$view.setBigUint64(296, value, true);
  }

  // ─── ri_cpu_time_qos_legacy (offset 304, unsigned long long) ───
  public get ri_cpu_time_qos_legacy(): bigint {
    return this.$view.getBigUint64(304, true);
  }
  public set ri_cpu_time_qos_legacy(value: bigint) {
    this.$view.setBigUint64(304, value, true);
  }

  // ─── ri_cpu_time_qos_user_initiated (offset 312, unsigned long long) ───
  public get ri_cpu_time_qos_user_initiated(): bigint {
    return this.$view.getBigUint64(312, true);
  }
  public set ri_cpu_time_qos_user_initiated(value: bigint) {
    this.$view.setBigUint64(312, value, true);
  }

  // ─── ri_cpu_time_qos_user_interactive (offset 320, unsigned long long) ───
  public get ri_cpu_time_qos_user_interactive(): bigint {
    return this.$view.getBigUint64(320, true);
  }
  public set ri_cpu_time_qos_user_interactive(value: bigint) {
    this.$view.setBigUint64(320, value, true);
  }

  // ─── ri_billed_system_time (offset 328, unsigned long long) ───
  public get ri_billed_system_time(): bigint {
    return this.$view.getBigUint64(328, true);
  }
  public set ri_billed_system_time(value: bigint) {
    this.$view.setBigUint64(328, value, true);
  }

  // ─── ri_serviced_system_time (offset 336, unsigned long long) ───
  public get ri_serviced_system_time(): bigint {
    return this.$view.getBigUint64(336, true);
  }
  public set ri_serviced_system_time(value: bigint) {
    this.$view.setBigUint64(336, value, true);
  }

  // ─── ri_logical_writes (offset 344, unsigned long long) ───
  public get ri_logical_writes(): bigint {
    return this.$view.getBigUint64(344, true);
  }
  public set ri_logical_writes(value: bigint) {
    this.$view.setBigUint64(344, value, true);
  }

  // ─── ri_lifetime_max_phys_footprint (offset 352, unsigned long long) ───
  public get ri_lifetime_max_phys_footprint(): bigint {
    return this.$view.getBigUint64(352, true);
  }
  public set ri_lifetime_max_phys_footprint(value: bigint) {
    this.$view.setBigUint64(352, value, true);
  }

  // ─── ri_instructions (offset 360, unsigned long long) ───
  public get ri_instructions(): bigint {
    return this.$view.getBigUint64(360, true);
  }
  public set ri_instructions(value: bigint) {
    this.$view.setBigUint64(360, value, true);
  }

  // ─── ri_cycles (offset 368, unsigned long long) ───
  public get ri_cycles(): bigint {
    return this.$view.getBigUint64(368, true);
  }
  public set ri_cycles(value: bigint) {
    this.$view.setBigUint64(368, value, true);
  }

  // ─── ri_billed_energy (offset 376, unsigned long long) ───
  public get ri_billed_energy(): bigint {
    return this.$view.getBigUint64(376, true);
  }
  public set ri_billed_energy(value: bigint) {
    this.$view.setBigUint64(376, value, true);
  }

  // ─── ri_serviced_energy (offset 384, unsigned long long) ───
  public get ri_serviced_energy(): bigint {
    return this.$view.getBigUint64(384, true);
  }
  public set ri_serviced_energy(value: bigint) {
    this.$view.setBigUint64(384, value, true);
  }

  // ─── ri_interval_max_phys_footprint (offset 392, unsigned long long) ───
  public get ri_interval_max_phys_footprint(): bigint {
    return this.$view.getBigUint64(392, true);
  }
  public set ri_interval_max_phys_footprint(value: bigint) {
    this.$view.setBigUint64(392, value, true);
  }

  // ─── ri_runnable_time (offset 400, unsigned long long) ───
  public get ri_runnable_time(): bigint {
    return this.$view.getBigUint64(400, true);
  }
  public set ri_runnable_time(value: bigint) {
    this.$view.setBigUint64(400, value, true);
  }
}

export class rusage_info_v5 extends BaseStruct {
  public static override readonly BYTE_SIZE = 416;

  public get ri_uuid(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── ri_user_time (offset 128, unsigned long long) ───
  public get ri_user_time(): bigint {
    return this.$view.getBigUint64(128, true);
  }
  public set ri_user_time(value: bigint) {
    this.$view.setBigUint64(128, value, true);
  }

  // ─── ri_system_time (offset 136, unsigned long long) ───
  public get ri_system_time(): bigint {
    return this.$view.getBigUint64(136, true);
  }
  public set ri_system_time(value: bigint) {
    this.$view.setBigUint64(136, value, true);
  }

  // ─── ri_pkg_idle_wkups (offset 144, unsigned long long) ───
  public get ri_pkg_idle_wkups(): bigint {
    return this.$view.getBigUint64(144, true);
  }
  public set ri_pkg_idle_wkups(value: bigint) {
    this.$view.setBigUint64(144, value, true);
  }

  // ─── ri_interrupt_wkups (offset 152, unsigned long long) ───
  public get ri_interrupt_wkups(): bigint {
    return this.$view.getBigUint64(152, true);
  }
  public set ri_interrupt_wkups(value: bigint) {
    this.$view.setBigUint64(152, value, true);
  }

  // ─── ri_pageins (offset 160, unsigned long long) ───
  public get ri_pageins(): bigint {
    return this.$view.getBigUint64(160, true);
  }
  public set ri_pageins(value: bigint) {
    this.$view.setBigUint64(160, value, true);
  }

  // ─── ri_wired_size (offset 168, unsigned long long) ───
  public get ri_wired_size(): bigint {
    return this.$view.getBigUint64(168, true);
  }
  public set ri_wired_size(value: bigint) {
    this.$view.setBigUint64(168, value, true);
  }

  // ─── ri_resident_size (offset 176, unsigned long long) ───
  public get ri_resident_size(): bigint {
    return this.$view.getBigUint64(176, true);
  }
  public set ri_resident_size(value: bigint) {
    this.$view.setBigUint64(176, value, true);
  }

  // ─── ri_phys_footprint (offset 184, unsigned long long) ───
  public get ri_phys_footprint(): bigint {
    return this.$view.getBigUint64(184, true);
  }
  public set ri_phys_footprint(value: bigint) {
    this.$view.setBigUint64(184, value, true);
  }

  // ─── ri_proc_start_abstime (offset 192, unsigned long long) ───
  public get ri_proc_start_abstime(): bigint {
    return this.$view.getBigUint64(192, true);
  }
  public set ri_proc_start_abstime(value: bigint) {
    this.$view.setBigUint64(192, value, true);
  }

  // ─── ri_proc_exit_abstime (offset 200, unsigned long long) ───
  public get ri_proc_exit_abstime(): bigint {
    return this.$view.getBigUint64(200, true);
  }
  public set ri_proc_exit_abstime(value: bigint) {
    this.$view.setBigUint64(200, value, true);
  }

  // ─── ri_child_user_time (offset 208, unsigned long long) ───
  public get ri_child_user_time(): bigint {
    return this.$view.getBigUint64(208, true);
  }
  public set ri_child_user_time(value: bigint) {
    this.$view.setBigUint64(208, value, true);
  }

  // ─── ri_child_system_time (offset 216, unsigned long long) ───
  public get ri_child_system_time(): bigint {
    return this.$view.getBigUint64(216, true);
  }
  public set ri_child_system_time(value: bigint) {
    this.$view.setBigUint64(216, value, true);
  }

  // ─── ri_child_pkg_idle_wkups (offset 224, unsigned long long) ───
  public get ri_child_pkg_idle_wkups(): bigint {
    return this.$view.getBigUint64(224, true);
  }
  public set ri_child_pkg_idle_wkups(value: bigint) {
    this.$view.setBigUint64(224, value, true);
  }

  // ─── ri_child_interrupt_wkups (offset 232, unsigned long long) ───
  public get ri_child_interrupt_wkups(): bigint {
    return this.$view.getBigUint64(232, true);
  }
  public set ri_child_interrupt_wkups(value: bigint) {
    this.$view.setBigUint64(232, value, true);
  }

  // ─── ri_child_pageins (offset 240, unsigned long long) ───
  public get ri_child_pageins(): bigint {
    return this.$view.getBigUint64(240, true);
  }
  public set ri_child_pageins(value: bigint) {
    this.$view.setBigUint64(240, value, true);
  }

  // ─── ri_child_elapsed_abstime (offset 248, unsigned long long) ───
  public get ri_child_elapsed_abstime(): bigint {
    return this.$view.getBigUint64(248, true);
  }
  public set ri_child_elapsed_abstime(value: bigint) {
    this.$view.setBigUint64(248, value, true);
  }

  // ─── ri_diskio_bytesread (offset 256, unsigned long long) ───
  public get ri_diskio_bytesread(): bigint {
    return this.$view.getBigUint64(256, true);
  }
  public set ri_diskio_bytesread(value: bigint) {
    this.$view.setBigUint64(256, value, true);
  }

  // ─── ri_diskio_byteswritten (offset 264, unsigned long long) ───
  public get ri_diskio_byteswritten(): bigint {
    return this.$view.getBigUint64(264, true);
  }
  public set ri_diskio_byteswritten(value: bigint) {
    this.$view.setBigUint64(264, value, true);
  }

  // ─── ri_cpu_time_qos_default (offset 272, unsigned long long) ───
  public get ri_cpu_time_qos_default(): bigint {
    return this.$view.getBigUint64(272, true);
  }
  public set ri_cpu_time_qos_default(value: bigint) {
    this.$view.setBigUint64(272, value, true);
  }

  // ─── ri_cpu_time_qos_maintenance (offset 280, unsigned long long) ───
  public get ri_cpu_time_qos_maintenance(): bigint {
    return this.$view.getBigUint64(280, true);
  }
  public set ri_cpu_time_qos_maintenance(value: bigint) {
    this.$view.setBigUint64(280, value, true);
  }

  // ─── ri_cpu_time_qos_background (offset 288, unsigned long long) ───
  public get ri_cpu_time_qos_background(): bigint {
    return this.$view.getBigUint64(288, true);
  }
  public set ri_cpu_time_qos_background(value: bigint) {
    this.$view.setBigUint64(288, value, true);
  }

  // ─── ri_cpu_time_qos_utility (offset 296, unsigned long long) ───
  public get ri_cpu_time_qos_utility(): bigint {
    return this.$view.getBigUint64(296, true);
  }
  public set ri_cpu_time_qos_utility(value: bigint) {
    this.$view.setBigUint64(296, value, true);
  }

  // ─── ri_cpu_time_qos_legacy (offset 304, unsigned long long) ───
  public get ri_cpu_time_qos_legacy(): bigint {
    return this.$view.getBigUint64(304, true);
  }
  public set ri_cpu_time_qos_legacy(value: bigint) {
    this.$view.setBigUint64(304, value, true);
  }

  // ─── ri_cpu_time_qos_user_initiated (offset 312, unsigned long long) ───
  public get ri_cpu_time_qos_user_initiated(): bigint {
    return this.$view.getBigUint64(312, true);
  }
  public set ri_cpu_time_qos_user_initiated(value: bigint) {
    this.$view.setBigUint64(312, value, true);
  }

  // ─── ri_cpu_time_qos_user_interactive (offset 320, unsigned long long) ───
  public get ri_cpu_time_qos_user_interactive(): bigint {
    return this.$view.getBigUint64(320, true);
  }
  public set ri_cpu_time_qos_user_interactive(value: bigint) {
    this.$view.setBigUint64(320, value, true);
  }

  // ─── ri_billed_system_time (offset 328, unsigned long long) ───
  public get ri_billed_system_time(): bigint {
    return this.$view.getBigUint64(328, true);
  }
  public set ri_billed_system_time(value: bigint) {
    this.$view.setBigUint64(328, value, true);
  }

  // ─── ri_serviced_system_time (offset 336, unsigned long long) ───
  public get ri_serviced_system_time(): bigint {
    return this.$view.getBigUint64(336, true);
  }
  public set ri_serviced_system_time(value: bigint) {
    this.$view.setBigUint64(336, value, true);
  }

  // ─── ri_logical_writes (offset 344, unsigned long long) ───
  public get ri_logical_writes(): bigint {
    return this.$view.getBigUint64(344, true);
  }
  public set ri_logical_writes(value: bigint) {
    this.$view.setBigUint64(344, value, true);
  }

  // ─── ri_lifetime_max_phys_footprint (offset 352, unsigned long long) ───
  public get ri_lifetime_max_phys_footprint(): bigint {
    return this.$view.getBigUint64(352, true);
  }
  public set ri_lifetime_max_phys_footprint(value: bigint) {
    this.$view.setBigUint64(352, value, true);
  }

  // ─── ri_instructions (offset 360, unsigned long long) ───
  public get ri_instructions(): bigint {
    return this.$view.getBigUint64(360, true);
  }
  public set ri_instructions(value: bigint) {
    this.$view.setBigUint64(360, value, true);
  }

  // ─── ri_cycles (offset 368, unsigned long long) ───
  public get ri_cycles(): bigint {
    return this.$view.getBigUint64(368, true);
  }
  public set ri_cycles(value: bigint) {
    this.$view.setBigUint64(368, value, true);
  }

  // ─── ri_billed_energy (offset 376, unsigned long long) ───
  public get ri_billed_energy(): bigint {
    return this.$view.getBigUint64(376, true);
  }
  public set ri_billed_energy(value: bigint) {
    this.$view.setBigUint64(376, value, true);
  }

  // ─── ri_serviced_energy (offset 384, unsigned long long) ───
  public get ri_serviced_energy(): bigint {
    return this.$view.getBigUint64(384, true);
  }
  public set ri_serviced_energy(value: bigint) {
    this.$view.setBigUint64(384, value, true);
  }

  // ─── ri_interval_max_phys_footprint (offset 392, unsigned long long) ───
  public get ri_interval_max_phys_footprint(): bigint {
    return this.$view.getBigUint64(392, true);
  }
  public set ri_interval_max_phys_footprint(value: bigint) {
    this.$view.setBigUint64(392, value, true);
  }

  // ─── ri_runnable_time (offset 400, unsigned long long) ───
  public get ri_runnable_time(): bigint {
    return this.$view.getBigUint64(400, true);
  }
  public set ri_runnable_time(value: bigint) {
    this.$view.setBigUint64(400, value, true);
  }

  // ─── ri_flags (offset 408, unsigned long long) ───
  public get ri_flags(): bigint {
    return this.$view.getBigUint64(408, true);
  }
  public set ri_flags(value: bigint) {
    this.$view.setBigUint64(408, value, true);
  }
}

export class rusage_info_v6 extends BaseStruct {
  public static override readonly BYTE_SIZE = 576;

  public get ri_uuid(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  // ─── ri_user_time (offset 128, unsigned long long) ───
  public get ri_user_time(): bigint {
    return this.$view.getBigUint64(128, true);
  }
  public set ri_user_time(value: bigint) {
    this.$view.setBigUint64(128, value, true);
  }

  // ─── ri_system_time (offset 136, unsigned long long) ───
  public get ri_system_time(): bigint {
    return this.$view.getBigUint64(136, true);
  }
  public set ri_system_time(value: bigint) {
    this.$view.setBigUint64(136, value, true);
  }

  // ─── ri_pkg_idle_wkups (offset 144, unsigned long long) ───
  public get ri_pkg_idle_wkups(): bigint {
    return this.$view.getBigUint64(144, true);
  }
  public set ri_pkg_idle_wkups(value: bigint) {
    this.$view.setBigUint64(144, value, true);
  }

  // ─── ri_interrupt_wkups (offset 152, unsigned long long) ───
  public get ri_interrupt_wkups(): bigint {
    return this.$view.getBigUint64(152, true);
  }
  public set ri_interrupt_wkups(value: bigint) {
    this.$view.setBigUint64(152, value, true);
  }

  // ─── ri_pageins (offset 160, unsigned long long) ───
  public get ri_pageins(): bigint {
    return this.$view.getBigUint64(160, true);
  }
  public set ri_pageins(value: bigint) {
    this.$view.setBigUint64(160, value, true);
  }

  // ─── ri_wired_size (offset 168, unsigned long long) ───
  public get ri_wired_size(): bigint {
    return this.$view.getBigUint64(168, true);
  }
  public set ri_wired_size(value: bigint) {
    this.$view.setBigUint64(168, value, true);
  }

  // ─── ri_resident_size (offset 176, unsigned long long) ───
  public get ri_resident_size(): bigint {
    return this.$view.getBigUint64(176, true);
  }
  public set ri_resident_size(value: bigint) {
    this.$view.setBigUint64(176, value, true);
  }

  // ─── ri_phys_footprint (offset 184, unsigned long long) ───
  public get ri_phys_footprint(): bigint {
    return this.$view.getBigUint64(184, true);
  }
  public set ri_phys_footprint(value: bigint) {
    this.$view.setBigUint64(184, value, true);
  }

  // ─── ri_proc_start_abstime (offset 192, unsigned long long) ───
  public get ri_proc_start_abstime(): bigint {
    return this.$view.getBigUint64(192, true);
  }
  public set ri_proc_start_abstime(value: bigint) {
    this.$view.setBigUint64(192, value, true);
  }

  // ─── ri_proc_exit_abstime (offset 200, unsigned long long) ───
  public get ri_proc_exit_abstime(): bigint {
    return this.$view.getBigUint64(200, true);
  }
  public set ri_proc_exit_abstime(value: bigint) {
    this.$view.setBigUint64(200, value, true);
  }

  // ─── ri_child_user_time (offset 208, unsigned long long) ───
  public get ri_child_user_time(): bigint {
    return this.$view.getBigUint64(208, true);
  }
  public set ri_child_user_time(value: bigint) {
    this.$view.setBigUint64(208, value, true);
  }

  // ─── ri_child_system_time (offset 216, unsigned long long) ───
  public get ri_child_system_time(): bigint {
    return this.$view.getBigUint64(216, true);
  }
  public set ri_child_system_time(value: bigint) {
    this.$view.setBigUint64(216, value, true);
  }

  // ─── ri_child_pkg_idle_wkups (offset 224, unsigned long long) ───
  public get ri_child_pkg_idle_wkups(): bigint {
    return this.$view.getBigUint64(224, true);
  }
  public set ri_child_pkg_idle_wkups(value: bigint) {
    this.$view.setBigUint64(224, value, true);
  }

  // ─── ri_child_interrupt_wkups (offset 232, unsigned long long) ───
  public get ri_child_interrupt_wkups(): bigint {
    return this.$view.getBigUint64(232, true);
  }
  public set ri_child_interrupt_wkups(value: bigint) {
    this.$view.setBigUint64(232, value, true);
  }

  // ─── ri_child_pageins (offset 240, unsigned long long) ───
  public get ri_child_pageins(): bigint {
    return this.$view.getBigUint64(240, true);
  }
  public set ri_child_pageins(value: bigint) {
    this.$view.setBigUint64(240, value, true);
  }

  // ─── ri_child_elapsed_abstime (offset 248, unsigned long long) ───
  public get ri_child_elapsed_abstime(): bigint {
    return this.$view.getBigUint64(248, true);
  }
  public set ri_child_elapsed_abstime(value: bigint) {
    this.$view.setBigUint64(248, value, true);
  }

  // ─── ri_diskio_bytesread (offset 256, unsigned long long) ───
  public get ri_diskio_bytesread(): bigint {
    return this.$view.getBigUint64(256, true);
  }
  public set ri_diskio_bytesread(value: bigint) {
    this.$view.setBigUint64(256, value, true);
  }

  // ─── ri_diskio_byteswritten (offset 264, unsigned long long) ───
  public get ri_diskio_byteswritten(): bigint {
    return this.$view.getBigUint64(264, true);
  }
  public set ri_diskio_byteswritten(value: bigint) {
    this.$view.setBigUint64(264, value, true);
  }

  // ─── ri_cpu_time_qos_default (offset 272, unsigned long long) ───
  public get ri_cpu_time_qos_default(): bigint {
    return this.$view.getBigUint64(272, true);
  }
  public set ri_cpu_time_qos_default(value: bigint) {
    this.$view.setBigUint64(272, value, true);
  }

  // ─── ri_cpu_time_qos_maintenance (offset 280, unsigned long long) ───
  public get ri_cpu_time_qos_maintenance(): bigint {
    return this.$view.getBigUint64(280, true);
  }
  public set ri_cpu_time_qos_maintenance(value: bigint) {
    this.$view.setBigUint64(280, value, true);
  }

  // ─── ri_cpu_time_qos_background (offset 288, unsigned long long) ───
  public get ri_cpu_time_qos_background(): bigint {
    return this.$view.getBigUint64(288, true);
  }
  public set ri_cpu_time_qos_background(value: bigint) {
    this.$view.setBigUint64(288, value, true);
  }

  // ─── ri_cpu_time_qos_utility (offset 296, unsigned long long) ───
  public get ri_cpu_time_qos_utility(): bigint {
    return this.$view.getBigUint64(296, true);
  }
  public set ri_cpu_time_qos_utility(value: bigint) {
    this.$view.setBigUint64(296, value, true);
  }

  // ─── ri_cpu_time_qos_legacy (offset 304, unsigned long long) ───
  public get ri_cpu_time_qos_legacy(): bigint {
    return this.$view.getBigUint64(304, true);
  }
  public set ri_cpu_time_qos_legacy(value: bigint) {
    this.$view.setBigUint64(304, value, true);
  }

  // ─── ri_cpu_time_qos_user_initiated (offset 312, unsigned long long) ───
  public get ri_cpu_time_qos_user_initiated(): bigint {
    return this.$view.getBigUint64(312, true);
  }
  public set ri_cpu_time_qos_user_initiated(value: bigint) {
    this.$view.setBigUint64(312, value, true);
  }

  // ─── ri_cpu_time_qos_user_interactive (offset 320, unsigned long long) ───
  public get ri_cpu_time_qos_user_interactive(): bigint {
    return this.$view.getBigUint64(320, true);
  }
  public set ri_cpu_time_qos_user_interactive(value: bigint) {
    this.$view.setBigUint64(320, value, true);
  }

  // ─── ri_billed_system_time (offset 328, unsigned long long) ───
  public get ri_billed_system_time(): bigint {
    return this.$view.getBigUint64(328, true);
  }
  public set ri_billed_system_time(value: bigint) {
    this.$view.setBigUint64(328, value, true);
  }

  // ─── ri_serviced_system_time (offset 336, unsigned long long) ───
  public get ri_serviced_system_time(): bigint {
    return this.$view.getBigUint64(336, true);
  }
  public set ri_serviced_system_time(value: bigint) {
    this.$view.setBigUint64(336, value, true);
  }

  // ─── ri_logical_writes (offset 344, unsigned long long) ───
  public get ri_logical_writes(): bigint {
    return this.$view.getBigUint64(344, true);
  }
  public set ri_logical_writes(value: bigint) {
    this.$view.setBigUint64(344, value, true);
  }

  // ─── ri_lifetime_max_phys_footprint (offset 352, unsigned long long) ───
  public get ri_lifetime_max_phys_footprint(): bigint {
    return this.$view.getBigUint64(352, true);
  }
  public set ri_lifetime_max_phys_footprint(value: bigint) {
    this.$view.setBigUint64(352, value, true);
  }

  // ─── ri_instructions (offset 360, unsigned long long) ───
  public get ri_instructions(): bigint {
    return this.$view.getBigUint64(360, true);
  }
  public set ri_instructions(value: bigint) {
    this.$view.setBigUint64(360, value, true);
  }

  // ─── ri_cycles (offset 368, unsigned long long) ───
  public get ri_cycles(): bigint {
    return this.$view.getBigUint64(368, true);
  }
  public set ri_cycles(value: bigint) {
    this.$view.setBigUint64(368, value, true);
  }

  // ─── ri_billed_energy (offset 376, unsigned long long) ───
  public get ri_billed_energy(): bigint {
    return this.$view.getBigUint64(376, true);
  }
  public set ri_billed_energy(value: bigint) {
    this.$view.setBigUint64(376, value, true);
  }

  // ─── ri_serviced_energy (offset 384, unsigned long long) ───
  public get ri_serviced_energy(): bigint {
    return this.$view.getBigUint64(384, true);
  }
  public set ri_serviced_energy(value: bigint) {
    this.$view.setBigUint64(384, value, true);
  }

  // ─── ri_interval_max_phys_footprint (offset 392, unsigned long long) ───
  public get ri_interval_max_phys_footprint(): bigint {
    return this.$view.getBigUint64(392, true);
  }
  public set ri_interval_max_phys_footprint(value: bigint) {
    this.$view.setBigUint64(392, value, true);
  }

  // ─── ri_runnable_time (offset 400, unsigned long long) ───
  public get ri_runnable_time(): bigint {
    return this.$view.getBigUint64(400, true);
  }
  public set ri_runnable_time(value: bigint) {
    this.$view.setBigUint64(400, value, true);
  }

  // ─── ri_flags (offset 408, unsigned long long) ───
  public get ri_flags(): bigint {
    return this.$view.getBigUint64(408, true);
  }
  public set ri_flags(value: bigint) {
    this.$view.setBigUint64(408, value, true);
  }

  // ─── ri_user_ptime (offset 416, unsigned long long) ───
  public get ri_user_ptime(): bigint {
    return this.$view.getBigUint64(416, true);
  }
  public set ri_user_ptime(value: bigint) {
    this.$view.setBigUint64(416, value, true);
  }

  // ─── ri_system_ptime (offset 424, unsigned long long) ───
  public get ri_system_ptime(): bigint {
    return this.$view.getBigUint64(424, true);
  }
  public set ri_system_ptime(value: bigint) {
    this.$view.setBigUint64(424, value, true);
  }

  // ─── ri_pinstructions (offset 432, unsigned long long) ───
  public get ri_pinstructions(): bigint {
    return this.$view.getBigUint64(432, true);
  }
  public set ri_pinstructions(value: bigint) {
    this.$view.setBigUint64(432, value, true);
  }

  // ─── ri_pcycles (offset 440, unsigned long long) ───
  public get ri_pcycles(): bigint {
    return this.$view.getBigUint64(440, true);
  }
  public set ri_pcycles(value: bigint) {
    this.$view.setBigUint64(440, value, true);
  }

  // ─── ri_energy_nj (offset 448, unsigned long long) ───
  public get ri_energy_nj(): bigint {
    return this.$view.getBigUint64(448, true);
  }
  public set ri_energy_nj(value: bigint) {
    this.$view.setBigUint64(448, value, true);
  }

  // ─── ri_penergy_nj (offset 456, unsigned long long) ───
  public get ri_penergy_nj(): bigint {
    return this.$view.getBigUint64(456, true);
  }
  public set ri_penergy_nj(value: bigint) {
    this.$view.setBigUint64(456, value, true);
  }

  // ─── ri_secure_time_in_system (offset 464, unsigned long long) ───
  public get ri_secure_time_in_system(): bigint {
    return this.$view.getBigUint64(464, true);
  }
  public set ri_secure_time_in_system(value: bigint) {
    this.$view.setBigUint64(464, value, true);
  }

  // ─── ri_secure_ptime_in_system (offset 472, unsigned long long) ───
  public get ri_secure_ptime_in_system(): bigint {
    return this.$view.getBigUint64(472, true);
  }
  public set ri_secure_ptime_in_system(value: bigint) {
    this.$view.setBigUint64(472, value, true);
  }

  // ─── ri_neural_footprint (offset 480, unsigned long long) ───
  public get ri_neural_footprint(): bigint {
    return this.$view.getBigUint64(480, true);
  }
  public set ri_neural_footprint(value: bigint) {
    this.$view.setBigUint64(480, value, true);
  }

  // ─── ri_lifetime_max_neural_footprint (offset 488, unsigned long long) ───
  public get ri_lifetime_max_neural_footprint(): bigint {
    return this.$view.getBigUint64(488, true);
  }
  public set ri_lifetime_max_neural_footprint(value: bigint) {
    this.$view.setBigUint64(488, value, true);
  }

  // ─── ri_interval_max_neural_footprint (offset 496, unsigned long long) ───
  public get ri_interval_max_neural_footprint(): bigint {
    return this.$view.getBigUint64(496, true);
  }
  public set ri_interval_max_neural_footprint(value: bigint) {
    this.$view.setBigUint64(496, value, true);
  }

  public get ri_reserved(): Pointer {
    return (this.$address + 504) as unknown as Pointer;
  }
}

export class rlimit extends BaseStruct {
  public static override readonly BYTE_SIZE = 16;

  // ─── rlim_cur (offset 0, unsigned long long) ───
  public get rlim_cur(): bigint {
    return this.$view.getBigUint64(0, true);
  }
  public set rlim_cur(value: bigint) {
    this.$view.setBigUint64(0, value, true);
  }

  // ─── rlim_max (offset 8, unsigned long long) ───
  public get rlim_max(): bigint {
    return this.$view.getBigUint64(8, true);
  }
  public set rlim_max(value: bigint) {
    this.$view.setBigUint64(8, value, true);
  }
}

export class proc_rlimit_control_wakeupmon extends BaseStruct {
  public static override readonly BYTE_SIZE = 8;

  // ─── wm_flags (offset 0, unsigned int) ───
  public get wm_flags(): number {
    return this.$view.getUint32(0, true);
  }
  public set wm_flags(value: number) {
    this.$view.setUint32(0, value, true);
  }

  // ─── wm_rate (offset 4, int) ───
  public get wm_rate(): number {
    return this.$view.getInt32(4, true);
  }
  public set wm_rate(value: number) {
    this.$view.setInt32(4, value, true);
  }
}

export class wait extends BaseStruct {
  public static override readonly BYTE_SIZE = 8;

  // ─── w_status (offset 0, int) ───
  public get w_status(): number {
    return this.$view.getInt32(0, true);
  }
  public set w_status(value: number) {
    this.$view.setInt32(0, value, true);
  }

  public get w_T(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }

  public get w_S(): Pointer {
    return (this.$address + 0) as unknown as Pointer;
  }
}
