import type { CMacroConst } from '../../parser/macro';
import type { CodeGenResult } from '../types';

function formatValue(value: string | number): string {
  if (typeof value === 'number') {
    return value.toString();
  }

  // String — wrap in quotes
  return `'${value}'`;
}

export function generateMacroCode(macros: CMacroConst[]): CodeGenResult[] {
  if (macros.length === 0) return [];

  const code = macros
    .map((m) => `export const ${m.name} = ${formatValue(m.value)};`)
    .join('\n\n');

  return [{ isType: false, code }];
}
