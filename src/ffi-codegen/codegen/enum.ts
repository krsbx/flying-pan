import type { CEnumDecl } from '../../ffi-ast';

export function generateEnumCode(decl: CEnumDecl): string {
  if (decl.constants.length === 0) return '';

  if (!decl.name) {
    return decl.constants
      .map((c) => `export const ${c.name} = ${c.value};`)
      .join('\n');
  }

  const entries = decl.constants.map((c) => `  ${c.name}: ${c.value},`);

  const lines = [
    `export const ${decl.name} = {`,
    ...entries,
    `} as const;`,
    // Empty line
    '',
    `export type ${decl.name} = typeof ${decl.name}[keyof typeof ${decl.name}];`,
  ];

  return lines.join('\n');
}
