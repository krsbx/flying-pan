import { ClangNodeParser, FFICodeGenerator } from '@/ffi';
import path from 'node:path';

const parser = new ClangNodeParser(
  path.join(import.meta.dir, '../assets/stb_image.json')
);

const parsed = await parser.parse({
  namePrefix: 'stbi',
});

const generator = new FFICodeGenerator({
  libName: 'Image',
  outputDir: path.join(import.meta.dir, '../src/library/image'),
  macroFile: path.join(import.meta.dir, '../assets/stb_image.macros'),
  macroPrefix: 'STBI_',
});

await generator.generate(parsed);
