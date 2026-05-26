import { ClangNodeParser, FFICodeGenerator } from '@/ffi';
import path from 'node:path';

const parser = new ClangNodeParser(
  path.join(import.meta.dir, '../assets/miniaudio.json')
);

const parsed = await parser.parse();

const generator = new FFICodeGenerator({
  libName: 'MiniAudio',
  outputDir: path.join(import.meta.dir, '../src/miniaudio'),
});

await generator.generate(parsed);
