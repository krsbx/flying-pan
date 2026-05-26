import type { CEnumDecl } from '../../ast/types';
import type { CodeGenResult } from '../types';

export function generateEnumCode(decl: CEnumDecl): CodeGenResult[] {
  if (decl.constants.length === 0) return [];

  if (!decl.name) {
    return [
      {
        isType: false,
        code: decl.constants
          .map((c) => `export const ${c.name} = ${c.value};`)
          .join('\n'),
      },
    ];
  }

  const entries = decl.constants.map((c) => `  ${c.name}: ${c.value},`);

  const lines = [`export const ${decl.name} = {`, ...entries, `} as const;`];

  return [
    {
      isType: false,
      code: lines.join('\n'),
    },
    {
      isType: true,
      code: `export type ${decl.name} = typeof ${decl.name}[keyof typeof ${decl.name}];`,
    },
  ];
}
