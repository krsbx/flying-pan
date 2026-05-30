import type { Pointer } from 'bun:ffi';

export type ptrdiff_t = number;

export type size_t = number;

export type wchar_t = number;

export type max_align_t = number;

export type int8_t = number;

export type int16_t = number;

export type int32_t = number;

export type int64_t = bigint;

export type uint8_t = number;

export type uint16_t = number;

export type uint32_t = number;

export type uint64_t = bigint;

export type int_least8_t = number;

export type int_least16_t = number;

export type int_least32_t = number;

export type int_least64_t = bigint;

export type uint_least8_t = number;

export type uint_least16_t = number;

export type uint_least32_t = number;

export type uint_least64_t = bigint;

export type int_fast8_t = number;

export type int_fast16_t = number;

export type int_fast32_t = number;

export type int_fast64_t = bigint;

export type uint_fast8_t = number;

export type uint_fast16_t = number;

export type uint_fast32_t = number;

export type uint_fast64_t = bigint;

export type __int8_t = number;

export type __uint8_t = number;

export type __int16_t = number;

export type __uint16_t = number;

export type __int32_t = number;

export type __uint32_t = number;

export type __int64_t = bigint;

export type __uint64_t = bigint;

export type __darwin_intptr_t = number;

export type __darwin_natural_t = number;

export type __darwin_ct_rune_t = number;

export type __mbstate_t = Pointer;

export type __darwin_mbstate_t = Pointer;

export type __darwin_ptrdiff_t = number;

export type __darwin_size_t = number;

export type __darwin_va_list = Pointer;

export type __darwin_wchar_t = number;

export type __darwin_rune_t = number;

export type __darwin_wint_t = number;

export type __darwin_clock_t = number;

export type __darwin_socklen_t = number;

export type __darwin_ssize_t = number;

export type __darwin_time_t = number;

export type __darwin_blkcnt_t = bigint;

export type __darwin_blksize_t = number;

export type __darwin_dev_t = number;

export type __darwin_fsblkcnt_t = number;

export type __darwin_fsfilcnt_t = number;

export type __darwin_gid_t = number;

export type __darwin_id_t = number;

export type __darwin_ino64_t = bigint;

export type __darwin_ino_t = bigint;

export type __darwin_mach_port_name_t = number;

export type __darwin_mach_port_t = number;

export type __darwin_mode_t = number;

export type __darwin_off_t = bigint;

export type __darwin_pid_t = number;

export type __darwin_sigset_t = number;

export type __darwin_suseconds_t = number;

export type __darwin_uid_t = number;

export type __darwin_useconds_t = number;

export type __darwin_uuid_t = Pointer;

export type __darwin_uuid_string_t = Pointer;

export type __darwin_pthread_key_t = number;

export type intptr_t = number;

export type uintptr_t = number;

export type intmax_t = number;

export type uintmax_t = number;

export type GLbitfield = number;

export type GLboolean = number;

export type GLbyte = number;

export type GLclampf = number;

export type GLenum = number;

export type GLfloat = number;

export type GLint = number;

export type GLshort = number;

export type GLsizei = number;

export type GLubyte = number;

export type GLuint = number;

export type GLushort = number;

export type GLvoid = void;

export type GLchar = number;

export type GLcharARB = number;

export type GLhandleARB = Pointer;

export type GLdouble = number;

export type GLclampd = number;

export type GLfixed = number;

export type GLhalf = number;

export type GLhalfARB = number;

export type GLint64 = bigint;

export type __GLsync = Pointer;

export type GLuint64 = bigint;

export type GLint64EXT = bigint;

export type GLuint64EXT = bigint;

export type GLintptr = number;

export type GLsizeiptr = number;

export type GLintptrARB = number;

export type GLsizeiptrARB = number;

export type GLFWglproc = () => Pointer | null;

export type GLFWvkproc = () => Pointer | null;

export type GLFWmonitor = Pointer;

export type GLFWwindow = Pointer;

export type GLFWcursor = Pointer;

export type GLFWallocatefun = (arg0: bigint, arg1: Pointer) => Pointer;

export type GLFWreallocatefun = (
  arg0: Pointer,
  arg1: bigint,
  arg2: Pointer
) => Pointer;

export type GLFWdeallocatefun = (
  arg0: Pointer,
  arg1: Pointer
) => Pointer | null;

export type GLFWerrorfun = (arg0: number, arg1: string) => Pointer | null;

export type GLFWwindowposfun = (
  arg0: Pointer,
  arg1: number,
  arg2: number
) => Pointer | null;

export type GLFWwindowsizefun = (
  arg0: Pointer,
  arg1: number,
  arg2: number
) => Pointer | null;

export type GLFWwindowclosefun = (arg0: Pointer) => Pointer | null;

export type GLFWwindowrefreshfun = (arg0: Pointer) => Pointer | null;

export type GLFWwindowfocusfun = (
  arg0: Pointer,
  arg1: number
) => Pointer | null;

export type GLFWwindowiconifyfun = (
  arg0: Pointer,
  arg1: number
) => Pointer | null;

export type GLFWwindowmaximizefun = (
  arg0: Pointer,
  arg1: number
) => Pointer | null;

export type GLFWframebuffersizefun = (
  arg0: Pointer,
  arg1: number,
  arg2: number
) => Pointer | null;

export type GLFWwindowcontentscalefun = (
  arg0: Pointer,
  arg1: number,
  arg2: number
) => Pointer | null;

export type GLFWmousebuttonfun = (
  arg0: Pointer,
  arg1: number,
  arg2: number,
  arg3: number
) => Pointer | null;

export type GLFWcursorposfun = (
  arg0: Pointer,
  arg1: number,
  arg2: number
) => Pointer | null;

export type GLFWcursorenterfun = (
  arg0: Pointer,
  arg1: number
) => Pointer | null;

export type GLFWscrollfun = (
  arg0: Pointer,
  arg1: number,
  arg2: number
) => Pointer | null;

export type GLFWkeyfun = (
  arg0: Pointer,
  arg1: number,
  arg2: number,
  arg3: number,
  arg4: number
) => Pointer | null;

export type GLFWcharfun = (arg0: Pointer, arg1: number) => Pointer | null;

export type GLFWcharmodsfun = (
  arg0: Pointer,
  arg1: number,
  arg2: number
) => Pointer | null;

export type GLFWdropfun = (
  arg0: Pointer,
  arg1: number,
  arg2: Pointer
) => Pointer | null;

export type GLFWmonitorfun = (arg0: Pointer, arg1: number) => Pointer | null;

export type GLFWjoystickfun = (arg0: number, arg1: number) => Pointer | null;
