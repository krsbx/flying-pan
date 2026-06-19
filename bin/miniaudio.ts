import { ClangNodeParser, FFICodeGenerator } from '@/ffi';
import path from 'node:path';

const parser = new ClangNodeParser(
  path.join(import.meta.dir, '../assets/miniaudio.json')
);

const parsed = await parser.parse({
  sourceFile: 'miniaudio.h',
});

const generator = new FFICodeGenerator({
  libName: 'MiniAudio',
  outputDir: path.join(import.meta.dir, '../src/library/miniaudio'),
  macroFile: path.join(import.meta.dir, '../assets/miniaudio.macros'),
  macroPrefix: 'MA_',
});

await generator.generate(parsed);
