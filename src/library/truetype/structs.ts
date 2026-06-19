import { BaseStruct } from '@utility/base-struct';
import type { Pointer } from 'bun:ffi';

export class stbtt_pack_context extends BaseStruct {
  public static override readonly BYTE_SIZE = 64;

  // ─── user_allocator_context (offset 0, void) ───
  public get user_allocator_context(): Pointer {
    return Number(this.$view.getBigInt64(0, true)) as Pointer;
  }
  public set user_allocator_context(value: Pointer) {
    this.$view.setBigInt64(0, BigInt(value), true);
  }

  // ─── pack_info (offset 8, void) ───
  public get pack_info(): Pointer {
    return Number(this.$view.getBigInt64(8, true)) as Pointer;
  }
  public set pack_info(value: Pointer) {
    this.$view.setBigInt64(8, BigInt(value), true);
  }

  // ─── width (offset 16, int) ───
  public get width(): number {
    return this.$view.getInt32(16, true);
  }
  public set width(value: number) {
    this.$view.setInt32(16, value, true);
  }

  // ─── height (offset 20, int) ───
  public get height(): number {
    return this.$view.getInt32(20, true);
  }
  public set height(value: number) {
    this.$view.setInt32(20, value, true);
  }

  // ─── stride_in_bytes (offset 24, int) ───
  public get stride_in_bytes(): number {
    return this.$view.getInt32(24, true);
  }
  public set stride_in_bytes(value: number) {
    this.$view.setInt32(24, value, true);
  }

  // ─── padding (offset 28, int) ───
  public get padding(): number {
    return this.$view.getInt32(28, true);
  }
  public set padding(value: number) {
    this.$view.setInt32(28, value, true);
  }

  // ─── skip_missing (offset 32, int) ───
  public get skip_missing(): number {
    return this.$view.getInt32(32, true);
  }
  public set skip_missing(value: number) {
    this.$view.setInt32(32, value, true);
  }

  // ─── h_oversample (offset 36, unsigned int) ───
  public get h_oversample(): number {
    return this.$view.getUint32(36, true);
  }
  public set h_oversample(value: number) {
    this.$view.setUint32(36, value, true);
  }

  // ─── v_oversample (offset 40, unsigned int) ───
  public get v_oversample(): number {
    return this.$view.getUint32(40, true);
  }
  public set v_oversample(value: number) {
    this.$view.setUint32(40, value, true);
  }

  // ─── pixels (offset 48, unsigned char) ───
  public get pixels(): Pointer {
    return Number(this.$view.getBigInt64(48, true)) as Pointer;
  }
  public set pixels(value: Pointer) {
    this.$view.setBigInt64(48, BigInt(value), true);
  }

  // ─── nodes (offset 56, void) ───
  public get nodes(): Pointer {
    return Number(this.$view.getBigInt64(56, true)) as Pointer;
  }
  public set nodes(value: Pointer) {
    this.$view.setBigInt64(56, BigInt(value), true);
  }
}

export class stbtt_fontinfo extends BaseStruct {
  public static override readonly BYTE_SIZE = 112;

  // ─── userdata (offset 0, void) ───
  public get userdata(): Pointer {
    return Number(this.$view.getBigInt64(0, true)) as Pointer;
  }
  public set userdata(value: Pointer) {
    this.$view.setBigInt64(0, BigInt(value), true);
  }

  // ─── data (offset 8, unsigned char) ───
  public get data(): Pointer {
    return Number(this.$view.getBigInt64(8, true)) as Pointer;
  }
  public set data(value: Pointer) {
    this.$view.setBigInt64(8, BigInt(value), true);
  }

  // ─── fontstart (offset 16, int) ───
  public get fontstart(): number {
    return this.$view.getInt32(16, true);
  }
  public set fontstart(value: number) {
    this.$view.setInt32(16, value, true);
  }

  // ─── numGlyphs (offset 20, int) ───
  public get numGlyphs(): number {
    return this.$view.getInt32(20, true);
  }
  public set numGlyphs(value: number) {
    this.$view.setInt32(20, value, true);
  }

  // ─── loca (offset 24, int) ───
  public get loca(): number {
    return this.$view.getInt32(24, true);
  }
  public set loca(value: number) {
    this.$view.setInt32(24, value, true);
  }

  // ─── head (offset 28, int) ───
  public get head(): number {
    return this.$view.getInt32(28, true);
  }
  public set head(value: number) {
    this.$view.setInt32(28, value, true);
  }

  // ─── glyf (offset 32, int) ───
  public get glyf(): number {
    return this.$view.getInt32(32, true);
  }
  public set glyf(value: number) {
    this.$view.setInt32(32, value, true);
  }

  // ─── hhea (offset 36, int) ───
  public get hhea(): number {
    return this.$view.getInt32(36, true);
  }
  public set hhea(value: number) {
    this.$view.setInt32(36, value, true);
  }

  // ─── hmtx (offset 40, int) ───
  public get hmtx(): number {
    return this.$view.getInt32(40, true);
  }
  public set hmtx(value: number) {
    this.$view.setInt32(40, value, true);
  }

  // ─── kern (offset 44, int) ───
  public get kern(): number {
    return this.$view.getInt32(44, true);
  }
  public set kern(value: number) {
    this.$view.setInt32(44, value, true);
  }

  // ─── gpos (offset 48, int) ───
  public get gpos(): number {
    return this.$view.getInt32(48, true);
  }
  public set gpos(value: number) {
    this.$view.setInt32(48, value, true);
  }

  // ─── svg (offset 52, int) ───
  public get svg(): number {
    return this.$view.getInt32(52, true);
  }
  public set svg(value: number) {
    this.$view.setInt32(52, value, true);
  }

  // ─── index_map (offset 56, int) ───
  public get index_map(): number {
    return this.$view.getInt32(56, true);
  }
  public set index_map(value: number) {
    this.$view.setInt32(56, value, true);
  }

  // ─── indexToLocFormat (offset 60, int) ───
  public get indexToLocFormat(): number {
    return this.$view.getInt32(60, true);
  }
  public set indexToLocFormat(value: number) {
    this.$view.setInt32(60, value, true);
  }

  public get cff(): Pointer {
    return (this.$address + 64) as unknown as Pointer;
  }

  public get charstrings(): Pointer {
    return (this.$address + 72) as unknown as Pointer;
  }

  public get gsubrs(): Pointer {
    return (this.$address + 80) as unknown as Pointer;
  }

  public get subrs(): Pointer {
    return (this.$address + 88) as unknown as Pointer;
  }

  public get fontdicts(): Pointer {
    return (this.$address + 96) as unknown as Pointer;
  }

  public get fdselect(): Pointer {
    return (this.$address + 104) as unknown as Pointer;
  }
}

export class stbtt_kerningentry extends BaseStruct {
  public static override readonly BYTE_SIZE = 12;

  // ─── glyph1 (offset 0, int) ───
  public get glyph1(): number {
    return this.$view.getInt32(0, true);
  }
  public set glyph1(value: number) {
    this.$view.setInt32(0, value, true);
  }

  // ─── glyph2 (offset 4, int) ───
  public get glyph2(): number {
    return this.$view.getInt32(4, true);
  }
  public set glyph2(value: number) {
    this.$view.setInt32(4, value, true);
  }

  // ─── advance (offset 8, int) ───
  public get advance(): number {
    return this.$view.getInt32(8, true);
  }
  public set advance(value: number) {
    this.$view.setInt32(8, value, true);
  }
}
