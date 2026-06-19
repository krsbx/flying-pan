import { ClangNodeParser, FFICodeGenerator } from '@/ffi';
import path from 'node:path';

const parser = new ClangNodeParser(
  path.join(import.meta.dir, '../assets/stb_truetype.json')
);

const parsed = await parser.parse();

const generator = new FFICodeGenerator({
  libName: 'TrueType',
  outputDir: path.join(import.meta.dir, '../src/library/truetype'),
  macroFile: path.join(import.meta.dir, '../assets/stb_truetype.macros'),
  macroPrefix: 'STBTT_',
});

await generator.generate(parsed);
