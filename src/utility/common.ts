import { CString, ptr } from 'bun:ffi';
import { IS_WINDOWS, WIDE_STRING_CHAR_SIZE } from './constant';
import { CWideString } from './cwstring';

export function toCWideStringBuffer(value: string) {
  const chars = [...value];
  const isTerminated = chars.length > 0 && chars.at(-1)?.codePointAt?.(0) === 0;
  const length = isTerminated ? chars.length : chars.length + 1;
  const buffer = new Uint8Array(length * WIDE_STRING_CHAR_SIZE); // + 1 for null terminator
  const view = new DataView(buffer.buffer);

  for (let i = 0; i < chars.length; i++) {
    const code = chars[i]!.codePointAt(0)!;
    const byteOffset = i * WIDE_STRING_CHAR_SIZE;

    if (IS_WINDOWS) {
      view.setUint16(byteOffset, code, true);
    } else {
      view.setUint32(byteOffset, code, true);
    }
  }

  return buffer;
}

export function toCStringBuffer(value: string) {
  const finalStr = value.endsWith('\0') ? value : value + '\0';
  const strBuf = Buffer.from(finalStr, 'utf-8');

  const buffer = new Uint8Array(
    strBuf.buffer,
    strBuf.byteOffset,
    strBuf.byteLength
  );

  return buffer;
}

export function combineBitwise<T>(...values: T[]): T {
  // @ts-expect-error Combine bitwise
  return values.reduce((acc, value) => acc | value, 0 as T);
}

export function stringToCString(value: string) {
  const buffer = toCStringBuffer(value);
  const address = ptr(buffer);

  const clone = new CString(address);
  (clone as CString & { $buffer: Uint8Array }).$buffer = buffer;

  return clone as CString & { $buffer: Uint8Array };
}

export function stringToCWideString(value: string) {
  const buffer = toCWideStringBuffer(value);
  const address = ptr(buffer);

  const clone = new CWideString(address);
  (clone as CWideString & { $buffer: Uint8Array }).$buffer = buffer;

  return clone as CWideString & { $buffer: Uint8Array };
}
