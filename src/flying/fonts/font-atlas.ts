import { LRUCache } from '@utility/lru-cache';
import { FVector2 } from '@vectors';
import { AlignedQuad } from './aligned-quad';
import { BaseFontAtlas } from './base-font-atlas';
import { ATLAS_HEIGHT, ATLAS_WIDTH, FIRST_CHAR, NUM_CHARS } from './constant';
import type {
  CharIndexAtXOptions,
  GetQuadsOptions,
  MeasureTextOptions,
  MeasureTextResult,
  TextQuad,
} from './types';

export class FontAtlas extends BaseFontAtlas {
  private readonly measureCache = new LRUCache<string, MeasureTextResult>({
    capacity: 512,
  });

  private readonly _quadPool: TextQuad[] = [];

  public override measureText(options: MeasureTextOptions): MeasureTextResult {
    const key = `${options.text}\0${options.fontSize ?? ''}\0${options.letterSpacing ?? ''}\0${options.lineHeight ?? ''}`;
    const cached = this.measureCache.get(key);

    if (cached) return cached;

    const scale = options.fontSize ? options.fontSize / this.fontSize : 1;
    const bakedChars = this.bakedCharsArray;

    const lines = options.text.split('\n');
    const letterSpacing = options.letterSpacing ?? 0;
    let maxWidth = 0;

    for (const line of lines) {
      let lineWidth = 0;

      for (let i = 0; i < line.length; i++) {
        const code = line.charCodeAt(i);
        const idx = code - FIRST_CHAR;

        if (idx < 0 || idx >= NUM_CHARS) continue;

        const xAdvance = bakedChars[idx]?.xAdvance ?? 0;

        lineWidth += xAdvance + letterSpacing;
      }

      maxWidth = Math.max(maxWidth, lineWidth);
    }

    const effectiveLineHeight = options.lineHeight ?? this.fontSize * scale;

    const result = {
      width: maxWidth * scale,
      height: lines.length * effectiveLineHeight,
    };

    this.measureCache.set(key, result);

    return result;
  }

  public override charIndexAtX(options: CharIndexAtXOptions): number {
    const { text, x, fontSize, letterSpacing: ls = 0 } = options;

    if (text.length === 0 || x <= 0) return 0;

    const scale = fontSize ? fontSize / this.fontSize : 1;
    const bakedChars = this.bakedCharsArray;

    let running = 0;

    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      const idx = code - FIRST_CHAR;

      if (idx < 0 || idx >= NUM_CHARS) {
        continue;
      }

      const advance = (bakedChars[idx]?.xAdvance ?? 0) * scale;
      const midpoint = running + advance / 2;

      if (midpoint >= x) return i;

      running += advance + ls;
    }

    return text.length;
  }

  public override getQuads(options: GetQuadsOptions): TextQuad[] {
    const quads = this._quadPool;
    const alignedQuad = AlignedQuad.create();
    const letterSpacing = options.letterSpacing ?? 0;
    const effectiveFontSize = options.fontSize ?? this.fontSize;
    const scale = effectiveFontSize / this.fontSize;
    const effectiveLineHeight = options.lineHeight ?? this.fontSize * scale;

    const lines = options.text.split('\n');
    let idx = 0;

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const line = lines[lineIdx]!;
      const ascent = this.ascent * scale;
      const baselineY = options.y + lineIdx * effectiveLineHeight + ascent;
      const pos = new FVector2({
        x: options.x,
        y: baselineY,
      });

      for (let i = 0; i < line.length; i++) {
        const code = line.charCodeAt(i);
        const charIndex = code - FIRST_CHAR;

        if (charIndex < 0 || charIndex >= NUM_CHARS) continue;

        const preX = pos.x;

        this.truetype.stbtt_GetBakedQuad({
          chardata: this.bakedChars.$address,
          pw: ATLAS_WIDTH,
          ph: ATLAS_HEIGHT,
          char_index: charIndex,
          xpos: pos.xRef,
          ypos: pos.yRef,
          q: alignedQuad.$address,
          opengl_fillrule: 1,
        });

        let quad = quads[idx];

        if (!quad) {
          quad = {
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 0,
            s0: 0,
            t0: 0,
            s1: 0,
            t1: 0,
          };
          quads[idx] = quad;
        }

        quad.x0 = preX + (alignedQuad.x0 - preX) * scale;
        quad.y0 = baselineY + (alignedQuad.y0 - baselineY) * scale;
        quad.s0 = alignedQuad.s0;
        quad.t0 = alignedQuad.t0;
        quad.x1 = preX + (alignedQuad.x1 - preX) * scale;
        quad.y1 = baselineY + (alignedQuad.y1 - baselineY) * scale;
        quad.s1 = alignedQuad.s1;
        quad.t1 = alignedQuad.t1;
        idx++;

        pos.x = preX + (pos.x - preX) * scale;

        if (letterSpacing) {
          pos.x += letterSpacing;
        }
      }
    }

    quads.length = idx;

    return quads;
  }
}
