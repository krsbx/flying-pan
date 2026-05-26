import { ClangNodeParser, FFICodeGenerator } from '@/ffi';
import path from 'node:path';

const parser = new ClangNodeParser(
  path.join(import.meta.dir, '../assets/glfw3.json')
);

const parsed = await parser.parse();

const generator = new FFICodeGenerator({
  libName: 'GLFW',
  outputDir: path.join(import.meta.dir, '../src/glfw'),
});

await generator.generate(parsed);
