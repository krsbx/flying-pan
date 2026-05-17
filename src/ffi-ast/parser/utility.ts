import type { CType } from '../types/ast';

export function parseCTypeFromString(qualType: string): CType {
  let name = qualType.trim();

  let arraySize: number | null = null;
  const arrayMatch = name.match(/^(.+)\[(\d+)\]$/);
  if (arrayMatch) {
    name = arrayMatch[1]!.trim();
    arraySize = parseInt(arrayMatch[2]!, 10);
  }

  const isConst = name.includes('const ');
  name = name.replace(/\bconst\b/g, '').trim();

  let pointerDepth = 0;
  while (name.endsWith('*')) {
    pointerDepth++;
    name = name.slice(0, -1).trim();
  }

  name = name.trim();

  return {
    name,
    isConst,
    pointerDepth,
    arraySize,
  };
}

export function splitTopLevelCommas(s: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';

  for (const ch of s) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ',' && depth === 0) {
      parts.push(current);
      current = '';
      continue;
    }

    current += ch;
  }

  if (current.trim()) parts.push(current);

  return parts;
}
