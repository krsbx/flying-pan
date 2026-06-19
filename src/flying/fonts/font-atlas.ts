import { CStruct } from '@cstruct';
import { FVector2 } from '@vectors';
import { AlignedQuad } from './aligned-quad';
import { BakedChar } from './baked-char';
import { BaseFontAtlas } from './base-font-atlas';
import { ATLAS_HEIGHT, ATLAS_WIDTH, FIRST_CHAR, NUM_CHARS } from './constant';
import type {
  GetQuadsOptions,
  MeasureTextOptions,
  MeasureTextResult,
  TextQuad,
} from './types';

export class FontAtlas extends BaseFontAtlas {
  public override measureText(options: MeasureTextOptions): MeasureTextResult {
    const scale = options.fontSize ? options.fontSize / this.fontSize : 1;
    const bakedChars = CStruct.readArrayLazy(
      BakedChar,
      this.bakedChars.$address,
      NUM_CHARS
    );

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

    return {
      width: maxWidth * scale,
      height: lines.length * effectiveLineHeight,
    };
  }

  public override getQuads(options: GetQuadsOptions): TextQuad[] {
    const quads: TextQuad[] = [];
    const alignedQuad = AlignedQuad.create();
    const letterSpacing = options.letterSpacing ?? 0;
    const effectiveLineHeight = options.lineHeight ?? this.fontSize;

    const lines = options.text.split('\n');

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const line = lines[lineIdx]!;
      const pos = new FVector2({
        x: options.x,
        y: options.y + lineIdx * effectiveLineHeight,
      });

      for (let i = 0; i < line.length; i++) {
        const code = line.charCodeAt(i);
        const charIndex = code - FIRST_CHAR;

        if (charIndex < 0 || charIndex >= NUM_CHARS) continue;

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

        quads.push({
          x0: alignedQuad.x0,
          y0: alignedQuad.y0,
          s0: alignedQuad.s0,
          t0: alignedQuad.t0,
          x1: alignedQuad.x1,
          y1: alignedQuad.y1,
          s1: alignedQuad.s1,
          t1: alignedQuad.t1,
        });

        if (letterSpacing) {
          pos.x += letterSpacing;
        }
      }
    }

    return quads;
  }
}
