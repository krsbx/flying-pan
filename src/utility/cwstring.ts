import { toArrayBuffer, type Pointer } from 'bun:ffi';
import { TextDecoder } from 'node:util';
import {
  IS_WINDOWS,
  WIDE_STRING_CHAR_SIZE,
  WIDE_STRING_MAX_SCAN,
} from './constant';

export class CWideString extends String {
  public readonly ptr: Pointer;
  public readonly byteOffset?: number;
  public readonly byteLength?: number;

  public constructor(ptr: Pointer, byteOffset = 0, byteLength?: number) {
    if (!ptr || ptr === (0n as unknown as Pointer)) {
      super('');
      this.ptr = 0n as unknown as Pointer;
      this.byteOffset = 0;
      this.byteLength = 0;
      return;
    }

    // 1. Calculate effective address
    const effectivePtr = (ptr + byteOffset) as unknown as Pointer;

    // 2. Determine Byte Length (Scan for null terminator if not provided)
    const length = CWideString.getWideStringLength(effectivePtr, byteLength);

    // 3. Decode the memory
    const decoded = CWideString.decodeWideString(effectivePtr, length);

    super(decoded);

    this.ptr = ptr;
    this.byteOffset = byteOffset;
    this.byteLength = length;
  }

  private static getWideStringLength(ptr: Pointer, byteLength?: number) {
    if (byteLength != null) return byteLength;

    const view = new DataView(toArrayBuffer(ptr, 0, WIDE_STRING_MAX_SCAN));

    let offset = 0;

    while (offset < WIDE_STRING_MAX_SCAN) {
      const char = IS_WINDOWS
        ? view.getUint16(offset, true)
        : view.getUint32(offset, true);

      if (char === 0) break;

      offset += WIDE_STRING_CHAR_SIZE;
    }

    return offset;
  }

  private static decodeWideString(ptr: Pointer, byteLength: number) {
    const buffer = toArrayBuffer(ptr, 0, byteLength);

    if (IS_WINDOWS) {
      const decoder = new TextDecoder('utf-16le', {
        ignoreBOM: true,
      });

      return decoder.decode(buffer);
    }

    const view = new DataView(buffer);

    let decoded = '';

    for (let offset = 0; offset < byteLength; offset += 4) {
      const codePoint = view.getUint32(offset, true);

      if (codePoint === 0) break;

      decoded += String.fromCodePoint(codePoint);
    }

    return decoded;
  }
}
